import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Puzzle, BarChart3, Target, Zap } from "lucide-react";
import { useState } from "react";

interface MetaData {
  leader: string;
  playRate: number;
  avgGameLength: string;
  commonMistake: string;
}

interface CounterStrategy {
  id: string;
  name: string;
  description: string;
  icon: any;
  enabled: boolean;
}

export function MetaCounterBuilder() {
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [showOutput, setShowOutput] = useState(false);

  const metaData: MetaData[] = [
    {
      leader: "Red/Purple Luffy",
      playRate: 24.5,
      avgGameLength: "Turn 6-7",
      commonMistake: "Overcommitting board, getting wiped"
    },
    {
      leader: "Yellow Katakuri",
      playRate: 18.3,
      avgGameLength: "Turn 7-9",
      commonMistake: "Not fishing triggers early enough"
    },
    {
      leader: "Blue/Black Crocodile",
      playRate: 15.7,
      avgGameLength: "Turn 8-10",
      commonMistake: "Not applying early pressure"
    },
    {
      leader: "Green Uta",
      playRate: 12.4,
      avgGameLength: "Turn 7-8",
      commonMistake: "Not removing ramp engines"
    }
  ];

  const strategies: CounterStrategy[] = [
    {
      id: "drain-hand",
      name: "Drain Hand Early",
      description: "Empty opponent's hand by turn 4-5 through repeated attacks",
      icon: Target,
      enabled: false
    },
    {
      id: "lock-board",
      name: "Lock Board Midgame",
      description: "Control board with removal + blockers during turns 4-6",
      icon: Zap,
      enabled: false
    },
    {
      id: "trigger-abuse",
      name: "Trigger Abuse",
      description: "Fish triggers early, gain card advantage through life",
      icon: BarChart3,
      enabled: false
    },
    {
      id: "don-denial",
      name: "DON Ramp Denial",
      description: "Prevent DON acceleration, force inefficient plays",
      icon: Target,
      enabled: false
    },
    {
      id: "attrition",
      name: "Attrition & Simplify",
      description: "Grind game out, win through superior late-game value",
      icon: Puzzle,
      enabled: false
    }
  ];

  const toggleStrategy = (strategyId: string) => {
    if (selectedStrategies.includes(strategyId)) {
      setSelectedStrategies(selectedStrategies.filter(s => s !== strategyId));
    } else if (selectedStrategies.length < 2) {
      setSelectedStrategies([...selectedStrategies, strategyId]);
    }
  };

  const handleBuildDeck = () => {
    setShowOutput(true);
  };

  const counterDeck = {
    colors: ["Red", "Black"],
    earlyPlan: "Turn 1-3: Deploy pressure units, attack leader to drain counters",
    midPlan: "Turn 4-6: Remove key threats, maintain hand advantage, deny DON",
    latePlan: "Turn 7+: Execute lethal with counter-empty opponent",
    warnings: [
      "Never overcommit to board (board wipe vulnerability)",
      "Don't rely on single big threat (removal meta)",
      "Always keep 1-2 counters in hand"
    ],
    winCondition: "Turns 6-7 lethal after counter drain",
    masterpieceMoves: [2, 9, 18, 22]
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#0A1F44' }}>
          <Puzzle className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">META COUNTER BUILDER</span>
        </div>
        <h1 className="text-4xl font-bold" style={{ color: '#0A1F44' }}>
          Build to Counter the Meta
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Analyze current meta and build the perfect counter strategy
        </p>
      </div>

      {/* Meta Snapshot */}
      <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#0A1F44' }}>
          Current Meta Snapshot
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Data from Limitless TCG (last 30 days)
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#0A1F44' }}>
              <tr>
                <th className="px-4 py-3 text-left text-white font-bold">Most Played Leaders</th>
                <th className="px-4 py-3 text-left text-white font-bold">Play Rate</th>
                <th className="px-4 py-3 text-left text-white font-bold">Avg Game Length</th>
                <th className="px-4 py-3 text-left text-white font-bold">Common Mistake</th>
              </tr>
            </thead>
            <tbody>
              {metaData.map((data, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-orange-50'}>
                  <td className="px-4 py-3 font-bold" style={{ color: '#0A1F44' }}>
                    {data.leader}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${data.playRate}%`,
                            backgroundColor: '#C19A6B'
                          }}
                        />
                      </div>
                      <span className="font-semibold">{data.playRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline">{data.avgGameLength}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {data.commonMistake}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Counter Strategy Selector */}
      <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#0A1F44' }}>
          Select Counter Strategy
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Choose 1-2 priorities (more = less focused)
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {strategies.map((strategy) => {
            const Icon = strategy.icon;
            const isSelected = selectedStrategies.includes(strategy.id);
            const isDisabled = !isSelected && selectedStrategies.length >= 2;

            return (
              <Card
                key={strategy.id}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  isSelected ? 'shadow-lg' : isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
                }`}
                style={{ borderColor: isSelected ? '#0A1F44' : '#C19A6B' }}
                onClick={() => !isDisabled && toggleStrategy(strategy.id)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                    style={{ backgroundColor: isSelected ? '#0A1F44' : '#E5E5E5' }}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold" style={{ color: '#0A1F44' }}>
                      {strategy.name}
                    </h3>
                  </div>
                  {isSelected && (
                    <Badge className="bg-green-500 text-white text-xs">
                      Selected
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {strategy.description}
                </p>
              </Card>
            );
          })}
        </div>

        <Button
          onClick={handleBuildDeck}
          disabled={selectedStrategies.length === 0}
          className="w-full mt-6 gap-2 py-6 text-lg"
          style={{ backgroundColor: selectedStrategies.length > 0 ? '#0A1F44' : '#999' }}
        >
          <Puzzle className="w-5 h-5" />
          Build Counter Deck
        </Button>

        {selectedStrategies.length === 0 && (
          <p className="text-sm text-center text-gray-500 mt-3">
            Select at least 1 strategy to continue
          </p>
        )}
      </Card>

      {/* Counter Deck Output */}
      {showOutput && (
        <Card className="p-6 border-4" style={{ borderColor: '#D0021B' }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#0A1F44' }}>
            Counter Deck Output
          </h2>

          <div className="space-y-6">
            {/* Colors */}
            <div>
              <p className="text-xs font-bold text-gray-500 mb-2">RECOMMENDED COLORS</p>
              <div className="flex gap-2">
                {counterDeck.colors.map((color, index) => (
                  <Badge key={index} className="px-4 py-2 text-white" style={{ backgroundColor: '#0A1F44' }}>
                    {color}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Core Game Plan */}
            <div>
              <p className="text-xs font-bold text-gray-500 mb-3">CORE GAME PLAN</p>
              <div className="space-y-3">
                <div className="p-4 rounded-lg border-l-4" style={{ borderColor: '#2ECC40', backgroundColor: '#FFF9F0' }}>
                  <p className="text-xs font-bold text-gray-500 mb-1">EARLY (TURNS 1-3)</p>
                  <p className="text-sm">{counterDeck.earlyPlan}</p>
                </div>
                <div className="p-4 rounded-lg border-l-4" style={{ borderColor: '#FFDC00', backgroundColor: '#FFF9F0' }}>
                  <p className="text-xs font-bold text-gray-500 mb-1">MID (TURNS 4-6)</p>
                  <p className="text-sm">{counterDeck.midPlan}</p>
                </div>
                <div className="p-4 rounded-lg border-l-4" style={{ borderColor: '#D0021B', backgroundColor: '#FFF9F0' }}>
                  <p className="text-xs font-bold text-gray-500 mb-1">LATE (TURNS 7+)</p>
                  <p className="text-sm">{counterDeck.latePlan}</p>
                </div>
              </div>
            </div>

            {/* Warnings */}
            <div>
              <p className="text-xs font-bold text-gray-500 mb-3">WHAT TO NEVER DO</p>
              <div className="space-y-2">
                {counterDeck.warnings.map((warning, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border" style={{ borderColor: '#D0021B' }}>
                    <span className="font-bold shrink-0" style={{ color: '#D0021B' }}>✗</span>
                    <p className="text-sm">{warning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Win Condition */}
            <div>
              <p className="text-xs font-bold text-gray-500 mb-2">WIN CONDITION CHECKPOINT</p>
              <Card className="p-4 text-center border-2" style={{ borderColor: '#2ECC40', backgroundColor: '#F0FFF4' }}>
                <p className="text-xl font-bold" style={{ color: '#2ECC40' }}>
                  {counterDeck.winCondition}
                </p>
              </Card>
            </div>

            {/* Core Masterpiece Moves */}
            <div>
              <p className="text-xs font-bold text-gray-500 mb-3">CORE MASTERPIECE MOVES</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {counterDeck.masterpieceMoves.map((moveNum) => (
                  <Card key={moveNum} className="p-3 text-center border-2" style={{ borderColor: '#C19A6B' }}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full font-bold text-white mx-auto mb-2" style={{ backgroundColor: '#0A1F44' }}>
                      {moveNum}
                    </div>
                    <p className="text-xs font-semibold">Move #{moveNum}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
