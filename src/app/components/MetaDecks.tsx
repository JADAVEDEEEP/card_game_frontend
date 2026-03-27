import { useEffect, useMemo, useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Layers, Filter, Crown, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ApiCardRecord {
  id: string;
  name?: string;
  img_url?: string;
  img_full_url?: string;
  colors?: string[];
  category?: string;
  rarity?: string;
  cost?: number | null;
  types?: string[];
}

interface LeaderMeta {
  id: string;
  name: string;
  number: string;
  color: string;
  image?: string;
  winRate: number;
  metaShare: number;
  matches: number;
  avgDuration: number;
  totalCards: number;
  setName: string;
}

interface CardData {
  id: string;
  code: string;
  name: string;
  number: string;
  image?: string;
  thumbnail?: string;
  type: string;
  cost: number;
  presence: number;
  avgCopies: number;
  avgWinRate: number;
  category: "Core" | "Situational" | "Sleeper" | "Cope" | "Tech";
  rarity: "C" | "UC" | "R" | "SR" | "SEC" | "L";
}

interface MetaLeaderDetailResponse {
  leader: LeaderMeta;
  stats: {
    wins: number;
    losses: number;
    number_of_matches: number;
    duration: number;
    winRate: number;
    avgDuration: number;
    popularity: number;
    totalCards: number;
    setName: string;
    debug: Record<string, unknown>;
  };
  cards: CardData[];
  grouped_cards: Record<string, CardData[]>;
}

interface MetaLeaderListResponse {
  leaders: LeaderMeta[];
}

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim().replace(/\/+$/, "") ||
  (typeof window !== "undefined" &&
  /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname)
    ? "http://localhost:3000"
    : "https://onepice-cardgame.onrender.com");

const DATASET_OPTIONS = [
  { value: "last-week-western", label: "Last Week Western" },
  { value: "last-month-western", label: "Last Month Western" },
  { value: "last-week-japan", label: "Last Week Japan" },
  { value: "all-time", label: "All Time Global" },
  { value: "tournaments", label: "Major Tournaments Only" },
];

const CATEGORY_ORDER: CardData["category"][] = ["Core", "Situational", "Sleeper", "Cope", "Tech"];

const looksLikeCardCode = (value?: string) => /^[A-Z]{2,}\d{2}-\d+/i.test(String(value || "").trim());

const sanitizeName = (preferred?: string, fallbackCode?: string) => {
  const raw = String(preferred || "").trim();
  if (!raw) return String(fallbackCode || "").trim();
  if (looksLikeCardCode(raw)) return String(fallbackCode || raw).trim();
  return raw;
};

const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case "SEC":
      return "bg-gradient-to-r from-yellow-400 to-orange-500";
    case "L":
      return "bg-gradient-to-r from-purple-500 to-pink-600";
    case "SR":
      return "bg-gradient-to-r from-red-500 to-red-600";
    case "R":
      return "bg-gradient-to-r from-blue-500 to-blue-600";
    case "UC":
      return "bg-gradient-to-r from-green-500 to-green-600";
    case "C":
      return "bg-gradient-to-r from-gray-500 to-gray-600";
    default:
      return "bg-gray-500";
  }
};

const getCategoryTheme = (category: CardData["category"]) => {
  switch (category) {
    case "Core":
      return { border: "border-red-400", dot: "bg-red-500", title: "text-red-700", badge: "bg-red-500 text-white" };
    case "Situational":
      return { border: "border-blue-400", dot: "bg-blue-500", title: "text-blue-700", badge: "bg-blue-500 text-white" };
    case "Sleeper":
      return { border: "border-purple-400", dot: "bg-purple-500", title: "text-purple-700", badge: "bg-purple-500 text-white" };
    case "Cope":
      return { border: "border-yellow-400", dot: "bg-yellow-500", title: "text-yellow-700", badge: "bg-yellow-500 text-white" };
    case "Tech":
      return { border: "border-green-400", dot: "bg-green-500", title: "text-green-700", badge: "bg-green-500 text-white" };
    default:
      return { border: "border-gray-400", dot: "bg-gray-500", title: "text-gray-700", badge: "bg-gray-500 text-white" };
  }
};

