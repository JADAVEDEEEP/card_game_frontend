import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, CircleDot } from "lucide-react";

export function TurnPhases() {
  const phases = [
    {
      name: "Refresh Phase",
      color: "bg-blue-500",
      textColor: "text-blue-900",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      actions: [
        "Untap all rested cards (Characters, Leader, DON!!)",
        "Return active DON!! cards to your DON!! pool",
        "Rested DON!! cards become active again"
      ],
      priority: "No actions allowed during this phase",
      automatic: true
    },
    {
      name: "Draw Phase",
      color: "bg-green-500",
      textColor: "text-green-900",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      actions: [
        "Draw 1 card from your deck",
        "Add 2 DON!! cards from DON!! deck to your pool (1 on turn 1)"
      ],
      priority: "No actions allowed during this phase",
      automatic: true
    },
    {
      name: "Main Phase",
      color: "bg-yellow-500",
      textColor: "text-yellow-900",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      actions: [
        "Play Character cards from hand",
        "Play Stage cards from hand",
        "Play Event cards from hand",
        "Attach DON!! to Characters for power",
        "Use DON!! to pay card costs",
        "Activate card abilities",
        "Attack with your Leader or Characters"
      ],
      priority: "You have priority - make as many actions as you want",
      automatic: false
    },
    {
      name: "End Phase",
      color: "bg-purple-500",
      textColor: "text-purple-900",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      actions: [
        "Check hand size (discard down to 10 if over)",
        "End of turn effects trigger",
        "Pass turn to opponent"
      ],
      priority: "Both players can use [Counter] abilities and effects",
      automatic: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold" style={{ color: '#0A1F44' }}>
          Turn Structure & Phases
        </h2>
        <p className="text-gray-600">
          Every turn follows these four phases in order
        </p>
      </div>
      
      {/* Flow visualization */}
      <div className="flex items-center justify-center gap-4 flex-wrap py-6 px-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-2" style={{ borderColor: '#C19A6B' }}>
        {phases.map((phase, index) => (
          <div key={phase.name} className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className={`${phase.color} text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg`}>
                {index + 1}
              </div>
              <p className="text-xs font-semibold mt-2 text-center max-w-[80px]">
                {phase.name.split(' ')[0]}
              </p>
            </div>
            {index < phases.length - 1 && (
              <ArrowRight className="w-6 h-6 text-gray-400" />
            )}
          </div>
        ))}
      </div>
      
      {/* Detailed phase cards */}
      <div className="space-y-4">
        {phases.map((phase, index) => (
          <Card key={phase.name} className={`p-6 border-l-4 ${phase.borderColor}`}>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`${phase.color} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: '#0A1F44' }}>
                      {phase.name}
                    </h3>
                    <Badge 
                      className={`${phase.bgColor} ${phase.textColor} border ${phase.borderColor} mt-1`}
                    >
                      {phase.automatic ? "Automatic" : "Player Actions"}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-sm mb-2" style={{ color: '#0A1F44' }}>
                    Actions in this phase:
                  </p>
                  <ul className="space-y-2">
                    {phase.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CircleDot className={`w-4 h-4 mt-0.5 ${phase.color.replace('bg-', 'text-')}`} />
                        <span className="text-sm text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`p-3 ${phase.bgColor} rounded-lg border ${phase.borderColor}`}>
                  <p className={`text-sm font-semibold ${phase.textColor}`}>
                    Priority: {phase.priority}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Quick tips */}
      <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
        <h3 className="text-lg font-bold mb-3 text-yellow-900">
          💡 Quick Tips
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">•</span>
            <span>Most gameplay happens in the Main Phase - this is where strategy matters!</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">•</span>
            <span>You can attack multiple times in one turn if you have multiple untapped Characters</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">•</span>
            <span>Remember to discard if you have more than 10 cards in hand during End Phase</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">•</span>
            <span>DON!! attached to Characters stay until end of turn (even if Character attacks)</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
