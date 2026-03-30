import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Brain, ExternalLink, Lightbulb, RefreshCw, Target, TrendingUp, Trophy } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { withApiBase } from "../data/apiBase";

type ImportedCard = {
  id: string;
  number: string;
  name: string;
  type: string;
  color: string;
  cost: number;
  power?: string;
  role?: string;
  effect?: string;
};

type ImportedLeader = {
  number?: string;
  name?: string;
  color?: string;
  type?: string;
  role?: string;
};

type DeckRecommendation = {
  name: string;
  colors: string[];
  archetype: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  bestMatchups: string[];
  worstMatchups: string[];
  winProbability: number;
};

type GamePlan = {
  phase: string;
  turns: string;
  plan: string[];
};

type CoreMove = {
  num: number;
  name: string;
  why: string;
};

type AiLogic = {
  input: string;
  weight: string;
  explanation: string;
};

type VerdictPayload = {
  deckRecommendation: DeckRecommendation;
  gamePlan: GamePlan[];
  coreMoves: CoreMove[];
  whyThisDeckWins: string;
  importantNote: string;
  aiLogic: AiLogic[];
};

type VerdictResponse = {
  provider: string;
  model: string;
  verdict: VerdictPayload;
};

const safeJsonParse = <T,>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const extractStoredCards = (storedCards: Record<string, unknown>[]) =>
  storedCards
    .map((entry) => {
      const maybeSlot = entry.card && typeof entry.card === "object" ? (entry.card as Record<string, unknown>) : entry;
      return {
        ...maybeSlot,
        count: Number(entry.count || maybeSlot.count || 1),
      };
    })
    .filter((card) => String(card.id || card.number || card.code || "").trim() || String(card.name || "").trim());

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "#2ECC40";
    case "Intermediate":
      return "#FFDC00";
    case "Advanced":
      return "#FF851B";
    case "Expert":
      return "#D0021B";
    default:
      return "#999";
  }
};

