import { Card } from "./ui/card";
import { BookOpen, Map, Layers, Swords, ListChecks, FlaskConical, Table, FileText, Info, Brain, Trophy, Palette, Repeat, TrendingUp, Database, FileSpreadsheet, Sparkles, BarChart3, ListOrdered, Target, Puzzle, TestTube, Zap, Settings, Ship, Anchor, MapPin, BookMarked } from "lucide-react";

interface TableOfContentsProps {
  onSelectSection: (section: string) => void;
}

const coreSections = [
  {
    id: "basics",
    icon: BookOpen,
    title: "Game Basics",
    description: "Core concepts and win conditions",
    color: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-600"
  },
  {
    id: "phases",
    icon: Layers,
    title: "Turn Phases",
    description: "Step-by-step turn structure",
    color: "from-green-500 to-green-600",
    iconBg: "bg-green-600"
  },
  {
    id: "donsystem",
    icon: Zap,
    title: "⚡ DON!! System",
    description: "Resources, timing & pro execution",
    color: "from-amber-500 to-amber-600",
    iconBg: "bg-amber-600"
  },
  {
    id: "gamezones",
    icon: MapPin,
    title: "🧩 Game Zones",
    description: "Zones, card types & timing mastery",
    color: "from-teal-500 to-teal-600",
    iconBg: "bg-teal-600"
  },
  {
    id: "cards",
    icon: Layers,
    title: "Card Types",
    description: "Characters, Events, Stages, Leaders",
    color: "from-purple-500 to-purple-600",
    iconBg: "bg-purple-600"
  },
  {
    id: "combat",
    icon: Target,
    title: "Combat System",
    description: "Attacks, blocks, and damage",
    color: "from-red-500 to-red-600",
    iconBg: "bg-red-600"
  },
  {
    id: "priority",
    icon: Zap,
    title: "Priority & Actions",
    description: "When can you act?",
    color: "from-yellow-500 to-yellow-600",
    iconBg: "bg-yellow-600"
  },
  {
    id: "scenarios",
    icon: ListChecks,
    title: "Example Scenarios",
    description: "100+ practice situations",
    color: "from-orange-500 to-orange-600",
    iconBg: "bg-orange-600"
  },
  {
    id: "decisions",
    icon: Trophy,
    title: "Decision Tables",
    description: "If-then logic guides",
    color: "from-pink-500 to-pink-600",
    iconBg: "bg-pink-600"
  },
  {
    id: "cheatsheet",
    icon: FileText,
    title: "Quick Cheatsheet",
    description: "Print-ready reference",
    color: "from-indigo-500 to-indigo-600",
    iconBg: "bg-indigo-600"
  }
];

const proSections = [
  {
    id: "prosystem",
    icon: Brain,
    title: "Pro Player System",
    description: "How pro players think",
    color: "from-slate-600 to-slate-800"
  },
  {
    id: "masterpiecemoves",
    icon: Trophy,
    title: "Masterpiece Moves",
    description: "28 tournament-level plays",
    color: "from-amber-500 to-amber-700"
  },
  {
    id: "colorexecution",
    icon: Palette,
    title: "Color Execution",
    description: "Same move, different colors",
    color: "from-violet-500 to-violet-700"
  },
  {
    id: "decisionlogic",
    icon: Repeat,
    title: "Decision Logic",
    description: "IF X → DO Y scenarios",
    color: "from-cyan-500 to-cyan-700"
  },
  {
    id: "progress",
    icon: TrendingUp,
    title: "Progress & Mastery",
    description: "Track your journey",
    color: "from-emerald-500 to-emerald-700"
  }
];

const limitlessSections = [
  {
    id: "datasync",
    icon: Database,
    title: "Data Sync",
    description: "Connect to Limitless TCG",
    color: "from-blue-600 to-blue-800"
  },
  {
    id: "tournamentimport",
    icon: FileText,
    title: "Tournament Import",
    description: "Import tournament data",
    color: "from-purple-600 to-purple-800"
  },
  {
    id: "aicoach",
    icon: Sparkles,
    title: "AI Coach",
    description: "Get real-time recommendations",
    color: "from-pink-600 to-pink-800"
  },
  {
    id: "metasnapshot",
    icon: BarChart3,
    title: "Meta Snapshot",
    description: "Current meta analysis",
    color: "from-orange-600 to-orange-800"
  },
  {
    id: "trainingplaylist",
    icon: ListOrdered,
    title: "Training Playlist",
    description: "7-day practice plan",
    color: "from-green-600 to-green-800"
  }
];

