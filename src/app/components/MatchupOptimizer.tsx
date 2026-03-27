import { useEffect, useMemo, useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Loader2, Swords } from "lucide-react";

type SortMode = "overall" | "games" | "top";

interface MatchupEntry {
  opponent: string;
  opponent_code: string;
  opponent_name: string;
  opponent_image?: string;
  wins: number;
  losses: number;
  games: number;
  winRate: number;
  first_wr: number;
  second_wr: number;
  first_games: number;
  second_games: number;
}

interface LeaderRow {
  leader: string;
  leader_code: string;
  leader_name: string;
  leader_image?: string;
  wins: number;
  losses: number;
  number_of_matches: number;
  duration: number;
  winRate: number;
  avgDuration: number;
  popularity: number;
  matchups: MatchupEntry[];
}

interface MatchupsResponse {
  total_matches: number;
  matchups: LeaderRow[];
  count: number;
}

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim().replace(/\/+$/, "") ||
  (typeof window !== "undefined" &&
  /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname)
    ? "http://localhost:3000"
    : "https://onepice-cardgame.onrender.com");

const getWinRateCellClass = (winRate: number) => {
  if (winRate < 40) return "bg-[#651616] text-red-200";
  if (winRate < 45) return "bg-[#732020] text-red-100";
  if (winRate < 50) return "bg-[#5e2b2b] text-white";
  if (winRate < 55) return "bg-[#254b33] text-white";
  if (winRate < 60) return "bg-[#1f5a39] text-white";
  return "bg-[#177043] text-white";
};

const getLabelTone = (winRate: number) => {
  if (winRate >= 60) return "text-emerald-300";
  if (winRate >= 50) return "text-amber-200";
  return "text-red-300";
};

const formatLeaderName = (leader: LeaderRow) =>
  String(leader.leader_name || leader.leader_code || leader.leader || "").trim();

const sortRows = (rows: LeaderRow[], mode: SortMode) => {
  const copy = [...rows];
  if (mode === "games") {
    return copy.sort((a, b) => b.number_of_matches - a.number_of_matches || b.popularity - a.popularity);
  }
  if (mode === "top") {
    return copy.sort((a, b) => b.winRate - a.winRate || b.number_of_matches - a.number_of_matches);
  }
  return copy.sort((a, b) => b.popularity - a.popularity || b.number_of_matches - a.number_of_matches);
};

