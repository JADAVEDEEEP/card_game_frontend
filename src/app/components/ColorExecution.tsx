import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ColorIdentity {
  name: string;
  colorCode: string;
  winCondition: string;
  strengths: string[];
  weaknesses: string[];
  fears: string;
  quote: string;
  moveExecution: {
    moveNum: number;
    moveName: string;
    howThisColorUsesIt: string;
    difference: string;
  }[];
  decisions: {
    situation: string;
    action: string;
    masterpiece: string;
  }[];
}

export function ColorExecution() {
  const colors: ColorIdentity[] = [
    {
      name: "Red",
      colorCode: "#D0021B",
      winCondition: "Aggressive tempo through relentless pressure",
      strengths: [
        "High power characters at low cost",
        "Direct damage and removal",
        "Forces defensive plays",
        "Counter drain effectiveness"
      ],
      weaknesses: [
        "Limited card draw",
        "Vulnerable to board wipes",
        "Runs out of resources quickly",
        "Weak to control strategies"
      ],
      fears: "Blocker walls and life gain",
      quote: "Attack now. Questions later.",
      moveExecution: [
        {
          moveNum: 2,
          moveName: "Life First, Board Later",
          howThisColorUsesIt: "Red attacks life turn 2 every game with high power rush",
          difference: "Other colors wait for board advantage first"
        },
        {
          moveNum: 9,
          moveName: "Counter Drain Turn",
          howThisColorUsesIt: "Red uses low-cost rush characters to force multiple counters",
          difference: "Blue uses single high-power threats instead"
        },
        {
          moveNum: 18,
          moveName: "Counter Math Forcing",
          howThisColorUsesIt: "Red stacks power buffs to exceed single counter value",
          difference: "Black uses inherent high power, no buffs needed"
        },
        {
          moveNum: 24,
          moveName: "The Clock",
          howThisColorUsesIt: "Red has fastest clock - if ahead, always race",
          difference: "Other colors need calculation, Red defaults to racing"
        }
      ],
      decisions: [
        {
          situation: "Opponent has blocker",
          action: "Remove blocker before attacking life",
          masterpiece: "Move #8 - Value Trade"
        },
        {
          situation: "Opponent at 3+ life, full hand",
          action: "Attack life to drain counters",
          masterpiece: "Move #9 - Counter Drain"
        },
        {
          situation: "You have 3+ characters vs 0",
          action: "Go all-in with attacks",
          masterpiece: "Move #27 - Overload"
        }
      ]
    },
    {
      name: "Green",
      colorCode: "#2ECC40",
      winCondition: "Board dominance through ramp and big characters",
      strengths: [
        "DON ramp and acceleration",
        "High power defensive characters",
        "Life gain for sustainability",
        "Best blocker access"
      ],
      weaknesses: [
        "Slow early game",
        "Vulnerable to early aggression",
        "Limited removal options",
        "Needs time to develop"
      ],
      fears: "Fast aggro and removal spam",
      quote: "The longer the game, the more inevitable I become.",
      moveExecution: [
        {
          moveNum: 1,
          moveName: "The DON Bank",
          howThisColorUsesIt: "Green ramps DON through character effects, not just passing",
          difference: "Other colors bank by passing, Green actively generates"
        },
        {
          moveNum: 3,
          moveName: "The Blocker Wall",
          howThisColorUsesIt: "Green has natural blocker synergy with ramp",
          difference: "Green blockers are higher power, harder to remove"
        },
        {
          moveNum: 15,
          moveName: "Trigger Fishing",
          howThisColorUsesIt: "Green wants triggers for free board presence",
          difference: "Green triggers summon high-cost characters free"
        },
        {
          moveNum: 26,
          moveName: "The Inevitability Plan",
          howThisColorUsesIt: "Green builds DON advantage that can't be matched",
          difference: "Green inevitability is resource-based, not combo"
        }
      ],
      decisions: [
        {
          situation: "Turn 1-2",
          action: "Ramp DON, ignore opponent board",
          masterpiece: "Move #1 - DON Bank"
        },
        {
          situation: "Opponent attacking aggressively",
          action: "Deploy blockers and gain life",
          masterpiece: "Move #3 - Blocker Wall"
        },
        {
          situation: "Turn 5+ with DON advantage",
          action: "Deploy multiple big threats",
          masterpiece: "Move #27 - Overload"
        }
      ]
    },
    {
      name: "Blue",
      colorCode: "#0074D9",
      winCondition: "Control and efficiency through counters and bounce",
      strengths: [
        "Best counter access",
        "Bounce and return effects",
        "Card draw and filtering",
        "Tempo control mastery"
      ],
      weaknesses: [
        "Lower power characters",
        "Reactive gameplay required",
        "Needs hand advantage",
        "Weak to resolved threats"
      ],
      fears: "Hand disruption and cannot be countered effects",
      quote: "I don't win fast. I make sure you can't win at all.",
      moveExecution: [
        {
          moveNum: 7,
          moveName: "Event Timing Mastery",
          howThisColorUsesIt: "Blue holds bounce until opponent commits resources",
          difference: "Blue events gain value through timing, not power"
        },
        {
          moveNum: 11,
          moveName: "Priority Steal",
          howThisColorUsesIt: "Blue uses instant-speed counters to steal priority",
          difference: "Blue has most tools to interrupt opponent plans"
        },
        {
          moveNum: 12,
          moveName: "The Board Flip",
          howThisColorUsesIt: "Blue bounces entire board back to hand",
          difference: "Blue resets not destroys - denies triggers"
        },
        {
          moveNum: 25,
          moveName: "Resource Depletion",
          howThisColorUsesIt: "Blue grinds opponent out of all resources slowly",
          difference: "Blue does this through efficiency, not aggression"
        }
      ],
      decisions: [
        {
          situation: "Opponent plays expensive character",
          action: "Bounce it immediately",
          masterpiece: "Move #8 - Value Trade"
        },
        {
          situation: "Opponent overcommits to board",
          action: "Wait then board wipe",
          masterpiece: "Move #12 - Board Flip"
        },
        {
          situation: "Low on life but ahead on cards",
          action: "Life lock at 1-2 life",
          masterpiece: "Move #16 - Life Lock"
        }
      ]
    },
    {
      name: "Purple",
      colorCode: "#B10DC9",
      winCondition: "Inevitability through card advantage and search",
      strengths: [
        "Best search and tutor effects",
        "Deck manipulation mastery",
        "Combo consistency",
        "Card advantage engines"
      ],
      weaknesses: [
        "Relies on specific cards",
        "Vulnerable to disruption",
        "Slower win condition",
        "Needs setup time"
      ],
      fears: "Aggro before setup and hand disruption",
      quote: "I've already drawn the answer. You just don't know it yet.",
      moveExecution: [
        {
          moveNum: 5,
          moveName: "The Search Engine",
          howThisColorUsesIt: "Purple searches every turn, thinning deck rapidly",
          difference: "Purple tutors specific cards, others search categories"
        },
        {
          moveNum: 10,
          moveName: "The DON Trap",
          howThisColorUsesIt: "Purple creates complex decision trees with search",
          difference: "Purple threats come from deck, not hand"
        },
        {
          moveNum: 14,
          moveName: "The Resource Fork",
          howThisColorUsesIt: "Purple searches for exact answer to any response",
          difference: "Purple always has the right card"
        },
        {
          moveNum: 23,
          moveName: "Option Reduction",
          howThisColorUsesIt: "Purple assembles combo that leaves no outs",
          difference: "Purple wins through inevitability, not damage"
        }
      ],
      decisions: [
        {
          situation: "Early game",
          action: "Search and thin deck of combo pieces",
          masterpiece: "Move #5 - Search Engine"
        },
        {
          situation: "Opponent presents threat",
          action: "Search for specific answer",
          masterpiece: "Move #14 - Resource Fork"
        },
        {
          situation: "Turn 6+ with combo ready",
          action: "Execute inevitable win",
          masterpiece: "Move #26 - Inevitability Plan"
        }
      ]
    },
    {
      name: "Black",
      colorCode: "#111111",
      winCondition: "Resource denial and life payment mastery",
      strengths: [
        "Best removal options",
        "Life as resource efficiency",
        "DON manipulation",
        "Disruption and denial"
      ],
      weaknesses: [
        "Self-damage vulnerability",
        "Needs careful life management",
        "Less defensive options",
        "High risk plays"
      ],
      fears: "Life-gain engines and healing",
      quote: "My life is currency. Yours is a countdown.",
      moveExecution: [
        {
          moveNum: 6,
          moveName: "Counter Bait",
          howThisColorUsesIt: "Black threatens with removal, forces defensive plays",
          difference: "Black baits with instant removal, not attacks"
        },
        {
          moveNum: 13,
          moveName: "Leader Ability Lock",
          howThisColorUsesIt: "Black restricts DON to prevent leader abilities",
          difference: "Black actively denies, others make it inefficient"
        },
        {
          moveNum: 19,
          moveName: "Trigger Denial",
          howThisColorUsesIt: "Black removes cards from life before they're triggers",
          difference: "Only Black can directly deny triggers"
        },
        {
          moveNum: 21,
          moveName: "Life Payment Mastery",
          howThisColorUsesIt: "Black pays life for powerful effects aggressively",
          difference: "Black gets best effects for life payment"
        }
      ],
      decisions: [
        {
          situation: "Opponent plays key character",
          action: "Remove it immediately with life payment",
          masterpiece: "Move #21 - Life Payment"
        },
        {
          situation: "Opponent low on life",
          action: "Deny triggers with bottom effects",
          masterpiece: "Move #19 - Trigger Denial"
        },
        {
          situation: "Opponent at 1 life",
          action: "Keep them there, don't kill yet",
          masterpiece: "Move #16 - Life Lock"
        }
      ]
    },
    {
      name: "Yellow",
      colorCode: "#FFDC00",
      winCondition: "Trigger advantage and life manipulation",
      strengths: [
        "Life gain and manipulation",
        "Trigger synergies",
        "Card draw from triggers",
        "Defensive stability"
      ],
      weaknesses: [
        "Lower power output",
        "Slow win condition",
        "Relies on triggers",
        "Vulnerable to denial"
      ],
      fears: "Trigger denial and fast aggro",
      quote: "My life is not HP. It's delayed advantage.",
      moveExecution: [
        {
          moveNum: 2,
          moveName: "Life First, Board Later",
          howThisColorUsesIt: "Yellow wants to fish triggers by losing life intentionally",
          difference: "Yellow gains from taking damage, Red forces opponent to"
        },
        {
          moveNum: 15,
          moveName: "Trigger Fishing",
          howThisColorUsesIt: "Yellow has best trigger effects, wants to flip all",
          difference: "Yellow triggers draw cards + summon, others just summon"
        },
        {
          moveNum: 17,
          moveName: "The Life Swing",
          howThisColorUsesIt: "Yellow converts low life to massive card advantage",
          difference: "Yellow actively wants low life, others tolerate it"
        },
        {
          moveNum: 20,
          moveName: "The Safety Net",
          howThisColorUsesIt: "Yellow gains life to enable another trigger cycle",
          difference: "Yellow uses life gain offensively, not defensively"
        }
      ],
      decisions: [
        {
          situation: "High life (4-5)",
          action: "Let attacks through to fish triggers",
          masterpiece: "Move #15 - Trigger Fishing"
        },
        {
          situation: "Low life (1-2) after triggers",
          action: "Gain life to enable next trigger cycle",
          masterpiece: "Move #20 - Safety Net"
        },
        {
          situation: "All triggers flipped",
          action: "Go aggressive with card advantage",
          masterpiece: "Move #27 - Overload"
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--theme-primary)' }}>
          <Palette className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">COLOR-SPECIFIC EXECUTION</span>
        </div>
        <h1 className="text-4xl font-bold text-white">
          Same Move, Different Color
        </h1>
        <p className="text-lg text-white max-w-2xl mx-auto">
          How each color adapts the 28 Masterpiece Moves
        </p>
      </div>

      {/* Color Tabs */}
      <Tabs defaultValue="Red" className="w-full">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
          {colors.map(color => (
            <TabsTrigger key={color.name} value={color.name}>
              {color.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {colors.map(color => (
          <TabsContent key={color.name} value={color.name} className="space-y-6 mt-6">
            {/* Color Identity Card */}
            <Card className="p-6 border-4" style={{ borderColor: color.colorCode }}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full" style={{ backgroundColor: color.colorCode }} />
                  <div>
                    <h2 className="text-3xl font-bold" style={{ color: color.colorCode }}>
                      {color.name}
                    </h2>
                    <p className="text-gray-600 italic">{color.winCondition}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 pt-4">
                  <div>
                    <h3 className="font-bold text-sm mb-2" style={{ color: '#0A1F44' }}>STRENGTHS</h3>
                    <ul className="space-y-1">
                      {color.strengths.map((strength, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2" style={{ color: '#0A1F44' }}>WEAKNESSES</h3>
                    <ul className="space-y-1">
                      {color.weaknesses.map((weakness, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span style={{ color: '#D0021B' }}>✗</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2" style={{ color: '#0A1F44' }}>FEARS MOST</h3>
                    <p className="text-sm font-semibold" style={{ color: '#D0021B' }}>
                      {color.fears}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pro Quote */}
            <Card className="p-8 text-center border-2" style={{ borderColor: color.colorCode, backgroundColor: '#FFF9F0' }}>
              <p className="text-2xl font-bold italic" style={{ color: color.colorCode }}>
                "{color.quote}"
              </p>
            </Card>

            {/* Move Execution Table */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold" style={{ color: '#0A1F44' }}>
                How {color.name} Executes Masterpiece Moves
              </h3>
              
              <Card className="overflow-hidden border-2" style={{ borderColor: '#C19A6B' }}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead style={{ backgroundColor: color.colorCode }}>
                      <tr>
                        <th className="px-4 py-3 text-left text-white font-bold">Move #</th>
                        <th className="px-4 py-3 text-left text-white font-bold">How {color.name} Uses It</th>
                        <th className="px-4 py-3 text-left text-white font-bold">What Changes vs Other Colors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {color.moveExecution.map((move, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-orange-50'}>
                          <td className="px-4 py-3">
                            <Badge variant="outline" style={{ borderColor: color.colorCode }}>
                              #{move.moveNum} {move.moveName}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {move.howThisColorUsesIt}
                          </td>
                          <td className="px-4 py-3 text-sm italic text-gray-600">
                            {move.difference}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Color-Specific Decisions */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold" style={{ color: '#0A1F44' }}>
                {color.name} Decision Logic (IF X → DO Y)
              </h3>
              
              <div className="grid gap-4">
                {color.decisions.map((decision, index) => (
                  <Card key={index} className="p-4 border-l-4" style={{ borderColor: color.colorCode }}>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-1">IF:</p>
                        <p className="font-semibold" style={{ color: '#0A1F44' }}>
                          {decision.situation}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-1">DO:</p>
                        <p className="font-semibold" style={{ color: color.colorCode }}>
                          {decision.action}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-1">MOVE USED:</p>
                        <Badge variant="outline">
                          {decision.masterpiece}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}