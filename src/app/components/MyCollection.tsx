import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";
import { Trophy, Crown, User, Trash2, BookMarked, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface DeckCard {
  id: string;
  name: string;
  number: string;
  count: number;
  color: string;
}

interface SavedDeck {
  id: string;
  deckName: string;
  leaderName: string;
  leaderNumber: string;
  leaderColor: string;
  savedDate: string;
  cards: DeckCard[];
  totalCards: number;
}

const getCardColor = (color: string): string => {
  switch (color) {
    case "red": return "from-red-400 to-red-600";
    case "yellow": return "from-yellow-400 to-yellow-600";
    case "blue": return "from-blue-400 to-blue-600";
    case "green": return "from-green-400 to-green-600";
    case "purple": return "from-purple-400 to-purple-600";
    case "black": return "from-gray-700 to-gray-900";
    default: return "from-gray-400 to-gray-600";
  }
};

export function MyCollection() {
  const [savedDecks, setSavedDecks] = useState<SavedDeck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState<string>("");

  // Load saved decks from localStorage
  useEffect(() => {
    const loadedDecks = localStorage.getItem("myDeckCollection");
    if (loadedDecks) {
      const decks = JSON.parse(loadedDecks);
      setSavedDecks(decks);
      if (decks.length > 0 && !selectedDeckId) {
        setSelectedDeckId(decks[0].id);
      }
    }
  }, []);

  // Listen for new decks being saved
  useEffect(() => {
    const handleStorageChange = () => {
      const loadedDecks = localStorage.getItem("myDeckCollection");
      if (loadedDecks) {
        const decks = JSON.parse(loadedDecks);
        setSavedDecks(decks);
        if (decks.length > 0 && !selectedDeckId) {
          setSelectedDeckId(decks[0].id);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    // Custom event for same-window updates
    window.addEventListener("deckSaved", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("deckSaved", handleStorageChange);
    };
  }, [selectedDeckId]);

  const selectedDeck = savedDecks.find((deck) => deck.id === selectedDeckId);

  const handleDeleteDeck = (deckId: string) => {
    const updatedDecks = savedDecks.filter((deck) => deck.id !== deckId);
    setSavedDecks(updatedDecks);
    localStorage.setItem("myDeckCollection", JSON.stringify(updatedDecks));
    
    if (selectedDeckId === deckId && updatedDecks.length > 0) {
      setSelectedDeckId(updatedDecks[0].id);
    } else if (updatedDecks.length === 0) {
      setSelectedDeckId("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BookMarked className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            📚 My Collection - Saved Decks
          </h2>
        </div>
        <p className="text-gray-900">
          Your personally saved and curated deck collection
        </p>
      </div>

      {/* Deck Selection */}
      <Card className="p-6 transition-all bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300">
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Crown className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-purple-900">SELECT A DECK</span>
              </div>
              <p className="text-sm text-purple-700">
                Choose from your saved decks ({savedDecks.length} total)
              </p>
            </div>
            <Badge className="bg-purple-600 text-white text-lg px-4 py-2">
              {savedDecks.length} Deck{savedDecks.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          {savedDecks.length > 0 ? (
            <Select value={selectedDeckId} onValueChange={setSelectedDeckId}>
              <SelectTrigger className="w-full border-purple-400">
                <SelectValue placeholder="Select a deck..." />
              </SelectTrigger>
              <SelectContent>
                {savedDecks.map((deck) => (
                  <SelectItem key={deck.id} value={deck.id}>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{deck.deckName}</span>
                      <span className="text-xs text-gray-400">{deck.leaderName}</span>
                      <Badge className="bg-purple-600 text-white text-xs">
                        {deck.totalCards} cards
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="text-center py-4">
              <p className="text-purple-700 font-semibold">No saved decks yet!</p>
              <p className="text-sm text-purple-600 mt-2">
                Go to Card Action Intelligence to create and save your first deck.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Selected Deck Display */}
      {selectedDeck ? (
        <div className="space-y-6">
          {/* Deck Info Card */}
          <Card className="p-6 transition-all bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300">
            <div className="space-y-4">
              {/* Deck Header */}
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="space-y-2">
                  {/* Deck Name */}
                  <h3 className="text-2xl font-bold text-blue-900">
                    {selectedDeck.deckName}
                  </h3>

                  {/* Leader Info */}
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-bold text-blue-900">
                      {selectedDeck.leaderName}
                    </span>
                    <Badge className="bg-blue-200 text-blue-900 text-xs">
                      {selectedDeck.leaderNumber}
                    </Badge>
                  </div>

                  {/* Save Date */}
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <Calendar className="w-4 h-4" />
                    <span>Saved on {selectedDeck.savedDate}</span>
                  </div>
                </div>

                {/* Stats & Actions */}
                <div className="flex items-center gap-4">
                  <div className="text-center bg-white px-4 py-2 rounded-lg border-2 border-purple-300">
                    <p className="text-xs text-purple-600 font-semibold">Total Cards</p>
                    <p className="text-3xl font-bold text-purple-900">
                      {selectedDeck.totalCards}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleDeleteDeck(selectedDeck.id)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Deck
                  </Button>
                </div>
              </div>

              {/* Cards Display */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b-2 border-blue-400">
                  <h4 className="text-lg font-bold text-blue-900">
                    📋 DECK CARDS ({selectedDeck.cards.length} unique cards)
                  </h4>
                </div>

                {/* Card Grid */}
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
                  {selectedDeck.cards.map((card) => (
                    <div
                      key={card.id}
                      className="relative group cursor-pointer transition-all hover:scale-110 hover:z-10"
                    >
                      {/* Card Placeholder */}
                      <div
                        className={`relative aspect-[2/3] bg-gradient-to-br ${getCardColor(
                          card.color
                        )} rounded-lg border-2 border-white overflow-hidden shadow-lg`}
                      >
                        {/* Card Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Crown className="w-10 h-10 text-white opacity-70" />
                        </div>

                        {/* Count Badge */}
                        <div className="absolute top-1 right-1 w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white shadow-md border-2 border-white text-sm">
                          {card.count}
                        </div>

                        {/* Card Info Tooltip */}
                        <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                          <p className="text-white font-bold text-xs leading-tight mb-1">
                            {card.name}
                          </p>
                          <p className="text-gray-300 text-[10px]">{card.number}</p>
                          <p className="text-yellow-400 text-xs mt-1 font-bold">
                            x{card.count}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Deck Statistics */}
          <Card className="p-6 transition-all bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
            <h4 className="text-lg font-bold text-green-900 mb-4">📊 Deck Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-lg border-2 border-purple-300">
                <p className="text-xs text-purple-600 font-semibold mb-1">Unique Cards</p>
                <p className="text-3xl font-bold text-purple-900">
                  {selectedDeck.cards.length}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border-2 border-blue-300">
                <p className="text-xs text-blue-600 font-semibold mb-1">Total Cards</p>
                <p className="text-3xl font-bold text-blue-900">
                  {selectedDeck.totalCards}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                <p className="text-xs text-green-600 font-semibold mb-1">Leader Color</p>
                <p className="text-2xl font-bold text-green-900 capitalize">
                  {selectedDeck.leaderColor}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border-2 border-yellow-300">
                <p className="text-xs text-yellow-600 font-semibold mb-1">Avg Copies</p>
                <p className="text-3xl font-bold text-yellow-900">
                  {(selectedDeck.totalCards / selectedDeck.cards.length).toFixed(1)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      ) : savedDecks.length > 0 ? (
        <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300">
          <BookMarked className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-600 mb-2">Select a Deck</h3>
          <p className="text-gray-500">
            Choose a deck from the dropdown above to view its details.
          </p>
        </Card>
      ) : (
        <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300">
          <BookMarked className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-600 mb-2">No Decks Yet</h3>
          <p className="text-gray-500 mb-4">
            Start building your collection by saving decks from Card Action Intelligence!
          </p>
          <Badge className="bg-purple-600 text-white text-sm px-4 py-2">
            💡 Tip: Build a deck in Card Action Intelligence and click "Save as Deck"
          </Badge>
        </Card>
      )}
    </div>
  );
}
