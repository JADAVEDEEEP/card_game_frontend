import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, Copy, Check, Crown, User, Loader2, CalendarDays } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ApiDeckCard {
  raw?: string;
  code: string;
  count: number;
  name: string;
  image?: string;
  thumbnail?: string;
  category?: string;
}

interface ApiDeckEntry {
  deck?: string[];
  deck_cards?: ApiDeckCard[];
  games: number;
  winRate: number;
  wins: number;
  losses: number;
  avgDuration?: number;
}

interface ApiLeaderDecklist {
  _id: string;
  leader: string;
  card_id: string;
  leader_code?: string;
  leader_name?: string;
  leader_image?: string;
  leader_thumbnail?: string;
  image?: string;
  setName?: string;
  leaderWinRate?: number;
  totalDecklists?: number;
  decklists?: ApiDeckEntry[];
}

interface ApiDecklistResponse {
  decklists?: ApiLeaderDecklist[];
}

interface ApiCardRecord {
  id: string;
  name?: string;
  img_url?: string;
  img_full_url?: string;
}

interface DeckCardItem {
  id: string;
  name: string;
  number: string;
  count: number;
  image: string;
}

interface LeaderOption {
  id: string;
  name: string;
  number: string;
  deckCount: number;
}

interface DisplayDeck {
  id: string;
  playerId: string;
  playerName: string;
  leaderName: string;
  leaderNumber: string;
  leaderImage: string;
  placement: string;
  winRate: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  tournamentName: string;
  date: string;
  cards: DeckCardItem[];
}

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim().replace(/\/+$/, "") ||
  (typeof window !== "undefined" &&
  /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname)
    ? "http://localhost:3000"
    : "https://onepice-cardgame.onrender.com");

const buildProxyImageUrl = (cardCode?: string) => {
  const code = String(cardCode || "").trim();
  return code ? `${API_BASE_URL}/cardsApi/image/${encodeURIComponent(code)}` : "";
};

