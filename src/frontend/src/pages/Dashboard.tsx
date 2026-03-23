import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  Activity,
  ArrowUpRight,
  Building2,
  FileText,
  FlaskConical,
  HardDrive,
  Search,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Status__1 } from "../backend";
import {
  useDashboardStats,
  useReports,
  useUserProfile,
} from "../hooks/useQueries";

const MOCK_TREND = [42, 55, 48, 71, 65, 83, 77, 94];
const WEEKS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

const FALLBACK_REPORTS = [
  {
    name: "Acme Corp Competitive Analysis",
    status: Status__1.completed,
    date: BigInt(Date.now() - 86400000) * BigInt(1000000),
  },
  {
    name: "TechNova Market Entry Report",
    status: Status__1.analyzing,
    date: BigInt(Date.now() - 172800000) * BigInt(1000000),
  },
  {
    name: "Meridian Partners Risk Assessment",
    status: Status__1.completed,
    date: BigInt(Date.now() - 259200000) * BigInt(1000000),
  },
  {
    name: "BlueOak Financials Deep Dive",
    status: Status__1.analyzing,
    date: BigInt(Date.now() - 345600000) * BigInt(1000000),
  },
  {
    name: "Stellar Dynamics Sector Report",
    status: Status__1.completed,
    date: BigInt(Date.now() - 432000000) * BigInt(1000000),
  },
];

const RECENT_ACTIVITY = [
  {
    text: "Market Scout run for OpenAI",
    time: "2h ago",
    color: "bg-violet-400",
  },
  { text: "Companies database updated", time: "5h ago", color: "bg-blue-400" },
  {
    text: "Market Scout run for Anthropic",
    time: "8h ago",
    color: "bg-emerald-400",
  },
  {
    text: "Scout History export generated",
    time: "1d ago",
    color: "bg-amber-400",
  },
];

function formatDate(ts: bigint) {
  const ms = Number(ts / BigInt(1000000));
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function useCountUp(target: number, duration = 900, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    let rafId: number;
    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setCount(eased * target);
        if (progress < 1) rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, [target, duration, delay]);
  return count;
}

function KpiValue({ value, isFloat }: { value: number; isFloat: boolean }) {
  const animated = useCountUp(value, 900);
  if (isFloat) {
    return <>{animated.toFixed(2)}</>;
  }
  const rounded = Math.round(animated);
  return <>{rounded > 999 ? rounded.toLocaleString() : rounded}</>;
}