const formatDatasetDescription = (dataset: string) =>
  DATASET_OPTIONS.find((item) => item.value === dataset)?.label || "Live Meta Data";

const buildProxyImageUrl = (cardCode?: string) => {
  const code = String(cardCode || "").trim();
  return code ? `${API_BASE_URL}/cardsApi/image/${encodeURIComponent(code)}` : "";
};

const normalizeCardsMap = (rawCards: unknown) => {
  const records = Array.isArray(rawCards)
    ? rawCards
    : Array.isArray((rawCards as { cards?: unknown[] })?.cards)
    ? ((rawCards as { cards: unknown[] }).cards ?? [])
    : [];

  return new Map(
    records
      .map((card) => card as ApiCardRecord)
      .filter((card) => String(card?.id || "").trim())
      .map((card) => [String(card.id || "").trim(), card])
  );
};

const normalizeLeader = (leader: LeaderMeta, cardsById: Map<string, ApiCardRecord>): LeaderMeta => {
  const code = String(leader.number || leader.id || "").trim();
  const card = cardsById.get(code);
  return {
    ...leader,
    id: code,
    number: code,
    name: sanitizeName(card?.name || leader.name, code),
    color:
      Array.isArray(card?.colors) && card.colors.length > 0
        ? card.colors.filter(Boolean).join("/")
        : leader.color,
    image: buildProxyImageUrl(code),
  };
};

const normalizeDetail = (
  detail: MetaLeaderDetailResponse,
  cardsById: Map<string, ApiCardRecord>
): MetaLeaderDetailResponse => {
  const leader = normalizeLeader(detail.leader, cardsById);
  const cards = (Array.isArray(detail.cards) ? detail.cards : []).map((card) => {
    const code = String(card.number || card.code || "").trim();
    const source = cardsById.get(code);
    return {
      ...card,
      code,
      number: code,
      name: sanitizeName(source?.name || card.name, code),
      image: buildProxyImageUrl(code),
      thumbnail: String(source?.img_url || card.thumbnail || "").trim(),
      type: String(source?.category || card.type || "Character"),
      cost:
        typeof source?.cost === "number"
          ? source.cost
          : typeof card.cost === "number" && Number.isFinite(card.cost)
          ? card.cost
          : 0,
      rarity: String(source?.rarity || card.rarity || "C").trim() as CardData["rarity"],
    };
  });

  return {
    ...detail,
    leader,
    cards,
    grouped_cards: {
      Core: cards.filter((card) => card.category === "Core"),
      Situational: cards.filter((card) => card.category === "Situational"),
      Sleeper: cards.filter((card) => card.category === "Sleeper"),
      Cope: cards.filter((card) => card.category === "Cope"),
      Tech: cards.filter((card) => card.category === "Tech"),
    },
  };
};

