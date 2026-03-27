import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { AlertCircle, CheckCircle, Info, Zap, XCircle, Lightbulb, Target, Clock, Shield, DollarSign, TrendingUp, Sparkles, Swords } from "lucide-react";

export function DonSystem() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8" style={{ color: 'var(--theme-primary)' }} />
          <h2 className="text-3xl font-bold text-gray-900">
            DON!! System — Resources, Timing & Pro Execution
          </h2>
        </div>
        <p className="text-gray-900">
          Master DON!! management — the difference between good and elite play
        </p>
      </div>

      {/* SECTION 1 - WHAT IS DON!! */}
      <Card className="p-6 transition-all bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Info className="w-6 h-6 text-yellow-600" />
            <h3 className="text-xl font-bold text-yellow-900">DON!! Overview</h3>
          </div>
          
          <div className="space-y-3">
            <p className="text-gray-700">
              DON!! cards are the <strong>only resource system</strong> in One Piece TCG
            </p>
            
            <div className="space-y-2">
              <p className="font-semibold text-yellow-900">Used to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                <li>Pay card costs</li>
                <li>Increase power (+1000 per DON!!)</li>
                <li>Activate effects</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white border border-yellow-200">
              <p className="font-semibold mb-2 text-yellow-900">DON!! exists in two states:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded bg-green-50 border border-green-300">
                  <p className="font-bold text-green-700 mb-1">Active DON!!</p>
                  <p className="text-sm text-green-900">Can be used immediately</p>
                </div>
                <div className="p-3 rounded bg-gray-50 border border-gray-300">
                  <p className="font-bold text-gray-700 mb-1">Rested DON!!</p>
                  <p className="text-sm text-gray-900">Already spent / attached / activated</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-300">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-900">Important Rule</p>
                <p className="text-sm text-red-800">A rested DON!! cannot be used again until next Refresh Phase.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* SECTION 2 - DON!! TURN FLOW */}
      <Card className="p-6 transition-all bg-gradient-to-br from-blue-50 to-sky-50 border-2 border-blue-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-900">DON!! Turn Flow (Timing Matters)</h3>
          </div>

          {/* Visual Timeline */}
          <div className="flex items-center justify-between p-4 rounded-lg overflow-x-auto bg-white border border-blue-200">
            <div className="flex items-center gap-2 min-w-max">
              <div className="text-center px-4 py-2 rounded bg-blue-500 text-white">
                <p className="text-xs font-bold">Refresh</p>
              </div>
              <span className="text-gray-500">→</span>
              <div className="text-center px-4 py-2 rounded bg-blue-500 text-white">
                <p className="text-xs font-bold">Draw</p>
              </div>
              <span className="text-gray-500">→</span>
              <div className="text-center px-4 py-2 rounded bg-yellow-500 text-white">
                <p className="text-xs font-bold">DON!!</p>
              </div>
              <span className="text-gray-500">→</span>
              <div className="text-center px-4 py-2 rounded bg-blue-500 text-white">
                <p className="text-xs font-bold">Main</p>
              </div>
            </div>
          </div>

          {/* DON Rules by Phase Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-3 text-left font-semibold text-blue-900 border border-blue-200">Phase</th>
                  <th className="p-3 text-left font-semibold text-blue-900 border border-blue-200">DON Action Allowed</th>
                  <th className="p-3 text-left font-semibold text-blue-900 border border-blue-200">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 font-medium text-gray-900 border border-blue-200">Refresh</td>
                  <td className="p-3 text-gray-700 border border-blue-200">Rested DON becomes Active</td>
                  <td className="p-3 text-sm text-gray-700 border border-blue-200">Automatic</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="p-3 font-medium text-gray-900 border border-blue-200">Draw</td>
                  <td className="p-3 text-gray-700 border border-blue-200">❌ No DON usage</td>
                  <td className="p-3 text-sm text-gray-700 border border-blue-200">No actions</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-gray-900 border border-blue-200">DON Phase</td>
                  <td className="p-3 text-gray-700 border border-blue-200">Add 2 DON!! (1 going second)</td>
                  <td className="p-3 text-sm text-gray-700 border border-blue-200">Only once per turn</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="p-3 font-medium text-gray-900 border border-blue-200">Main Phase</td>
                  <td className="p-3 text-gray-700 border border-blue-200">Spend / Attach / Rest DON</td>
                  <td className="p-3 text-sm text-gray-700 border border-blue-200">Primary usage</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-gray-900 border border-blue-200">End Phase</td>
                  <td className="p-3 text-gray-700 border border-blue-200">❌ No DON actions</td>
                  <td className="p-3 text-sm text-gray-700 border border-blue-200">Leftover DON stays Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* SECTION 3 - ALL WAYS TO USE DON!! */}
      <Card className="p-6 transition-all bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-300">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-purple-900">All Ways to Use DON!! (Complete List)</h3>
          
          <div className="space-y-4">
            {/* Usage Type 1 */}
            <div className="p-5 rounded-lg transition-all hover:shadow-md bg-white border-2 border-purple-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-600">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="text-white bg-blue-600">1️⃣</Badge>
                    <p className="font-bold text-lg text-gray-900">PAY COSTS</p>
                  </div>
                  <p className="text-sm mb-3 text-gray-700">Rest DON equal to card cost</p>
                  <p className="text-sm font-semibold mb-2 text-gray-900">Applies to:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-purple-300 text-purple-900">Characters</Badge>
                    <Badge variant="outline" className="border-purple-300 text-purple-900">Events</Badge>
                    <Badge variant="outline" className="border-purple-300 text-purple-900">Stages</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Type 2 */}
            <div className="p-5 rounded-lg transition-all hover:shadow-md bg-white border-2 border-purple-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-600">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="text-white bg-green-600">2️⃣</Badge>
                    <p className="font-bold text-lg text-gray-900">ATTACH DON!! (POWER BOOST)</p>
                  </div>
                  <p className="text-sm mb-3 text-gray-700">Attach DON to Leader or Characters</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-gray-800"><strong>+1000 power</strong> per DON attached</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span className="text-gray-800">DON becomes <strong>Rested</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Type 3 */}
            <div className="p-5 rounded-lg transition-all hover:shadow-md bg-white border-2 border-purple-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-600">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="text-white bg-gradient-to-br from-violet-500 to-indigo-600">3️⃣</Badge>
                    <p className="font-bold text-lg text-gray-900">ACTIVATE EFFECTS</p>
                  </div>
                  <p className="text-sm mb-3 text-gray-700">
                    When card text says: <code className="px-2 py-1 rounded font-mono text-xs bg-purple-100 text-purple-900">"You may rest X DON!!"</code>
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold mb-1 text-gray-900">Requirements:</p>
                    <ul className="space-y-1 ml-4 text-gray-700">
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-xs mt-0.5">✓</span>
                        <span>DON must be Active</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-xs mt-0.5">✓</span>
                        <span>Effect resolves immediately</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-xs mt-0.5">✓</span>
                        <span>DON becomes Rested</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* SECTION 4 - ACTIVE vs RESTED DON!! */}
      <Card className="p-6 transition-all bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-teal-600" />
            <h3 className="text-xl font-bold text-teal-900">Active vs Rested DON!! (Most Important)</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-teal-100">
                  <th className="p-3 text-left font-semibold text-teal-900 border border-teal-200">Situation</th>
                  <th className="p-3 text-center font-semibold text-teal-900 border border-teal-200">Allowed?</th>
                  <th className="p-3 text-left font-semibold text-teal-900 border border-teal-200">Explanation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 text-gray-700 border border-teal-200">Use Active DON to pay cost</td>
                  <td className="p-3 text-center border border-teal-200"><span className="text-green-600 font-bold">✅ Yes</span></td>
                  <td className="p-3 text-gray-700 border border-teal-200">Standard</td>
                </tr>
                <tr className="bg-teal-50">
                  <td className="p-3 text-gray-700 border border-teal-200">Use Rested DON to pay cost</td>
                  <td className="p-3 text-center border border-teal-200"><span className="text-red-600 font-bold">❌ No</span></td>
                  <td className="p-3 text-gray-700 border border-teal-200">Illegal</td>
                </tr>
                <tr>
                  <td className="p-3 text-gray-700 border border-teal-200">Attach Active DON to character</td>
                  <td className="p-3 text-center border border-teal-200"><span className="text-green-600 font-bold">✅ Yes</span></td>
                  <td className="p-3 text-gray-700 border border-teal-200">Standard</td>
                </tr>
                <tr className="bg-teal-50">
                  <td className="p-3 text-gray-700 border border-teal-200">Attach Rested DON</td>
                  <td className="p-3 text-center border border-teal-200"><span className="text-red-600 font-bold">❌ No</span></td>
                  <td className="p-3 text-gray-700 border border-teal-200">Illegal</td>
                </tr>
                <tr>
                  <td className="p-3 text-gray-700 border border-teal-200">Rest DON for effect</td>
                  <td className="p-3 text-center border border-teal-200"><span className="text-green-600 font-bold">✅ If Active</span></td>
                  <td className="p-3 text-gray-700 border border-teal-200">Required</td>
                </tr>
                <tr className="bg-teal-50">
                  <td className="p-3 text-gray-700 border border-teal-200">Re-use same DON twice</td>
                  <td className="p-3 text-center border border-teal-200"><span className="text-red-600 font-bold">❌ No</span></td>
                  <td className="p-3 text-gray-700 border border-teal-200">One use per turn</td>
                </tr>
                <tr>
                  <td className="p-3 text-gray-700 border border-teal-200">Float DON unused</td>
                  <td className="p-3 text-center border border-teal-200"><span className="text-green-600 font-bold">✅ Yes</span></td>
                  <td className="p-3 text-gray-700 border border-teal-200">Often correct</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-300">
            <Lightbulb className="w-5 h-5 text-green-700 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-900">PRO NOTE</p>
              <p className="text-sm text-green-800">Leaving DON unused is NOT a mistake. It often represents counters, bluff, or protection.</p>
            </div>
          </div>
        </div>
      </Card>

      {/* SECTION 5 - DON!! & COMBAT */}
      <Card className="p-6 transition-all bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Swords className="w-6 h-6 text-red-600" />
            <h3 className="text-xl font-bold text-red-900">DON!! & Combat (Very Important)</h3>
          </div>

          <div>
            <p className="font-semibold mb-3 text-red-900">DON!! Attach Timing</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-red-100">
                    <th className="p-3 text-left font-semibold text-red-900 border border-red-200">Timing</th>
                    <th className="p-3 text-center font-semibold text-red-900 border border-red-200">Allowed?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 text-gray-700 border border-red-200">Before declaring attack</td>
                    <td className="p-3 text-center border border-red-200"><span className="text-green-600 font-bold">✅ Yes</span></td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="p-3 text-gray-700 border border-red-200">After declaring attacker</td>
                    <td className="p-3 text-center border border-red-200"><span className="text-red-600 font-bold">❌ No</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 border border-red-200">During counter step</td>
                    <td className="p-3 text-center border border-red-200"><span className="text-red-600 font-bold">❌ No</span></td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="p-3 text-gray-700 border border-red-200">After damage</td>
                    <td className="p-3 text-center border border-red-200"><span className="text-red-600 font-bold">❌ No</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white border-2 border-red-200">
            <p className="font-semibold mb-2 text-red-900">DON!! + Attack Flow</p>
            <ol className="list-decimal list-inside space-y-1 ml-4 text-gray-700">
              <li>Declare attack</li>
              <li>Power is locked 🔒</li>
              <li>Blocker step</li>
              <li>Counter step</li>
              <li>Damage</li>
            </ol>
            <p className="text-sm mt-3 font-semibold text-red-900">
              You cannot attach DON after attack declaration.
            </p>
          </div>
        </div>
      </Card>

      {/* SECTION 6 - COMMON MISTAKES */}
      <Card className="p-6 transition-all bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-bold text-orange-900">Common Mistake Alert</h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-orange-800">"I'll attach DON after seeing counters"</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-orange-800">"I can use DON again after resting"</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-orange-800">"I can attach DON during counter step"</p>
            </div>
          </div>

          <p className="font-bold text-orange-900 text-center p-3 rounded bg-orange-100">
            All are illegal plays.
          </p>
        </div>
      </Card>

      {/* SECTION 7 - DON!! & KEYWORDS */}
      <Accordion type="single" collapsible className="space-y-3">
        <AccordionItem value="keywords" className="border-2 border-amber-300 rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <Badge className="bg-amber-600 text-white">
                Advanced
              </Badge>
              <span className="font-bold text-amber-900">DON!! & Special Keywords</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-amber-100">
                    <th className="p-3 text-left font-semibold text-amber-900 border border-amber-200">Keyword</th>
                    <th className="p-3 text-left font-semibold text-amber-900 border border-amber-200">DON Interaction</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { keyword: 'Rush', interaction: 'No DON restriction' },
                    { keyword: 'Double Attack', interaction: 'DON applied normally' },
                    { keyword: 'Banish', interaction: 'DON does not affect' },
                    { keyword: 'Blocker', interaction: 'DON does not change block timing' },
                    { keyword: 'Trigger', interaction: 'DON not usable during trigger' }
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-amber-50'}>
                      <td className="p-3 font-medium text-gray-900 border border-amber-200">{row.keyword}</td>
                      <td className="p-3 text-gray-700 border border-amber-200">{row.interaction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* SECTION 8 - PRO PATTERNS */}
        <AccordionItem value="propatterns" className="border-2 border-pink-300 rounded-lg bg-gradient-to-br from-pink-50 to-rose-50">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <Badge className="bg-pink-600 text-white">
                Pro Play
              </Badge>
              <span className="font-bold text-pink-900">Pro DON Management Patterns</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-4">
              {[
                {
                  title: 'FLOAT DON',
                  points: ['Leave 1–2 DON unused', 'Represents counter/events', 'Forces opponent hesitation']
                },
                {
                  title: 'BREAKPOINT DON',
                  points: ['Spend DON only to cross power thresholds', 'Never over-attach', 'Calculate exact damage']
                },
                {
                  title: 'DON BAIT',
                  points: ['Show Active DON', 'Force opponent misplay', "Don't actually use it"]
                },
                {
                  title: 'PRE-LETHAL DON',
                  points: ['End turn with DON open', 'Bluff protection', 'Execute lethal next turn']
                }
              ].map((pattern, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-white border-2 border-pink-200">
                  <p className="font-bold mb-2 text-pink-900">PRO PATTERN {idx + 1} — {pattern.title}</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                    {pattern.points.map((point, pidx) => (
                      <li key={pidx}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* SECTION 9 - EDGE CASES */}
        <AccordionItem value="edgecases" className="border-2 border-yellow-300 rounded-lg bg-gradient-to-br from-yellow-50 to-amber-50">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <Badge className="bg-yellow-600 text-white">
                Exam Level
              </Badge>
              <span className="font-bold text-yellow-900">DON!! Edge Cases</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-yellow-100">
                    <th className="p-3 text-left font-semibold text-yellow-900 border border-yellow-200">Case</th>
                    <th className="p-3 text-left font-semibold text-yellow-900 border border-yellow-200">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { case: "DON attached to KO'd character", result: 'DON goes to trash' },
                    { case: 'DON attached to bounced card', result: 'DON goes to trash' },
                    { case: 'DON attached to rested Leader', result: 'Leader state unchanged' },
                    { case: 'DON moved between cards', result: '❌ Impossible' },
                    { case: 'DON reused via effect', result: 'Only if card explicitly allows' }
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-yellow-50'}>
                      <td className="p-3 text-gray-700 border border-yellow-200">{row.case}</td>
                      <td className="p-3 text-gray-700 border border-yellow-200">{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* SECTION 10 - QUICK CHEATSHEET */}
      <Card className="p-6 transition-all bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-bold text-indigo-900">Quick DON!! Cheatsheet</h3>
          </div>

          <div className="p-4 rounded-lg bg-white border-2 border-indigo-200">
            <p className="font-bold mb-3 text-indigo-900">DON!! GOLDEN RULES</p>
            <div className="space-y-2">
              {[
                'DON can be used once per turn',
                'DON must be Active',
                'Power locks at attack declaration',
                'Floating DON is often correct',
                'DON management wins games'
              ].map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}