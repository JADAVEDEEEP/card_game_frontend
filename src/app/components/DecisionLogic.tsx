import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Repeat, Swords, Shield, Zap, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Decision {
  situation: string;
  boardCondition: string;
  handCondition: string;
  action: string;
  masterpieceMove: string;
  why: string;
}

export function DecisionLogic() {
  const attackDecisions: Decision[] = [
    {
      situation: "Opponent has more cards than you",
      boardCondition: "Any board state",
      handCondition: "You: 2-3 cards | Them: 4+ cards",
      action: "Attack Leader repeatedly",
      masterpieceMove: "#2 - Life First, Board Later",
      why: "Counters disappear faster than life. Force them to use card advantage defensively."
    },
    {
      situation: "Opponent has 1 blocker, you have lethal",
      boardCondition: "You have multiple attackers",
      handCondition: "Any",
      action: "Remove blocker first, then attack leader",
      masterpieceMove: "#8 - Value Trade",
      why: "Guaranteed damage > hoping blocker doesn't counter. Always clear path to lethal."
    },
    {
      situation: "You're ahead on board",
      boardCondition: "You: 3+ characters | Them: 0-1 character",
      handCondition: "Any",
      action: "Attack with all characters at once",
      masterpieceMove: "#27 - Overload",
      why: "More threats than answers exist. Even if some are blocked/countered, some get through."
    },
    {
      situation: "Opponent at 1 life",
      boardCondition: "You have guaranteed lethal",
      handCondition: "Opponent: Unknown hand size",
      action: "DON'T attack - keep them at 1 life",
      masterpieceMove: "#16 - Life Lock",
      why: "At 1 life, they can't take ANY damage. This forces extremely defensive plays."
    },
    {
      situation: "You need to force counters",
      boardCondition: "Any",
      handCondition: "Opponent has full hand",
      action: "Attack with lowest power character first",
      masterpieceMove: "#6 - Counter Bait",
      why: "If they counter small threat, bigger threats become free. If they don't, damage lands."
    },
    {
      situation: "Opponent has DON floating",
      boardCondition: "They have 2+ unused DON",
      handCondition: "They likely have counter/event",
      action: "Attack with expendable character to test",
      masterpieceMove: "#10 - DON Trap",
      why: "Force them to use DON before committing your important plays."
    }
  ];

  const counterDecisions: Decision[] = [
    {
      situation: "Attack won't kill your character",
      boardCondition: "Your character survives",
      handCondition: "You have counter in hand",
      action: "DON'T counter - save it",
      masterpieceMove: "#14 - Resource Fork",
      why: "Counter saved = option retained. Your character survives anyway, so counter is wasted."
    },
    {
      situation: "Attack kills important character",
      boardCondition: "Character provides ongoing value",
      handCondition: "You have counter",
      action: "Counter immediately",
      masterpieceMove: "#8 - Value Trade",
      why: "Important character > counter card. Ongoing value worth protecting."
    },
    {
      situation: "Multiple attacks coming",
      boardCondition: "Opponent has 3+ attackers",
      handCondition: "You have 1-2 counters",
      action: "Save counters for life damage only",
      masterpieceMove: "#9 - Counter Drain Turn",
      why: "Not enough counters to stop all attacks. Protect life, let board take hits."
    },
    {
      situation: "You're at 1 life",
      boardCondition: "Any",
      handCondition: "You have counter",
      action: "Counter ANY damage to life",
      masterpieceMove: "#16 - Life Lock",
      why: "At 1 life, you lose to any damage. Counter everything or you lose."
    },
    {
      situation: "Attack is exactly at counter threshold",
      boardCondition: "Attack power matches your counter value",
      handCondition: "You have single counter",
      action: "Counter it",
      masterpieceMove: "#18 - Counter Math Forcing",
      why: "If you don't counter, damage lands. This is what counters are for - exact math stops."
    },
    {
      situation: "You have lethal next turn",
      boardCondition: "You win if you untap",
      handCondition: "Multiple counters in hand",
      action: "Use ALL counters to survive",
      masterpieceMove: "#22 - Lethal Setup",
      why: "Who cares about card efficiency if you're winning next turn? Survive at any cost."
    }
  ];

  const blockerDecisions: Decision[] = [
    {
      situation: "Opponent attacks with weak character",
      boardCondition: "You have blocker",
      handCondition: "Any",
      action: "Block only if blocker survives",
      masterpieceMove: "#8 - Value Trade",
      why: "Don't trade good blocker for weak attacker. Block if you keep the blocker."
    },
    {
      situation: "Multiple attacks coming at life",
      boardCondition: "You have 1 blocker",
      handCondition: "Low on counters",
      action: "Block first attack, save life",
      masterpieceMove: "#3 - Blocker Wall",
      why: "Blocker stops 1 attack worth of damage. Use it to protect most valuable resource."
    },
    {
      situation: "Opponent has lethal if blocker removed",
      boardCondition: "Blocker is your only defense",
      handCondition: "No counters",
      action: "DON'T attack with blocker - keep it back",
      masterpieceMove: "#22 - Lethal Setup",
      why: "Blocker attacking means opponent has free lethal. Defense > offense here."
    },
    {
      situation: "You have lethal next turn",
      boardCondition: "Multiple blockers",
      handCondition: "Any",
      action: "Block everything to survive",
      masterpieceMove: "#22 - Lethal Setup",
      why: "You win next turn - survive at any cost. Trade all blockers if needed."
    },
    {
      situation: "Opponent attacks with DON boost",
      boardCondition: "Your blocker dies to boosted attack",
      handCondition: "Any",
      action: "DON'T block - let damage through",
      masterpieceMove: "#8 - Value Trade",
      why: "They used DON + character. You'd lose blocker for temporary boost. Bad trade."
    },
    {
      situation: "Building blocker wall",
      boardCondition: "You have 2+ blockers",
      handCondition: "Any",
      action: "Don't attack with blockers",
      masterpieceMove: "#3 - Blocker Wall",
      why: "Blocker wall locks opponent out. Keep defensive formation."
    }
  ];

  const donDecisions: Decision[] = [
    {
      situation: "Turn 1-2 early game",
      boardCondition: "Empty board",
      handCondition: "Good cards but expensive",
      action: "Bank DON by playing nothing",
      masterpieceMove: "#1 - DON Bank",
      why: "DON advantage turn 3-4 wins games. Early tempo less important."
    },
    {
      situation: "You can play character OR keep DON for counter",
      boardCondition: "Any",
      handCondition: "You have counter in hand",
      action: "If opponent has threats, keep DON for counter",
      masterpieceMove: "#14 - Resource Fork",
      why: "Options > tempo. Keeping DON gives flexibility."
    },
    {
      situation: "Opponent has important character",
      boardCondition: "They have key engine piece",
      handCondition: "You have removal event",
      action: "Use DON on removal immediately",
      masterpieceMove: "#13 - Leader Ability Lock",
      why: "Key character removed = their plan fails. Worth all DON."
    },
    {
      situation: "You're at max DON for leader ability",
      boardCondition: "Any",
      handCondition: "Any",
      action: "Use leader ability before doing anything else",
      masterpieceMove: "#5 - Search Engine",
      why: "Leader ability is deck's core power. Use it every turn you can."
    },
    {
      situation: "You have lethal if opponent doesn't block",
      boardCondition: "Enough attackers for lethal",
      handCondition: "DON available",
      action: "Use DON to boost attacks above blocker power",
      masterpieceMove: "#22 - Lethal Setup",
      why: "Lethal is lethal. Commit all resources to secure win."
    },
    {
      situation: "Opponent's turn with DON floating",
      boardCondition: "Any",
      handCondition: "You have instant-speed counter/event",
      action: "Keep DON open to respond",
      masterpieceMove: "#11 - Priority Steal",
      why: "Instant responses > proactive plays when opponent has initiative."
    }
  ];

  const renderDecisionCard = (decision: Decision, index: number) => (
    <Card key={index} className="p-6 space-y-4 border-2 hover:shadow-lg transition-shadow" style={{ borderColor: '#C19A6B' }}>
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-2" style={{ backgroundColor: '#FFF9F0' }}>
              <span className="text-xs font-bold text-gray-500">SITUATION</span>
            </div>
            <p className="font-bold text-lg" style={{ color: '#0A1F44' }}>
              {decision.situation}
            </p>
          </div>
          <Badge className="shrink-0" variant="outline" style={{ borderColor: '#D0021B', color: '#D0021B' }}>
            {decision.masterpieceMove}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFF9F0' }}>
            <p className="text-xs font-bold text-gray-500 mb-1">BOARD CONDITION</p>
            <p className="text-sm">{decision.boardCondition}</p>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFF9F0' }}>
            <p className="text-xs font-bold text-gray-500 mb-1">HAND CONDITION</p>
            <p className="text-sm">{decision.handCondition}</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t space-y-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded mb-2" style={{ backgroundColor: '#D0021B' }}>
            <span className="text-xs font-bold text-white">RECOMMENDED ACTION</span>
          </div>
          <p className="font-bold text-lg" style={{ color: '#D0021B' }}>
            {decision.action}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-500 mb-1">WHY THIS IS CORRECT:</p>
          <p className="text-sm text-gray-700">
            {decision.why}
          </p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#0A1F44' }}>
          <Repeat className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">DECISION LOGIC</span>
        </div>
        <h1 className="text-4xl font-bold" style={{ color: '#0A1F44' }}>
          Pro Decision Logic
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          IF X → DO Y: Clear decision trees for every game situation
        </p>
      </div>

      {/* Decision Panels */}
      <Tabs defaultValue="attack" className="w-full">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
          <TabsTrigger value="attack" className="gap-2">
            <Swords className="w-4 h-4" />
            Attack
          </TabsTrigger>
          <TabsTrigger value="counter" className="gap-2">
            <Shield className="w-4 h-4" />
            Counter
          </TabsTrigger>
          <TabsTrigger value="blocker" className="gap-2">
            <Target className="w-4 h-4" />
            Blocker
          </TabsTrigger>
          <TabsTrigger value="don" className="gap-2">
            <Zap className="w-4 h-4" />
            DON
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attack" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
              Attack Decisions
            </h2>
            <div className="grid gap-4">
              {attackDecisions.map((decision, index) => renderDecisionCard(decision, index))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="counter" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
              Counter Decisions
            </h2>
            <div className="grid gap-4">
              {counterDecisions.map((decision, index) => renderDecisionCard(decision, index))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="blocker" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
              Blocker Decisions
            </h2>
            <div className="grid gap-4">
              {blockerDecisions.map((decision, index) => renderDecisionCard(decision, index))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="don" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
              DON Decisions
            </h2>
            <div className="grid gap-4">
              {donDecisions.map((decision, index) => renderDecisionCard(decision, index))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom Tip */}
      <Card className="p-6 border-2 text-center" style={{ borderColor: '#C19A6B', backgroundColor: '#FFF9F0' }}>
        <p className="text-lg">
          <span className="font-bold" style={{ color: '#D0021B' }}>Pro Tip:</span>{" "}
          <span className="font-semibold" style={{ color: '#0A1F44' }}>
            These decisions assume optimal play. In actual games, read your opponent and adjust.
          </span>
        </p>
      </Card>
    </div>
  );
}
