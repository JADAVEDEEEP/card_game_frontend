import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, Swords, Shield, Heart, Zap, TrendingUp, Target } from "lucide-react";
import { useState } from "react";

interface MasterpieceMove {
  number: number;
  name: string;
  objective: string;
  when: string;
  actions: string[];
  why: string;
  colors: string[];
  risk: "Low" | "Medium" | "High";
}

export function MasterpieceMoves() {
  const [expandedMove, setExpandedMove] = useState<number | null>(null);

  const openingMoves: MasterpieceMove[] = [
    {
      number: 1,
      name: "The DON Bank",
      objective: "Build DON advantage for explosive turn",
      when: "Turn 1-2",
      actions: [
        "Pass turn without playing characters",
        "Keep 2+ DON floating",
        "Play only if it generates more DON"
      ],
      why: "DON advantage = tempo control entire game",
      colors: ["Blue", "Purple"],
      risk: "Medium"
    },
    {
      number: 2,
      name: "Life First, Board Later",
      objective: "Attack life to fish triggers early",
      when: "Turn 2-3",
      actions: [
        "Ignore opponent board",
        "Attack leader repeatedly",
        "Force counters from hand"
      ],
      why: "Triggers give free board advantage + drain hand",
      colors: ["Red", "Yellow"],
      risk: "Low"
    },
    {
      number: 3,
      name: "The Blocker Wall",
      objective: "Lock opponent out of attacking",
      when: "Turn 2-4",
      actions: [
        "Play multiple low-cost blockers",
        "Keep DON for counter",
        "Make attacks cost too much"
      ],
      why: "Forces inefficient plays or no attacks at all",
      colors: ["Green", "Blue"],
      risk: "Low"
    },
    {
      number: 4,
      name: "Character Rush",
      objective: "Overwhelm with board presence",
      when: "Turn 2-3",
      actions: [
        "Play 2-3 characters same turn",
        "Ignore counters",
        "Force opponent to have answers"
      ],
      why: "Multiple threats = opponent can't remove all",
      colors: ["Red", "Green"],
      risk: "Medium"
    },
    {
      number: 5,
      name: "The Search Engine",
      objective: "Build perfect hand composition",
      when: "Turn 1-3",
      actions: [
        "Use search effects aggressively",
        "Thin deck of key cards",
        "Set up combo pieces"
      ],
      why: "Consistency wins tournaments",
      colors: ["Purple", "Yellow"],
      risk: "Low"
    },
    {
      number: 6,
      name: "Counter Bait",
      objective: "Waste opponent counters on small threats",
      when: "Turn 2-3",
      actions: [
        "Attack with low power first",
        "Make opponent choose",
        "Save big threat for after"
      ],
      why: "Empty hand = free damage later",
      colors: ["Red", "Black"],
      risk: "Low"
    },
    {
      number: 7,
      name: "Event Timing Mastery",
      objective: "Maximize event value",
      when: "Turn 1-3",
      actions: [
        "Hold event until multiple targets",
        "Use during opponent turn when able",
        "Respond to key plays only"
      ],
      why: "1 card affecting 2+ things = advantage",
      colors: ["Blue", "Purple"],
      risk: "Low"
    }
  ];

  const midgameMoves: MasterpieceMove[] = [
    {
      number: 8,
      name: "The Value Trade",
      objective: "Force unfavorable trades",
      when: "Turn 3-5",
      actions: [
        "Attack with expendable characters",
        "Make opponent block with good cards",
        "Accept losing character if they lose more"
      ],
      why: "Card quality > Card quantity",
      colors: ["Red", "Black"],
      risk: "Low"
    },
    {
      number: 9,
      name: "Counter Drain Turn",
      objective: "Empty opponent hand",
      when: "Turn 3-5",
      actions: [
        "Attack even if damage won't land",
        "Force counters repeatedly",
        "Accept zero damage output"
      ],
      why: "Hand collapses → lethal setup next turn",
      colors: ["Red", "Blue"],
      risk: "Low"
    },
    {
      number: 10,
      name: "The DON Trap",
      objective: "Make opponent commit DON suboptimally",
      when: "Turn 3-6",
      actions: [
        "Present multiple threats",
        "Make blocking cost DON",
        "Punish whatever they choose"
      ],
      why: "Used DON = can't respond to real threat",
      colors: ["Purple", "Black"],
      risk: "Medium"
    },
    {
      number: 11,
      name: "Priority Steal",
      objective: "Take initiative at key moment",
      when: "Turn 4-6",
      actions: [
        "Use fast effect to gain priority",
        "Resolve key play before they respond",
        "Lock them out of response window"
      ],
      why: "Priority = deciding what resolves first",
      colors: ["Blue", "Purple"],
      risk: "High"
    },
    {
      number: 12,
      name: "The Board Flip",
      objective: "Remove entire board in one action",
      when: "Turn 4-6",
      actions: [
        "Hold board wipe event",
        "Let opponent overcommit",
        "Wipe when maximum value"
      ],
      why: "Opponent loses tempo + card advantage",
      colors: ["Blue", "Yellow"],
      risk: "Medium"
    },
    {
      number: 13,
      name: "Leader Ability Lock",
      objective: "Prevent leader ability usage",
      when: "Turn 3-6",
      actions: [
        "Keep opponent at wrong DON count",
        "Force DON usage on other things",
        "Make ability cost too high"
      ],
      why: "Leader ability = deck's core engine",
      colors: ["Black", "Purple"],
      risk: "Medium"
    },
    {
      number: 14,
      name: "The Resource Fork",
      objective: "Attack 3+ resources at once",
      when: "Turn 4-6",
      actions: [
        "Play threat that requires response",
        "Make response cost DON + cards",
        "Present follow-up if ignored"
      ],
      why: "No matter what they do, you gain advantage",
      colors: ["Purple", "Black"],
      risk: "Medium"
    }
  ];

  const lifeTriggerMoves: MasterpieceMove[] = [
    {
      number: 15,
      name: "Trigger Fishing",
      objective: "Flip all triggers before opponent",
      when: "Turn 3-7",
      actions: [
        "Attack own life intentionally",
        "Use effects to remove life cards",
        "Flip triggers for free board"
      ],
      why: "Triggers = free cards worth multiple DON",
      colors: ["Yellow", "Green"],
      risk: "High"
    },
    {
      number: 16,
      name: "Life Lock",
      objective: "Keep opponent at 1-2 life",
      when: "Turn 4-7",
      actions: [
        "Stop attacking when they're low",
        "Control their trigger access",
        "Threaten lethal but don't execute"
      ],
      why: "They can't afford to take ANY damage",
      colors: ["Blue", "Black"],
      risk: "High"
    },
    {
      number: 17,
      name: "The Life Swing",
      objective: "Convert life deficit into advantage",
      when: "Turn 4-8",
      actions: [
        "Accept damage freely",
        "Flip triggers for board",
        "Turn low life into aggression"
      ],
      why: "Life = card advantage if used right",
      colors: ["Yellow", "Red"],
      risk: "High"
    },
    {
      number: 18,
      name: "Counter Math Forcing",
      objective: "Make counters mathematically insufficient",
      when: "Turn 5-7",
      actions: [
        "Attack with exactly counter threshold +1",
        "Make single counter not enough",
        "Force 2-card counter or take damage"
      ],
      why: "2 cards to stop 1 attack = losing math",
      colors: ["Red", "Black"],
      risk: "Low"
    },
    {
      number: 19,
      name: "Trigger Denial",
      objective: "Remove life cards before they're triggers",
      when: "Turn 3-6",
      actions: [
        "Use effects that bottom life cards",
        "Deny key triggers",
        "Make their life just cards"
      ],
      why: "Triggers denied = tempo swing denied",
      colors: ["Black", "Purple"],
      risk: "Medium"
    },
    {
      number: 20,
      name: "The Safety Net",
      objective: "Build life cushion for aggressive play",
      when: "Turn 2-4",
      actions: [
        "Gain life through effects",
        "Create buffer before going aggro",
        "Make opponent need more attacks"
      ],
      why: "More life = more aggressive plays available",
      colors: ["Yellow", "Green"],
      risk: "Low"
    },
    {
      number: 21,
      name: "Life Payment Mastery",
      objective: "Use life as resource optimally",
      when: "Turn 3-8",
      actions: [
        "Pay life for powerful effects",
        "Calculate if effect worth life cost",
        "Use life before triggers flip"
      ],
      why: "Life is resource, not win condition",
      colors: ["Purple", "Black"],
      risk: "Medium"
    }
  ];

  const endgameMoves: MasterpieceMove[] = [
    {
      number: 22,
      name: "The Lethal Setup",
      objective: "Create guaranteed kill next turn",
      when: "Turn 6+",
      actions: [
        "Calculate exact lethal",
        "Remove blockers this turn",
        "Reduce opponent options to zero"
      ],
      why: "Guaranteed > Risky",
      colors: ["All"],
      risk: "Low"
    },
    {
      number: 23,
      name: "Option Reduction",
      objective: "Limit responses to 1 bad choice",
      when: "Turn 5+",
      actions: [
        "Present 2 lethal threats",
        "Make them choose which kills them",
        "Win regardless of choice"
      ],
      why: "No good options = guaranteed win",
      colors: ["Black", "Purple"],
      risk: "Low"
    },
    {
      number: 24,
      name: "The Clock",
      objective: "Create faster kill than opponent",
      when: "Turn 5+",
      actions: [
        "Calculate turns to kill each other",
        "If you're faster, race",
        "Ignore their board if you win race"
      ],
      why: "Faster clock = you decide gameplan",
      colors: ["Red", "Black"],
      risk: "Medium"
    },
    {
      number: 25,
      name: "Resource Depletion",
      objective: "Empty all opponent resources at once",
      when: "Turn 6+",
      actions: [
        "Force hand empty",
        "Remove all DON",
        "Clear board",
        "Kill with no responses possible"
      ],
      why: "No resources = no answers",
      colors: ["Blue", "Purple"],
      risk: "High"
    },
    {
      number: 26,
      name: "The Inevitability Plan",
      objective: "Make opponent unable to win long game",
      when: "Turn 5+",
      actions: [
        "Build engine they can't match",
        "Gain advantage every turn",
        "Make time your ally"
      ],
      why: "If you can't lose late, you just survive",
      colors: ["Green", "Yellow"],
      risk: "Low"
    },
    {
      number: 27,
      name: "The Overload",
      objective: "Present more threats than answers exist",
      when: "Turn 6+",
      actions: [
        "Deploy multiple win conditions",
        "Make removal insufficient",
        "Win with whatever survives"
      ],
      why: "3 threats > 2 answers = you win",
      colors: ["Green", "Red"],
      risk: "Medium"
    },
    {
      number: 28,
      name: "The Final Push",
      objective: "All-in for game-ending attack",
      when: "Turn 7+",
      actions: [
        "Commit all resources",
        "Calculate if it's lethal",
        "Accept you lose if it fails"
      ],
      why: "Sometimes only line is go all-in",
      colors: ["All"],
      risk: "High"
    }
  ];

  const renderMoveCard = (move: MasterpieceMove, isExpanded: boolean) => {
    const riskColors = {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-red-100 text-red-800"
    };

    return (
      <Card
        key={move.number}
        className="p-4 cursor-pointer hover:shadow-lg transition-all border-2"
        style={{ borderColor: isExpanded ? '#D0021B' : '#C19A6B' }}
        onClick={() => setExpandedMove(isExpanded ? null : move.number)}
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-white" style={{ backgroundColor: '#0A1F44' }}>
                {move.number}
              </div>
              <div>
                <h3 className="font-bold" style={{ color: '#0A1F44' }}>
                  {move.name}
                </h3>
                <p className="text-xs text-gray-600">{move.objective}</p>
              </div>
            </div>
            <Badge className={riskColors[move.risk]}>
              {move.risk}
            </Badge>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="space-y-3 pt-3 border-t">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">WHEN TO USE:</p>
                <p className="text-sm font-semibold" style={{ color: '#C19A6B' }}>
                  {move.when}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">ACTIONS:</p>
                <ul className="space-y-1">
                  {move.actions.map((action, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span style={{ color: '#D0021B' }}>→</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">WHY IT WINS:</p>
                <p className="text-sm font-semibold" style={{ color: '#0A1F44' }}>
                  {move.why}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">WORKS BEST WITH:</p>
                <div className="flex flex-wrap gap-2">
                  {move.colors.map((color, i) => (
                    <Badge key={i} variant="outline" style={{ borderColor: '#C19A6B' }}>
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!isExpanded && (
            <p className="text-xs text-gray-500 italic">
              Click to expand details...
            </p>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#0A1F44' }}>
          <Trophy className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">MASTERPIECE MOVES</span>
        </div>
        <h1 className="text-4xl font-bold" style={{ color: '#0A1F44' }}>
          28 Masterpiece Moves
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Win Within 50 Actions – Master these tournament-level plays
        </p>
      </div>

      {/* Opening Dominance */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Swords className="w-6 h-6" style={{ color: '#D0021B' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
            Opening Dominance (Moves 1-7)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {openingMoves.map(move => renderMoveCard(move, expandedMove === move.number))}
        </div>
      </section>

      {/* Midgame Control */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6" style={{ color: '#D0021B' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
            Midgame Control (Moves 8-14)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {midgameMoves.map(move => renderMoveCard(move, expandedMove === move.number))}
        </div>
      </section>

      {/* Life & Trigger Control */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Heart className="w-6 h-6" style={{ color: '#D0021B' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
            Life & Trigger Control (Moves 15-21)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lifeTriggerMoves.map(move => renderMoveCard(move, expandedMove === move.number))}
        </div>
      </section>

      {/* Endgame Execution */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6" style={{ color: '#D0021B' }} />
          <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
            Endgame Execution (Moves 22-28)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {endgameMoves.map(move => renderMoveCard(move, expandedMove === move.number))}
        </div>
      </section>

      {/* Footer Tip */}
      <Card className="p-6 border-2 text-center" style={{ borderColor: '#C19A6B', backgroundColor: '#FFF9F0' }}>
        <p className="text-lg">
          <span className="font-bold" style={{ color: '#D0021B' }}>Pro Tip:</span>{" "}
          <span className="font-semibold" style={{ color: '#0A1F44' }}>
            Master 5 moves deeply before learning all 28. Quality execution beats move variety.
          </span>
        </p>
      </Card>
    </div>
  );
}
