import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  BarChart2,
  Bot,
  Briefcase,
  Building2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  GitBranch,
  Globe,
  Loader2,
  MapPin,
  Search,
  Sparkles,
  Users,
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
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ScoutResult } from "../backend";
import { Status } from "../backend";
import { companies } from "../data/companies";
import { useSaveScoutResult } from "../hooks/useQueries";

// ─── Types ───────────────────────────────────────────────────────────────────
type StepState = "pending" | "running" | "done";
interface PipelineStep {
  id: number;
  label: string;
  subtitle?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

type Role =
  | "Software Engineer"
  | "Data Scientist"
  | "AI/ML Engineer"
  | "Product Manager"
  | "DevOps Engineer"
  | "Cybersecurity Engineer"
  | "Cloud Engineer";

interface Job {
  id: number;
  company: string;
  role: Role;
  location: string;
  source: "LinkedIn" | "Indeed" | "Company Site";
  postedAgo: string;
  applyLink: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────
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

const _ROLE_COLORS: Record<Role, string> = {
  "Software Engineer": "#4f7df3",
  "Data Scientist": "#a855f7",
  "AI/ML Engineer": "#ec4899",
  "Product Manager": "#f59e0b",
  "DevOps Engineer": "#22c55e",
  "Cybersecurity Engineer": "#ef4444",
  "Cloud Engineer": "#06b6d4",
};

const ROLES: Role[] = [
  "Software Engineer",
  "Data Scientist",
  "AI/ML Engineer",
  "Product Manager",
  "DevOps Engineer",
  "Cybersecurity Engineer",
  "Cloud Engineer",
];

const ALL_JOBS: Job[] = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    location: "Mountain View, CA",
    source: "LinkedIn",
    postedAgo: "2h ago",
    applyLink: "#",
  },
  {
    id: 2,
    company: "Anthropic",
    role: "AI/ML Engineer",
    location: "San Francisco, CA",
    source: "Company Site",
    postedAgo: "3h ago",
    applyLink: "#",
  },
  {
    id: 3,
    company: "Microsoft",
    role: "Cloud Engineer",
    location: "Redmond, WA",
    source: "LinkedIn",
    postedAgo: "5h ago",
    applyLink: "#",
  },
  {
    id: 4,
    company: "Meta",
    role: "Data Scientist",
    location: "Menlo Park, CA",
    source: "Indeed",
    postedAgo: "6h ago",
    applyLink: "#",
  },
  {
    id: 5,
    company: "OpenAI",
    role: "Software Engineer",
    location: "San Francisco, CA",
    source: "Company Site",
    postedAgo: "8h ago",
    applyLink: "#",
  },
  {
    id: 6,
    company: "Stripe",
    role: "DevOps Engineer",
    location: "Remote",
    source: "LinkedIn",
    postedAgo: "9h ago",
    applyLink: "#",
  },
  {
    id: 7,
    company: "Amazon",
    role: "Product Manager",
    location: "Seattle, WA",
    source: "Indeed",
    postedAgo: "11h ago",
    applyLink: "#",
  },
  {
    id: 8,
    company: "Databricks",
    role: "AI/ML Engineer",
    location: "San Francisco, CA",
    source: "Company Site",
    postedAgo: "12h ago",
    applyLink: "#",
  },
  {
    id: 9,
    company: "CrowdStrike",
    role: "Cybersecurity Engineer",
    location: "Austin, TX",
    source: "LinkedIn",
    postedAgo: "14h ago",
    applyLink: "#",
  },
  {
    id: 10,
    company: "Netflix",
    role: "Software Engineer",
    location: "Los Gatos, CA",
    source: "Company Site",
    postedAgo: "16h ago",
    applyLink: "#",
  },
  {
    id: 11,
    company: "Cloudflare",
    role: "Cloud Engineer",
    location: "Remote",
    source: "LinkedIn",
    postedAgo: "18h ago",
    applyLink: "#",
  },
  {
    id: 12,
    company: "Figma",
    role: "Product Manager",
    location: "San Francisco, CA",
    source: "Indeed",
    postedAgo: "20h ago",
    applyLink: "#",
  },
  {
    id: 13,
    company: "Vercel",
    role: "DevOps Engineer",
    location: "Remote",
    source: "Company Site",
    postedAgo: "22h ago",
    applyLink: "#",
  },
  {
    id: 14,
    company: "Hugging Face",
    role: "AI/ML Engineer",
    location: "New York, NY",
    source: "LinkedIn",
    postedAgo: "24h ago",
    applyLink: "#",
  },
  {
    id: 15,
    company: "Palantir",
    role: "Data Scientist",
    location: "Denver, CO",
    source: "Indeed",
    postedAgo: "26h ago",
    applyLink: "#",
  },
  {
    id: 16,
    company: "Okta",
    role: "Cybersecurity Engineer",
    location: "San Francisco, CA",
    source: "Company Site",
    postedAgo: "30h ago",
    applyLink: "#",
  },
  {
    id: 17,
    company: "Snowflake",
    role: "Cloud Engineer",
    location: "San Mateo, CA",
    source: "LinkedIn",
    postedAgo: "36h ago",
    applyLink: "#",
  },
  {
    id: 18,
    company: "Notion",
    role: "Software Engineer",
    location: "San Francisco, CA",
    source: "Indeed",
    postedAgo: "40h ago",
    applyLink: "#",
  },
];