const formatSetName = (value?: string) => {
  const raw = String(value || "").trim();
  if (!raw) return "Tournament Decklist Archive";
  return raw
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const getPlacementLabel = (index: number) => {
  if (index === 0) return "1st Place";
  if (index === 1) return "2nd Place";
  if (index === 2) return "3rd Place";
  return `Top ${index + 1}`;
};

const formatAverageDuration = (seconds?: number) => {
  if (!seconds || !Number.isFinite(seconds)) return "Average Match Run";
  const minutes = Math.round(seconds / 60);
  return `${minutes} min avg rounds`;
};

const buildLeaderName = (leader: ApiLeaderDecklist) =>
  String(leader.leader || leader.leader_name || leader.card_id || "").trim();

const isLikelyCardCode = (value?: string) => /^[A-Z]{2,}\d{2}[-_]\d+/i.test(String(value || "").trim());

const pickCardImage = (cardCode: string, directImage?: string, fallbackImage?: string) =>
  String(directImage || fallbackImage || "").trim() || buildProxyImageUrl(cardCode);

const resolveLeaderDisplayName = (leader: ApiLeaderDecklist, cardsById: Map<string, ApiCardRecord>) => {
  const leaderCode = String(leader.card_id || leader.leader_code || "").trim();
  const leaderCard = cardsById.get(leaderCode);
  const apiName = buildLeaderName(leader);
  if (apiName && !isLikelyCardCode(apiName)) return apiName;
  return String(leaderCard?.name || apiName || leaderCode).trim();
};

const buildLeaderOptions = (leaders: ApiLeaderDecklist[], cardsById: Map<string, ApiCardRecord>): LeaderOption[] =>
  leaders
    .map((leader) => ({
      id: String(leader.card_id || leader.leader_code || leader._id),
      name: resolveLeaderDisplayName(leader, cardsById),
      number: String(leader.card_id || leader.leader_code || "").trim(),
      deckCount: Array.isArray(leader.decklists) ? leader.decklists.length : Number(leader.totalDecklists || 0),
    }))
    .sort((a, b) => b.deckCount - a.deckCount || a.name.localeCompare(b.name));

const mapDeckCards = (cards: ApiDeckCard[] = [], cardsById: Map<string, ApiCardRecord>) =>
  cards.map((card, index) => ({
    id: `${card.code}-${index}`,
    name: String(card.name || cardsById.get(card.code)?.name || card.code || "Unknown Card").trim(),
    number: String(card.code || "").trim(),
    count: Number(card.count || 0),
    image: pickCardImage(
      String(card.code || "").trim(),
      String(card.image || card.thumbnail || "").trim(),
      String(cardsById.get(card.code)?.img_full_url || cardsById.get(card.code)?.img_url || "").trim()
    ),
  }));

const mapLeaderDecks = (leader: ApiLeaderDecklist | null, cardsById: Map<string, ApiCardRecord>): DisplayDeck[] => {
  if (!leader || !Array.isArray(leader.decklists)) return [];

  const leaderCode = String(leader.card_id || leader.leader_code || "").trim();
  const leaderCard = cardsById.get(leaderCode);
  const leaderName = resolveLeaderDisplayName(leader, cardsById);
  const leaderImage = pickCardImage(
    leaderCode,
    String(leader.leader_image || leader.leader_thumbnail || leader.image || "").trim(),
    String(leaderCard?.img_full_url || leaderCard?.img_url || "").trim()
  );

  return [...leader.decklists]
    .sort((a, b) => b.winRate - a.winRate || b.wins - a.wins || b.games - a.games)
    .map((deck, index) => ({
      id: `${leader._id}-${index}`,
      playerId: `meta-${index + 1}`,
      playerName: `Deck Pilot ${index + 1}`,
      leaderName,
      leaderNumber: leaderCode,
      leaderImage,
      placement: getPlacementLabel(index),
      winRate: Number(deck.winRate || 0),
      gamesPlayed: Number(deck.games || 0),
      wins: Number(deck.wins || 0),
      losses: Number(deck.losses || 0),
      tournamentName: formatSetName(leader.setName),
      date: formatAverageDuration(deck.avgDuration),
      cards: mapDeckCards(deck.deck_cards || [], cardsById),
    }));
};

export function BestDecklists() {
  const [leaders, setLeaders] = useState<ApiLeaderDecklist[]>([]);
  const [cardsById, setCardsById] = useState<Map<string, ApiCardRecord>>(new Map());
  const [selectedLeader, setSelectedLeader] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadDecklists = async () => {
      try {
        setLoading(true);
        setError(null);

        const [decklistResponse, cardsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/decks/decklist?limit=100`),
          fetch(`${API_BASE_URL}/cardsApi/cards`),
        ]);

        if (!decklistResponse.ok) {
          throw new Error(`Decklist request failed with status ${decklistResponse.status}`);
        }

        const data: ApiDecklistResponse = await decklistResponse.json();
        const cardsData: ApiCardRecord[] = cardsResponse.ok ? await cardsResponse.json() : [];
        if (cancelled) return;

        const nextLeaders = Array.isArray(data.decklists) ? data.decklists : [];
        const nextCardsById = new Map(
          (Array.isArray(cardsData) ? cardsData : []).map((card) => [String(card.id || "").trim(), card])
        );
        const nextLeaderOptions = buildLeaderOptions(nextLeaders, nextCardsById);

        setLeaders(nextLeaders);
        setCardsById(nextCardsById);
        setSelectedLeader((current) =>
          current && nextLeaderOptions.some((option) => option.id === current)
            ? current
            : nextLeaderOptions[0]?.id || ""
        );
      } catch (fetchError) {
        if (cancelled) return;
        setError(fetchError instanceof Error ? fetchError.message : "Failed to load decklists");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadDecklists();

    return () => {
      cancelled = true;
    };
  }, []);

  const leaderOptions = buildLeaderOptions(leaders, cardsById);
  const selectedLeaderRecord =
    leaders.find((leader) => String(leader.card_id || leader.leader_code || leader._id) === selectedLeader) || null;
  const selectedLeaderCode = String(
    selectedLeaderRecord?.card_id || selectedLeaderRecord?.leader_code || selectedLeader || ""
  ).trim();
  const selectedLeaderCard = cardsById.get(selectedLeaderCode);
  const selectedLeaderName = selectedLeaderRecord
    ? resolveLeaderDisplayName(selectedLeaderRecord, cardsById)
    : String(selectedLeaderCard?.name || selectedLeaderCode).trim();
  const filteredDecklists = mapLeaderDecks(selectedLeaderRecord, cardsById);
  const selectedLeaderInfo =
    (leaderOptions.find((leader) => leader.id === selectedLeader)
      ? {
          ...leaderOptions.find((leader) => leader.id === selectedLeader)!,
          name: selectedLeaderName || leaderOptions.find((leader) => leader.id === selectedLeader)!.name,
        }
      : leaderOptions.length > 0
      ? {
          ...leaderOptions[0],
          name: selectedLeaderName || leaderOptions[0].name,
        }
      : null);

  const handleCopyDeck = async (deckList: DisplayDeck) => {
    const deckText = `
${deckList.leaderName} (${deckList.leaderNumber})
Player: ${deckList.playerName}
Placement: ${deckList.placement}
Win Rate: ${deckList.winRate}% (${deckList.wins}-${deckList.losses})
Source: ${deckList.tournamentName}

DECKLIST:
${deckList.cards.map((card) => `${card.count}x ${card.name} (${card.number})`).join("\n")}
    `.trim();

    try {
      await navigator.clipboard.writeText(deckText);
      setCopiedId(deckList.id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-600" />
          <h2 className="text-3xl font-bold text-gray-900">Best Decklists</h2>
        </div>
        <p className="text-gray-900">
          Live tournament-style decklists powered by the backend decklist API.
        </p>
      </div>

      <Card className="p-6 transition-all bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-yellow-700" />
              <span className="font-bold text-yellow-900">SELECT A LEADER</span>
            </div>
            <p className="text-sm text-yellow-700 mb-4">Choose a leader to view tournament decklists</p>

            <Select value={selectedLeader} onValueChange={setSelectedLeader} disabled={loading || leaderOptions.length === 0}>
              <SelectTrigger className="w-full max-w-md border-yellow-400">
                <SelectValue placeholder={loading ? "Loading leaders..." : "Choose a leader"} />
              </SelectTrigger>
              <SelectContent>
                {leaderOptions.map((leader) => (
                  <SelectItem key={leader.id} value={leader.id}>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{leader.name}</span>
                      <span className="text-xs text-gray-400">{leader.number}</span>
                      <Badge className="bg-yellow-600 text-white text-xs">{leader.deckCount} decks</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {loading ? (
        <Card className="p-12 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300">
          <div className="flex items-center justify-center gap-3 text-blue-900">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-semibold">Loading decklists from API...</span>
          </div>
        </Card>
      ) : error ? (
        <Card className="p-8 bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300">
          <h3 className="text-xl font-bold text-red-900 mb-2">Could not load decklists</h3>
          <p className="text-red-700">{error}</p>
          <p className="text-sm text-red-600 mt-3">
            Check that the backend is running at <span className="font-semibold">{API_BASE_URL}</span>.
          </p>
        </Card>
      ) : (
        <>
          <Card className="p-4 transition-all bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                {selectedLeaderRecord?.leader_image ? (
                  <img
                    src={pickCardImage(
                      selectedLeaderCode,
                      String(selectedLeaderRecord.leader_image || "").trim(),
                      String(selectedLeaderCard?.img_full_url || selectedLeaderCard?.img_url || "").trim()
                    )}
                    alt={selectedLeaderInfo?.name || "Leader"}
                    className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-md"
                    onError={(event) => {
                      const target = event.currentTarget;
                      const proxyUrl = buildProxyImageUrl(selectedLeaderCode);
                      if (proxyUrl && target.src !== proxyUrl) target.src = proxyUrl;
                    }}
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                    <Crown className="w-7 h-7 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-purple-900">{selectedLeaderInfo?.name || "No Leader Selected"}</h3>
                  <p className="text-sm text-purple-700">
                    {selectedLeaderInfo?.number || "N/A"} • {filteredDecklists.length} tournament decklist
                    {filteredDecklists.length !== 1 ? "s" : ""} found
                  </p>
                </div>
              </div>
              <Badge className="bg-purple-600 text-white text-lg px-4 py-2">
                {filteredDecklists.length} Deck{filteredDecklists.length !== 1 ? "s" : ""}
              </Badge>
            </div>
          </Card>

          {filteredDecklists.length === 0 ? (
            <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300">
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No Decklists Found</h3>
              <p className="text-gray-500">No tournament decklists are available for this leader yet.</p>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredDecklists.map((deck, index) => (
                <Card
                  key={deck.id}
                  className="p-6 transition-all bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 hover:shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="space-y-2">
                        <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg px-3 py-1">
                          Deck #{index + 1}
                        </Badge>

                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-base px-3 py-1">
                            <User className="w-4 h-4 mr-1" />
                            {deck.playerName}
                          </Badge>
                          <span className="text-sm text-purple-700 font-semibold">ID: {deck.playerId}</span>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                          {deck.leaderImage ? (
                            <img
                              src={deck.leaderImage}
                              alt={deck.leaderName}
                              className="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-sm"
                              onError={(event) => {
                                const target = event.currentTarget;
                                const proxyUrl = buildProxyImageUrl(deck.leaderNumber);
                                if (proxyUrl && target.src !== proxyUrl) target.src = proxyUrl;
                              }}
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                              <Crown className="w-5 h-5 text-white" />
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Crown className="w-5 h-5 text-blue-600" />
                            <span className="text-lg font-bold text-blue-900">{deck.leaderName}</span>
                            <Badge className="bg-blue-200 text-blue-900 text-xs">{deck.leaderNumber}</Badge>
                          </div>
                        </div>

                        <p className="text-sm text-blue-700 flex items-center gap-2 flex-wrap">
                          <CalendarDays className="w-4 h-4" />
                          <span>{deck.tournamentName}</span>
                          <span>•</span>
                          <span>{deck.date}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="text-center bg-white px-4 py-2 rounded-lg border-2 border-yellow-300">
                          <p className="text-xs text-yellow-700 font-semibold">Placement</p>
                          <p className="text-2xl font-bold text-yellow-900">{deck.placement}</p>
                        </div>
                        <div className="text-center bg-white px-4 py-2 rounded-lg border-2 border-green-300">
                          <p className="text-xs text-green-600 font-semibold">Win Rate</p>
                          <p className="text-2xl font-bold text-green-900">{deck.winRate.toFixed(1)}%</p>
                        </div>
                        <div className="text-center bg-white px-4 py-2 rounded-lg border-2 border-blue-300">
                          <p className="text-xs text-blue-600 font-semibold">Record</p>
                          <p className="text-lg font-bold text-blue-900">
                            {deck.wins}-{deck.losses}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <h4 className="text-sm font-bold text-blue-900">
                          DECKLIST ({deck.cards.reduce((sum, card) => sum + card.count, 0)} cards)
                        </h4>
                        <Button
                          onClick={() => handleCopyDeck(deck)}
                          className={`${
                            copiedId === deck.id ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                          } text-white transition-all`}
                        >
                          {copiedId === deck.id ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              COPY TO CLIPBOARD
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
                        {deck.cards.map((card) => (
                          <div
                            key={card.id}
                            className="relative group cursor-pointer transition-all hover:scale-105 hover:z-10"
                            title={`${card.name} (${card.number}) x${card.count}`}
                          >
                            <div className="relative aspect-[2/3] rounded-md border-2 border-white overflow-hidden shadow-md bg-gradient-to-br from-red-500 to-rose-600">
                              {card.image ? (
                                <img
                                  src={card.image}
                                  alt={card.name}
                                  className="w-full h-full object-cover"
                                  onError={(event) => {
                                    const target = event.currentTarget;
                                    const proxyUrl = buildProxyImageUrl(card.number);
                                    if (proxyUrl && target.src !== proxyUrl) target.src = proxyUrl;
                                  }}
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Crown className="w-8 h-8 text-white opacity-70" />
                                </div>
                              )}

                              {card.count > 0 && (
                                <div className="absolute top-1 right-1 min-w-6 h-6 px-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white shadow-md border-2 border-white text-xs">
                                  {card.count}
                                </div>
                              )}

                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2">
                                <p className="text-white font-bold text-[10px] leading-tight line-clamp-2">{card.name}</p>
                                <p className="text-gray-200 text-[10px]">{card.number}</p>
                              </div>

                              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                                <p className="text-white font-bold text-xs leading-tight mb-1">{card.name}</p>
                                <p className="text-gray-300 text-[10px]">{card.number}</p>
                                <p className="text-yellow-400 text-[10px] mt-1">x{card.count}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {filteredDecklists.length > 0 && (
            <Card className="p-6 transition-all bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
              <h4 className="text-lg font-bold text-green-900 mb-4">
                Statistics for {selectedLeaderInfo?.name}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-lg border-2 border-purple-300">
                  <p className="text-xs text-purple-600 font-semibold mb-1">Total Decklists</p>
                  <p className="text-3xl font-bold text-purple-900">{filteredDecklists.length}</p>
                </div>
                <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                  <p className="text-xs text-green-600 font-semibold mb-1">Avg Win Rate</p>
                  <p className="text-3xl font-bold text-green-900">
                    {(
                      filteredDecklists.reduce((sum, deck) => sum + deck.winRate, 0) / filteredDecklists.length
                    ).toFixed(1)}
                    %
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg border-2 border-blue-300">
                  <p className="text-xs text-blue-600 font-semibold mb-1">Total Games</p>
                  <p className="text-3xl font-bold text-blue-900">
                    {filteredDecklists.reduce((sum, deck) => sum + deck.gamesPlayed, 0)}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg border-2 border-yellow-300">
                  <p className="text-xs text-yellow-600 font-semibold mb-1">Total Wins</p>
                  <p className="text-3xl font-bold text-yellow-900">
                    {filteredDecklists.reduce((sum, deck) => sum + deck.wins, 0)}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