export function MetaDecks() {
  const [dataset, setDataset] = useState("last-week-western");
  const [leaders, setLeaders] = useState<LeaderMeta[]>([]);
  const [cardsById, setCardsById] = useState<Map<string, ApiCardRecord>>(new Map());
  const [selectedLeader, setSelectedLeader] = useState<string>("");
  const [leaderDetail, setLeaderDetail] = useState<MetaLeaderDetailResponse | null>(null);
  const [loadingLeaders, setLoadingLeaders] = useState(true);
  const [loadingCards, setLoadingCards] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadCards = async () => {
      try {
        const cardsResponse = await fetch(`${API_BASE_URL}/cardsApi/cards`);
        if (!cardsResponse.ok) return;
        const rawCards = await cardsResponse.json();
        if (!cancelled) {
          setCardsById(normalizeCardsMap(rawCards));
        }
      } catch {
        // Cards enrichment optional hai; meta data ko block mat karo.
      }
    };

    const loadLeaders = async () => {
      try {
        setLoadingLeaders(true);
        setError(null);

        const leaderResponse = await fetch(`${API_BASE_URL}/meta/leaders`);
        if (!leaderResponse.ok) {
          throw new Error(`Leader request failed with status ${leaderResponse.status}`);
        }

        const leaderData: MetaLeaderListResponse = await leaderResponse.json();
        if (cancelled) return;

        const nextLeaders = Array.isArray(leaderData.leaders)
          ? leaderData.leaders.map((leader) => normalizeLeader(leader, cardsById))
          : [];

        setLeaders(nextLeaders);
        setSelectedLeader((current) =>
          current && nextLeaders.some((leader) => leader.id === current) ? current : nextLeaders[0]?.id || ""
        );
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError instanceof Error ? fetchError.message : "Failed to load meta leaders");
          setLeaders([]);
          setLeaderDetail(null);
        }
      } finally {
        if (!cancelled) {
          setLoadingLeaders(false);
        }
      }
    };

    void loadCards();
    void loadLeaders();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (cardsById.size === 0 || leaders.length === 0) return;
    setLeaders((current) => current.map((leader) => normalizeLeader(leader, cardsById)));
    setLeaderDetail((current) => (current ? normalizeDetail(current, cardsById) : current));
  }, [cardsById]);

  useEffect(() => {
    if (!selectedLeader) {
      setLeaderDetail(null);
      return;
    }

    let cancelled = false;

    const loadLeaderDetail = async () => {
      try {
        setLoadingCards(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/meta/leaders/${encodeURIComponent(selectedLeader)}`);
        if (!response.ok) {
          throw new Error(`Meta detail request failed with status ${response.status}`);
        }

        const data: MetaLeaderDetailResponse = await response.json();
        if (!cancelled) {
          setLeaderDetail(cardsById.size > 0 ? normalizeDetail(data, cardsById) : data);
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError instanceof Error ? fetchError.message : "Failed to load leader cards");
          setLeaderDetail(null);
        }
      } finally {
        if (!cancelled) {
          setLoadingCards(false);
        }
      }
    };

    void loadLeaderDetail();

    return () => {
      cancelled = true;
    };
  }, [selectedLeader, cardsById]);

  const selectedLeaderData = leaders.find((leader) => leader.id === selectedLeader) || leaderDetail?.leader || null;
  const categoryBuckets = useMemo(() => {
    const grouped = leaderDetail?.grouped_cards || {};
    return CATEGORY_ORDER.map((category) => ({
      category,
      cards: Array.isArray(grouped[category]) ? grouped[category] : [],
    })).filter((bucket) => bucket.cards.length > 0);
  }, [leaderDetail]);
  const showLoading = loadingLeaders || loadingCards;

  const renderCardGrid = (cards: CardData[]) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="relative group cursor-pointer transition-all hover:scale-105 hover:z-10"
        >
          <div className="relative aspect-[2/3] bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg border-2 border-slate-600 overflow-hidden shadow-lg">
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
                <Crown className="w-16 h-16 text-slate-500 opacity-50" />
              </div>
            )}

            <div className="absolute top-2 left-2 min-w-8 h-8 px-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white shadow-md border-2 border-white">
              {card.cost}
            </div>

            <div className={`absolute top-2 right-2 px-2 py-1 ${getRarityColor(card.rarity)} rounded text-xs font-bold text-white shadow-md`}>
              {card.rarity}
            </div>

            <div className="absolute bottom-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold shadow-md flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              {card.presence}%
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 pt-8">
              <p className="text-white font-bold text-sm leading-tight mb-1">{card.name}</p>
              <p className="text-gray-300 text-xs">{card.number}</p>
            </div>
          </div>

          <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-xs text-gray-400">Avg Copies: {card.avgCopies}</p>
            <p className="text-xs text-gray-500">Avg WR: {card.avgWinRate}%</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Layers className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-900">Meta Decks - Leader Card Analysis</h2>
        </div>
        <p className="text-gray-900">Explore the most played cards by category using live meta leader data.</p>
      </div>

      <Card className="p-6 transition-all bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300">
        <div className="space-y-4">
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
                {DATASET_OPTIONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-purple-900">SELECT A LEADER</span>
            </div>
            <p className="text-sm text-purple-700 mb-4">Click to view deck composition</p>

            <Select value={selectedLeader} onValueChange={setSelectedLeader} disabled={loadingLeaders || leaders.length === 0}>
              <SelectTrigger className="w-full max-w-md border-purple-300">
                <SelectValue placeholder={loadingLeaders ? "Loading leaders..." : "Choose a leader"} />
              </SelectTrigger>
              <SelectContent>
                {leaders.map((leader) => (
                  <SelectItem key={leader.id} value={leader.id}>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{leader.name}</span>
                      <span className="text-xs text-gray-400">{leader.number}</span>
                      <Badge className="bg-green-600 text-white text-xs">{leader.winRate}% WR</Badge>
                      <span className="text-xs text-blue-400">{leader.metaShare}%</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {error ? (
        <Card className="p-8 bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300">
          <h3 className="text-xl font-bold text-red-900 mb-2">Could not load meta decks</h3>
          <p className="text-red-700">{error}</p>
        </Card>
      ) : showLoading ? (
        <Card className="p-12 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300">
          <div className="flex items-center justify-center gap-3 text-blue-900">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-semibold">Loading meta deck data...</span>
          </div>
        </Card>
      ) : !leaderDetail ? (
        <Card className="p-12 bg-gradient-to-br from-gray-50 to-slate-100 border-2 border-gray-300">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-700 mb-2">No meta data found</h3>
            <p className="text-gray-500">Meta leader detail could not be loaded for this selection.</p>
          </div>
        </Card>
      ) : (
        <>
          <Card className="p-6 transition-all bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-6 h-6 text-blue-600" />
                    <h3 className="text-2xl font-bold text-blue-900">CARDS PRESENCE</h3>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Showing cards for <span className="text-blue-900 font-bold">{selectedLeaderData?.name}</span>
                    <Badge className="ml-2 bg-blue-600 text-white">{selectedLeaderData?.number}</Badge>
                    <Badge className="ml-2 bg-cyan-600 text-white">{formatDatasetDescription(dataset)}</Badge>
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="text-right bg-white px-4 py-2 rounded-lg border-2 border-green-300">
                    <p className="text-xs text-green-600 font-semibold">Win Rate</p>
                    <p className="text-2xl font-bold text-green-900">{leaderDetail.stats.winRate}%</p>
                  </div>
                  <div className="text-right bg-white px-4 py-2 rounded-lg border-2 border-purple-300">
                    <p className="text-xs text-purple-600 font-semibold">Meta Share</p>
                    <p className="text-2xl font-bold text-purple-900">{leaderDetail.stats.popularity}%</p>
                  </div>
                </div>
              </div>

              {categoryBuckets.map(({ category, cards }) => {
                const theme = getCategoryTheme(category);
                return (
                  <div key={category} className="space-y-4">
                    <div className={`flex items-center gap-2 pb-2 border-b-2 ${theme.border}`}>
                      <div className={`w-3 h-3 rounded-full ${theme.dot}`}></div>
                      <h4 className={`text-xl font-bold ${theme.title}`}>{category.toUpperCase()}</h4>
                      <Badge className={`ml-2 ${theme.badge}`}>{cards.length} cards</Badge>
                    </div>
                    {renderCardGrid(cards)}
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 transition-all bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
            <h4 className="text-lg font-bold text-yellow-900 mb-4">Deck Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {CATEGORY_ORDER.map((category) => {
                const cards = leaderDetail.grouped_cards[category] || [];
                const theme = getCategoryTheme(category);
                return (
                  <div key={category} className={`p-4 bg-white rounded-lg border-2 ${theme.border}`}>
                    <p className={`text-xs font-semibold mb-1 ${theme.title}`}>{category}</p>
                    <p className="text-3xl font-bold text-gray-900">{cards.length}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
