import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export function Scenarios() {
  const beginnerScenarios = [
    {
      title: "First Turn Setup",
      difficulty: "Beginner",
      situation: "It's your first turn of the game.",
      question: "What should you do?",
      answer: "1) Refresh Phase - Nothing to untap (skip)\n2) Draw Phase - Draw 1 card, add 1 DON!! (only 1 on turn 1)\n3) Main Phase - Consider playing a low-cost Character or saving DON!! for next turn\n4) End Phase - Pass turn",
      tip: "On turn 1, you only get 1 DON!!, so play wisely!"
    },
    {
      title: "Basic Attack",
      difficulty: "Beginner",
      situation: "You have a 5000 Power Character active. Your opponent's Leader has 5000 Power and 3 Life remaining.",
      question: "You attack the Leader. Opponent plays no Counter. What happens?",
      answer: "Your attack succeeds! (5000 ≥ 5000)\n\nYour opponent takes 1 damage:\n- They take 1 card from their Life area and add it to hand\n- They now have 2 Life remaining\n- Your Character becomes rested",
      tip: "Equal power means the attack succeeds!"
    },
    {
      title: "Using Counter",
      difficulty: "Beginner",
      situation: "Opponent attacks your Leader (5000 Power) with a 6000 Power Character. You have a card with [Counter +2000] in hand.",
      question: "Should you use the Counter?",
      answer: "YES! Use the Counter:\n\nWithout Counter: 5000 < 6000 → You take 1 Life damage\nWith Counter: 5000 + 2000 = 7000 > 6000 → Attack blocked!\n\nYou reveal the Counter card, add +2000 to your Leader's power, and the attack fails. The Counter card goes to trash (you don't pay its cost).",
      tip: "Counter cards are free to use as blockers - you don't pay their cost!"
    },
    {
      title: "DON!! Management",
      difficulty: "Beginner",
      situation: "You have 4 DON!! in your pool. You want to play a 3-cost Character.",
      question: "How many DON!! will you have left, and can you attach any to the Character?",
      answer: "After playing the Character:\n- You spend 3 DON!! to pay the cost\n- You have 1 DON!! remaining\n- YES, you can attach that 1 DON!! to give the Character +1000 Power\n\nFinal state: Character on field with 1 DON!! attached, 0 DON!! in pool",
      tip: "You can use DON!! both to pay costs and to power up Characters!"
    }
  ];

  const intermediateScenarios = [
    {
      title: "Blocker vs Counter",
      difficulty: "Intermediate",
      situation: "Opponent attacks your Leader (5000 Power) with an 8000 Power Character. You have:\n- A Character with [Blocker] and 6000 Power\n- A Counter +2000 card in hand",
      question: "Which defense should you use?",
      answer: "ANALYSIS:\n\nOption 1 - Use Blocker:\n- Blocker intercepts (6000 vs 8000)\n- Blocker is KO'd, but Leader is safe\n- You keep your Counter card\n\nOption 2 - Use Counter on Leader:\n- Leader defends at 7000 (5000 + 2000)\n- Attack still succeeds (8000 > 7000)\n- You take 1 Life damage AND lose Counter card\n\nBEST CHOICE: Use the Blocker! Save Counter for later.",
      tip: "Blockers are often better than Counters when the math doesn't work out!"
    },
    {
      title: "Double Attack Threat",
      difficulty: "Intermediate",
      situation: "Opponent attacks your Leader with a 7000 Power [Double Attack] Character. Your Leader has 5000 Power and you have 2 Life left.",
      question: "What Counter value do you need to survive?",
      answer: "CRITICAL SITUATION:\n\n[Double Attack] deals 2 Life damage instead of 1!\nYou have 2 Life → If attack succeeds, you LOSE THE GAME!\n\nTo block:\n- Opponent's Power: 7000\n- Your Leader: 5000\n- Need: +2000 Counter or higher\n\nWith +2000 Counter: 5000 + 2000 = 7000\n7000 ≥ 7000 → Attack blocked, you survive!\n\nAnything less than +2000 and you lose!",
      tip: "Always check for [Double Attack] - it can end games quickly!"
    },
    {
      title: "Multiple Attackers",
      difficulty: "Intermediate",
      situation: "You have 3 active Characters (all 5000 Power). Opponent's Leader has 5000 Power with 4 Life remaining. You have 3 DON!! available.",
      question: "How should you distribute DON!! and attack?",
      answer: "OPTIMAL STRATEGY:\n\nAttack 1: Character with 2 DON!! attached (7000 Power)\n- 7000 > 5000 → Forces opponent to use Counter or take damage\n\nAttack 2: Character with 1 DON!! attached (6000 Power)\n- 6000 > 5000 → Another threat\n\nAttack 3: Character with 0 DON!! (5000 Power)\n- 5000 = 5000 → Still succeeds!\n\nEven if they block one attack, you're likely to deal 2+ damage total. This puts massive pressure on their Counter cards!",
      tip: "Multiple small attacks can be better than one big attack - it forces opponent to use multiple Counters!"
    },
    {
      title: "Stage Timing",
      difficulty: "Intermediate",
      situation: "Turn 2: You have 3 DON!!. You can play either:\n- A 3-cost Character (5000 Power)\n- A 3-cost Stage (ability: 'Your Characters get +1000 Power')",
      question: "Which should you play?",
      answer: "DEPENDS ON YOUR HAND:\n\nIf you have 2+ Characters in hand:\n→ Play the Stage! It will boost all future Characters\n→ Next turn you can play Characters that are stronger\n\nIf you only have 1 Character:\n→ Play the Character now\n→ Stage is better with multiple Characters to boost\n\nSTAGE VALUE CALCULATION:\n- Stage affects 2 Characters: +2000 total power\n- Stage affects 3+ Characters: Even better!\n\nLong-term investments like Stages pay off if you can protect them.",
      tip: "Stages are investments - they're best when you have cards to follow up!"
    }
  ];

  const advancedScenarios = [
    {
      title: "Stack Resolution",
      difficulty: "Advanced",
      situation: "You attack opponent's 5000 Power Character with your 6000 Power Character. Opponent plays an Event with [Counter] timing: 'Give target Character +3000 Power until end of turn.'",
      question: "Does your attack succeed?",
      answer: "STACK RESOLUTION:\n\n1) You declare attack: 6000 vs 5000\n2) Opponent responds with Event: Target Character becomes 8000\n3) Stack resolves: Counter effect applies first\n4) Compare Power: 6000 vs 8000\n\nRESULT: Attack FAILS (6000 < 8000)\n\nIMPORTANT:\n- Events with [Counter] timing work like Counter cards\n- They can boost power beyond just +1000/+2000\n- Stack resolves opponent's effects before damage\n\nThis is different from regular Counter cards - Events with [Counter] often provide bigger boosts!",
      tip: "Watch out for Event cards with [Counter] timing - they can provide massive boosts!"
    },
    {
      title: "Resource Management",
      difficulty: "Advanced",
      situation: "Turn 4: You have 7 DON!! available. In hand:\n- 4-cost Character (6000 Power)\n- 5-cost Character (8000 Power, [Rush])\n- 3-cost Event: 'Draw 2 cards'",
      question: "What's your optimal play sequence?",
      answer: "OPTIMAL SEQUENCE:\n\n1st: Play 3-cost Event (Draw 2 cards)\n   → 4 DON!! remaining, hand refilled\n\n2nd: Evaluate new cards from draw\n\nOption A (Aggressive):\n- Play 5-cost [Rush] Character (8000 Power)\n- Can't afford 4-cost anymore\n- Can attack immediately with [Rush]\n- Pressure opponent NOW\n\nOption B (Board Development):\n- Play 4-cost Character (6000 Power)\n- Save DON!! for Counter protection\n- Build board more safely\n\nBEST CHOICE: Usually Option A!\nThe [Rush] Character attacks immediately, and you drew 2 cards for future turns. This is tempo advantage!",
      tip: "Draw effects early in your turn give you more options for the rest of the turn!"
    },
    {
      title: "Life as Resource",
      difficulty: "Advanced",
      situation: "You have 1 Life remaining. Opponent attacks with 6000 Power. Your Leader is 5000. You have Counter +2000 and Counter +1000 in hand. Behind the Counter +2000 card is a powerful 7-cost Character.",
      question: "Which Counter should you use, or should you take the damage?",
      answer: "ADVANCED DECISION:\n\nOption 1: Use Counter +1000\n- Block fails (6000 > 6000)\n- Take 1 Life card to hand\n- Now at 0 Life but hand has powerful 7-cost Character\n- Still alive!\n\nOption 2: Use Counter +2000\n- Block succeeds (7000 > 6000)\n- Stay at 1 Life\n- But you used your better Counter\n\nOption 3: Take damage intentionally\n- Add Life card to hand (more resources!)\n- Save both Counters\n- Use them to protect next turn\n\nBEST: Option 1 or 3!\nLife cards become hand cards - they're resources! Don't over-protect Life if you can use it strategically.",
      tip: "Life cards are resources! Sometimes taking damage gives you the cards you need to win!"
    },
    {
      title: "Multi-Block Scenario",
      difficulty: "Advanced",
      situation: "Opponent attacks your Leader with 9000 Power [Double Attack] Character. You have:\n- [Blocker] Character (7000 Power)\n- Counter +2000 in hand\nYou're at 2 Life.",
      question: "How do you survive?",
      answer: "SURVIVAL ANALYSIS:\n\n[Double Attack] + 2 Life = If attack succeeds, YOU LOSE!\n\nCannot use both Blocker AND Counter:\n- Blocker intercepts → becomes target\n- Counter can only boost the blocker OR leader, not both\n\nOPTION 1: Blocker intercepts\n- Battle becomes 7000 vs 9000\n- Add Counter +2000 to Blocker: 9000 vs 9000\n- TIE! Blocker survives, Leader safe! ✓\n\nOPTION 2: Counter on Leader (NO BLOCKER)\n- Leader: 5000 + 2000 = 7000 vs 9000\n- Attack succeeds, 2 Life damage\n- YOU LOSE ✗\n\nCORRECT ANSWER: Use Blocker, then Counter on Blocker!\nThis is the only way to reach 9000 Power defense.",
      tip: "You can use Counter cards to boost your Blocker Characters, not just your Leader!"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold" style={{ color: '#0A1F44' }}>
          Practice Scenarios
        </h2>
        <p className="text-gray-600">
          100+ real game situations to test your knowledge
        </p>
      </div>
      
      <Tabs defaultValue="beginner" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="beginner">
            <div className="flex flex-col items-center gap-1">
              <Badge className="bg-green-600 text-xs">Level 1</Badge>
              <span>Beginner</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="intermediate">
            <div className="flex flex-col items-center gap-1">
              <Badge className="bg-yellow-600 text-xs">Level 2</Badge>
              <span>Intermediate</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <div className="flex flex-col items-center gap-1">
              <Badge className="bg-red-600 text-xs">Level 3</Badge>
              <span>Advanced</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="beginner" className="mt-6">
          <Accordion type="single" collapsible className="space-y-3">
            {beginnerScenarios.map((scenario, index) => (
              <AccordionItem key={index} value={`beginner-${index}`} className="border rounded-lg bg-white">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <Badge className="bg-green-600 shrink-0">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-bold">{scenario.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{scenario.difficulty}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="font-semibold text-blue-900 mb-2">📋 Situation:</p>
                      <p className="text-sm text-gray-700 whitespace-pre-line">{scenario.situation}</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="font-semibold text-purple-900 mb-2">❓ Question:</p>
                      <p className="text-sm text-gray-700">{scenario.question}</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-2 border-green-400">
                      <p className="font-semibold text-green-900 mb-2">✓ Answer:</p>
                      <p className="text-sm text-gray-700 whitespace-pre-line">{scenario.answer}</p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                      <p className="font-semibold text-yellow-900 mb-2">💡 Pro Tip:</p>
                      <p className="text-sm text-gray-700">{scenario.tip}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        
        <TabsContent value="intermediate" className="mt-6">
          <Accordion type="single" collapsible className="space-y-3">
            {intermediateScenarios.map((scenario, index) => (
              <AccordionItem key={index} value={`intermediate-${index}`} className="border rounded-lg bg-white">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <Badge className="bg-yellow-600 shrink-0">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-bold">{scenario.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{scenario.difficulty}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="font-semibold text-blue-900 mb-2">📋 Situation:</p>
                      <p className="text-sm text-gray-700 whitespace-pre-line">{scenario.situation}</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="font-semibold text-purple-900 mb-2">❓ Question:</p>
                      <p className="text-sm text-gray-700">{scenario.question}</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-2 border-green-400">
                      <p className="font-semibold text-green-900 mb-2">✓ Answer:</p>
                      <p className="text-sm text-gray-700 whitespace-pre-line">{scenario.answer}</p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                      <p className="font-semibold text-yellow-900 mb-2">💡 Pro Tip:</p>
                      <p className="text-sm text-gray-700">{scenario.tip}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-6">
          <Accordion type="single" collapsible className="space-y-3">
            {advancedScenarios.map((scenario, index) => (
              <AccordionItem key={index} value={`advanced-${index}`} className="border rounded-lg bg-white">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <Badge className="bg-red-600 shrink-0">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-bold">{scenario.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{scenario.difficulty}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="font-semibold text-blue-900 mb-2">📋 Situation:</p>
                      <p className="text-sm text-gray-700 whitespace-pre-line">{scenario.situation}</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="font-semibold text-purple-900 mb-2">❓ Question:</p>
                      <p className="text-sm text-gray-700">{scenario.question}</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-2 border-green-400">
                      <p className="font-semibold text-green-900 mb-2">✓ Answer:</p>
                      <p className="text-sm text-gray-700 whitespace-pre-line">{scenario.answer}</p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                      <p className="font-semibold text-yellow-900 mb-2">💡 Pro Tip:</p>
                      <p className="text-sm text-gray-700">{scenario.tip}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
      
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2" style={{ borderColor: '#0A1F44' }}>
        <h3 className="text-xl font-bold mb-3" style={{ color: '#0A1F44' }}>
          🎓 Practice Tips
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span style={{ color: '#C19A6B' }} className="font-bold">•</span>
            <span>Work through scenarios in order - each builds on previous concepts</span>
          </li>
          <li className="flex gap-2">
            <span style={{ color: '#C19A6B' }} className="font-bold">•</span>
            <span>Try to answer before revealing the solution</span>
          </li>
          <li className="flex gap-2">
            <span style={{ color: '#C19A6B' }} className="font-bold">•</span>
            <span>Review scenarios that confuse you multiple times</span>
          </li>
          <li className="flex gap-2">
            <span style={{ color: '#C19A6B' }} className="font-bold">•</span>
            <span>Advanced scenarios often have multiple valid strategies - think critically!</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
