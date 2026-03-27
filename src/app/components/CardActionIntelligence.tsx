import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";
import { Search, Layers, Zap, Shield, Sword, Target, Clock, Users, AlertTriangle, TrendingUp, Star, Info, CheckCircle, Crown, BarChart3, Save, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface CardData {
  id: string;
  name: string;
  number: string;
  type: "Character" | "Event" | "Stage" | "Leader";
  color: string;
  cost: number;
  power?: number;
  counter?: number;
  attribute?: string;
  effect: string;
  trigger?: string;
  simpleMeaning: string;
  whenPlayed: string;
  bestTime: string;
  comboWith: string[];
  riskWarning: string;
  role: string;
  playAdvice: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  threatLevel: number;
  keywords: string[];
}

interface CardSlot {
  card: CardData | null;
  count: number;
}

const sampleCards: CardData[] = [
  {
    id: "1",
    name: "Roronoa Zoro",
    number: "OP01-001",
    type: "Character",
    color: "Green",
    cost: 4,
    power: 5000,
    counter: 1000,
    attribute: "Slash",
    effect: "[On Play] KO up to 1 of your opponent's Characters with a cost of 3 or less.",
    trigger: "",
    simpleMeaning: "When you play this card, you can remove a small enemy unit immediately",
    whenPlayed: "Choose and destroy one opponent character that costs 3 or less",
    bestTime: "Mid game when opponent builds board pressure with small characters",
    comboWith: ["Card draw effects", "DON!! acceleration", "Green leader abilities"],
    riskWarning: "Low value if used on empty board or against high-cost characters only",
    role: "Removal / Board Control",
    playAdvice: "Mid Game",
    difficulty: "Easy",
    threatLevel: 7,
    keywords: ["On Play", "KO", "Removal"]
  },
  {
    id: "2",
    name: "Monkey D. Luffy",
    number: "OP01-024",
    type: "Character",
    color: "Red",
    cost: 5,
    power: 6000,
    counter: 1000,
    attribute: "Strike",
    effect: "[Double Attack] (This card deals 2 damage.) [On Play] DON!! -1 (You may return the specified number of DON!! cards from your field to your DON!! deck.): This Character gains [Rush] during this turn.",
    trigger: "",
    simpleMeaning: "Strong attacker that can attack twice and can attack immediately if you sacrifice 1 DON!!",
    whenPlayed: "Deals 2 damage when attacking. Can pay 1 DON to attack on the same turn you play it",
    bestTime: "Late game for lethal push or when you need immediate pressure",
    comboWith: ["DON!! recovery cards", "Power boost effects", "Red aggressive strategies"],
    riskWarning: "High cost card - don't play too early. Rush option costs valuable DON!!",
    role: "Attacker / Finisher",
    playAdvice: "Late Game",
    difficulty: "Medium",
    threatLevel: 9,
    keywords: ["Double Attack", "On Play", "Rush", "DON!!"]
  },
  {
    id: "3",
    name: "Nami",
    number: "OP01-016",
    type: "Character",
    color: "Blue",
    cost: 1,
    power: 2000,
    counter: 1000,
    attribute: "Special",
    effect: "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)",
    trigger: "",
    simpleMeaning: "Can block attacks targeting your leader or other characters",
    whenPlayed: "Sits on board ready to intercept attacks",
    bestTime: "Early game to establish board presence and defense",
    comboWith: ["Counter cards", "Defensive strategies", "Life protection"],
    riskWarning: "Low power - will lose most combat. Only blocks once per turn cycle",
    role: "Defender / Blocker",
    playAdvice: "Early Game",
    difficulty: "Easy",
    threatLevel: 4,
    keywords: ["Blocker"]
  },
  {
    id: "leader1",
    name: "Monkey D. Luffy",
    number: "OP01-003",
    type: "Leader",
    color: "Red",
    cost: 0,
    power: 5000,
    effect: "[Activate: Main] [Once Per Turn] DON!! -1: Your Leader or 1 of your Characters gains +1000 power during this turn.",
    simpleMeaning: "Once per turn, pay 1 DON to give your Leader or a character +1000 power",
    whenPlayed: "Leader starts in play at beginning of game",
    bestTime: "Use ability during your turn before attacks or when you need to win combat",
    comboWith: ["Red aggressive characters", "Double Attack cards", "Rush effects"],
    riskWarning: "Using ability costs DON - manage resources carefully",
    role: "Aggressive Leader / Power Boost",
    playAdvice: "Active",
    difficulty: "Easy",
    threatLevel: 8,
    keywords: ["Activate: Main", "Power Boost"]
  },
  {
    id: "leader2",
    name: "Nami",
    number: "OP01-016L",
    type: "Leader",
    color: "Blue",
    cost: 0,
    power: 5000,
    effect: "[Activate: Main] [Once Per Turn] You may return 1 card from your hand to your deck and shuffle your deck: Draw 2 cards.",
    simpleMeaning: "Once per turn, put a card back into your deck to draw 2 cards",
    whenPlayed: "Leader starts in play at beginning of game",
    bestTime: "Use when you have dead cards in hand or need specific answers",
    comboWith: ["Card advantage strategies", "Control decks", "Counter effects"],
    riskWarning: "Card disadvantage if used carelessly - shuffle timing matters",
    role: "Control Leader / Card Advantage",
    playAdvice: "Active",
    difficulty: "Medium",
    threatLevel: 7,
    keywords: ["Activate: Main", "Card Draw"]
  },
  {
    id: "leader3",
    name: "Kaido",
    number: "OP01-061",
    type: "Leader",
    color: "Black",
    cost: 0,
    power: 5000,
    effect: "[DON!! x2] [When Attacking] Draw 1 card if you have 7 or more DON!! cards on your field.",
    simpleMeaning: "When you attack with 7+ DON on field, draw a card",
    whenPlayed: "Leader starts in play at beginning of game",
    bestTime: "Late game when you have accumulated DON resources",
    comboWith: ["DON acceleration", "Big characters", "Ramp strategies"],
    riskWarning: "Weak early game - need to survive until you have enough DON",
    role: "Ramp Leader / Late Game",
    playAdvice: "Late Game",
    difficulty: "Advanced",
    threatLevel: 9,
    keywords: ["DON!!", "Card Draw", "When Attacking"]
  }
];

export function CardActionIntelligence() {
  const [selectedSlots, setSelectedSlots] = useState<CardSlot[]>(Array(15).fill({ card: null, count: 1 }));
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeader, setSelectedLeader] = useState<CardData | null>(null);

  const handleCardSelect = (slotIndex: number, cardId: string) => {
    const card = sampleCards.find(c => c.id === cardId);
    if (card) {
      const newSlots = [...selectedSlots];
      newSlots[slotIndex] = { card, count: 1 };
      setSelectedSlots(newSlots);
      setSelectedSlotIndex(slotIndex);
      
      // Save to localStorage for AI Coach integration
      localStorage.setItem('cardActionIntelligence_selectedCards', JSON.stringify(newSlots));
    }
  };

  const handleLeaderSelect = (leaderId: string) => {
    const leader = sampleCards.find(c => c.id === leaderId && c.type === "Leader");
    setSelectedLeader(leader || null);
    
    // Save to localStorage for AI Coach integration
    localStorage.setItem('cardActionIntelligence_selectedLeader', JSON.stringify(leader || null));
  };

  const handleSlotClick = (index: number) => {
    if (selectedSlots[index].card) {
      setSelectedSlotIndex(index);
    }
  };

  const handleCardCountChange = (index: number, count: number) => {
    const newSlots = [...selectedSlots];
    newSlots[index] = { ...newSlots[index], count: Math.max(1, Math.min(4, count)) };
    setSelectedSlots(newSlots);
    
    // Save to localStorage
    localStorage.setItem('cardActionIntelligence_selectedCards', JSON.stringify(newSlots));
  };

  const [deckName, setDeckName] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [savingDeck, setSavingDeck] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveDeck = () => {
    if (!selectedLeader) {
      alert("Please select a leader first!");
      return;
    }

    const cardsWithCount = selectedSlots.filter(slot => slot.card !== null);
    if (cardsWithCount.length === 0) {
      alert("Please add at least one card to your deck!");
      return;
    }

    setShowSaveModal(true);
  };

  const confirmSaveDeck = () => {
    if (!deckName.trim()) {
      alert("Please enter a deck name!");
      return;
    }

    setSavingDeck(true);

    // Prepare deck data
    const deckData = {
      id: `deck-${Date.now()}`,
      deckName: deckName.trim(),
      leaderName: selectedLeader!.name,
      leaderNumber: selectedLeader!.number,
      leaderColor: selectedLeader!.color,
      savedDate: new Date().toLocaleDateString(),
      cards: selectedSlots
        .filter(slot => slot.card !== null)
        .map(slot => ({
          id: slot.card!.id,
          name: slot.card!.name,
          number: slot.card!.number,
          count: slot.count,
          color: slot.card!.color,
        })),
      totalCards: selectedSlots
        .filter(slot => slot.card !== null)
        .reduce((sum, slot) => sum + slot.count, 0),
    };

    // Save to localStorage
    const existingDecks = JSON.parse(localStorage.getItem("myDeckCollection") || "[]");
    existingDecks.push(deckData);
    localStorage.setItem("myDeckCollection", JSON.stringify(existingDecks));

    // Trigger custom event for MyCollection to update
    window.dispatchEvent(new Event("deckSaved"));

    setSavingDeck(false);
    setSavedSuccess(true);

    setTimeout(() => {
      setShowSaveModal(false);
      setSavedSuccess(false);
      setDeckName("");
    }, 2000);
  };

  const selectedCard = selectedSlotIndex !== null ? selectedSlots[selectedSlotIndex].card : null;

  // Calculate synergy between card and leader
  const calculateSynergy = (card: CardData | null, leader: CardData | null): number => {
    if (!card || !leader) return 0;
    let synergy = 50; // Base synergy

    // Color matching
    if (card.color === leader.color) synergy += 30;
    
    // Cost efficiency with leader power
    if (card.cost <= 3 && leader.role.includes("Aggressive")) synergy += 10;
    if (card.cost >= 5 && leader.role.includes("Late Game")) synergy += 10;
    
    // Keyword synergy
    const hasSharedKeywords = card.keywords.some(k => leader.keywords.includes(k));
    if (hasSharedKeywords) synergy += 15;

    return Math.min(synergy, 100);
  };

  const getSynergyRating = (synergy: number): { text: string; color: string } => {
    if (synergy >= 80) return { text: "Excellent", color: "text-green-600" };
    if (synergy >= 60) return { text: "Good", color: "text-blue-600" };
    if (synergy >= 40) return { text: "Average", color: "text-yellow-600" };
    return { text: "Poor", color: "text-red-600" };
  };

  const leaders = sampleCards.filter(c => c.type === "Leader");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Layers className="w-8 h-8 text-indigo-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            🎴 Card Action Intelligence
          </h2>
        </div>
        <p className="text-gray-900">
          Select up to 15 cards and instantly see what each card does, when to use it, and what can happen next in battle
        </p>
      </div>

      {/* Leader Selection Area - MOVED TO TOP */}
      <Card className="p-6 transition-all bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-500">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow-900">Leader Selection</h3>
              <p className="text-sm text-yellow-700">Choose your leader to analyze card synergies</p>
            </div>
          </div>

          {/* Leader Dropdown */}
          <div className="bg-white p-4 rounded-xl border-2 border-yellow-300">
            <Label className="text-gray-900 mb-2 block">Select Leader</Label>
            <Select onValueChange={handleLeaderSelect} value={selectedLeader?.id || ""}>
              <SelectTrigger className="w-full border-yellow-300">
                <SelectValue placeholder="Choose a leader card" />
              </SelectTrigger>
              <SelectContent>
                {leaders.map((leader) => (
                  <SelectItem key={leader.id} value={leader.id}>
                    {leader.name} ({leader.color}) - {leader.number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Leader Display */}
          {selectedLeader && (
            <div className="bg-white p-6 rounded-xl border-2 border-yellow-300">
              <div className="flex gap-6">
                <div className="w-56 aspect-[3/4] bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg border-2 border-yellow-400 flex items-center justify-center shadow-xl relative">
                  <div className="text-center text-white p-3">
                    <p className="font-bold text-xl">{selectedLeader.name}</p>
                    <p className="text-sm mt-2">{selectedLeader.number}</p>
                  </div>
                  <Crown className="absolute top-2 left-2 w-6 h-6 text-white" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{selectedLeader.name}</h4>
                    <p className="text-sm text-gray-600">{selectedLeader.number}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">
                      Leader
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800 border border-orange-300">
                      {selectedLeader.color}
                    </Badge>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                    <p className="text-sm font-bold text-yellow-900 mb-2">LEADER ABILITY</p>
                    <p className="text-sm text-gray-700">{selectedLeader.effect}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <p className="text-sm font-bold text-green-900 mb-2">SIMPLE MEANING</p>
                    <p className="text-sm text-gray-700">{selectedLeader.simpleMeaning}</p>
                  </div>
                </div>
              </div>

              {/* What Does This Card Do Section */}
              <div className="mt-6 space-y-4">
                <div className="border-t-2 border-yellow-200 pt-4">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">💡 What Does This Card Do?</h4>
                </div>

                {/* When to Use */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border-2 border-blue-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <p className="text-sm font-bold text-blue-900">WHEN TO USE LEADER ABILITY</p>
                  </div>
                  <p className="text-sm text-gray-700">{selectedLeader.bestTime}</p>
                </div>

                {/* Strategic Role */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border-2 border-purple-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <p className="text-sm font-bold text-purple-900">STRATEGIC ROLE</p>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{selectedLeader.role}</p>
                  <div className="flex gap-2">
                    <Badge className="bg-purple-100 text-purple-800">{selectedLeader.playAdvice}</Badge>
                    <Badge className={`${
                      selectedLeader.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      selectedLeader.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedLeader.difficulty}
                    </Badge>
                  </div>
                </div>

                {/* Combo Synergies */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-lg border-2 border-teal-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-teal-600" />
                    <p className="text-sm font-bold text-teal-900">WORKS WELL WITH</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedLeader.comboWith.map((combo, idx) => (
                      <Badge key={idx} className="bg-teal-100 text-teal-800 border border-teal-300">
                        {combo}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Gameplay Tips */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg border-2 border-indigo-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-indigo-600" />
                    <p className="text-sm font-bold text-indigo-900">GAMEPLAY TIPS</p>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {selectedLeader.color === "Red" && (
                      <>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Focus on aggressive plays and putting pressure on your opponent early</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Use leader ability to push damage through during crucial attacks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Combine with Double Attack characters for maximum pressure</span>
                        </li>
                      </>
                    )}
                    {selectedLeader.color === "Blue" && (
                      <>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Prioritize card advantage - use ability when you have situational cards</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Control the board with removal and counter cards</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Win through card advantage and late-game value</span>
                        </li>
                      </>
                    )}
                    {selectedLeader.color === "Black" && (
                      <>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Focus on ramping DON early - play defensively until turn 7+</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Leader draws cards when attacking with 7+ DON - attack every turn!</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Deploy high-cost finishers to overwhelm opponents late game</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Risk Warning */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg border-2 border-red-300">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <p className="text-sm font-bold text-red-900">WATCH OUT FOR</p>
                  </div>
                  <p className="text-sm text-gray-700">{selectedLeader.riskWarning}</p>
                </div>

                {/* Keywords */}
                <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                  <p className="text-sm font-bold text-gray-900 mb-2">KEY ABILITIES</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedLeader.keywords.map((keyword, idx) => (
                      <Badge key={idx} className="bg-gray-100 text-gray-800 border border-gray-300">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Power Level */}
                <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold text-gray-600 mb-2">LEADER POWER</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedLeader.power}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-600 mb-2">THREAT LEVEL</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-red-600 h-3 rounded-full"
                            style={{ width: `${selectedLeader.threatLevel * 10}%` }}
                          />
                        </div>
                        <span className="font-bold text-gray-900">{selectedLeader.threatLevel}/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Card-to-Leader Synergy Comparison - BELOW LEADER SELECTION */}
      {selectedLeader && selectedSlots.some(card => card.card !== null) && (
        <Card className="p-6 transition-all bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-500">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-900">Card-to-Leader Synergy Analysis</h3>
                <p className="text-sm text-purple-700">See how well each card works with {selectedLeader.name}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-purple-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedSlots.map((card, index) => {
                  if (!card.card) return null;
                  const synergy = calculateSynergy(card.card, selectedLeader);
                  const rating = getSynergyRating(synergy);
                  
                  return (
                    <div key={index} className="bg-white p-4 rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-all">
                      <div className="flex gap-3">
                        <div className="w-16 aspect-[3/4] bg-gradient-to-br from-blue-400 to-purple-600 rounded border border-purple-300 flex items-center justify-center">
                          <p className="text-xs text-white font-bold text-center px-1">{card.card.name}</p>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div>
                            <p className="font-bold text-sm text-gray-900 truncate">{card.card.name}</p>
                            <p className="text-xs text-gray-600">{card.card.number}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600">Synergy:</span>
                              <span className={`text-xs font-bold ${rating.color}`}>{rating.text}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  synergy >= 80 ? 'bg-green-500' :
                                  synergy >= 60 ? 'bg-blue-500' :
                                  synergy >= 40 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${synergy}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-600">
                              {synergy}% Match
                            </p>
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            {card.card.color === selectedLeader.color && (
                              <Badge className="text-xs bg-green-100 text-green-800">Color Match</Badge>
                            )}
                            {card.card.keywords.some(k => selectedLeader.keywords.includes(k)) && (
                              <Badge className="text-xs bg-blue-100 text-blue-800">Keyword Synergy</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Overall Deck Synergy */}
            <div className="bg-white p-6 rounded-xl border-2 border-purple-300">
              <h4 className="font-bold text-purple-900 mb-4">Overall Deck Synergy with {selectedLeader.name}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-300">
                  <p className="text-xs font-bold text-gray-600 mb-2">AVERAGE SYNERGY</p>
                  <p className="text-3xl font-bold text-green-900">
                    {Math.round(
                      selectedSlots
                        .filter(c => c.card !== null)
                        .reduce((acc, card) => acc + calculateSynergy(card.card, selectedLeader), 0) /
                      selectedSlots.filter(c => c.card !== null).length
                    )}%
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border-2 border-blue-300">
                  <p className="text-xs font-bold text-gray-600 mb-2">COLOR MATCH CARDS</p>
                  <p className="text-3xl font-bold text-blue-900">
                    {selectedSlots.filter(c => c.card && c.card.color === selectedLeader.color).length}
                    <span className="text-lg text-gray-600">/{selectedSlots.filter(c => c.card !== null).length}</span>
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border-2 border-purple-300">
                  <p className="text-xs font-bold text-gray-600 mb-2">HIGH SYNERGY CARDS</p>
                  <p className="text-3xl font-bold text-purple-900">
                    {selectedSlots.filter(c => c.card && calculateSynergy(c.card, selectedLeader) >= 60).length}
                    <span className="text-lg text-gray-600">/{selectedSlots.filter(c => c.card !== null).length}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-purple-100 rounded-lg border border-purple-300">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-purple-900 mb-1">Deck Building Tip</p>
                    <p className="text-sm text-gray-700">
                      {selectedSlots.filter(c => c.card && c.card.color === selectedLeader.color).length >= 
                       selectedSlots.filter(c => c.card !== null).length * 0.7
                        ? `Great job! Your deck has strong color synergy with ${selectedLeader.name}. Most cards match the leader's color for optimal performance.`
                        : `Consider adding more ${selectedLeader.color} cards to improve synergy with ${selectedLeader.name}. Aim for at least 70% color match for maximum effectiveness.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Card Slots and Analysis Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Side - 15 Card Slots */}
        <Card className="lg:col-span-5 p-6 transition-all bg-gradient-to-br from-indigo-50 to-violet-50 border-2 border-indigo-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-500">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-900">Deck Selection</h3>
                <p className="text-sm text-indigo-700">Choose cards to analyze</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {selectedSlots.map((card, index) => (
                <div
                  key={index}
                  onClick={() => handleSlotClick(index)}
                  className={`relative p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedSlotIndex === index
                      ? 'border-indigo-500 bg-indigo-100 shadow-lg'
                      : card.card
                      ? 'border-indigo-300 bg-white hover:border-indigo-400 hover:shadow-md'
                      : 'border-dashed border-gray-300 bg-white hover:border-indigo-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="text-xs bg-indigo-500 text-white">
                        Slot {index + 1}
                      </Badge>
                      {card.card && (
                        <Badge className={`text-xs ${
                          card.card.type === 'Character' ? 'bg-blue-100 text-blue-800' :
                          card.card.type === 'Event' ? 'bg-purple-100 text-purple-800' :
                          card.card.type === 'Stage' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {card.card.type}
                        </Badge>
                      )}
                    </div>

                    {!card.card ? (
                      <div>
                        <Select onValueChange={(value) => handleCardSelect(index, value)}>
                          <SelectTrigger className="w-full border-indigo-300 text-xs h-8">
                            <SelectValue placeholder="Select Card" />
                          </SelectTrigger>
                          <SelectContent>
                            {sampleCards.filter(c => c.type !== "Leader").map((sampleCard) => (
                              <SelectItem key={sampleCard.id} value={sampleCard.id}>
                                {sampleCard.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="mt-2 aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <Layers className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="aspect-[3/4] bg-gradient-to-br from-blue-400 to-purple-600 rounded border-2 border-indigo-400 flex items-center justify-center relative overflow-hidden">
                          <div className="text-center text-white p-2">
                            <p className="text-xs font-bold truncate">{card.card.name}</p>
                            <p className="text-xs mt-1">{card.card.number}</p>
                          </div>
                          {card.card.keywords.length > 0 && (
                            <div className="absolute top-1 right-1 bg-yellow-400 text-yellow-900 px-1 py-0.5 rounded text-xs font-bold">
                              {card.card.keywords[0]}
                            </div>
                          )}
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <Badge className="bg-gray-100 text-gray-800 px-1 py-0">
                            Cost: {card.card.cost}
                          </Badge>
                          {card.card.power && (
                            <Badge className="bg-red-100 text-red-800 px-1 py-0">
                              {card.card.power}
                            </Badge>
                          )}
                        </div>
                        {/* Card Count Selector */}
                        <div className="mt-2 flex items-center justify-center gap-1">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardCountChange(index, card.count - 1);
                            }}
                            className="h-6 w-6 p-0 bg-indigo-500 hover:bg-indigo-600 text-white"
                            disabled={card.count <= 1}
                          >
                            -
                          </Button>
                          <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded font-bold text-sm">
                            x{card.count}
                          </div>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardCountChange(index, card.count + 1);
                            }}
                            className="h-6 w-6 p-0 bg-indigo-500 hover:bg-indigo-600 text-white"
                            disabled={card.count >= 4}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Right Side - Card Detail Panel */}
        <Card className="lg:col-span-7 p-6 transition-all bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900">Action Breakdown</h3>
                <p className="text-sm text-blue-700">Understand what the card does in battle</p>
              </div>
            </div>

            {!selectedCard ? (
              <div className="flex flex-col items-center justify-center h-96 text-center bg-white rounded-lg border-2 border-blue-200">
                <Layers className="w-20 h-20 text-blue-300 mb-4" />
                <p className="text-gray-700 text-lg mb-2">
                  Select a card to see its action intelligence
                </p>
                <p className="text-gray-500 text-sm">
                  Click any card slot on the left to view detailed tactical analysis
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Card Preview */}
                <div className="bg-white p-4 rounded-xl border-2 border-blue-300">
                  <div className="flex gap-4">
                    <div className="w-32 aspect-[3/4] bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg border-2 border-blue-400 flex items-center justify-center shadow-lg">
                      <div className="text-center text-white p-2">
                        <p className="font-bold text-sm">{selectedCard.name}</p>
                        <p className="text-xs mt-1">{selectedCard.number}</p>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="text-xl font-bold text-gray-900">{selectedCard.name}</h4>
                      <p className="text-sm text-gray-600">{selectedCard.number}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800">{selectedCard.type}</Badge>
                        <Badge className="bg-purple-100 text-purple-800">{selectedCard.color}</Badge>
                        {selectedCard.attribute && (
                          <Badge className="bg-green-100 text-green-800">{selectedCard.attribute}</Badge>
                        )}
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Cost:</span>{" "}
                          <span className="font-bold text-gray-900">{selectedCard.cost}</span>
                        </div>
                        {selectedCard.power && (
                          <div>
                            <span className="text-gray-600">Power:</span>{" "}
                            <span className="font-bold text-gray-900">{selectedCard.power}</span>
                          </div>
                        )}
                        {selectedCard.counter && (
                          <div>
                            <span className="text-gray-600">Counter:</span>{" "}
                            <span className="font-bold text-gray-900">+{selectedCard.counter}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Keywords */}
                <div className="bg-white p-4 rounded-xl border-2 border-yellow-300">
                  <p className="text-sm font-bold text-yellow-900 mb-2">KEYWORDS & ABILITIES</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCard.keywords.map((keyword, idx) => (
                      <Badge key={idx} className="bg-yellow-100 text-yellow-800 border border-yellow-300">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Official Effect */}
                <div className="bg-white p-4 rounded-xl border-2 border-purple-300">
                  <p className="text-sm font-bold text-purple-900 mb-2">OFFICIAL EFFECT TEXT</p>
                  <p className="text-sm text-gray-700">{selectedCard.effect}</p>
                  {selectedCard.trigger && (
                    <div className="mt-3 p-2 bg-red-50 rounded border border-red-300">
                      <p className="text-xs font-bold text-red-900">TRIGGER</p>
                      <p className="text-sm text-gray-700">{selectedCard.trigger}</p>
                    </div>
                  )}
                </div>

                {/* Simple Meaning */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-300">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-sm font-bold text-green-900">SIMPLE MEANING</p>
                  </div>
                  <p className="text-gray-700">{selectedCard.simpleMeaning}</p>
                </div>

                {/* What Happens When Played */}
                <div className="bg-white p-4 rounded-xl border-2 border-blue-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <p className="text-sm font-bold text-blue-900">WHAT HAPPENS WHEN PLAYED</p>
                  </div>
                  <p className="text-sm text-gray-700">{selectedCard.whenPlayed}</p>
                </div>

                {/* Best Time to Use */}
                <div className="bg-white p-4 rounded-xl border-2 border-indigo-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <p className="text-sm font-bold text-indigo-900">BEST TIME TO USE</p>
                  </div>
                  <p className="text-sm text-gray-700">{selectedCard.bestTime}</p>
                </div>

                {/* Combo With */}
                <div className="bg-white p-4 rounded-xl border-2 border-teal-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-teal-600" />
                    <p className="text-sm font-bold text-teal-900">COMBO WITH</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCard.comboWith.map((combo, idx) => (
                      <Badge key={idx} className="bg-teal-100 text-teal-800">
                        {combo}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Risk Warning */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-xl border-2 border-red-300">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <p className="text-sm font-bold text-red-900">RISK WARNING</p>
                  </div>
                  <p className="text-sm text-gray-700">{selectedCard.riskWarning}</p>
                </div>

                {/* Card Intelligence Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border-2 border-purple-300">
                    <p className="text-xs font-bold text-gray-600 mb-2">CARD ROLE</p>
                    <p className="font-bold text-purple-900">{selectedCard.role}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border-2 border-blue-300">
                    <p className="text-xs font-bold text-gray-600 mb-2">PLAY ADVICE</p>
                    <p className="font-bold text-blue-900">{selectedCard.playAdvice}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border-2 border-orange-300">
                    <p className="text-xs font-bold text-gray-600 mb-2">DIFFICULTY</p>
                    <Badge className={`${
                      selectedCard.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      selectedCard.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedCard.difficulty}
                    </Badge>
                  </div>
                  <div className="bg-white p-4 rounded-xl border-2 border-red-300">
                    <p className="text-xs font-bold text-gray-600 mb-2">THREAT LEVEL</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-red-600 h-2 rounded-full"
                          style={{ width: `${selectedCard.threatLevel * 10}%` }}
                        />
                      </div>
                      <span className="font-bold text-red-900">{selectedCard.threatLevel}/10</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Save Deck Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Save Your Deck</h3>
            <div className="space-y-4">
              <Label className="text-gray-900">Deck Name</Label>
              <Input
                type="text"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                placeholder="Enter deck name"
                className="w-full"
              />
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <Button
                type="button"
                onClick={() => setShowSaveModal(false)}
                className="bg-gray-300 text-gray-900"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={confirmSaveDeck}
                className="bg-blue-500 text-white"
                disabled={savingDeck}
              >
                {savingDeck ? "Saving..." : "Save Deck"}
              </Button>
            </div>
            {savedSuccess && (
              <div className="mt-4 text-sm text-green-600">
                Deck saved successfully!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Save Deck Button */}
      <div className="text-center">
        <Button
          type="button"
          onClick={handleSaveDeck}
          className="bg-blue-500 text-white"
        >
          Save Deck
        </Button>
      </div>
    </div>
  );
}