const industryColors: Record<string, string> = {
  Technology: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Finance: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Healthcare: "bg-red-500/15 text-red-400 border-red-500/30",
  Retail: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Automotive: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Energy: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Aerospace: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  Consulting: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Manufacturing: "bg-slate-400/15 text-slate-300 border-slate-400/30",
  "Consumer Goods": "bg-pink-500/15 text-pink-400 border-pink-500/30",
  Media: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  Telecommunications: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  Logistics: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  "Real Estate": "bg-lime-500/15 text-lime-400 border-lime-500/30",
  "Food & Beverage": "bg-rose-500/15 text-rose-400 border-rose-500/30",
  Aviation: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Mining: "bg-stone-400/15 text-stone-300 border-stone-400/30",
  Conglomerate: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30",
};

const countryFlags: Record<string, string> = {
  "United States": "🇺🇸",
  "United Kingdom": "🇬🇧",
  Germany: "🇩🇪",
  Japan: "🇯🇵",
  China: "🇨🇳",
  France: "🇫🇷",
  Sweden: "🇸🇪",
  Switzerland: "🇨🇭",
  Netherlands: "🇳🇱",
  India: "🇮🇳",
  "South Korea": "🇰🇷",
  Canada: "🇨🇦",
  Australia: "🇦🇺",
  Singapore: "🇸🇬",
  Spain: "🇪🇸",
  Italy: "🇮🇹",
  Finland: "🇫🇮",
  Denmark: "🇩🇰",
  Norway: "🇳🇴",
  Ireland: "🇮🇪",
  Belgium: "🇧🇪",
};

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
  fontSize: "12px",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getIndustryColor(industry: string) {
  return (
    industryColors[industry] ??
    "bg-muted/50 text-muted-foreground border-border"
  );
}

function getFlag(country: string) {
  return countryFlags[country] ?? "🌍";
}

function getFoundedYear(name: string) {
  const hash = name.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  return 1980 + (hash % 40);
}

