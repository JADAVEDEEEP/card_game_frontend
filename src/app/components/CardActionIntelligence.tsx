import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { AlertCircle, BarChart3, Brain, CheckCircle, Crown, Layers, RefreshCw, Save, Sparkles, Target, Upload, X } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { withApiBase } from "../data/apiBase";

type ApiCard = {
  id?: string;
  name?: string;
  category?: string;
  colors?: string[];
  cost?: number | string;
  power?: number | string;
  counter?: number | string;
  effect?: string;
  trigger?: string;
  attribute?: string;
};

type CardData = {
  id: string;
  name: string;
  number: string;
  type: "Character" | "Event" | "Stage" | "Leader";
  color: string;
  cost: number;
  power?: number;
  counter?: number;
  attribute?: string;
  effect: string;
  trigger?: string;
  imageUrl?: string;
};

type CardSlot = {
  card: CardData | null;
  count: number;
};

type GuideAssistResponse = {
  provider: string;
  model: string;
  answer: string;
};

type CardIntelResult = {
  summary: string;
  comboPartners: Array<{ cardId: string; reason: string }>;
  replacementCards: Array<{ cardId: string; reason: string }>;
  weakSpots: string[];
  bestFor: string;
};

const SLOT_COUNT = 15;
const CATALOG_PAGE_SIZE = 8;
const CARD_INTELLIGENCE_STORAGE_KEY = "cardActionIntelligence_persist_enabled";

const safeJsonParse = <T,>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toCardData = (card: ApiCard): CardData => ({
  id: String(card.id || "").trim(),
  name: String(card.name || "Unknown Card").trim(),
  number: String(card.id || "").trim(),
  type: (String(card.category || "Character").trim() as CardData["type"]) || "Character",
  color: Array.isArray(card.colors) ? card.colors.join("/") : "",
  cost: toNumber(card.cost, 0),
  power: card.power ? toNumber(card.power, 0) : undefined,
  counter: card.counter ? toNumber(card.counter, 0) : undefined,
  attribute: String(card.attribute || "").trim() || undefined,
  effect: String(card.effect || "").trim(),
  trigger: String(card.trigger || "").trim() || undefined,
  imageUrl: card.id ? withApiBase(`/cardsApi/image/${encodeURIComponent(String(card.id).trim())}`) : undefined,
});

const buildEmptySlots = () => Array.from({ length: SLOT_COUNT }, () => ({ card: null, count: 1 } as CardSlot));

const normalizeCardCode = (value: string) => {
  const cleaned = value.toUpperCase().trim();
  const compactMatch = cleaned.match(/\b([A-Z]{1,4}(?:\d{1,2})?)-?(\d{2,3})\b/);
  if (!compactMatch) return "";

  return `${compactMatch[1]}-${compactMatch[2]}`;
};

const extractCardCode = (value: string) => {
  return normalizeCardCode(value);
};

const normalizeImportEntries = (payload: unknown) => {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    const objectPayload = payload as Record<string, unknown>;
    if (Array.isArray(objectPayload.cards)) return objectPayload.cards;
    if (Array.isArray(objectPayload.deck_cards)) return objectPayload.deck_cards;
    if (Array.isArray(objectPayload.decklist)) return objectPayload.decklist;
  }
  return [];
};

const normalizeImportedLeaderCode = (payload: unknown) => {
  if (!payload || typeof payload !== "object") return "";
  const objectPayload = payload as Record<string, unknown>;
  const leader = objectPayload.leader;
  if (!leader || typeof leader !== "object") return "";
  const leaderRecord = leader as Record<string, unknown>;
  return extractCardCode(String(leaderRecord.card_code || leaderRecord.code || leaderRecord.id || ""));
};

