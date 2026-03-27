import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Download } from "lucide-react";
import { Button } from "./ui/button";

export function Cheatsheet() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Quick Reference Cheatsheet
            </h2>
            <p className="text-gray-900">
              All essential rules and timings in one place
            </p>
          </div>
          <Button className="gap-2" style={{ backgroundColor: 'var(--theme-primary)' }}>
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>
      
      {/* Main cheatsheet card */}
      <Card className="p-8 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-4" style={{ borderColor: '#C19A6B' }}>
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  ONE PIECE TCG - Quick Reference
                </h2>
                <p className="text-gray-700">
                  All essential rules and timings in one place
                </p>
              </div>
              <Button className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>
          
          {/* Two column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-4">
              {/* Win Conditions */}
              <div className="bg-white p-4 rounded-lg border-2 border-red-400">
                <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">🏆</span> WIN CONDITIONS
                </h3>
                <ul className="text-xs space-y-1 text-gray-800">
                  <li>• Reduce opponent's Life to 0</li>
                  <li>• Opponent cannot draw when required</li>
                </ul>
              </div>
              
              {/* Turn Structure */}
              <div className="bg-white p-4 rounded-lg border-2 border-blue-400">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">🔄</span> TURN PHASES
                </h3>
                <ol className="text-xs space-y-1 text-gray-800">
                  <li><strong>1. Refresh:</strong> Untap all, return DON!!</li>
                  <li><strong>2. Draw:</strong> Draw 1, add 2 DON!! (1 on turn 1)</li>
                  <li><strong>3. Main:</strong> Play cards, attack, abilities</li>
                  <li><strong>4. End:</strong> Discard to 10, end effects</li>
                </ol>
              </div>
              
              {/* Card Types */}
              <div className="bg-white p-4 rounded-lg border-2 border-purple-400">
                <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">🎴</span> CARD TYPES
                </h3>
                <div className="text-xs space-y-2">
                  <div>
                    <Badge className="bg-yellow-600 text-xs mb-1 text-white">LEADER</Badge>
                    <p className="text-gray-800">Your captain, permanent on field</p>
                  </div>
                  <div>
                    <Badge className="bg-red-600 text-xs mb-1 text-white">CHARACTER</Badge>
                    <p className="text-gray-800">Attack, block, use abilities</p>
                  </div>
                  <div>
                    <Badge className="bg-purple-600 text-xs mb-1 text-white">EVENT</Badge>
                    <p className="text-gray-800">One-time effect, goes to trash</p>
                  </div>
                  <div>
                    <Badge className="bg-green-600 text-xs mb-1 text-white">STAGE</Badge>
                    <p className="text-gray-800">Permanent support, ongoing effects</p>
                  </div>
                </div>
              </div>
              
              {/* DON!! Rules */}
              <div className="bg-white p-4 rounded-lg border-2" style={{ borderColor: '#C19A6B' }}>
                <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: '#C19A6B' }}>
                  <span className="text-xl">⚡</span> DON!! CARDS
                </h3>
                <ul className="text-xs space-y-1 text-gray-800">
                  <li>• Start with 10 DON!! in separate deck</li>
                  <li>• Add 2 per turn (1 on turn 1)</li>
                  <li>• Use to pay costs or attach to Characters</li>
                  <li>• Each attached DON!! = +1000 Power</li>
                  <li>• Active DON!! return each turn</li>
                  <li>• Rested DON!! stay rested</li>
                </ul>
              </div>
            </div>
            
            {/* Right column */}
            <div className="space-y-4">
              {/* Combat */}
              <div className="bg-white p-4 rounded-lg border-2 border-red-400">
                <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">⚔️</span> COMBAT
                </h3>
                <div className="text-xs space-y-2 text-gray-800">
                  <p><strong>Attack Steps:</strong></p>
                  <ol className="space-y-1 ml-3">
                    <li>1. Declare attack (rest attacker)</li>
                    <li>2. Choose target (Leader or Character)</li>
                    <li>3. Defender uses Counter/Blocker</li>
                    <li>4. Compare power</li>
                    <li>5. Resolve damage</li>
                  </ol>
                  <p className="mt-2"><strong>Power Rules:</strong></p>
                  <ul className="space-y-1">
                    <li>• Attacker ≥ Defender = Success</li>
                    <li>• Character KO'd if lose battle</li>
                    <li>• Leader takes Life damage</li>
                  </ul>
                </div>
              </div>
              
              {/* Counter & Blocker */}
              <div className="bg-white p-4 rounded-lg border-2 border-green-400">
                <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">🛡️</span> DEFENSE
                </h3>
                <div className="text-xs space-y-2 text-gray-800">
                  <div>
                    <p><strong>[Counter]</strong></p>
                    <ul className="ml-3 space-y-1">
                      <li>• Play from hand during battle</li>
                      <li>• Add Counter value to defense</li>
                      <li>• No cost paid!</li>
                      <li>• Card goes to trash</li>
                    </ul>
                  </div>
                  <div>
                    <p><strong>[Blocker]</strong></p>
                    <ul className="ml-3 space-y-1">
                      <li>• Intercept attacks on Leader</li>
                      <li>• Must be active (untapped)</li>
                      <li>• Becomes new target</li>
                      <li>• Can add Counter to Blocker!</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Keywords */}
              <div className="bg-white p-4 rounded-lg border-2 border-orange-400">
                <h3 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">⭐</span> KEY ABILITIES
                </h3>
                <div className="text-xs space-y-1 text-gray-800">
                  <p><strong>[Rush]</strong> - Attack immediately</p>
                  <p><strong>[Double Attack]</strong> - Deal 2 Life damage</p>
                  <p><strong>[Banish]</strong> - Remove from game</p>
                  <p><strong>[Strike]</strong> - Can't be KO'd in battle</p>
                  <p><strong>[Blocker]</strong> - Intercept attacks</p>
                  <p><strong>[Counter]</strong> - Use from hand</p>
                </div>
              </div>
              
              {/* Common Mistakes */}
              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">⚠️</span> COMMON MISTAKES
                </h3>
                <ul className="text-xs space-y-1 text-red-800">
                  <li>✗ Attacking with just-played Character</li>
                  <li>✗ Paying cost for Counter cards</li>
                  <li>✗ Forgetting to return active DON!!</li>
                  <li>✗ Multiple Stages with same name</li>
                  <li>✗ Blocking attacks to Characters</li>
                  <li>✗ Not untapping in Refresh Phase</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Bottom Quick Tips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t-2" style={{ borderColor: '#C19A6B' }}>
            <div className="bg-green-100 p-3 rounded border border-green-400">
              <p className="font-bold text-green-900 text-xs mb-1">✓ DECK RULES</p>
              <p className="text-xs text-gray-800">50 cards + 1 Leader, max 4 copies of any card</p>
            </div>
            <div className="bg-blue-100 p-3 rounded border border-blue-400">
              <p className="font-bold text-blue-900 text-xs mb-1">✓ STARTING LIFE</p>
              <p className="text-xs text-gray-800">5 Life cards (face-down from deck)</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded border border-yellow-400">
              <p className="font-bold text-yellow-900 text-xs mb-1">✓ HAND LIMIT</p>
              <p className="text-xs text-gray-800">10 cards (discard in End Phase)</p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center text-xs text-gray-600 pt-2">
            One Piece TCG Quick Reference • Master the Grand Line 🏴‍☠️
          </div>
        </div>
      </Card>
      
      {/* Additional resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-blue-50 border-2 border-blue-300">
          <h4 className="font-bold text-blue-900 mb-2">📱 Keep This Handy</h4>
          <p className="text-sm text-gray-700 mb-3">
            Save this cheatsheet to your device or print it for quick reference during games.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Save Image
          </Button>
        </Card>
        
        <Card className="p-4 bg-purple-50 border-2 border-purple-300">
          <h4 className="font-bold text-purple-900 mb-2">🎯 Practice More</h4>
          <p className="text-sm text-gray-700 mb-3">
            Return to the scenario section to test your knowledge with real situations.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Go to Scenarios
          </Button>
        </Card>
      </div>
    </div>
  );
}