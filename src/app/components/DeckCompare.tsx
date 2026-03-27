import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";
import { GitCompare, TrendingUp, Zap, Target, Shield, Swords, Clock, Users, BarChart3, Activity, AlertCircle, CheckCircle, ArrowRight, Minus, Crown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";

interface DeckData {
  id: string;
  name: string;
  leader: string;
  color: string;
  tier: "S" | "A" | "B" | "C";
  winRate: number;
  popularity: number;
  avgTurnsToWin: number;
  consistency: number;
  aggression: number;
  control: number;
  combo: number;
  defense: number;
  speed: number;
  complexity: number;
  earlyGame: number;
  midGame: number;
  lateGame: number;
  avgCost: number;
  characterCount: number;
  eventCount: number;
  stageCount: number;
  strengths: string[];
  weaknesses: string[];
  playstyle: string;
  topMatchups: { deck: string; winRate: number }[];
}

const sampleDecks: DeckData[] = [
  {
    id: "1",
    name: "Red Zoro Aggro",
    leader: "Roronoa Zoro",
    color: "Red",
    tier: "S",
    winRate: 58.3,
    popularity: 15.2,
    avgTurnsToWin: 6.5,
    consistency: 85,
    aggression: 95,
    control: 40,
    combo: 60,
    defense: 45,
    speed: 90,
    complexity: 65,
    earlyGame: 90,
    midGame: 75,
    lateGame: 50,
    avgCost: 3.2,
    characterCount: 42,
    eventCount: 6,
    stageCount: 2,
    strengths: ["Early pressure", "Fast damage", "Board flooding"],
    weaknesses: ["Weak to board wipes", "Runs out of resources", "Vulnerable late game"],
    playstyle: "Hyper-aggressive beatdown that aims to win before turn 7",
    topMatchups: [
      { deck: "Blue Nami Control", winRate: 65 },
      { deck: "Yellow Katakuri", winRate: 52 },
      { deck: "Black Kaido", winRate: 45 }
    ]
  },
  {
    id: "2",
    name: "Blue Nami Control",
    leader: "Nami",
    color: "Blue",
    tier: "A",
    winRate: 54.7,
    popularity: 12.8,
    avgTurnsToWin: 9.2,
    consistency: 90,
    aggression: 35,
    control: 95,
    combo: 50,
    defense: 80,
    speed: 40,
    complexity: 85,
    earlyGame: 60,
    midGame: 85,
    lateGame: 95,
    avgCost: 4.1,
    characterCount: 35,
    eventCount: 12,
    stageCount: 3,
    strengths: ["Card advantage", "Removal options", "Late game power"],
    weaknesses: ["Slow start", "Weak to aggro rush", "Requires skill"],
    playstyle: "Controlling deck that wins through card advantage and late-game value",
    topMatchups: [
      { deck: "Yellow Katakuri", winRate: 62 },
      { deck: "Black Kaido", winRate: 58 },
      { deck: "Red Zoro Aggro", winRate: 35 }
    ]
  },
  {
    id: "3",
    name: "Yellow Katakuri Trigger",
    leader: "Charlotte Katakuri",
    color: "Yellow",
    tier: "A",
    winRate: 56.1,
    popularity: 18.5,
    avgTurnsToWin: 8.0,
    consistency: 75,
    aggression: 60,
    control: 70,
    combo: 85,
    defense: 75,
    speed: 65,
    complexity: 75,
    earlyGame: 70,
    midGame: 80,
    lateGame: 70,
    avgCost: 3.8,
    characterCount: 38,
    eventCount: 8,
    stageCount: 4,
    strengths: ["Trigger synergies", "Life manipulation", "Flexible gameplan"],
    weaknesses: ["RNG dependent", "Inconsistent draws", "Medium power level"],
    playstyle: "Mid-range deck leveraging trigger effects and life manipulation",
    topMatchups: [
      { deck: "Red Zoro Aggro", winRate: 48 },
      { deck: "Blue Nami Control", winRate: 38 },
      { deck: "Black Kaido", winRate: 55 }
    ]
  },
  {
    id: "4",
    name: "Black Kaido Ramp",
    leader: "Kaido",
    color: "Black",
    tier: "S",
    winRate: 59.8,
    popularity: 14.3,
    avgTurnsToWin: 7.8,
    consistency: 80,
    aggression: 70,
    control: 60,
    combo: 55,
    defense: 65,
    speed: 70,
    complexity: 70,
    earlyGame: 50,
    midGame: 85,
    lateGame: 90,
    avgCost: 4.5,
    characterCount: 40,
    eventCount: 7,
    stageCount: 3,
    strengths: ["Big threats", "DON advantage", "Powerful finishers"],
    weaknesses: ["Slow early game", "Vulnerable to aggro", "High cost cards"],
    playstyle: "Ramp strategy that deploys massive threats to overwhelm opponents",
    topMatchups: [
      { deck: "Blue Nami Control", winRate: 42 },
      { deck: "Yellow Katakuri", winRate: 45 },
      { deck: "Red Zoro Aggro", winRate: 55 }
    ]
  },
  {
    id: "5",
    name: "Green Oden Tempo",
    leader: "Kozuki Oden",
    color: "Green",
    tier: "B",
    winRate: 51.2,
    popularity: 8.7,
    avgTurnsToWin: 8.5,
    consistency: 70,
    aggression: 55,
    control: 55,
    combo: 65,
    defense: 60,
    speed: 60,
    complexity: 60,
    earlyGame: 65,
    midGame: 75,
    lateGame: 60,
    avgCost: 3.6,
    characterCount: 41,
    eventCount: 7,
    stageCount: 2,
    strengths: ["Tempo plays", "Flexible options", "Good removal"],
    weaknesses: ["No clear win condition", "Average power level", "Inconsistent"],
    playstyle: "Tempo-based strategy maintaining board presence while dealing damage",
    topMatchups: [
      { deck: "Yellow Katakuri", winRate: 53 },
      { deck: "Red Zoro Aggro", winRate: 48 },
      { deck: "Blue Nami Control", winRate: 46 }
    ]
  }
];

export function DeckCompare() {
  const [deckA, setDeckA] = useState<DeckData | null>(null);
  const [deckB, setDeckB] = useState<DeckData | null>(null);

  const handleDeckASelect = (deckId: string) => {
    const deck = sampleDecks.find(d => d.id === deckId);
    setDeckA(deck || null);
  };

  const handleDeckBSelect = (deckId: string) => {
    const deck = sampleDecks.find(d => d.id === deckId);
    setDeckB(deck || null);
  };

  // Radar chart data
  const getRadarData = () => {
    if (!deckA || !deckB) return [];
    return [
      { stat: 'Aggression', deckA: deckA.aggression, deckB: deckB.aggression },
      { stat: 'Control', deckA: deckA.control, deckB: deckB.control },
      { stat: 'Speed', deckA: deckA.speed, deckB: deckB.speed },
      { stat: 'Defense', deckA: deckA.defense, deckB: deckB.defense },
      { stat: 'Combo', deckA: deckA.combo, deckB: deckB.combo },
      { stat: 'Consistency', deckA: deckA.consistency, deckB: deckB.consistency }
    ];
  };

  // Game phase data
  const getGamePhaseData = () => {
    if (!deckA || !deckB) return [];
    return [
      { phase: 'Early', deckA: deckA.earlyGame, deckB: deckB.earlyGame },
      { phase: 'Mid', deckA: deckA.midGame, deckB: deckB.midGame },
      { phase: 'Late', deckA: deckA.lateGame, deckB: deckB.lateGame }
    ];
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S': return 'bg-yellow-500 text-white';
      case 'A': return 'bg-green-500 text-white';
      case 'B': return 'bg-blue-500 text-white';
      case 'C': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getColorBadgeStyle = (color: string) => {
    switch (color) {
      case 'Red': return 'bg-red-100 text-red-800 border-red-300';
      case 'Blue': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Green': return 'bg-green-100 text-green-800 border-green-300';
      case 'Yellow': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Black': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'Purple': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <GitCompare className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            ⚔️ Deck Compare
          </h2>
        </div>
        <p className="text-gray-900">
          Side-by-side analysis using live meta data to compare deck strengths, weaknesses, and matchups
        </p>
      </div>

      {/* Deck Selection */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Deck A */}
        <Card className="p-6 transition-all bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-blue-900">Deck A</h3>
              {deckA && (
                <Badge className={getTierColor(deckA.tier)}>
                  Tier {deckA.tier}
                </Badge>
              )}
            </div>

            <Select onValueChange={handleDeckASelect}>
              <SelectTrigger className="w-full border-blue-300 focus:ring-blue-500">
                <SelectValue placeholder="Select deck A" />
              </SelectTrigger>
              <SelectContent>
                {sampleDecks.map((deck) => (
                  <SelectItem key={deck.id} value={deck.id}>
                    {deck.name} - {deck.leader}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {deckA ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className={`${getColorBadgeStyle(deckA.color)} border`}>
                    {deckA.color}
                  </Badge>
                  <span className="text-sm text-gray-700">Leader: {deckA.leader}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600 mb-1">Win Rate</p>
                    <p className="text-lg font-bold text-blue-900">{deckA.winRate}%</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600 mb-1">Popularity</p>
                    <p className="text-lg font-bold text-blue-900">{deckA.popularity}%</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600 mb-1">Avg Turn Win</p>
                    <p className="text-lg font-bold text-blue-900">{deckA.avgTurnsToWin}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600 mb-1">Avg Cost</p>
                    <p className="text-lg font-bold text-blue-900">{deckA.avgCost}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg border-2 border-dashed border-blue-300 text-center">
                <GitCompare className="w-12 h-12 text-blue-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No deck selected</p>
              </div>
            )}
          </div>
        </Card>

        {/* Deck B */}
        <Card className="p-6 transition-all bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-purple-900">Deck B</h3>
              {deckB && (
                <Badge className={getTierColor(deckB.tier)}>
                  Tier {deckB.tier}
                </Badge>
              )}
            </div>

            <Select onValueChange={handleDeckBSelect}>
              <SelectTrigger className="w-full border-purple-300 focus:ring-purple-500">
                <SelectValue placeholder="Select deck B" />
              </SelectTrigger>
              <SelectContent>
                {sampleDecks.map((deck) => (
                  <SelectItem key={deck.id} value={deck.id}>
                    {deck.name} - {deck.leader}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {deckB ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className={`${getColorBadgeStyle(deckB.color)} border`}>
                    {deckB.color}
                  </Badge>
                  <span className="text-sm text-gray-700">Leader: {deckB.leader}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <p className="text-xs text-gray-600 mb-1">Win Rate</p>
                    <p className="text-lg font-bold text-purple-900">{deckB.winRate}%</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <p className="text-xs text-gray-600 mb-1">Popularity</p>
                    <p className="text-lg font-bold text-purple-900">{deckB.popularity}%</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <p className="text-xs text-gray-600 mb-1">Avg Turn Win</p>
                    <p className="text-lg font-bold text-purple-900">{deckB.avgTurnsToWin}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <p className="text-xs text-gray-600 mb-1">Avg Cost</p>
                    <p className="text-lg font-bold text-purple-900">{deckB.avgCost}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg border-2 border-dashed border-purple-300 text-center">
                <GitCompare className="w-12 h-12 text-purple-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No deck selected</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Key Metrics */}
      <Card className="p-6 transition-all bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-500">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-900">Key Metrics</h3>
              <p className="text-sm text-green-700">Statistical comparison across all categories</p>
            </div>
          </div>

          {!deckA || !deckB ? (
            <div className="bg-white p-12 rounded-lg border-2 border-green-200 text-center">
              <AlertCircle className="w-16 h-16 text-green-300 mx-auto mb-3" />
              <p className="text-gray-700 text-lg">Select two decks to compare metrics</p>
              <p className="text-gray-500 text-sm mt-2">Choose Deck A and Deck B above to see detailed comparison</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Radar Chart */}
              <div className="bg-white p-4 rounded-xl border-2 border-green-200">
                <p className="text-sm font-bold text-green-900 mb-3">PLAYSTYLE RADAR</p>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={getRadarData()}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="stat" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name={deckA.name} dataKey="deckA" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                    <Radar name={deckB.name} dataKey="deckB" stroke="#a855f7" fill="#a855f7" fillOpacity={0.5} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Game Phase Comparison */}
              <div className="bg-white p-4 rounded-xl border-2 border-green-200">
                <p className="text-sm font-bold text-green-900 mb-3">GAME PHASE STRENGTH</p>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={getGamePhaseData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="phase" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="deckA" name={deckA.name} fill="#3b82f6" />
                    <Bar dataKey="deckB" name={deckB.name} fill="#a855f7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Side-by-Side Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border-2 border-blue-300">
                  <div className="text-center mb-3">
                    <p className="text-xs font-bold text-gray-600">Win Rate</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-900">{deckA.winRate}%</p>
                      <p className="text-xs text-gray-600">{deckA.name}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-900">{deckB.winRate}%</p>
                      <p className="text-xs text-gray-600">{deckB.name}</p>
                    </div>
                  </div>
                  {deckA.winRate > deckB.winRate ? (
                    <Badge className="w-full mt-2 bg-blue-100 text-blue-800 justify-center">
                      {deckA.name} +{(deckA.winRate - deckB.winRate).toFixed(1)}%
                    </Badge>
                  ) : deckA.winRate < deckB.winRate ? (
                    <Badge className="w-full mt-2 bg-purple-100 text-purple-800 justify-center">
                      {deckB.name} +{(deckB.winRate - deckA.winRate).toFixed(1)}%
                    </Badge>
                  ) : (
                    <Badge className="w-full mt-2 bg-gray-100 text-gray-800 justify-center">
                      Equal
                    </Badge>
                  )}
                </div>

                <div className="bg-white p-4 rounded-xl border-2 border-blue-300">
                  <div className="text-center mb-3">
                    <p className="text-xs font-bold text-gray-600">Popularity</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-900">{deckA.popularity}%</p>
                      <p className="text-xs text-gray-600">{deckA.name}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-900">{deckB.popularity}%</p>
                      <p className="text-xs text-gray-600">{deckB.name}</p>
                    </div>
                  </div>
                  {deckA.popularity > deckB.popularity ? (
                    <Badge className="w-full mt-2 bg-blue-100 text-blue-800 justify-center">
                      {deckA.name} +{(deckA.popularity - deckB.popularity).toFixed(1)}%
                    </Badge>
                  ) : deckA.popularity < deckB.popularity ? (
                    <Badge className="w-full mt-2 bg-purple-100 text-purple-800 justify-center">
                      {deckB.name} +{(deckB.popularity - deckA.popularity).toFixed(1)}%
                    </Badge>
                  ) : (
                    <Badge className="w-full mt-2 bg-gray-100 text-gray-800 justify-center">
                      Equal
                    </Badge>
                  )}
                </div>

                <div className="bg-white p-4 rounded-xl border-2 border-blue-300">
                  <div className="text-center mb-3">
                    <p className="text-xs font-bold text-gray-600">Speed (Avg Turns)</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-900">{deckA.avgTurnsToWin}</p>
                      <p className="text-xs text-gray-600">{deckA.name}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-900">{deckB.avgTurnsToWin}</p>
                      <p className="text-xs text-gray-600">{deckB.name}</p>
                    </div>
                  </div>
                  {deckA.avgTurnsToWin < deckB.avgTurnsToWin ? (
                    <Badge className="w-full mt-2 bg-blue-100 text-blue-800 justify-center">
                      {deckA.name} Faster
                    </Badge>
                  ) : deckA.avgTurnsToWin > deckB.avgTurnsToWin ? (
                    <Badge className="w-full mt-2 bg-purple-100 text-purple-800 justify-center">
                      {deckB.name} Faster
                    </Badge>
                  ) : (
                    <Badge className="w-full mt-2 bg-gray-100 text-gray-800 justify-center">
                      Equal Speed
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Playstyle Profile */}
      {deckA && deckB && (
        <Card className="p-6 transition-all bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-orange-500">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-900">Playstyle Profile</h3>
                <p className="text-sm text-orange-700">Strategic analysis and gameplay comparison</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Deck A Profile */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border-2 border-blue-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Crown className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-blue-900">{deckA.name}</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{deckA.playstyle}</p>

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-bold text-green-900 mb-1">STRENGTHS</p>
                      <div className="flex flex-wrap gap-2">
                        {deckA.strengths.map((strength, idx) => (
                          <Badge key={idx} className="bg-green-100 text-green-800 border border-green-300">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-red-900 mb-1">WEAKNESSES</p>
                      <div className="flex flex-wrap gap-2">
                        {deckA.weaknesses.map((weakness, idx) => (
                          <Badge key={idx} className="bg-red-100 text-red-800 border border-red-300">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-blue-900 mb-1">DECK COMPOSITION</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-blue-50 p-2 rounded text-center border border-blue-200">
                          <p className="text-lg font-bold text-blue-900">{deckA.characterCount}</p>
                          <p className="text-xs text-gray-600">Characters</p>
                        </div>
                        <div className="bg-purple-50 p-2 rounded text-center border border-purple-200">
                          <p className="text-lg font-bold text-purple-900">{deckA.eventCount}</p>
                          <p className="text-xs text-gray-600">Events</p>
                        </div>
                        <div className="bg-green-50 p-2 rounded text-center border border-green-200">
                          <p className="text-lg font-bold text-green-900">{deckA.stageCount}</p>
                          <p className="text-xs text-gray-600">Stages</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border-2 border-blue-300">
                  <p className="text-xs font-bold text-blue-900 mb-2">TOP MATCHUPS</p>
                  <div className="space-y-2">
                    {deckA.topMatchups.map((matchup, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{matchup.deck}</span>
                        <Badge className={matchup.winRate >= 50 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {matchup.winRate}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deck B Profile */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border-2 border-purple-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Crown className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-purple-900">{deckB.name}</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{deckB.playstyle}</p>

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-bold text-green-900 mb-1">STRENGTHS</p>
                      <div className="flex flex-wrap gap-2">
                        {deckB.strengths.map((strength, idx) => (
                          <Badge key={idx} className="bg-green-100 text-green-800 border border-green-300">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-red-900 mb-1">WEAKNESSES</p>
                      <div className="flex flex-wrap gap-2">
                        {deckB.weaknesses.map((weakness, idx) => (
                          <Badge key={idx} className="bg-red-100 text-red-800 border border-red-300">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-purple-900 mb-1">DECK COMPOSITION</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-blue-50 p-2 rounded text-center border border-blue-200">
                          <p className="text-lg font-bold text-blue-900">{deckB.characterCount}</p>
                          <p className="text-xs text-gray-600">Characters</p>
                        </div>
                        <div className="bg-purple-50 p-2 rounded text-center border border-purple-200">
                          <p className="text-lg font-bold text-purple-900">{deckB.eventCount}</p>
                          <p className="text-xs text-gray-600">Events</p>
                        </div>
                        <div className="bg-green-50 p-2 rounded text-center border border-green-200">
                          <p className="text-lg font-bold text-green-900">{deckB.stageCount}</p>
                          <p className="text-xs text-gray-600">Stages</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border-2 border-purple-300">
                  <p className="text-xs font-bold text-purple-900 mb-2">TOP MATCHUPS</p>
                  <div className="space-y-2">
                    {deckB.topMatchups.map((matchup, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{matchup.deck}</span>
                        <Badge className={matchup.winRate >= 50 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {matchup.winRate}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
