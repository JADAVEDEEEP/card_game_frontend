import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Trophy, Users, Calendar, ExternalLink, Eye } from "lucide-react";
import { useState } from "react";

interface Tournament {
  id: string;
  name: string;
  date: string;
  players: number;
  format: string;
  location: string;
}

interface Standing {
  placing: number;
  player: string;
  record: string;
  deck: string;
}

export function TournamentImport() {
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'details' | 'standings'>('list');

  const tournaments: Tournament[] = [
    {
      id: "t1",
      name: "Regional Championship - Tokyo",
      date: "2024-12-15",
      players: 256,
      format: "Standard",
      location: "Tokyo, Japan"
    },
    {
      id: "t2",
      name: "Store Championship - Akihabara",
      date: "2024-12-08",
      players: 64,
      format: "Standard",
      location: "Akihabara, Tokyo"
    },
    {
      id: "t3",
      name: "Grand Prix - Osaka",
      date: "2024-12-01",
      players: 512,
      format: "Standard",
      location: "Osaka, Japan"
    },
    {
      id: "t4",
      name: "Locals - Shibuya",
      date: "2024-11-30",
      players: 32,
      format: "Standard",
      location: "Shibuya, Tokyo"
    },
    {
      id: "t5",
      name: "Online Qualifier #47",
      date: "2024-11-28",
      players: 128,
      format: "Standard",
      location: "Online"
    },
    {
      id: "t6",
      name: "Regional Championship - Kyoto",
      date: "2024-11-22",
      players: 180,
      format: "Standard",
      location: "Kyoto, Japan"
    }
  ];

  const standings: Standing[] = [
    { placing: 1, player: "Tanaka Kenji", record: "7-0-0", deck: "Red/Purple Luffy" },
    { placing: 2, player: "Yamamoto Hiroshi", record: "6-1-0", deck: "Yellow Katakuri" },
    { placing: 3, player: "Sato Yuki", record: "6-1-0", deck: "Blue/Black Crocodile" },
    { placing: 4, player: "Kobayashi Mai", record: "5-2-0", deck: "Green Uta" },
    { placing: 5, player: "Ito Akira", record: "5-2-0", deck: "Red Zoro" },
    { placing: 6, player: "Nakamura Ryu", record: "5-2-0", deck: "Purple Doffy" },
    { placing: 7, player: "Watanabe Ken", record: "4-2-1", deck: "Red/Purple Luffy" },
    { placing: 8, player: "Suzuki Hana", record: "4-3-0", deck: "Yellow Katakuri" }
  ];

  const tournamentDetails = {
    phases: "Swiss (7 rounds) + Top 8 Single Elimination",
    decklistsEnabled: true,
    organizer: "Limitless TCG Japan",
    entryFee: "¥1000",
    prizeSupport: "Promo cards + Store credit",
    startTime: "10:00 AM JST",
    checkInRequired: true
  };

  const handleViewTournament = (tournamentId: string, mode: 'details' | 'standings') => {
    setSelectedTournament(tournamentId);
    setViewMode(mode);
  };

  const handleBackToList = () => {
    setSelectedTournament(null);
    setViewMode('list');
  };

  const handleGenerateStudyPlan = () => {
    alert("Matchup Study Plan generated! Check Training Playlist section.");
  };

  if (viewMode === 'details' && selectedTournament) {
    const tournament = tournaments.find(t => t.id === selectedTournament);
    return (
      <div className="space-y-8">
        <Button variant="outline" onClick={handleBackToList} style={{ borderColor: '#C19A6B' }}>
          ← Back to Tournaments
        </Button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#0A1F44' }}>
            <Trophy className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-bold">TOURNAMENT DETAILS</span>
          </div>
          <h1 className="text-4xl font-bold" style={{ color: '#0A1F44' }}>
            {tournament?.name}
          </h1>
        </div>

        <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">PHASES</p>
                <p className="font-semibold">{tournamentDetails.phases}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">ORGANIZER</p>
                <p className="font-semibold">{tournamentDetails.organizer}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">ENTRY FEE</p>
                <p className="font-semibold">{tournamentDetails.entryFee}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">PRIZE SUPPORT</p>
                <p className="font-semibold">{tournamentDetails.prizeSupport}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">START TIME</p>
                <p className="font-semibold">{tournamentDetails.startTime}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">DECKLISTS</p>
                <Badge className={tournamentDetails.decklistsEnabled ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                  {tournamentDetails.decklistsEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">CHECK-IN</p>
                <Badge className={tournamentDetails.checkInRequired ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}>
                  {tournamentDetails.checkInRequired ? 'Required' : 'Not Required'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t mt-6">
            <Button onClick={() => handleViewTournament(selectedTournament, 'standings')} style={{ backgroundColor: '#0A1F44' }}>
              View Standings
            </Button>
            <Button variant="outline" style={{ borderColor: '#C19A6B' }}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Open on Limitless
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (viewMode === 'standings' && selectedTournament) {
    const tournament = tournaments.find(t => t.id === selectedTournament);
    return (
      <div className="space-y-8">
        <Button variant="outline" onClick={handleBackToList} style={{ borderColor: '#C19A6B' }}>
          ← Back to Tournaments
        </Button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#0A1F44' }}>
            <Trophy className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-bold">STANDINGS</span>
          </div>
          <h1 className="text-4xl font-bold" style={{ color: '#0A1F44' }}>
            {tournament?.name}
          </h1>
        </div>

        <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
              Final Standings
            </h2>
            <Button onClick={handleGenerateStudyPlan} style={{ backgroundColor: '#D0021B' }}>
              Generate Matchup Study Plan
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#0A1F44' }}>
                <tr>
                  <th className="px-4 py-3 text-left text-white font-bold">Placing</th>
                  <th className="px-4 py-3 text-left text-white font-bold">Player</th>
                  <th className="px-4 py-3 text-left text-white font-bold">Record</th>
                  <th className="px-4 py-3 text-left text-white font-bold">Deck</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((standing, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-orange-50'}>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          standing.placing === 1
                            ? 'bg-yellow-500 text-white'
                            : standing.placing <= 3
                            ? 'bg-gray-400 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }
                      >
                        #{standing.placing}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-semibold">{standing.player}</td>
                    <td className="px-4 py-3 font-mono">{standing.record}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" style={{ borderColor: '#C19A6B' }}>
                        {standing.deck}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#0A1F44' }}>
          <Trophy className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">TOURNAMENT IMPORT</span>
        </div>
        <h1 className="text-4xl font-bold" style={{ color: '#0A1F44' }}>
          Tournament & Deck Data
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Import tournament results and decklists from Limitless TCG
        </p>
      </div>

      {/* Tournament List */}
      <div className="grid gap-4">
        {tournaments.map((tournament) => (
          <Card
            key={tournament.id}
            className="p-6 border-2 hover:shadow-lg transition-all cursor-pointer"
            style={{ borderColor: '#C19A6B' }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5" style={{ color: '#C19A6B' }} />
                  <h3 className="text-xl font-bold" style={{ color: '#0A1F44' }}>
                    {tournament.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{tournament.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{tournament.players} players</span>
                  </div>
                  <div>
                    <Badge variant="outline">{tournament.format}</Badge>
                  </div>
                  <div>
                    <span className="text-gray-500">{tournament.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewTournament(tournament.id, 'details')}
                  style={{ borderColor: '#C19A6B' }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Details
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleViewTournament(tournament.id, 'standings')}
                  style={{ backgroundColor: '#0A1F44' }}
                >
                  Standings
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
