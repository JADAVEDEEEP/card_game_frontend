import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export function GameBasics() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">
          Game Basics
        </h2>
        <p className="text-gray-900">
          Learn the fundamentals to start playing
        </p>
      </div>
      
      {/* Overview Card */}
      <Card className="p-6 border-2 bg-gradient-to-br from-blue-50 to-sky-50 border-blue-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Info className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-900">Game Overview</h3>
          </div>
          <p className="text-gray-800 leading-relaxed">
            One Piece Card Game is a strategic trading card game where players battle using Characters, Events, and Stages from the One Piece universe. Build your deck, deploy your crew, and reduce your opponent's life to zero!
          </p>
        </div>
      </Card>
      
      {/* Win Conditions */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
        <h3 className="text-xl font-bold mb-4 text-green-900">
          Win Conditions
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900">Primary Win</p>
              <p className="text-sm text-gray-700">Reduce opponent's Life to 0</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-blue-200">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900">Alternative Win</p>
              <p className="text-sm text-gray-700">Opponent cannot draw a card when required</p>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Rule Cards */}
      <Accordion type="single" collapsible className="space-y-3">
        <AccordionItem value="deck" className="border rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <Badge className="bg-amber-600 text-white">
                Rule
              </Badge>
              <span className="font-bold text-gray-900">Deck Construction</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">Requirements:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Exactly 50 cards (excluding Leader)</li>
                  <li>1 Leader card (placed separately)</li>
                  <li>Maximum 4 copies of any card (by card number)</li>
                  <li>Cards must match Leader's color or be generic</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-900">Common Mistake</p>
                    <p className="text-sm text-gray-700">Don't forget to match your deck colors to your Leader's color identity!</p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="life" className="border rounded-lg bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-300">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <Badge className="bg-red-600 text-white">
                Rule
              </Badge>
              <span className="font-bold text-gray-900">Life & Damage</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">How Life Works:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Start with 5 Life cards (face-down from your deck)</li>
                  <li>When you take damage, place Life cards in your hand</li>
                  <li>You can play cards from Life as normal</li>
                  <li>If you take damage with 0 Life remaining, you lose</li>
                </ul>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-900 mb-2">Example:</p>
                <p className="text-sm text-gray-700">
                  You have 3 Life. Opponent deals 2 damage. You take 2 cards from your Life area and add them to your hand. You now have 1 Life remaining and 2 more cards to play with!
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="don" className="border rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-300">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <Badge className="bg-purple-600 text-white">
                Rule
              </Badge>
              <span className="font-bold text-gray-900">DON!! Cards (Resources)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">DON!! Basics:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>DON!! cards are your resource/mana system</li>
                  <li>Start with 10 DON!! cards in a separate deck</li>
                  <li>Each turn, add 2 DON!! cards (1 on first turn)</li>
                  <li>Attach DON!! to cards for extra power or to pay costs</li>
                  <li>DON!! return to your pool at end of turn (unless rested)</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-green-50 rounded border border-green-200">
                  <p className="font-semibold text-green-900 text-sm mb-1">Active DON!!</p>
                  <p className="text-xs text-gray-700">Available to use for costs or attach</p>
                </div>
                <div className="p-3 bg-gray-50 rounded border border-gray-300">
                  <p className="font-semibold text-gray-900 text-sm mb-1">Rested DON!!</p>
                  <p className="text-xs text-gray-700">Already used, won't return this turn</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="zones" className="border rounded-lg bg-gradient-to-br from-cyan-50 to-teal-50 border-2 border-cyan-300">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <Badge className="bg-cyan-600 text-white">
                Rule
              </Badge>
              <span className="font-bold text-gray-900">Game Zones</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-white border-cyan-200">
                <p className="font-bold text-sm mb-2 text-gray-900">Deck</p>
                <p className="text-xs text-gray-600">Your draw pile (50 cards)</p>
              </div>
              <div className="p-4 border rounded-lg bg-white border-cyan-200">
                <p className="font-bold text-sm mb-2 text-gray-900">Life</p>
                <p className="text-xs text-gray-600">Face-down cards (start with 5)</p>
              </div>
              <div className="p-4 border rounded-lg bg-white border-cyan-200">
                <p className="font-bold text-sm mb-2 text-gray-900">Hand</p>
                <p className="text-xs text-gray-600">Cards you can play</p>
              </div>
              <div className="p-4 border rounded-lg bg-white border-cyan-200">
                <p className="font-bold text-sm mb-2 text-gray-900">Field</p>
                <p className="text-xs text-gray-600">Characters and Stages in play</p>
              </div>
              <div className="p-4 border rounded-lg bg-white border-cyan-200">
                <p className="font-bold text-sm mb-2 text-gray-900">DON!! Deck</p>
                <p className="text-xs text-gray-600">Separate resource pile (10 cards)</p>
              </div>
              <div className="p-4 border rounded-lg bg-white border-cyan-200">
                <p className="font-bold text-sm mb-2 text-gray-900">Trash</p>
                <p className="text-xs text-gray-600">Discard pile</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}