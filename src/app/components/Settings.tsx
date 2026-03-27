import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Settings as SettingsIcon, Database, Brain, TrendingUp, Link2, CheckCircle, XCircle, AlertCircle, Eye, EyeOff, Save, TestTube, RefreshCw, Zap, Globe, Shield, Key, Users, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface APIConnection {
  name: string;
  status: "connected" | "disconnected" | "error";
  lastSync?: string;
}

export function Settings() {
  const [limitlessApiKey, setLimitlessApiKey] = useState("");
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [showLimitlessKey, setShowLimitlessKey] = useState(false);
  const [showOpenAIKey, setShowOpenAIKey] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [enableAI, setEnableAI] = useState(true);
  const [connections, setConnections] = useState<APIConnection[]>([
    { name: "Limitless TCG", status: "disconnected" },
    { name: "OpenAI GPT-4", status: "disconnected" },
    { name: "One Piece TCG Official", status: "disconnected" },
    { name: "TCG Player", status: "disconnected" },
    { name: "TCG Matchmaking", status: "disconnected" }
  ]);
  const [testing, setTesting] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [format, setFormat] = useState("Standard");
  const [limit, setLimit] = useState("50");
  const [page, setPage] = useState("1");
  const [useWebhooks, setUseWebhooks] = useState(false);

  const syncLogs = [
    {
      timestamp: "2024-12-22 14:30:22",
      endpoint: "/tournaments/recent",
      result: "Success",
      items: 48,
      duration: "1.2s",
      errors: 0
    },
    {
      timestamp: "2024-12-22 14:15:10",
      endpoint: "/decks/meta",
      result: "Success",
      items: 156,
      duration: "2.8s",
      errors: 0
    },
    {
      timestamp: "2024-12-22 13:45:33",
      endpoint: "/cards/trending",
      result: "Success",
      items: 89,
      duration: "1.5s",
      errors: 0
    },
    {
      timestamp: "2024-12-22 12:30:15",
      endpoint: "/tournaments/recent",
      result: "Partial",
      items: 32,
      duration: "3.1s",
      errors: 2
    },
    {
      timestamp: "2024-12-22 11:00:00",
      endpoint: "/decks/meta",
      result: "Failed",
      items: 0,
      duration: "15.0s",
      errors: 1
    }
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  const handleTest = () => {
    alert("API connection test successful!");
  };

  const handleTestConnection = async (service: string) => {
    setTesting(service);
    // Simulate API test
    setTimeout(() => {
      setConnections(prev => prev.map(conn => 
        conn.name === service 
          ? { ...conn, status: "connected" as const, lastSync: new Date().toLocaleString() }
          : conn
      ));
      setTesting(null);
    }, 2000);
  };

  const handleSaveSettings = () => {
    // Save settings logic
    alert("Settings saved successfully!");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-600">
          <SettingsIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">API Settings & Integrations</h2>
          <p className="text-white">Connect to external services for enhanced gameplay analysis</p>
        </div>
      </div>

      <Tabs defaultValue="connections" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="connections" className="gap-2">
            <Link2 className="w-4 h-4" />
            Connections
          </TabsTrigger>
          <TabsTrigger value="limitless" className="gap-2">
            <Database className="w-4 h-4" />
            Limitless TCG
          </TabsTrigger>
          <TabsTrigger value="ai" className="gap-2">
            <Brain className="w-4 h-4" />
            AI Coach
          </TabsTrigger>
          <TabsTrigger value="advanced" className="gap-2">
            <Shield className="w-4 h-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* Connection Status Tab */}
        <TabsContent value="connections" className="space-y-4">
          <Card className="p-6 border-2 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300">
            <h3 className="font-bold text-xl mb-4 text-blue-900">Active Connections</h3>
            <div className="space-y-3">
              {connections.map((conn) => (
                <div key={conn.name} className="flex items-center justify-between p-4 rounded-lg border-2 border-blue-200 bg-white">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(conn.status)}
                    <div>
                      <p className="font-semibold text-gray-900">{conn.name}</p>
                      {conn.lastSync && (
                        <p className="text-xs text-gray-600">Last synced: {conn.lastSync}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={conn.status === "connected" ? "default" : "secondary"}
                      className={conn.status === "connected" ? "bg-blue-600 text-white" : ""}
                    >
                      {conn.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTestConnection(conn.name)}
                      disabled={testing === conn.name}
                      className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      {testing === conn.name ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <TestTube className="w-4 h-4" />
                      )}
                      <span className="ml-2">Test</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-2 bg-gradient-to-br from-green-50 to-emerald-50 border-green-300">
            <h3 className="font-bold text-xl mb-4 text-green-900">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                className="gap-2 border-2 border-green-300 text-green-700 hover:bg-green-100"
                variant="outline"
                onClick={() => handleTestConnection("All Services")}
              >
                <RefreshCw className="w-4 h-4" />
                Sync All
              </Button>
              <Button 
                className="gap-2 border-2 border-green-300 text-green-700 hover:bg-green-100"
                variant="outline"
              >
                <Zap className="w-4 h-4" />
                Import Decks
              </Button>
              <Button 
                className="gap-2 border-2 border-green-300 text-green-700 hover:bg-green-100"
                variant="outline"
              >
                <TrendingUp className="w-4 h-4" />
                Fetch Meta
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Limitless TCG Tab */}
        <TabsContent value="limitless" className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-xl text-purple-900">Limitless TCG Integration</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Connect to Limitless TCG to access tournament data, top decks, and meta analysis.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-900">API Key</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type={showLimitlessKey ? "text" : "password"}
                      placeholder="Enter your Limitless TCG API key"
                      value={limitlessApiKey}
                      onChange={(e) => setLimitlessApiKey(e.target.value)}
                      className="pr-10 border-purple-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLimitlessKey(!showLimitlessKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
                    >
                      {showLimitlessKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <Button
                    onClick={() => handleTestConnection("Limitless TCG")}
                    disabled={!limitlessApiKey || testing === "Limitless TCG"}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {testing === "Limitless TCG" ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      "Connect"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-600">
                  Get your API key from{" "}
                  <a href="https://limitlesstcg.com/api" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                    limitlesstcg.com/api
                  </a>
                </p>
              </div>

              <div className="border-t border-purple-200 pt-4">
                <h4 className="font-semibold mb-3 text-purple-900">Data Sync Options</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Auto-sync tournament data</p>
                      <p className="text-sm text-gray-600">Automatically fetch new tournament results</p>
                    </div>
                    <Switch checked={autoSync} onCheckedChange={setAutoSync} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Import deck lists</p>
                      <p className="text-sm text-gray-600">Sync top-performing deck configurations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Track meta trends</p>
                      <p className="text-sm text-gray-600">Monitor card usage and win rates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300">
            <h4 className="font-semibold mb-3 text-purple-900">Available Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Tournament Results",
                "Top 8 Deck Lists",
                "Meta Game Analysis",
                "Player Rankings",
                "Card Price Tracking",
                "Event Schedule"
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 p-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-800">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* AI Coach Tab */}
        <TabsContent value="ai" className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-300">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-pink-600" />
              <h3 className="font-bold text-xl text-pink-900">AI Coach (ChatGPT Integration)</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Connect ChatGPT for intelligent gameplay predictions, deck suggestions, and strategic advice based on your data.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-900">OpenAI API Key</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type={showOpenAIKey ? "text" : "password"}
                      placeholder="sk-..."
                      value={openaiApiKey}
                      onChange={(e) => setOpenaiApiKey(e.target.value)}
                      className="pr-10 border-pink-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOpenAIKey(!showOpenAIKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-600"
                    >
                      {showOpenAIKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <Button
                    onClick={() => handleTestConnection("OpenAI GPT-4")}
                    disabled={!openaiApiKey || testing === "OpenAI GPT-4"}
                    className="bg-pink-600 hover:bg-pink-700 text-white"
                  >
                    {testing === "OpenAI GPT-4" ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      "Connect"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-600">
                  Get your API key from{" "}
                  <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
                    platform.openai.com/api-keys
                  </a>
                </p>
              </div>

              <div className="border-t border-pink-200 pt-4">
                <h4 className="font-semibold mb-3 text-pink-900">AI Features</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Enable AI Coach</p>
                      <p className="text-sm text-gray-600">Get real-time strategic advice during gameplay</p>
                    </div>
                    <Switch checked={enableAI} onCheckedChange={setEnableAI} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Predictive analysis</p>
                      <p className="text-sm text-gray-600">AI predicts opponent moves and optimal plays</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Deck optimization</p>
                      <p className="text-sm text-gray-600">AI suggests improvements to your deck</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Match analysis</p>
                      <p className="text-sm text-gray-600">Post-game review with improvement tips</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-300">
            <h4 className="font-semibold mb-3 text-pink-900">AI Capabilities</h4>
            <div className="space-y-2">
              {[
                { title: "Win Rate Prediction", desc: "Predicts your chance to win based on board state" },
                { title: "Mulligan Suggestions", desc: "AI recommends which cards to keep or mulligan" },
                { title: "Counter Play Analysis", desc: "Identifies opponent's strategy and suggests counters" },
                { title: "Resource Management", desc: "Optimal DON!! card usage recommendations" },
                { title: "Matchup Insights", desc: "Historical data-driven matchup advice" },
                { title: "Meta Adaptation", desc: "Suggests deck changes based on current meta" }
              ].map((capability) => (
                <div key={capability.title} className="p-3 rounded-lg bg-pink-200">
                  <p className="font-medium text-gray-900">{capability.title}</p>
                  <p className="text-sm text-gray-600">{capability.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-gray-600" />
              <h3 className="font-bold text-xl text-gray-900">Additional Gaming Platforms</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-900">One Piece TCG Official API</Label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="Official API access token"
                    className="border-gray-300"
                  />
                  <Button variant="outline" className="border-gray-300">
                    Connect
                  </Button>
                </div>
                <p className="text-xs text-gray-600">Access official card database and rulings</p>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900">TCG Player API</Label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="TCG Player API key"
                    className="border-gray-300"
                  />
                  <Button variant="outline" className="border-gray-300">
                    Connect
                  </Button>
                </div>
                <p className="text-xs text-gray-600">Card pricing and market data</p>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900">Custom API Endpoint</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://your-api.com/endpoint"
                    className="border-gray-300"
                  />
                  <Button variant="outline" className="border-gray-300">
                    Add
                  </Button>
                </div>
                <p className="text-xs text-gray-600">Connect your own data source</p>
              </div>
            </div>
          </Card>

          {/* TCG Matchmaking Integration */}
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-orange-600" />
              <h3 className="font-bold text-xl text-orange-900">TCG Matchmaking Integration</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Connect to TCG Matchmaking services to find opponents, join tournaments, and track your competitive rank.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-900">Matchmaking API Key</Label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="Enter matchmaking service API key"
                    className="border-orange-300"
                  />
                  <Button 
                    onClick={() => handleTestConnection("TCG Matchmaking")}
                    disabled={testing === "TCG Matchmaking"}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    {testing === "TCG Matchmaking" ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      "Connect"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-600">Get your key from your matchmaking service provider</p>
              </div>

              <div className="border-t border-orange-200 pt-4">
                <h4 className="font-semibold mb-3 text-orange-900">Matchmaking Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Auto-queue for matches</p>
                      <p className="text-sm text-gray-600">Automatically search for opponents</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Skill-based matching</p>
                      <p className="text-sm text-gray-600">Match with players of similar skill level</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Tournament notifications</p>
                      <p className="text-sm text-gray-600">Get alerts for upcoming tournaments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Share match history</p>
                      <p className="text-sm text-gray-600">Allow others to view your match record</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="border-t border-orange-200 pt-4">
                <h4 className="font-semibold mb-3 text-orange-900">Available Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Ranked Matchmaking",
                    "Casual Play Mode",
                    "Tournament Finder",
                    "Friends List",
                    "Match Replays",
                    "Leaderboards"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 p-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-100 p-4 rounded-lg border border-orange-300">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-orange-900 mb-1">Pro Tip</p>
                    <p className="text-sm text-gray-700">
                      Connect your deck profile to get better matchup predictions and personalized opponent recommendations based on your playstyle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300">
            <h4 className="font-semibold mb-3 text-gray-900">Security & Privacy</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Encrypt API keys</p>
                  <p className="text-sm text-gray-600">Store keys securely in browser</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Share usage data</p>
                  <p className="text-sm text-gray-600">Help improve AI predictions</p>
                </div>
                <Switch />
              </div>
              <Button variant="outline" className="w-full border-gray-300 mt-4">
                <Key className="w-4 h-4 mr-2" />
                Clear All Stored Keys
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="border-theme-secondary">
          Reset to Defaults
        </Button>
        <Button 
          onClick={handleSaveSettings}
          className="gap-2"
          style={{ backgroundColor: 'var(--theme-accent)', color: 'white' }}
        >
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}