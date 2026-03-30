import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Crown, GitCompare, Loader2, Sparkles, Swords, Trophy, User } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { withApiBase } from "../data/apiBase";

type CompareCard = {
  card_code: string;
  name: string;
  count: number;
};

type CompareDeck = {
  id: string;
  source: "saved" | "metaDeck" | "metaLeader";
  name: string;
  leaderName: string;
  leaderCode: string;
  color: string;
  cards: CompareCard[];
  deckSize: number;
  baselineWinRate: number;
  description: string;
};

type SavedDeckListItem = {
  _id: string;
  deck_name: string;
  deck_size?: number;
  leader?: {
    card_code?: string;
    name?: string;
    color?: string;
  };
};

type SavedDeckDetail = {
  _id: string;
  deck_name: string;
  deck_size?: number;
  leader?: {
    card_code?: string;
    name?: string;
    color?: string;
  };
  deck_cards?: Array<{
    card_code?: string;
    count?: number;
  }>;
};

type SavedDeckProfile = {
  summary?: {
    win_rate_estimate?: number;
  };
};

type ApiDeckCard = {
  code: string;
  count: number;
  name: string;
};

type ApiDeckEntry = {
  deck_cards?: ApiDeckCard[];
  games?: number;
  winRate?: number;
  wins?: number;
  losses?: number;
};

type ApiLeaderDecklist = {
  _id: string;
  card_id: string;
  leader?: string;
  leader_name?: string;
  setName?: string;
  leaderWinRate?: number;
  decklists?: ApiDeckEntry[];
};

type MetaLeaderSummary = {
  id: string;
  name: string;
  number: string;
  color: string;
  winRate: number;
};

type MetaLeaderDetail = {
  leader: MetaLeaderSummary;
  stats: {
    winRate: number;
  };
  cards: Array<{
    code: string;
    name: string;
    avgCopies: number;
  }>;
};

type OptimizeResponse = {
  deck_power?: { score?: number; tier?: string };
  consistencyScore?: { score?: number };
  synergyScore?: { score?: number };
  metaFitScore?: { score?: number; estimatedWinPercent?: number };
  weaknesses?: string[];
  ai_summary?: string;
};

type CompareAiResponse = {
  deckAWinPercent: number;
  deckBWinPercent: number;
  summary: string;
  explanation?: string[];
};

type CompareOption = {
  value: string;
  label: string;
  source: CompareDeck["source"];
  subtitle: string;
};

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, value));

const parseNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const buildDeckSize = (cards: CompareCard[]) => cards.reduce((sum, card) => sum + card.count, 0);

const normalizeSavedCards = (cards: SavedDeckDetail["deck_cards"]): CompareCard[] =>
  (Array.isArray(cards) ? cards : [])
    .map((card) => ({
      card_code: String(card?.card_code || "").trim(),
      name: String(card?.card_code || "").trim(),
      count: clamp(parseNumber(card?.count, 0), 0, 4),
    }))
    .filter((card) => card.card_code && card.count > 0);

const getColorBadgeStyle = (color: string) => {
  const normalized = color.toLowerCase();
  if (normalized.includes("red")) return "bg-red-100 text-red-800 border-red-300";
  if (normalized.includes("blue")) return "bg-blue-100 text-blue-800 border-blue-300";
  if (normalized.includes("green")) return "bg-green-100 text-green-800 border-green-300";
  if (normalized.includes("yellow")) return "bg-yellow-100 text-yellow-800 border-yellow-300";
  if (normalized.includes("purple")) return "bg-purple-100 text-purple-800 border-purple-300";
  if (normalized.includes("black")) return "bg-slate-200 text-slate-800 border-slate-400";
  return "bg-gray-100 text-gray-800 border-gray-300";
};

const getSourceBadge = (source: CompareDeck["source"]) => {
  if (source === "saved") return "bg-emerald-100 text-emerald-800";
  if (source === "metaDeck") return "bg-blue-100 text-blue-800";
  return "bg-purple-100 text-purple-800";
};

const fetchJson = async <T,>(path: string): Promise<T> => {
  const response = await fetch(withApiBase(path));
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as { message?: string }).message || `Request failed (${response.status})`);
  }
  return data as T;
};

