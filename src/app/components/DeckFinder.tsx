import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Target, Brain, Database, TrendingUp, AlertCircle } from "lucide-react";
import { useState } from "react";

export function DeckFinder() {
  const [selectedOpponents, setSelectedOpponents] = useState<string[]>([]);
  const [timeHorizon, setTimeHorizon] = useState("tournament");
  const [riskTolerance, setRiskTolerance] = useState("balanced");
  const [playstyle, setPlaystyle] = useState("tempo");
  const [skillLevel, setSkillLevel] = useState("tactical");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const opponentDecks = [
    "Aggro Red",
    "Control Black",
    "Trigger Yellow",
    "Ramp Purple",
    "Midrange Green",
    "Tempo Blue",
    "Red/Purple Luffy",
    "Yellow Katakuri",
    "Blue/Black Crocodile",
    "Green Uta"
  ];

  const dataSources = [
    { name: "Limitless tournament data", status: "Synced", color: "#2ECC40" },
    { name: "My saved decks", status: "3 decks", color: "#0074D9" },
    { name: "My mistake history", status: "Tracked", color: "#FFDC00" },
    { name: "Masterpiece Moves relevance", status: "28 moves", color: "#C19A6B" },
    { name: "Meta frequency weighting", status: "Active", color: "#B10DC9" }
  ];

  const toggleOpponent = (opponent: string) => {
    if (selectedOpponents.includes(opponent)) {
      setSelectedOpponents(selectedOpponents.filter(o => o !== opponent));
    } else {
      setSelectedOpponents([...selectedOpponents, opponent]);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // In real implementation, this would navigate to AIVerdict
      alert("Analysis complete! Check AI Verdict section for your optimal deck.");
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#0A1F44' }}>
          <Target className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">DECK FINDER</span>
        </div>
        <h1 className="text-4xl font-bold" style={{ color: '#0A1F44' }}>
          Find My Winning Deck
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          AI-assisted deck selection optimized for your expected opponents
        </p>
      </div>

      {/* Input Panel */}
      <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#0A1F44' }}>
          What Do You Want to Beat?
        </h2>

        <div className="space-y-6">
          {/* Expected Opponent Decks */}
          <div>
            <label className="text-xs font-bold text-gray-500 mb-3 block">
              EXPECTED OPPONENT DECKS (Select Multiple)
            </label>
            <div className="flex flex-wrap gap-2">
              {opponentDecks.map((deck) => (
                <Badge
                  key={deck}
                  className={`cursor-pointer transition-all px-4 py-2 text-sm ${
                    selectedOpponents.includes(deck)
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={selectedOpponents.includes(deck) ? { backgroundColor: '#0A1F44' } : {}}
                  onClick={() => toggleOpponent(deck)}
                >
                  {deck}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Selected: {selectedOpponents.length} deck{selectedOpponents.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Time Horizon */}
          <div>
            <label className="text-xs font-bold text-gray-500 mb-3 block">
              TIME HORIZON
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['today', 'week', 'tournament'].map((option) => (
                <Button
                  key={option}
                  variant={timeHorizon === option ? 'default' : 'outline'}
                  onClick={() => setTimeHorizon(option)}
                  style={timeHorizon === option ? { backgroundColor: '#0A1F44' } : { borderColor: '#C19A6B' }}
                >
                  {option === 'today' ? 'Today' : option === 'week' ? 'This Week' : 'Tournament Prep'}
                </Button>
              ))}
            </div>
          </div>

          {/* Risk Tolerance */}
          <div>
            <label className="text-xs font-bold text-gray-500 mb-3 block">
              RISK TOLERANCE
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['ultra-safe', 'balanced', 'aggressive'].map((option) => (
                <Button
                  key={option}
                  variant={riskTolerance === option ? 'default' : 'outline'}
                  onClick={() => setRiskTolerance(option)}
                  style={riskTolerance === option ? { backgroundColor: '#0A1F44' } : { borderColor: '#C19A6B' }}
                >
                  {option === 'ultra-safe' ? 'Ultra-Safe' : option === 'balanced' ? 'Balanced' : 'Aggressive'}
                </Button>
              ))}
            </div>
          </div>

          {/* Preferred Playstyle */}
          <div>
            <label className="text-xs font-bold text-gray-500 mb-3 block">
              PREFERRED PLAYSTYLE
            </label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {['aggro', 'tempo', 'control', 'midrange', 'trigger', 'ramp'].map((option) => (
                <Button
                  key={option}
                  variant={playstyle === option ? 'default' : 'outline'}
                  onClick={() => setPlaystyle(option)}
                  style={playstyle === option ? { backgroundColor: '#0A1F44' } : { borderColor: '#C19A6B' }}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Skill Confidence */}
          <div>
            <label className="text-xs font-bold text-gray-500 mb-3 block">
              SKILL CONFIDENCE
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['mechanical', 'tactical', 'strategic'].map((option) => (
                <Button
                  key={option}
                  variant={skillLevel === option ? 'default' : 'outline'}
                  onClick={() => setSkillLevel(option)}
                  style={skillLevel === option ? { backgroundColor: '#0A1F44' } : { borderColor: '#C19A6B' }}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Button>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-600">
              <p><strong>Mechanical:</strong> I execute combos well</p>
              <p><strong>Tactical:</strong> I make good turn-by-turn decisions</p>
              <p><strong>Strategic:</strong> I understand long-term gameplan</p>
            </div>
          </div>

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || selectedOpponents.length === 0}
            className="w-full gap-2 py-6 text-lg"
            style={{ backgroundColor: isAnalyzing ? '#999' : '#D0021B' }}
          >
            <Brain className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            {isAnalyzing ? 'Analyzing...' : 'Analyze & Recommend Deck'}
          </Button>

          {selectedOpponents.length === 0 && (
            <Card className="p-4 border-2" style={{ borderColor: '#FFDC00', backgroundColor: '#FFF9F0' }}>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0" />
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#0A1F44' }}>
                    Please select at least one opponent deck
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    The AI needs to know what you're facing to recommend the optimal deck
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Card>

      {/* Data Sources */}
      <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5" style={{ color: '#0A1F44' }} />
          <h2 className="text-xl font-bold" style={{ color: '#0A1F44' }}>
            Data Sources
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {dataSources.map((source, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border-l-4 bg-white"
              style={{ borderColor: source.color }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: '#0A1F44' }}>
                    {source.name}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{source.status}</p>
                </div>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: source.color }}
                />
              </div>
            </div>
          ))}
        </div>

        <Card className="p-4 border mt-4" style={{ borderColor: '#C19A6B', backgroundColor: '#FFF9F0' }}>
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5" style={{ color: '#2ECC40' }} />
            <div className="text-sm">
              <p className="font-semibold" style={{ color: '#0A1F44' }}>
                AI uses multi-source analysis
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Combines tournament data, your personal stats, masterpiece move relevance, and meta weighting to find the deck with highest win consistency
              </p>
            </div>
          </div>
        </Card>
      </Card>
    </div>
  );
}