function TrendChart() {
  const maxVal = Math.max(...MOCK_TREND);
  const minVal = Math.min(...MOCK_TREND);
  const range = maxVal - minVal || 1;
  const H = 80;
  const W = 100;
  const pts = MOCK_TREND.map((v, i) => {
    const x = (i / (MOCK_TREND.length - 1)) * W;
    const y = H - ((v - minVal) / range) * H;
    return `${x},${y}`;
  });
  const areaPath = `M${pts[0]} ${pts
    .slice(1)
    .map((p) => `L${p}`)
    .join(" ")} L${W},${H} L0,${H} Z`;

  const polyRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    const el = polyRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
    requestAnimationFrame(() => {
      el.style.transition =
        "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1) 0.3s";
      el.style.strokeDashoffset = "0";
    });
  }, []);

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-20"
        preserveAspectRatio="none"
        role="img"
        aria-label="Intelligence trend chart showing analysis throughput over 8 weeks"
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="oklch(0.511 0.214 254)"
              stopOpacity="0.2"
            />
            <stop
              offset="100%"
              stopColor="oklch(0.511 0.214 254)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <motion.path
          d={areaPath}
          fill="url(#areaGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
        <polyline
          ref={polyRef}
          points={pts.join(" ")}
          fill="none"
          stroke="oklch(0.511 0.214 254)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex justify-between mt-2">
        {WEEKS.map((w) => (
          <span key={w} className="text-[10px] text-muted-foreground">
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: reports, isLoading: reportsLoading } = useReports();
  const { data: profile } = useUserProfile();
  const displayReports =
    reports && reports.length > 0 ? reports : FALLBACK_REPORTS;

  const displayName =
    profile &&
    "name" in profile &&
    typeof profile.name === "string" &&
    profile.name
      ? profile.name.split(" ")[0]
      : "there";

  const kpiCards = [
    {
      label: "Companies Tracked",
      value: stats ? Number(stats.companiesTracked) : 248,
      icon: Building2,
      change: "+12%",
      positive: true,
      isFloat: false,
      borderColor: "border-l-blue-500",
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Active Analyses",
      value: stats ? Number(stats.activeAnalyses) : 34,
      icon: FlaskConical,
      change: "+5%",
      positive: true,
      isFloat: false,
      borderColor: "border-l-violet-500",
      iconColor: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      label: "Data Ingestion (GB)",
      value: stats ? Number(stats.dataIngestion) : 1.82,
      icon: HardDrive,
      change: "-3%",
      positive: false,
      isFloat: true,
      borderColor: "border-l-amber-500",
      iconColor: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      label: "API Requests",
      value: stats ? Number(stats.apiRequestCount) : 14200,
      icon: Activity,
      change: "+28%",
      positive: true,
      isFloat: false,
      borderColor: "border-l-emerald-500",
      iconColor: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="min-h-screen" data-ocid="dashboard.page">
      {/* Hero Banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #1a0533 30%, #24243e 60%, #0d1b3e 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 30% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-full px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div>
              <h2 className="text-xl font-bold text-white">
                Welcome back, {displayName} 👋
              </h2>
              <p className="text-sm text-indigo-200/60 mt-0.5">
                Real-time competitive intelligence
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {[
                { value: "1,026", label: "Companies" },
                { value: "342", label: "Features" },
                { value: "91%", label: "Uptime" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-[11px] text-indigo-200/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Page content */}
      <div className="p-6 space-y-6">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <Input
            data-ocid="dashboard.search_input"
            className="pl-10 h-11 bg-card border-border text-sm"
            placeholder="Search companies, reports, analyses\u2026"
          />
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -4,
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                transition: { duration: 0.2 },
              }}
              style={{ cursor: "default" }}
            >
              <Card
                className={cn(
                  "shadow-card border-border border-l-4 h-full",
                  card.borderColor,
                )}
              >
                <CardContent className="pt-5 pb-4 px-5">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center",
                        card.bgColor,
                      )}
                    >
                      <card.icon size={17} className={card.iconColor} />
                    </div>
                    <span
                      className={cn(
                        "flex items-center gap-0.5 text-xs font-semibold",
                        card.positive ? "text-success" : "text-destructive",
                      )}
                    >
                      {card.positive ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}
                      {card.change}
                    </span>
                  </div>
                  {statsLoading ? (
                    <Skeleton className="h-7 w-20 mb-1" />
                  ) : (
                    <p className="text-2xl font-bold text-foreground">
                      <KpiValue value={card.value} isFloat={card.isFloat} />
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {card.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts + Table row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Card className="shadow-card border-border h-full">
              <CardHeader className="pb-3 px-5 pt-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Latest Reports Overview
                  </CardTitle>
                  <button
                    type="button"
                    className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
                  >
                    View all <ArrowUpRight size={12} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="px-0 pb-4">
                {reportsLoading ? (
                  <div
                    className="px-5 space-y-3"
                    data-ocid="dashboard.reports.loading_state"
                  >
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-8 w-full" />
                    ))}
                  </div>
                ) : (
                  <Table data-ocid="dashboard.reports.table">
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="pl-5 text-xs text-muted-foreground font-medium">
                          Report Name
                        </TableHead>
                        <TableHead className="text-xs text-muted-foreground font-medium">
                          Status
                        </TableHead>
                        <TableHead className="text-xs text-muted-foreground font-medium pr-5 text-right">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {displayReports.slice(0, 5).map((report, idx) => (
                        <motion.tr
                          key={report.name}
                          className="border-b border-border transition-colors hover:bg-muted/30"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.5 + idx * 0.07,
                            ease: "easeOut",
                          }}
                          data-ocid={`dashboard.reports.item.${idx + 1}`}
                        >
                          <TableCell className="pl-5 py-3">
                            <div className="flex items-center gap-2">
                              <FileText
                                size={13}
                                className="text-muted-foreground flex-shrink-0"
                              />
                              <span className="text-sm font-medium text-foreground truncate max-w-52">
                                {report.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-3">
                            <Badge
                              className={cn(
                                "text-[10px] font-semibold px-2 py-0.5 rounded-full border-0",
                                report.status === Status__1.completed
                                  ? "bg-success/10 text-success"
                                  : "bg-primary/10 text-primary",
                              )}
                            >
                              {report.status === Status__1.completed
                                ? "Completed"
                                : "Analyzing"}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3 pr-5 text-right text-xs text-muted-foreground">
                            {formatDate(report.date)}
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.46,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Card className="shadow-card border-border h-full">
              <CardHeader className="pb-2 px-5 pt-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Intelligence Trend
                  </CardTitle>
                  <span className="text-xs text-success font-semibold flex items-center gap-0.5">
                    <TrendingUp size={12} /> +18%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Analysis throughput — last 8 weeks
                </p>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <TrendChart />
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <motion.div
                    className="bg-background rounded-lg p-3"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 1.4 }}
                  >
                    <p className="text-[10px] text-muted-foreground">
                      Peak Week
                    </p>
                    <p className="text-lg font-bold text-foreground">W8</p>
                  </motion.div>
                  <motion.div
                    className="bg-background rounded-lg p-3"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 1.5 }}
                  >
                    <p className="text-[10px] text-muted-foreground">
                      Avg Score
                    </p>
                    <p className="text-lg font-bold text-foreground">67.5</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Card className="shadow-card border-border">
            <CardHeader className="pb-3 px-5 pt-5">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-primary" />
                <CardTitle className="text-sm font-semibold text-foreground">
                  Recent Activity
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <div className="space-y-3">
                {RECENT_ACTIVITY.map((item, idx) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + idx * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full flex-shrink-0",
                        item.color,
                      )}
                    />
                    <span className="text-sm text-foreground flex-1">
                      {item.text}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <footer className="pt-2 pb-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              &copy; {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline"
              >
                caffeine.ai
              </a>
            </span>
            <div className="flex gap-3">
              <span className="cursor-pointer hover:text-foreground">
                Terms
              </span>
              <span className="cursor-pointer hover:text-foreground">
                Privacy
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
