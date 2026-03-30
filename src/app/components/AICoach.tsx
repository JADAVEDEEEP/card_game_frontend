import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, BarChart3, Brain, Compass, Crown, Download, LoaderCircle, Save, Search, Sparkles, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
  rarity?: string;
  pack_id?: string;
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
  effect: string;
  rarity?: string;
  setCode?: string;
  imageUrl?: string;
};

type CoachMove = {
  title: string;
  plan: string;
  winProbability: number;
  riskLevel: "Low" | "Medium" | "High";
  cardAdvantage: string;
  actions: string[];
};

type CoachAnalysis = {
  summary: string;
  bestMove: CoachMove;
  aggressiveMove: CoachMove;
  safeMove: CoachMove;
  boardInsight: string;
  resourceInsight: string;
  riskWarnings: string[];
  nextTurns: Array<{ turnLabel: string; action: string; outcome: string; winProbability: number }>;
};

type OptimizeAnalysis = {
  weaknesses?: string[];
  recommendedCards?: Array<{ cardName: string; cardId: string; explanation: string }>;
  nextBestSwaps?: Array<{
    remove: { cardName: string; cardId: string };
    add: { cardName: string; cardId: string };
    reason: string;
    expectedImpact: number;
  }>;
  consistencyScore?: { score?: number };
  metaFitScore?: { score?: number };
  synergyScore?: { score?: number; archetype?: string };
  deck_power?: { score: number; tier: string };
};

const STORAGE_KEY = "learningGuide_aiCoachDeckLab";
const COLORS = ["#ec4899", "#8b5cf6", "#14b8a6"];
const COLOR_OPTIONS = ["all", "red", "blue", "green", "purple", "black", "yellow"];
const TYPE_OPTIONS = ["all", "leader", "character", "event", "stage"];

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const safeJsonParse = <T,>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
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
  effect: [String(card.effect || "").trim(), String(card.trigger || "").trim()].filter(Boolean).join(" | "),
  rarity: String(card.rarity || "").trim() || undefined,
  setCode: String(card.pack_id || "").trim() || undefined,
  imageUrl: card.id ? withApiBase(`/cardsApi/image/${encodeURIComponent(String(card.id).trim())}`) : undefined,
});

const leaderLabel = (leader: CardData | null) => {
  if (!leader) return "";
  return `${leader.name} (${leader.color || "Unknown"})`;
};

