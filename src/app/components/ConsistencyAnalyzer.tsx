import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { BarChart3, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

interface ConsistencyMetric {
  name: string;
  value: number;
  description: string;
  color: string;
}

export function ConsistencyAnalyzer() {
  const metrics: ConsistencyMetric[] = [
    {
      name: "Curve Smoothness",
      value: 94,
      description: "Probability of playable cards each turn",
      color: "#2ECC40"
    },
    {
      name: "Dead Card Probability",
      value: 8,
      description: "Likelihood of unplayable cards in hand (lower = better)",
      color: "#2ECC40"
    },
    {
      name: "Hand Stability",
      value: 91,
      description: "Ability to maintain 3-5 cards consistently",
      color: "#2ECC40"
    },
    {
      name: "DON Efficiency",
      value: 96,
      description: "Average DON spent per turn / available DON",
      color: "#2ECC40"
    },
    {
      name: "Trigger Reliability",
      value: 0,
      description: "Trigger synergy (N/A for non-trigger decks)",
      color: "#999999"
    }
  ];

  const failureScenarios = [
    {
      scenario: "Drawing only high-cost cards early",
      frequency: "Low (12%)",
      mitigation: "14 cards cost 3 or less, mulligan aggressively for early plays"
    },
    {
      scenario: "No removal when opponent plays key threat",
      frequency: "Medium (28%)",
      mitigation: "8 removal cards + 4 bounce effects, hold 1 in hand after turn 3"
    },
    {
      scenario: "Opponent draws perfect counters",
      frequency: "Medium (25%)",
      mitigation: "Multiple attack angles, counter bait strategy, don't overcommit"
    },
    {
      scenario: "Board wipe resets your advantage",
      frequency: "Low (15%)",
      mitigation: "Play incremental threats, never commit 3+ characters same turn"
    }
  ];

  const mulliganRules = [
    {
      situation: "Turn 1 hand",
      keep: "Any 1-3 cost characters, removal if going second",
      mulligan: "All 5+ cost cards, duplicate copies, dead events"
    },
    {
      situation: "vs Aggro",
      keep: "Blockers, life gain, early characters",
      mulligan: "Late-game cards, high-cost threats"
    },
    {
      situation: "vs Control",
      keep: "Early pressure, uncounterable threats, card draw",
      mulligan: "Weak early plays, situational removal"
    },
    {
      situation: "vs Ramp",
      keep: "Early aggression, DON denial, pressure",
      mulligan: "Defensive cards, late-game value"
    }
  ];

  const getMetricColor = (value: number, isInverted: boolean = false) => {
    if (isInverted) {
      if (value <= 10) return '#2ECC40';
      if (value <= 20) return '#FFDC00';
      return '#D0021B';
    }
    if (value >= 90) return '#2ECC40';
    if (value >= 75) return '#FFDC00';
    return '#D0021B';
  };

  const consistencyIndex = 96;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#0A1F44' }}>
          <BarChart3 className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">CONSISTENCY ANALYZER</span>
        </div>
        <h1 className="text-4xl font-bold" style={{ color: '#0A1F44' }}>
          Consistency & Variance Control
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Minimize variance, maximize reliability in every game
        </p>
      </div>

      {/* Consistency Metrics */}
      <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#0A1F44' }}>
          Consistency Metrics
        </h2>

        <div className="space-y-4">
          {metrics.map((metric, index) => {
            const isInverted = metric.name === "Dead Card Probability";
            const color = metric.value === 0 ? '#999999' : getMetricColor(metric.value, isInverted);
            const displayValue = metric.value === 0 ? 'N/A' : `${metric.value}%`;

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold" style={{ color: '#0A1F44' }}>
                      {metric.name}
                    </p>
                    <p className="text-xs text-gray-600">{metric.description}</p>
                  </div>
                  <Badge
                    className="text-white font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {displayValue}
                  </Badge>
                </div>
                {metric.value > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${metric.value}%`,
                        backgroundColor: color
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Failure Simulation */}
      <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#0A1F44' }}>
          Failure Simulation
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Most likely ways this deck loses and how to prevent them
        </p>

        <div className="space-y-3">
          {failureScenarios.map((failure, index) => (
            <Card key={index} className="p-4 border-2" style={{ borderColor: '#C19A6B' }}>
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 shrink-0" style={{ color: '#FF851B' }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold" style={{ color: '#0A1F44' }}>
                      {failure.scenario}
                    </p>
                    <Badge
                      className={
                        failure.frequency.includes('Low')
                          ? 'bg-green-500 text-white'
                          : failure.frequency.includes('Medium')
                          ? 'bg-yellow-500 text-white'
                          : 'bg-red-500 text-white'
                      }
                    >
                      {failure.frequency}
                    </Badge>
                  </div>
                  <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: '#FFF9F0' }}>
                    <p className="text-xs font-bold text-gray-500 mb-1">MITIGATION</p>
                    <p className="text-sm">{failure.mitigation}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Mulligan Guide */}
      <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#0A1F44' }}>
          When to Mulligan Aggressively
        </h2>

        <div className="space-y-4">
          {mulliganRules.map((rule, index) => (
            <div key={index} className="p-4 rounded-lg border-l-4" style={{ borderColor: '#C19A6B', backgroundColor: '#FFF9F0' }}>
              <p className="font-bold mb-3" style={{ color: '#0A1F44' }}>
                {rule.situation}
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <p className="text-xs font-bold text-gray-500">KEEP</p>
                  </div>
                  <p className="text-sm">{rule.keep}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold text-gray-500">MULLIGAN</p>
                  </div>
                  <p className="text-sm">{rule.mulligan}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Safety Score */}
      <Card className="p-8 border-4 text-center" style={{ borderColor: '#2ECC40', backgroundColor: '#F0FFF4' }}>
        <div className="flex items-center justify-center gap-4 mb-4">
          <TrendingUp className="w-12 h-12" style={{ color: '#2ECC40' }} />
          <div>
            <p className="text-sm font-bold text-gray-600">CONSISTENCY INDEX</p>
            <p className="text-6xl font-bold" style={{ color: '#2ECC40' }}>
              {consistencyIndex}
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-lg font-semibold" style={{ color: '#0A1F44' }}>
            Exceptional Consistency
          </p>
          <p className="text-sm text-gray-700">
            High consistency means fewer forced decisions, fewer misplays, and fewer high-variance turns. 
            This deck executes its gameplan reliably in 96% of games.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="p-3 rounded-lg bg-white border" style={{ borderColor: '#2ECC40' }}>
              <p className="text-2xl font-bold" style={{ color: '#2ECC40' }}>94%</p>
              <p className="text-xs text-gray-600">Games with playable curve</p>
            </div>
            <div className="p-3 rounded-lg bg-white border" style={{ borderColor: '#2ECC40' }}>
              <p className="text-2xl font-bold" style={{ color: '#2ECC40' }}>8%</p>
              <p className="text-xs text-gray-600">Dead card rate</p>
            </div>
            <div className="p-3 rounded-lg bg-white border" style={{ borderColor: '#2ECC40' }}>
              <p className="text-2xl font-bold" style={{ color: '#2ECC40' }}>96%</p>
              <p className="text-xs text-gray-600">DON efficiency</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Bottom Insight */}
      <Card className="p-6 border-2 text-center" style={{ borderColor: '#C19A6B', backgroundColor: '#FFF9F0' }}>
        <p className="text-lg">
          <span className="font-bold" style={{ color: '#D0021B' }}>Pro Insight:</span>{" "}
          <span className="font-semibold" style={{ color: '#0A1F44' }}>
            Consistency wins tournaments. A 70% win rate deck with 95%+ consistency outperforms an 80% win rate deck with 70% consistency.
          </span>
        </p>
      </Card>
    </div>
  );
}
