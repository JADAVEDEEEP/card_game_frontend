import { Button } from "./ui/button";
import { Ship, Anchor, Zap, Compass, Sword, Users } from "lucide-react";

interface SplashPageProps {
  onStart: () => void;
}

export function SplashPage({ onStart }: SplashPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{
      background: 'linear-gradient(to bottom, #60a5fa, #93c5fd)'
    }}>
      <div className="max-w-4xl w-full text-center space-y-10">
        
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black" style={{
            color: '#fbbf24'
          }}>
            ONE PIECE TCG
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Quick Learning Guide
          </h2>
          <p className="text-xl md:text-2xl text-white">
            Master the game with interactive guides and strategies
          </p>
        </div>
        
        {/* Start Button - Luffy Red */}
        <div className="pt-6">
          <Button 
            onClick={onStart}
            size="lg"
            className="px-12 py-8 text-2xl md:text-3xl rounded-xl font-bold text-white"
            style={{ 
              background: '#f97316',
              border: '3px solid white'
            }}
          >
            <Ship className="w-8 h-8 mr-3" />
            SET SAIL!
            <Anchor className="w-8 h-8 ml-3" />
          </Button>
        </div>
        
        {/* Features */}
        <div className="flex flex-wrap justify-center gap-4 pt-8">
          {[
            { icon: Zap, text: 'Interactive Rules' },
            { icon: Compass, text: 'Visual Guides' },
            { icon: Sword, text: 'Pro Strategies' },
            { icon: Users, text: 'Practice Drills' },
          ].map((item, idx) => (
            <div 
              key={idx}
              className="px-6 py-3 rounded-lg font-bold text-white flex items-center gap-2 text-lg"
              style={{
                background: '#ef4444',
                border: '2px solid white'
              }}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
        
        {/* Bottom Message */}
        <div className="pt-6">
          <p className="text-xl font-bold text-white">
            From rookie pirates to legendary champions
          </p>
        </div>
      </div>
    </div>
  );
}