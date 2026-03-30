import { useEffect, useMemo, useState } from "react";
import { AlertCircle, BookMarked, Calendar, Crown, RefreshCw, Trophy } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { withApiBase } from "../data/apiBase";

type SavedDeckListItem = {
  _id: string;
  deck_name: string;
  deck_size: number;
  leader?: {
    name?: string;
    card_code?: string;
    color?: string;
  };
  createdAt?: string;
};

type SavedDeckDetail = SavedDeckListItem & {
  deck_cards?: Array<{
    card_code?: string;
    count?: number;
  }>;
  decklist?: Array<{
    card_code?: string;
    count?: number;
  }>;
  notes?: string;
  tags?: string[];
};

type ListResponse = {
  decks?: SavedDeckListItem[];
};

const getCardColor = (color: string): string => {
  switch (color.toLowerCase()) {
    case "red":
      return "from-red-400 to-red-600";
    case "yellow":
      return "from-yellow-400 to-yellow-600";
    case "blue":
      return "from-blue-400 to-blue-600";
    case "green":
      return "from-green-400 to-green-600";
    case "purple":
      return "from-purple-400 to-purple-600";
    case "black":
      return "from-gray-700 to-gray-900";
    default:
      return "from-gray-400 to-gray-600";
  }
};

const formatDate = (value?: string) => {
  if (!value) return "Unknown date";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

const buildCardImageUrl = (cardCode?: string) => {
  const code = String(cardCode || "").trim();
  return code ? withApiBase(`/cardsApi/image/${encodeURIComponent(code)}`) : "";
};

export function MyCollection() {
  const [savedDecks, setSavedDecks] = useState<SavedDeckListItem[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [selectedDeck, setSelectedDeck] = useState<SavedDeckDetail | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDecks = async (preferredDeckId?: string) => {
    setLoadingList(true);
    setError(null);

    try {
      const response = await fetch(withApiBase("/decks?limit=50"));
      const data = (await response.json()) as ListResponse & { message?: string };
      if (!response.ok) {
        throw new Error(data.message || "Failed to load saved decks.");
      }

      const decks = Array.isArray(data.decks) ? data.decks : [];
      setSavedDecks(decks);

      const nextDeckId =
        preferredDeckId ||
        localStorage.getItem("cardActionIntelligence_savedDeckId") ||
        selectedDeckId ||
        decks[0]?._id ||
        "";
      setSelectedDeckId(nextDeckId && decks.some((deck) => deck._id === nextDeckId) ? nextDeckId : decks[0]?._id || "");
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to load saved decks.");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    void loadDecks();
  }, []);

  useEffect(() => {
    const handleDeckSaved = (event: Event) => {
      const customEvent = event as CustomEvent<{ deckId?: string }>;
      void loadDecks(customEvent.detail?.deckId);
    };

    window.addEventListener("deckSaved", handleDeckSaved as EventListener);
    return () => {
      window.removeEventListener("deckSaved", handleDeckSaved as EventListener);
    };
  }, [selectedDeckId]);

  useEffect(() => {
    const loadDeckDetail = async () => {
      if (!selectedDeckId) {
        setSelectedDeck(null);
        return;
      }

      setLoadingDetail(true);
      setError(null);

      try {
        const response = await fetch(withApiBase(`/decks/${selectedDeckId}`));
        const data = (await response.json()) as SavedDeckDetail & { message?: string };
        if (!response.ok) {
          throw new Error(data.message || "Failed to load selected deck.");
        }

        setSelectedDeck(data);

        const selectedCardsForAiCoach = (data.deck_cards || data.decklist || []).map((card) => ({
          id: card.card_code || "",
          number: card.card_code || "",
          code: card.card_code || "",
          count: Number(card.count || 1),
        }));

        const selectedLeaderForAiCoach = {
          id: data.leader?.card_code || "",
          number: data.leader?.card_code || "",
          name: data.leader?.name || "",
          color: data.leader?.color || "",
          type: "Leader",
        };

        localStorage.setItem("cardActionIntelligence_selectedCards", JSON.stringify(selectedCardsForAiCoach));
        localStorage.setItem("cardActionIntelligence_selectedLeader", JSON.stringify(selectedLeaderForAiCoach));
        localStorage.setItem("cardActionIntelligence_savedDeckId", selectedDeckId);
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Failed to load selected deck.");
      } finally {
        setLoadingDetail(false);
      }
    };

    void loadDeckDetail();
  }, [selectedDeckId]);

  const deckCards = useMemo(
    () => selectedDeck?.deck_cards || selectedDeck?.decklist || [],
    [selectedDeck]
  );

  const averageCopies = deckCards.length > 0
    ? (deckCards.reduce((sum, card) => sum + Number(card.count || 0), 0) / deckCards.length).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BookMarked className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-900">My Collection - Saved Decks</h2>
        </div>
        <p className="text-gray-900">This view now reads your decks from the backend saved deck database instead of local-only storage.</p>
      </div>

      {error ? (
        <Card className="p-4 border-2 border-red-300 bg-red-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <p className="font-bold text-red-900">Collection Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </Card>
      ) : null}

      <Card className="p-6 transition-all bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300">
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Crown className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-purple-900">SELECT A SAVED DECK</span>
              </div>
              <p className="text-sm text-purple-700">Choose from backend saved decks ({savedDecks.length} total)</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-purple-600 text-white text-lg px-4 py-2">
                {savedDecks.length} Deck{savedDecks.length !== 1 ? "s" : ""}
              </Badge>
              <Button onClick={() => void loadDecks(selectedDeckId)} className="gap-2 bg-purple-700 text-white hover:bg-purple-800">
                <RefreshCw className={`w-4 h-4 ${loadingList ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          {savedDecks.length > 0 ? (
            <Select value={selectedDeckId} onValueChange={setSelectedDeckId}>
              <SelectTrigger className="w-full border-purple-400">
                <SelectValue placeholder={loadingList ? "Loading decks..." : "Select a deck..."} />
              </SelectTrigger>
              <SelectContent>
                {savedDecks.map((deck) => (
                  <SelectItem key={deck._id} value={deck._id}>
                    {deck.deck_name} - {deck.leader?.name || "Unknown Leader"} - {deck.deck_size || 0} cards
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="text-center py-4">
              <p className="text-purple-700 font-semibold">No saved decks yet.</p>
              <p className="text-sm text-purple-600 mt-2">Save a deck in Card Action Intelligence and it will appear here.</p>
            </div>
          )}
        </div>
      </Card>

      {loadingDetail ? (
        <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300">
          <RefreshCw className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-bold text-gray-600 mb-2">Loading deck</h3>
          <p className="text-gray-500">Fetching the selected deck from the backend database.</p>
        </Card>
      ) : null}

      {selectedDeck && !loadingDetail ? (
        <div className="space-y-6">
          <Card className="p-6 transition-all bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300">
            <div className="space-y-4">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-blue-900">{selectedDeck.deck_name}</h3>
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-bold text-blue-900">{selectedDeck.leader?.name || "Unknown Leader"}</span>
                    <Badge className="bg-blue-200 text-blue-900 text-xs">{selectedDeck.leader?.card_code || "No code"}</Badge>
                    <Badge className="bg-slate-100 text-slate-800 text-xs capitalize">{selectedDeck.leader?.color || "Unknown"}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <Calendar className="w-4 h-4" />
                    <span>Saved on {formatDate(selectedDeck.createdAt)}</span>
                  </div>
                </div>

                <div className="text-center bg-white px-4 py-2 rounded-lg border-2 border-purple-300">
                  <p className="text-xs text-purple-600 font-semibold">Deck Size</p>
                  <p className="text-3xl font-bold text-purple-900">{selectedDeck.deck_size || 0}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b-2 border-blue-400">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  <h4 className="text-lg font-bold text-blue-900">Deck Cards ({deckCards.length} unique cards)</h4>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                  {deckCards.map((card) => (
                    <div key={`${card.card_code}-${card.count}`} className="relative group cursor-pointer transition-all hover:scale-110 hover:z-10">
                      <div
                        className={`relative aspect-[2/3] bg-gradient-to-br ${getCardColor(selectedDeck.leader?.color || "")} rounded-lg border-2 border-white overflow-hidden shadow-lg`}
                      >
                        {card.card_code ? (
                          <img
                            src={buildCardImageUrl(card.card_code)}
                            alt={card.card_code}
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Crown className="w-10 h-10 text-white opacity-70" />
                          </div>
                        )}
                        <div className="absolute top-1 right-1 w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white shadow-md border-2 border-white text-sm">
                          {card.count || 1}
                        </div>
                        <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                          <p className="text-white font-bold text-xs leading-tight mb-1">{card.card_code || "Unknown"}</p>
                          <p className="text-yellow-400 text-xs mt-1 font-bold">x{card.count || 1}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedDeck.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {selectedDeck.tags.map((tag) => (
                    <Badge key={tag} className="bg-slate-900 text-white">{tag}</Badge>
                  ))}
                </div>
              ) : null}

              {selectedDeck.notes ? (
                <div className="bg-white p-4 rounded-lg border-2 border-cyan-200">
                  <p className="text-sm font-bold text-cyan-900 mb-2">Saved AI Notes</p>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{selectedDeck.notes}</p>
                </div>
              ) : null}
            </div>
          </Card>

          <Card className="p-6 transition-all bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
            <h4 className="text-lg font-bold text-green-900 mb-4">Deck Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-lg border-2 border-purple-300">
                <p className="text-xs text-purple-600 font-semibold mb-1">Unique Cards</p>
                <p className="text-3xl font-bold text-purple-900">{deckCards.length}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border-2 border-blue-300">
                <p className="text-xs text-blue-600 font-semibold mb-1">Total Cards</p>
                <p className="text-3xl font-bold text-blue-900">{selectedDeck.deck_size || 0}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                <p className="text-xs text-green-600 font-semibold mb-1">Leader Color</p>
                <p className="text-2xl font-bold text-green-900 capitalize">{selectedDeck.leader?.color || "Unknown"}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border-2 border-yellow-300">
                <p className="text-xs text-yellow-600 font-semibold mb-1">Avg Copies</p>
                <p className="text-3xl font-bold text-yellow-900">{averageCopies}</p>
              </div>
            </div>
          </Card>
        </div>
      ) : null}

      {!selectedDeck && !loadingDetail && !loadingList && savedDecks.length === 0 ? (
        <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300">
          <BookMarked className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-600 mb-2">No Decks Yet</h3>
          <p className="text-gray-500">
            Build and save a deck in Card Action Intelligence. It will be stored in the backend database and appear here.
          </p>
        </Card>
      ) : null}
    </div>
  );
}