export function CardActionIntelligence() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const storageTimeoutRef = useRef<number | null>(null);
  const [allCards, setAllCards] = useState<CardData[]>([]);
  const [selectedLeader, setSelectedLeader] = useState<CardData | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<CardSlot[]>(buildEmptySlots);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
  const [deckName, setDeckName] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [savingDeck, setSavingDeck] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loadingCards, setLoadingCards] = useState(true);
  const [loadingDeckAI, setLoadingDeckAI] = useState(false);
  const [loadingCardAI, setLoadingCardAI] = useState(false);
  const [loadingUpgradeAI, setLoadingUpgradeAI] = useState(false);
  const [deckAiAnswer, setDeckAiAnswer] = useState("");
  const [cardAiAnswer, setCardAiAnswer] = useState("");
  const [upgradeAiAnswer, setUpgradeAiAnswer] = useState("");
  const [cardIntelResult, setCardIntelResult] = useState<CardIntelResult | null>(null);
  const [providerInfo, setProviderInfo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [persistenceEnabled, setPersistenceEnabled] = useState(false);
  const [visibleCatalogCount, setVisibleCatalogCount] = useState(CATALOG_PAGE_SIZE);

  useEffect(() => {
    const loadCards = async () => {
      setLoadingCards(true);
      setError(null);

      try {
        const response = await fetch(withApiBase("/cardsApi/cards"));
        const data = response.ok ? ((await response.json()) as ApiCard[]) : [];
        const normalized = data.map(toCardData).filter((card) => card.id && card.name);
        setAllCards(normalized);

        const shouldRestore =
          localStorage.getItem(CARD_INTELLIGENCE_STORAGE_KEY) === "true";

        const storedLeader = shouldRestore
          ? safeJsonParse<CardData | null>(
              localStorage.getItem("cardActionIntelligence_selectedLeader"),
              null
            )
          : null;
        const storedCards = shouldRestore
          ? safeJsonParse<Array<CardSlot | CardData>>(
              localStorage.getItem("cardActionIntelligence_selectedCards"),
              []
            )
          : [];

        if (storedLeader?.id) {
          const matchedLeader = normalized.find((card) => card.id === storedLeader.id) || storedLeader;
          setSelectedLeader(matchedLeader);
        }

        if (storedCards.length > 0) {
          const nextSlots = buildEmptySlots();
          storedCards.slice(0, SLOT_COUNT).forEach((item, index) => {
            const slotCard = "card" in item ? item.card : item;
            const slotCount = "count" in item ? item.count : 1;
            if (!slotCard) return;
            const matchedCard = normalized.find((card) => card.id === slotCard.id) || (slotCard as CardData);
            nextSlots[index] = {
              card: matchedCard,
              count: Math.max(1, Math.min(4, toNumber(slotCount, 1))),
            };
          });
          setSelectedSlots(nextSlots);
        }
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Failed to load cards API.");
      } finally {
        setLoadingCards(false);
      }
    };

    void loadCards();
  }, []);

  useEffect(() => {
    if (storageTimeoutRef.current) {
      window.clearTimeout(storageTimeoutRef.current);
    }

    storageTimeoutRef.current = window.setTimeout(() => {
      if (!persistenceEnabled) return;
      localStorage.setItem(CARD_INTELLIGENCE_STORAGE_KEY, "true");
      localStorage.setItem("cardActionIntelligence_selectedLeader", JSON.stringify(selectedLeader));
      localStorage.setItem(
        "cardActionIntelligence_selectedCards",
        JSON.stringify(selectedSlots.filter((slot) => slot.card))
      );
    }, 120);

    return () => {
      if (storageTimeoutRef.current) {
        window.clearTimeout(storageTimeoutRef.current);
      }
    };
  }, [selectedLeader, selectedSlots, persistenceEnabled]);

  const leaders = useMemo(
    () => allCards.filter((card) => card.type === "Leader"),
    [allCards]
  );

  const nonLeaderCards = useMemo(
    () => allCards.filter((card) => card.type !== "Leader"),
    [allCards]
  );
  const visibleCatalogCards = useMemo(
    () => nonLeaderCards.slice(0, visibleCatalogCount),
    [nonLeaderCards, visibleCatalogCount]
  );
  const hasMoreCatalogCards = visibleCatalogCount < nonLeaderCards.length;
  const allCardsById = useMemo(
    () => new Map(allCards.map((card) => [card.id, card])),
    [allCards]
  );

  useEffect(() => {
    setVisibleCatalogCount(CATALOG_PAGE_SIZE);
  }, [nonLeaderCards.length]);

  const selectedCard = selectedSlotIndex !== null ? selectedSlots[selectedSlotIndex]?.card || null : null;
  const isSelectingEmptySlot =
    selectedSlotIndex !== null && !selectedSlots[selectedSlotIndex]?.card;

  const usedCards = selectedSlots.filter((slot) => slot.card);
  const totalCards = usedCards.reduce((sum, slot) => sum + slot.count, 0);
  const averageCost = usedCards.length > 0
    ? (usedCards.reduce((sum, slot) => sum + Number(slot.card?.cost || 0), 0) / usedCards.length).toFixed(1)
    : "0.0";
  const colorMatchCount = selectedLeader
    ? usedCards.filter((slot) => slot.card?.color.toLowerCase().includes(selectedLeader.color.toLowerCase())).length
    : 0;
  const comboPartnerCards = useMemo(
    () => (cardIntelResult?.comboPartners || []).map((item) => ({ reason: item.reason, card: allCardsById.get(item.cardId) || null })).filter((item) => item.card),
    [cardIntelResult, allCardsById]
  );
  const replacementCards = useMemo(
    () => (cardIntelResult?.replacementCards || []).map((item) => ({ reason: item.reason, card: allCardsById.get(item.cardId) || null })).filter((item) => item.card),
    [cardIntelResult, allCardsById]
  );

  const handleCardSelect = (slotIndex: number, cardId: string) => {
    const card = nonLeaderCards.find((item) => item.id === cardId);
    if (!card) return;

    setSelectedSlots((current) => {
      const next = [...current];
      next[slotIndex] = { card, count: current[slotIndex]?.count || 1 };
      return next;
    });
    setSelectedSlotIndex(slotIndex);
  };

  const handleCardCountChange = (slotIndex: number, count: number) => {
    setSelectedSlots((current) => {
      const next = [...current];
      next[slotIndex] = {
        ...next[slotIndex],
        count: Math.max(1, Math.min(4, count)),
      };
      return next;
    });
  };

  const addCardDirect = (card: CardData) => {
    let nextSelectedIndex: number | null = null;
    setSelectedSlots((current) => {
      const existingIndex = current.findIndex((slot) => slot.card?.id === card.id);
      if (existingIndex >= 0) {
        const next = [...current];
        const currentCount = next[existingIndex].count || 1;
        nextSelectedIndex = existingIndex;
        next[existingIndex] = {
          ...next[existingIndex],
          count: Math.max(1, Math.min(4, currentCount + 1)),
        };
        return next;
      }

      const emptyIndex = current.findIndex((slot) => !slot.card);
      if (emptyIndex === -1) return current;

      const next = [...current];
      nextSelectedIndex = emptyIndex;
      next[emptyIndex] = { card, count: 1 };
      return next;
    });
    if (nextSelectedIndex !== null) {
      setSelectedSlotIndex(nextSelectedIndex);
    }
  };

  const removeCardDirect = (cardId: string) => {
    setSelectedSlots((current) => {
      const existingIndex = current.findIndex((slot) => slot.card?.id === cardId);
      if (existingIndex === -1) return current;

      const next = [...current];
      const currentCount = next[existingIndex].count || 1;
      if (currentCount <= 1) {
        next[existingIndex] = { card: null, count: 1 };
      } else {
        next[existingIndex] = {
          ...next[existingIndex],
          count: currentCount - 1,
        };
      }
      return next;
    });
  };

  const handleLeaderSelect = (leaderId: string) => {
    const leader = leaders.find((item) => item.id === leaderId) || null;
    setSelectedLeader(leader);
  };

  const applyImportedDeck = (leaderCode: string, importedItems: Array<{ code: string; count: number }>) => {
    const normalizedLeaderCode = leaderCode.trim().toUpperCase();
    const matchedLeader = normalizedLeaderCode
      ? leaders.find((leader) => leader.number.toUpperCase() === normalizedLeaderCode || leader.id.toUpperCase() === normalizedLeaderCode) || null
      : null;

    if (normalizedLeaderCode && !matchedLeader) {
      throw new Error(`Leader ${normalizedLeaderCode} cards API me nahi mila.`);
    }

    const nextSlots = buildEmptySlots();
    const missingCodes: string[] = [];

    importedItems.slice(0, SLOT_COUNT).forEach((item, index) => {
      const matchedCard =
        nonLeaderCards.find((card) => card.number.toUpperCase() === item.code || card.id.toUpperCase() === item.code) || null;

      if (!matchedCard) {
        missingCodes.push(item.code);
        return;
      }

      nextSlots[index] = {
        card: matchedCard,
        count: Math.max(1, Math.min(4, item.count)),
      };
    });

    setSelectedLeader(matchedLeader);
    setSelectedSlots(nextSlots);
    const firstFilledSlot = nextSlots.findIndex((slot) => slot.card);
    setSelectedSlotIndex(firstFilledSlot >= 0 ? firstFilledSlot : null);
    setDeckAiAnswer("");
    setCardAiAnswer("");
    setUpgradeAiAnswer("");
    setCardIntelResult(null);

    if (missingCodes.length > 0) {
      setError(`Kuch cards import nahi hue: ${missingCodes.slice(0, 5).join(", ")}${missingCodes.length > 5 ? "..." : ""}`);
    } else if (importedItems.length > SLOT_COUNT) {
      setError(`Sirf pehle ${SLOT_COUNT} unique cards import kiye gaye hain.`);
    } else {
      setError(null);
    }
  };

  const parseImportedDeckText = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) {
      throw new Error("Import file empty hai.");
    }

    let parsed: unknown = null;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      parsed = null;
    }

    if (parsed) {
      const leaderCodeFromJson = normalizeImportedLeaderCode(parsed);
      const importedEntries = normalizeImportEntries(parsed)
        .map((entry) => {
          if (typeof entry === "string") {
            const strict = entry.match(/^(\d+)\s*x\s*([A-Za-z]{1,5}\d{2}-\d{3}(?:[_-][A-Za-z0-9]+)?)$/i);
            if (strict) {
              return {
                code: extractCardCode(strict[2]),
                count: Math.max(1, Math.min(4, toNumber(strict[1], 1))),
              };
            }

            const code = extractCardCode(entry);
            const countMatch = entry.match(/(?:x|qty|count)?\s*(\d+)|(\d+)\s*x/i);
            const rawCount = countMatch?.[1] || countMatch?.[2] || "1";
            return {
              code,
              count: Math.max(1, Math.min(4, toNumber(rawCount, 1))),
            };
          }

          const record = entry as Record<string, unknown>;
          const code = extractCardCode(String(record.card_code || record.code || record.id || record.number || ""));
          const count = Math.max(1, Math.min(4, toNumber(record.count ?? record.qty ?? record.quantity, 1)));
          return { code, count };
        })
        .filter((entry) => entry.code);

      return {
        leaderCode: leaderCodeFromJson,
        cards: importedEntries,
      };
    }

    const lines = trimmed
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    let leaderCode = "";
    const cards: Array<{ code: string; count: number }> = [];

    lines.forEach((line) => {
      const lowerLine = line.toLowerCase();
      if (!leaderCode && lowerLine.startsWith("leader")) {
        leaderCode = extractCardCode(line);
        return;
      }

      const strictCountFirst = line.match(/^(\d+)\s*x\s*([A-Za-z]{1,5}\d{2}-\d{3}(?:[_-][A-Za-z0-9]+)?)$/i);
      if (strictCountFirst) {
        cards.push({
          code: extractCardCode(strictCountFirst[2]),
          count: Math.max(1, Math.min(4, toNumber(strictCountFirst[1], 1))),
        });
        return;
      }

      const strictCodeFirst = line.match(/^([A-Za-z]{1,5}\d{2}-\d{3}(?:[_-][A-Za-z0-9]+)?)\s*(?:x\s*(\d+)|(\d+)\s*x?)?$/i);
      if (strictCodeFirst) {
        const strictCode = extractCardCode(strictCodeFirst[1]);
        const rawStrictCount = strictCodeFirst[2] || strictCodeFirst[3] || "1";

        if (!leaderCode && cards.length === 0) {
          const matchedLeader = leaders.find(
            (leader) => leader.number.toUpperCase() === strictCode || leader.id.toUpperCase() === strictCode
          );
          if (matchedLeader) {
            leaderCode = matchedLeader.number.toUpperCase();
            return;
          }
        }

        cards.push({
          code: strictCode,
          count: Math.max(1, Math.min(4, toNumber(rawStrictCount, 1))),
        });
        return;
      }

      const code = extractCardCode(line);
      if (!code) return;

      if (!leaderCode && cards.length === 0) {
        const matchedLeader = leaders.find(
          (leader) => leader.number.toUpperCase() === code || leader.id.toUpperCase() === code
        );
        if (matchedLeader) {
          leaderCode = matchedLeader.number.toUpperCase();
          return;
        }
      }

      const countMatch = line.match(/(?:x|qty|count)?\s*(\d+)|(\d+)\s*x/i);
      const rawCount = countMatch?.[1] || countMatch?.[2] || "1";
      const count = Math.max(1, Math.min(4, toNumber(rawCount, 1)));
      cards.push({ code, count });
    });

    if (!leaderCode && cards.length > 0) {
      const firstEntry = cards[0];
      const matchedLeader = leaders.find(
        (leader) => leader.number.toUpperCase() === firstEntry.code || leader.id.toUpperCase() === firstEntry.code
      );
      if (matchedLeader) {
        leaderCode = matchedLeader.number.toUpperCase();
        cards.shift();
      }
    }

    return { leaderCode, cards };
  };

  const handleImportFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      const parsedDeck = parseImportedDeckText(content);

      if (parsedDeck.cards.length === 0) {
        throw new Error("File me koi valid card code nahi mila.");
      }

      applyImportedDeck(parsedDeck.leaderCode, parsedDeck.cards);
      setPersistenceEnabled(true);
    } catch (importError) {
      setError(importError instanceof Error ? importError.message : "Deck import failed.");
    } finally {
      event.target.value = "";
    }
  };

  const buildDeckContext = () => {
    const cardLines = usedCards
      .map((slot) => `${slot.count}x ${slot.card?.name || "Unknown"} (${slot.card?.number || ""}) - ${slot.card?.type} - ${slot.card?.color}`)
      .join("\n");

    return [
      `Leader: ${selectedLeader?.name || "Not selected"} (${selectedLeader?.number || ""})`,
      `Total cards selected: ${totalCards}`,
      `Average cost: ${averageCost}`,
      cardLines ? `Deck cards:\n${cardLines}` : "Deck cards: none",
    ].join("\n\n");
  };

  const runDeckAiAnalysis = async () => {
    if (!selectedLeader || usedCards.length === 0) {
      setError("Select a leader and at least one card before asking the AI.");
      return;
    }

    setLoadingDeckAI(true);
    setError(null);

    try {
      const response = await fetch(withApiBase("/ai/guide-assist"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: "Card Action Intelligence",
          question: "Give a full overview of this deck core, explain the current game plan, strongest parts, weakest parts, and the top improvements or imports I should make next.",
          context: buildDeckContext(),
        }),
      });

      const data = (await response.json()) as Partial<GuideAssistResponse> & { message?: string };
      if (!response.ok || !data.answer) {
        throw new Error(data.message || "Failed to get deck AI analysis.");
      }

      setDeckAiAnswer(data.answer);
      setProviderInfo(`${data.provider || "ai"} • ${data.model || ""}`.trim());
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to analyze deck.");
    } finally {
      setLoadingDeckAI(false);
    }
  };

  const runSelectedCardAiAnalysis = async () => {
    if (!selectedCard) {
      setError("Select a card first to get its AI action breakdown.");
      return;
    }

    setLoadingCardAI(true);
    setError(null);

    try {
      const response = await fetch(withApiBase("/ai/guide-assist"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: "Card Action Intelligence",
          question: `Explain how to use ${selectedCard.name} in a real match, when to play it, what mistakes to avoid, and how it supports the current deck.`,
          context: [
            `Leader: ${selectedLeader?.name || "Not selected"}`,
            `Selected card: ${selectedCard.name} (${selectedCard.number})`,
            `Type: ${selectedCard.type}`,
            `Color: ${selectedCard.color}`,
            `Cost: ${selectedCard.cost}`,
            `Power: ${selectedCard.power || "n/a"}`,
            `Effect: ${selectedCard.effect || "n/a"}`,
            selectedCard.trigger ? `Trigger: ${selectedCard.trigger}` : "",
            `Current deck context:\n${buildDeckContext()}`,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });

      const data = (await response.json()) as Partial<GuideAssistResponse> & { message?: string };
      if (!response.ok || !data.answer) {
        throw new Error(data.message || "Failed to get card AI analysis.");
      }

      setCardAiAnswer(data.answer);
      setProviderInfo(`${data.provider || "ai"} • ${data.model || ""}`.trim());
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to analyze card.");
    } finally {
      setLoadingCardAI(false);
    }
  };

  const runUpgradeAiAnalysis = async () => {
    if (!selectedCard) {
      setError("Select a card first to get combo and replacement advice.");
      return;
    }

    setLoadingUpgradeAI(true);
    setError(null);

    try {
      const response = await fetch(withApiBase("/ai/guide-assist"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: "Card Action Intelligence",
          question:
            `For ${selectedCard.name}, explain best combo partners in this deck, when it feels weak, what replacement direction to try if I cut it, and what type of player should keep using it.`,
          context: [
            `Leader: ${selectedLeader?.name || "Not selected"} (${selectedLeader?.number || ""})`,
            `Selected card: ${selectedCard.name} (${selectedCard.number})`,
            `Type: ${selectedCard.type}`,
            `Color: ${selectedCard.color}`,
            `Cost: ${selectedCard.cost}`,
            `Power: ${selectedCard.power || "n/a"}`,
            `Counter: ${selectedCard.counter || "n/a"}`,
            `Effect: ${selectedCard.effect || "n/a"}`,
            selectedCard.trigger ? `Trigger: ${selectedCard.trigger}` : "",
            `Deck context:\n${buildDeckContext()}`,
            "Answer in short sections titled: Combo Partners, Weak Spots, Replacement Direction, Best For.",
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });

      const data = (await response.json()) as Partial<GuideAssistResponse> & { message?: string };
      if (!response.ok || !data.answer) {
        throw new Error(data.message || "Failed to get replacement/combo AI analysis.");
      }

      setUpgradeAiAnswer(data.answer);
      setProviderInfo(`${data.provider || "ai"} â€¢ ${data.model || ""}`.trim());
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to analyze replacement/combo paths.");
    } finally {
      setLoadingUpgradeAI(false);
    }
  };

  const runUpgradeAiStructuredAnalysis = async () => {
    if (!selectedCard) {
      setError("Select a card first to get combo and replacement advice.");
      return;
    }

    setLoadingUpgradeAI(true);
    setError(null);
    setCardIntelResult(null);

    try {
      const candidateCards = nonLeaderCards
        .filter((card) => {
          if (!selectedLeader?.color) return true;
          return card.color.toLowerCase().includes(selectedLeader.color.toLowerCase()) || card.type === selectedCard.type;
        })
        .slice(0, 40)
        .map((card) => ({
          id: card.id,
          name: card.name,
          type: card.type,
          color: card.color,
          cost: card.cost,
          power: card.power || 0,
          counter: card.counter || 0,
          effect: card.effect || "",
        }));

      const response = await fetch(withApiBase("/ai/card-intel"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedLeader,
          selectedCard,
          deckCards: usedCards.map((slot) => ({
            id: slot.card?.id || "",
            name: slot.card?.name || "",
            type: slot.card?.type || "",
            color: slot.card?.color || "",
            cost: slot.card?.cost || 0,
            power: slot.card?.power || 0,
            counter: slot.card?.counter || 0,
            effect: slot.card?.effect || "",
          })),
          candidateCards,
        }),
      });

      const data = (await response.json()) as {
        provider?: string;
        model?: string;
        result?: CardIntelResult;
        message?: string;
      };
      if (!response.ok || !data.result) {
        throw new Error(data.message || "Failed to get replacement/combo AI analysis.");
      }

      setCardIntelResult(data.result);
      setUpgradeAiAnswer(data.result.summary || "");
      setProviderInfo(`${data.provider || "ai"} • ${data.model || ""}`.trim());
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to analyze replacement/combo paths.");
    } finally {
      setLoadingUpgradeAI(false);
    }
  };

  const handleSaveDeck = () => {
    if (!selectedLeader) {
      setError("Please select a leader first.");
      return;
    }

    if (usedCards.length === 0) {
      setError("Please add at least one card to your deck.");
      return;
    }

    setError(null);
    setPersistenceEnabled(true);
    setShowSaveModal(true);
  };

  const handleResetWorkspace = () => {
    setSelectedLeader(null);
    setSelectedSlots(buildEmptySlots());
    setSelectedSlotIndex(null);
    setDeckAiAnswer("");
    setCardAiAnswer("");
    setUpgradeAiAnswer("");
    setCardIntelResult(null);
    setProviderInfo("");
    setDeckName("");
    setShowSaveModal(false);
    setSavedSuccess(false);
    setError(null);
    setPersistenceEnabled(false);
    localStorage.removeItem("cardActionIntelligence_selectedLeader");
    localStorage.removeItem("cardActionIntelligence_selectedCards");
    localStorage.removeItem(CARD_INTELLIGENCE_STORAGE_KEY);
  };

  const runUnifiedCardAi = async () => {
    await Promise.all([
      runSelectedCardAiAnalysis(),
      runUpgradeAiStructuredAnalysis(),
      selectedLeader && usedCards.length > 0 ? runDeckAiAnalysis() : Promise.resolve(),
    ]);
  };

  const confirmSaveDeck = async () => {
    if (!deckName.trim() || !selectedLeader) {
      setError("Please enter a deck name and select a leader.");
      return;
    }

    setSavingDeck(true);
    setError(null);

    try {
      const payload = {
        deck_name: deckName.trim(),
        leader: {
          card_code: selectedLeader.number,
          name: selectedLeader.name,
          color: selectedLeader.color,
        },
        deck_cards: usedCards.map((slot) => ({
          card_code: slot.card?.number || slot.card?.id || "",
          count: slot.count,
        })),
        notes: deckAiAnswer ? `AI summary: ${deckAiAnswer.slice(0, 800)}` : "",
        tags: ["learning-guide", "card-action-intelligence"],
      };

      const response = await fetch(withApiBase("/decks/save"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { deck_id?: string; message?: string };
      if (!response.ok || !data.deck_id) {
        throw new Error(data.message || "Failed to save deck.");
      }

      localStorage.setItem("cardActionIntelligence_savedDeckId", data.deck_id);
      window.dispatchEvent(
        new CustomEvent("deckSaved", {
          detail: {
            deckId: data.deck_id,
          },
        })
      );

      setSavedSuccess(true);
      setTimeout(() => {
        setShowSaveModal(false);
        setSavedSuccess(false);
        setDeckName("");
      }, 1500);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save deck.");
    } finally {
      setSavingDeck(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Layers className="w-8 h-8 text-indigo-600" />
          <h2 className="text-3xl font-bold text-gray-900">Card Action Intelligence</h2>
        </div>
        <p className="text-gray-900">
          Build your deck from the real cards API, get AI explanations for individual cards and your deck core, then push the same deck into AI Coach and My Collection.
        </p>
        {providerInfo ? <Badge className="bg-slate-900 text-white">{providerInfo}</Badge> : null}
      </div>

      {error ? (
        <Card className="p-4 border-2 border-red-300 bg-red-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <p className="font-bold text-red-900">Action Intelligence Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </Card>
      ) : null}

      <Card className="p-5 transition-all bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-300">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-500">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-900">Leader Selection</h3>
                <p className="text-sm text-yellow-700">Choose the real leader that powers your deck and AI recommendations.</p>
              </div>
            </div>
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.json,.csv,.deck"
                onChange={handleImportFile}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="gap-2 bg-amber-600 hover:bg-amber-700 text-white"
                disabled={loadingCards}
              >
                <Upload className="w-4 h-4" />
                Import Deck File
              </Button>
              <Button
                onClick={handleResetWorkspace}
                type="button"
                variant="outline"
                className="w-full border-red-200 text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-2" />
                Reset Workspace
              </Button>
              <p className="text-xs text-yellow-800 max-w-xs">
                `.json` ya `.txt` file import karo. Example: `Leader: OP01-001` aur next lines `OP01-016 x4`
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border-2 border-yellow-300">
            <Label className="text-gray-900 mb-2 block">Select Leader</Label>
            <Select onValueChange={handleLeaderSelect} value={selectedLeader?.id || ""} disabled={loadingCards}>
              <SelectTrigger className="w-full border-yellow-300">
                <SelectValue placeholder={loadingCards ? "Loading leaders..." : "Choose a leader card"} />
              </SelectTrigger>
              <SelectContent>
                {leaders.map((leader) => (
                  <SelectItem key={leader.id} value={leader.id}>
                    {leader.name} ({leader.color || "Unknown"}) - {leader.number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedLeader ? (
            <div className="bg-white p-4 rounded-xl border-2 border-yellow-300">
              <div className="flex flex-wrap items-start gap-3">
                {selectedLeader.imageUrl ? (
                  <img
                    src={selectedLeader.imageUrl}
                    alt={selectedLeader.name}
                    className="h-24 w-16 rounded-lg border border-yellow-200 object-cover"
                    loading="lazy"
                  />
                ) : null}
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-yellow-100 text-yellow-900">{selectedLeader.name}</Badge>
                  <Badge className="bg-orange-100 text-orange-900">{selectedLeader.color || "Unknown color"}</Badge>
                  <Badge className="bg-slate-100 text-slate-800">{selectedLeader.number}</Badge>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-3">{selectedLeader.effect || "No effect text available from the cards API."}</p>
            </div>
          ) : null}
        </div>
      </Card>

      <div className="grid lg:grid-cols-12 gap-5">
        <Card className="lg:col-span-5 p-5 transition-all bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-500">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-900">Deck Selection</h3>
                <p className="text-sm text-indigo-700">Pick up to 15 unique cards and store them for AI Coach deck integration.</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-indigo-200">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-sm font-bold text-indigo-900">Selected Deck Cards</p>
                <Badge className="bg-indigo-100 text-indigo-900">{usedCards.length}/{SLOT_COUNT} cards</Badge>
              </div>
              {usedCards.length === 0 ? (
                <div className="rounded-lg border border-dashed border-indigo-200 bg-indigo-50 p-6 text-center text-sm text-indigo-700">
                  Add cards directly from the catalog below.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {usedCards.map((slot) => (
                    <div key={slot.card?.id} className="flex items-start gap-3 rounded-lg border border-indigo-200 bg-slate-50 p-3">
                      <div className="h-20 w-14 shrink-0 overflow-hidden rounded-md border border-indigo-200 bg-white">
                        {slot.card?.imageUrl ? (
                          <img
                            src={slot.card.imageUrl}
                            alt={slot.card.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 line-clamp-2">{slot.card?.name}</p>
                        <p className="text-xs text-gray-500">{slot.card?.number}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge className="bg-blue-100 text-blue-800 text-xs">{slot.card?.type}</Badge>
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">Cost {slot.card?.cost}</Badge>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => removeCardDirect(slot.card?.id || "")}
                            className="h-8 min-w-8 px-0 bg-indigo-500 hover:bg-indigo-600 text-white"
                          >
                            -
                          </Button>
                          <div className="rounded bg-yellow-400 px-2 py-1 text-sm font-bold text-yellow-900">x{slot.count}</div>
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => slot.card && addCardDirect(slot.card)}
                            className="h-8 min-w-8 px-0 bg-indigo-500 hover:bg-indigo-600 text-white"
                            disabled={slot.count >= 4}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded-xl border border-indigo-200">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-sm font-bold text-indigo-900">Card Catalog</p>
                <Badge className="bg-slate-100 text-slate-800">{nonLeaderCards.length} cards</Badge>
              </div>
              <div className="grid max-h-[760px] grid-cols-1 gap-5 overflow-y-auto pr-2 md:grid-cols-2">
                {visibleCatalogCards.map((card) => {
                  const existing = usedCards.find((slot) => slot.card?.id === card.id);
                  const count = existing?.count || 0;
                  return (
                    <div
                      key={card.id}
                      className="flex h-full min-h-[26rem] flex-col rounded-[1.5rem] border border-indigo-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="mx-auto w-full max-w-[12rem] overflow-hidden rounded-xl border border-indigo-200 bg-slate-50 shadow-sm">
                        {card.imageUrl ? (
                          <img
                            src={card.imageUrl}
                            alt={card.name}
                            className="aspect-[2.5/3.35] w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="aspect-[2.5/3.35] w-full bg-slate-200" />
                        )}
                      </div>
                      <div className="mt-3 flex flex-1 flex-col">
                        <div className="space-y-1">
                          <p className="line-clamp-2 text-[1.35rem] font-semibold leading-snug text-gray-900">{card.name}</p>
                          <p className="text-sm text-gray-500">{card.number}</p>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge className="rounded-xl bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800">{card.type}</Badge>
                          <Badge className="rounded-xl bg-yellow-100 px-2.5 py-1 text-xs font-semibold text-yellow-800">Cost {card.cost}</Badge>
                        </div>
                        <div className="mt-auto pt-3">
                          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-2.5 py-2">
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => removeCardDirect(card.id)}
                            className="h-8 min-w-8 rounded-xl px-0 text-sm font-bold bg-indigo-500 hover:bg-indigo-600 text-white"
                            disabled={count <= 0}
                          >
                            -
                          </Button>
                          <div className="min-w-[2.75rem] rounded-xl bg-slate-900 px-2.5 py-1.5 text-center text-sm font-bold text-white">
                            {count}
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => addCardDirect(card)}
                            className="h-8 min-w-8 rounded-xl px-0 text-sm font-bold bg-indigo-500 hover:bg-indigo-600 text-white"
                            disabled={count >= 4 || (!existing && usedCards.length >= SLOT_COUNT)}
                          >
                            +
                          </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {hasMoreCatalogCards ? (
                <div className="mt-4 flex justify-center">
                  <Button
                    type="button"
                    onClick={() => setVisibleCatalogCount((current) => current + CATALOG_PAGE_SIZE)}
                    className="rounded-xl bg-indigo-600 px-6 text-white hover:bg-indigo-700"
                  >
                    Load More
                  </Button>
                </div>
              ) : null}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-lg border-2 border-indigo-200">
                <p className="text-xs font-bold text-gray-600 mb-2">Selected Cards</p>
                <p className="text-3xl font-bold text-indigo-900">{usedCards.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                <p className="text-xs font-bold text-gray-600 mb-2">Total Copies</p>
                <p className="text-3xl font-bold text-purple-900">{totalCards}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                <p className="text-xs font-bold text-gray-600 mb-2">Avg Cost</p>
                <p className="text-3xl font-bold text-green-900">{averageCost}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-7 p-5 transition-all bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900">AI Action Breakdown</h3>
                  <p className="text-sm text-blue-700">One clean AI flow for selected card, replacements, combos, and deck overview.</p>
                </div>
              </div>
              <Button
                onClick={() => void runUnifiedCardAi()}
                disabled={loadingCardAI || loadingUpgradeAI || loadingDeckAI || !selectedCard}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loadingCardAI || loadingUpgradeAI || loadingDeckAI ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Card AI
              </Button>
            </div>

            {!selectedCard ? (
              <div className="flex flex-col items-center justify-center h-56 text-center bg-white rounded-lg border-2 border-blue-200">
                <BarChart3 className="w-16 h-16 text-blue-300 mb-4" />
                <p className="text-gray-700 text-lg mb-2">Select a card to see its AI battle explanation</p>
                <p className="text-gray-500 text-sm">The selected deck is already being stored for AI Coach deck integration.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border-2 border-blue-300">
                  <div className="flex flex-wrap items-start gap-3">
                    {selectedCard.imageUrl ? (
                      <img
                        src={selectedCard.imageUrl}
                        alt={selectedCard.name}
                        className="w-20 h-28 rounded-lg object-cover border-2 border-blue-200"
                        loading="lazy"
                      />
                    ) : null}
                    <div className="flex flex-wrap items-center gap-3">
                    <Badge className="bg-blue-100 text-blue-900">{selectedCard.name}</Badge>
                    <Badge className="bg-purple-100 text-purple-900">{selectedCard.type}</Badge>
                    <Badge className="bg-yellow-100 text-yellow-900">Cost {selectedCard.cost}</Badge>
                    {selectedCard.power ? <Badge className="bg-red-100 text-red-900">{selectedCard.power} Power</Badge> : null}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-3">{selectedCard.effect || "No effect text available from the cards API."}</p>
                </div>

                <div className="bg-white p-4 rounded-xl border-2 border-cyan-200 min-h-36">
                  <p className="text-sm font-bold text-cyan-900 mb-2">Card AI Overview</p>
                  <p className="text-sm text-gray-800 whitespace-pre-line">
                    {cardAiAnswer || "Run Card AI to get a real explanation for when to play this card, what mistakes to avoid, and how it fits your current deck."}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border-2 border-violet-200 min-h-36">
                  <p className="text-sm font-bold text-violet-900 mb-2">Replacement / Combo Summary</p>
                  <p className="text-sm text-gray-800 whitespace-pre-line">
                    {upgradeAiAnswer || "Card AI will also bring replacement direction, combo ideas, and player-fit summary here."}
                  </p>
                </div>

                {cardIntelResult ? (
                  <div className="grid gap-4">
                    <div className="bg-white p-4 rounded-xl border-2 border-violet-200">
                      <p className="text-sm font-bold text-violet-900 mb-3">Combo Partners</p>
                      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {comboPartnerCards.map((item) => (
                          <SuggestedCardTile key={`combo-${item.card?.id}`} card={item.card!} reason={item.reason} />
                        ))}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border-2 border-pink-200">
                      <p className="text-sm font-bold text-pink-900 mb-3">Replacement Options</p>
                      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {replacementCards.map((item) => (
                          <SuggestedCardTile key={`replacement-${item.card?.id}`} card={item.card!} reason={item.reason} />
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="bg-white p-4 rounded-xl border-2 border-amber-200">
                        <p className="text-sm font-bold text-amber-900 mb-2">Weak Spots</p>
                        <div className="space-y-2">
                          {(cardIntelResult.weakSpots || []).map((spot) => (
                            <p key={spot} className="text-sm text-gray-800">{spot}</p>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border-2 border-emerald-200">
                        <p className="text-sm font-bold text-emerald-900 mb-2">Best For</p>
                        <p className="text-sm text-gray-800">{cardIntelResult.bestFor}</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            <div className="bg-white p-4 rounded-xl border-2 border-pink-200 min-h-40">
              <p className="text-sm font-bold text-pink-900 mb-2">Deck AI Overview & Improvements</p>
              <p className="text-sm text-gray-800 whitespace-pre-line">
                {deckAiAnswer || "Card AI also brings deck overview here: current game plan, weak spots, and what to improve next."}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 transition-all bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-300">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <p className="font-bold text-emerald-900">AI Coach Link Ready</p>
            </div>
            <p className="text-sm text-emerald-800">
              This page now stores your selected leader and cards in the same local keys that AI Coach and AI Verdict read from.
            </p>
            <p className="text-sm text-emerald-700">
              Color match: <span className="font-semibold">{colorMatchCount}</span> / {usedCards.length || 0} cards match your leader color.
            </p>
          </div>
          <Button onClick={handleSaveDeck} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Save className="w-4 h-4" />
            Save Deck To My Collection
          </Button>
        </div>
      </Card>

      {showSaveModal ? (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Save Your Deck</h3>
            <div className="space-y-4">
              <Label className="text-gray-900">Deck Name</Label>
              <Input
                type="text"
                value={deckName}
                onChange={(event) => setDeckName(event.target.value)}
                placeholder="Enter deck name"
                className="w-full"
              />
              <p className="text-sm text-gray-600">
                This save now goes to the backend `saved_decks` collection, and My Collection will read it from there.
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <Button type="button" onClick={() => setShowSaveModal(false)} className="bg-gray-300 text-gray-900 hover:bg-gray-400">
                Cancel
              </Button>
              <Button type="button" onClick={() => void confirmSaveDeck()} className="bg-blue-600 text-white hover:bg-blue-700" disabled={savingDeck}>
                {savingDeck ? "Saving..." : "Save Deck"}
              </Button>
            </div>
            {savedSuccess ? <div className="mt-4 text-sm text-green-600">Deck saved successfully and linked to My Collection.</div> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SuggestedCardTile({ card, reason }: { card: CardData; reason: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="mb-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
      {card.imageUrl ? (
          <img src={card.imageUrl} alt={card.name} className="aspect-[2.5/3.5] w-full object-cover" loading="lazy" />
      ) : (
          <div className="aspect-[2.5/3.5] w-full bg-slate-200" />
      )}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-gray-900 line-clamp-2">{card.name}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge className="bg-slate-900 text-white text-xs">{card.number}</Badge>
          <Badge className="bg-blue-100 text-blue-800 text-xs">{card.type}</Badge>
          <Badge className="bg-yellow-100 text-yellow-800 text-xs">Cost {card.cost}</Badge>
          {card.color ? <Badge className="bg-purple-100 text-purple-800 text-xs">{card.color}</Badge> : null}
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-700">{reason}</p>
      </div>
    </div>
  );
}
