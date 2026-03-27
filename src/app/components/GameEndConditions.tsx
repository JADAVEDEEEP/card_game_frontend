import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { AlertCircle, CheckCircle, Trophy, XCircle, AlertTriangle, Users, Clock, Scale, Lightbulb, Target, Skull, Timer, Flag, BookOpen } from "lucide-react";

export function GameEndConditions() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            ALL GAME END CONDITIONS (WIN • LOSE • DRAW)
          </h2>
        </div>
        <p className="text-gray-900">
          Know exactly when and how games end — no confusion
        </p>
      </div>

      {/* 1️⃣ PRIMARY WIN CONDITION */}
      <Card className="p-6 transition-all bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-900">PRIMARY WIN CONDITION (Most Common)</h3>
              <p className="text-lg font-semibold text-green-700">✅ Reduce Opponent's Life to 0</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white border border-green-200">
              <p className="font-semibold mb-2 text-green-900">Condition:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Opponent's Life cards reach 0</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>You deal one more successful damage to their Leader</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white border border-green-200">
              <p className="font-semibold mb-2 text-green-900">What happens:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Opponent loses immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Game ends instantly (no further effects)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white border border-green-200">
            <p className="font-semibold mb-2 text-green-900">Damage can come from:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div className="p-2 rounded bg-green-50 border border-green-100">
                <p className="text-gray-700">• Leader attack</p>
              </div>
              <div className="p-2 rounded bg-green-50 border border-green-100">
                <p className="text-gray-700">• Character attack</p>
              </div>
              <div className="p-2 rounded bg-green-50 border border-green-100">
                <p className="text-gray-700">• Double Attack (counts as 2)</p>
              </div>
            </div>
            <p className="text-sm mt-3 italic text-gray-600">
              ⚠️ Triggers resolve before life card goes to hand, but if life becomes 0 and damage lands → game ends
            </p>
          </div>

          <div className="p-3 rounded-lg bg-green-100 border border-green-300">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-green-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-green-900">Pro Insight</p>
                <p className="text-xs text-green-800">Most games are decided before this happens via hand and board pressure.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 2️⃣ ALTERNATIVE WIN CONDITION */}
      <Card className="p-6 transition-all bg-gradient-to-br from-blue-50 to-sky-50 border-2 border-blue-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-500">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-900">ALTERNATIVE WIN CONDITION (Deck Out)</h3>
              <p className="text-lg font-semibold text-blue-700">✅ Opponent Cannot Draw a Card When Required</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white border border-blue-200">
              <p className="font-semibold mb-2 text-blue-900">Condition:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Opponent must draw a card</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Their Deck is empty</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>No effect replaces or prevents the draw</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white border border-blue-200">
              <p className="font-semibold mb-2 text-blue-900">Common situations:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Start of turn draw</li>
                <li>• Mandatory draw effect</li>
                <li>• Forced draw from card text</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-blue-100 border border-blue-300">
            <p className="font-semibold mb-2 text-blue-900">Important notes:</p>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>✓ Deck must be completely empty</li>
              <li>✓ Searching does NOT cause a loss</li>
              <li>✓ Drawing is what matters, not deck size</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-green-100 border border-green-300">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-green-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-green-900">Pro Insight</p>
                <p className="text-xs text-green-800">Deck-out wins usually happen in control or long games, not aggro.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 3️⃣ SIMULTANEOUS LIFE LOSS */}
      <Card className="p-6 transition-all bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-orange-500">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-orange-900">SIMULTANEOUS LIFE LOSS (Double KO Scenario)</h3>
              <p className="text-lg font-semibold text-orange-700">⚠️ Both Players Reach 0 Life at the Same Time</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white border border-orange-200">
              <p className="font-semibold mb-2 text-orange-900">Possible via:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Double Attack interactions</li>
                <li>• Effects resolving simultaneously</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-orange-100 border-2 border-orange-400">
              <p className="font-bold mb-2 text-orange-900">Official result:</p>
              <p className="text-sm text-orange-800">The <strong>current turn player wins</strong></p>
              <p className="text-xs text-orange-700 mt-1">(This follows general TCG priority rules)</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-orange-100 border border-orange-300">
            <p className="font-semibold text-sm text-orange-900 mb-1">Important</p>
            <p className="text-xs text-orange-800">This situation is rare • Turn order matters</p>
          </div>
        </div>
      </Card>

      {/* 4️⃣ CONCESSION */}
      <Card className="p-6 transition-all bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-500">
              <Flag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">CONCESSION (Manual Loss)</h3>
              <p className="text-lg font-semibold text-gray-700">❌ A Player Concedes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white border border-gray-200">
              <p className="font-semibold mb-2 text-gray-900">Condition:</p>
              <p className="text-sm text-gray-700">A player voluntarily concedes</p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-gray-200">
              <p className="font-semibold mb-2 text-gray-900">Result:</p>
              <ul className="text-sm text-gray-700">
                <li>• That player immediately loses</li>
                <li>• Opponent wins</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white border border-gray-200">
              <p className="font-semibold mb-2 text-gray-900">Notes:</p>
              <ul className="text-sm text-gray-700">
                <li>• Allowed at any time</li>
                <li>• Common in tournament play to save time</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* 5️⃣ ILLEGAL GAME STATE */}
      <Card className="p-6 transition-all bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-red-500">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-900">ILLEGAL GAME STATE / RULE VIOLATION</h3>
              <p className="text-lg font-semibold text-red-700">❌ Loss Due to Illegal Play (Judge Call)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white border border-red-200">
              <p className="font-semibold mb-2 text-red-900">Examples:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Using rested DON!!</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Playing a card without cost</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Resolving effects incorrectly</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Hiding or altering game state</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-red-100 border border-red-300">
              <p className="font-semibold mb-2 text-red-900">Tournament judge may issue:</p>
              <ul className="space-y-1 text-sm text-red-800">
                <li>• Game loss</li>
                <li>• Match loss</li>
                <li>• Disqualification (serious cases)</li>
              </ul>
            </div>
          </div>

          <div className="p-3 rounded bg-red-100 border border-red-300">
            <p className="text-sm text-red-800">
              <strong>Note:</strong> Casual play usually rewinds • Competitive play does not
            </p>
          </div>
        </div>
      </Card>

      {/* 6️⃣ TIME LIMIT */}
      <Card className="p-6 transition-all bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-500">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-900">TIME LIMIT (Tournament Only)</h3>
              <p className="text-lg font-semibold text-purple-700">⚖️ Time Is Called</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white border border-purple-200">
            <p className="font-semibold mb-2 text-purple-900">This depends on tournament rules.</p>
            <p className="text-sm mb-3 text-purple-800">Common outcomes:</p>
            
            <div className="space-y-2 ml-4">
              <div className="p-3 rounded bg-purple-50 border border-purple-200">
                <p className="font-semibold text-sm text-purple-900">1. Player with more remaining life wins</p>
              </div>
              
              <div className="p-3 rounded bg-purple-50 border border-purple-200">
                <p className="font-semibold text-sm mb-1 text-purple-900">2. If life is equal:</p>
                <p className="text-sm text-gray-700">Additional turns (usually 3)</p>
              </div>
              
              <div className="p-3 rounded bg-purple-50 border border-purple-200">
                <p className="font-semibold text-sm mb-1 text-purple-900">3. If still equal:</p>
                <p className="text-sm text-gray-700">Match may be recorded as a draw</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded bg-purple-100 border border-purple-300">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-purple-700 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-purple-800">
                <strong>Important:</strong> This is not a game mechanic • This is a tournament policy outcome
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* 7️⃣ DRAW CONDITIONS */}
      <Card className="p-6 transition-all bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-indigo-500">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-indigo-900">DRAW CONDITIONS (Rare but Possible)</h3>
              <p className="text-lg font-semibold text-indigo-700">🤝 Draw / No Winner</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white border border-indigo-200">
              <p className="font-semibold mb-2 text-indigo-900">Possible when:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Time expires</li>
                <li>• Life totals equal</li>
                <li>• No decisive outcome after extra turns</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="font-semibold mb-2 text-red-900">NOT possible via:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✗ Infinite loops (game rules prevent unresolved loops)</li>
                <li>✗ Both players decking out at the same time (turn player loses first)</li>
              </ul>
            </div>
          </div>

          <div className="p-3 rounded bg-indigo-100 border border-indigo-300">
            <p className="text-sm text-indigo-800">
              <strong>Note:</strong> Draws are extremely rare in One Piece TCG
            </p>
          </div>
        </div>
      </Card>

      {/* 8️⃣ WHAT IS NOT A WIN OR LOSS */}
      <Card className="p-6 transition-all bg-gradient-to-br from-rose-50 to-red-50 border-2 border-rose-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-red-500">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-900">WHAT IS NOT A WIN OR LOSS</h3>
              <p className="text-sm text-red-700">(Common Confusion)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Having more Characters on board",
              "Having more cards in hand",
              "Controlling more zones",
              "Having more DON!!",
              "KO'ing the Leader",
              "Removing all opponent Characters"
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg flex items-start gap-2 bg-white border border-red-200">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg text-center bg-amber-100 border-2 border-amber-400">
            <p className="font-bold text-amber-900">These only enable wins — they are not wins themselves.</p>
          </div>
        </div>
      </Card>

      {/* 9️⃣ FULL SUMMARY TABLE */}
      <Card className="p-6 transition-all bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-teal-500">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-teal-900">FULL SUMMARY TABLE</h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-teal-100">
                  <th className="p-3 text-left font-semibold text-teal-900 border border-teal-200">Situation</th>
                  <th className="p-3 text-left font-semibold text-teal-900 border border-teal-200">Result</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { situation: 'Opponent takes damage at 0 life', result: 'You win', color: 'green' },
                  { situation: 'Opponent cannot draw', result: 'You win', color: 'green' },
                  { situation: 'You cannot draw', result: 'You lose', color: 'red' },
                  { situation: 'Both hit 0 life same time', result: 'Turn player wins', color: 'orange' },
                  { situation: 'You concede', result: 'You lose', color: 'red' },
                  { situation: 'Illegal play (judge)', result: 'You lose', color: 'red' },
                  { situation: 'Time expires, unequal life', result: 'Higher life wins', color: 'blue' },
                  { situation: 'Time expires, equal life', result: 'Draw', color: 'gray' }
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-teal-50'}>
                    <td className="p-3 text-gray-700 border border-teal-200">
                      {row.situation}
                    </td>
                    <td className="p-3 border border-teal-200">
                      <Badge className={`text-white ${
                        row.color === 'green' ? 'bg-green-600' :
                        row.color === 'red' ? 'bg-red-600' :
                        row.color === 'orange' ? 'bg-orange-600' :
                        row.color === 'blue' ? 'bg-blue-600' :
                        'bg-gray-600'
                      }`}>
                        {row.result}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* 🔑 PRO PLAYER UNDERSTANDING */}
      <Card className="p-6 transition-all bg-gradient-to-br from-amber-50 to-yellow-50 border-4 border-amber-400">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-amber-500 to-amber-600">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-900">PRO PLAYER UNDERSTANDING (Most Important)</h3>
            </div>
          </div>

          <div className="p-6 rounded-lg text-center space-y-4 bg-white border-2 border-amber-300">
            <p className="text-xl font-bold text-amber-900">
              You don't win by hitting 0 life.
            </p>
            <p className="text-lg font-semibold text-amber-800">
              You win by removing your opponent's ability to stop you from doing so.
            </p>
            <div className="h-px bg-amber-300 w-3/4 mx-auto my-4"></div>
            <p className="text-base text-amber-800 italic">
              Life total is the final checkpoint, not the battlefield.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