export function MatchupOptimizer() {
  const [dataset, setDataset] = useState<MatchupsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("overall");
  const [selectedLeaderCode, setSelectedLeaderCode] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/decks/matchups`);
        if (!response.ok) {
          throw new Error(`Matchups request failed with status ${response.status}`);
        }
        const data: MatchupsResponse = await response.json();
        if (cancelled) return;
        setDataset(data);
        const firstLeader = Array.isArray(data?.matchups) ? data.matchups[0] : null;
        setSelectedLeaderCode(firstLeader?.leader_code || "");
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError instanceof Error ? fetchError.message : "Failed to load matchup data");
          setDataset(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(() => sortRows(Array.isArray(dataset?.matchups) ? dataset.matchups : [], sortMode), [dataset, sortMode]);
  const leaders = rows.map((row) => ({
    code: row.leader_code,
    name: formatLeaderName(row),
    image: row.leader_image,
  }));

  const matrixRows = useMemo(() => {
    return rows.map((leader) => {
      const matchupMap = new Map(
        (Array.isArray(leader.matchups) ? leader.matchups : []).map((matchup) => [matchup.opponent_code, matchup])
      );
      return {
        leader,
        cells: leaders.map((opponent) => matchupMap.get(opponent.code) || null),
      };
    });
  }, [rows, leaders]);

  const selectedLeader =
    rows.find((row) => row.leader_code === selectedLeaderCode) ||
    rows[0] ||
    null;

  const strongestMatchups = useMemo(() => {
    if (!selectedLeader) return [];
    return [...selectedLeader.matchups]
      .filter((item) => item.games > 0 && item.opponent_code !== selectedLeader.leader_code)
      .sort((a, b) => b.winRate - a.winRate || b.games - a.games)
      .slice(0, 5);
  }, [selectedLeader]);

  const weakestMatchups = useMemo(() => {
    if (!selectedLeader) return [];
    return [...selectedLeader.matchups]
      .filter((item) => item.games > 0 && item.opponent_code !== selectedLeader.leader_code)
      .sort((a, b) => a.winRate - b.winRate || b.games - a.games)
      .slice(0, 5);
  }, [selectedLeader]);

  return (
    <div className="space-y-6">
      <Card className="border border-[#3b3b3b] bg-[#1c1c1f] p-6 text-white shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#7a2020] bg-[#2a1111] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
              <Swords className="h-4 w-4" />
              Matchup Optimizer
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white">Leader Matchup Heatmap</h2>
            <p className="mt-2 max-w-3xl text-sm text-zinc-300">
              Tournament matchup matrix with live leader names and images resolved from your cards collection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border border-red-700 bg-[#7a1717] text-white">Overall WR</Badge>
            <Badge className="border border-zinc-700 bg-[#242428] text-zinc-300">
              Total Games: {dataset?.total_matches ?? 0}
            </Badge>
            <Select value={sortMode} onValueChange={(value) => setSortMode(value as SortMode)}>
              <SelectTrigger className="w-40 border-zinc-700 bg-[#242428] text-white">
                <SelectValue placeholder="Sort rows" />
              </SelectTrigger>
              <SelectContent className="border-zinc-700 bg-[#242428] text-white">
                <SelectItem value="overall">Overall WR</SelectItem>
                <SelectItem value="games">Total Games</SelectItem>
                <SelectItem value="top">Top Winrate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-zinc-300">
          <span className="font-semibold text-white">Win Rate Colors:</span>
          <Badge className="bg-[#651616] text-red-100">Bad</Badge>
          <span>&lt;40%</span>
          <Badge className="bg-[#732020] text-red-100">40-45%</Badge>
          <Badge className="bg-[#5e2b2b] text-white">45-50%</Badge>
          <Badge className="bg-[#254b33] text-white">Good</Badge>
          <span>50-55%</span>
          <Badge className="bg-[#1f5a39] text-white">55-60%</Badge>
          <Badge className="bg-[#177043] text-white">&gt;60%</Badge>
        </div>
      </Card>

      {error ? (
        <Card className="border border-red-800 bg-[#2a1212] p-8 text-red-100">
          <p className="text-lg font-bold">Could not load matchup data</p>
          <p className="mt-2 text-sm text-red-200">{error}</p>
        </Card>
      ) : loading ? (
        <Card className="border border-zinc-700 bg-[#1c1c1f] p-10 text-white">
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-semibold">Loading matchup heatmap...</span>
          </div>
        </Card>
      ) : !rows.length ? (
        <Card className="border border-zinc-700 bg-[#1c1c1f] p-10 text-white">
          <p className="text-lg font-bold">No matchup data found</p>
          <p className="mt-2 text-sm text-zinc-400">Check whether `onepice_card_game_matchups` has the dataset document.</p>
        </Card>
      ) : (
        <>
          <Card className="overflow-hidden border border-zinc-700 bg-[#17171a] p-0 text-white">
            <div className="overflow-auto">
              <div className="min-w-[1400px]">
                <div className="grid sticky top-0 z-10 border-b border-[#6a1d1d] bg-[#212125]" style={{ gridTemplateColumns: `220px repeat(${leaders.length}, minmax(78px, 1fr))` }}>
                  <div className="border-r border-[#6a1d1d] p-4 text-xs font-bold uppercase tracking-[0.18em] text-zinc-200">
                    Your Leader / Opponent
                  </div>
                  {leaders.map((leader) => (
                    <button
                      key={leader.code}
                      type="button"
                      onClick={() => setSelectedLeaderCode(leader.code)}
                      className={`border-r border-[#412121] p-3 text-center transition hover:bg-[#2b2b31] ${
                        selectedLeaderCode === leader.code ? "bg-[#2b2b31]" : ""
                      }`}
                    >
                      <div className="mx-auto mb-2 h-12 w-12 overflow-hidden rounded-md border border-zinc-700 bg-[#111]">
                        {leader.image ? (
                          <img src={leader.image} alt={leader.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[10px] text-zinc-500">N/A</div>
                        )}
                      </div>
                      <p className="truncate text-[10px] font-bold text-white">{leader.name}</p>
                      <p className="truncate text-[10px] text-zinc-400">{leader.code}</p>
                    </button>
                  ))}
                </div>

                {matrixRows.map(({ leader, cells }) => (
                  <div
                    key={leader.leader_code}
                    className="grid border-b border-[#2c2c30]"
                    style={{ gridTemplateColumns: `220px repeat(${leaders.length}, minmax(78px, 1fr))` }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedLeaderCode(leader.leader_code)}
                      className={`flex items-start gap-3 border-r border-[#412121] p-3 text-left transition hover:bg-[#232327] ${
                        selectedLeaderCode === leader.leader_code ? "bg-[#232327]" : "bg-[#1b1b1f]"
                      }`}
                    >
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-zinc-700 bg-[#111]">
                        {leader.leader_image ? (
                          <img src={leader.leader_image} alt={leader.leader_name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[10px] text-zinc-500">N/A</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-white">{leader.leader_name}</p>
                        <p className="text-[11px] text-zinc-400">{leader.leader_code}</p>
                        <p className={`mt-1 text-[11px] font-semibold ${getLabelTone(leader.winRate)}`}>
                          {leader.winRate}% WR
                        </p>
                        <p className="text-[10px] text-zinc-500">{leader.number_of_matches.toLocaleString()} games</p>
                      </div>
                    </button>

                    {cells.map((cell, index) => (
                      <div
                        key={`${leader.leader_code}-${leaders[index].code}`}
                        className={`flex min-h-[72px] items-center justify-center border-r border-[#2b2323] text-sm font-bold ${
                          cell ? getWinRateCellClass(cell.winRate) : "bg-[#1f1f23] text-zinc-500"
                        }`}
                      >
                        {cell ? `${cell.winRate.toFixed(1)}%` : "-"}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {selectedLeader ? (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <Card className="border border-zinc-700 bg-[#1c1c1f] p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-xl border border-zinc-700 bg-[#111]">
                    {selectedLeader.leader_image ? (
                      <img src={selectedLeader.leader_image} alt={selectedLeader.leader_name} className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Selected Leader</p>
                    <h3 className="text-2xl font-black text-white">{selectedLeader.leader_name}</h3>
                    <p className="text-sm text-zinc-400">{selectedLeader.leader_code}</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                  <div className="rounded-xl border border-zinc-700 bg-[#232327] p-4">
                    <p className="text-xs text-zinc-400">Overall WR</p>
                    <p className={`mt-1 text-2xl font-black ${getLabelTone(selectedLeader.winRate)}`}>{selectedLeader.winRate}%</p>
                  </div>
                  <div className="rounded-xl border border-zinc-700 bg-[#232327] p-4">
                    <p className="text-xs text-zinc-400">Total Games</p>
                    <p className="mt-1 text-2xl font-black text-white">{selectedLeader.number_of_matches}</p>
                  </div>
                  <div className="rounded-xl border border-zinc-700 bg-[#232327] p-4">
                    <p className="text-xs text-zinc-400">Popularity</p>
                    <p className="mt-1 text-2xl font-black text-white">{selectedLeader.popularity}%</p>
                  </div>
                  <div className="rounded-xl border border-zinc-700 bg-[#232327] p-4">
                    <p className="text-xs text-zinc-400">Avg Duration</p>
                    <p className="mt-1 text-2xl font-black text-white">{selectedLeader.avgDuration}</p>
                  </div>
                </div>
              </Card>

              <div className="grid gap-6">
                <Card className="border border-emerald-900 bg-[#102219] p-5 text-white">
                  <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">Best Matchups</p>
                  <div className="space-y-3">
                    {strongestMatchups.map((matchup) => (
                      <div key={`${selectedLeader.leader_code}-${matchup.opponent_code}`} className="flex items-center justify-between rounded-lg bg-[#173022] px-3 py-2">
                        <span className="truncate pr-3 font-semibold">{matchup.opponent_name}</span>
                        <span className="font-black text-emerald-300">{matchup.winRate.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="border border-red-900 bg-[#281515] p-5 text-white">
                  <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-red-300">Worst Matchups</p>
                  <div className="space-y-3">
                    {weakestMatchups.map((matchup) => (
                      <div key={`${selectedLeader.leader_code}-${matchup.opponent_code}`} className="flex items-center justify-between rounded-lg bg-[#341a1a] px-3 py-2">
                        <span className="truncate pr-3 font-semibold">{matchup.opponent_name}</span>
                        <span className="font-black text-red-300">{matchup.winRate.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
