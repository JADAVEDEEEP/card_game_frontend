import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  Clock,
  Hash,
  Mail,
  RefreshCw,
  Siren,
  Timer,
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { withApiBase } from "../data/apiBase";

type WatcherStatus = {
  running: boolean;
  last_run_at: string | null;
  last_error: string | null;
  last_new_count: number;
  source_url: string;
  interval_ms: number;
  last_email_sent_at?: string | null;
  last_email_error?: string | null;
  last_email_reason?: string | null;
};

type WatchedEvent = {
  url: string;
  title: string;
  published_at: string;
  summary: string;
  first_seen_at: string | null;
  last_notified_at: string | null;
};

type WatcherActionResponse = {
  message?: string;
  status?: WatcherStatus;
  error?: string;
};

const DATE_PATTERN =
  /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2},\s+\d{4}\b/i;

const formatTimestamp = (raw: string | null | undefined): string => {
  if (!raw) return "N/A";
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return String(raw);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const extractDisplayDate = (event: WatchedEvent) => {
  const direct = String(event.published_at || "").trim();
  if (direct) return direct;
  const match = `${event.title || ""} ${event.summary || ""}`.match(DATE_PATTERN);
  return match ? match[0] : "";
};

const getTag = (title: string) => {
  const upper = title.toUpperCase();
  if (upper.includes("COMPETITIVE")) return "COMPETITIVE";
  if (upper.includes("CARD LIST")) return "CARD LIST";
  if (upper.includes("OTHER")) return "OTHER";
  return "UPDATE";
};

const getTagClassName = (tag: string) => {
  if (tag === "COMPETITIVE") return "bg-blue-100 text-blue-800 border-blue-300";
  if (tag === "CARD LIST") return "bg-emerald-100 text-emerald-800 border-emerald-300";
  if (tag === "OTHER") return "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300";
  return "bg-slate-100 text-slate-700 border-slate-300";
};

const cleanTitle = (title: string) =>
  title.replace(/\.\s*(COMPETITIVE|OTHER|CARD LIST)[^.]*$/i, "").trim();

export function Events() {
  const [status, setStatus] = useState<WatcherStatus | null>(null);
  const [events, setEvents] = useState<WatchedEvent[]>([]);
  const [visibleCount, setVisibleCount] = useState(30);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<"run" | "email" | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statusRes, recentPrimary] = await Promise.all([
        fetch(withApiBase("/watcher/status")),
        fetch(withApiBase("/watcher/recent?limit=all")),
      ]);

      const recentRes =
        recentPrimary.status === 404
          ? await fetch(withApiBase("/watcher.js/recent?limit=all"))
          : recentPrimary;

      const [statusJson, recentJson] = await Promise.all([
        statusRes.json().catch(() => ({})),
        recentRes.json().catch(() => ({})),
      ]);

      if (!statusRes.ok) {
        throw new Error((statusJson as { message?: string }).message || "Failed to load watcher status.");
      }
      if (!recentRes.ok) {
        throw new Error((recentJson as { message?: string }).message || "Failed to load watcher events.");
      }

      setStatus(statusJson as WatcherStatus);
      setEvents(Array.isArray((recentJson as { events?: WatchedEvent[] }).events) ? (recentJson as { events: WatchedEvent[] }).events : []);
      setVisibleCount(30);
      setMessage(null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const runWatcherAction = async (path: "/watcher/run-now" | "/watcher/test-email", mode: "run" | "email") => {
    try {
      setActionLoading(mode);
      setError(null);
      const response = await fetch(withApiBase(path), { method: "POST" });
      const data = (await response.json().catch(() => ({}))) as WatcherActionResponse;
      if (!response.ok) {
        throw new Error(data.message || data.error || "Watcher action failed.");
      }
      if (data.status) setStatus(data.status);
      setMessage(data.message || (mode === "run" ? "Watcher run completed." : "Test email sent."));
      await loadData();
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Watcher action failed.");
    } finally {
      setActionLoading(null);
    }
  };

  const statusTone = status?.running
    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
    : "bg-slate-100 text-slate-700 border-slate-300";

  const visibleEvents = useMemo(() => events.slice(0, visibleCount), [events, visibleCount]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2">
          <Siren className="h-4 w-4 text-orange-700" />
          <span className="text-sm font-semibold text-orange-900">Official Watcher + Mail Alerts</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Events</h2>
        <p className="max-w-3xl text-sm text-gray-700">
          Official One Piece topics watcher, latest detected events, and email alert controls from the backend watcher API.
        </p>
      </div>

      {(message || error) && (
        <Card className={`${error ? "border-red-300 bg-red-50" : "border-emerald-300 bg-emerald-50"} p-4`}>
          <div className="flex items-start gap-3">
            <AlertCircle className={`mt-0.5 h-5 w-5 ${error ? "text-red-600" : "text-emerald-600"}`} />
            <div>
              <p className={`font-semibold ${error ? "text-red-900" : "text-emerald-900"}`}>
                {error ? "Watcher Error" : "Watcher Status"}
              </p>
              <p className={`text-sm ${error ? "text-red-700" : "text-emerald-700"}`}>{error || message}</p>
            </div>
          </div>
        </Card>
      )}

      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="grid flex-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/80 bg-white/80 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4 text-orange-600" />
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Watcher</p>
              </div>
              <Badge className={statusTone}>{status?.running ? "Running" : "Idle"}</Badge>
            </div>

            <div className="rounded-2xl border border-white/80 bg-white/80 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Last Run</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">{formatTimestamp(status?.last_run_at)}</p>
            </div>

            <div className="rounded-2xl border border-white/80 bg-white/80 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Hash className="h-4 w-4 text-purple-600" />
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">New Events</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{status?.last_new_count ?? 0}</p>
            </div>

            <div className="rounded-2xl border border-white/80 bg-white/80 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Timer className="h-4 w-4 text-emerald-600" />
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Interval</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {status?.interval_ms ? `${Math.round(status.interval_ms / 60000)} min` : "N/A"}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:w-[360px]">
            <Button
              variant="outline"
              onClick={() => void loadData()}
              disabled={loading || actionLoading !== null}
              className="justify-center border-orange-300 bg-white text-orange-900 hover:bg-orange-100"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Refreshing" : "Refresh"}
            </Button>
            <Button
              onClick={() => void runWatcherAction("/watcher/run-now", "run")}
              disabled={loading || actionLoading !== null}
              className="justify-center bg-orange-600 text-white hover:bg-orange-700"
            >
              <Activity className={`h-4 w-4 ${actionLoading === "run" ? "animate-pulse" : ""}`} />
              {actionLoading === "run" ? "Running" : "Run Now"}
            </Button>
            <Button
              onClick={() => void runWatcherAction("/watcher/test-email", "email")}
              disabled={loading || actionLoading !== null}
              className="justify-center bg-slate-900 text-white hover:bg-slate-800"
            >
              <Mail className={`h-4 w-4 ${actionLoading === "email" ? "animate-pulse" : ""}`} />
              {actionLoading === "email" ? "Sending" : "Test Email"}
            </Button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/80 bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Last Email Sent</p>
            <p className="mt-2 text-sm font-semibold text-gray-900">{formatTimestamp(status?.last_email_sent_at)}</p>
          </div>
          <div className="rounded-2xl border border-white/80 bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Email Reason</p>
            <p className="mt-2 text-sm font-semibold text-gray-900">{status?.last_email_reason || "N/A"}</p>
          </div>
          <div className="rounded-2xl border border-white/80 bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Last Error</p>
            <p className="mt-2 text-sm font-semibold text-red-700">{status?.last_error || status?.last_email_error || "None"}</p>
          </div>
        </div>
      </Card>

      <Card className="border-2 border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Recent Detected Events</h3>
            <p className="text-sm text-gray-600">{events.length > 0 ? `${events.length} total events` : "No events detected yet"}</p>
          </div>
          <Badge className="bg-blue-100 text-blue-800 border-blue-300">{events.length} tracked</Badge>
        </div>

        {visibleEvents.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center text-sm text-slate-600">
            No events available right now. Try running the watcher or refreshing.
          </div>
        ) : (
          <div className="space-y-3">
            {visibleEvents.map((event) => {
              const tag = getTag(event.title);
              const displayDate = extractDisplayDate(event);

              return (
                <div
                  key={event.url}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-base font-semibold text-gray-900">
                          {cleanTitle(event.title || event.url)}
                        </p>
                        <Badge className={getTagClassName(tag)}>{tag}</Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        {displayDate ? (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {displayDate}
                          </span>
                        ) : null}
                        {event.first_seen_at ? (
                          <span className="inline-flex items-center gap-1">
                            <Activity className="h-3.5 w-3.5" />
                            Seen: {formatTimestamp(event.first_seen_at)}
                          </span>
                        ) : null}
                        {event.last_notified_at ? (
                          <span className="inline-flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5" />
                            Notified: {formatTimestamp(event.last_notified_at)}
                          </span>
                        ) : null}
                      </div>

                      {event.summary && event.summary !== "-" ? (
                        <p className="text-sm leading-6 text-gray-700">{event.summary}</p>
                      ) : null}
                    </div>

                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-700 underline-offset-4 hover:underline"
                    >
                      Open source
                    </a>
                  </div>
                </div>
              );
            })}

            {visibleCount < events.length ? (
              <Button
                variant="outline"
                onClick={() => setVisibleCount((current) => current + 30)}
                className="w-full border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
              >
                Load More ({events.length - visibleCount} remaining)
              </Button>
            ) : null}
          </div>
        )}
      </Card>
    </div>
  );
}