export function AIVerdict() {
  const [importedCards, setImportedCards] = useState<ImportedCard[]>([]);
  const [importedLeader, setImportedLeader] = useState<ImportedLeader | null>(null);
  const [verdict, setVerdict] = useState<VerdictPayload | null>(null);
  const [providerInfo, setProviderInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const notesFromCoach = useMemo(() => {
    const coach = safeJsonParse<{ analysis?: { summary?: string } }>(
      localStorage.getItem("learningGuide_aiCoachAnalysis"),
      {}
    );
    return coach.analysis?.summary || "";
  }, []);

  const loadImportedDeck = () => {
    const cards = extractStoredCards(
      safeJsonParse<Record<string, unknown>[]>(
        localStorage.getItem("cardActionIntelligence_selectedCards"),
        []
      ).filter(Boolean)
    ) as ImportedCard[];
    const leader = safeJsonParse<ImportedLeader | null>(
      localStorage.getItem("cardActionIntelligence_selectedLeader"),
      null
    );
    setImportedCards(cards);
    setImportedLeader(leader);
    return { cards, leader };
  };

  const runVerdict = async () => {
    const { cards, leader } = loadImportedDeck();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(withApiBase("/ai/verdict"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          importedLeader: leader,
          importedCards: cards,
          notes: notesFromCoach,
        }),
      });

      const data = (await response.json()) as Partial<VerdictResponse> & { message?: string };
      if (!response.ok || !data.verdict) {
        throw new Error(data.message || "Failed to generate AI verdict.");
      }

      setVerdict(data.verdict);
      setProviderInfo(`${data.provider || "ai"} • ${data.model || ""}`.trim());
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to generate AI verdict.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { cards, leader } = loadImportedDeck();
    if (cards.length > 0 || leader) {
      void runVerdict();
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: "var(--theme-primary)" }}>
          <Trophy className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">AI VERDICT</span>
        </div>
        <h1 className="text-4xl font-bold text-white">Your Optimal Deck</h1>
        <p className="text-lg text-white max-w-2xl mx-auto">
          Groq-powered verdict built from your imported leader, selected cards, and latest AI coach context.
        </p>
      </div>

      <Card className="p-4 border-2" style={{ borderColor: "#C19A6B" }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold" style={{ color: "#0A1F44" }}>Imported Deck Context</p>
            <p className="text-sm text-gray-700">
              Leader: <span className="font-semibold">{importedLeader?.name || "Not imported"}</span> • Cards:{" "}
              <span className="font-semibold">{importedCards.length}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {providerInfo ? <Badge className="bg-slate-900 text-white">{providerInfo}</Badge> : null}
            <Button onClick={() => void runVerdict()} disabled={loading} className="gap-2" style={{ backgroundColor: "#0A1F44" }}>
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
              {loading ? "Generating..." : "Refresh AI Verdict"}
            </Button>
          </div>
        </div>
      </Card>

      {error ? (
        <Card className="p-4 border-2 border-red-300 bg-red-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-red-900">AI Verdict Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </Card>
      ) : null}

      {!verdict && !loading ? (
        <Card className="p-8 border-2" style={{ borderColor: "#C19A6B" }}>
          <div className="text-center space-y-3">
            <Brain className="w-16 h-16 mx-auto" style={{ color: "#0A1F44" }} />
            <p className="text-lg font-semibold" style={{ color: "#0A1F44" }}>No AI verdict yet</p>
            <p className="text-sm text-gray-600">
              Import a leader or cards through Card Action Intelligence, then refresh the verdict.
            </p>
          </div>
        </Card>
      ) : null}

      {verdict ? (
        <>
          <Card className="p-6 border-4" style={{ borderColor: "#D0021B" }}>
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: "#0A1F44" }}>
                  {verdict.deckRecommendation.name}
                </h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  {verdict.deckRecommendation.colors.map((color) => (
                    <Badge key={color} className="px-3 py-1 text-white" style={{ backgroundColor: "#0A1F44" }}>
                      {color}
                    </Badge>
                  ))}
                  <Badge variant="outline" style={{ borderColor: "#C19A6B" }}>
                    {verdict.deckRecommendation.archetype}
                  </Badge>
                  <Badge
                    className="text-white"
                    style={{ backgroundColor: getDifficultyColor(verdict.deckRecommendation.difficulty) }}
                  >
                    {verdict.deckRecommendation.difficulty}
                  </Badge>
                </div>
              </div>
              <div className="text-center shrink-0">
                <div className="flex items-center justify-center w-20 h-20 rounded-full border-4 mb-2" style={{ borderColor: "#2ECC40" }}>
                  <span className="text-2xl font-bold" style={{ color: "#2ECC40" }}>
                    {verdict.deckRecommendation.winProbability}%
                  </span>
                </div>
                <p className="text-xs text-gray-600">Expected Win Rate</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-bold text-gray-600">BEST MATCHUPS</p>
                </div>
                <div className="space-y-2">
                  {verdict.deckRecommendation.bestMatchups.map((matchup) => (
                    <div key={matchup} className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-sm font-semibold text-green-800">{matchup}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm font-bold text-gray-600">WORST MATCHUPS (HONEST)</p>
                </div>
                <div className="space-y-2">
                  {verdict.deckRecommendation.worstMatchups.map((matchup) => (
                    <div key={matchup} className="p-3 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-sm font-semibold text-red-800">{matchup}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2" style={{ borderColor: "#C19A6B" }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#0A1F44" }}>
              How This Deck Wins Games
            </h2>

            <div className="space-y-6">
              {verdict.gamePlan.map((phase) => (
                <div key={phase.phase} className="p-4 rounded-lg border-l-4" style={{ borderColor: "#C19A6B", backgroundColor: "#FFF9F0" }}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold" style={{ color: "#0A1F44" }}>
                      {phase.phase}
                    </h3>
                    <Badge variant="outline">{phase.turns}</Badge>
                  </div>
                  <ul className="space-y-2">
                    {phase.plan.map((step) => (
                      <li key={step} className="flex items-start gap-3">
                        <span className="font-bold shrink-0" style={{ color: "#D0021B" }}>→</span>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5" style={{ color: "#C19A6B" }} />
                <p className="text-sm font-bold text-gray-600">CORE MASTERPIECE MOVES</p>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {verdict.coreMoves.map((move) => (
                  <Card key={`${move.num}-${move.name}`} className="p-4 border-2" style={{ borderColor: "#C19A6B" }}>
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full font-bold text-white shrink-0" style={{ backgroundColor: "#0A1F44" }}>
                        {move.num}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold mb-1" style={{ color: "#0A1F44" }}>
                          {move.name}
                        </p>
                        <p className="text-xs text-gray-600">{move.why}</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2" style={{ borderColor: "#C19A6B", backgroundColor: "#FFF9F0" }}>
            <div className="flex items-start gap-4">
              <Brain className="w-8 h-8 shrink-0" style={{ color: "#0A1F44" }} />
              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#0A1F44" }}>
                  Win Probability Context
                </h3>
                <p className="text-sm leading-relaxed text-gray-700 mb-4">{verdict.whyThisDeckWins}</p>
                <div className="p-4 rounded-lg bg-white border" style={{ borderColor: "#C19A6B" }}>
                  <p className="text-xs font-bold text-gray-500 mb-2">IMPORTANT NOTE</p>
                  <p className="text-sm">{verdict.importantNote}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2" style={{ borderColor: "#C19A6B" }}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5" style={{ color: "#0A1F44" }} />
              <h3 className="text-xl font-bold" style={{ color: "#0A1F44" }}>
                AI Logic Breakdown
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Understanding how the AI weighted your imported deck context.</p>
            <div className="space-y-3">
              {verdict.aiLogic.map((logic) => (
                <div key={`${logic.input}-${logic.weight}`} className="p-4 rounded-lg bg-white border" style={{ borderColor: "#C19A6B" }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold" style={{ color: "#0A1F44" }}>{logic.input}</p>
                    <Badge className="bg-blue-500 text-white">{logic.weight}</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: logic.weight, backgroundColor: "#0A1F44" }} />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{logic.explanation}</p>
                </div>
              ))}
            </div>
          </Card>
        </>
      ) : null}
    </div>
  );
}