const deckDominanceSections = [
  {
    id: "deckfinder",
    icon: Target,
    title: "Deck Finder",
    description: "Find your winning deck",
    color: "from-red-600 to-red-800"
  },
  {
    id: "matchupoptimizer",
    icon: Swords,
    title: "Matchup Optimizer",
    description: "Optimize win rates",
    color: "from-orange-600 to-orange-800"
  },
  {
    id: "metacounterbuilder",
    icon: Puzzle,
    title: "Meta Counter Builder",
    description: "Counter the meta",
    color: "from-purple-600 to-purple-800"
  },
  {
    id: "consistencyanalyzer",
    icon: BarChart3,
    title: "Consistency Analyzer",
    description: "Minimize variance",
    color: "from-blue-600 to-blue-800"
  },
  {
    id: "aiverdict",
    icon: Zap,
    title: "AI Verdict",
    description: "Final deck recommendation",
    color: "from-green-600 to-green-800"
  }
];

export function TableOfContents({ onSelectSection }: TableOfContentsProps) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-5xl md:text-6xl font-black text-gray-900">
          ONE PIECE TCG Learning Guide
        </h1>
        <p className="text-xl text-gray-700">
          Master the game with interactive guides, pro strategies, and AI-powered analysis
        </p>
      </div>

      {/* Core Learning Sections */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Core Learning
          </h2>
          <p className="text-sm text-gray-700">
            Essential game rules and mechanics
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.id}
                className="cursor-pointer group transition-all hover:shadow-lg border-2 bg-gradient-to-br from-blue-50 to-sky-50 border-blue-300"
                onClick={() => onSelectSection(section.id)}
              >
                <div className="p-6 space-y-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all group-hover:scale-110 ${section.iconBg}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-blue-900">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {section.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pro Player System */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-600 flex-shrink-0">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Pro Player System
            </h3>
          </div>
          <p className="text-gray-700 ml-13">
            Advanced learning layer: Convert rules into tournament-level decision making
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {proSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.id}
                className="cursor-pointer group overflow-hidden border-2 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-300 transition-all hover:shadow-lg"
                onClick={() => onSelectSection(section.id)}
              >
                <div className="p-6 space-y-4">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-br ${section.color} transition-all group-hover:scale-110`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-purple-900">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {section.description}
                    </p>
                  </div>
                </div>
                
                <div className={`h-1 bg-gradient-to-r ${section.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </Card>
            );
          })}
        </div>
      </div>

      {/* Limitless Integration */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-pink-600 flex-shrink-0">
              <Database className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Limitless Integration + AI Coach
            </h3>
          </div>
          <p className="text-gray-700 ml-13">
            Real-time meta data, tournament analysis, and personalized AI coaching
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {limitlessSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.id}
                className="cursor-pointer group overflow-hidden border-2 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-300 transition-all hover:shadow-lg"
                onClick={() => onSelectSection(section.id)}
              >
                <div className="p-6 space-y-4">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-br ${section.color} transition-all group-hover:scale-110`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-pink-900">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {section.description}
                    </p>
                  </div>
                </div>
                
                <div className={`h-1 bg-gradient-to-r ${section.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </Card>
            );
          })}
        </div>
      </div>

      {/* Deck Dominance */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-600 flex-shrink-0">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Deck Dominance AI
            </h3>
          </div>
          <p className="text-gray-700 ml-13">
            AI-assisted deck building for maximum win consistency
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {deckDominanceSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.id}
                className="cursor-pointer group overflow-hidden border-2 bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 transition-all hover:shadow-lg"
                onClick={() => onSelectSection(section.id)}
              >
                <div className="p-6 space-y-4">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-br ${section.color} transition-all group-hover:scale-110`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-green-900">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {section.description}
                    </p>
                  </div>
                </div>
                
                <div className={`h-1 bg-gradient-to-r ${section.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </Card>
            );
          })}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-600 flex-shrink-0">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Settings & API Integration
            </h3>
          </div>
          <p className="text-gray-700 ml-13">
            Connect to external services and configure your learning experience
          </p>
        </div>
        <Card
          className="cursor-pointer group overflow-hidden border-2 bg-gradient-to-br from-gray-50 to-slate-50 border-gray-300 transition-all hover:shadow-lg"
          onClick={() => onSelectSection("settings")}
        >
          <div className="p-6 space-y-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-800 transition-all group-hover:scale-110">
              <Settings className="w-8 h-8 text-white" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-gray-900">
                API Settings
              </h3>
              <p className="text-sm text-gray-700">
                Configure Limitless TCG, ChatGPT AI Coach, and other integrations
              </p>
            </div>
          </div>
          
          <div className="h-1 bg-gradient-to-r from-slate-600 to-slate-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </Card>
      </div>
    </div>
  );
}