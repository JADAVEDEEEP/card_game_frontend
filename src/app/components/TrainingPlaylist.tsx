import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ListOrdered, Calendar, Target, Brain, Trophy } from "lucide-react";
import { useState } from "react";

interface DayPlan {
  day: number;
  scenarios: string[];
  movesCards: number[];
  decisionTree: string;
}

export function TrainingPlaylist() {
  const [isGenerated, setIsGenerated] = useState(false);

  const trainingPlan: DayPlan[] = [
    {
      day: 1,
      scenarios: [
        "Opponent has 2 cards in hand, you have lethal if unblocked",
        "You're at 1 life, opponent has 3 attackers",
        "Counter or let damage through? Hand advantage vs life advantage"
      ],
      movesCards: [2, 9, 18],
      decisionTree: "Attack Decisions"
    },
    {
      day: 2,
      scenarios: [
        "Build DON advantage or play characters early?",
        "Opponent ramps DON, you're behind on board",
        "When to use DON for tempo vs holding for counter?"
      ],
      movesCards: [1, 10, 14],
      decisionTree: "DON Decisions"
    },
    {
      day: 3,
      scenarios: [
        "Multiple blockers vs rush strategy",
        "When to attack with your blocker?",
        "Trading blocker for attacker - value calculation"
      ],
      movesCards: [3, 8, 22],
      decisionTree: "Blocker Decisions"
    },
    {
      day: 4,
      scenarios: [
        "Trigger fishing timing - when to take damage intentionally",
        "Life lock opponent at 1 life or finish them?",
        "Using life as resource vs protecting life total"
      ],
      movesCards: [15, 16, 17],
      decisionTree: "Attack Decisions"
    },
    {
      day: 5,
      scenarios: [
        "Counter small threat or save for big threat?",
        "Empty hand defending vs taking damage",
        "Counter math forcing - making single counter insufficient"
      ],
      movesCards: [6, 9, 18],
      decisionTree: "Counter Decisions"
    },
    {
      day: 6,
      scenarios: [
        "Two-turn checkmate setup",
        "Option reduction - force opponent into no-win",
        "Calculating guaranteed lethal vs risky lethal"
      ],
      movesCards: [22, 23, 24],
      decisionTree: "Attack Decisions"
    },
    {
      day: 7,
      scenarios: [
        "Mixed review: Complex game state with multiple decisions",
        "Tournament pressure simulation",
        "Meta matchup: Your deck vs Red/Purple Luffy"
      ],
      movesCards: [2, 9, 22],
      decisionTree: "All Categories"
    }
  ];

  const handleGenerate = () => {
    setIsGenerated(true);
  };

  const handleReset = () => {
    setIsGenerated(false);
  };

  const getMoveCardName = (moveNum: number): string => {
    const moves: Record<number, string> = {
      1: "DON Bank",
      2: "Life First",
      3: "Blocker Wall",
      6: "Counter Bait",
      8: "Value Trade",
      9: "Counter Drain",
      10: "DON Trap",
      14: "Resource Fork",
      15: "Trigger Fishing",
      16: "Life Lock",
      17: "Life Swing",
      18: "Counter Math",
      22: "Lethal Setup",
      23: "Option Reduction",
      24: "The Clock"
    };
    return moves[moveNum] || `Move #${moveNum}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#0A1F44' }}>
          <ListOrdered className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">TRAINING PLAYLIST</span>
        </div>
        <h1 className="text-4xl font-bold" style={{ color: '#0A1F44' }}>
          7-Day Practice Plan
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Personalized training based on your mistakes and current meta
        </p>
      </div>

      {!isGenerated ? (
        <Card className="p-12 text-center border-2" style={{ borderColor: '#C19A6B' }}>
          <Brain className="w-24 h-24 mx-auto mb-6 text-gray-300" />
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0A1F44' }}>
            Generate Your Personal Training Plan
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            AI will analyze your gameplay patterns, common mistakes, and current meta data to create a customized 7-day practice schedule.
          </p>
          <Button
            onClick={handleGenerate}
            size="lg"
            className="gap-2"
            style={{ backgroundColor: '#0A1F44' }}
          >
            <Target className="w-5 h-5" />
            Generate Training Plan
          </Button>
        </Card>
      ) : (
        <>
          {/* Plan Overview */}
          <Card className="p-6 border-2" style={{ borderColor: '#C19A6B', backgroundColor: '#FFF9F0' }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#0A1F44' }}>
                  Your 7-Day Training Plan
                </h2>
                <p className="text-gray-600">
                  Focus areas: Counter timing, DON management, and endgame execution
                </p>
                <div className="flex gap-2 mt-3">
                  <Badge className="bg-blue-500 text-white">Beginner → Intermediate</Badge>
                  <Badge className="bg-green-500 text-white">~45 min per day</Badge>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleReset}
                style={{ borderColor: '#C19A6B' }}
              >
                Regenerate
              </Button>
            </div>
          </Card>

          {/* Daily Plans */}
          <div className="space-y-6">
            {trainingPlan.map((day) => (
              <Card key={day.day} className="p-6 border-2 hover:shadow-lg transition-all" style={{ borderColor: '#C19A6B' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full font-bold text-white text-xl" style={{ backgroundColor: '#0A1F44' }}>
                    {day.day}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: '#0A1F44' }}>
                      Day {day.day}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>45 minutes</span>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Scenarios */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-4 h-4" style={{ color: '#D0021B' }} />
                      <p className="text-xs font-bold text-gray-500">3 SCENARIOS</p>
                    </div>
                    <div className="space-y-2">
                      {day.scenarios.map((scenario, index) => (
                        <div key={index} className="p-3 rounded-lg bg-white border text-sm" style={{ borderColor: '#C19A6B' }}>
                          <div className="flex gap-2">
                            <span className="font-bold shrink-0" style={{ color: '#D0021B' }}>
                              {index + 1}.
                            </span>
                            <span>{scenario}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Move Cards */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Trophy className="w-4 h-4" style={{ color: '#C19A6B' }} />
                      <p className="text-xs font-bold text-gray-500">3 MOVE CARDS</p>
                    </div>
                    <div className="space-y-2">
                      {day.movesCards.map((moveNum, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start gap-2 text-left"
                          style={{ borderColor: '#C19A6B' }}
                        >
                          <div className="flex items-center justify-center w-6 h-6 rounded-full font-bold text-white text-xs" style={{ backgroundColor: '#0A1F44' }}>
                            {moveNum}
                          </div>
                          <span className="text-sm">{getMoveCardName(moveNum)}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Decision Tree */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-4 h-4" style={{ color: '#0A1F44' }} />
                      <p className="text-xs font-bold text-gray-500">DECISION TREE</p>
                    </div>
                    <Card className="p-4 text-center border-2" style={{ borderColor: '#C19A6B', backgroundColor: '#FFF9F0' }}>
                      <p className="font-bold mb-2" style={{ color: '#0A1F44' }}>
                        {day.decisionTree}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        style={{ borderColor: '#C19A6B' }}
                      >
                        View Decision Tree
                      </Button>
                    </Card>
                  </div>
                </div>

                {/* Day Completion */}
                <div className="flex items-center justify-between pt-4 border-t mt-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`day-${day.day}`}
                      className="w-5 h-5 rounded border-2"
                      style={{ borderColor: '#C19A6B' }}
                    />
                    <label htmlFor={`day-${day.day}`} className="text-sm font-semibold cursor-pointer">
                      Mark day as complete
                    </label>
                  </div>
                  <Button
                    size="sm"
                    style={{ backgroundColor: '#0A1F44' }}
                  >
                    Start Day {day.day}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Completion Tip */}
          <Card className="p-6 border-2 text-center" style={{ borderColor: '#C19A6B', backgroundColor: '#FFF9F0' }}>
            <p className="text-lg">
              <span className="font-bold" style={{ color: '#D0021B' }}>Pro Tip:</span>{" "}
              <span className="font-semibold" style={{ color: '#0A1F44' }}>
                Complete at least 5 of 7 days for maximum improvement. New plan generates every Monday.
              </span>
            </p>
          </Card>
        </>
      )}
    </div>
  );
}
