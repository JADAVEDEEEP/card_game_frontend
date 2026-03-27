import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export function DecisionTables() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold" style={{ color: '#0A1F44' }}>
          Decision Tables & Logic
        </h2>
        <p className="text-gray-600">
          If-then scenarios for common game situations
        </p>
      </div>
      
      {/* Priority Table */}
      <Card className="p-6 overflow-x-auto">
        <h3 className="text-xl font-bold mb-4" style={{ color: '#0A1F44' }}>
          🎯 Priority & Timing Table
        </h3>
        
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-bold">Situation</TableHead>
              <TableHead className="font-bold">Who Has Priority?</TableHead>
              <TableHead className="font-bold">What Can You Do?</TableHead>
              <TableHead className="font-bold">Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">Your Main Phase</TableCell>
              <TableCell>
                <Badge className="bg-green-600">You</Badge>
              </TableCell>
              <TableCell className="text-sm">
                Play cards, attach DON!!, attack, activate abilities
              </TableCell>
              <TableCell className="text-sm">
                Continue until you pass turn
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Opponent Declares Attack</TableCell>
              <TableCell>
                <Badge className="bg-blue-600">Defender</Badge>
              </TableCell>
              <TableCell className="text-sm">
                Use [Counter] cards or [Blocker] Characters
              </TableCell>
              <TableCell className="text-sm">
                Resolve attack after responses
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">End Phase</TableCell>
              <TableCell>
                <Badge className="bg-purple-600">Both Players</Badge>
              </TableCell>
              <TableCell className="text-sm">
                Trigger end-of-turn effects, use Counters if applicable
              </TableCell>
              <TableCell className="text-sm">
                Pass to next player's turn
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Card Effect Activates</TableCell>
              <TableCell>
                <Badge className="bg-yellow-600">Non-Active Player</Badge>
              </TableCell>
              <TableCell className="text-sm">
                Respond with Counter timing effects
              </TableCell>
              <TableCell className="text-sm">
                Stack resolves, then continue
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      
      {/* Combat Decision Table */}
      <Card className="p-6 overflow-x-auto">
        <h3 className="text-xl font-bold mb-4" style={{ color: '#0A1F44' }}>
          ⚔️ Combat Decision Table
        </h3>
        
        <Table>
          <TableHeader>
            <TableRow className="bg-red-100">
              <TableHead className="font-bold">Attacker Power</TableHead>
              <TableHead className="font-bold">Defender Power</TableHead>
              <TableHead className="font-bold">Counter Added</TableHead>
              <TableHead className="font-bold">Outcome</TableHead>
              <TableHead className="font-bold">What Happens</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">6000</TableCell>
              <TableCell>5000</TableCell>
              <TableCell>
                <Badge variant="outline">None</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-green-600">✓ Success</Badge>
              </TableCell>
              <TableCell className="text-sm">Defender KO'd or Life taken</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">6000</TableCell>
              <TableCell>5000</TableCell>
              <TableCell>
                <Badge>+1000</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-green-600">✓ Success</Badge>
              </TableCell>
              <TableCell className="text-sm">6000 ≥ 6000 → Still succeeds</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">5000</TableCell>
              <TableCell>4000</TableCell>
              <TableCell>
                <Badge>+2000</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-red-600">✗ Fails</Badge>
              </TableCell>
              <TableCell className="text-sm">5000 &lt; 6000 → Attack blocked</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">8000</TableCell>
              <TableCell>Leader 5000</TableCell>
              <TableCell>
                <Badge>+2000 +1000</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-green-600">✓ Success</Badge>
              </TableCell>
              <TableCell className="text-sm">8000 ≥ 8000 → 1 Life damage</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">7000 [Double Attack]</TableCell>
              <TableCell>Leader 5000</TableCell>
              <TableCell>
                <Badge variant="outline">None</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-green-600">✓ Success</Badge>
              </TableCell>
              <TableCell className="text-sm">2 Life damage (Double Attack)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      
      {/* Card Interaction Table */}
      <Card className="p-6 overflow-x-auto">
        <h3 className="text-xl font-bold mb-4" style={{ color: '#0A1F44' }}>
          🃏 Card Play Decision Table
        </h3>
        
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-100">
              <TableHead className="font-bold">I Want To...</TableHead>
              <TableHead className="font-bold">When Can I Do It?</TableHead>
              <TableHead className="font-bold">Requirements</TableHead>
              <TableHead className="font-bold">Restrictions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">Play a Character</TableCell>
              <TableCell>Your Main Phase</TableCell>
              <TableCell className="text-sm">Pay DON!! cost, match color</TableCell>
              <TableCell className="text-sm">Can't attack same turn (unless Rush)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Play an Event</TableCell>
              <TableCell>Your Main Phase (or Counter timing)</TableCell>
              <TableCell className="text-sm">Pay DON!! cost</TableCell>
              <TableCell className="text-sm">Goes to trash after resolving</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Play a Stage</TableCell>
              <TableCell>Your Main Phase</TableCell>
              <TableCell className="text-sm">Pay DON!! cost</TableCell>
              <TableCell className="text-sm">Only 1 copy of same name on field</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Attack with Character</TableCell>
              <TableCell>Your Main Phase</TableCell>
              <TableCell className="text-sm">Character must be active (untapped)</TableCell>
              <TableCell className="text-sm">Character must have been on field since start of turn</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Use Counter Card</TableCell>
              <TableCell>During opponent's attack</TableCell>
              <TableCell className="text-sm">Card must have [Counter] ability</TableCell>
              <TableCell className="text-sm">Goes to trash, no cost paid</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Activate Blocker</TableCell>
              <TableCell>When opponent attacks your Leader</TableCell>
              <TableCell className="text-sm">Character with [Blocker] must be active</TableCell>
              <TableCell className="text-sm">Only 1 blocker per attack</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Attach DON!! to Character</TableCell>
              <TableCell>Your Main Phase</TableCell>
              <TableCell className="text-sm">Have active DON!! in pool</TableCell>
              <TableCell className="text-sm">Each DON!! = +1000 Power</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      
      {/* Quick Reference Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-green-50 border-2 border-green-400">
          <h4 className="font-bold text-green-900 mb-3">✓ You CAN Do This</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Play multiple cards per turn</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Attack with multiple Characters</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Use multiple Counters in one battle</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Activate abilities multiple times if able</span>
            </li>
          </ul>
        </Card>
        
        <Card className="p-4 bg-red-50 border-2 border-red-400">
          <h4 className="font-bold text-red-900 mb-3">✗ You CANNOT Do This</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-red-600">•</span>
              <span>Attack with Character played this turn</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-600">•</span>
              <span>Attack with already-rested Character</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-600">•</span>
              <span>Play during opponent's Main Phase</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-600">•</span>
              <span>Have 2+ Stages with same name</span>
            </li>
          </ul>
        </Card>
        
        <Card className="p-4 bg-yellow-50 border-2 border-yellow-400">
          <h4 className="font-bold text-yellow-900 mb-3">⚠️ Common Mistakes</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-yellow-600">•</span>
              <span>Forgetting summoning sickness</span>
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-600">•</span>
              <span>Not returning active DON!! in Refresh</span>
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-600">•</span>
              <span>Paying cost when using Counter</span>
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-600">•</span>
              <span>Blocking attacks to Characters</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
