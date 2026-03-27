import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { TrendingUp, Target, Calendar } from "lucide-react";
import { useState } from "react";

interface MetaCard {
  name: string;
  playRate: number;
  winRate: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface MetaLeader {
  name: string;
  playRate: number;
  winRate: number;
  avgPlacement: number;
  trend: 'up' | 'down' | 'stable';
}

export function MetaSnapshot() {
  const [timeRange, setTimeRange] = useState<'30' | '90'>('30');

  const metaLeaders: MetaLeader[] = [
    { name: "Red/Purple Luffy", playRate: 24.5, winRate: 58.2, avgPlacement: 12.3, trend: 'up' },
    { name: "Yellow Katakuri", playRate: 18.3, winRate: 56.8, avgPlacement: 14.1, trend: 'up' },
    { name: "Blue/Black Crocodile", playRate: 15.7, winRate: 54.3, avgPlacement: 16.8, trend: 'stable' },
    { name: "Green Uta", playRate: 12.4, winRate: 51.2, avgPlacement: 18.5, trend: 'down' },
    { name: "Purple Doffy", playRate: 10.2, winRate: 53.1, avgPlacement: 17.2, trend: 'stable' },
    { name: "Red Zoro", playRate: 8.9, winRate: 49.8, avgPlacement: 21.4, trend: 'down' }
  ];

  const trendingCards: MetaCard[] = [
    { name: "Eustass Kid", playRate: 32.1, winRate: 62.5, trend: 'up', color: 'Red' },
    { name: "Marco the Phoenix", playRate: 28.7, winRate: 59.3, trend: 'up', color: 'Blue' },
    { name: "Charlotte Katakuri", playRate: 26.4, winRate: 58.1, trend: 'stable', color: 'Yellow' },
    { name: "Radical Beam!!!", playRate: 24.8, winRate: 55.7, trend: 'up', color: 'Red' },
    { name: "Gum-Gum Red Roc", playRate: 22.3, winRate: 57.2, trend: 'stable', color: 'Red' },
    { name: "Don Quixote Doflamingo", playRate: 20.1, winRate: 54.8, trend: 'down', color: 'Purple' }
  ];

  const practiceMatchups = [
    {
      archetype: "Red/Purple Luffy",
      reason: "Highest meta share (24.5%) - most likely opponent",
      priority: "High"
    },
    {
      archetype: "Yellow Katakuri",
      reason: "Best win rate (56.8%) among top decks",
      priority: "High"
    },
    {
      archetype: "Blue/Black Crocodile",
      reason: "Rising in popularity, control matchup practice needed",
      priority: "Medium"
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return '↗';
    if (trend === 'down') return '↘';
    return '→';
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return '#2ECC40';
    if (trend === 'down') return '#D0021B';
    return '#C19A6B';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#0A1F44' }}>
          <TrendingUp className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">META SNAPSHOT</span>
        </div>
        <h1 className="text-4xl font-bold" style={{ color: '#0A1F44' }}>
          Current Meta Analysis
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Real-time meta data from Limitless TCG tournaments
        </p>
      </div>

      {/* Time Range Filter */}
      <div className="flex justify-center gap-3">
        <Button
          variant={timeRange === '30' ? 'default' : 'outline'}
          onClick={() => setTimeRange('30')}
          style={timeRange === '30' ? { backgroundColor: '#0A1F44' } : { borderColor: '#C19A6B' }}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Last 30 Days
        </Button>
        <Button
          variant={timeRange === '90' ? 'default' : 'outline'}
          onClick={() => setTimeRange('90')}
          style={timeRange === '90' ? { backgroundColor: '#0A1F44' } : { borderColor: '#C19A6B' }}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Last 90 Days
        </Button>
      </div>

      {/* Practice These Matchups Callout */}
      <Card className="p-6 border-4" style={{ borderColor: '#D0021B', backgroundColor: '#FFF9F0' }}>
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6" style={{ color: '#D0021B' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
            Practice These 3 Matchups
          </h2>
        </div>
        
        <div className="space-y-3">
          {practiceMatchups.map((matchup, index) => (
            <div key={index} className="p-4 bg-white rounded-lg border-2" style={{ borderColor: '#C19A6B' }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full font-bold text-white text-sm" style={{ backgroundColor: '#D0021B' }}>
                      {index + 1}
                    </div>
                    <h3 className="font-bold" style={{ color: '#0A1F44' }}>
                      {matchup.archetype}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">{matchup.reason}</p>
                </div>
                <Badge className={
                  matchup.priority === 'High'
                    ? 'bg-red-500 text-white'
                    : 'bg-yellow-500 text-white'
                }>
                  {matchup.priority} Priority
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <Button
          className="w-full mt-4 gap-2"
          style={{ backgroundColor: '#D0021B' }}
        >
          Generate Training Plan for These Matchups
        </Button>
      </Card>

      {/* Meta Leaders */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
          Top Leaders by Meta Share
        </h2>
        
        <Card className="overflow-hidden border-2" style={{ borderColor: '#C19A6B' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#0A1F44' }}>
                <tr>
                  <th className="px-4 py-3 text-left text-white font-bold">Leader</th>
                  <th className="px-4 py-3 text-left text-white font-bold">Play Rate</th>
                  <th className="px-4 py-3 text-left text-white font-bold">Win Rate</th>
                  <th className="px-4 py-3 text-left text-white font-bold">Avg Placement</th>
                  <th className="px-4 py-3 text-left text-white font-bold">Trend</th>
                </tr>
              </thead>
              <tbody>
                {metaLeaders.map((leader, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-orange-50'}>
                    <td className="px-4 py-3 font-bold" style={{ color: '#0A1F44' }}>
                      {leader.name}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${leader.playRate}%`,
                              backgroundColor: '#C19A6B'
                            }}
                          />
                        </div>
                        <span className="font-semibold">{leader.playRate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={
                        leader.winRate >= 55
                          ? 'bg-green-500 text-white'
                          : leader.winRate >= 50
                          ? 'bg-yellow-500 text-white'
                          : 'bg-red-500 text-white'
                      }>
                        {leader.winRate}%
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {leader.avgPlacement}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xl font-bold"
                        style={{ color: getTrendColor(leader.trend) }}
                      >
                        {getTrendIcon(leader.trend)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Trending Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
          Trending Cards
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingCards.map((card, index) => (
            <Card key={index} className="p-4 border-2 hover:shadow-lg transition-all" style={{ borderColor: '#C19A6B' }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold" style={{ color: '#0A1F44' }}>
                    {card.name}
                  </h3>
                  <Badge variant="outline" className="mt-1" style={{ borderColor: '#C19A6B' }}>
                    {card.color}
                  </Badge>
                </div>
                <span
                  className="text-2xl font-bold"
                  style={{ color: getTrendColor(card.trend) }}
                >
                  {getTrendIcon(card.trend)}
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Play Rate</span>
                    <span className="font-semibold">{card.playRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${card.playRate}%`,
                        backgroundColor: '#C19A6B'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Win Rate</span>
                    <span className="font-semibold">{card.winRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${card.winRate}%`,
                        backgroundColor: card.winRate >= 55 ? '#2ECC40' : '#C19A6B'
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
