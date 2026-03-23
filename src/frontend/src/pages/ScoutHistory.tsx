import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import { Calendar, Clock, History, Search, Sparkles, Tag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useScoutHistory } from "../hooks/useQueries";

const AVATAR_GRADIENTS = [
  "from-violet-500 to-indigo-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-pink-500 to-rose-600",
  "from-amber-500 to-orange-600",
  "from-purple-500 to-violet-600",
];

function getAvatarGradient(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
  }
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}

function formatDateTime(ts: bigint) {
  const ms = Number(ts / BigInt(1_000_000));
  const d = new Date(ms);
  return {
    date: d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function ScoutHistoryPage() {
  const { data: history, isLoading } = useScoutHistory();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = history
    ? history.filter((item) =>
        item.companyName.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  const lastRun =
    history && history.length > 0
      ? formatDateTime(history[0].timestamp).date
      : null;

  function handleRerun(companyName: string) {
    sessionStorage.setItem("scout_prefill", companyName);
    navigate({ to: "/market-scout" });
  }

  return (
    <div className="min-h-screen" data-ocid="scout-history.page">
      {/* Hero Header */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #1a0533 30%, #24243e 60%, #0d1b3e 100%)",
        }}
      >
        {/* Animated radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                  <History size={20} className="text-violet-300" />
                </div>
                <h1 className="text-3xl font-bold text-white">Scout History</h1>
              </div>
              <p className="text-sm text-indigo-200/70 ml-[52px]">
                Your previous Market Scout analyses
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                <Sparkles size={13} className="text-violet-300" />
                <span className="text-xs font-semibold text-white">
                  {isLoading ? "–" : (history?.length ?? 0)} Total Runs
                </span>
              </div>
              {lastRun && (
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                  <Clock size={13} className="text-indigo-300" />
                  <span className="text-xs font-semibold text-white">
                    Last: {lastRun}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="relative"
        >
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            data-ocid="scout-history.search_input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by company name…"
            className="pl-10 h-10 bg-card border-border text-sm"
          />
        </motion.div>

        {/* Loading state */}
        {isLoading && (
          <div className="space-y-4" data-ocid="scout-history.loading_state">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-64" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && (!history || history.length === 0) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="scout-history.empty_state"
          >
            <div className="w-20 h-20 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5">
              <History size={36} className="text-violet-400 opacity-60" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No scout runs yet
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              Run Market Scout on any company to start building your competitive
              intelligence history.
            </p>
            <Link to="/market-scout">
              <Button
                data-ocid="scout-history.go_to_market_scout_button"
                className="gap-2"
              >
                <Sparkles size={14} />
                Go to Market Scout
              </Button>
            </Link>
          </motion.div>
        )}

        {/* Cards list */}
        {!isLoading && history && history.length > 0 && (
          <AnimatePresence mode="wait">
            <div className="space-y-4" data-ocid="scout-history.list">
              {filtered.length === 0 && search ? (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  No results for &ldquo;{search}&rdquo;
                </div>
              ) : (
                filtered.map((item, index) => {
                  const { date, time } = formatDateTime(item.timestamp);
                  const grad = getAvatarGradient(item.companyName);
                  return (
                    <motion.div
                      key={`${item.companyName}-${String(item.timestamp)}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      data-ocid={`scout-history.item.${index + 1}`}
                    >
                      <Card className="border-border hover:border-violet-500/40 transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/5">
                        <CardContent className="p-5">
                          <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div
                              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg`}
                            >
                              {item.companyName.charAt(0).toUpperCase()}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <h3 className="text-base font-bold text-foreground">
                                  {item.companyName}
                                </h3>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                    <Calendar size={11} />
                                    <span>{date}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                    <Clock size={11} />
                                    <span>{time}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-violet-500/10 text-violet-300 border border-violet-500/20 text-[10px] font-semibold gap-1">
                                  <Tag size={9} />
                                  {item.features.length} features
                                </Badge>
                              </div>

                              {item.summary && (
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                  {item.summary}
                                </p>
                              )}

                              <div className="flex items-center gap-2 flex-wrap">
                                <Button
                                  size="sm"
                                  className="h-8 text-xs gap-1.5"
                                  onClick={() => handleRerun(item.companyName)}
                                  data-ocid={`scout-history.rerun_button.${index + 1}`}
                                >
                                  <Sparkles size={11} />
                                  Re-run Analysis
                                </Button>
                                <Link to="/market-scout">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 text-xs"
                                    data-ocid={`scout-history.view_button.${index + 1}`}
                                  >
                                    View in Market Scout
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })
              )}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
