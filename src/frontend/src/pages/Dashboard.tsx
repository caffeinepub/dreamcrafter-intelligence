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
} from "lucide-react";
import { motion } from "motion/react";
import { Status } from "../backend";
import { useDashboardStats, useReports } from "../hooks/useQueries";

const MOCK_TREND = [42, 55, 48, 71, 65, 83, 77, 94];
const WEEKS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

const FALLBACK_REPORTS = [
  {
    name: "Acme Corp Competitive Analysis",
    status: Status.completed,
    date: BigInt(Date.now() - 86400000) * BigInt(1000000),
  },
  {
    name: "TechNova Market Entry Report",
    status: Status.analyzing,
    date: BigInt(Date.now() - 172800000) * BigInt(1000000),
  },
  {
    name: "Meridian Partners Risk Assessment",
    status: Status.completed,
    date: BigInt(Date.now() - 259200000) * BigInt(1000000),
  },
  {
    name: "BlueOak Financials Deep Dive",
    status: Status.analyzing,
    date: BigInt(Date.now() - 345600000) * BigInt(1000000),
  },
  {
    name: "Stellar Dynamics Sector Report",
    status: Status.completed,
    date: BigInt(Date.now() - 432000000) * BigInt(1000000),
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
        <path d={areaPath} fill="url(#areaGrad)" />
        <polyline
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
  const displayReports =
    reports && reports.length > 0 ? reports : FALLBACK_REPORTS;

  const kpiCards = [
    {
      label: "Companies Tracked",
      value: stats ? Number(stats.companiesTracked) : 248,
      icon: Building2,
      change: "+12%",
      positive: true,
    },
    {
      label: "Active Analyses",
      value: stats ? Number(stats.activeAnalyses) : 34,
      icon: FlaskConical,
      change: "+5%",
      positive: true,
    },
    {
      label: "Data Ingestion (GB)",
      value: stats ? Number(stats.dataIngestion) : 1.82,
      icon: HardDrive,
      change: "-3%",
      positive: false,
    },
    {
      label: "API Requests",
      value: stats ? Number(stats.apiRequestCount) : 14200,
      icon: Activity,
      change: "+28%",
      positive: true,
    },
  ];

  return (
    <div className="p-6 space-y-6" data-ocid="dashboard.page">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
          >
            <Card className="shadow-card border-border">
              <CardContent className="pt-5 pb-4 px-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                    <card.icon size={17} className="text-primary" />
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
                    {typeof card.value === "number" && card.value > 999
                      ? card.value.toLocaleString()
                      : card.value}
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

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
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
                      <TableRow
                        key={report.name}
                        className="border-border"
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
                              report.status === Status.completed
                                ? "bg-success/10 text-success"
                                : "bg-primary/10 text-primary",
                            )}
                          >
                            {report.status === Status.completed
                              ? "Completed"
                              : "Analyzing"}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3 pr-5 text-right text-xs text-muted-foreground">
                          {formatDate(report.date)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.28 }}
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
                Analysis throughput \u2014 last 8 weeks
              </p>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <TrendChart />
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-3">
                  <p className="text-[10px] text-muted-foreground">Peak Week</p>
                  <p className="text-lg font-bold text-foreground">W8</p>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <p className="text-[10px] text-muted-foreground">Avg Score</p>
                  <p className="text-lg font-bold text-foreground">67.5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

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
            <span className="cursor-pointer hover:text-foreground">Terms</span>
            <span className="cursor-pointer hover:text-foreground">
              Privacy
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
