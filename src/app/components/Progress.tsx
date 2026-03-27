import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, Star, Target, BookOpen } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function Progress() {
  const [masteredMoves, setMasteredMoves] = useState<number[]>([]);
  const [masteredColors, setMasteredColors] = useState<string[]>([]);
  const [pinnedMoves, setPinnedMoves] = useState<number[]>([1, 2, 9, 22, 27]);

  const allMoves = [
    { num: 1, name: "DON Bank", category: "Opening" },
    { num: 2, name: "Life First", category: "Opening" },
    { num: 3, name: "Blocker Wall", category: "Opening" },
    { num: 4, name: "Character Rush", category: "Opening" },
    { num: 5, name: "Search Engine", category: "Opening" },
    { num: 6, name: "Counter Bait", category: "Opening" },
    { num: 7, name: "Event Timing", category: "Opening" },
    { num: 8, name: "Value Trade", category: "Midgame" },
    { num: 9, name: "Counter Drain", category: "Midgame" },
    { num: 10, name: "DON Trap", category: "Midgame" },
    { num: 11, name: "Priority Steal", category: "Midgame" },
    { num: 12, name: "Board Flip", category: "Midgame" },
    { num: 13, name: "Leader Lock", category: "Midgame" },
    { num: 14, name: "Resource Fork", category: "Midgame" },
    { num: 15, name: "Trigger Fishing", category: "Life/Trigger" },
    { num: 16, name: "Life Lock", category: "Life/Trigger" },
    { num: 17, name: "Life Swing", category: "Life/Trigger" },
    { num: 18, name: "Counter Math", category: "Life/Trigger" },
    { num: 19, name: "Trigger Denial", category: "Life/Trigger" },
    { num: 20, name: "Safety Net", category: "Life/Trigger" },
    { num: 21, name: "Life Payment", category: "Life/Trigger" },
    { num: 22, name: "Lethal Setup", category: "Endgame" },
    { num: 23, name: "Option Reduction", category: "Endgame" },
    { num: 24, name: "The Clock", category: "Endgame" },
    { num: 25, name: "Resource Depletion", category: "Endgame" },
    { num: 26, name: "Inevitability", category: "Endgame" },
    { num: 27, name: "Overload", category: "Endgame" },
    { num: 28, name: "Final Push", category: "Endgame" }
  ];

  const colors = ["Red", "Green", "Blue", "Purple", "Black", "Yellow"];

  const toggleMoveComplete = (moveNum: number) => {
    if (masteredMoves.includes(moveNum)) {
      setMasteredMoves(masteredMoves.filter(m => m !== moveNum));
    } else {
      setMasteredMoves([...masteredMoves, moveNum]);
    }
  };

  const toggleColorComplete = (color: string) => {
    if (masteredColors.includes(color)) {
      setMasteredColors(masteredColors.filter(c => c !== color));
    } else {
      setMasteredColors([...masteredColors, color]);
    }
  };

  const togglePinned = (moveNum: number) => {
    if (pinnedMoves.includes(moveNum)) {
      setPinnedMoves(pinnedMoves.filter(m => m !== moveNum));
    } else if (pinnedMoves.length < 5) {
      setPinnedMoves([...pinnedMoves, moveNum]);
    }
  };

  const getCategoryMoves = (category: string) => {
    return allMoves.filter(move => move.category === category);
  };

  const getCategoryProgress = (category: string) => {
    const categoryMoves = getCategoryMoves(category);
    const masteredInCategory = categoryMoves.filter(move => masteredMoves.includes(move.num)).length;
    return { mastered: masteredInCategory, total: categoryMoves.length };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#0A1F44' }}>
          <TrendingUp className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">PROGRESS & MASTERY</span>
        </div>
        <h1 className="text-4xl font-bold" style={{ color: '#0A1F44' }}>
          Becoming a Pro
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Track your journey from beginner to tournament-level player
        </p>
      </div>

      {/* Overall Progress Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 text-center border-2" style={{ borderColor: '#C19A6B' }}>
          <Star className="w-8 h-8 mx-auto mb-2" style={{ color: '#C19A6B' }} />
          <p className="text-4xl font-bold mb-1" style={{ color: '#0A1F44' }}>
            {masteredMoves.length}/28
          </p>
          <p className="text-sm text-gray-600">Masterpiece Moves Mastered</p>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${(masteredMoves.length / 28) * 100}%`,
                backgroundColor: '#C19A6B'
              }}
            />
          </div>
        </Card>

        <Card className="p-6 text-center border-2" style={{ borderColor: '#C19A6B' }}>
          <Target className="w-8 h-8 mx-auto mb-2" style={{ color: '#C19A6B' }} />
          <p className="text-4xl font-bold mb-1" style={{ color: '#0A1F44' }}>
            {masteredColors.length}/6
          </p>
          <p className="text-sm text-gray-600">Colors Understood</p>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${(masteredColors.length / 6) * 100}%`,
                backgroundColor: '#C19A6B'
              }}
            />
          </div>
        </Card>

        <Card className="p-6 text-center border-2" style={{ borderColor: '#C19A6B' }}>
          <BookOpen className="w-8 h-8 mx-auto mb-2" style={{ color: '#C19A6B' }} />
          <p className="text-4xl font-bold mb-1" style={{ color: '#0A1F44' }}>
            {Math.round(((masteredMoves.length / 28) + (masteredColors.length / 6)) / 2 * 100)}%
          </p>
          <p className="text-sm text-gray-600">Overall Mastery</p>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${((masteredMoves.length / 28) + (masteredColors.length / 6)) / 2 * 100}%`,
                backgroundColor: '#0A1F44'
              }}
            />
          </div>
        </Card>
      </div>

      {/* My Core 5 Moves */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
          My Core 5 Moves
        </h2>
        <p className="text-gray-600">
          Pin your 5 most-used moves for quick reference during gameplay
        </p>
        
        <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
          {pinnedMoves.length === 0 ? (
            <p className="text-center text-gray-500 italic py-8">
              No moves pinned yet. Click star icon on moves below to pin them.
            </p>
          ) : (
            <div className="grid md:grid-cols-5 gap-4">
              {pinnedMoves.map(moveNum => {
                const move = allMoves.find(m => m.num === moveNum);
                return (
                  <div key={moveNum} className="p-4 rounded-lg text-center" style={{ backgroundColor: '#FFF9F0' }}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-2 font-bold text-white" style={{ backgroundColor: '#0A1F44' }}>
                      {moveNum}
                    </div>
                    <p className="font-semibold text-sm" style={{ color: '#0A1F44' }}>
                      {move?.name}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-xs"
                      onClick={() => togglePinned(moveNum)}
                    >
                      Unpin
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </section>

      {/* Masterpiece Moves Progress by Category */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
          Masterpiece Moves Progress
        </h2>

        {["Opening", "Midgame", "Life/Trigger", "Endgame"].map(category => {
          const progress = getCategoryProgress(category);
          const categoryMoves = getCategoryMoves(category);
          
          return (
            <Card key={category} className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{ color: '#0A1F44' }}>
                  {category} ({progress.mastered}/{progress.total})
                </h3>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${(progress.mastered / progress.total) * 100}%`,
                      backgroundColor: '#C19A6B'
                    }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-3">
                {categoryMoves.map(move => {
                  const isCompleted = masteredMoves.includes(move.num);
                  const isPinned = pinnedMoves.includes(move.num);
                  
                  return (
                    <div
                      key={move.num}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        isCompleted ? 'border-green-500 bg-green-50' : 'border-gray-300'
                      }`}
                      onClick={() => toggleMoveComplete(move.num)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                          isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                          {move.num}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePinned(move.num);
                          }}
                          className="text-yellow-500 hover:text-yellow-600"
                        >
                          {isPinned ? <Star className="w-4 h-4 fill-current" /> : <Star className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-xs font-semibold" style={{ color: '#0A1F44' }}>
                        {move.name}
                      </p>
                      {isCompleted && (
                        <Badge className="mt-2 text-xs bg-green-500 text-white">
                          Mastered
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </section>

      {/* Color Understanding */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
          Color Understanding
        </h2>
        <p className="text-gray-600">
          Mark colors you understand deeply - their strengths, weaknesses, and execution styles
        </p>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {colors.map(color => {
            const isCompleted = masteredColors.includes(color);
            const colorCodes: Record<string, string> = {
              Red: "#D0021B",
              Green: "#2ECC40",
              Blue: "#0074D9",
              Purple: "#B10DC9",
              Black: "#111111",
              Yellow: "#FFDC00"
            };
            
            return (
              <Card
                key={color}
                className={`p-6 text-center cursor-pointer transition-all border-4 ${
                  isCompleted ? 'shadow-lg' : ''
                }`}
                style={{ borderColor: isCompleted ? colorCodes[color] : '#E5E5E5' }}
                onClick={() => toggleColorComplete(color)}
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-3"
                  style={{ backgroundColor: colorCodes[color] }}
                />
                <p className="font-bold mb-2" style={{ color: '#0A1F44' }}>
                  {color}
                </p>
                {isCompleted ? (
                  <Badge className="bg-green-500 text-white">
                    ✓ Understood
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    Click to mark
                  </Badge>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      {/* Mastery Levels */}
      <Card className="p-6 border-2" style={{ borderColor: '#C19A6B', backgroundColor: '#FFF9F0' }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#0A1F44' }}>
          Your Current Level
        </h3>
        
        <div className="space-y-3">
          {[
            { level: "Beginner", moves: "0-7", colors: "0-1", desc: "Learning basic rules and moves" },
            { level: "Intermediate", moves: "8-14", colors: "2-3", desc: "Understanding core strategies" },
            { level: "Advanced", moves: "15-21", colors: "4-5", desc: "Executing complex plays" },
            { level: "Pro", moves: "22-28", colors: "6", desc: "Tournament-level mastery" }
          ].map((tier, index) => {
            const movesCompleted = masteredMoves.length;
            const colorsCompleted = masteredColors.length;
            const isCurrentLevel = 
              (movesCompleted >= index * 7 && movesCompleted < (index + 1) * 7) ||
              (index === 3 && movesCompleted >= 22);
            
            return (
              <div
                key={tier.level}
                className={`p-4 rounded-lg border-2 ${
                  isCurrentLevel ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold" style={{ color: '#0A1F44' }}>
                      {tier.level}
                    </p>
                    <p className="text-sm text-gray-600">{tier.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Moves: {tier.moves}</p>
                    <p className="text-sm text-gray-600">Colors: {tier.colors}</p>
                  </div>
                </div>
                {isCurrentLevel && (
                  <Badge className="mt-2 bg-yellow-500 text-white">
                    Current Level
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
