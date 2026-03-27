import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Database, RefreshCw, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useState } from "react";

export function DataSync() {
  const [isConnected, setIsConnected] = useState(true);
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#0A1F44' }}>
          <Database className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">DATA SYNC</span>
        </div>
        <h1 className="text-4xl font-bold" style={{ color: '#0A1F44' }}>
          Limitless Integration
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect to Limitless TCG for real-time tournament data and meta analysis
        </p>
      </div>

      {/* Connection Status Card */}
      <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold" style={{ color: '#0A1F44' }}>
              Connection Status
            </h2>
            {isConnected ? (
              <Badge className="flex items-center gap-2 bg-green-500 text-white">
                <CheckCircle2 className="w-4 h-4" />
                Connected
              </Badge>
            ) : (
              <Badge className="flex items-center gap-2 bg-red-500 text-white">
                <XCircle className="w-4 h-4" />
                Not Connected
              </Badge>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFF9F0' }}>
              <p className="text-xs font-bold text-gray-500 mb-1">API BASE URL</p>
              <p className="text-sm font-mono">https://api.onepiece.limitless.gg</p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFF9F0' }}>
              <p className="text-xs font-bold text-gray-500 mb-1">API KEY</p>
              <p className="text-sm font-mono">••••••••••••••••</p>
              <p className="text-xs text-gray-500 mt-1 italic">Stored securely on server</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-600">
              Last synced: <span className="font-semibold">2024-12-22 14:30:22</span>
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={handleSync}
              disabled={isSyncing}
              className="gap-2"
              style={{ backgroundColor: '#0A1F44' }}
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync Now'}
            </Button>
            <Button
              variant="outline"
              onClick={handleTest}
              style={{ borderColor: '#C19A6B' }}
            >
              Test API
            </Button>
          </div>
        </div>
      </Card>

      {/* Sync Controls */}
      <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#0A1F44' }}>
          Sync Controls
        </h2>

        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 mb-2 block">
                GAME / FORMAT
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                style={{ borderColor: '#C19A6B' }}
              >
                <option>Standard</option>
                <option>Limited</option>
                <option>All Formats</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 mb-2 block">
                LIMIT (# OF ITEMS)
              </label>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                style={{ borderColor: '#C19A6B' }}
                placeholder="50"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 mb-2 block">
                PAGE (#)
              </label>
              <input
                type="number"
                value={page}
                onChange={(e) => setPage(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                style={{ borderColor: '#C19A6B' }}
                placeholder="1"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: '#C19A6B', backgroundColor: '#FFF9F0' }}>
            <div>
              <p className="font-semibold" style={{ color: '#0A1F44' }}>
                Use Webhooks (Auto Sync)
              </p>
              <p className="text-sm text-gray-600">
                Automatically sync when new data is available
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useWebhooks}
                onChange={(e) => setUseWebhooks(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          {useWebhooks && (
            <Card className="p-4 border" style={{ borderColor: '#C19A6B' }}>
              <p className="text-sm font-bold mb-2" style={{ color: '#0A1F44' }}>
                Webhook Setup Instructions
              </p>
              <ol className="text-sm space-y-1 text-gray-600 list-decimal list-inside">
                <li>Copy your webhook URL: <code className="bg-gray-100 px-2 py-1 rounded">https://yourapp.com/webhooks/limitless</code></li>
                <li>Add it to your Limitless TCG account settings</li>
                <li>Select events: Tournament Created, Deck Updated, Meta Changed</li>
                <li>Save and test the webhook connection</li>
              </ol>
            </Card>
          )}
        </div>
      </Card>

      {/* Sync Logs */}
      <Card className="p-6 border-2" style={{ borderColor: '#C19A6B' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#0A1F44' }}>
          Sync Logs
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#0A1F44' }}>
              <tr>
                <th className="px-4 py-3 text-left text-white font-bold text-sm">Timestamp</th>
                <th className="px-4 py-3 text-left text-white font-bold text-sm">Endpoint</th>
                <th className="px-4 py-3 text-left text-white font-bold text-sm">Result</th>
                <th className="px-4 py-3 text-left text-white font-bold text-sm">Items</th>
                <th className="px-4 py-3 text-left text-white font-bold text-sm">Duration</th>
                <th className="px-4 py-3 text-left text-white font-bold text-sm">Errors</th>
              </tr>
            </thead>
            <tbody>
              {syncLogs.map((log, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-orange-50'}>
                  <td className="px-4 py-3 text-sm font-mono">{log.timestamp}</td>
                  <td className="px-4 py-3 text-sm font-mono">{log.endpoint}</td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        log.result === 'Success'
                          ? 'bg-green-500 text-white'
                          : log.result === 'Partial'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-red-500 text-white'
                      }
                    >
                      {log.result}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold">{log.items}</td>
                  <td className="px-4 py-3 text-sm">{log.duration}</td>
                  <td className="px-4 py-3 text-sm">
                    {log.errors > 0 ? (
                      <span className="text-red-600 font-semibold">{log.errors}</span>
                    ) : (
                      <span className="text-green-600">0</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
