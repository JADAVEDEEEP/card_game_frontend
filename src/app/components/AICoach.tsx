import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Brain, Target, AlertCircle, Lightbulb, Compass, Sword, Shield, TrendingUp, Activity, Heart, Users, Zap, ChevronRight, BarChart3, Crown, Layers, Download, RefreshCw } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function AICoach() {
  const [yourLife, setYourLife] = useState("3");
  const [oppLife, setOppLife] = useState("2");
  const [yourHand, setYourHand] = useState("4");
  const [oppHand, setOppHand] = useState("2");
  const [donAvailable, setDonAvailable] = useState("8");
  const [attackers, setAttackers] = useState("2");
  const [blockers, setBlockers] = useState("1");
  const [restedChars, setRestedChars] = useState("1");
  const [triggerDeck, setTriggerDeck] = useState(false);
  const [aggressiveMode, setAggressiveMode] = useState(false);
  const [defensiveMode, setDefensiveMode] = useState(false);
  const [turnNumber, setTurnNumber] = useState("5");
  const [selectedLeader, setSelectedLeader] = useState("");
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // New state for imported cards from Card Action Intelligence
  const [importedCards, setImportedCards] = useState<any[]>([]);
  const [importedLeader, setImportedLeader] = useState<any>(null);
  const [showImportedCards, setShowImportedCards] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowRecommendation(true);
    }, 2000);
  };
  
  // Function to fetch cards from Card Action Intelligence
  const handleFetchCards = () => {
    try {
      const storedCards = localStorage.getItem('cardActionIntelligence_selectedCards');
      const storedLeader = localStorage.getItem('cardActionIntelligence_selectedLeader');
      
      if (storedCards) {
        const parsedCards = JSON.parse(storedCards);
        const validCards = parsedCards.filter((card: any) => card !== null);
        setImportedCards(validCards);
        setShowImportedCards(true);
      }
      
      if (storedLeader) {
        const parsedLeader = JSON.parse(storedLeader);
        setImportedLeader(parsedLeader);
        if (parsedLeader) {
          setSelectedLeader(parsedLeader.name);
        }
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };
  
  const handleRefreshCards = () => {
    handleFetchCards();
  };

  // Leader options
  const leaders = [
    "Monkey D. Luffy (Red)",
    "Roronoa Zoro (Green)",
    "Nami (Blue)",
    "Trafalgar Law (Purple)",
    "Charlotte Katakuri (Yellow)",
    "Kaido (Black)",
    "Eustass Kid (Red/Purple)",
    "Sanji (Yellow/Black)"
  ];

  // Mock battlefield data
  const [yourCharacters] = useState([
    { id: 1, name: "Zoro", power: 6000, cost: 4, active: true, hasAbility: true },
    { id: 2, name: "Sanji", power: 5000, cost: 3, active: true, hasAbility: false },
    { id: 3, name: "Nami", power: 3000, cost: 2, active: false, hasAbility: true },
    { id: 4, name: "", power: 0, cost: 0, active: true, hasAbility: false },
    { id: 5, name: "", power: 0, cost: 0, active: true, hasAbility: false },
  ]);

  const [oppCharacters] = useState([
    { id: 1, name: "Kaido", power: 8000, cost: 5, active: true, hasAbility: true },
    { id: 2, name: "King", power: 6000, cost: 4, active: false, hasAbility: true },
    { id: 3, name: "", power: 0, cost: 0, active: true, hasAbility: false },
    { id: 4, name: "", power: 0, cost: 0, active: true, hasAbility: false },
    { id: 5, name: "", power: 0, cost: 0, active: true, hasAbility: false },
  ]);

  // Three recommendation options
  const recommendations = {
    best: {
      title: "Best Move",
      plan: "Counter Drain → Two-Turn Checkmate",
      winProbability: 78,
      riskLevel: "Low",
      cardAdvantage: "+2",
      actions: [
        "Attack leader with both active characters",
        "Force opponent to counter or take 2 damage",
        "If they counter, their hand drops to 0 cards",
        "Next turn: Deploy big threat with no counter available"
      ]
    },
    aggressive: {
      title: "Aggressive Move",
      plan: "All-In Leader Attack",
      winProbability: 65,
      riskLevel: "High",
      cardAdvantage: "-1",
      actions: [
        "Attack leader with all available characters",
        "Use all DON for power boosts",
        "Aim for immediate lethal",
        "Risk opponent's counter-swing next turn"
      ]
    },
    safe: {
      title: "Safe Move",
      plan: "Board Control & Value",
      winProbability: 55,
      riskLevel: "Low",
      cardAdvantage: "+1",
      actions: [
        "Remove opponent's strongest character",
        "Develop blocker for defense",
        "Keep DON for counter next turn",
        "Maintain card advantage"
      ]
    }
  };

  // Probability data
  const moveOutcomeData = [
    { name: "Best Move", value: 78 },
    { name: "Aggressive", value: 65 },
    { name: "Safe", value: 55 }
  ];

  const COLORS = ['#fbbf24', '#ef4444', '#3b82f6'];

  const decisionComparisonData = [
    { move: 'Best', winRate: 78, damage: 4, risk: 2 },
    { move: 'Aggressive', winRate: 65, damage: 7, risk: 8 },
    { move: 'Safe', winRate: 55, damage: 2, risk: 1 }
  ];

  // Timeline data
  const timelineData = [
    {
      turn: 1,
      title: "Current Turn",
      action: "Counter Drain Attack",
      outcome: "Opponent hand → 0 cards",
      winProb: 45
    },
    {
      turn: 2,
      title: "Next Turn",
      action: "Deploy 8-cost Threat",
      outcome: "No counter available",
      winProb: 78
    },
    {
      turn: 3,
      title: "Turn After",
      action: "Lethal Attack",
      outcome: "Game won",
      winProb: 95
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-pink-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            🧠 AI Coach - Strategic Battle Assistant
          </h2>
        </div>
        <p className="text-gray-900">
          Your intelligent battlefield advisor - analyze game state and receive tournament-level strategic recommendations
        </p>
      </div>

      {/* Card Import Section - Fetch from Card Action Intelligence */}
      <Card className="p-6 transition-all bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-teal-500">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-teal-900">Deck Integration</h3>
              <p className="text-sm text-teal-700">Import your selected cards from Card Action Intelligence</p>
            </div>
            <Button
              onClick={handleFetchCards}
              className="gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
            >
              <Download className="w-4 h-4" />
              Fetch Cards
            </Button>
            {importedCards.length > 0 && (
              <Button
                onClick={handleRefreshCards}
                variant="outline"
                className="gap-2 border-teal-300 hover:bg-teal-50"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            )}
          </div>

          {importedCards.length > 0 ? (
            <div className="space-y-4">
              {/* Imported Leader Display */}
              {importedLeader && (
                <div className="bg-white p-4 rounded-xl border-2 border-teal-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Crown className="w-5 h-5 text-yellow-600" />
                    <p className="text-sm font-bold text-teal-900">IMPORTED LEADER</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-24 aspect-[3/4] bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg border-2 border-yellow-400 flex items-center justify-center shadow-lg">
                      <div className="text-center text-white p-2">
                        <p className="font-bold text-xs">{importedLeader.name}</p>
                        <p className="text-xs mt-1">{importedLeader.number}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{importedLeader.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">{importedLeader.number}</p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                          {importedLeader.type}
                        </Badge>
                        <Badge className="bg-orange-100 text-orange-800 text-xs">
                          {importedLeader.color}
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-800 text-xs">
                          {importedLeader.role}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-700 mt-2 line-clamp-2">{importedLeader.simpleMeaning}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Imported Cards Display */}
              <div className="bg-white p-4 rounded-xl border-2 border-teal-300">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-5 h-5 text-teal-600" />
                  <p className="text-sm font-bold text-teal-900">IMPORTED DECK CARDS ({importedCards.length})</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {importedCards.map((card, index) => (
                    <div
                      key={index}
                      className="relative p-3 rounded-lg border-2 border-teal-200 bg-teal-50 hover:border-teal-400 hover:shadow-md transition-all"
                    >
                      <div className="aspect-[3/4] bg-gradient-to-br from-blue-400 to-purple-600 rounded border-2 border-teal-300 flex items-center justify-center mb-2 relative">
                        <div className="text-center text-white p-1">
                          <p className="text-xs font-bold truncate">{card.name}</p>
                          <p className="text-xs mt-1">{card.number}</p>
                        </div>
                        {card.keywords && card.keywords.length > 0 && (
                          <div className="absolute top-1 right-1 bg-yellow-400 text-yellow-900 px-1 py-0.5 rounded text-xs font-bold">
                            {card.keywords[0]}
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-bold text-gray-900 truncate">{card.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <Badge className="text-xs bg-blue-100 text-blue-800 px-1 py-0">
                          {card.type}
                        </Badge>
                        <Badge className="text-xs bg-purple-100 text-purple-800 px-1 py-0">
                          {card.cost}
                        </Badge>
                      </div>
                      {card.power && (
                        <div className="mt-1">
                          <Badge className="text-xs bg-red-100 text-red-800 px-1 py-0">
                            {card.power}
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Deck Analysis Summary */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-xl border-2 border-teal-300">
                <p className="text-sm font-bold text-teal-900 mb-3">DECK ANALYSIS</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-teal-200">
                    <p className="text-xs text-gray-600 mb-1">Total Cards</p>
                    <p className="text-2xl font-bold text-teal-900">{importedCards.length}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600 mb-1">Characters</p>
                    <p className="text-2xl font-bold text-blue-900">
                      {importedCards.filter(c => c.type === 'Character').length}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <p className="text-xs text-gray-600 mb-1">Events</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {importedCards.filter(c => c.type === 'Event').length}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-yellow-200">
                    <p className="text-xs text-gray-600 mb-1">Avg Cost</p>
                    <p className="text-2xl font-bold text-yellow-900">
                      {importedCards.length > 0 
                        ? (importedCards.reduce((sum, c) => sum + c.cost, 0) / importedCards.length).toFixed(1)
                        : '0'}
                    </p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-teal-100 rounded-lg border border-teal-300">
                  <div className="flex items-start gap-2">
                    <Target className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-teal-900 mb-1 text-sm">AI Coach Integration Active</p>
                      <p className="text-xs text-gray-700">
                        The AI Coach will now analyze your imported deck cards along with the current game state to provide 
                        personalized strategic recommendations based on your actual hand composition.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl border-2 border-teal-200 text-center">
              <Layers className="w-16 h-16 text-teal-300 mx-auto mb-3" />
              <p className="text-gray-700 mb-2">No cards imported yet</p>
              <p className="text-sm text-gray-600">
                Go to <span className="font-bold text-teal-700">Card Action Intelligence</span> section, select your 15 cards and leader, 
                then click "Fetch Cards" button above to import them here.
              </p>
            </div>
          )}
        </div>
      </Card>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* SECTION 1 — Game State Input Panel */}
        <Card className="lg:col-span-4 p-6 transition-all bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-500">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-900">Game State Input</h3>
                <p className="text-sm text-indigo-700">Enter current battlefield information</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Leader Selection */}
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <label className="text-xs font-bold text-indigo-900 mb-2 flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  LEADER SELECTION
                </label>
                <Select value={selectedLeader} onValueChange={setSelectedLeader}>
                  <SelectTrigger className="w-full border-indigo-300 focus:ring-indigo-500">
                    <SelectValue placeholder="Select your leader..." />
                  </SelectTrigger>
                  <SelectContent>
                    {leaders.map((leader) => (
                      <SelectItem key={leader} value={leader}>
                        {leader}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Turn Number */}
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <label className="text-xs font-bold text-indigo-900 mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  TURN NUMBER
                </label>
                <input
                  type="number"
                  value={turnNumber}
                  onChange={(e) => setTurnNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  min="1"
                />
              </div>

              {/* Life */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <label className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    YOUR LIFE
                  </label>
                  <input
                    type="number"
                    value={yourLife}
                    onChange={(e) => setYourLife(e.target.value)}
                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    min="0"
                    max="5"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <label className="text-xs font-bold text-red-900 mb-2 flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    OPP LIFE
                  </label>
                  <input
                    type="number"
                    value={oppLife}
                    onChange={(e) => setOppLife(e.target.value)}
                    className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                    min="0"
                    max="5"
                  />
                </div>
              </div>

              {/* Hand */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <label className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    YOUR HAND
                  </label>
                  <input
                    type="number"
                    value={yourHand}
                    onChange={(e) => setYourHand(e.target.value)}
                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    min="0"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <label className="text-xs font-bold text-red-900 mb-2 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    OPP HAND
                  </label>
                  <input
                    type="number"
                    value={oppHand}
                    onChange={(e) => setOppHand(e.target.value)}
                    className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                    min="0"
                  />
                </div>
              </div>

              {/* DON */}
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <label className="text-xs font-bold text-indigo-900 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  DON AVAILABLE
                </label>
                <input
                  type="number"
                  value={donAvailable}
                  onChange={(e) => setDonAvailable(e.target.value)}
                  className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  min="0"
                />
              </div>

              {/* Board State */}
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <p className="text-xs font-bold text-indigo-900 mb-3">BATTLEFIELD STATE</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                      <Sword className="w-3 h-3" />
                      ATTACKERS
                    </label>
                    <input
                      type="number"
                      value={attackers}
                      onChange={(e) => setAttackers(e.target.value)}
                      className="w-full px-2 py-1.5 border border-indigo-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      BLOCKERS
                    </label>
                    <input
                      type="number"
                      value={blockers}
                      onChange={(e) => setBlockers(e.target.value)}
                      className="w-full px-2 py-1.5 border border-indigo-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      RESTED
                    </label>
                    <input
                      type="number"
                      value={restedChars}
                      onChange={(e) => setRestedChars(e.target.value)}
                      className="w-full px-2 py-1.5 border border-indigo-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Strategy Toggles */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border-2 border-yellow-300 bg-yellow-50 hover:shadow-md transition-shadow">
                  <div>
                    <p className="font-semibold text-yellow-900 text-sm">
                      ⚡ Trigger-Focused Deck
                    </p>
                    <p className="text-xs text-yellow-700">
                      Yellow/Green trigger synergies
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={triggerDeck}
                      onChange={(e) => setTriggerDeck(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border-2 border-red-300 bg-red-50 hover:shadow-md transition-shadow">
                  <div>
                    <p className="font-semibold text-red-900 text-sm">
                      ⚔️ Aggressive Strategy
                    </p>
                    <p className="text-xs text-red-700">
                      Prioritize damage and pressure
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aggressiveMode}
                      onChange={(e) => setAggressiveMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border-2 border-blue-300 bg-blue-50 hover:shadow-md transition-shadow">
                  <div>
                    <p className="font-semibold text-blue-900 text-sm">
                      🛡️ Defensive Mode
                    </p>
                    <p className="text-xs text-blue-700">
                      Focus on board control
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={defensiveMode}
                      onChange={(e) => setDefensiveMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                className="w-full gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Compass className="w-5 h-5 animate-spin" />
                    Analyzing Battlefield...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Analyze & Get Recommendation
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* SECTION 2 — AI Strategy Engine */}
        <Card className="lg:col-span-8 p-6 transition-all bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-pink-500">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-pink-900">AI Strategy Engine</h3>
                <p className="text-sm text-pink-700">Three strategic recommendations with win probability</p>
              </div>
            </div>

            {!showRecommendation ? (
              <div className="flex flex-col items-center justify-center h-96 text-center bg-white rounded-lg border-2 border-pink-200">
                <Compass className="w-20 h-20 text-pink-300 mb-4" />
                <p className="text-gray-700 text-lg">
                  Enter game state and click "Analyze" to receive strategic recommendations
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Three Recommendation Cards */}
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Best Move - Gold/Yellow */}
                  <div className="relative p-5 rounded-xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-lg hover:shadow-xl transition-all group">
                    <div className="absolute -top-3 -right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      RECOMMENDED
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-yellow-600" />
                      <h4 className="font-bold text-yellow-900">{recommendations.best.title}</h4>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">
                      {recommendations.best.plan}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Win Probability</span>
                        <span className="text-lg font-bold text-green-600">
                          {recommendations.best.winProbability}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${recommendations.best.winProbability}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {recommendations.best.riskLevel} Risk
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          {recommendations.best.cardAdvantage} Cards
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Aggressive Move - Red */}
                  <div className="relative p-5 rounded-xl border-2 border-red-300 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg hover:shadow-xl transition-all group">
                    <div className="flex items-center gap-2 mb-3">
                      <Sword className="w-5 h-5 text-red-600" />
                      <h4 className="font-bold text-red-900">{recommendations.aggressive.title}</h4>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">
                      {recommendations.aggressive.plan}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Win Probability</span>
                        <span className="text-lg font-bold text-orange-600">
                          {recommendations.aggressive.winProbability}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-400 to-red-600 h-2 rounded-full transition-all"
                          style={{ width: `${recommendations.aggressive.winProbability}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <Badge className="bg-red-100 text-red-800 text-xs">
                          {recommendations.aggressive.riskLevel} Risk
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          {recommendations.aggressive.cardAdvantage} Cards
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Safe Move - Blue */}
                  <div className="relative p-5 rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg hover:shadow-xl transition-all group">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold text-blue-900">{recommendations.safe.title}</h4>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">
                      {recommendations.safe.plan}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Win Probability</span>
                        <span className="text-lg font-bold text-blue-600">
                          {recommendations.safe.winProbability}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${recommendations.safe.winProbability}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {recommendations.safe.riskLevel} Risk
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          {recommendations.safe.cardAdvantage} Cards
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Flow with Arrows */}
                <div className="bg-white p-5 rounded-xl border-2 border-pink-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-pink-600" />
                    <p className="text-sm font-bold text-pink-900">TURN ACTION FLOW</p>
                  </div>
                  <div className="space-y-3">
                    {recommendations.best.actions.map((action, index) => (
                      <div key={index}>
                        <div className="flex items-start gap-3 bg-pink-50 p-3 rounded-lg border border-pink-200 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 text-white text-sm font-bold shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-sm text-gray-900 font-medium">{action}</p>
                        </div>
                        {index < recommendations.best.actions.length - 1 && (
                          <div className="flex justify-center py-1">
                            <ChevronRight className="w-5 h-5 text-pink-400 transform rotate-90" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {showRecommendation && (
        <>
          {/* SECTION 3 — Battlefield Simulator */}
          <Card className="p-6 transition-all bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-500">
                  <Sword className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-900">Battlefield Simulator</h3>
                  <p className="text-sm text-red-700">Visual representation of current board state</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Opponent Side */}
                <div className="bg-white p-4 rounded-xl border-2 border-red-300">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-red-600" />
                    <p className="font-bold text-red-900">OPPONENT</p>
                    <Badge className="bg-red-500 text-white ml-auto">
                      Life: {oppLife}
                    </Badge>
                  </div>
                  
                  {/* Opponent Leader */}
                  <div className="mb-4">
                    <div className="bg-red-50 p-3 rounded-lg border-2 border-red-300 inline-block">
                      <div className="flex items-center gap-3">
                        <Crown className="w-6 h-6 text-red-600" />
                        <div>
                          <p className="text-xs font-bold text-gray-700">OPPONENT LEADER</p>
                          <p className="font-bold text-gray-900">Power: 5000</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Opponent Characters */}
                  <div className="grid grid-cols-5 gap-3">
                    {oppCharacters.map((char) => (
                      <div
                        key={char.id}
                        className={`relative p-3 rounded-lg border-2 ${
                          char.name
                            ? char.active
                              ? 'border-red-300 bg-red-50 shadow-md hover:shadow-lg'
                              : 'border-gray-400 bg-gray-100 opacity-60 transform rotate-90'
                            : 'border-dashed border-gray-300 bg-gray-50'
                        } transition-all`}
                      >
                        {char.name ? (
                          <>
                            {char.hasAbility && (
                              <div className="absolute -top-2 -right-2 bg-yellow-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                ⚡
                              </div>
                            )}
                            <div className="aspect-square bg-gradient-to-br from-red-400 to-red-600 rounded-md mb-2 flex items-center justify-center">
                              <Users className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-xs font-bold text-gray-900 truncate">{char.name}</p>
                            <div className="flex items-center justify-between mt-1">
                              <Badge className="bg-red-100 text-red-800 text-xs px-1 py-0">
                                {char.power}
                              </Badge>
                              <Badge className="bg-yellow-100 text-yellow-800 text-xs px-1 py-0">
                                {char.cost}
                              </Badge>
                            </div>
                            {!char.active && (
                              <p className="text-xs text-gray-600 mt-1">RESTED</p>
                            )}
                          </>
                        ) : (
                          <div className="aspect-square flex items-center justify-center text-gray-400">
                            <p className="text-xs">Empty</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Battle Line */}
                <div className="flex items-center gap-3 justify-center">
                  <div className="flex-1 h-1 bg-gradient-to-r from-blue-400 to-red-400"></div>
                  <Sword className="w-6 h-6 text-orange-500" />
                  <div className="flex-1 h-1 bg-gradient-to-r from-red-400 to-blue-400"></div>
                </div>

                {/* Your Side */}
                <div className="bg-white p-4 rounded-xl border-2 border-blue-300">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-blue-600" />
                    <p className="font-bold text-blue-900">YOUR SIDE</p>
                    <Badge className="bg-blue-500 text-white ml-auto">
                      Life: {yourLife}
                    </Badge>
                  </div>

                  {/* Your Characters */}
                  <div className="grid grid-cols-5 gap-3 mb-4">
                    {yourCharacters.map((char) => (
                      <div
                        key={char.id}
                        className={`relative p-3 rounded-lg border-2 ${
                          char.name
                            ? char.active
                              ? 'border-blue-300 bg-blue-50 shadow-md hover:shadow-lg'
                              : 'border-gray-400 bg-gray-100 opacity-60 transform rotate-90'
                            : 'border-dashed border-gray-300 bg-gray-50'
                        } transition-all cursor-pointer hover:border-blue-500`}
                      >
                        {char.name ? (
                          <>
                            {char.hasAbility && (
                              <div className="absolute -top-2 -right-2 bg-yellow-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                ⚡
                              </div>
                            )}
                            <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded-md mb-2 flex items-center justify-center">
                              <Users className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-xs font-bold text-gray-900 truncate">{char.name}</p>
                            <div className="flex items-center justify-between mt-1">
                              <Badge className="bg-blue-100 text-blue-800 text-xs px-1 py-0">
                                {char.power}
                              </Badge>
                              <Badge className="bg-yellow-100 text-yellow-800 text-xs px-1 py-0">
                                {char.cost}
                              </Badge>
                            </div>
                            {!char.active && (
                              <p className="text-xs text-gray-600 mt-1">RESTED</p>
                            )}
                          </>
                        ) : (
                          <div className="aspect-square flex items-center justify-center text-gray-400">
                            <p className="text-xs">Empty</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Your Leader */}
                  <div>
                    <div className="bg-blue-50 p-3 rounded-lg border-2 border-blue-300 inline-block">
                      <div className="flex items-center gap-3">
                        <Crown className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="text-xs font-bold text-gray-700">YOUR LEADER</p>
                          <p className="font-bold text-gray-900">
                            {selectedLeader || "Power: 5000"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* SECTION 4 — Probability Engine & SECTION 5 — Strategy Insights */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Probability Engine */}
            <Card className="p-6 transition-all bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">Probability Engine</h3>
                    <p className="text-sm text-blue-700">Data-driven decision analysis</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Win Probability Graph */}
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <p className="text-sm font-bold text-blue-900 mb-3">WIN PROBABILITY</p>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={decisionComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="move" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="winRate" fill="#fbbf24" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Decision Comparison Chart */}
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <p className="text-sm font-bold text-blue-900 mb-3">DECISION COMPARISON</p>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={decisionComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="move" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="damage" fill="#ef4444" name="Damage" />
                        <Bar dataKey="risk" fill="#3b82f6" name="Risk" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Move Outcome Distribution */}
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <p className="text-sm font-bold text-blue-900 mb-3">MOVE OUTCOME DISTRIBUTION</p>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={moveOutcomeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {moveOutcomeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </Card>

            {/* Strategy Insights Panel */}
            <Card className="p-6 transition-all bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-500">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-900">Strategy Insights</h3>
                    <p className="text-sm text-green-700">AI-generated tactical analysis</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Board Advantage */}
                  <div className="bg-white p-4 rounded-xl border-2 border-green-300">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <p className="text-sm font-bold text-green-900">BOARD ADVANTAGE</p>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      You have <span className="font-bold text-green-600">+1 character advantage</span> on the field
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>• Your active characters: 2</li>
                      <li>• Opponent active characters: 1</li>
                      <li>• Blockers available: {blockers}</li>
                    </ul>
                  </div>

                  {/* Card Advantage */}
                  <div className="bg-white p-4 rounded-xl border-2 border-blue-300">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <p className="text-sm font-bold text-blue-900">CARD ADVANTAGE</p>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      You have <span className="font-bold text-blue-600">+{parseInt(yourHand) - parseInt(oppHand)} card advantage</span> in hand
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>• Your hand: {yourHand} cards</li>
                      <li>• Opponent hand: {oppHand} cards</li>
                      <li>• Recommended: Keep pressure to deny draws</li>
                    </ul>
                  </div>

                  {/* Risk Warnings */}
                  <div className="bg-white p-4 rounded-xl border-2 border-red-300">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <p className="text-sm font-bold text-red-900">RISK WARNINGS</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-red-600 text-sm">⚠</span>
                        <p className="text-sm text-gray-700">
                          Opponent at {oppLife} life - potential comeback with trigger effects
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-600 text-sm">⚠</span>
                        <p className="text-sm text-gray-700">
                          Watch for hidden blocker abilities
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-yellow-600 text-sm">⚡</span>
                        <p className="text-sm text-gray-700">
                          Save 1-2 DON for defensive options
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resource Analysis */}
                  <div className="bg-white p-4 rounded-xl border-2 border-yellow-300">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-yellow-600" />
                      <p className="text-sm font-bold text-yellow-900">RESOURCE ANALYSIS</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">DON Available:</span>
                        <span className="font-bold text-yellow-600">{donAvailable}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Turn:</span>
                        <span className="font-bold text-yellow-600">{turnNumber}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        Efficient DON usage is critical - prioritize high-impact plays
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* SECTION 6 — Turn Simulation Timeline */}
          <Card className="p-6 transition-all bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-300">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-500">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-purple-900">Turn Simulation Timeline</h3>
                  <p className="text-sm text-purple-700">Predictive analysis for next 3 turns</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Timeline with connected nodes */}
                <div className="relative">
                  {/* Connection Line */}
                  <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-yellow-400 to-green-500 hidden md:block"></div>

                  {/* Timeline Nodes */}
                  <div className="grid md:grid-cols-3 gap-6 relative">
                    {timelineData.map((turn, index) => (
                      <div key={index} className="relative">
                        {/* Turn Circle */}
                        <div className="flex flex-col items-center mb-3">
                          <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${
                            index === 0 ? 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-500' :
                            index === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-500' :
                            'bg-gradient-to-br from-green-500 to-green-700 border-green-500'
                          } shadow-lg relative z-10`}>
                            <div className="text-center">
                              <p className="text-white text-xs font-bold">Turn {parseInt(turnNumber) + index}</p>
                              <p className="text-white text-2xl font-bold">{turn.winProb}%</p>
                            </div>
                          </div>
                        </div>

                        {/* Turn Details Card */}
                        <div className={`bg-white p-4 rounded-xl border-2 ${
                          index === 0 ? 'border-blue-300' :
                          index === 1 ? 'border-yellow-300' :
                          'border-green-300'
                        }`}>
                          <h4 className="font-bold text-gray-900 mb-2">{turn.title}</h4>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs font-bold text-gray-600">ACTION</p>
                              <p className="text-sm text-gray-800">{turn.action}</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-600">OUTCOME</p>
                              <p className="text-sm text-gray-800">{turn.outcome}</p>
                            </div>
                            {index < timelineData.length - 1 && (
                              <div className="flex items-center gap-2 pt-2">
                                <ChevronRight className="w-4 h-4 text-purple-500" />
                                <p className="text-xs text-gray-600">Leading to next turn...</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Win Probability Trend Line */}
                <div className="bg-white p-4 rounded-lg border-2 border-purple-200 mt-6">
                  <p className="text-sm font-bold text-purple-900 mb-3">WIN PROBABILITY TREND</p>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="turn" label={{ value: 'Turn', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Win %', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="winProb" stroke="#a855f7" strokeWidth={3} dot={{ fill: '#a855f7', r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}