import { useState } from "react";
import {
  BarChart3,
  BookMarked,
  BookOpen,
  Brain,
  Database,
  FileText,
  GitCompare,
  Home,
  Layers,
  ListChecks,
  ListOrdered,
  Menu,
  Palette,
  Puzzle,
  Repeat,
  Settings as SettingsIcon,
  Ship,
  Sparkles,
  Swords,
  Target,
  TestTube,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { AICoach } from "./components/AICoach";
import { AIVerdict } from "./components/AIVerdict";
import { BestDecklists } from "./components/BestDecklists";
import { CardActionIntelligence } from "./components/CardActionIntelligence";
import { CardMastery } from "./components/CardMastery";
import { CardTypes } from "./components/CardTypes";
import { Cheatsheet } from "./components/Cheatsheet";
import { ColorExecution } from "./components/ColorExecution";
import { CombatSystem } from "./components/CombatSystem";
import { ConsistencyAnalyzer } from "./components/ConsistencyAnalyzer";
import { DataSync } from "./components/DataSync";
import { DeckCompare } from "./components/DeckCompare";
import { DeckFinder } from "./components/DeckFinder";
import { DecisionLogic } from "./components/DecisionLogic";
import { DecisionTables } from "./components/DecisionTables";
import { DonSystem } from "./components/DonSystem";
import { Events } from "./components/Events";
import { GameBasics } from "./components/GameBasics";
import { GameEndConditions } from "./components/GameEndConditions";
import { GameZones } from "./components/GameZones";
import { MasterpieceMoves } from "./components/MasterpieceMoves";
import { MatchupOptimizer } from "./components/MatchupOptimizer";
import { MetaCounterBuilder } from "./components/MetaCounterBuilder";
import { MetaDecks } from "./components/MetaDecks";
import { MetaSnapshot } from "./components/MetaSnapshot";
import { MyCollection } from "./components/MyCollection";
import { PriorityActions } from "./components/PriorityActions";
import { ProPlayerSystem } from "./components/ProPlayerSystem";
import { Progress } from "./components/Progress";
import { Scenarios } from "./components/Scenarios";
import { Settings } from "./components/Settings";
import { SplashPage } from "./components/SplashPage";
import { TableOfContents } from "./components/TableOfContents";
import { TournamentImport } from "./components/TournamentImport";
import { TrainingPlaylist } from "./components/TrainingPlaylist";
import { TurnPhases } from "./components/TurnPhases";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";

type Section = "splash" | "toc" | "basics" | "gameendconditions" | "donsystem" | "gamezones" | "phases" | "cardmastery" | "cards" | "combat" | "priority" | "scenarios" | "decisions" | "cheatsheet" | "prosystem" | "masterpiecemoves" | "colorexecution" | "deckcompare" | "decisionlogic" | "mycollection" | "cardaction" | "events" | "progress" | "datasync" | "tournamentimport" | "aicoach" | "metadecks" | "bestdecklists" | "metasnapshot" | "trainingplaylist" | "deckfinder" | "matchupoptimizer" | "metacounterbuilder" | "consistencyanalyzer" | "aiverdict" | "settings";

type LearningMode = "study" | "reference" | "drill";

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>("splash");
  const [showSidebar, setShowSidebar] = useState(false);
  const [learningMode, setLearningMode] = useState<LearningMode>("study");

  const handleStart = () => {
    setCurrentSection("toc");
  };

  const handleSelectSection = (section: string) => {
    setCurrentSection(section as Section);
    setShowSidebar(false);
  };

  const getSectionTitle = (section: Section): string => {
    const titles: Record<Section, string> = {
      splash: "Welcome",
      toc: "Table of Contents",
      basics: "Game Basics",
      gameendconditions: "Game End Conditions",
      donsystem: "Don System",
      gamezones: "Game Zones",
      phases: "Turn Phases",
      cardmastery: "Card Mastery",
      cards: "Card Types",
      combat: "Combat System",
      priority: "Priority & Actions",
      scenarios: "Practice Scenarios",
      decisions: "Decision Tables",
      cheatsheet: "Quick Cheatsheet",
      prosystem: "Pro Player System",
      masterpiecemoves: "Masterpiece Moves",
      colorexecution: "Color Execution",
      deckcompare: "Deck Compare",
      decisionlogic: "Decision Logic",
      mycollection: "My Collection",
      cardaction: "Card Action Intelligence",
      events: "Events",
      progress: "Progress",
      datasync: "Data Sync",
      tournamentimport: "Tournament Import",
      aicoach: "AI Coach",
      metadecks: "Meta Decks",
      bestdecklists: "Best Decklists",
      metasnapshot: "Meta Snapshot",
      trainingplaylist: "Training Playlist",
      deckfinder: "Deck Finder",
      matchupoptimizer: "Matchup Optimizer",
      metacounterbuilder: "Meta Counter Builder",
      consistencyanalyzer: "Consistency Analyzer",
      aiverdict: "AI Verdict",
      settings: "Settings"
    };
    return titles[section];
  };

  const renderContent = () => {
    switch (currentSection) {
      case "splash":
        return <SplashPage onStart={handleStart} />;
      case "toc":
        return <TableOfContents onSelectSection={handleSelectSection} />;
      case "basics":
        return <GameBasics />;
      case "gameendconditions":
        return <GameEndConditions />;
      case "donsystem":
        return <DonSystem />;
      case "gamezones":
        return <GameZones />;
      case "phases":
        return <TurnPhases />;
      case "cardmastery":
        return <CardMastery />;
      case "cards":
        return <CardTypes />;
      case "combat":
        return <CombatSystem />;
      case "priority":
        return <PriorityActions />;
      case "scenarios":
        return <Scenarios />;
      case "decisions":
        return <DecisionTables />;
      case "cheatsheet":
        return <Cheatsheet />;
      case "prosystem":
        return <ProPlayerSystem />;
      case "masterpiecemoves":
        return <MasterpieceMoves />;
      case "colorexecution":
        return <ColorExecution />;
      case "deckcompare":
        return <DeckCompare />;
      case "decisionlogic":
        return <DecisionLogic />;
      case "mycollection":
        return <MyCollection />;
      case "cardaction":
        return <CardActionIntelligence />;
      case "events":
        return <Events />;
      case "progress":
        return <Progress />;
      case "datasync":
        return <DataSync />;
      case "tournamentimport":
        return <TournamentImport />;
      case "aicoach":
        return <AICoach />;
      case "metadecks":
        return <MetaDecks />;
      case "bestdecklists":
        return <BestDecklists />;
      case "metasnapshot":
        return <MetaSnapshot />;
      case "trainingplaylist":
        return <TrainingPlaylist />;
      case "deckfinder":
        return <DeckFinder />;
      case "matchupoptimizer":
        return <MatchupOptimizer />;
      case "metacounterbuilder":
        return <MetaCounterBuilder />;
      case "consistencyanalyzer":
        return <ConsistencyAnalyzer />;
      case "aiverdict":
        return <AIVerdict />;
      case "settings":
        return <Settings />;
      default:
        return <TableOfContents onSelectSection={handleSelectSection} />;
    }
  };

  // Navigation sidebar content
  const NavigationMenu = () => (
    <div className="p-4 space-y-2">
      <Button
        variant={currentSection === "toc" ? "default" : "ghost"}
        className="w-full justify-start gap-2 transition-all hover:bg-opacity-80"
        onClick={() => handleSelectSection("toc")}
        style={currentSection === "toc" ? { 
          backgroundColor: 'var(--theme-primary)',
          color: 'white'
        } : {
          color: 'white',
          backgroundColor: 'transparent'
        }}
        onMouseEnter={(e) => {
          if (currentSection !== "toc") {
            e.currentTarget.style.backgroundColor = 'var(--theme-card-bg)';
          }
        }}
        onMouseLeave={(e) => {
          if (currentSection !== "toc") {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <Home className="w-4 h-4" />
        Table of Contents
      </Button>
      
      <div className="pt-2 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}>
        <p className="text-xs font-semibold px-3 pb-2" style={{ color: 'white' }}>LEARNING SECTIONS</p>
        
        {/* Game Basics Accordion */}
        <Accordion type="single" collapsible>
          <AccordionItem value="game-basics" className="border-none">
            <AccordionTrigger 
              className="px-3 py-2 hover:no-underline rounded-lg transition-colors" 
              style={{ 
                color: 'white',
                backgroundColor: 'transparent'
              }}
            >
              <div className="flex items-center gap-2 w-full">
                <BookOpen className="w-4 h-4" style={{ color: 'var(--theme-secondary)' }} />
                <span className="font-semibold">Game Basics</span>
                <Badge 
                  variant="secondary" 
                  className="ml-auto text-xs"
                  style={{
                    backgroundColor: 'var(--theme-accent)',
                    color: 'white'
                  }}
                >
                  12
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0 pt-1">
              <div className="space-y-1 pl-2">
                {[
                  { id: 'basics', icon: BookOpen, label: 'Game Basics' },
                  { id: 'phases', icon: Layers, label: 'Turn Phases' },
                  { id: 'gameendconditions', icon: Trophy, label: 'Win, Lose & Draw' },
                  { id: 'donsystem', icon: Zap, label: 'DON!! System' },
                  { id: 'gamezones', icon: BookMarked, label: 'Game Zones' },
                  { id: 'cardmastery', icon: Layers, label: 'Card Mastery' },
                  { id: 'cards', icon: Layers, label: 'Card Types' },
                  { id: 'combat', icon: Target, label: 'Combat System' },
                  { id: 'priority', icon: Zap, label: 'Priority & Actions' },
                  { id: 'scenarios', icon: ListChecks, label: 'Practice Scenarios' },
                  { id: 'decisions', icon: Trophy, label: 'Decision Tables' },
                  { id: 'cheatsheet', icon: FileText, label: 'Quick Cheatsheet' }
                ].map(({ id, icon: Icon, label }) => (
                  <Button
                    key={id}
                    variant="ghost"
                    className="w-full justify-start gap-2 transition-all text-sm h-9"
                    onClick={() => handleSelectSection(id)}
                    style={currentSection === id ? { 
                      backgroundColor: 'var(--theme-primary)',
                      color: 'white'
                    } : {
                      color: 'white',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (currentSection !== id) {
                        e.currentTarget.style.backgroundColor = 'var(--theme-card-bg)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentSection !== id) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Pro Game Skills Accordion */}
        <Accordion type="single" collapsible className="mt-2">
          <AccordionItem value="pro-skills" className="border-none">
            <AccordionTrigger 
              className="px-3 py-2 hover:no-underline rounded-lg transition-colors" 
              style={{ 
                color: 'white',
                backgroundColor: 'transparent'
              }}
            >
              <div className="flex items-center gap-2 w-full">
                <Brain className="w-4 h-4" style={{ color: 'var(--theme-accent)' }} />
                <span className="font-semibold">Pro Game Skills</span>
                <Badge 
                  variant="secondary" 
                  className="ml-auto text-xs"
                  style={{
                    backgroundColor: 'var(--theme-accent)',
                    color: 'white'
                  }}
                >
                  6
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0 pt-1">
              <div className="space-y-1 pl-2">
                {[
                  { id: 'prosystem', icon: Brain, label: 'Pro Player System' },
                  { id: 'masterpiecemoves', icon: Trophy, label: 'Masterpiece Moves' },
                  { id: 'colorexecution', icon: Palette, label: 'Color Execution' },
                  { id: 'progress', icon: TrendingUp, label: 'Progress' },
                  { id: 'metasnapshot', icon: BarChart3, label: 'Meta Snapshot' },
                  { id: 'trainingplaylist', icon: ListOrdered, label: 'Training Playlist' }
                ].map(({ id, icon: Icon, label }) => (
                  <Button
                    key={id}
                    variant="ghost"
                    className="w-full justify-start gap-2 transition-all text-sm h-9"
                    onClick={() => handleSelectSection(id)}
                    style={currentSection === id ? { 
                      backgroundColor: 'var(--theme-primary)',
                      color: 'white'
                    } : {
                      color: 'white',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (currentSection !== id) {
                        e.currentTarget.style.backgroundColor = 'var(--theme-card-bg)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentSection !== id) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Other Sections */}
        <div className="space-y-1 mt-2">
          {[
            { id: 'decisionlogic', icon: Repeat, label: 'Decision Logic' },
            { id: 'deckcompare', icon: GitCompare, label: 'Deck Compare' },
            { id: 'mycollection', icon: BookMarked, label: 'My Collection' },
            { id: 'cardaction', icon: Zap, label: 'Card Action Intelligence' },
            { id: 'events', icon: TrendingUp, label: 'Events' },
            { id: 'tournamentimport', icon: FileText, label: 'Tournament Import' },
            { id: 'aicoach', icon: Sparkles, label: 'AI Coach' },
            { id: 'metadecks', icon: Layers, label: 'Meta Decks' },
            { id: 'bestdecklists', icon: Layers, label: 'Best Decklists' },
            { id: 'deckfinder', icon: Target, label: 'Deck Finder' },
            { id: 'matchupoptimizer', icon: Swords, label: 'Matchup Optimizer' },
            { id: 'metacounterbuilder', icon: Puzzle, label: 'Meta Counter Builder' },
            { id: 'consistencyanalyzer', icon: TestTube, label: 'Consistency Analyzer' },
            { id: 'aiverdict', icon: Zap, label: 'AI Verdict' }
          ].map(({ id, icon: Icon, label }) => (
            <Button
              key={id}
              variant="ghost"
              className="w-full justify-start gap-2 transition-all"
              onClick={() => handleSelectSection(id)}
              style={currentSection === id ? { 
                backgroundColor: 'var(--theme-primary)',
                color: 'white'
              } : {
                color: 'white',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                if (currentSection !== id) {
                  e.currentTarget.style.backgroundColor = 'var(--theme-card-bg)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentSection !== id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}>
        <p className="text-xs font-semibold px-3 pb-2" style={{ color: 'white' }}>SETTINGS</p>
        
        {[
          { id: 'settings', icon: SettingsIcon, label: 'Settings' },
          { id: 'datasync', icon: Database, label: 'Data Sync' }
        ].map(({ id, icon: Icon, label }) => (
          <Button
            key={id}
            variant="ghost"
            className="w-full justify-start gap-2 transition-all"
            onClick={() => handleSelectSection(id)}
            style={currentSection === id ? { 
              backgroundColor: 'var(--theme-primary)',
              color: 'white'
            } : {
              color: 'white',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              if (currentSection !== id) {
                e.currentTarget.style.backgroundColor = 'var(--theme-card-bg)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentSection !== id) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );

  if (currentSection === "splash") {
    return renderContent();
  }

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--theme-bg-secondary)' }}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r flex-col" style={{ 
        backgroundColor: 'var(--theme-bg)',
        borderColor: 'var(--theme-border)'
      }}>
        <div className="p-6 border-b" style={{ 
          borderColor: 'var(--theme-border)'
        }}>
          <h2 className="font-bold text-xl" style={{ color: 'white' }}>ONE PIECE TCG</h2>
          <p className="text-sm" style={{ color: 'white' }}>Learning Guide</p>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ backgroundColor: 'var(--theme-bg)' }}>
          <NavigationMenu />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="border-b px-6 py-4 flex items-center justify-between shrink-0" style={{ 
          backgroundColor: 'var(--theme-bg)',
          borderColor: 'var(--theme-border)'
        }}>
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden" style={{ color: 'var(--theme-primary)' }}>
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0" style={{ backgroundColor: 'var(--theme-bg)' }}>
                <div className="p-6 border-b" style={{ 
                  borderColor: 'var(--theme-border)'
                }}>
                  <h2 className="font-bold text-xl" style={{ color: 'white' }}>ONE PIECE TCG</h2>
                  <p className="text-sm" style={{ color: 'white' }}>Learning Guide</p>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-80px)]" style={{ backgroundColor: 'var(--theme-bg)' }}>
                  <NavigationMenu />
                </div>
              </SheetContent>
            </Sheet>

            <div>
              <h1 className="font-bold text-xl" style={{ color: 'white' }}>
                {getSectionTitle(currentSection)}
              </h1>
              <p className="text-sm" style={{ color: 'white' }}>Interactive Learning System</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentSection("splash")}
              className="gap-2 font-bold transition-all hover:scale-105"
              style={{
                backgroundColor: 'var(--theme-accent)',
                color: 'white',
                border: 'none'
              }}
            >
              <Ship className="w-4 h-4" />
              <span className="hidden sm:inline">Set Sail Again</span>
              <span className="sm:hidden">🏴‍☠️</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectSection("settings")}
              className="gap-2 transition-all hover:opacity-80"
              style={{
                borderColor: 'white',
                color: 'white',
                backgroundColor: 'var(--theme-card-bg)'
              }}
            >
              <SettingsIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectSection("toc")}
              className="gap-2 transition-all hover:opacity-80"
              style={{
                borderColor: 'white',
                color: 'white',
                backgroundColor: 'var(--theme-card-bg)'
              }}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Menu</span>
            </Button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12" style={{ backgroundColor: 'var(--theme-bg-secondary)' }}>
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