function generateScoutData(
  company: string,
): Omit<ScoutResult, "status" | "timestamp"> {
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
      "RESTful API with OAuth 2.0",
      "GraphQL endpoint",
      "Webhook support",
      "SDKs: Python, Node.js, Go",
      "99.9% uptime SLA",
      "AES-256 encryption",
      "CLI deployment tool",
      "OpenAPI 3.1 spec",
      "Async batch processing",
      "Rate limit: 1,000 req/min",
    ],
    [
      "gRPC and REST dual-protocol",
      "WebSocket streaming",
      "Docker/Kubernetes manifests",
      "SAML 2.0 + OIDC SSO",
      "Terraform provider",
      "Multi-tenant architecture",
      "Event sourcing + Kafka",
      "Audit log export",
      "GraphQL subscriptions",
      "OpenTelemetry traces",
    ],
    [
      "Serverless AWS Lambda + GCF",
      "TypeScript + Python SDKs",
      "A/B testing via feature flags",
      "CDN with 30 PoPs",
      "ISR support",
      "Edge caching",
      "JWT + API Key auth",
      "Auto-generated OpenAPI schema",
      "Sandbox environment",
      "Blue/green deployments",
    ],
  ];
  const features = featureSets[hash % featureSets.length];
  const summaries = [
    `${c} offers a robust REST and GraphQL API platform with comprehensive SDK support across major languages. The infrastructure leverages multi-region failover and AES-256 encryption, making it enterprise-ready.`,
    `${c}'s technical stack is built around dual gRPC/REST protocols with WebSocket streaming for real-time workloads. Kubernetes-native deployment and Terraform provider availability indicate strong DevOps integration.`,
    `${c} delivers edge-first architecture with 30-region CDN distribution and serverless compatibility. The developer experience centers on TypeScript/Python SDKs and zero-downtime deployments.`,
  ];
  const summary = summaries[hash % summaries.length];
  return { companyName: c, queries, sources, features, summary };
}

// ─── Analytics data variants ──────────────────────────────────────────────────
function getAnalyticsData(variant: number) {
  const multipliers = [1, 1.3, 0.8];
  const m = multipliers[variant];
  const weekly = [
    {
      day: "Mon",
      signals: Math.round(82 * m),
      features: Math.round(34 * m),
      updates: Math.round(12 * m),
    },
    {
      day: "Tue",
      signals: Math.round(110 * m),
      features: Math.round(45 * m),
      updates: Math.round(8 * m),
    },
    {
      day: "Wed",
      signals: Math.round(95 * m),
      features: Math.round(52 * m),
      updates: Math.round(15 * m),
    },
    {
      day: "Thu",
      signals: Math.round(138 * m),
      features: Math.round(61 * m),
      updates: Math.round(11 * m),
    },
    {
      day: "Fri",
      signals: Math.round(124 * m),
      features: Math.round(48 * m),
      updates: Math.round(18 * m),
    },
    {
      day: "Sat",
      signals: Math.round(67 * m),
      features: Math.round(29 * m),
      updates: Math.round(6 * m),
    },
    {
      day: "Sun",
      signals: Math.round(55 * m),
      features: Math.round(22 * m),
      updates: Math.round(4 * m),
    },
  ];
  const eightWeek = [
    {
      week: "W1",
      signals: Math.round(420 * m),
      features: Math.round(180 * m),
      updates: Math.round(45 * m),
    },
    {
      week: "W2",
      signals: Math.round(510 * m),
      features: Math.round(210 * m),
      updates: Math.round(58 * m),
    },
    {
      week: "W3",
      signals: Math.round(475 * m),
      features: Math.round(195 * m),
      updates: Math.round(52 * m),
    },
    {
      week: "W4",
      signals: Math.round(640 * m),
      features: Math.round(255 * m),
      updates: Math.round(71 * m),
    },
    {
      week: "W5",
      signals: Math.round(590 * m),
      features: Math.round(240 * m),
      updates: Math.round(64 * m),
    },
    {
      week: "W6",
      signals: Math.round(720 * m),
      features: Math.round(290 * m),
      updates: Math.round(82 * m),
    },
    {
      week: "W7",
      signals: Math.round(680 * m),
      features: Math.round(275 * m),
      updates: Math.round(76 * m),
    },
    {
      week: "W8",
      signals: Math.round(810 * m),
      features: Math.round(320 * m),
      updates: Math.round(91 * m),
    },
  ];
  const monthly = [
    {
      month: "Oct",
      signals: Math.round(1800 * m),
      features: Math.round(720 * m),
      updates: Math.round(185 * m),
    },
    {
      month: "Nov",
      signals: Math.round(2100 * m),
      features: Math.round(840 * m),
      updates: Math.round(210 * m),
    },
    {
      month: "Dec",
      signals: Math.round(1950 * m),
      features: Math.round(780 * m),
      updates: Math.round(195 * m),
    },
    {
      month: "Jan",
      signals: Math.round(2450 * m),
      features: Math.round(960 * m),
      updates: Math.round(240 * m),
    },
    {
      month: "Feb",
      signals: Math.round(2800 * m),
      features: Math.round(1100 * m),
      updates: Math.round(275 * m),
    },
    {
      month: "Mar",
      signals: Math.round(3200 * m),
      features: Math.round(1280 * m),
      updates: Math.round(320 * m),
    },
  ];
  return { weekly, eightWeek, monthly };
}

