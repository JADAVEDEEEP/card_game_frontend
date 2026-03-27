import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { AlertCircle, CheckCircle, Info, XCircle, Lightbulb, BookOpen, Hand, Heart, Users, Trash2, Zap, Crown, MapPin, Building2, FileText, ArrowRight, Target, Clock, Eye, EyeOff, Shuffle, TrendingUp } from "lucide-react";

export function GameZones() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            🧩 Zones, Card Types & Timing — Complete Mastery Guide
          </h2>
        </div>
        <p className="text-gray-900">
          Master the advanced movement and timing of every zone
        </p>
      </div>

      {/* SECTION 1 - ALL GAME ZONES VISUAL MAP */}
      <Card className="p-6 transition-all bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-purple-900">All Game Zones (Complete Map)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg bg-white border border-purple-200">
            {/* Top Row */}
            <div className="p-4 rounded-lg text-center bg-blue-50 border-2 border-blue-300">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="font-bold text-blue-900">🟦 DECK</p>
              <p className="text-xs text-blue-700">Draw pile</p>
            </div>

            <div className="p-4 rounded-lg text-center bg-green-50 border-2 border-green-300">
              <Hand className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="font-bold text-green-900">🟩 HAND</p>
              <p className="text-xs text-green-700">Hidden cards</p>
            </div>

            <div className="p-4 rounded-lg text-center bg-yellow-50 border-2 border-yellow-300">
              <Heart className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <p className="font-bold text-yellow-900">🟨 LIFE AREA</p>
              <p className="text-xs text-yellow-700">5 life cards</p>
            </div>

            {/* Middle Row */}
            <div className="md:col-span-3 p-4 rounded-lg text-center bg-red-50 border-2 border-red-300">
              <div className="flex items-center justify-center gap-4 mb-2">
                <Crown className="w-6 h-6 text-red-600" />
                <Users className="w-6 h-6 text-red-600" />
                <Building2 className="w-6 h-6 text-red-600" />
              </div>
              <p className="font-bold text-red-900">🟥 FIELD ZONE</p>
              <p className="text-xs text-red-700">Leader | Characters | Stage</p>
            </div>

            {/* Bottom Row */}
            <div className="p-4 rounded-lg text-center bg-gray-50 border-2 border-gray-300">
              <Trash2 className="w-8 h-8 mx-auto mb-2 text-gray-600" />
              <p className="font-bold text-gray-900">⚫ TRASH</p>
              <p className="text-xs text-gray-700">Discard pile</p>
            </div>

            <div className="p-4 rounded-lg text-center bg-orange-50 border-2 border-orange-300">
              <Zap className="w-8 h-8 mx-auto mb-2 text-amber-600" />
              <p className="font-bold text-amber-900">⚡ DON!! AREA</p>
              <p className="text-xs text-amber-700">Resources</p>
            </div>

            <div className="flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-purple-400" />
              <p className="text-sm ml-2 text-purple-700">Cards flow between zones</p>
            </div>
          </div>
        </div>
      </Card>

      {/* SECTION 2 - ZONE-BY-ZONE DEEP EXPLANATION */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">Zone-by-Zone Deep Explanation</h3>

        {/* DECK ZONE */}
        <Card className="p-6 transition-all bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-blue-900">🟦 DECK ZONE</h4>
                <p className="text-sm text-blue-700">Your draw pile — Hidden information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2 text-blue-900">What can happen:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Draw cards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Search cards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Return cards (shuffle required)</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2 text-blue-900">Rules:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Shuffle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Deck must be shuffled after any search</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>If you must draw and deck is empty → you lose</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-green-100 border border-green-300">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-green-700 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-green-900">Pro Notes</p>
                  <p className="text-xs text-green-800">Deck size awareness = skill • Search effects thin deck → improve draw quality</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* HAND ZONE */}
        <Card className="p-6 transition-all bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-500">
                <Hand className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-green-900">🟩 HAND ZONE</h4>
                <p className="text-sm text-green-700">Hidden cards — Your decision resource</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2 text-green-900">What can happen:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Play cards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Counter attacks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Discard effects</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2 text-green-900">Rules:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <EyeOff className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Opponent cannot see your hand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Hand size influences opponent decisions</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-green-100 border border-green-300">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-green-700 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-green-900">Pro Notes</p>
                  <p className="text-xs text-green-800">Hand is often more valuable than life • Counters &gt; random cards</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* LIFE AREA */}
        <Card className="p-6 transition-all bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-500">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-yellow-900">🟨 LIFE AREA</h4>
                <p className="text-sm text-yellow-700">Life cards (face-down) — Hidden triggers</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2 text-yellow-900">What can happen:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Lose life from damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Gain life via effects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Activate triggers</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2 text-yellow-900">Rules:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>Life taken → goes to hand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>Trigger resolves before card enters hand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>No DON usage during trigger unless stated</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-yellow-100 border border-yellow-300">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-green-700 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-green-900">Pro Notes</p>
                  <p className="text-xs text-green-800">Life = delayed card advantage • Taking damage can be correct</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FIELD ZONE - Accordion with sub-zones */}
        <Accordion type="single" collapsible className="space-y-3">
          <AccordionItem value="field" className="border-2 rounded-lg bg-gradient-to-br from-red-50 to-rose-50 border-red-300">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-500">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg text-red-900">🟥 FIELD ZONE (Battlefield)</p>
                  <p className="text-sm text-red-700">Leader | Characters | Stage</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="space-y-4">
                {/* Leader Zone */}
                <div className="p-4 rounded-lg bg-white border-2 border-red-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Crown className="w-5 h-5 text-red-600" />
                    <p className="font-bold text-red-900">👑 LEADER ZONE</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm font-semibold mb-2 text-gray-900">What Leader can do:</p>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>✓ Attack every turn (if active)</li>
                        <li>✓ Use Leader effects</li>
                        <li>✓ Hold attached DON</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2 text-gray-900">What Leader cannot do:</p>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>✗ Be KO'd</li>
                        <li>✗ Be removed from field</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 rounded text-sm bg-green-100 border border-green-300">
                    <p className="font-semibold text-green-900 mb-1">Pro Notes</p>
                    <p className="text-xs text-green-800">Save Leader attack for endgame</p>
                  </div>
                </div>

                {/* Character Zone */}
                <div className="p-4 rounded-lg bg-white border-2 border-red-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-red-600" />
                    <p className="font-bold text-red-900">🧍 CHARACTER ZONE</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm font-semibold mb-2 text-gray-900">What Characters can do:</p>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>✓ Attack</li>
                        <li>✓ Block (if Blocker)</li>
                        <li>✓ Use effects</li>
                        <li>✓ Hold DON</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2 text-gray-900">What Characters cannot do:</p>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>✗ Attack if rested</li>
                        <li>✗ Act if KO'd</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 rounded text-sm bg-green-100 border border-green-300">
                    <p className="font-semibold text-green-900 mb-1">Pro Notes</p>
                    <p className="text-xs text-green-800">Board presence wins midgame</p>
                  </div>
                </div>

                {/* Stage Zone */}
                <div className="p-4 rounded-lg bg-white border-2 border-red-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-red-600" />
                    <p className="font-bold text-red-900">🏟 STAGE ZONE</p>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <p className="text-sm font-semibold text-gray-900">What Stages do:</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>✓ Provide ongoing effects</li>
                      <li>✓ Enable combos</li>
                    </ul>
                    
                    <p className="text-sm font-semibold mt-3 text-gray-900">Rules:</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>⚠️ Only one Stage at a time</li>
                      <li>⚠️ New Stage replaces old (old goes to Trash)</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded text-sm bg-green-100 border border-green-300">
                    <p className="font-semibold text-green-900 mb-1">Pro Notes</p>
                    <p className="text-xs text-green-800">Stages are value engines, not attackers</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* TRASH ZONE */}
        <Card className="p-6 transition-all bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-500">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900">⚫ TRASH ZONE</h4>
                <p className="text-sm text-gray-700">Discard pile — Open information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2 text-gray-900">What can happen:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Cards can be KO'd here</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Cards can be discarded here</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Cards may be retrieved if effect allows</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2 text-gray-900">Rules:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span>Trash is public knowledge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Order does not matter</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-green-100 border border-green-300">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-green-700 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-green-900">Pro Notes</p>
                  <p className="text-xs text-green-800">Trash tracking reveals opponent strategy</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* DON AREA - Link to DON System */}
        <Card className="p-4 transition-all bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-amber-600" />
            <div className="flex-1">
              <p className="font-bold text-amber-900">⚡ DON!! AREA</p>
              <p className="text-sm text-amber-700">Complete details covered in DON!! System section</p>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-600" />
          </div>
        </Card>
      </div>

      {/* SECTION 3 - CARD TYPES: WHAT, WHEN & HOW */}
      <Card className="p-6 transition-all bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-300">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-indigo-900">Card Types: What, When & How</h3>

          <Accordion type="single" collapsible className="space-y-3">
            {/* Leader Cards */}
            <AccordionItem value="leader" className="border-2 rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 border-purple-300">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Crown className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-purple-900">👑 LEADER CARDS (Deep)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2 text-purple-900">Effect Timing Types:</p>
                    <ul className="space-y-1 text-sm ml-4 text-gray-700">
                      <li>• <strong>Activate:</strong> Main Phase</li>
                      <li>• <strong>When Attacking:</strong> During attack declaration</li>
                      <li>• <strong>On Opponent Turn:</strong> If stated on card</li>
                    </ul>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm bg-white rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-purple-100">
                          <th className="p-2 text-left text-purple-900 border border-purple-200">Action</th>
                          <th className="p-2 text-center text-purple-900 border border-purple-200">Allowed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 text-gray-700 border border-purple-200">Attack</td>
                          <td className="p-2 text-center border border-purple-200">✅</td>
                        </tr>
                        <tr className="bg-purple-50">
                          <td className="p-2 text-gray-700 border border-purple-200">Block</td>
                          <td className="p-2 text-center border border-purple-200">❌</td>
                        </tr>
                        <tr>
                          <td className="p-2 text-gray-700 border border-purple-200">Be KO'd</td>
                          <td className="p-2 text-center border border-purple-200">❌</td>
                        </tr>
                        <tr className="bg-purple-50">
                          <td className="p-2 text-gray-700 border border-purple-200">Receive DON</td>
                          <td className="p-2 text-center border border-purple-200">✅</td>
                        </tr>
                        <tr>
                          <td className="p-2 text-gray-700 border border-purple-200">Use effects</td>
                          <td className="p-2 text-center text-gray-900 border border-purple-200">As stated</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Character Cards */}
            <AccordionItem value="character" className="border-2 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-blue-900">🧍 CHARACTER CARDS (Deep)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 rounded bg-white border border-blue-200">
                      <p className="font-semibold text-sm mb-1 text-blue-900">On Play effects</p>
                      <p className="text-xs text-gray-700">Trigger immediately when played • Resolve before anything else</p>
                    </div>
                    
                    <div className="p-3 rounded bg-white border border-blue-200">
                      <p className="font-semibold text-sm mb-1 text-blue-900">When Attacking effects</p>
                      <p className="text-xs text-gray-700">Trigger after attack declaration</p>
                    </div>
                    
                    <div className="p-3 rounded bg-white border border-blue-200">
                      <p className="font-semibold text-sm mb-1 text-blue-900">On KO effects</p>
                      <p className="text-xs text-gray-700">Trigger when sent to Trash</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm bg-white rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-blue-100">
                          <th className="p-2 text-left text-blue-900 border border-blue-200">Action</th>
                          <th className="p-2 text-center text-blue-900 border border-blue-200">Allowed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 text-gray-700 border border-blue-200">Attack</td>
                          <td className="p-2 text-center text-gray-900 border border-blue-200">If active</td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="p-2 text-gray-700 border border-blue-200">Block</td>
                          <td className="p-2 text-center text-gray-900 border border-blue-200">If Blocker</td>
                        </tr>
                        <tr>
                          <td className="p-2 text-gray-700 border border-blue-200">Use effects</td>
                          <td className="p-2 text-center text-gray-900 border border-blue-200">As text</td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="p-2 text-gray-700 border border-blue-200">Receive DON</td>
                          <td className="p-2 text-center border border-blue-200">✅</td>
                        </tr>
                        <tr>
                          <td className="p-2 text-gray-700 border border-blue-200">Be KO'd</td>
                          <td className="p-2 text-center border border-blue-200">✅</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Event Cards */}
            <AccordionItem value="event" className="border-2 rounded-lg bg-gradient-to-br from-red-50 to-pink-50 border-red-300">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-red-600" />
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-red-900">🧾 EVENT CARDS</span>
                    <Badge className="text-xs text-white bg-red-600">Most Misplayed</Badge>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2 text-red-900">What Events are:</p>
                    <ul className="space-y-1 text-sm ml-4 text-gray-700">
                      <li>• One-time effects</li>
                      <li>• Usually played from hand</li>
                      <li>• Go to Trash after resolving</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2 text-red-900">When Events can be played:</p>
                    <ul className="space-y-1 text-sm ml-4 text-gray-700">
                      <li>✅ Main Phase</li>
                      <li>✅ Counter Step (if Counter Event)</li>
                      <li>✅ Trigger resolution (if Trigger)</li>
                    </ul>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm bg-white rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-red-100">
                          <th className="p-2 text-left text-red-900 border border-red-200">Situation</th>
                          <th className="p-2 text-center text-red-900 border border-red-200">Allowed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 text-gray-700 border border-red-200">Play during Main Phase</td>
                          <td className="p-2 text-center border border-red-200">✅</td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="p-2 text-gray-700 border border-red-200">Play during opponent turn</td>
                          <td className="p-2 text-center text-gray-900 border border-red-200">Only if Counter</td>
                        </tr>
                        <tr>
                          <td className="p-2 text-gray-700 border border-red-200">Attach DON</td>
                          <td className="p-2 text-center border border-red-200">❌</td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="p-2 text-gray-700 border border-red-200">Stay on field</td>
                          <td className="p-2 text-center border border-red-200">❌</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-3 rounded bg-green-100 border border-green-300">
                    <p className="font-semibold text-sm text-green-900 mb-1">Pro Notes</p>
                    <p className="text-xs text-green-800">Event timing wins games • Don't waste events early</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Stage Cards */}
            <AccordionItem value="stage" className="border-2 rounded-lg bg-gradient-to-br from-green-50 to-teal-50 border-green-300">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-900">🏟 STAGE CARDS</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2 text-green-900">What Stages are:</p>
                    <ul className="space-y-1 text-sm ml-4 text-gray-700">
                      <li>• Permanent field cards</li>
                      <li>• Provide ongoing effects</li>
                      <li>• Stay on field until replaced</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2 text-green-900">Rules:</p>
                    <ul className="space-y-1 text-sm ml-4 text-gray-700">
                      <li>⚠️ Only ONE Stage allowed per player</li>
                      <li>⚠️ New Stage replaces old one</li>
                      <li>✅ Old Stage goes to Trash</li>
                      <li>✅ Can receive DON</li>
                    </ul>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm bg-white rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-green-100">
                          <th className="p-2 text-left text-green-900 border border-green-200">Action</th>
                          <th className="p-2 text-center text-green-900 border border-green-200">Allowed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 text-gray-700 border border-green-200">Attack</td>
                          <td className="p-2 text-center border border-green-200">❌</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="p-2 text-gray-700 border border-green-200">Block</td>
                          <td className="p-2 text-center border border-green-200">❌</td>
                        </tr>
                        <tr>
                          <td className="p-2 text-gray-700 border border-green-200">Provide ongoing effects</td>
                          <td className="p-2 text-center border border-green-200">✅</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="p-2 text-gray-700 border border-green-200">Be KO'd</td>
                          <td className="p-2 text-center text-gray-900 border border-green-200">By effects only</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-3 rounded bg-green-100 border border-green-300">
                    <p className="font-semibold text-sm text-green-900 mb-1">Pro Notes</p>
                    <p className="text-xs text-green-800">Stages are value engines • Protect them from removal</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>
    </div>
  );
}