export function AICoach() {
  const importFileRef = useRef<HTMLInputElement | null>(null);
  const [allCards, setAllCards] = useState<CardData[]>([]);
  const [selectedLeader, setSelectedLeader] = useState<CardData | null>(null);
  const [deckCards, setDeckCards] = useState<Map<string, number>>(new Map());
  const [searchTerm, setSearchTerm] = useState("");
  const [colorFilter, setColorFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(60);
  const [loadingCards, setLoadingCards] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  const [analysis, setAnalysis] = useState<CoachAnalysis | null>(null);
  const [optimizeAnalysis, setOptimizeAnalysis] = useState<OptimizeAnalysis | null>(null);
  const [providerInfo, setProviderInfo] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [optimizeStatus, setOptimizeStatus] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [importStatus, setImportStatus] = useState("");

  useEffect(() => {
    const loadCards = async () => {
      setLoadingCards(true);
      setLoadingError(null);
      try {
        const response = await fetch(withApiBase("/cardsApi/cards"));
        const data = response.ok ? ((await response.json()) as ApiCard[]) : [];
        const normalized = data.map(toCardData).filter((card) => card.id && card.name);
        setAllCards(normalized);

        const stored = safeJsonParse<{
          selectedLeader: CardData | null;
          deckEntries: Array<{ cardId: string; count: number }>;
        } | null>(localStorage.getItem(STORAGE_KEY), null);

        if (stored?.selectedLeader?.id) {
          const matchedLeader = normalized.find((card) => card.id === stored.selectedLeader?.id) || stored.selectedLeader;
          setSelectedLeader(matchedLeader);
        }

        if (Array.isArray(stored?.deckEntries)) {
          const nextDeck = new Map<string, number>();
          stored.deckEntries.forEach((entry) => {
            const matched = normalized.find((card) => card.id === entry.cardId);
            if (!matched || matched.type === "Leader") return;
            nextDeck.set(matched.id, Math.max(1, Math.min(4, Number(entry.count || 1))));
          });
          setDeckCards(nextDeck);
        }
      } catch (fetchError) {
        setLoadingError(fetchError instanceof Error ? fetchError.message : "Failed to load cards API.");
      } finally {
        setLoadingCards(false);
      }
    };

    void loadCards();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedLeader,
        deckEntries: Array.from(deckCards.entries()).map(([cardId, count]) => ({ cardId, count })),
      })
    );
  }, [selectedLeader, deckCards]);

  useEffect(() => {
    setVisibleCount(60);
  }, [searchTerm, colorFilter, typeFilter]);

  const filteredCards = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return allCards.filter((card) => {
      const matchesSearch =
        !search ||
        card.name.toLowerCase().includes(search) ||
        card.number.toLowerCase().includes(search);
      const matchesColor = colorFilter === "all" || card.color.toLowerCase().includes(colorFilter);
      const matchesType = typeFilter === "all" || card.type.toLowerCase() === typeFilter;
      return matchesSearch && matchesColor && matchesType;
    });
  }, [allCards, searchTerm, colorFilter, typeFilter]);

  const visibleCards = filteredCards.slice(0, visibleCount);
  const cardById = useMemo(() => new Map(allCards.map((card) => [card.id, card])), [allCards]);
  const selectedDeckCards = useMemo(
    () =>
      Array.from(deckCards.entries())
        .map(([cardId, count]) => {
          const card = cardById.get(cardId);
          return card ? { card, count } : null;
        })
        .filter((entry): entry is { card: CardData; count: number } => Boolean(entry)),
    [deckCards, cardById]
  );

  const totalCards = Array.from(deckCards.values()).reduce((sum, count) => sum + count, 0);
  const uniqueCards = deckCards.size;
  const averageCost =
    totalCards === 0
      ? 0
      : selectedDeckCards.reduce((sum, entry) => sum + entry.card.cost * entry.count, 0) / totalCards;
  const counterCards = selectedDeckCards.reduce((sum, entry) => sum + ((entry.card.counter || 0) > 0 ? entry.count : 0), 0);
  const counterDensity = totalCards === 0 ? 0 : Math.round((counterCards / totalCards) * 100);
  const characterCount = selectedDeckCards.reduce((sum, entry) => sum + (entry.card.type === "Character" ? entry.count : 0), 0);
  const eventCount = selectedDeckCards.reduce((sum, entry) => sum + (entry.card.type === "Event" ? entry.count : 0), 0);
  const stageCount = selectedDeckCards.reduce((sum, entry) => sum + (entry.card.type === "Stage" ? entry.count : 0), 0);

  const curveBuckets: Record<string, number> = { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6+": 0 };
  selectedDeckCards.forEach((entry) => {
    const key = entry.card.cost >= 6 ? "6+" : String(Math.max(0, entry.card.cost));
    curveBuckets[key] += entry.count;
  });
  const curveData = Object.entries(curveBuckets).map(([cost, count]) => ({ cost, count }));

  const moveData = analysis
    ? [
        { name: "Best", value: analysis.bestMove.winProbability },
        { name: "Aggressive", value: analysis.aggressiveMove.winProbability },
        { name: "Safe", value: analysis.safeMove.winProbability },
      ]
    : [];

  const analyticsWinRate = useMemo(() => {
    if (optimizeAnalysis?.metaFitScore?.score) {
      return Math.max(1, Math.min(99, Math.round(optimizeAnalysis.metaFitScore.score)));
    }
    if (analysis?.bestMove?.winProbability) {
      return analysis.bestMove.winProbability;
    }
    const base = 38 + Math.min(22, Math.round(averageCost * 4)) + Math.min(18, Math.round(counterDensity / 4));
    return Math.max(1, Math.min(99, base));
  }, [optimizeAnalysis, analysis, averageCost, counterDensity]);

  const pilotProfile = useMemo(() => {
    if (eventCount >= 10 && averageCost <= 3) {
      return {
        title: "Technical Tempo Player",
        note: "Jo player sequencing, resource trading aur fast decision making me strong ho uske liye ye deck fit hai.",
      };
    }
    if (stageCount >= 4 || averageCost >= 4) {
      return {
        title: "Patient Control Player",
        note: "Jo player slow setup, value planning aur long game enjoy karta hai uske liye ye build better hai.",
      };
    }
    if (characterCount >= 28 && counterDensity <= 35) {
      return {
        title: "Aggressive Pressure Player",
        note: "Jo player proactive attacks aur board pressure se game close karta hai uske liye ye deck zyada natural lagega.",
      };
    }
    return {
      title: "Balanced Midrange Player",
      note: "Jo player adaptable lines choose karta hai aur attack aur defense dono mix me khelta hai uske liye ye build accha rahega.",
    };
  }, [eventCount, averageCost, stageCount, characterCount, counterDensity]);

  const analyticsChartData = useMemo(
    () => [
      { name: "Estimated Win %", value: analyticsWinRate },
      { name: "Consistency", value: optimizeAnalysis?.consistencyScore?.score || Math.max(20, 100 - Math.abs(averageCost * 14 - 42)) },
      { name: "Counter Density", value: counterDensity },
    ],
    [analyticsWinRate, optimizeAnalysis, averageCost, counterDensity]
  );

  const addCard = (card: CardData) => {
    if (card.type === "Leader") {
      setSelectedLeader(card);
      return;
    }
    const current = deckCards.get(card.id) || 0;
    if (current >= 4 || totalCards >= 50) return;
    const nextDeck = new Map(deckCards);
    nextDeck.set(card.id, current + 1);
    setDeckCards(nextDeck);
  };

  const removeCard = (card: CardData) => {
    const current = deckCards.get(card.id) || 0;
    if (current <= 0) return;
    const nextDeck = new Map(deckCards);
    if (current === 1) nextDeck.delete(card.id);
    else nextDeck.set(card.id, current - 1);
    setDeckCards(nextDeck);
  };

  const analyticsPayload = () => ({
    leader: selectedLeader
      ? {
          card_code: selectedLeader.id,
          name: selectedLeader.name,
          color: selectedLeader.color,
          type: selectedLeader.type.toLowerCase(),
          cost: selectedLeader.cost,
          power: selectedLeader.power || 0,
          counter: selectedLeader.counter || 0,
          effect: selectedLeader.effect,
        }
      : null,
    deck_size: totalCards,
    decklist: selectedDeckCards.map((entry) => ({
      card_code: entry.card.id,
      count: entry.count,
      card: {
        card_code: entry.card.id,
        id: entry.card.id,
        name: entry.card.name,
        cost: entry.card.cost,
        power: entry.card.power || 0,
        type: entry.card.type.toLowerCase(),
        color: entry.card.color.toLowerCase() || "red",
        counter: entry.card.counter || 0,
        effect: entry.card.effect,
        rarity: entry.card.rarity || "-",
        set_code: entry.card.setCode || "SET",
        image_url: "",
      },
    })),
  });

  const handleRunAnalytics = async () => {
    if (!selectedLeader) return void setOptimizeStatus("Leader select karo, phir analytics run karo.");
    if (totalCards === 0) return void setOptimizeStatus("Deck me cards add karo, phir analytics run karo.");

    setOptimizing(true);
    setOptimizeStatus("Deck analytics load ho rahi hai...");
    try {
      const response = await fetch(withApiBase("/analytics/optimize"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(analyticsPayload()),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload?.message || `Analytics API failed (${response.status})`);
      setOptimizeAnalysis(payload as OptimizeAnalysis);
      setOptimizeStatus("Deck analytics ready.");
    } catch (fetchError) {
      setOptimizeAnalysis(null);
      setOptimizeStatus(fetchError instanceof Error ? fetchError.message : "Deck analytics failed.");
    } finally {
      setOptimizing(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedLeader) {
      setAiError("Leader select karo before AI analysis.");
      setAnalysis(null);
      return;
    }
    if (totalCards === 0) {
      setAiError("Deck me kuch cards add karo before AI analysis.");
      setAnalysis(null);
      return;
    }

    setIsAnalyzing(true);
    setAiError(null);
    try {
      const response = await fetch(withApiBase("/ai/coach"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedLeader: leaderLabel(selectedLeader),
          turnNumber: 4,
          yourLife: 4,
          oppLife: 4,
          yourHand: 5,
          oppHand: 5,
          donAvailable: Math.min(10, Math.max(1, Math.round(averageCost + 2))),
          attackers: Math.min(5, Math.max(1, Math.round(characterCount / 10))),
          blockers: Math.min(4, Math.max(0, Math.round(counterDensity / 25))),
          restedChars: Math.max(0, Math.round(stageCount / 2)),
          triggerDeck: eventCount >= 8,
          aggressiveMode: characterCount > eventCount + stageCount,
          defensiveMode: counterDensity >= 35,
          importedLeader: {
            id: selectedLeader.id,
            number: selectedLeader.number,
            name: selectedLeader.name,
            type: selectedLeader.type,
            color: selectedLeader.color,
          },
          importedCards: selectedDeckCards.map((entry) => ({
            id: entry.card.id,
            number: entry.card.number,
            name: entry.card.name,
            type: entry.card.type,
            color: entry.card.color,
            cost: entry.card.cost,
            power: String(entry.card.power || ""),
            effect: entry.card.effect,
          })),
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload?.analysis) {
        throw new Error(payload?.message || "AI deck analysis failed.");
      }

      setAnalysis(payload.analysis as CoachAnalysis);
      setProviderInfo(`${payload?.provider || "ai"} • ${payload?.model || ""}`.trim());
    } catch (fetchError) {
      setAnalysis(null);
      setAiError(fetchError instanceof Error ? fetchError.message : "AI deck analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveDeck = async () => {
    if (!selectedLeader) return void setSaveStatus("Leader select karo before saving.");
    if (totalCards === 0) return void setSaveStatus("Deck me cards add karo before saving.");

    try {
      setSaveStatus("Deck save ho raha hai...");
      const payload = {
        deck_name: `${selectedLeader.name} AI Coach Deck`,
        leader: {
          card_code: selectedLeader.id,
          name: selectedLeader.name,
          color: selectedLeader.color,
        },
        deck_cards: selectedDeckCards.map((entry) => ({ card_code: entry.card.id, count: entry.count })),
        tags: ["ai-coach", selectedLeader.color || "unknown"],
        notes: "Built inside One-Piece-TCG-Learning-Guide AI Coach.",
      };
      const response = await fetch(withApiBase("/decks/save"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.message || `Failed to save deck (${response.status})`);
      setSaveStatus(`Saved: ${data?.deck_name || payload.deck_name}`);
    } catch (fetchError) {
      setSaveStatus(fetchError instanceof Error ? fetchError.message : "Failed to save deck.");
    }
  };

  const applyImportedDeck = (rawText: string) => {
    let parsed: any = null;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      parsed = null;
    }

    const deckEntries = Array.isArray(parsed?.deck_cards)
      ? parsed.deck_cards
      : String(rawText || "")
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const strict = line.match(/^(\d+)\s*x\s*([A-Za-z]{1,5}\d{2}-\d{3}(?:[_-][A-Za-z0-9]+)?)$/i);
            return strict ? { card_code: String(strict[2]).toUpperCase(), count: Number(strict[1] || 1) } : null;
          })
          .filter(Boolean);

    if (!Array.isArray(deckEntries) || deckEntries.length === 0) {
      setImportStatus("No valid deck cards found in selected file.");
      return;
    }

    const nextDeck = new Map<string, number>();
    let accepted = 0;
    for (const rawEntry of deckEntries) {
      const cardCode = String(rawEntry?.card_code || "").trim().toUpperCase();
      const count = Math.max(1, Math.min(4, Number(rawEntry?.count || 1)));
      const matched = allCards.find((card) => card.id.toUpperCase() === cardCode);
      if (!matched || matched.type === "Leader") continue;
      const existing = nextDeck.get(matched.id) || 0;
      const allowed = Math.min(4 - existing, 50 - accepted, count);
      if (allowed <= 0) continue;
      nextDeck.set(matched.id, existing + allowed);
      accepted += allowed;
      if (accepted >= 50) break;
    }

    const leaderCode = String(parsed?.leader?.card_code || "").trim().toUpperCase();
    const matchedLeader = leaderCode ? allCards.find((card) => card.id.toUpperCase() === leaderCode && card.type === "Leader") || null : null;

    if (nextDeck.size === 0) {
      setImportStatus("Imported deck ka koi card current pool me match nahi hua.");
      return;
    }

    setDeckCards(nextDeck);
    if (matchedLeader) setSelectedLeader(matchedLeader);
    setImportStatus(`Deck imported: ${accepted} cards${matchedLeader ? ` + ${matchedLeader.name}` : ""}.`);
  };

  const onImportDeckFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const rawText = await file.text();
      applyImportedDeck(rawText);
    } catch {
      setImportStatus("Failed to read deck file.");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-violet-500">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Deck Lab</h2>
                <p className="text-sm text-gray-700">Build your deck, review cards with images, run analytics, and analyze the same deck with AI.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <input ref={importFileRef} type="file" accept=".json,.txt,.deck" className="hidden" onChange={(event) => void onImportDeckFile(event)} />
            <Button variant="outline" onClick={() => importFileRef.current?.click()}><Download className="mr-2 h-4 w-4" />Import Deck</Button>
            <Button variant="outline" onClick={handleSaveDeck}><Save className="mr-2 h-4 w-4" />Save Deck</Button>
            <Button variant="outline" onClick={() => { setSelectedLeader(null); setDeckCards(new Map()); setAnalysis(null); setOptimizeAnalysis(null); setAiError(null); }}><X className="mr-2 h-4 w-4" />Reset</Button>
          </div>
        </div>
        {saveStatus ? <p className="mt-3 text-xs text-gray-600">{saveStatus}</p> : null}
        {importStatus ? <p className="mt-1 text-xs text-gray-600">{importStatus}</p> : null}
      </Card>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-6 lg:col-span-4">
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-cyan-950">Builder Controls</h3>
              <p className="text-sm text-cyan-700">Search, filter, pick a leader, and run analysis.</p>
            </div>

            <div className="rounded-xl border border-cyan-200 bg-white p-4">
              <label className="mb-2 block text-xs font-bold text-cyan-900">Search Cards</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Name or code..." className="w-full rounded-lg border border-cyan-200 px-10 py-2" />
              </div>
            </div>

            <FilterSelect label="Color" value={colorFilter} setValue={setColorFilter} options={COLOR_OPTIONS} />
            <FilterSelect label="Type" value={typeFilter} setValue={setTypeFilter} options={TYPE_OPTIONS} />

            <div className="rounded-xl border border-indigo-200 bg-white p-4">
              <div className="mb-2 flex items-center gap-2"><Crown className="h-4 w-4 text-indigo-600" /><p className="text-xs font-bold text-indigo-900">Leader</p></div>
              {selectedLeader ? (
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">{selectedLeader.name}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-indigo-100 text-indigo-800">{selectedLeader.number}</Badge>
                    <Badge className="bg-slate-100 text-slate-800">{selectedLeader.color || "Unknown"}</Badge>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Select a leader card from the grid.</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MetricTile label="Deck Size" value={`${totalCards}/50`} tone="pink" />
              <MetricTile label="Unique" value={String(uniqueCards)} tone="violet" />
              <MetricTile label="Avg Cost" value={averageCost.toFixed(1)} tone="cyan" />
              <MetricTile label="Counter %" value={`${counterDensity}%`} tone="emerald" />
            </div>

            <Button variant="outline" className="w-full" onClick={handleRunAnalytics} disabled={optimizing}>
              {optimizing ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <BarChart3 className="mr-2 h-4 w-4" />}
              Run Deck Analytics
            </Button>
            <Button className="w-full bg-gradient-to-r from-pink-600 to-violet-600 text-white hover:from-pink-700 hover:to-violet-700" onClick={handleAnalyze} disabled={isAnalyzing}>
              {isAnalyzing ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Analyze Deck With AI
            </Button>

            {optimizeStatus ? <p className="text-xs text-gray-600">{optimizeStatus}</p> : null}
            {aiError ? <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{aiError}</div> : null}
          </div>
        </Card>

        <div className="space-y-6 lg:col-span-8">
          <Card className="border-2 border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-950">Available Cards</h3>
                <p className="text-sm text-slate-600">{loadingCards ? "Loading cards..." : `${filteredCards.length} cards found`}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-slate-100 text-slate-700">Color: {colorFilter}</Badge>
                <Badge className="bg-slate-100 text-slate-700">Type: {typeFilter}</Badge>
              </div>
            </div>

            {loadingError ? <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{loadingError}</div> : null}

            {!loadingCards && filteredCards.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center text-sm text-gray-500">Selected filters ke liye koi card nahi mila.</div>
            ) : (
              <div className="grid max-h-[70vh] grid-cols-1 gap-3 overflow-y-auto pr-1 md:grid-cols-2 xl:grid-cols-3">
                {visibleCards.map((card) => (
                  <CardEntry key={card.id} card={card} count={deckCards.get(card.id) || 0} onAdd={addCard} onRemove={removeCard} />
                ))}
              </div>
            )}

            {!loadingCards && filteredCards.length > visibleCards.length ? (
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={() => setVisibleCount((prev) => prev + 60)}>Load More Cards</Button>
              </div>
            ) : null}
          </Card>

          <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6">
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="list">Deck List</TabsTrigger>
                <TabsTrigger value="curve">Curve</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="ai">AI Output</TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="mt-5 space-y-4">
                <div className="rounded-xl border border-emerald-200 bg-white p-4">
                  <p className="text-sm font-bold text-emerald-900">Built Deck</p>
                  <p className="text-xs text-emerald-700">Yahi deck analytics aur AI payload me jayega.</p>
                </div>
                {selectedDeckCards.length === 0 ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center text-sm text-gray-500">Abhi deck empty hai. Cards add karna start karo.</div>
                ) : (
                  <div className="space-y-2">
                    {selectedDeckCards
                      .sort((a, b) => b.count - a.count || a.card.cost - b.card.cost || a.card.name.localeCompare(b.card.name))
                      .map((entry) => (
                        <div key={entry.card.id} className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-white p-3">
                          <div className="h-16 w-12 overflow-hidden rounded-md border border-emerald-200 bg-slate-100 shrink-0">
                            {entry.card.imageUrl ? (
                              <img src={entry.card.imageUrl} alt={entry.card.name} className="h-full w-full object-cover" loading="lazy" />
                            ) : null}
                          </div>
                          <span className="w-10 rounded-full bg-emerald-100 px-2 py-1 text-center text-sm font-bold text-emerald-800">{entry.count}x</span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-gray-900">{entry.card.name}</p>
                            <p className="text-xs text-gray-500">{entry.card.number} • {entry.card.type} • Cost {entry.card.cost}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => removeCard(entry.card)}>-1</Button>
                            <Button size="sm" variant="outline" onClick={() => addCard(entry.card)}>+1</Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="curve" className="mt-5">
                <div className="grid gap-4 lg:grid-cols-2">
                  <Card className="border border-emerald-200 p-4">
                    <p className="mb-2 text-sm font-bold text-emerald-900">Cost Curve</p>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={curveData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="cost" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                          {curveData.map((entry, index) => (
                            <Cell key={`${entry.cost}-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                  <Card className="border border-emerald-200 p-4">
                    <p className="mb-3 text-sm font-bold text-emerald-900">Role Balance</p>
                    <div className="grid grid-cols-3 gap-3">
                      <MetricTile label="Chars" value={String(characterCount)} tone="emerald" />
                      <MetricTile label="Events" value={String(eventCount)} tone="pink" />
                      <MetricTile label="Stages" value={String(stageCount)} tone="violet" />
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-5 space-y-4">
                {!optimizeAnalysis ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center text-sm text-gray-500">Run Deck Analytics to see optimizer results and suggested changes.</div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                      <MetricTile label="Power" value={optimizeAnalysis.deck_power ? String(optimizeAnalysis.deck_power.score) : "-"} tone="emerald" />
                      <MetricTile label="Tier" value={optimizeAnalysis.deck_power?.tier || "-"} tone="violet" />
                      <MetricTile label="Consistency" value={optimizeAnalysis.consistencyScore?.score ? String(optimizeAnalysis.consistencyScore.score) : "-"} tone="cyan" />
                      <MetricTile label="Meta Fit" value={optimizeAnalysis.metaFitScore?.score ? String(optimizeAnalysis.metaFitScore.score) : "-"} tone="pink" />
                      <MetricTile label="Win %" value={`${analyticsWinRate}%`} tone="emerald" />
                      <MetricTile label="Best Pilot" value={pilotProfile.title} tone="violet" />
                    </div>

                    <Card className="border border-emerald-200 p-4">
                      <p className="mb-3 text-sm font-bold text-emerald-900">Analytics Snapshot Chart</p>
                      <ResponsiveContainer width="100%" height={230}>
                        <BarChart data={analyticsChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                            {analyticsChartData.map((entry, index) => (
                              <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </Card>

                    <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
                      <p className="text-sm font-bold text-violet-950">Best Suited Player</p>
                      <p className="mt-2 text-sm text-violet-900">{pilotProfile.note}</p>
                    </div>

                    {(optimizeAnalysis.weaknesses || []).map((warning) => (
                      <div key={warning} className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{warning}</span>
                      </div>
                    ))}

                    {(optimizeAnalysis.nextBestSwaps || []).map((swap, index) => (
                      <div key={`${swap.remove.cardId}-${swap.add.cardId}-${index}`} className="rounded-xl border border-emerald-200 bg-white p-4">
                        <p className="font-semibold text-gray-900">Remove {swap.remove.cardName} {"->"} Add {swap.add.cardName}</p>
                        <p className="mt-1 text-sm text-gray-600">{swap.reason}</p>
                      </div>
                    ))}

                    {(optimizeAnalysis.recommendedCards || []).map((card) => (
                      <div key={card.cardId} className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
                        <p className="font-semibold text-cyan-950">{card.cardName}</p>
                        <p className="mt-1 text-sm text-cyan-800">{card.explanation}</p>
                      </div>
                    ))}
                  </>
                )}
              </TabsContent>

              <TabsContent value="ai" className="mt-5 space-y-4">
                {!analysis ? (
                  <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-pink-200 bg-pink-50 text-center">
                    {isAnalyzing ? (
                      <>
                        <LoaderCircle className="mb-4 h-12 w-12 animate-spin text-pink-500" />
                        <p className="max-w-md text-sm text-pink-800">AI tumhare built deck ko analyze kar raha hai.</p>
                      </>
                    ) : (
                      <>
                        <Compass className="mb-4 h-12 w-12 text-pink-400" />
                        <p className="max-w-md text-sm text-pink-800">Deck build karne ke baad `Analyze Deck With AI` dabao.</p>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <Card className="border border-pink-200 bg-gradient-to-br from-pink-50 to-white p-4">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="text-sm font-bold text-pink-900">AI Summary</p>
                        {providerInfo ? <Badge className="bg-slate-900 text-white">{providerInfo}</Badge> : null}
                      </div>
                      <p className="text-sm leading-7 text-gray-800">{analysis.summary}</p>
                    </Card>

                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                      <MetricTile label="Best Win %" value={`${analysis.bestMove.winProbability}%`} tone="pink" />
                      <MetricTile label="Deck Win %" value={`${analyticsWinRate}%`} tone="emerald" />
                      <MetricTile label="Best Pilot" value={pilotProfile.title} tone="violet" />
                    </div>

                    <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
                      <p className="text-sm font-bold text-violet-950">Who Should Play This Deck?</p>
                      <p className="mt-2 text-sm text-violet-900">{pilotProfile.note}</p>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                      <MoveCard move={analysis.bestMove} tone="yellow" />
                      <MoveCard move={analysis.aggressiveMove} tone="red" />
                      <MoveCard move={analysis.safeMove} tone="blue" />
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <Card className="border border-pink-200 p-4">
                        <p className="mb-3 text-sm font-bold text-pink-900">Win Split</p>
                        <ResponsiveContainer width="100%" height={250}>
                          <PieChart>
                            <Pie data={moveData} dataKey="value" outerRadius={82} label={({ name, value }) => `${name}: ${value}%`}>
                              {moveData.map((entry, index) => (
                                <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </Card>

                      <Card className="border border-pink-200 p-4">
                        <p className="mb-3 text-sm font-bold text-pink-900">Next Turns</p>
                        <div className="space-y-3">
                          {analysis.nextTurns.map((turn, index) => (
                            <div key={`${turn.turnLabel}-${index}`} className="rounded-xl border border-pink-200 bg-pink-50 p-4">
                              <div className="mb-2 flex items-center justify-between">
                                <p className="font-semibold text-gray-900">{turn.turnLabel}</p>
                                <Badge className="bg-pink-500 text-white">{turn.winProbability}%</Badge>
                              </div>
                              <p className="text-sm text-gray-700">{turn.action}</p>
                              <p className="mt-1 text-xs text-gray-500">{turn.outcome}</p>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>

                    <Card className="border border-pink-200 p-4">
                      <p className="mb-3 text-sm font-bold text-pink-900">Probability Trend</p>
                      <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={analysis.nextTurns}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="turnLabel" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="winProbability" stroke="#ec4899" strokeWidth={3} dot={{ fill: "#ec4899", r: 5 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </Card>

                    <Card className="border border-pink-200 p-4">
                      <p className="mb-3 text-sm font-bold text-pink-900">AI Recommendation Comparison</p>
                      <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={moveData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                            {moveData.map((entry, index) => (
                              <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </Card>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, setValue, options }: { label: string; value: string; setValue: (value: string) => void; options: string[] }) {
  const getOptionLabel = (option: string) => {
    if (option === "all") return label === "Type" ? "All Types" : "All Colors";
    if (label === "Type") {
      if (option === "leader") return "Leader";
      if (option === "character") return "Character";
      if (option === "event") return "Event";
      if (option === "stage") return "Stage";
    }
    return option.charAt(0).toUpperCase() + option.slice(1);
  };

  return (
    <div className="rounded-xl border border-cyan-200 bg-white p-4">
      <label className="mb-2 block text-xs font-bold text-cyan-900">{label}</label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="border-cyan-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {getOptionLabel(option)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function MetricTile({ label, value, tone }: { label: string; value: string; tone: "pink" | "violet" | "cyan" | "emerald" }) {
  const tones = {
    pink: "border-pink-200 bg-pink-50 text-pink-900",
    violet: "border-violet-200 bg-violet-50 text-violet-900",
    cyan: "border-cyan-200 bg-cyan-50 text-cyan-900",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-900",
  };
  return (
    <div className={`rounded-xl border p-3 ${tones[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function MiniInput({ label, value, setValue }: { label: string; value: string; setValue: (value: string) => void }) {
  return (
    <div className="rounded-xl border border-purple-200 bg-white p-3">
      <label className="mb-2 block text-xs font-bold text-purple-900">{label}</label>
      <input type="number" min="0" value={value} onChange={(event) => setValue(event.target.value)} className="w-full rounded-lg border border-purple-200 px-3 py-2" />
    </div>
  );
}

function ToggleRow({ title, checked, setChecked }: { title: string; checked: boolean; setChecked: (checked: boolean) => void }) {
  return (
    <label className="flex items-center justify-between rounded-xl border border-purple-200 bg-white p-4">
      <span className="text-sm font-medium text-gray-900">{title}</span>
      <input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
    </label>
  );
}

function CardEntry({
  card,
  count,
  onAdd,
  onRemove,
}: {
  card: CardData;
  count: number;
  onAdd: (card: CardData) => void;
  onRemove: (card: CardData) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
        {card.imageUrl ? (
          <img src={card.imageUrl} alt={card.name} className="aspect-[2.5/3.5] w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex aspect-[2.5/3.5] items-center justify-center text-xs text-slate-400">No Image</div>
        )}
      </div>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold text-gray-900">{card.name}</p>
          <p className="text-xs text-gray-500">{card.number}</p>
        </div>
        {count > 0 ? <Badge className="bg-slate-900 text-white">x{count}</Badge> : null}
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        <Badge className="bg-blue-100 text-blue-800">{card.type}</Badge>
        <Badge className="bg-yellow-100 text-yellow-800">Cost {card.cost}</Badge>
        {card.color ? <Badge className="bg-slate-100 text-slate-800">{card.color}</Badge> : null}
      </div>
      {card.effect ? <p className="mb-3 line-clamp-3 text-xs text-gray-600">{card.effect}</p> : null}
      <div className="flex gap-2">
        {count > 0 ? <Button size="sm" variant="outline" className="flex-1" onClick={() => onRemove(card)}>-1</Button> : null}
        <Button size="sm" className="flex-1" onClick={() => onAdd(card)}>{card.type === "Leader" ? "Select Leader" : "+1 Add"}</Button>
      </div>
    </div>
  );
}

function MoveCard({ move, tone }: { move: CoachMove; tone: "yellow" | "red" | "blue" }) {
  const shell =
    tone === "yellow"
      ? "border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50"
      : tone === "red"
        ? "border-red-300 bg-gradient-to-br from-red-50 to-rose-50"
        : "border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50";

  return (
    <div className={`rounded-2xl border-2 p-5 ${shell}`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-gray-900">{move.title}</p>
          <p className="mt-1 text-sm text-gray-700">{move.plan}</p>
        </div>
        <Badge className="bg-slate-900 text-white">{move.winProbability}%</Badge>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{move.riskLevel} Risk</span>
        <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">Card Flow {move.cardAdvantage}</span>
      </div>
      <div className="space-y-2">
        {move.actions.map((action) => (
          <div key={action} className="flex items-start gap-2 text-sm text-gray-800">
            <span className="mt-1 h-2 w-2 rounded-full bg-slate-500" />
            <span>{action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
