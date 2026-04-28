import { useEffect, useMemo, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { withApiBase } from "../data/apiBase";

/* ─── Types ─────────────────────────────────────────────────────── */
type CategoryTab =
  | "ALL" | "NEWS" | "PRODUCTS" | "EVENTS"
  | "RULES" | "CARDS" | "MAGAZINE" | "STREAM";

type EventItem = {
  url: string;
  title: string;
  published_at?: string;
  summary?: string;
  category?: string;
};

const TABS: CategoryTab[] = [
  "ALL", "NEWS", "PRODUCTS", "EVENTS",
  "RULES", "CARDS", "MAGAZINE", "STREAM",
];

/* ─── Date helpers ──────────────────────────────────────────────── */
const DATE_PATTERN =
  /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2},\s+\d{4}\b/i;
const RANGE_PATTERN =
  /\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2})\s*[-–]\s*\d{1,2},\s*(20\d{2})\b/i;
const MONTH_PATTERN =
  /\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b/i;
const MONTH_INDEX: Record<string, number> = {
  jan:0,january:0,feb:1,february:1,mar:2,march:2,apr:3,april:3,may:4,
  jun:5,june:5,jul:6,july:6,aug:7,august:7,sep:8,sept:8,september:8,
  oct:9,october:9,nov:10,november:10,dec:11,december:11,
};

const normalizeSpace = (v: string) => String(v || "").replace(/\s+/g, " ").trim();

const extractDeclaredDate = (value: string): string => {
  const raw = normalizeSpace(value);
  if (!raw) return "";
  const exact = raw.match(DATE_PATTERN);
  if (exact) return exact[0];
  const ranged = raw.match(RANGE_PATTERN);
  if (ranged) return `${ranged[1]} ${ranged[2]}, ${ranged[3]}`;
  const ts = Date.parse(raw);
  if (Number.isFinite(ts))
    return new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  return "";
};

const parseDateForSort = (value: string): number => {
  const raw = normalizeSpace(value);
  if (!raw) return 0;
  const declared = extractDeclaredDate(raw);
  if (declared) { const ts = Date.parse(declared); if (Number.isFinite(ts)) return ts; }
  const yearMatch = raw.match(/\b(20\d{2})\b/);
  const monthMatch = raw.match(MONTH_PATTERN);
  if (!yearMatch || !monthMatch) return 0;
  const month = MONTH_INDEX[monthMatch[1].toLowerCase()];
  if (month === undefined) return 0;
  const after = raw.slice((monthMatch.index || 0) + monthMatch[0].length);
  const dayMatch = after.match(/\b(\d{1,2})\b/);
  return Date.UTC(Number(yearMatch[1]), month, dayMatch ? Number(dayMatch[1]) : 1);
};

/* ─── Category logic ────────────────────────────────────────────── */
const inferCategory = (event: EventItem): CategoryTab => {
  const c = normalizeSpace(event.category || "").toUpperCase();
  const u = normalizeSpace(event.url || "").toLowerCase();
  const t = `${event.title || ""} ${event.summary || ""}`.toLowerCase();
  if (c.includes("NEWS") || u.includes("/news/")) return "NEWS";
  if (c.includes("PRODUCT") || u.includes("/products/")) return "PRODUCTS";
  if (c.includes("RULE") || u.includes("/rules/")) return "RULES";
  if (c.includes("CARD") || u.includes("/cards/")) return "CARDS";
  if (c.includes("MAGAZINE") || u.includes("/magazine/") || t.includes("magazine")) return "MAGAZINE";
  if (c.includes("STREAM") || u.includes("/stream/") || t.includes("stream")) return "STREAM";
  if (c.includes("EVENT") || u.includes("/events/")) return "EVENTS";
  return "NEWS";
};

/* ─── Color maps ─────────────────────────────────────────────────── */
const ACCENT_COLOR: Record<string, string> = {
  NEWS: "#64748b", PRODUCTS: "#ef4444", EVENTS: "#f97316",
  RULES: "#3b82f6", CARDS: "#10b981", MAGAZINE: "#8b5cf6", STREAM: "#ec4899",
};
const CAT_TEXT: Record<string, string> = {
  NEWS: "#94a3b8", PRODUCTS: "#f87171", EVENTS: "#fb923c",
  RULES: "#60a5fa", CARDS: "#34d399", MAGAZINE: "#a78bfa", STREAM: "#f472b6",
};

