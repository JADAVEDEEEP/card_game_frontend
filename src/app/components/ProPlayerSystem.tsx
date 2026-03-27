import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Brain, Target, Shield, Heart, Lock } from "lucide-react";

export function ProPlayerSystem() {
  const resources = [
    {
      icon: Target,
      name: "DON Efficiency",
      explanation: "Maximize value per DON spent",
      attack: "Force inefficient counters or plays"
    },
    {
      icon: Brain,
      name: "Hand (Counters & Events)",
      explanation: "Control card advantage and responses",
      attack: "Empty hand through repeated pressure"
    },
    {
      icon: Shield,
      name: "Board Presence",
      explanation: "Characters that generate value",
      attack: "Remove key blockers and threats"
    },
    {
      icon: Heart,
      name: "Life (Triggers & Tempo)",
      explanation: "Life is a resource, not HP",
      attack: "Attack life to fish triggers early"
    },
    {
      icon: Lock,
      name: "Opponent Options",
      explanation: "Limit what they can respond with",
      attack: "Create no-win situations"
    }
  ];

  const comparisons = [
    {
      situation: "Opponent attacks",
      beginner: "Counter if I can",
      pro: "Calculate if counter loses more than damage"
    },
    {
      situation: "Opponent holds DON",
      beginner: "Worried they have something",
      pro: "Force them to use it inefficiently"
    },
    {
      situation: "You are low on life",
      beginner: "Panic and defend",
      pro: "Check if triggers flip the game"
    },
    {
      situation: "You have lethal next turn",
      beginner: "End turn safely",
      pro: "Reduce opponent options first"
    }
  ];

  const checklist = [
    {
      question: "What resource am I attacking?",
      hint: "Good moves attack 2+ resources"
    },
    {
      question: "Am I forcing a decision?",
      hint: "Make them choose between bad options"
    },
    {
      question: "Am I reducing options?",
      hint: "Less options = easier to predict"
    },
    {
      question: "Is this inevitable or risky?",
      hint: "Inevitability > Risk in most cases"
    },
    {
      question: "Which Masterpiece Move am I executing?",
      hint: "Every action should tie to a win condition"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#0A1F44' }}>
          <Brain className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">PRO PLAYER SYSTEM</span>
        </div>
        <h1 className="text-4xl font-bold" style={{ color: '#0A1F44' }}>
          How Pro Players Think
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform rules knowledge into tournament-level decision making
        </p>
      </div>

      {/* Frame 1: The 5 Resources */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
          The 5 Resources of One Piece TCG
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card key={index} className="p-4 space-y-3 border-2 hover:shadow-lg transition-shadow" style={{ borderColor: '#C19A6B' }}>
                <div className="flex items-center justify-center w-12 h-12 rounded-full" style={{ backgroundColor: '#0A1F44' }}>
                  <Icon className="w-6 h-6 text-yellow-300" />
                </div>
                <h3 className="font-bold" style={{ color: '#0A1F44' }}>
                  {resource.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {resource.explanation}
                </p>
                <div className="pt-2 border-t">
                  <p className="text-xs font-semibold text-gray-500 mb-1">PRO ATTACK:</p>
                  <p className="text-sm" style={{ color: '#D0021B' }}>
                    {resource.attack}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-6 border-2" style={{ borderColor: '#C19A6B', backgroundColor: '#FFF9F0' }}>
          <p className="text-center text-lg">
            <span className="font-bold" style={{ color: '#D0021B' }}>Key Insight:</span>{" "}
            <span className="font-semibold" style={{ color: '#0A1F44' }}>
              A good move attacks 1 resource. A pro move attacks 2 or more.
            </span>
          </p>
        </Card>
      </section>

      {/* Frame 2: Pro vs Beginner Thinking */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
          Pro vs Beginner Thinking
        </h2>
        
        <Card className="overflow-hidden border-2" style={{ borderColor: '#C19A6B' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#0A1F44' }}>
                <tr>
                  <th className="px-4 py-3 text-left text-white font-bold">Situation</th>
                  <th className="px-4 py-3 text-left text-yellow-300 font-bold">Beginner Thinks</th>
                  <th className="px-4 py-3 text-left text-yellow-300 font-bold">Pro Thinks</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((comp, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-orange-50'}>
                    <td className="px-4 py-3 font-semibold" style={{ color: '#0A1F44' }}>
                      {comp.situation}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {comp.beginner}
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: '#D0021B' }}>
                      {comp.pro}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Frame 3: Pro Turn Checklist */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
          The Pro Turn Checklist
        </h2>
        
        <Card className="p-6 space-y-4 border-2" style={{ borderColor: '#C19A6B' }}>
          <p className="text-center text-gray-600 italic">
            Ask yourself these questions before committing to an action
          </p>
          
          <div className="space-y-3">
            {checklist.map((item, index) => (
              <div key={index} className="p-4 rounded-lg border-l-4" style={{ borderColor: '#C19A6B', backgroundColor: '#FFF9F0' }}>
                <p className="font-bold mb-1" style={{ color: '#0A1F44' }}>
                  {index + 1}. {item.question}
                </p>
                <p className="text-sm text-gray-600 italic">
                  💡 {item.hint}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
