import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { Target, TrendingUp, Crown, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface LeaderData {
  id: string;
  name: string;
  number: string;
  color: string;
  image: string;
}

interface MatchupData {
  [key: string]: { [key: string]: number };
}

const leaders: LeaderData[] = [
  { id: "OP06-002", name: "Monkey D. Luffy", number: "OP06-002", color: "Red", image: "luffy" },
  { id: "OP01-041", name: "Roronoa Zoro", number: "OP01-041", color: "Green", image: "zoro" },
  { id: "OP05-058", name: "Trafalgar Law", number: "OP05-058", color: "Purple", image: "law" },
  { id: "OP01-002", name: "Eustass Kid", number: "OP01-002", color: "Red/Purple", image: "kid" },
  { id: "OP05-088", name: "Charlotte Katakuri", number: "OP05-088", color: "Yellow", image: "katakuri" },
  { id: "OP04-030", name: "Sanji", number: "OP04-030", color: "Yellow/Black", image: "sanji" },
  { id: "OP04-041", name: "Nami", number: "OP04-041", color: "Blue", image: "nami" },
  { id: "OP01-076", name: "Boa Hancock", number: "OP01-076", color: "Blue", image: "hancock" },
  { id: "OP04-079", name: "Kaido", number: "OP04-079", color: "Purple", image: "kaido" },
  { id: "OP04-082", name: "Big Mom", number: "OP04-082", color: "Yellow", image: "bigmom" },
  { id: "OP10-003", name: "Shanks", number: "OP10-003", color: "Red", image: "shanks" },
];

// Mock matchup data (win rates)
const generateMatchupData = (): MatchupData => {
  const data: MatchupData = {};
  leaders.forEach((leader1) => {
    data[leader1.id] = {};
    leaders.forEach((leader2) => {
      if (leader1.id === leader2.id) {
        data[leader1.id][leader2.id] = 50.0; // Self matchup
      } else {
        // Generate realistic win rates between 30-70%
        data[leader1.id][leader2.id] = Math.round((Math.random() * 40 + 30) * 10) / 10;
      }
    });
  });
  return data;
};

const getWinRateColor = (winRate: number): string => {
  if (winRate >= 65) return "bg-gradient-to-br from-green-400 to-green-600";
  if (winRate >= 55) return "bg-gradient-to-br from-green-300 to-green-500";
  if (winRate >= 50) return "bg-gradient-to-br from-green-200 to-green-400";
  if (winRate >= 45) return "bg-gradient-to-br from-red-200 to-red-400";
  if (winRate >= 35) return "bg-gradient-to-br from-red-300 to-red-500";
  return "bg-gradient-to-br from-red-400 to-red-600";
};

const getWinRateLabel = (winRate: number): string => {
  if (winRate >= 65) return "Heavily Favored";
  if (winRate >= 55) return "Favored";
  if (winRate >= 50) return "Even";
  if (winRate >= 45) return "Slightly Unfavorable";
  if (winRate >= 35) return "Unfavorable";
  return "Heavily Unfavorable";
};

export function MatchupMatrix() {
  const [matchupData] = useState<MatchupData>(generateMatchupData());
  const [dataset, setDataset] = useState("last-week");
  const [selectedLeader, setSelectedLeader] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Target className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            ⚔️ Matchup Matrix - Leader vs Leader
          </h2>
        </div>
        <p className="text-gray-900">
          Comprehensive win rate analysis across all leader matchups - Discover your best and worst matchups
        </p>
      </div>

      {/* Dataset Selection and Filters */}
      <Card className="p-6 transition-all bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-purple-900">Dataset:</span>
          </div>
          <Select value={dataset} onValueChange={setDataset}>
            <SelectTrigger className="w-60 border-purple-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-week">Last Week - Western</SelectItem>
              <SelectItem value="last-month">Last Month - Western</SelectItem>
              <SelectItem value="last-week-jp">Last Week - Japan</SelectItem>
              <SelectItem value="all-time">All Time - Global</SelectItem>
              <SelectItem value="tournaments">Tournament Only</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm font-semibold text-gray-700">Highlight Leader:</span>
            <Select value={selectedLeader || "none"} onValueChange={(value) => setSelectedLeader(value === "none" ? null : value)}>
              <SelectTrigger className="w-48 border-purple-300">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {leaders.map((leader) => (
                  <SelectItem key={leader.id} value={leader.id}>
                    {leader.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Win Rate Legend */}
      <Card className="p-6 transition-all bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <p className="text-sm font-bold text-blue-900">WIN RATE COLOR LEGEND</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-16 h-8 rounded bg-gradient-to-br from-green-400 to-green-600"></div>
            <span className="text-sm text-gray-700 font-medium">≥65% - Heavily Favored</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-8 rounded bg-gradient-to-br from-green-300 to-green-500"></div>
            <span className="text-sm text-gray-700 font-medium">55-64% - Favored</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-8 rounded bg-gradient-to-br from-green-200 to-green-400"></div>
            <span className="text-sm text-gray-700 font-medium">50-54% - Slight Edge</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-8 rounded bg-gradient-to-br from-red-200 to-red-400"></div>
            <span className="text-sm text-gray-700 font-medium">45-49% - Slight Disadvantage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-8 rounded bg-gradient-to-br from-red-300 to-red-500"></div>
            <span className="text-sm text-gray-700 font-medium">35-44% - Unfavorable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-8 rounded bg-gradient-to-br from-red-400 to-red-600"></div>
            <span className="text-sm text-gray-700 font-medium">&lt;35% - Heavily Unfavorable</span>
          </div>
        </div>
      </Card>

      {/* Matchup Matrix Table */}
      <Card className="p-6 transition-all bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-300 overflow-x-auto">
        <div className="min-w-[1200px]">
          {/* Header Row - Leaders across top */}
          <div className="grid grid-cols-[200px_repeat(11,minmax(90px,1fr))] gap-1 mb-1">
            <div className="p-2">
              <p className="text-xs font-bold text-gray-600">YOUR LEADER ↓</p>
              <p className="text-xs font-bold text-gray-600">OPPONENT →</p>
            </div>
            {leaders.map((leader) => (
              <div
                key={leader.id}
                className={`p-2 rounded-lg border-2 transition-all ${
                  selectedLeader === leader.id
                    ? "border-yellow-400 bg-yellow-50 shadow-lg"
                    : "border-purple-200 bg-white hover:border-purple-400"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="w-16 h-20 bg-gradient-to-br from-purple-400 to-blue-600 rounded border-2 border-purple-300 flex items-center justify-center shadow-md">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-xs font-bold text-gray-900 text-center leading-tight">{leader.name}</p>
                  <Badge className="text-xs bg-purple-100 text-purple-800">{leader.number}</Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Matchup Grid */}
          <div className="space-y-1">
            {leaders.map((yourLeader) => (
              <div key={yourLeader.id} className="grid grid-cols-[200px_repeat(11,minmax(90px,1fr))] gap-1">
                {/* Your Leader Cell */}
                <div
                  className={`p-2 rounded-lg border-2 flex items-center gap-3 transition-all ${
                    selectedLeader === yourLeader.id
                      ? "border-yellow-400 bg-yellow-50 shadow-lg"
                      : "border-purple-200 bg-white hover:border-purple-400"
                  }`}
                >
                  <div className="w-12 h-16 bg-gradient-to-br from-purple-400 to-blue-600 rounded border-2 border-purple-300 flex items-center justify-center shadow-md flex-shrink-0">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{yourLeader.name}</p>
                    <Badge className="text-xs bg-purple-100 text-purple-800">{yourLeader.number}</Badge>
                  </div>
                </div>

                {/* Win Rate Cells */}
                {leaders.map((oppLeader) => {
                  const winRate = matchupData[yourLeader.id]?.[oppLeader.id] || 50;
                  const isHighlighted =
                    selectedLeader === yourLeader.id || selectedLeader === oppLeader.id;

                  return (
                    <div
                      key={oppLeader.id}
                      className={`relative p-3 rounded-lg ${getWinRateColor(
                        winRate
                      )} transition-all hover:shadow-lg hover:scale-105 cursor-pointer group ${
                        isHighlighted ? "ring-4 ring-yellow-400 shadow-xl scale-105" : ""
                      }`}
                      title={`${yourLeader.name} vs ${oppLeader.name}: ${winRate}% - ${getWinRateLabel(
                        winRate
                      )}`}
                    >
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white drop-shadow-lg">
                          {winRate}%
                        </p>
                        <p className="text-xs text-white opacity-90 mt-1 hidden group-hover:block">
                          {getWinRateLabel(winRate)}
                        </p>
                      </div>
                      {yourLeader.id === oppLeader.id && (
                        <div className="absolute top-1 right-1 bg-gray-800 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
                          MIRROR
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Quick Stats Summary */}
      {selectedLeader && (
        <Card className="p-6 transition-all bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-yellow-600" />
              <h3 className="text-xl font-bold text-yellow-900">
                {leaders.find((l) => l.id === selectedLeader)?.name} - Matchup Analysis
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Best Matchups */}
              <div className="bg-white p-4 rounded-xl border-2 border-green-300">
                <p className="text-sm font-bold text-green-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  BEST MATCHUPS
                </p>
                <div className="space-y-2">
                  {leaders
                    .filter((l) => l.id !== selectedLeader)
                    .sort((a, b) => (matchupData[selectedLeader]?.[b.id] || 0) - (matchupData[selectedLeader]?.[a.id] || 0))
                    .slice(0, 3)
                    .map((leader) => {
                      const winRate = matchupData[selectedLeader]?.[leader.id] || 0;
                      return (
                        <div key={leader.id} className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
                          <span className="text-sm font-medium text-gray-900 truncate">{leader.name}</span>
                          <Badge className="bg-green-500 text-white">{winRate}%</Badge>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Even Matchups */}
              <div className="bg-white p-4 rounded-xl border-2 border-gray-300">
                <p className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  EVEN MATCHUPS
                </p>
                <div className="space-y-2">
                  {leaders
                    .filter((l) => l.id !== selectedLeader)
                    .filter((l) => {
                      const winRate = matchupData[selectedLeader]?.[l.id] || 0;
                      return winRate >= 48 && winRate <= 52;
                    })
                    .slice(0, 3)
                    .map((leader) => {
                      const winRate = matchupData[selectedLeader]?.[leader.id] || 0;
                      return (
                        <div key={leader.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-sm font-medium text-gray-900 truncate">{leader.name}</span>
                          <Badge className="bg-gray-500 text-white">{winRate}%</Badge>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Worst Matchups */}
              <div className="bg-white p-4 rounded-xl border-2 border-red-300">
                <p className="text-sm font-bold text-red-900 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  WORST MATCHUPS
                </p>
                <div className="space-y-2">
                  {leaders
                    .filter((l) => l.id !== selectedLeader)
                    .sort((a, b) => (matchupData[selectedLeader]?.[a.id] || 0) - (matchupData[selectedLeader]?.[b.id] || 0))
                    .slice(0, 3)
                    .map((leader) => {
                      const winRate = matchupData[selectedLeader]?.[leader.id] || 0;
                      return (
                        <div key={leader.id} className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-200">
                          <span className="text-sm font-medium text-gray-900 truncate">{leader.name}</span>
                          <Badge className="bg-red-500 text-white">{winRate}%</Badge>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Overall Stats */}
            <div className="grid md:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-lg border border-yellow-200">
                <p className="text-xs text-gray-600 mb-1">Average Win Rate</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {(
                    leaders
                      .filter((l) => l.id !== selectedLeader)
                      .reduce((sum, l) => sum + (matchupData[selectedLeader]?.[l.id] || 0), 0) /
                    (leaders.length - 1)
                  ).toFixed(1)}
                  %
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <p className="text-xs text-gray-600 mb-1">Favorable Matchups</p>
                <p className="text-2xl font-bold text-green-900">
                  {
                    leaders.filter(
                      (l) =>
                        l.id !== selectedLeader && (matchupData[selectedLeader]?.[l.id] || 0) >= 55
                    ).length
                  }
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Even Matchups</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    leaders.filter((l) => {
                      const winRate = matchupData[selectedLeader]?.[l.id] || 0;
                      return l.id !== selectedLeader && winRate >= 45 && winRate < 55;
                    }).length
                  }
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-red-200">
                <p className="text-xs text-gray-600 mb-1">Unfavorable Matchups</p>
                <p className="text-2xl font-bold text-red-900">
                  {
                    leaders.filter(
                      (l) =>
                        l.id !== selectedLeader && (matchupData[selectedLeader]?.[l.id] || 0) < 45
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}