/* ─── CSS injected once ─────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

/* Animation 1 — Pulse Ring Glow */
@keyframes pulseRing {
  0%,100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
  50%      { box-shadow: 0 0 0 6px rgba(99,102,241,0.10); }
}
/* Animation 2 — Shimmer Sweep */
@keyframes shimmerSweep {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
/* Entry animation */
@keyframes cardIn {
  from { opacity:0; transform:translateY(26px) scale(0.97); }
  to   { opacity:1; transform:translateY(0)  scale(1);    }
}

.ep-card {
  position: relative;
  overflow: hidden;
  animation: cardIn .5s cubic-bezier(.22,.68,0,1.2) both,
             pulseRing 4s ease-in-out infinite;
}
.ep-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: linear-gradient(
    108deg, transparent 28%,
    rgba(255,255,255,0.06) 50%,
    transparent 72%
  );
  background-size: 250% 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s ease;
}
.ep-card:hover::after {
  opacity: 1;
  animation: shimmerSweep 2s ease-in-out infinite;
}
`;

/* ─── framer-motion: Float Bob (Animation 3) ────────────────────── */
const floatVariants = {
  rest:  { y: 0 },
  hover: {
    y: [0, -7, 0],
    transition: { duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" as const },
  },
};

/* ─── EventCard ─────────────────────────────────────────────────── */
function EventCard({ event, index }: { event: EventItem; index: number }) {
  const cat = inferCategory(event);
  const accent = ACCENT_COLOR[cat] ?? "#6366f1";
  const catColor = CAT_TEXT[cat] ?? "#818cf8";
  const displayDate = extractDeclaredDate(event.published_at || "") || "Date TBA";
  const catLabel = cat.charAt(0) + cat.slice(1).toLowerCase();

  return (
    <motion.a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="ep-card"
      variants={floatVariants}
      initial="rest"
      whileHover="hover"
      style={{
        animationDelay: `${(index % 9) * 0.07}s`,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        background: "linear-gradient(145deg,#12121a,#0f0f18)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        padding: "20px",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {/* Coloured top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 2, background: accent, opacity: 0.85, borderRadius: "14px 14px 0 0",
      }} />

      {/* Meta */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
            <circle cx="8" cy="8" r="7" /><polyline points="8 4 8 8 11 10" />
          </svg>
          {displayDate}
        </span>
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: catColor }}>
          {catLabel}
        </span>
      </div>

      {/* Title — Syne for the editorial punch */}
      <p style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 15, fontWeight: 700, lineHeight: 1.4,
        color: "#f0f0f8", margin: 0,
        display: "-webkit-box", WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>
        {normalizeSpace(event.title || "Untitled event")}
      </p>

      {/* Summary */}
      <p style={{
        fontSize: 12, lineHeight: 1.65,
        color: "rgba(255,255,255,0.33)", margin: 0,
        display: "-webkit-box", WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>
        {normalizeSpace(event.summary || "Official update from One Piece Card Game.")}
      </p>

      {/* Footer */}
      <div style={{
        marginTop: "auto", display: "flex", alignItems: "center",
        justifyContent: "space-between", paddingTop: 10,
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(99,102,241,0.7)", display: "flex", alignItems: "center", gap: 4 }}>
          Read more
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="3 8 13 8" /><polyline points="9 4 13 8 9 12" />
          </svg>
        </span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.13)", letterSpacing: ".5px", textTransform: "uppercase" }}>
          {cat}
        </span>
      </div>
    </motion.a>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */
export function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<CategoryTab>("ALL");
  const [error, setError] = useState<string | null>(null);
  const cssRef = useRef(false);

  useEffect(() => {
    if (cssRef.current) return;
    cssRef.current = true;
    const el = document.createElement("style");
    el.id = "ep-global-css";
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => { document.getElementById("ep-global-css")?.remove(); };
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const primary = await fetch(withApiBase("/watcher/recent?limit=all"));
      const response = primary.status === 404
        ? await fetch(withApiBase("/watcher.js/recent?limit=all"))
        : primary;
      const body = (await response.json().catch(() => ({}))) as { events?: EventItem[]; message?: string };
      if (!response.ok) throw new Error(body.message || "Failed to fetch events.");
      setEvents(Array.isArray(body.events) ? body.events : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch events.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadData(); }, []);

  const sortedEvents = useMemo(() =>
    [...events].sort((a, b) => {
      const aS = extractDeclaredDate(a.published_at || "") || `${a.title} ${a.summary}`;
      const bS = extractDeclaredDate(b.published_at || "") || `${b.title} ${b.summary}`;
      return parseDateForSort(bS) - parseDateForSort(aS);
    }), [events]);

  const visibleEvents = useMemo(() =>
    activeTab === "ALL" ? sortedEvents : sortedEvents.filter(e => inferCategory(e) === activeTab),
    [activeTab, sortedEvents]);

  return (
    <section style={{ background: "#0a0a0f", borderRadius: 16, padding: "28px 24px 36px" }}>

      {/* ── Header ──────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, gap: 12, flexWrap: "wrap" }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontSize: 38,
          fontWeight: 800, letterSpacing: -1, color: "#fff",
          lineHeight: 1, margin: 0,
        }}>
          Latest<br /><span style={{ color: "#6366f1" }}>Information</span>
        </h2>
        <button
          onClick={() => void loadData()}
          disabled={loading}
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.7)", fontFamily: "'Inter',sans-serif",
            fontSize: 11, fontWeight: 600, letterSpacing: "1.5px",
            textTransform: "uppercase", padding: "9px 18px",
            borderRadius: 8, cursor: "pointer",
          }}
        >
          <RefreshCw
            style={{ width: 13, height: 13 }}
            className={loading ? "animate-spin" : ""}
          />
          {loading ? "Refreshing" : "Refresh"}
        </button>
      </div>

      {/* ── Tabs ─────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto", scrollbarWidth: "none", marginBottom: 28, flexWrap: "nowrap" }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? "rgba(99,102,241,0.9)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${activeTab === tab ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
              color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.45)",
              fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600,
              letterSpacing: ".8px", textTransform: "uppercase",
              padding: "7px 14px", borderRadius: 6,
              cursor: "pointer", whiteSpace: "nowrap",
              transition: "all .2s",
            }}
          >
            {tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* ── Error ───────────────────────────────── */}
      {error && (
        <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", color: "#fca5a5", fontSize: 12, padding: "10px 14px", borderRadius: 8, marginBottom: 14 }}>
          {error}
        </div>
      )}

      {/* ── Empty ───────────────────────────────── */}
      {visibleEvents.length === 0 && !loading && (
        <div style={{ padding: 48, textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.2)", border: "1px dashed rgba(255,255,255,0.08)", borderRadius: 12 }}>
          No events found for this category.
        </div>
      )}

      {/* ── Cards grid ──────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 16 }}>
        {visibleEvents.map((event, i) => (
          <EventCard key={`${event.url}-${i}`} event={event} index={i} />
        ))}
      </div>

    </section>
  );
}