const buildMetaDeckOptions = (leaders: ApiLeaderDecklist[]): CompareOption[] =>
  leaders.flatMap((leader) =>
    (Array.isArray(leader.decklists) ? leader.decklists : []).map((deck, index) => ({
      value: `metaDeck:${leader._id}:${index}`,
      label: `${leader.leader_name || leader.leader || leader.card_id} Deck ${index + 1}`,
      source: "metaDeck" as const,
      subtitle: `${leader.setName || "Tournament decklist"} • ${parseNumber(deck.winRate, 0).toFixed(1)}% WR`,
    }))
  );

const buildSavedDeckOptions = (decks: SavedDeckListItem[]): CompareOption[] =>
  decks.map((deck) => ({
    value: `saved:${deck._id}`,
    label: deck.deck_name,
    source: "saved" as const,
    subtitle: `${deck.leader?.name || deck.leader?.card_code || "Unknown Leader"} • ${deck.deck_size || 0} cards`,
  }));

const buildMetaLeaderOptions = (leaders: MetaLeaderSummary[]): CompareOption[] =>
  leaders.map((leader) => ({
    value: `metaLeader:${leader.number}`,
    label: `${leader.name} Core`,
    source: "metaLeader" as const,
    subtitle: `${leader.color || "Unknown"} • ${leader.winRate.toFixed(1)}% WR`,
  }));

