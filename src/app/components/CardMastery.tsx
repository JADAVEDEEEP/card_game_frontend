import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertCircle, CheckCircle, Eye, Clock, Zap, Shield, Swords, XCircle, Target } from "lucide-react";

export function CardMastery() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8" style={{ color: 'var(--theme-primary)' }} />
          <h2 className="text-3xl font-bold text-gray-900">
            ⚔️ The 10-Second Card Mastery System (OPCG)
          </h2>
        </div>
        <p className="text-gray-900">
          Think of every card as answering only 5 questions. If you can answer these in order, you'll never misplay.
        </p>
      </div>

      {/* THE 5 CORE QUESTIONS */}
      <Card className="p-6 transition-all bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-purple-900">🧠 The 5 Core Questions (Universal)</h3>
          </div>
          
          <p className="text-purple-800 font-semibold">👉 If a card fails any of these → effect does NOT happen</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-purple-100">
                  <th className="p-3 text-left font-semibold text-purple-900 border border-purple-200">Order</th>
                  <th className="p-3 text-left font-semibold text-purple-900 border border-purple-200">Question</th>
                  <th className="p-3 text-left font-semibold text-purple-900 border border-purple-200">What to Check Instantly</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 font-bold text-purple-900 border border-purple-200">1️⃣</td>
                  <td className="p-3 font-semibold text-gray-900 border border-purple-200">WHEN does this work?</td>
                  <td className="p-3 text-gray-700 border border-purple-200">On Play / When Attacking / Main / Activate: Main / Counter / Trigger</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="p-3 font-bold text-purple-900 border border-purple-200">2️⃣</td>
                  <td className="p-3 font-semibold text-gray-900 border border-purple-200">WHERE does it work from?</td>
                  <td className="p-3 text-gray-700 border border-purple-200">Hand / Field / Trash / Life</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-purple-900 border border-purple-200">3️⃣</td>
                  <td className="p-3 font-semibold text-gray-900 border border-purple-200">WHO does it affect?</td>
                  <td className="p-3 text-gray-700 border border-purple-200">Self / Opponent / Any Character / Leader</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="p-3 font-bold text-purple-900 border border-purple-200">4️⃣</td>
                  <td className="p-3 font-semibold text-gray-900 border border-purple-200">WHAT changes?</td>
                  <td className="p-3 text-gray-700 border border-purple-200">Power / KO / Rest / Draw / Trash / Don!!</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-purple-900 border border-purple-200">5️⃣</td>
                  <td className="p-3 font-semibold text-gray-900 border border-purple-200">UNTIL WHEN?</td>
                  <td className="p-3 text-gray-700 border border-purple-200">This turn / End of opponent's turn / Permanent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* 3-SECOND CARD READING METHOD */}
      <Card className="p-6 transition-all bg-gradient-to-br from-blue-50 to-sky-50 border-2 border-blue-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-900">⚡ The 3-Second Card Reading Method (In-Match)</h3>
          </div>

          <p className="font-semibold text-blue-900">Read ONLY in this order:</p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-blue-200">
              <Badge className="bg-blue-600 text-white flex-shrink-0">1</Badge>
              <div>
                <p className="font-bold text-blue-900">Bold keywords</p>
                <p className="text-sm text-gray-700">(Rush, Blocker, Banish, Double Attack)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-blue-200">
              <Badge className="bg-blue-600 text-white flex-shrink-0">2</Badge>
              <div>
                <p className="font-bold text-blue-900">Timing text</p>
                <p className="text-sm text-gray-700">(On Play / When Attacking)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-blue-200">
              <Badge className="bg-blue-600 text-white flex-shrink-0">3</Badge>
              <div>
                <p className="font-bold text-blue-900">Cost requirement</p>
                <p className="text-sm text-gray-700">(Don!! x1, trash 1, rest self)</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
            <p className="font-bold text-yellow-900">Ignore flavor text. Ignore card art.</p>
            <p className="text-sm text-gray-700 mt-1">Your brain only needs 3 triggers to decide.</p>
          </div>
        </div>
      </Card>

      {/* MASTER CHEAT-SHEET */}
      <Card className="p-6 transition-all bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-amber-900">🧩 Master Cheat-Sheet (All Conditions)</h3>

          {/* CHARACTER CARDS */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <h4 className="font-bold text-blue-900">CHARACTER CARDS</h4>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-3 text-left font-semibold text-blue-900 border border-blue-200">Term</th>
                    <th className="p-3 text-left font-semibold text-blue-900 border border-blue-200">Meaning</th>
                    <th className="p-3 text-left font-semibold text-blue-900 border border-blue-200">Common Mistake</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { term: 'Play', meaning: 'From hand → field', mistake: 'NOT from trash' },
                    { term: 'On Play', meaning: 'Activates once', mistake: "Doesn't repeat" },
                    { term: 'Rush', meaning: 'Attack same turn', mistake: 'Only works when played' },
                    { term: 'Blocker', meaning: 'Redirect attack', mistake: 'Must rest itself' },
                    { term: 'When Attacking', meaning: 'On declaration', mistake: 'Before counters' },
                    { term: 'KO', meaning: 'Send to trash', mistake: "Power doesn't matter" },
                    { term: 'Rest', meaning: 'Turn sideways', mistake: "Can't attack/block" }
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-blue-50'}>
                      <td className="p-3 font-semibold text-gray-900 border border-blue-200">{row.term}</td>
                      <td className="p-3 text-gray-700 border border-blue-200">{row.meaning}</td>
                      <td className="p-3 text-gray-700 border border-blue-200">{row.mistake}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* EVENT CARDS */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <h4 className="font-bold text-red-900">EVENT CARDS</h4>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-red-100">
                    <th className="p-3 text-left font-semibold text-red-900 border border-red-200">Timing</th>
                    <th className="p-3 text-left font-semibold text-red-900 border border-red-200">Where Used</th>
                    <th className="p-3 text-left font-semibold text-red-900 border border-red-200">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { timing: 'Main', where: 'Your turn', notes: 'Before attacking' },
                    { timing: 'Counter', where: 'Defense step', notes: 'Only during attack' },
                    { timing: 'Trigger', where: 'From Life', notes: 'Free effect' }
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-red-50'}>
                      <td className="p-3 font-semibold text-gray-900 border border-red-200">{row.timing}</td>
                      <td className="p-3 text-gray-700 border border-red-200">{row.where}</td>
                      <td className="p-3 text-gray-700 border border-red-200">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-300">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-900">Important Rule</p>
                <p className="text-sm text-red-800">If it doesn't say Counter, you CANNOT use it in defense.</p>
              </div>
            </div>
          </div>

          {/* DON!! CARDS */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <h4 className="font-bold text-yellow-900">DON!! CARDS</h4>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-yellow-100">
                    <th className="p-3 text-left font-semibold text-yellow-900 border border-yellow-200">Rule</th>
                    <th className="p-3 text-left font-semibold text-yellow-900 border border-yellow-200">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rule: 'Attach in Main', meaning: 'Once per turn' },
                    { rule: '+1000 power', meaning: 'Per Don!!' },
                    { rule: 'Active → Rested', meaning: 'Used Don!! rest' },
                    { rule: 'Don!! -X', meaning: 'Must return/remove' }
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-yellow-50'}>
                      <td className="p-3 font-semibold text-gray-900 border border-yellow-200">{row.rule}</td>
                      <td className="p-3 text-gray-700 border border-yellow-200">{row.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>

      {/* ATTACK FLOW */}
      <Card className="p-6 transition-all bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Swords className="w-6 h-6 text-red-600" />
            <h3 className="text-xl font-bold text-red-900">🧨 Attack Flow (No Confusion)</h3>
          </div>

          <p className="font-semibold text-red-900">This order NEVER changes:</p>

          <div className="space-y-2">
            {[
              'Declare attacker',
              'Choose target (Leader / Rested Character)',
              'Trigger When Attacking',
              'Defender uses Blocker',
              'Defender uses Counters',
              'Compare power',
              'Damage / KO resolves'
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-200">
                <Badge className="bg-red-600 text-white flex-shrink-0">{idx + 1}</Badge>
                <p className="text-gray-800">{step}</p>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-orange-50 border border-orange-300">
            <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-orange-900">👉 Important</p>
              <p className="text-sm text-orange-800">Counters do NOT activate effects unless written</p>
            </div>
          </div>
        </div>
      </Card>

      {/* POWER & BATTLE RULES */}
      <Card className="p-6 transition-all bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-green-900">🔥 Power & Battle Rules</h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-green-100">
                  <th className="p-3 text-left font-semibold text-green-900 border border-green-200">Scenario</th>
                  <th className="p-3 text-left font-semibold text-green-900 border border-green-200">Result</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { scenario: 'Attacker > Defender', result: 'Defender KO' },
                  { scenario: 'Equal power', result: 'Defender survives' },
                  { scenario: 'Leader takes hit', result: 'Life –1' },
                  { scenario: 'Double Attack', result: 'Life –2' },
                  { scenario: 'Banish', result: 'No trigger' }
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-green-50'}>
                    <td className="p-3 font-semibold text-gray-900 border border-green-200">{row.scenario}</td>
                    <td className="p-3 text-gray-700 border border-green-200">{row.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* COMMON CONFUSION CLEARED */}
      <Card className="p-6 transition-all bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-orange-900">🧠 Common Confusion Cleared</h3>

          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border-2 border-orange-200">
              <p className="font-bold text-orange-900 mb-2">❓ Can Leader use tricks?</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <p className="text-sm text-gray-700">Yes — Leader effects follow same rules</p>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <p className="text-sm text-gray-700">Leader cannot attack twice unless stated</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border-2 border-orange-200">
              <p className="font-bold text-orange-900 mb-2">❓ Can I attack Active characters?</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <p className="text-sm text-gray-700">NO</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <p className="text-sm text-gray-700">Only Rested Characters or Leader</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border-2 border-orange-200">
              <p className="font-bold text-orange-900 mb-2">❓ Can I counter a Blocker?</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <p className="text-sm text-gray-700">No — counters protect the final defender</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* MEMORY TRICKS */}
      <Card className="p-6 transition-all bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-bold text-indigo-900">🧬 Memory Tricks (Hard to Forget)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { term: 'Rush', trick: 'Fast Entry' },
              { term: 'Blocker', trick: 'Shield' },
              { term: 'Trigger', trick: 'Surprise' },
              { term: 'Rested', trick: 'Vulnerable' },
              { term: 'Active', trick: 'Safe' },
              { term: 'Trash', trick: 'Dead Zone (unless effect says otherwise)' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-white rounded-lg border-2 border-indigo-200">
                <p className="font-bold text-indigo-900">{item.term}</p>
                <p className="text-sm text-gray-700 mt-1">= {item.trick}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ONE-LOOK CARD CLASSIFIER */}
      <Card className="p-6 transition-all bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-300">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-teal-900">🎯 The "One-Look" Card Classifier</h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-teal-100">
                  <th className="p-3 text-left font-semibold text-teal-900 border border-teal-200">If you see…</th>
                  <th className="p-3 text-left font-semibold text-teal-900 border border-teal-200">Instantly think…</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { see: 'Don!! x1', think: 'Condition gate' },
                  { see: 'Up to 1', think: 'Optional' },
                  { see: 'This turn', think: 'Temporary' },
                  { see: "Opponent's turn", think: 'Defensive' },
                  { see: 'KO a cost X or less', think: 'Removal' }
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-teal-50'}>
                    <td className="p-3 font-mono text-sm text-gray-900 border border-teal-200">{row.see}</td>
                    <td className="p-3 text-gray-700 border border-teal-200">{row.think}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
