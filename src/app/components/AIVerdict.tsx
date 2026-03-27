import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Trophy, Target, AlertCircle, Lightbulb, TrendingUp, Brain, ExternalLink } from "lucide-react";

interface DeckRecommendation {
  name: string;
  colors: string[];
  archetype: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  bestMatchups: string[];
  worstMatchups: string[];
  winProbability: number;
}

interface GamePlan {
  phase: string;
  turns: string;
  plan: string[];
}

export function AIVerdict() {
  const recommendation: DeckRecommendation = {
    name: "Counter Drain Aggro",
    colors: ["Red", "Black"],
    archetype: "Aggressive Tempo",
    difficulty: "Intermediate",
    bestMatchups: [
      "Control Black (72%)",
      "Trigger Yellow (78%)",
      "Ramp Purple (81%)"
    ],
    worstMatchups: [
      "Blocker Green (45%)",
      "Life Gain Yellow (38%)"
    ],
    winProbability: 68
  };

  const gamePlan: GamePlan[] = [
    {
      phase: "Early Game",
      turns: "Turns 1-3",
      plan: [
        "Deploy 2-3 low-cost pressure units",
        "Attack leader immediately to drain counters",
        "Use removal on key blockers only",
        "Keep at least 1 DON for counter if going second"
      ]
    },
    {
      phase: "Midgame",
      turns: "Turns 4-6",
      plan: [
        "Continue counter drain pressure",
        "Remove opponent's key threats with Black removal",
        "Build toward lethal calculation",
        "Don't overcommit to board (board wipe risk)",
        "Maintain 2-3 cards in hand for flexibility"
      ]
    },
    {
      phase: "Endgame",
      turns: "Turns 7+",
      plan: [
        "Execute lethal with counter-empty opponent",
        "Use DON boosts to push damage through",
        "If opponent at 1 life, consider life lock strategy",
        "Always check for exactly lethal before committing"
      ]
    }
  ];

  const coreMoves = [
    { num: 2, name: "Life First, Board Later", why: "Core to counter drain strategy" },
    { num: 9, name: "Counter Drain Turn", why: "Primary win condition enabler" },
    { num: 18, name: "Counter Math Forcing", why: "Makes single counters insufficient" },
    { num: 22, name: "Lethal Setup", why: "Endgame execution precision" }
  ];

  const aiLogic = [
    { input: "Expected opponents", weight: "35%", explanation: "Weighted by meta share + your selection" },
    { input: "Matchup win rates", weight: "30%", explanation: "Historical data from Limitless TCG" },
    { input: "Consistency metrics", weight: "20%", explanation: "Curve, DON efficiency, dead card rate" },
    { input: "Your playstyle", weight: "10%", explanation: "Tempo preference + tactical skill level" },
    { input: "Decision complexity", weight: "5%", explanation: "Lower complexity = fewer misplays" }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "#2ECC40";
      case "Intermediate": return "#FFDC00";
      case "Advanced": return "#FF851B";
      case "Expert": return "#D0021B";
      default: return "#999";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--theme-primary)' }}>
          <Trophy className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">AI VERDICT</span>
        </div>
        <h1 className="text-4xl font-bold text-white">
          Your Optimal Deck
        </h1>
        <p className="text-lg text-white max-w-2xl mx-auto">
          AI-optimized recommendation for maximum win consistency
        </p>
      </div>

      {/* Deck Recommendation Card */}
      <Card className="p-6 border-4" style={{ borderColor: '#D0021B' }}>
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#0A1F44' }}>
              {recommendation.name}
            </h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {recommendation.colors.map((color, index) => (
                <Badge key={index} className="px-3 py-1 text-white" style={{ backgroundColor: '#0A1F44' }}>
                  {color}
                </Badge>
              ))}
              <Badge variant="outline" style={{ borderColor: '#C19A6B' }}>
                {recommendation.archetype}
              </Badge>
              <Badge
                className="text-white"
                style={{ backgroundColor: getDifficultyColor(recommendation.difficulty) }}
              >
                {recommendation.difficulty}
              </Badge>
            </div>
          </div>
          <div className="text-center shrink-0">
            <div className="flex items-center justify-center w-20 h-20 rounded-full border-4 mb-2" style={{ borderColor: '#2ECC40' }}>
              <span className="text-2xl font-bold" style={{ color: '#2ECC40' }}>
                {recommendation.winProbability}%
              </span>
            </div>
            <p className="text-xs text-gray-600">Expected Win Rate</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Best Matchups */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-green-600" />
              <p className="text-sm font-bold text-gray-600">BEST MATCHUPS</p>
            </div>
            <div className="space-y-2">
              {recommendation.bestMatchups.map((matchup, index) => (
                <div key={index} className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm font-semibold text-green-800">{matchup}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Worst Matchups */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm font-bold text-gray-600">WORST MATCHUPS (HONEST)</p>
            </div>
            <div className="space-y-2">
              {recommendation.worstMatchups.map((matchup, index) => (
                <div key={index} className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm font-semibold text-red-800">{matchup}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* How This Deck Wins Games */}
      <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#0A1F44' }}>
          How This Deck Wins Games
        </h2>

        <div className="space-y-6">
          {gamePlan.map((phase, index) => (
            <div key={index} className="p-4 rounded-lg border-l-4" style={{ borderColor: index === 0 ? '#2ECC40' : index === 1 ? '#FFDC00' : '#D0021B', backgroundColor: '#FFF9F0' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold" style={{ color: '#0A1F44' }}>
                  {phase.phase}
                </h3>
                <Badge variant="outline">{phase.turns}</Badge>
              </div>
              <ul className="space-y-2">
                {phase.plan.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start gap-3">
                    <span className="font-bold shrink-0" style={{ color: '#D0021B' }}>→</span>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Core Masterpiece Moves */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5" style={{ color: '#C19A6B' }} />
            <p className="text-sm font-bold text-gray-600">CORE MASTERPIECE MOVES</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {coreMoves.map((move) => (
              <Card key={move.num} className="p-4 border-2" style={{ borderColor: '#C19A6B' }}>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full font-bold text-white shrink-0" style={{ backgroundColor: '#0A1F44' }}>
                    {move.num}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold mb-1" style={{ color: '#0A1F44' }}>
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

      {/* Win Probability Context */}
      <Card className="p-6 border-2" style={{ borderColor: '#C19A6B', backgroundColor: '#FFF9F0' }}>
        <div className="flex items-start gap-4">
          <Brain className="w-8 h-8 shrink-0" style={{ color: '#0A1F44' }} />
          <div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#0A1F44' }}>
              Win Probability Context
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 mb-4">
              Against your selected opponents and current meta snapshot, this deck maximizes decision pressure and minimizes variance. 
              With correct execution, it approaches very high win consistency in controlled practice environments.
            </p>
            <div className="p-4 rounded-lg bg-white border" style={{ borderColor: '#C19A6B' }}>
              <p className="text-xs font-bold text-gray-500 mb-2">IMPORTANT NOTE</p>
              <p className="text-sm">
                This AI recommendation optimizes for consistency, not guaranteed wins. 
                Success requires proper execution of masterpiece moves and matchup-specific adjustments. 
                Use Practice Scenarios and Training Playlist to master this deck's gameplan.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Logic Visualization */}
      <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5" style={{ color: '#0A1F44' }} />
          <h3 className="text-xl font-bold" style={{ color: '#0A1F44' }}>
            AI Logic Breakdown
          </h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Understanding how the AI weighted your inputs
        </p>

        <div className="space-y-3">
          {aiLogic.map((logic, index) => (
            <div key={index} className="p-4 rounded-lg bg-white border" style={{ borderColor: '#C19A6B' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold" style={{ color: '#0A1F44' }}>
                  {logic.input}
                </p>
                <Badge className="bg-blue-500 text-white">
                  {logic.weight}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: logic.weight,
                      backgroundColor: '#0A1F44'
                    }}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">{logic.explanation}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Learning Mode Integration */}
      <div className="grid md:grid-cols-3 gap-4">
        <Button className="gap-2 py-6" style={{ backgroundColor: '#0A1F44' }}>
          <Target className="w-5 h-5" />
          Train with This Deck
        </Button>
        <Button variant="outline" className="gap-2 py-6" style={{ borderColor: '#C19A6B' }}>
          <AlertCircle className="w-5 h-5" />
          My Common Mistakes
        </Button>
        <Button variant="outline" className="gap-2 py-6" style={{ borderColor: '#C19A6B' }}>
          <Brain className="w-5 h-5" />
          Generate Matchup Drills
        </Button>
      </div>
    </div>
  );
}