export function DeckCompare() {
  const [savedDecks, setSavedDecks] = useState<SavedDeckListItem[]>([]);
  const [metaDecklists, setMetaDecklists] = useState<ApiLeaderDecklist[]>([]);
  const [metaLeaders, setMetaLeaders] = useState<MetaLeaderSummary[]>([]);
  const [deckAValue, setDeckAValue] = useState("");
  const [deckBValue, setDeckBValue] = useState("");
  const [deckA, setDeckA] = useState<CompareDeck | null>(null);
  const [deckB, setDeckB] = useState<CompareDeck | null>(null);
  const [analysisA, setAnalysisA] = useState<OptimizeResponse | null>(null);
  const [analysisB, setAnalysisB] = useState<OptimizeResponse | null>(null);
  const [aiWinningChance, setAiWinningChance] = useState<CompareAiResponse | null>(null);
  const [loadingSources, setLoadingSources] = useState(true);
  const [loadingCompare, setLoadingCompare] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadSources = async () => {
      try {
        setLoadingSources(true);
        setError(null);

        const [savedResponse, decklistResponse, metaResponse] = await Promise.all([
          fetchJson<{ decks?: SavedDeckListItem[] }>("/decks?limit=50"),
          fetchJson<{ decklists?: ApiLeaderDecklist[] }>("/decks/decklist?limit=40"),
          fetchJson<{ leaders?: MetaLeaderSummary[] }>("/meta/leaders"),
        ]);

        if (cancelled) return;
        setSavedDecks(Array.isArray(savedResponse.decks) ? savedResponse.decks : []);
        setMetaDecklists(Array.isArray(decklistResponse.decklists) ? decklistResponse.decklists : []);
        setMetaLeaders(Array.isArray(metaResponse.leaders) ? metaResponse.leaders : []);
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError instanceof Error ? fetchError.message : "Failed to load compare sources.");
        }
      } finally {
        if (!cancelled) setLoadingSources(false);
      }
    };

    void loadSources();
    return () => {
      cancelled = true;
    };
  }, []);

  const options = useMemo(
    () => [
      ...buildSavedDeckOptions(savedDecks),
      ...buildMetaDeckOptions(metaDecklists),
      ...buildMetaLeaderOptions(metaLeaders),
    ],
    [savedDecks, metaDecklists, metaLeaders]
  );

  const resolveSelection = async (value: string): Promise<CompareDeck | null> => {
    if (!value) return null;

    if (value.startsWith("saved:")) {
      const deckId = value.split(":")[1];
      const [detail, profile] = await Promise.all([
        fetchJson<SavedDeckDetail>(`/decks/${deckId}`),
        fetchJson<SavedDeckProfile>(`/analytics/saved-deck-profile/${deckId}`),
      ]);

      const cards = normalizeSavedCards(detail.deck_cards);
      return {
        id: value,
        source: "saved",
        name: detail.deck_name,
        leaderName: String(detail.leader?.name || detail.leader?.card_code || "Unknown Leader").trim(),
        leaderCode: String(detail.leader?.card_code || "").trim(),
        color: String(detail.leader?.color || "").trim(),
        cards,
        deckSize: detail.deck_size || buildDeckSize(cards),
        baselineWinRate: parseNumber(profile.summary?.win_rate_estimate, 50),
        description: "User saved deck from My Collection.",
      };
    }

    if (value.startsWith("metaDeck:")) {
      const [, leaderId, deckIndexRaw] = value.split(":");
      const deckIndex = parseNumber(deckIndexRaw, 0);
      const leader = metaDecklists.find((entry) => entry._id === leaderId) || null;
      const deck = leader?.decklists?.[deckIndex];
      if (!leader || !deck) return null;

      const cards = (Array.isArray(deck.deck_cards) ? deck.deck_cards : [])
        .map((card) => ({
          card_code: String(card.code || "").trim(),
          name: String(card.name || card.code || "").trim(),
          count: clamp(parseNumber(card.count, 0), 0, 4),
        }))
        .filter((card) => card.card_code && card.count > 0);

      return {
        id: value,
        source: "metaDeck",
        name: `${leader.leader_name || leader.leader || leader.card_id} Deck ${deckIndex + 1}`,
        leaderName: String(leader.leader_name || leader.leader || leader.card_id || "").trim(),
        leaderCode: String(leader.card_id || "").trim(),
        color: "",
        cards,
        deckSize: buildDeckSize(cards),
        baselineWinRate: parseNumber(deck.winRate ?? leader.leaderWinRate, 50),
        description: `${leader.setName || "Tournament meta"} decklist with ${parseNumber(deck.games, 0)} tracked games.`,
      };
    }

    if (value.startsWith("metaLeader:")) {
      const leaderCode = value.split(":")[1];
      const detail = await fetchJson<MetaLeaderDetail>(`/meta/leaders/${encodeURIComponent(leaderCode)}`);
      const cards = (Array.isArray(detail.cards) ? detail.cards : [])
        .map((card) => ({
          card_code: String(card.code || "").trim(),
          name: String(card.name || card.code || "").trim(),
          count: clamp(Math.max(1, Math.round(parseNumber(card.avgCopies, 1))), 1, 4),
        }))
        .filter((card) => card.card_code && card.count > 0)
        .slice(0, 15);

      return {
        id: value,
        source: "metaLeader",
        name: `${detail.leader.name} Meta Core`,
        leaderName: detail.leader.name,
        leaderCode: detail.leader.number,
        color: detail.leader.color,
        cards,
        deckSize: buildDeckSize(cards),
        baselineWinRate: parseNumber(detail.stats?.winRate, 50),
        description: "Meta leader core built from live card presence data.",
      };
    }

    return null;
  };

  useEffect(() => {
    let cancelled = false;
    if (!deckAValue) {
      setDeckA(null);
      return;
    }

    const loadDeckA = async () => {
      try {
        const resolved = await resolveSelection(deckAValue);
        if (!cancelled) setDeckA(resolved);
      } catch (loadError) {
        if (!cancelled) setError(loadError instanceof Error ? loadError.message : "Failed to load Deck A.");
      }
    };

    void loadDeckA();
    return () => {
      cancelled = true;
    };
  }, [deckAValue, metaDecklists]);

  useEffect(() => {
    let cancelled = false;
    if (!deckBValue) {
      setDeckB(null);
      return;
    }

    const loadDeckB = async () => {
      try {
        const resolved = await resolveSelection(deckBValue);
        if (!cancelled) setDeckB(resolved);
      } catch (loadError) {
        if (!cancelled) setError(loadError instanceof Error ? loadError.message : "Failed to load Deck B.");
      }
    };

    void loadDeckB();
    return () => {
      cancelled = true;
    };
  }, [deckBValue, metaDecklists]);

  useEffect(() => {
    let cancelled = false;
    if (!deckA || !deckB) {
      setAnalysisA(null);
      setAnalysisB(null);
      setAiWinningChance(null);
      return;
    }

    const runCompare = async () => {
      try {
        setLoadingCompare(true);
        setError(null);
        setAiWinningChance(null);

        const payloadA = {
          leader: {
            card_code: deckA.leaderCode,
            name: deckA.leaderName,
            color: deckA.color,
          },
          deck_cards: deckA.cards,
          deck_size: deckA.deckSize,
        };

        const payloadB = {
          leader: {
            card_code: deckB.leaderCode,
            name: deckB.leaderName,
            color: deckB.color,
          },
          deck_cards: deckB.cards,
          deck_size: deckB.deckSize,
        };

        const [resultA, resultB, compareAi] = await Promise.all([
          fetch(withApiBase("/analytics/optimize"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payloadA),
          }).then(async (response) => {
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error((data as { message?: string }).message || "Deck A analysis failed.");
            return data as OptimizeResponse;
          }),
          fetch(withApiBase("/analytics/optimize"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payloadB),
          }).then(async (response) => {
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error((data as { message?: string }).message || "Deck B analysis failed.");
            return data as OptimizeResponse;
          }),
          fetch(withApiBase("/analytics/compare-decks-ai"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              deckA,
              deckB,
            }),
          }).then(async (response) => {
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error((data as { message?: string }).message || "AI winning chance failed.");
            return data as CompareAiResponse;
          }),
        ]);

        if (cancelled) return;
        setAnalysisA(resultA);
        setAnalysisB(resultB);
        setAiWinningChance(compareAi);
      } catch (compareError) {
        if (!cancelled) {
          setAiWinningChance(null);
          setError(compareError instanceof Error ? compareError.message : "Failed to compare decks.");
        }
      } finally {
        if (!cancelled) setLoadingCompare(false);
      }
    };

    void runCompare();
    return () => {
      cancelled = true;
    };
  }, [deckA, deckB]);

  const renderDeckPanel = (title: string, value: string, onChange: (value: string) => void, deck: CompareDeck | null, analysis: OptimizeResponse | null, accent: "blue" | "purple") => {
    const accentClasses =
      accent === "blue"
        ? "from-blue-50 to-cyan-50 border-blue-300 text-blue-900"
        : "from-purple-50 to-pink-50 border-purple-300 text-purple-900";

    return (
      <Card className={`p-6 border-2 bg-gradient-to-br ${accentClasses}`}>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <Select value={value} onValueChange={onChange} disabled={loadingSources}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder={loadingSources ? "Loading decks..." : `Choose ${title}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label} - {option.subtitle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {deck ? (
            <div className="space-y-3 rounded-xl border border-white/70 bg-white p-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getSourceBadge(deck.source)}>{deck.source}</Badge>
                {deck.color ? <Badge className={`${getColorBadgeStyle(deck.color)} border`}>{deck.color}</Badge> : null}
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{deck.name}</p>
                <p className="text-sm text-gray-600">Leader: {deck.leaderName} ({deck.leaderCode || "N/A"})</p>
                <p className="text-sm text-gray-600">{deck.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-gray-500">Deck Size</p>
                  <p className="text-xl font-bold text-gray-900">{deck.deckSize}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-gray-500">Baseline WR</p>
                  <p className="text-xl font-bold text-gray-900">{deck.baselineWinRate.toFixed(1)}%</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-gray-500">AI Deck Power</p>
                  <p className="text-xl font-bold text-gray-900">{parseNumber(analysis?.deck_power?.score, 0)}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-gray-500">AI Meta Fit</p>
                  <p className="text-xl font-bold text-gray-900">
                    {parseNumber(analysis?.metaFitScore?.estimatedWinPercent ?? analysis?.metaFitScore?.score, 0)}%
                  </p>
                </div>
              </div>
              {Array.isArray(analysis?.weaknesses) && analysis?.weaknesses.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.weaknesses.slice(0, 4).map((weakness) => (
                    <Badge key={weakness} className="bg-red-100 text-red-800">
                      {weakness}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-white/80 bg-white/70 p-8 text-center text-sm text-gray-600">
              No deck selected
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <GitCompare className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-900">Deck Compare</h2>
        </div>
        <p className="text-gray-900">
          Compare user saved decks, tournament decklists, and meta leader core decks with AI-based winning chance analysis.
        </p>
      </div>

      {error ? (
        <Card className="border-2 border-red-300 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 w-5 h-5 text-red-600" />
            <div>
              <p className="font-bold text-red-900">Deck Compare Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </Card>
      ) : null}

      <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 p-5">
        <div className="flex flex-wrap items-center gap-3 text-sm text-yellow-900">
          <Badge className="bg-emerald-100 text-emerald-800">Saved Decks: {savedDecks.length}</Badge>
          <Badge className="bg-blue-100 text-blue-800">Meta Decklists: {buildMetaDeckOptions(metaDecklists).length}</Badge>
          <Badge className="bg-purple-100 text-purple-800">Meta Leaders: {metaLeaders.length}</Badge>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {renderDeckPanel("Deck A", deckAValue, setDeckAValue, deckA, analysisA, "blue")}
        {renderDeckPanel("Deck B", deckBValue, setDeckBValue, deckB, analysisB, "purple")}
      </div>

      <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
              {loadingCompare ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : <Swords className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-900">AI Winning Chance</h3>
              <p className="text-sm text-green-700">Combined signal from optimize analytics, meta fit, consistency, and baseline win rate.</p>
            </div>
          </div>

          {!deckA || !deckB ? (
            <div className="rounded-xl border-2 border-dashed border-green-300 bg-white p-10 text-center text-gray-600">
              Select two decks to start compare analysis.
            </div>
          ) : loadingCompare ? (
            <div className="rounded-xl border border-green-200 bg-white p-10 text-center">
              <Loader2 className="mx-auto mb-3 w-8 h-8 animate-spin text-green-600" />
              <p className="font-semibold text-green-900">AI compare analysis is running...</p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border-2 border-blue-300 bg-white p-5 text-center">
                  <p className="text-sm text-gray-500">{deckA.name}</p>
                  <p className="mt-2 text-5xl font-bold text-blue-900">
                    {typeof aiWinningChance?.deckAWinPercent === "number" ? `${aiWinningChance.deckAWinPercent}%` : "--"}
                  </p>
                  <p className="mt-2 text-sm text-blue-700">Estimated chance to come out ahead</p>
                </div>
                <div className="rounded-xl border-2 border-purple-300 bg-white p-5 text-center">
                  <p className="text-sm text-gray-500">{deckB.name}</p>
                  <p className="mt-2 text-5xl font-bold text-purple-900">
                    {typeof aiWinningChance?.deckBWinPercent === "number" ? `${aiWinningChance.deckBWinPercent}%` : "--"}
                  </p>
                  <p className="mt-2 text-sm text-purple-700">Estimated chance to come out ahead</p>
                </div>
              </div>

              <div className="rounded-xl border border-green-200 bg-white p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  <p className="font-semibold text-green-900">AI Verdict</p>
                </div>
                <p className="mt-2 text-sm text-gray-700">
                  {aiWinningChance?.summary || "AI winning chance abhi return nahi hua. Backend restart karke ya AI provider keys check karke dobara try karo."}
                </p>
                {Array.isArray(aiWinningChance?.explanation) && aiWinningChance!.explanation.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {aiWinningChance!.explanation.map((item) => (
                      <Badge key={item} className="bg-emerald-100 text-emerald-800">
                        {item}
                      </Badge>
                    ))}
                  </div>
                ) : null}
                {analysisA?.ai_summary || analysisB?.ai_summary ? (
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <p className="text-xs font-bold text-blue-900">Deck A Summary</p>
                      <p className="mt-1 text-sm text-blue-800">{analysisA?.ai_summary || "No AI summary returned."}</p>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-3">
                      <p className="text-xs font-bold text-purple-900">Deck B Summary</p>
                      <p className="mt-1 text-sm text-purple-800">{analysisB?.ai_summary || "No AI summary returned."}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-gray-100 p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-slate-700" />
            <h3 className="text-xl font-bold text-slate-900">Compare Sources</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-emerald-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" />
                <p className="font-semibold text-emerald-900">Saved Decks</p>
              </div>
              <p className="mt-2 text-sm text-gray-700">Decks created by the user and saved in backend collection.</p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-blue-600" />
                <p className="font-semibold text-blue-900">Meta Decklists</p>
              </div>
              <p className="mt-2 text-sm text-gray-700">Tournament-style decklists fetched from backend decklist API.</p>
            </div>
            <div className="rounded-xl border border-purple-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-purple-600" />
                <p className="font-semibold text-purple-900">Meta Leader Deck</p>
              </div>
              <p className="mt-2 text-sm text-gray-700">Leader-level meta core generated from `meta leader` card presence data.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
