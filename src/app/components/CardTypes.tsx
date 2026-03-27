import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Crown, Users, Zap, Layers } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function CardTypes() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">
          Card Types & Mechanics
        </h2>
        <p className="text-gray-900">
          Understand every card type and when to use them
        </p>
      </div>
      
      <Tabs defaultValue="leader" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="leader" className="gap-2">
            <Crown className="w-4 h-4" />
            <span className="hidden sm:inline">Leader</span>
          </TabsTrigger>
          <TabsTrigger value="character" className="gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Character</span>
          </TabsTrigger>
          <TabsTrigger value="event" className="gap-2">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Event</span>
          </TabsTrigger>
          <TabsTrigger value="stage" className="gap-2">
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Stage</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="leader" className="space-y-4 mt-4">
          <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg p-3">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
                  Leader Card
                </h3>
                <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">
                  Your Captain
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="font-semibold text-yellow-900 mb-2">What is it?</p>
                <p className="text-sm text-gray-700">
                  Your Leader represents you in the game. It stays in play the entire game and determines your deck's color identity.
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="font-semibold" style={{ color: '#0A1F44' }}>Key Stats:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded">
                    <p className="text-xs text-red-600 font-semibold">POWER</p>
                    <p className="text-lg font-bold text-red-900">5000</p>
                    <p className="text-xs text-gray-600">Attack/Defense strength</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-xs text-blue-600 font-semibold">LIFE</p>
                    <p className="text-lg font-bold text-blue-900">5</p>
                    <p className="text-xs text-gray-600">Starting life cards</p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                    <p className="text-xs text-purple-600 font-semibold">COLOR</p>
                    <p className="text-lg font-bold text-purple-900">Red/Green</p>
                    <p className="text-xs text-gray-600">Deck restrictions</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="font-semibold" style={{ color: '#0A1F44' }}>Special Rules:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-1">•</span>
                    <span>Can attack once per turn (must rest)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-1">•</span>
                    <span>Can be attacked by opponent's Characters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-1">•</span>
                    <span>Cannot leave the field (permanent)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-1">•</span>
                    <span>Often has both a front and back side with different effects</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="character" className="space-y-4 mt-4">
          <Card className="p-6 border-2" style={{ borderColor: '#D0021B' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-lg p-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
                  Character Cards
                </h3>
                <Badge className="bg-red-100 text-red-800 border border-red-300">
                  Your Crew
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="font-semibold text-red-900 mb-2">What are they?</p>
                <p className="text-sm text-gray-700">
                  Characters are the backbone of your strategy. They can attack, block, and have powerful abilities that shape the game.
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="font-semibold" style={{ color: '#0A1F44' }}>Key Stats:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-xs text-blue-600 font-semibold">COST</p>
                    <p className="text-lg font-bold text-blue-900">3-7+</p>
                    <p className="text-xs text-gray-600">DON!! required to play</p>
                  </div>
                  <div className="p-3 bg-red-50 border border-red-200 rounded">
                    <p className="text-xs text-red-600 font-semibold">POWER</p>
                    <p className="text-lg font-bold text-red-900">3000-10000+</p>
                    <p className="text-xs text-gray-600">Attack/Defense value</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded">
                    <p className="text-xs text-green-600 font-semibold">COUNTER</p>
                    <p className="text-lg font-bold text-green-900">+1000/+2000</p>
                    <p className="text-xs text-gray-600">Block power from hand</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="font-semibold" style={{ color: '#0A1F44' }}>How to Play:</p>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded border">
                    <p className="font-semibold text-sm mb-1">1. Play from Hand</p>
                    <p className="text-xs text-gray-600">Pay the DON!! cost during your Main Phase</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded border">
                    <p className="font-semibold text-sm mb-1">2. Summoning Sickness</p>
                    <p className="text-xs text-gray-600">Cannot attack the turn they're played (unless [Rush])</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded border">
                    <p className="font-semibold text-sm mb-1">3. Attack or Use Abilities</p>
                    <p className="text-xs text-gray-600">Once active, can attack or activate their effects</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300">
                <p className="font-semibold text-yellow-900 mb-2">💡 Pro Tip</p>
                <p className="text-sm text-gray-700">
                  Characters can be used as blockers from your hand using their Counter value - even if you haven't played them yet!
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="event" className="space-y-4 mt-4">
          <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg p-3">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
                  Event Cards
                </h3>
                <Badge className="bg-purple-100 text-purple-800 border border-purple-300">
                  One-Time Effects
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="font-semibold text-purple-900 mb-2">What are they?</p>
                <p className="text-sm text-gray-700">
                  Events are powerful one-time-use cards that create immediate impacts. They go to the trash after resolving.
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="font-semibold" style={{ color: '#0A1F44' }}>Common Event Types:</p>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <p className="font-semibold text-sm text-red-900">🔥 Removal</p>
                    <p className="text-xs text-gray-600">Remove opponent's Characters from play</p>
                  </div>
                  <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <p className="font-semibold text-sm text-blue-900">📚 Draw</p>
                    <p className="text-xs text-gray-600">Draw additional cards for resources</p>
                  </div>
                  <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                    <p className="font-semibold text-sm text-green-900">💪 Buff</p>
                    <p className="text-xs text-gray-600">Give your Characters extra power temporarily</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <p className="font-semibold text-sm text-yellow-900">🔍 Search</p>
                    <p className="text-xs text-gray-600">Find specific cards from your deck</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="font-semibold" style={{ color: '#0A1F44' }}>Timing:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span>Played during your Main Phase (unless they have special timing)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span>Some Events have [Counter] timing - can be played during battle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span>Effect resolves immediately, then card goes to trash</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="stage" className="space-y-4 mt-4">
          <Card className="p-6 border-2" style={{ borderColor: '#0A1F44' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-3">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
                  Stage Cards
                </h3>
                <Badge className="bg-green-100 text-green-800 border border-green-300">
                  Permanent Support
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="font-semibold text-green-900 mb-2">What are they?</p>
                <p className="text-sm text-gray-700">
                  Stages represent locations and provide ongoing effects that last as long as they remain on the field.
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="font-semibold" style={{ color: '#0A1F44' }}>Stage Characteristics:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-sm font-semibold text-blue-900 mb-1">⚡ Ongoing Effects</p>
                    <p className="text-xs text-gray-600">
                      Abilities that continuously apply while Stage is in play
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded">
                    <p className="text-sm font-semibold text-purple-900 mb-1">🔄 Activated Abilities</p>
                    <p className="text-xs text-gray-600">
                      Effects you can trigger by resting the Stage or paying costs
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="font-semibold" style={{ color: '#0A1F44' }}>Important Rules:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">•</span>
                    <span>Stays on field permanently until removed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">•</span>
                    <span>Limited to 1 Stage with the same name on your field</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">•</span>
                    <span>Can be rested to activate abilities (like Characters)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">•</span>
                    <span>Cannot attack or block (they're locations, not units!)</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300">
                <p className="font-semibold text-yellow-900 mb-2">💡 Strategy Tip</p>
                <p className="text-sm text-gray-700">
                  Stages provide long-term value - invest in them early for sustained advantages throughout the game!
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}