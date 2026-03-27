import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Target, Shield, Sword } from "lucide-react";

export function CombatSystem() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">
          Combat System
        </h2>
        <p className="text-gray-900">
          Master attacking, blocking, and battle mechanics
        </p>
      </div>
      
      {/* Attack Flow */}
      <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300">
        <div className="flex items-center gap-3 mb-4">
          <Sword className="w-8 h-8 text-red-600" />
          <h3 className="text-2xl font-bold text-red-900">
            Attack Sequence
          </h3>
        </div>
        
        <div className="space-y-3">
          {[
            {
              step: "1",
              title: "Declare Attack",
              description: "Choose an active (untapped) Character or Leader to attack with. Rest it (turn sideways).",
              color: "bg-red-100 border-red-300 text-red-900"
            },
            {
              step: "2",
              title: "Choose Target",
              description: "Attack opponent's Leader OR an active Character. You can only attack rested Characters if you have a specific effect.",
              color: "bg-orange-100 border-orange-300 text-orange-900"
            },
            {
              step: "3",
              title: "Opponent Counter Phase",
              description: "Defender can play [Counter] cards from hand or use blocker Characters to increase defense.",
              color: "bg-yellow-100 border-yellow-300 text-yellow-900"
            },
            {
              step: "4",
              title: "Compare Power",
              description: "Attacker's Power vs Defender's Power (+ Counter bonuses). Higher or equal power wins!",
              color: "bg-green-100 border-green-300 text-green-900"
            },
            {
              step: "5",
              title: "Resolve Damage",
              description: "If attack succeeds: deal damage to Leader (take Life cards) or KO defending Character.",
              color: "bg-blue-100 border-blue-300 text-blue-900"
            }
          ].map((item) => (
            <div key={item.step} className={`p-4 rounded-lg border ${item.color}`}>
              <div className="flex items-start gap-3">
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                  {item.step}
                </div>
                <div className="space-y-1">
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Counter/Block System */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-2 border-blue-300">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-bold" style={{ color: '#0A1F44' }}>
              Counter Cards
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded border border-blue-200">
              <p className="font-semibold text-blue-900 text-sm mb-2">What are Counter Cards?</p>
              <p className="text-xs text-gray-700">
                Cards with [Counter] can be played from your hand during your opponent's attack to boost defense power.
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="font-semibold text-sm" style={{ color: '#0A1F44' }}>How to Use:</p>
              <ul className="space-y-1 text-xs text-gray-700">
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Reveal card from hand showing Counter value</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Add Counter power to defending Character/Leader</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Card goes to trash after use</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Can use multiple Counters in one battle!</span>
                </li>
              </ul>
            </div>
            
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <p className="text-xs font-semibold text-yellow-900">
                💡 You don't pay the card cost when using as Counter!
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-2 border-green-300">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-green-600" />
            <h3 className="text-xl font-bold" style={{ color: '#0A1F44' }}>
              Blocker Ability
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded border border-green-200">
              <p className="font-semibold text-green-900 text-sm mb-2">What is [Blocker]?</p>
              <p className="text-xs text-gray-700">
                Characters with [Blocker] can intercept attacks targeting your Leader, becoming the new target instead.
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="font-semibold text-sm" style={{ color: '#0A1F44' }}>How Blocker Works:</p>
              <ul className="space-y-1 text-xs text-gray-700">
                <li className="flex gap-2">
                  <span className="text-green-600">•</span>
                  <span>Only works when opponent attacks your Leader</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">•</span>
                  <span>Blocker must be active (untapped)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">•</span>
                  <span>Blocker becomes the new target of the attack</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">•</span>
                  <span>Multiple blockers can't block the same attack</span>
                </li>
              </ul>
            </div>
            
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <p className="text-xs font-semibold text-yellow-900">
                💡 Blockers are essential for protecting your Leader!
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Power Calculation */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2" style={{ borderColor: '#C19A6B' }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#0A1F44' }}>
          ⚔️ Power Calculation Examples
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border-2 border-green-400">
              <Badge className="mb-3 bg-green-600">✓ Successful Attack</Badge>
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Attacker: 6000 Power</p>
                <p className="text-gray-600">Defender: 5000 + 1000 Counter = 6000</p>
                <p className="text-green-700 font-bold mt-2">6000 ≥ 6000 → Attack Succeeds!</p>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg border-2 border-red-400">
              <Badge className="mb-3 bg-red-600">✗ Failed Attack</Badge>
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Attacker: 5000 Power</p>
                <p className="text-gray-600">Defender: 4000 + 2000 Counter = 6000</p>
                <p className="text-red-700 font-bold mt-2">5000 &lt; 6000 → Attack Fails!</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
            <p className="font-semibold text-yellow-900 mb-2">Important Rules:</p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-yellow-600">•</span>
                <span>Attacker needs EQUAL OR HIGHER power to succeed</span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-600">•</span>
                <span>If attack fails, nothing happens (no damage, no KO)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-600">•</span>
                <span>Characters don't take damage - they're either KO'd or survive</span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-600">•</span>
                <span>DON!! attached to Characters adds +1000 Power per DON!!</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
      
      {/* Special Attack Rules */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4" style={{ color: '#0A1F44' }}>
          🎯 Special Combat Keywords
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-300">
            <Badge className="mb-2 bg-red-600">[Double Attack]</Badge>
            <p className="text-sm text-gray-700">
              When attacking Leader, deal 2 Life damage instead of 1
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-300">
            <Badge className="mb-2 bg-orange-600">[Rush]</Badge>
            <p className="text-sm text-gray-700">
              Can attack the same turn it's played (ignores summoning sickness)
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-300">
            <Badge className="mb-2 bg-purple-600">[Banish]</Badge>
            <p className="text-sm text-gray-700">
              When this KOs a Character, that Character is removed from game instead of going to trash
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-300">
            <Badge className="mb-2 bg-blue-600">[Strike]</Badge>
            <p className="text-sm text-gray-700">
              This Character cannot be KO'd in battle (though attack can still fail)
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}