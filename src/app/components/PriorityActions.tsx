import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Zap, AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export function PriorityActions() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold" style={{ color: '#0A1F44' }}>
          Priority & Actions
        </h2>
        <p className="text-gray-600">
          Understanding when you can act and respond in the game
        </p>
      </div>
      
      {/* Priority Overview */}
      <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2" style={{ borderColor: '#C19A6B' }}>
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-8 h-8 text-yellow-600" />
          <h3 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
            What is Priority?
          </h3>
        </div>
        
        <div className="space-y-3">
          <p className="text-gray-700">
            Priority determines which player can take actions at any given time. Understanding priority is crucial for making the right plays and responding to your opponent's moves.
          </p>
          
          <div className="p-4 bg-white rounded-lg border-2 border-yellow-400">
            <p className="font-semibold text-yellow-900 mb-2">Key Rule:</p>
            <p className="text-sm text-gray-700">
              The active player (whose turn it is) has priority during their Main Phase. The defending player gets priority during combat and can respond with [Counter] abilities.
            </p>
          </div>
        </div>
      </Card>
      
      {/* Priority Windows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 border-2 border-green-400">
          <Badge className="mb-3 bg-green-600">Active Player Priority</Badge>
          <h4 className="font-bold mb-3" style={{ color: '#0A1F44' }}>Your Main Phase</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-1">✓</span>
              <span>Play Characters, Events, and Stages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-1">✓</span>
              <span>Attach DON!! to Characters</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-1">✓</span>
              <span>Declare attacks with Leader or Characters</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-1">✓</span>
              <span>Activate card abilities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-1">✓</span>
              <span>Take as many actions as you can afford</span>
            </li>
          </ul>
        </Card>
        
        <Card className="p-6 border-2 border-blue-400">
          <Badge className="mb-3 bg-blue-600">Defender Priority</Badge>
          <h4 className="font-bold mb-3" style={{ color: '#0A1F44' }}>Opponent's Turn</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <span>Use [Counter] cards during attacks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <span>Activate [Blocker] Characters</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <span>Respond to specific card effects</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold mt-1">✗</span>
              <span>Cannot play cards from hand (unless [Counter])</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold mt-1">✗</span>
              <span>Cannot attack or activate most abilities</span>
            </li>
          </ul>
        </Card>
      </div>
      
      {/* Action Types */}
      <Accordion type="single" collapsible className="space-y-3">
        <AccordionItem value="main-actions" className="border rounded-lg bg-white">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <Badge className="bg-green-600">Main Phase</Badge>
              <span className="font-bold">Main Phase Actions</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="font-semibold text-green-900 mb-2">Playing Cards</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Pay DON!! cost equal to card's cost number</li>
                  <li>• Cards must match your Leader's color (or be generic)</li>
                  <li>• You can play multiple cards in one turn if you have enough DON!!</li>
                  <li>• Stages are limited to 1 copy of the same name on your field</li>
                </ul>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">Attacking</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Choose an active (untapped) Character or your Leader</li>
                  <li>• Rest the attacker (turn sideways)</li>
                  <li>• You can attack multiple times with different Characters</li>
                  <li>• Characters must have been on field since start of turn (unless [Rush])</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="font-semibold text-purple-900 mb-2">Using Abilities</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Activated abilities often require resting the card or paying costs</li>
                  <li>• [Main] timing abilities can only be used during your Main Phase</li>
                  <li>• Some abilities trigger automatically when conditions are met</li>
                  <li>• Read card text carefully for specific timing and requirements</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="counter-actions" className="border rounded-lg bg-white">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-600">Counter</Badge>
              <span className="font-bold">Counter Timing Actions</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">When Can You Use Counter?</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• During any attack (opponent's or your own)</li>
                  <li>• When specific card effects trigger that allow Counter responses</li>
                  <li>• During your opponent's turn when they use certain abilities</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="font-semibold text-yellow-900 mb-2">What Can You Counter?</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Use [Counter] cards from hand to boost defense power</li>
                  <li>• Activate [Blocker] Characters to intercept attacks</li>
                  <li>• Play Events with [Counter] timing for special effects</li>
                  <li>• Use abilities specifically marked with [Counter] timing</li>
                </ul>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-900 mb-2">Important Limitation</p>
                    <p className="text-sm text-gray-700">
                      You CANNOT use Counter cards or Blockers during your opponent's Main Phase when they're not attacking. Counter abilities only work during specific windows, primarily combat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="fast-actions" className="border rounded-lg bg-white">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <Badge className="bg-orange-600">Special</Badge>
              <span className="font-bold">Fast Actions & Instant Speed</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-semibold text-orange-900 mb-2">Unlike Some Other Card Games...</p>
                <p className="text-sm text-gray-700 mb-3">
                  One Piece TCG is simpler than games like Magic: The Gathering. There is NO "instant speed" or "stack" for most actions. The priority system is straightforward:
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Active player plays during their Main Phase</li>
                  <li>• Defender responds during combat with [Counter] abilities only</li>
                  <li>• No complicated back-and-forth priority passing</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="font-semibold text-green-900 mb-2">Triggered Abilities</p>
                <p className="text-sm text-gray-700 mb-2">
                  Some abilities trigger automatically when conditions are met:
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• [On Play] - When the card enters the field</li>
                  <li>• [When Attacking] - When this card attacks</li>
                  <li>• [End of Turn] - During the End Phase</li>
                  <li>• These don't require priority - they happen automatically</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="special-timing" className="border rounded-lg bg-white">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <Badge className="bg-purple-600">Timing</Badge>
              <span className="font-bold">Special Timing Keywords</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-green-50 rounded border border-green-300">
                <Badge className="mb-2 bg-green-600 text-xs">[Main]</Badge>
                <p className="text-xs text-gray-700">Can only be used during your Main Phase while you have priority</p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded border border-blue-300">
                <Badge className="mb-2 bg-blue-600 text-xs">[Counter]</Badge>
                <p className="text-xs text-gray-700">Can be used during opponent's attack or specific Counter windows</p>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded border border-yellow-300">
                <Badge className="mb-2 bg-yellow-600 text-xs">[On Play]</Badge>
                <p className="text-xs text-gray-700">Triggers automatically when card enters the field</p>
              </div>
              
              <div className="p-3 bg-red-50 rounded border border-red-300">
                <Badge className="mb-2 bg-red-600 text-xs">[When Attacking]</Badge>
                <p className="text-xs text-gray-700">Triggers when this card declares an attack</p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded border border-purple-300">
                <Badge className="mb-2 bg-purple-600 text-xs">[Trigger]</Badge>
                <p className="text-xs text-gray-700">Effect activates when revealed from Life area</p>
              </div>
              
              <div className="p-3 bg-orange-50 rounded border border-orange-300">
                <Badge className="mb-2 bg-orange-600 text-xs">[End of Turn]</Badge>
                <p className="text-xs text-gray-700">Effect happens during the End Phase</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Priority Flow Example */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300">
        <h3 className="text-xl font-bold mb-4" style={{ color: '#0A1F44' }}>
          📊 Priority Flow Example
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
              1
            </div>
            <div className="p-3 bg-white rounded flex-1 border border-green-300">
              <p className="text-sm"><strong>Your Main Phase:</strong> You play a Character, attach DON!!, then declare attack</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
              2
            </div>
            <div className="p-3 bg-white rounded flex-1 border border-blue-300">
              <p className="text-sm"><strong>Priority Passes:</strong> Opponent now has priority to respond</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
              3
            </div>
            <div className="p-3 bg-white rounded flex-1 border border-yellow-300">
              <p className="text-sm"><strong>Counter Window:</strong> Opponent uses [Counter] card or [Blocker]</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
              4
            </div>
            <div className="p-3 bg-white rounded flex-1 border border-purple-300">
              <p className="text-sm"><strong>Resolution:</strong> Attack resolves based on power comparison</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
              5
            </div>
            <div className="p-3 bg-white rounded flex-1 border border-green-300">
              <p className="text-sm"><strong>Back to You:</strong> Priority returns, you can take another action</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