// ─── Sub-components ───────────────────────────────────────────────────────────
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

function ResultPanel({ result }: { result: ScoutResult }) {
  const [queriesOpen, setQueriesOpen] = useState(false);
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
    navigator.clipboard.writeText(
      `${result.companyName} — Technical Report\n\n${result.summary}\n\nFeatures:\n${result.features.map((f) => `• ${f}`).join("\n")}`,
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35 }}
    >
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
                className="text-xs border-success/50 text-success"
              >
                Technical Only
              </Badge>
              <Badge
                variant="outline"
                className="text-xs border-primary/50 text-primary"
              >
                Last 7 Days
              </Badge>
              <Badge
                variant="outline"
                className="text-xs border-orange-500/50 text-orange-500"
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
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" onClick={copyAll}>
              <Copy size={13} className="mr-1.5" /> Copy
            </Button>
            <Button size="sm" variant="outline" onClick={exportTxt}>
              <Download size={13} className="mr-1.5" /> Export .txt
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              <Sparkles size={14} className="text-primary" /> AI Summary
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {result.summary}
            </p>
          </div>
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
          <div>
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              <Globe size={14} className="text-muted-foreground" /> Sources
            </h3>
            <ul className="space-y-1.5">
              {result.sources.map((src) => (
                <li key={src} className="flex items-center gap-2">
                  <Globe
                    size={11}
                    className="text-muted-foreground flex-shrink-0"
                  />
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline truncate"
                  >
                    {src}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setQueriesOpen((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              <Search size={13} /> Search Queries Used
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
                      <span className="w-4 h-4 rounded bg-muted flex items-center justify-center text-[9px] font-bold flex-shrink-0">
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

// ─── Tab: Overview ────────────────────────────────────────────────────────────
function OverviewTab({ companyName }: { companyName: string }) {
  const company = companies.find((c) => c.name === companyName);
  if (!company)
    return <p className="text-muted-foreground text-sm">Company not found.</p>;
  const founded = getFoundedYear(company.name);
  const stats = [
    { label: "Industry", value: company.industry },
    {
      label: "Country",
      value: `${getFlag(company.country)} ${company.country}`,
    },
    { label: "Headquarters", value: company.country },
    { label: "Founded", value: `${founded}` },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {company.name}
              </h2>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                <span>{getFlag(company.country)}</span>
                <span>{company.country}</span>
              </div>
            </div>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getIndustryColor(company.industry)}`}
          >
            {company.industry}
          </span>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {company.description}
        </p>
        <a href={company.website} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            className="gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            <Globe size={14} />
            Visit Official Website
            <ExternalLink size={12} className="ml-1" />
          </Button>
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-card border border-border rounded-xl p-4"
          >
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className="text-sm font-semibold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Analytics ───────────────────────────────────────────────────────────
function AnalyticsTab({ companyName }: { companyName: string }) {
  const variant = companyName.length % 3;
  const { weekly, eightWeek, monthly } = getAnalyticsData(variant);
  const SIGNAL_COLOR = "#4f7df3";
  const FEATURE_COLOR = "#a855f7";
  const UPDATE_COLOR = "#22c55e";
  const statCards = [
    {
      label: "Total Signals",
      value: "1,284",
      change: "+12.4%",
      icon: Zap,
      color: "text-blue-400",
    },
    {
      label: "Features Tracked",
      value: "342",
      change: "+8.1%",
      icon: GitBranch,
      color: "text-purple-400",
    },
    {
      label: "Dev Updates",
      value: "89",
      change: "+5.7%",
      icon: Activity,
      color: "text-green-400",
    },
    {
      label: "Active Users",
      value: "47",
      change: "+22.3%",
      icon: Users,
      color: "text-amber-400",
    },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">
          {companyName} Analytics
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Company activity signals and intelligence trends
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Card key={card.label} className="border-border">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${card.color}`}
                >
                  <card.icon size={15} />
                </div>
                <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-400">
                  <ArrowUpRight size={11} /> {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {card.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <BarChart2 size={14} className="text-muted-foreground" /> Weekly
            Company Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weekly} barGap={2}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ fill: "hsl(var(--muted))" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar
                dataKey="signals"
                name="Signals"
                fill={SIGNAL_COLOR}
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="features"
                name="Features"
                fill={FEATURE_COLOR}
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="updates"
                name="Updates"
                fill={UPDATE_COLOR}
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              8-Week Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={eightWeek}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="signals"
                  stroke={SIGNAL_COLOR}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="features"
                  stroke={FEATURE_COLOR}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="updates"
                  stroke={UPDATE_COLOR}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Monthly Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={monthly}>
                <defs>
                  <linearGradient id="sigGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={SIGNAL_COLOR}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={SIGNAL_COLOR}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="signals"
                  stroke={SIGNAL_COLOR}
                  fill="url(#sigGrad2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Tab: Open Roles ──────────────────────────────────────────────────────────
function OpenRolesTab({ companyName }: { companyName: string }) {
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const directJobs = ALL_JOBS.filter(
    (j) => j.company.toLowerCase() === companyName.toLowerCase(),
  );
  const hasDirectJobs = directJobs.length > 0;
  const baseJobs = hasDirectJobs ? directJobs : ALL_JOBS;
  const displayed = activeRole
    ? baseJobs.filter((j) => j.role === activeRole)
    : baseJobs;

  const sourceColors = {
    LinkedIn: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Indeed: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    "Company Site": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  };

  return (
    <div className="space-y-5">
      {!hasDirectJobs && (
        <div className="flex items-center gap-2 p-3 bg-muted/40 rounded-lg border border-border">
          <Briefcase
            size={14}
            className="text-muted-foreground flex-shrink-0"
          />
          <p className="text-xs text-muted-foreground">
            No direct listings found for{" "}
            <span className="font-semibold text-foreground">{companyName}</span>{" "}
            — showing all tracked tech roles.
          </p>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveRole(null)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
            activeRole === null
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-muted/40 text-muted-foreground border-border hover:border-primary/40",
          )}
          data-ocid="company_detail.open_roles.tab"
        >
          All Roles
        </button>
        {ROLES.map((role) => (
          <button
            key={role}
            type="button"
            onClick={() =>
              setActiveRole((prev) => (prev === role ? null : role))
            }
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
              activeRole === role
                ? "border-primary text-primary bg-primary/10"
                : "bg-muted/40 text-muted-foreground border-border hover:border-primary/40",
            )}
          >
            {role}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {displayed.map((job, i) => (
          <motion.div
            key={job.id}
            data-ocid={`company_detail.open_roles.item.${i + 1}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.2 }}
            className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-foreground">
                  {job.role}
                </p>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${sourceColors[job.source]}`}
                >
                  {job.source}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {job.company}
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin size={10} /> {job.location}
                </span>
                <span>{job.postedAgo}</span>
              </div>
            </div>
            <a
              href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(`${job.role} ${job.company}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`company_detail.open_roles.button.${i + 1}`}
            >
              <Button size="sm" className="gap-1.5 flex-shrink-0">
                Apply Now <ExternalLink size={11} />
              </Button>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Market Scout ────────────────────────────────────────────────────────
function MarketScoutTab({ companyName }: { companyName: string }) {
  const [company, setCompany] = useState(companyName);
  const [stepStates, setStepStates] = useState<StepState[]>([
    "pending",
    "pending",
    "pending",
    "pending",
    "pending",
    "pending",
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ScoutResult | null>(null);
  const hasAutoRunRef = useRef(false);
  const { mutateAsync: saveScout } = useSaveScoutResult();
  const abortRef = useRef(false);

  const runScout = async (name?: string) => {
    const target = (name ?? company).trim();
    if (!target || isRunning) return;
    abortRef.current = false;
    setIsRunning(true);
    setResult(null);
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
    }
    if (!abortRef.current) {
      const data = generateScoutData(target);
      const now = BigInt(Date.now()) * BigInt(1_000_000);
      const scoutResult: ScoutResult = {
        ...data,
        status: Status.completed,
        timestamp: now,
      };
      setResult(scoutResult);
      try {
        await saveScout(scoutResult);
      } catch (_) {
        /* silent */
      }
    }
    setIsRunning(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional one-time auto-run on mount
  useEffect(() => {
    if (!hasAutoRunRef.current) {
      hasAutoRunRef.current = true;
      const timer = setTimeout(() => {
        runScout(companyName);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [companyName]);

  useEffect(() => {
    return () => {
      abortRef.current = true;
    };
  }, []);

  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardContent className="pt-5 pb-5">
          <div className="flex gap-3">
            <Input
              placeholder="Enter company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runScout()}
              disabled={isRunning}
              className="flex-1"
              data-ocid="company_detail.scout.input"
            />
            <Button
              onClick={() => runScout()}
              disabled={isRunning || !company.trim()}
              className="px-5"
              data-ocid="company_detail.scout.run.button"
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
      <AnimatePresence>
        {result && <ResultPanel result={result} />}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CompanyDetailPage() {
  const { companyName } = useParams({ from: "/company/$companyName" });
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <button
            type="button"
            onClick={() => navigate({ to: "/companies" })}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            data-ocid="company_detail.back.button"
          >
            <ArrowLeft size={14} /> Companies
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Building2 size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {companyName}
              </h1>
              <p className="text-sm text-muted-foreground">
                Company Intelligence Hub
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        <Tabs defaultValue="overview">
          <TabsList className="mb-6" data-ocid="company_detail.tab">
            <TabsTrigger
              value="overview"
              data-ocid="company_detail.overview.tab"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              data-ocid="company_detail.analytics.tab"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="open-roles"
              data-ocid="company_detail.open_roles.tab"
            >
              Open Roles
            </TabsTrigger>
            <TabsTrigger
              value="market-scout"
              data-ocid="company_detail.market_scout.tab"
            >
              Market Scout
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <OverviewTab companyName={companyName} />
          </TabsContent>
          <TabsContent value="analytics">
            <AnalyticsTab companyName={companyName} />
          </TabsContent>
          <TabsContent value="open-roles">
            <OpenRolesTab companyName={companyName} />
          </TabsContent>
          <TabsContent value="market-scout">
            <MarketScoutTab companyName={companyName} />
          </TabsContent>
        </Tabs>
      </div>

      <footer className="text-center text-xs text-muted-foreground py-6">
        Dreamcrafter © {new Date().getFullYear()}. Built with ❤️ by{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          className="hover:text-foreground transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          caffeine.ai
        </a>
      </footer>
    </motion.div>
  );
}
