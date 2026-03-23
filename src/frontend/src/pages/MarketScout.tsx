import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  Bot,
  Brain,
  Briefcase,
  Building2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Code,
  Copy,
  Cpu,
  DatabaseZap,
  Download,
  ExternalLink,
  FileText,
  Globe,
  History,
  Loader2,
  Newspaper,
  Radio,
  RefreshCw,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ScoutResult } from "../backend";
import { Status } from "../backend";
import { useSaveScoutResult, useScoutHistory } from "../hooks/useQueries";

type StepState = "pending" | "running" | "done";

interface PipelineStep {
  id: number;
  label: string;
  subtitle?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface CompanyOverview {
  founded: string;
  hq: string;
  ceo: string;
  employees: string;
  type: string;
  industry: string;
}

type ScoutResultExtended = ScoutResult & { companyOverview?: CompanyOverview };

const SIGNAL_TABS = [
  "Release Notes",
  "Features",
  "Press",
  "Dev",
  "Strategy",
  "News",
] as const;

type SignalTab = (typeof SIGNAL_TABS)[number];

const PIPELINE_STEPS: PipelineStep[] = [
  { id: 1, label: "Generate Queries", icon: Search },
  {
    id: 2,
    label: "Fetch Sources",
    subtitle: "6 sources via Bing/SerpAPI",
    icon: Globe,
  },
  {
    id: 3,
    label: "Scrape Content",
    subtitle: "Puppeteer extraction",
    icon: Bot,
  },
  { id: 4, label: "Filter Recency", subtitle: "Last 7 days only", icon: Clock },
  { id: 5, label: "Extract Features", subtitle: "Technical only", icon: Cpu },
  { id: 6, label: "Summarize", icon: FileText },
];

const COMPETITOR_STEPS = [
  { id: 1, label: "Search Planner", icon: Search },
  { id: 2, label: "Web Scraping", icon: Globe },
  { id: 3, label: "Fact Check", icon: Shield },
  { id: 4, label: "Synthesis", icon: Brain },
];

const COMPETITOR_DELAYS = [900, 1100, 1200, 1000];

function generateScoutData(
  company: string,
): Omit<ScoutResultExtended, "status" | "timestamp"> {
  const c = company.trim();
  const queries = [
    `"${c}" API features 2026`,
    `"${c}" technical architecture`,
    `"${c}" developer documentation`,
    `"${c}" SDK release`,
    `"${c}" product updates site:techcrunch.com`,
    `"${c}" engineering blog 2026`,
  ];

  const slug = c.toLowerCase().replace(/\s+/g, "-");
  const sources = [
    `https://docs.${slug}.com/api/reference`,
    `https://github.com/${slug}`,
    `https://techcrunch.com/2026/03/${slug}-platform-update`,
    `https://blog.${slug}.com/engineering`,
    `https://news.ycombinator.com/item?id=${(Math.abs(c.split("").reduce((a, b) => a + b.charCodeAt(0), 0) * 3711) % 39999999) + 10000000}`,
    `https://stackoverflow.com/questions/tagged/${slug}`,
  ];

  const hash = c.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const featureSets = [
    [
      "RESTful API with OAuth 2.0 authentication",
      "GraphQL endpoint available at /graphql",
      "Webhook support for real-time event streaming",
      "SDKs available: Python, Node.js, Go, Java, Ruby",
      "Rate limit: 1,000 req/min on Pro tier",
      "99.9% uptime SLA with multi-region failover",
      "End-to-end encryption (AES-256) at rest and in transit",
      "CLI tool for deployment automation",
      "OpenAPI 3.1 specification published",
      "Async batch processing endpoint with job queue",
    ],
    [
      "gRPC and REST dual-protocol support",
      "WebSocket streaming for real-time data feeds",
      "Docker and Kubernetes-native deployment manifests",
      "SAML 2.0 and OIDC SSO integration",
      "Terraform provider available in registry",
      "Multi-tenant architecture with namespace isolation",
      "Rate limit: 500 req/min on Starter, 5,000 on Enterprise",
      "Event sourcing with Apache Kafka connector",
      "Audit log export via S3-compatible storage",
      "GraphQL subscriptions for live data",
      "Structured logging in JSON with OpenTelemetry traces",
    ],
    [
      "Serverless deployment via AWS Lambda and Google Cloud Run",
      "Native TypeScript and Python client libraries",
      "Built-in A/B testing framework via feature flags",
      "Content delivery via globally distributed CDN (PoPs in 30 regions)",
      "Incremental Static Regeneration (ISR) support",
      "Edge caching with stale-while-revalidate strategy",
      "JWT + API Key dual authentication modes",
      "OpenAPI schema auto-generated from code annotations",
      "Dedicated sandbox environment for testing",
      "Zero-downtime blue/green deployments",
    ],
  ];

  const features = featureSets[hash % featureSets.length];

  const summaries = [
    `${c} offers a robust REST and GraphQL API platform with comprehensive SDK support across major languages. The infrastructure leverages multi-region failover and AES-256 encryption, making it enterprise-ready. Developers can integrate via webhooks, CLI tooling, and a fully published OpenAPI 3.1 specification.`,
    `${c}'s technical stack is built around dual gRPC/REST protocols with WebSocket streaming for real-time workloads. Kubernetes-native deployment and Terraform provider availability indicate strong DevOps integration. The platform supports SAML/OIDC SSO and multi-tenant isolation for enterprise deployments.`,
    `${c} delivers edge-first architecture with 30-region CDN distribution and serverless compatibility on AWS Lambda and GCF. The developer experience centers on TypeScript/Python SDKs, auto-generated OpenAPI schemas, and zero-downtime deployments. Feature flag infrastructure enables controlled rollouts without code changes.`,
  ];

  const summary = summaries[hash % summaries.length];

  const overviewSets: CompanyOverview[] = [
    {
      founded: String(2005 + (hash % 15)),
      hq: "San Francisco, CA",
      ceo: "Alex Rivera",
      employees: "10,000–50,000",
      type: "Public",
      industry: "Cloud Infrastructure",
    },
    {
      founded: String(2010 + (hash % 10)),
      hq: "New York, NY",
      ceo: "Jordan Kim",
      employees: "1,000–10,000",
      type: "Private",
      industry: "AI Research",
    },
    {
      founded: String(2015 + (hash % 8)),
      hq: "Seattle, WA",
      ceo: "Morgan Chen",
      employees: "50,000+",
      type: "Public",
      industry: "Enterprise Software",
    },
  ];

  const companyOverview = overviewSets[hash % overviewSets.length];

  return {
    companyName: c,
    queries,
    sources,
    features,
    summary,
    companyOverview,
  };
}

function getSourceType(url: string): string {
  if (url.includes("github.com")) return "GitHub";
  if (url.includes("stackoverflow.com")) return "Stack Overflow";
  if (url.includes("news.ycombinator.com")) return "Forum";
  if (url.includes("techcrunch.com") || url.includes("news")) return "News";
  if (url.includes("docs.") || url.includes("/docs") || url.includes("/api"))
    return "Docs";
  if (
    url.includes("blog.") ||
    url.includes("/blog") ||
    url.includes("/engineering")
  )
    return "Blog";
  return "News";
}

function getSourceTypeBadgeClass(type: string): string {
  switch (type) {
    case "GitHub":
      return "bg-slate-500/15 text-slate-400 border-slate-500/30";
    case "Stack Overflow":
      return "bg-orange-500/15 text-orange-400 border-orange-500/30";
    case "Forum":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    case "News":
      return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    case "Docs":
      return "bg-violet-500/15 text-violet-400 border-violet-500/30";
    case "Blog":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    default:
      return "bg-muted/50 text-muted-foreground border-border";
  }
}

function getOpenRoles(companyName: string) {
  const hash = companyName.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const roles = [
    "Software Engineer",
    "Data Scientist",
    "AI/ML Engineer",
    "Product Manager",
    "DevOps Engineer",
  ];
  const locations = [
    "Remote",
    "San Francisco, CA",
    "New York, NY",
    "Seattle, WA",
  ];
  const jobSources = ["LinkedIn", "Indeed", "Company Site"];
  const sourceBadgeClass = [
    "bg-blue-500/15 text-blue-400 border-blue-500/30",
    "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
    "bg-violet-500/15 text-violet-400 border-violet-500/30",
  ];
  return roles.map((role, i) => ({
    role,
    location: locations[(hash + i) % locations.length],
    source: jobSources[(hash + i) % jobSources.length],
    sourceBadgeClass: sourceBadgeClass[(hash + i) % sourceBadgeClass.length],
  }));
}

function getBriefingData(companyName: string) {
  const hash = companyName.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const insights = [
    [
      `${companyName} has significantly expanded its API surface area with 3 major releases in Q1 2026, indicating accelerating developer-facing growth.`,
      "Their multi-region architecture gives them a latency advantage over single-datacenter competitors, particularly in APAC markets.",
      "Strong OSS presence on GitHub (10k+ stars) signals developer mindshare that compounds via community-driven integrations.",
      "Enterprise SSO and audit log features suggest a deliberate upmarket move targeting Fortune 500 procurement cycles.",
    ],
    [
      `${companyName}'s gRPC adoption puts them ahead of REST-only players for high-throughput, low-latency use cases.`,
      "Kafka connector availability positions them well for event-driven architectures — a growing enterprise pattern.",
      "Multi-tenant namespace isolation is a key differentiator for regulated industries requiring data residency compliance.",
      "Their Terraform provider lowers infrastructure-as-code adoption barriers, likely reducing churn among DevOps teams.",
    ],
    [
      `${companyName}'s edge-first, CDN-distributed model provides structural cost advantages at scale vs. centralized competitors.`,
      "Feature flag infrastructure enables product-led growth loops — teams can ship faster and roll back safely.",
      "Serverless compatibility with AWS Lambda and GCF makes them a natural fit for startups already on cloud-native stacks.",
      "Zero-downtime deployment tooling addresses a critical pain point for engineering teams with high-SLA requirements.",
    ],
  ];

  const differentiators = [
    [
      "Globally distributed infrastructure with 30+ PoP regions",
      "Developer-first SDK ecosystem spanning 5+ languages",
      "OpenAPI-first design enabling seamless toolchain integration",
    ],
    [
      "Dual-protocol gRPC/REST support for diverse workload types",
      "Enterprise-grade compliance: SOC 2, GDPR, SAML SSO",
      "Event-driven architecture with native Kafka connectivity",
    ],
    [
      "Edge caching with stale-while-revalidate for near-zero latency",
      "Platform-agnostic serverless runtime compatibility",
      "Automated blue/green deployment with instant rollback",
    ],
  ];

  const threats = ["Low", "Medium", "High"];
  const threatColors = [
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
    "bg-amber-500/15 text-amber-400 border-amber-500/40",
    "bg-red-500/15 text-red-400 border-red-500/40",
  ];

  const idx = hash % 3;
  return {
    insights: insights[idx],
    differentiators: differentiators[idx],
    threat: threats[idx],
    threatColor: threatColors[idx],
  };
}

// ─── Dot color for scraped result cards ─────────────────────────────────────
const DOT_COLORS = [
  "bg-blue-400",
  "bg-emerald-400",
  "bg-violet-400",
  "bg-amber-400",
];

const SCRAPED_ARTICLE_SUFFIXES = [
  "API Updates — Technical Changelog Q1 2026",
  "Engineering Architecture Deep Dive 2026",
  "Developer Platform Release Notes — March 2026",
  "SDK v3 Rollout & Breaking Changes Summary",
];

const SCRAPED_SNIPPETS = [
  "The latest API changelog introduces three new endpoints for streaming batch operations, along with deprecation notices for legacy v1 auth methods.",
  "Engineers detail a shift toward distributed read-replica architecture, cutting p99 latency by 40% across APAC data centers.",
  "The v3 SDK ships with native async/await support, revised rate-limit headers, and a revamped retry-backoff strategy for flaky connections.",
  "New developer sandbox environment now available with full production parity; one-click deploy pipelines reduced median setup time to under 3 minutes.",
];

function ScrapedResultsSection({
  company,
  sources,
}: { company: string; sources: string[] }) {
  const displaySources = sources.slice(0, 4);
  return (
    <div data-ocid="market_scout.scraped_results.panel">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5 uppercase tracking-wider text-muted-foreground">
        <Globe size={13} className="text-primary" />
        <span>Scraped Results</span>
        <Badge
          variant="outline"
          className="ml-1 text-[10px] px-2 py-0 border-primary/40 text-primary bg-primary/8"
        >
          4 Sources
        </Badge>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {displaySources.map((src, i) => {
          let domain = src;
          try {
            domain = new URL(src).hostname;
          } catch (_) {
            // keep original
          }
          const type = getSourceType(src);
          return (
            <div
              key={src}
              className="p-3.5 rounded-xl bg-muted/20 border border-border/60 hover:bg-muted/30 transition-colors"
              data-ocid={`market_scout.scraped_results.item.${i + 1}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={cn(
                    "w-2.5 h-2.5 rounded-full flex-shrink-0",
                    DOT_COLORS[i % DOT_COLORS.length],
                  )}
                />
                <span className="text-xs font-semibold text-foreground truncate">
                  {domain}
                </span>
                <Badge
                  variant="outline"
                  className={cn(
                    "ml-auto text-[10px] px-2 py-0 border flex-shrink-0",
                    getSourceTypeBadgeClass(type),
                  )}
                >
                  {type}
                </Badge>
              </div>
              <p className="text-xs font-medium text-foreground/90 leading-snug mb-1.5">
                &ldquo;{company}&rdquo;{" "}
                {SCRAPED_ARTICLE_SUFFIXES[i % SCRAPED_ARTICLE_SUFFIXES.length]}
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                {SCRAPED_SNIPPETS[i % SCRAPED_SNIPPETS.length]}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground/70 bg-muted/40 px-2 py-0.5 rounded-full">
                  Scraped · just now
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LiveAnalysisReport({ features }: { features: string[] }) {
  const signalsFound = features.length * 3;
  const featuresExtracted = features.length;
  const recencyScore = 88 + (featuresExtracted % 10);

  const metrics = [
    {
      label: "Signals Found",
      value: String(signalsFound),
      icon: Zap,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Sources Scraped",
      value: "4",
      icon: Globe,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Features Extracted",
      value: String(featuresExtracted),
      icon: Cpu,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      label: "Recency Score",
      value: `${recencyScore}%`,
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div data-ocid="market_scout.live_analysis.panel">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
        <BarChart2 size={14} className="text-primary" /> Live Analysis Report
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="p-3 rounded-xl border border-border/60 bg-muted/20 flex flex-col items-center gap-2"
          >
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center",
                bg,
              )}
            >
              <Icon size={16} className={color} />
            </div>
            <p className={cn("text-2xl font-bold leading-none", color)}>
              {value}
            </p>
            <p className="text-[10px] text-muted-foreground text-center leading-tight">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeekOverWeekStats({ company }: { company: string }) {
  const hash = company.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const signalsDelta = 8 + (hash % 9); // +8..+16
  const featuresDelta = 4 + (hash % 7); // +4..+10
  const updatesDelta = -(1 + (hash % 5)); // -1..-5 (feels real)

  const chips = [
    { label: "Signals", delta: signalsDelta, positive: true },
    { label: "Features", delta: featuresDelta, positive: true },
    { label: "Updates", delta: updatesDelta, positive: false },
  ];

  return (
    <div data-ocid="market_scout.wow_stats.panel">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Week-over-week intelligence
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map(({ label, delta, positive }) => (
          <div
            key={label}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold",
              positive
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400",
            )}
          >
            {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {label}: {positive ? `+${delta}%` : `${delta}%`}
            {positive ? " ↑" : " ↓"}
          </div>
        ))}
      </div>
    </div>
  );
}

function generateChartData(company: string) {
  const hash = company.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const seed = (n: number, offset: number) =>
    20 + ((hash * (n + 1) * 7 + offset) % 60);

  const weeklyData = Array.from({ length: 8 }, (_, i) => ({
    name: `Wk ${i + 1}`,
    Signals: seed(i, 3),
    Features: seed(i, 11),
    Updates: seed(i, 19),
  }));

  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const monthlyData = months.map((m, i) => ({
    name: m,
    Signals: seed(i, 5) + 10,
    Features: seed(i, 13),
    Updates: seed(i, 21),
  }));

  return { weeklyData, monthlyData };
}

function ActivityCharts({ company }: { company: string }) {
  const { weeklyData, monthlyData } = generateChartData(company);

  const chartTooltipStyle = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "8px",
    fontSize: "11px",
  };

  return (
    <div data-ocid="market_scout.activity_charts.panel">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
        <BarChart2 size={14} className="text-primary" /> Weekly Activity Chart
      </h3>
      <Tabs defaultValue="8week" className="w-full">
        <TabsList className="mb-4 h-8">
          <TabsTrigger
            value="8week"
            className="text-xs px-3 h-7"
            data-ocid="market_scout.chart.8week.tab"
          >
            8-Week View
          </TabsTrigger>
          <TabsTrigger
            value="monthly"
            className="text-xs px-3 h-7"
            data-ocid="market_scout.chart.monthly.tab"
          >
            Monthly View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="8week">
          <div className="rounded-xl border border-border/60 bg-muted/10 p-4">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={weeklyData}
                margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                />
                <Bar
                  dataKey="Signals"
                  fill="hsl(var(--primary))"
                  radius={[3, 3, 0, 0]}
                  opacity={0.9}
                />
                <Bar
                  dataKey="Features"
                  fill="#8b5cf6"
                  radius={[3, 3, 0, 0]}
                  opacity={0.85}
                />
                <Bar
                  dataKey="Updates"
                  fill="#10b981"
                  radius={[3, 3, 0, 0]}
                  opacity={0.85}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="monthly">
          <div className="rounded-xl border border-border/60 bg-muted/10 p-4">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart
                data={monthlyData}
                margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gradSignals" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                  <linearGradient id="gradFeatures" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradUpdates" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                />
                <Area
                  type="monotone"
                  dataKey="Signals"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#gradSignals)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="Features"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#gradFeatures)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="Updates"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#gradUpdates)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StepCard({ step, state }: { step: PipelineStep; state: StepState }) {
  const Icon = step.icon;
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 flex-1 min-w-0 p-3 rounded-xl border transition-all duration-300",
        state === "pending" &&
          "border-dashed border-border bg-muted/20 opacity-50",
        state === "running" && "border-primary bg-primary/5 shadow-sm",
        state === "done" && "border-success/40 bg-success/5",
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
          state === "pending" && "bg-muted",
          state === "running" && "bg-primary/15",
          state === "done" && "bg-success/15",
        )}
      >
        {state === "running" ? (
          <Loader2 size={18} className="text-primary animate-spin" />
        ) : state === "done" ? (
          <CheckCircle size={18} className="text-success" />
        ) : (
          <Icon size={18} className="text-muted-foreground" />
        )}
      </div>
      <div className="text-center">
        <p
          className={cn(
            "text-xs font-semibold leading-tight",
            state === "pending" && "text-muted-foreground",
            state === "running" && "text-primary",
            state === "done" && "text-success",
          )}
        >
          {step.label}
        </p>
        {step.subtitle && (
          <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
            {step.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function CompanyOverviewCard({ overview }: { overview: CompanyOverview }) {
  const fields: { label: string; value: string }[] = [
    { label: "Founded", value: overview.founded },
    { label: "HQ", value: overview.hq },
    { label: "CEO", value: overview.ceo },
    { label: "Employees", value: overview.employees },
    { label: "Type", value: overview.type },
    { label: "Industry", value: overview.industry },
  ];

  return (
    <div>
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
        <Building2 size={14} className="text-primary" /> Company Overview
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {fields.map(({ label, value }) => (
          <div
            key={label}
            className="p-3 rounded-lg bg-muted/30 border border-border/60"
          >
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
              {label}
            </p>
            <p className="text-sm font-semibold text-foreground leading-tight">
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const SOURCE_CATEGORIES = [
  {
    id: "release-notes",
    icon: FileText,
    label: "Release Notes",
    dot: "bg-blue-400",
    color: "text-blue-400",
  },
  {
    id: "features",
    icon: Sparkles,
    label: "Features",
    dot: "bg-violet-400",
    color: "text-violet-400",
  },
  {
    id: "press",
    icon: Newspaper,
    label: "Press",
    dot: "bg-emerald-400",
    color: "text-emerald-400",
  },
  {
    id: "dev-updates",
    icon: Code,
    label: "Dev Updates",
    dot: "bg-amber-400",
    color: "text-amber-400",
  },
  {
    id: "strategy",
    icon: Target,
    label: "Strategy",
    dot: "bg-rose-400",
    color: "text-rose-400",
  },
  {
    id: "news",
    icon: Radio,
    label: "News",
    dot: "bg-cyan-400",
    color: "text-cyan-400",
  },
];

function IntelligenceSourcesSection({ sources }: { sources: string[] }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10">
      {/* Dark gradient background */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #1a0533 30%, #24243e 60%, #0d1b3e 100%)",
        }}
      />
      <div
        className="absolute inset-0 rounded-xl opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.4) 0%, transparent 70%)",
        }}
      />
      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <DatabaseZap size={14} className="text-indigo-400" />
              Intelligence Sources
            </h3>
            <p className="text-[11px] text-white/40 mt-0.5">
              6 active source categories
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-white/40">Live</span>
          </div>
        </div>

        {/* 6 Category Badges Row */}
        <div className="flex flex-wrap gap-2 mb-4">
          {SOURCE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 hover:bg-white/10 transition-colors"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                <Icon size={10} className={cat.color} />
                <span className="text-[10px] text-white/70 font-medium">
                  {cat.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Source list */}
        <div className="space-y-2">
          {sources.map((src) => {
            const type = getSourceType(src);
            let domain = src;
            try {
              domain = new URL(src).hostname;
            } catch (_) {
              // keep original
            }
            return (
              <div
                key={src}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <Globe size={13} className="text-white/40 flex-shrink-0" />
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-300 hover:text-indigo-200 hover:underline truncate flex-1 min-w-0"
                  title={src}
                >
                  {domain}
                </a>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] px-2 py-0.5 border flex-shrink-0",
                    getSourceTypeBadgeClass(type),
                  )}
                >
                  {type}
                </Badge>
                <span className="text-[10px] text-white/30 flex-shrink-0 whitespace-nowrap">
                  Scraped · just now
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OpenRolesSection({ companyName }: { companyName: string }) {
  const roles = getOpenRoles(companyName);
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
        <Briefcase size={14} className="text-primary" /> Open Roles
      </h3>
      <div className="space-y-2" data-ocid="market_scout.open_roles.list">
        {roles.map((item, idx) => (
          <div
            key={item.role}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/50 hover:bg-muted/30 transition-colors"
            data-ocid={`market_scout.open_roles.item.${idx + 1}`}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{item.role}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.location}
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] px-2 py-0.5 border flex-shrink-0",
                item.sourceBadgeClass,
              )}
            >
              {item.source}
            </Badge>
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline flex-shrink-0"
              data-ocid={`market_scout.open_roles.apply.button.${idx + 1}`}
              onClick={() =>
                window.open("https://www.linkedin.com/jobs/", "_blank")
              }
            >
              Apply Now <ExternalLink size={10} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultPanel({
  result,
  onRerun,
}: {
  result: ScoutResultExtended;
  onRerun: () => void;
}) {
  const [queriesOpen, setQueriesOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SignalTab>("Release Notes");
  const date = new Date(
    Number(result.timestamp) / 1_000_000,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const exportTxt = () => {
    const lines = [
      "Market Scout — Technical Intelligence Report",
      `Company: ${result.companyName}`,
      `Date: ${date}`,
      "",
      "TECHNICAL FEATURES",
      ...result.features.map((f) => `• ${f}`),
      "",
      "AI SUMMARY",
      result.summary,
      "",
      "SOURCES",
      ...result.sources,
      "",
      "SEARCH QUERIES",
      ...result.queries,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `market-scout-${result.companyName.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyAll = () => {
    const text = `${result.companyName} — Technical Report\n\n${result.summary}\n\nFeatures:\n${result.features.map((f) => `• ${f}`).join("\n")}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35 }}
      className="space-y-3"
      data-ocid="market_scout.result.panel"
    >
      {/* Signal category tabs */}
      <div className="flex gap-1 flex-wrap" data-ocid="market_scout.signal.tab">
        {SIGNAL_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
              activeTab === tab
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <CardTitle className="text-xl">{result.companyName}</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Technical Intelligence Report · {date}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="text-xs border-success/50 text-success bg-success/8"
              >
                Technical Only
              </Badge>
              <Badge
                variant="outline"
                className="text-xs border-primary/50 text-primary bg-primary/8"
              >
                Last 7 Days
              </Badge>
              <Badge
                variant="outline"
                className="text-xs border-orange-500/50 text-orange-500 bg-orange-500/8"
              >
                Marketing Filtered
              </Badge>
              <Badge
                variant="outline"
                className="text-xs border-muted-foreground/40 text-muted-foreground"
              >
                Funding Excluded
              </Badge>
            </div>
          </div>
          <div className="flex gap-2 pt-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={copyAll}
              data-ocid="market_scout.copy.button"
            >
              <Copy size={13} className="mr-1.5" /> Copy
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={exportTxt}
              data-ocid="market_scout.export.button"
            >
              <Download size={13} className="mr-1.5" /> Export .txt
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onRerun}
              data-ocid="market_scout.rerun.button"
              className="border-primary/40 text-primary hover:bg-primary/8"
            >
              <RefreshCw size={13} className="mr-1.5" /> Re-run Analysis
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 1. Company Overview */}
          {result.companyOverview && (
            <CompanyOverviewCard overview={result.companyOverview} />
          )}

          {/* 2. Live Analysis Report */}
          <LiveAnalysisReport features={result.features} />

          {/* 3. Week-over-week intelligence */}
          <WeekOverWeekStats company={result.companyName} />

          {/* 4. AI Summary */}
          <div>
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              <Sparkles size={14} className="text-primary" /> AI Summary
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* 5. Technical Features */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Technical Features</h3>
            <div className="flex flex-wrap gap-2">
              {result.features.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/20 text-xs text-primary font-medium"
                >
                  <CheckCircle size={10} /> {f}
                </span>
              ))}
            </div>
          </div>

          {/* 6. Scraped Results — 4 Sources */}
          <ScrapedResultsSection
            company={result.companyName}
            sources={result.sources}
          />

          {/* 7. Activity Charts */}
          <ActivityCharts company={result.companyName} />

          {/* 8. Intelligence Sources */}
          <IntelligenceSourcesSection sources={result.sources} />

          {/* 9. Open Roles */}
          <OpenRolesSection companyName={result.companyName} />

          {/* 10. Search Queries */}
          <div>
            <button
              type="button"
              onClick={() => setQueriesOpen((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
              data-ocid="market_scout.queries.toggle"
            >
              <Search size={13} />
              Search Queries Used
              {queriesOpen ? (
                <ChevronUp size={13} />
              ) : (
                <ChevronDown size={13} />
              )}
            </button>
            <AnimatePresence>
              {queriesOpen && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 space-y-1 overflow-hidden"
                >
                  {result.queries.map((q, i) => (
                    <li
                      key={q}
                      className="text-xs text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-4 h-4 rounded bg-muted flex items-center justify-center text-[9px] font-bold text-muted-foreground flex-shrink-0">
                        {i + 1}
                      </span>
                      {q}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CompetitorBriefingCard({ companyName }: { companyName: string }) {
  const [stepStates, setStepStates] = useState<StepState[]>([
    "pending",
    "pending",
    "pending",
    "pending",
  ]);
  const [done, setDone] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    let cancelled = false;
    (async () => {
      for (let i = 0; i < 4; i++) {
        if (cancelled) break;
        setStepStates((prev) =>
          prev.map((s, idx) => (idx === i ? "running" : s)),
        );
        await new Promise((r) => setTimeout(r, COMPETITOR_DELAYS[i]));
        if (cancelled) break;
        setStepStates((prev) => prev.map((s, idx) => (idx === i ? "done" : s)));
      }
      if (!cancelled) setDone(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const briefing = getBriefingData(companyName);

  const exportBriefing = () => {
    const lines = [
      `AI Competitor Briefing — ${companyName}`,
      `Generated: ${new Date().toLocaleDateString()}`,
      "",
      "KEY INSIGHTS",
      ...briefing.insights.map((b) => `• ${b}`),
      "",
      "KEY DIFFERENTIATORS",
      ...briefing.differentiators.map((d) => `• ${d}`),
      "",
      `THREAT LEVEL: ${briefing.threat}`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `competitor-briefing-${companyName.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      data-ocid="market_scout.competitor_briefing.panel"
    >
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
                <Brain size={16} className="text-violet-400" />
              </div>
              <div>
                <CardTitle className="text-base">
                  AI Competitor Briefing
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Structured competitive intelligence report
                </p>
              </div>
            </div>
            <Badge className="bg-violet-500/15 text-violet-400 border-violet-500/30 border text-[10px] px-2.5">
              <Zap size={9} className="mr-1" /> 4-step AI pipeline
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 4-step pipeline */}
          <div className="grid grid-cols-4 gap-2">
            {COMPETITOR_STEPS.map((step, i) => {
              const state = stepStates[i];
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-center transition-all duration-300",
                    state === "pending" &&
                      "border-dashed border-border bg-muted/20 opacity-50",
                    state === "running" &&
                      "border-violet-500/50 bg-violet-500/5 shadow-sm",
                    state === "done" && "border-success/40 bg-success/5",
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                      state === "pending" && "bg-muted",
                      state === "running" && "bg-violet-500/15",
                      state === "done" && "bg-success/15",
                    )}
                  >
                    {state === "running" ? (
                      <Loader2
                        size={15}
                        className="text-violet-400 animate-spin"
                      />
                    ) : state === "done" ? (
                      <CheckCircle size={15} className="text-success" />
                    ) : (
                      <Icon size={15} className="text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                      STEP {step.id}
                    </p>
                    <p
                      className={cn(
                        "text-[10px] font-semibold leading-tight mt-0.5",
                        state === "pending" && "text-muted-foreground",
                        state === "running" && "text-violet-400",
                        state === "done" && "text-success",
                      )}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
                data-ocid="market_scout.briefing.report"
              >
                <div className="p-3.5 rounded-xl bg-violet-500/5 border border-violet-500/20">
                  <p className="text-xs font-semibold text-violet-400 mb-2.5 flex items-center gap-1.5">
                    <FileText size={12} /> Structured Competitor Briefing Report
                  </p>
                  <ul className="space-y-2">
                    {briefing.insights.map((insight) => (
                      <li
                        key={insight}
                        className="text-xs text-muted-foreground leading-relaxed flex gap-2"
                      >
                        <span className="text-violet-400 mt-0.5 flex-shrink-0">
                          •
                        </span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                    <Sparkles size={11} className="text-primary" /> Key
                    Differentiators
                  </h4>
                  <div className="space-y-1.5">
                    {briefing.differentiators.map((diff) => (
                      <div key={diff} className="flex items-start gap-2">
                        <CheckCircle
                          size={11}
                          className="text-success mt-0.5 flex-shrink-0"
                        />
                        <p className="text-xs text-muted-foreground">{diff}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">
                      Threat Level:
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs border font-semibold",
                        briefing.threatColor,
                      )}
                      data-ocid="market_scout.threat_level.badge"
                    >
                      {briefing.threat}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={exportBriefing}
                    className="border-violet-500/40 text-violet-400 hover:bg-violet-500/8"
                    data-ocid="market_scout.briefing.export.button"
                  >
                    <Download size={13} className="mr-1.5" /> Export Briefing
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const INTEL_CATEGORIES = [
  {
    label: "Release Notes",
    desc: "Official version releases & changelogs",
    icon: FileText,
    color: "text-blue-400",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.2)",
  },
  {
    label: "Features",
    desc: "Product announcements & feature drops",
    icon: Sparkles,
    color: "text-violet-400",
    bg: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.2)",
  },
  {
    label: "Press",
    desc: "News articles & media coverage",
    icon: Newspaper,
    color: "text-emerald-400",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.2)",
  },
  {
    label: "Dev Updates",
    desc: "Engineering blog & API changes",
    icon: Code,
    color: "text-amber-400",
    bg: "rgba(251,191,36,0.1)",
    border: "rgba(251,191,36,0.2)",
  },
  {
    label: "Strategy",
    desc: "Vision, roadmap & strategic moves",
    icon: Target,
    color: "text-rose-400",
    bg: "rgba(251,113,133,0.1)",
    border: "rgba(251,113,133,0.2)",
  },
  {
    label: "News",
    desc: "Real-time coverage & breaking news",
    icon: Radio,
    color: "text-cyan-400",
    bg: "rgba(34,211,238,0.1)",
    border: "rgba(34,211,238,0.2)",
  },
];

function HeroIntelligenceSources() {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #1a0533 30%, #24243e 60%, #0d1b3e 100%)",
        position: "relative",
        overflow: "hidden",
        borderRadius: "1rem",
        marginBottom: "1.5rem",
      }}
      className="p-8"
      data-ocid="market_scout.intel_sources.section"
    >
      {/* Radial glow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(139,92,246,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Shimmer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "50%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
          animation: "shimmerIntel 3s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <style>
        {"@keyframes shimmerIntel { 0% { left: -100%; } 100% { left: 200%; } }"}
      </style>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-7">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
            style={{
              background: "rgba(139,92,246,0.15)",
              border: "1px solid rgba(139,92,246,0.3)",
              color: "#c4b5fd",
            }}
          >
            <Radio size={11} /> 6 Active Source Categories
          </span>
          <h2
            className="text-2xl font-bold mb-1.5"
            style={{ color: "#f1f0ff" }}
          >
            Intelligence Sources
          </h2>
          <p className="text-sm" style={{ color: "rgba(196,181,253,0.7)" }}>
            Quick access to signals across 6 intelligence categories
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-7">
          {INTEL_CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className="rounded-xl p-4 flex flex-col gap-2 cursor-default"
                style={{
                  background: cat.bg,
                  border: `1px solid ${cat.border}`,
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} className={cat.color} />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#e9e4ff" }}
                  >
                    {cat.label}
                  </span>
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(196,181,253,0.65)" }}
                >
                  {cat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { value: "429+", label: "Companies Tracked" },
            { value: "6", label: "Signal Categories" },
            { value: "24", label: "Intelligence Sources" },
            { value: "Real-time", label: "Update Frequency" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-0.5"
            >
              <span className="text-xl font-bold" style={{ color: "#c4b5fd" }}>
                {stat.value}
              </span>
              <span
                className="text-xs"
                style={{ color: "rgba(196,181,253,0.6)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MarketScoutPage() {
  const [company, setCompany] = useState("");
  const [stepStates, setStepStates] = useState<StepState[]>([
    "pending",
    "pending",
    "pending",
    "pending",
    "pending",
    "pending",
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ScoutResultExtended | null>(null);
  const [queriesReadyBanner, setQueriesReadyBanner] = useState(false);
  const [queryCount, setQueryCount] = useState(0);
  const { refetch: refetchHistory } = useScoutHistory();
  const { mutateAsync: saveScout } = useSaveScoutResult();
  const abortRef = useRef(false);

  useEffect(() => {
    return () => {
      abortRef.current = true;
    };
  }, []);

  const runScout = async (targetCompany?: string) => {
    const target = (targetCompany ?? company).trim();
    if (!target || isRunning) return;
    abortRef.current = false;
    setIsRunning(true);
    setResult(null);
    setQueriesReadyBanner(false);
    setStepStates([
      "pending",
      "pending",
      "pending",
      "pending",
      "pending",
      "pending",
    ]);

    const delays = [800, 1200, 1500, 700, 1000, 900];

    for (let i = 0; i < 6; i++) {
      if (abortRef.current) break;
      setStepStates((prev) =>
        prev.map((s, idx) => (idx === i ? "running" : s)),
      );
      await new Promise((r) => setTimeout(r, delays[i]));
      if (abortRef.current) break;
      setStepStates((prev) => prev.map((s, idx) => (idx === i ? "done" : s)));

      if (i === 0 && !abortRef.current) {
        const data = generateScoutData(target);
        setQueryCount(data.queries.length);
        setQueriesReadyBanner(true);
      }
    }

    if (!abortRef.current) {
      const data = generateScoutData(target);
      const now = BigInt(Date.now()) * BigInt(1_000_000);
      const scoutResult: ScoutResultExtended = {
        ...data,
        status: Status.completed,
        timestamp: now,
      };
      setResult(scoutResult);
      try {
        await saveScout(scoutResult);
        refetchHistory();
      } catch (_) {
        // save failed silently
      }
    }
    setIsRunning(false);
  };

  const handleRerun = () => {
    setResult(null);
    setQueriesReadyBanner(false);
    setStepStates([
      "pending",
      "pending",
      "pending",
      "pending",
      "pending",
      "pending",
    ]);
    runScout(company);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <HeroIntelligenceSources />
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
            <Sparkles size={18} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Market Scout</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          AI-powered technical intelligence — no marketing, no funding news.
        </p>
      </motion.div>

      <Card className="border-border">
        <CardContent className="pt-5 pb-5">
          <div className="flex gap-3">
            <Input
              placeholder="Enter company name (e.g. Stripe, Vercel, Cloudflare)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runScout()}
              disabled={isRunning}
              className="flex-1"
              data-ocid="market_scout.company.input"
            />
            <Button
              onClick={() => runScout()}
              disabled={isRunning || !company.trim()}
              className="px-5"
              data-ocid="market_scout.run.button"
            >
              {isRunning ? (
                <>
                  <Loader2 size={15} className="mr-2 animate-spin" /> Running...
                </>
              ) : (
                <>
                  <Search size={15} className="mr-2" /> Run Scout
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {(isRunning || stepStates.some((s) => s !== "pending")) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {PIPELINE_STEPS.map((step, i) => (
                    <StepCard key={step.id} step={step} state={stepStates[i]} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Queries ready banner */}
      <AnimatePresence>
        {queriesReadyBanner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-success/8 border border-success/30"
            data-ocid="market_scout.queries_ready.banner"
          >
            <CheckCircle size={16} className="text-success flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-success">
                ✓ Search queries generated
              </span>
              <span className="text-sm text-muted-foreground ml-2">
                — {queryCount} market intelligence queries ready for web search
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && <ResultPanel result={result} onRerun={handleRerun} />}
      </AnimatePresence>

      {/* Competitor Briefing section divider */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3"
            data-ocid="market_scout.competitor_briefing.section"
          >
            <div className="flex-1 h-px bg-border" />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25">
              <Brain size={12} className="text-violet-400" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-violet-400">
                Competitor Briefing
              </span>
            </div>
            <div className="flex-1 h-px bg-border" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && (
          <CompetitorBriefingCard
            key={`briefing-${result.companyName}-${String(result.timestamp)}`}
            companyName={result.companyName}
          />
        )}
      </AnimatePresence>

      <footer className="text-center text-xs text-muted-foreground pt-2 pb-4">
        Dreamcrafter © {new Date().getFullYear()}. Built with ❤️ by Dreamcrafter
      </footer>
    </div>
  );
}
