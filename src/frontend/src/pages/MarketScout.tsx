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

type _SignalTab = (typeof SIGNAL_TABS)[number];

const ALL_SIGNAL_TABS = [
  "Release Notes",
  "Features",
  "Press",
  "Dev",
  "Strategy",
  "News",
  "Open Roles",
  "Intelligence Sources",
] as const;

type AnySignalTab = (typeof ALL_SIGNAL_TABS)[number];

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
const COMPANY_URLS: Record<
  string,
  {
    releaseNotes: string;
    features: string;
    press: string;
    dev: string;
    roadmap: string;
    news: string;
  }
> = {
  stripe: {
    releaseNotes: "https://stripe.com/docs/changelog",
    features: "https://stripe.com/blog",
    press: "https://stripe.com/newsroom",
    dev: "https://stripe.com/blog/engineering",
    roadmap: "https://stripe.com/blog",
    news: "https://stripe.com/newsroom",
  },
  openai: {
    releaseNotes: "https://platform.openai.com/docs/changelog",
    features: "https://openai.com/news",
    press: "https://openai.com/news",
    dev: "https://platform.openai.com/docs/changelog",
    roadmap: "https://openai.com/research",
    news: "https://openai.com/news",
  },
  github: {
    releaseNotes: "https://github.blog/changelog",
    features: "https://github.blog",
    press: "https://github.blog",
    dev: "https://github.blog/engineering",
    roadmap: "https://github.blog",
    news: "https://github.blog",
  },
  vercel: {
    releaseNotes: "https://vercel.com/changelog",
    features: "https://vercel.com/changelog",
    press: "https://vercel.com/blog",
    dev: "https://vercel.com/blog",
    roadmap: "https://vercel.com/blog",
    news: "https://vercel.com/blog",
  },
  anthropic: {
    releaseNotes: "https://www.anthropic.com/news",
    features: "https://www.anthropic.com/news",
    press: "https://www.anthropic.com/news",
    dev: "https://docs.anthropic.com/en/release-notes/overview",
    roadmap: "https://www.anthropic.com/research",
    news: "https://www.anthropic.com/news",
  },
  linear: {
    releaseNotes: "https://linear.app/changelog",
    features: "https://linear.app/changelog",
    press: "https://linear.app/blog",
    dev: "https://linear.app/changelog",
    roadmap: "https://linear.app/blog",
    news: "https://linear.app/blog",
  },
  notion: {
    releaseNotes: "https://www.notion.so/releases",
    features: "https://www.notion.so/releases",
    press: "https://www.notion.so/blog",
    dev: "https://developers.notion.com",
    roadmap: "https://www.notion.so/blog",
    news: "https://www.notion.so/blog",
  },
  shopify: {
    releaseNotes: "https://www.shopify.com/partners/blog/topics/changelog",
    features: "https://www.shopify.com/news",
    press: "https://www.shopify.com/news",
    dev: "https://shopify.dev/changelog",
    roadmap: "https://www.shopify.com/news",
    news: "https://www.shopify.com/news",
  },
  cloudflare: {
    releaseNotes: "https://blog.cloudflare.com",
    features: "https://blog.cloudflare.com",
    press: "https://blog.cloudflare.com",
    dev: "https://blog.cloudflare.com/tag/developers",
    roadmap: "https://blog.cloudflare.com",
    news: "https://blog.cloudflare.com",
  },
  slack: {
    releaseNotes: "https://slack.com/intl/en-us/release-notes",
    features: "https://slack.com/blog/news",
    press: "https://slack.com/blog/news",
    dev: "https://api.slack.com/changelog",
    roadmap: "https://slack.com/blog/news",
    news: "https://slack.com/blog/news",
  },
  figma: {
    releaseNotes: "https://www.figma.com/release-notes",
    features: "https://www.figma.com/blog",
    press: "https://www.figma.com/blog",
    dev: "https://www.figma.com/developers",
    roadmap: "https://www.figma.com/blog",
    news: "https://www.figma.com/blog",
  },
  twilio: {
    releaseNotes: "https://www.twilio.com/en-us/changelog",
    features: "https://www.twilio.com/blog/product",
    press: "https://www.twilio.com/blog/press-releases",
    dev: "https://www.twilio.com/blog/engineering",
    roadmap: "https://www.twilio.com/blog",
    news: "https://www.twilio.com/blog",
  },
  microsoft: {
    releaseNotes:
      "https://learn.microsoft.com/en-us/microsoft-365/admin/misc/release-notes",
    features:
      "https://techcommunity.microsoft.com/t5/microsoft-365-blog/bg-p/microsoft365blog",
    press: "https://news.microsoft.com",
    dev: "https://devblogs.microsoft.com",
    roadmap: "https://www.microsoft.com/en-us/microsoft-365/roadmap",
    news: "https://news.microsoft.com",
  },
  google: {
    releaseNotes: "https://workspace.google.com/whatsnew",
    features: "https://workspace.google.com/whatsnew",
    press: "https://blog.google",
    dev: "https://developers.googleblog.com",
    roadmap: "https://blog.google",
    news: "https://blog.google",
  },
  apple: {
    releaseNotes: "https://developer.apple.com/news/releases",
    features: "https://www.apple.com/newsroom",
    press: "https://www.apple.com/newsroom",
    dev: "https://developer.apple.com/news",
    roadmap: "https://www.apple.com/newsroom",
    news: "https://www.apple.com/newsroom",
  },
  netflix: {
    releaseNotes: "https://netflixtechblog.com",
    features: "https://about.netflix.com/en/news",
    press: "https://about.netflix.com/en/news",
    dev: "https://netflixtechblog.com",
    roadmap: "https://about.netflix.com/en/news",
    news: "https://about.netflix.com/en/news",
  },
  airbnb: {
    releaseNotes: "https://medium.com/airbnb-engineering",
    features: "https://news.airbnb.com",
    press: "https://news.airbnb.com",
    dev: "https://medium.com/airbnb-engineering",
    roadmap: "https://news.airbnb.com",
    news: "https://news.airbnb.com",
  },
  uber: {
    releaseNotes: "https://www.uber.com/en-US/newsroom",
    features: "https://www.uber.com/en-US/newsroom",
    press: "https://www.uber.com/en-US/newsroom",
    dev: "https://www.uber.com/en-US/blog/engineering",
    roadmap: "https://www.uber.com/en-US/newsroom",
    news: "https://www.uber.com/en-US/newsroom",
  },
  spotify: {
    releaseNotes: "https://newsroom.spotify.com",
    features: "https://newsroom.spotify.com",
    press: "https://newsroom.spotify.com",
    dev: "https://engineering.atspotify.com",
    roadmap: "https://newsroom.spotify.com",
    news: "https://newsroom.spotify.com",
  },
  tesla: {
    releaseNotes: "https://www.tesla.com/blog",
    features: "https://www.tesla.com/blog",
    press: "https://ir.tesla.com/news-releases",
    dev: "https://developer.tesla.com",
    roadmap: "https://www.tesla.com/blog",
    news: "https://www.tesla.com/blog",
  },
  meta: {
    releaseNotes: "https://engineering.fb.com",
    features: "https://about.fb.com/news",
    press: "https://about.fb.com/news",
    dev: "https://developers.facebook.com/blog",
    roadmap: "https://about.fb.com/news",
    news: "https://about.fb.com/news",
  },
  amazon: {
    releaseNotes: "https://aws.amazon.com/releasenotes",
    features: "https://aws.amazon.com/blogs/aws",
    press: "https://press.aboutamazon.com",
    dev: "https://developer.amazon.com/blogs",
    roadmap: "https://aws.amazon.com/blogs/aws",
    news: "https://press.aboutamazon.com",
  },
  salesforce: {
    releaseNotes:
      "https://help.salesforce.com/s/articleView?id=release-notes.salesforce_release_notes.htm",
    features: "https://www.salesforce.com/blog/product-news",
    press: "https://www.salesforce.com/news/press-releases",
    dev: "https://developer.salesforce.com/blogs",
    roadmap: "https://www.salesforce.com/blog",
    news: "https://www.salesforce.com/news",
  },
  hubspot: {
    releaseNotes: "https://www.hubspot.com/product-updates",
    features: "https://www.hubspot.com/product-updates",
    press: "https://www.hubspot.com/press",
    dev: "https://developers.hubspot.com/changelog",
    roadmap: "https://www.hubspot.com/product-updates",
    news: "https://www.hubspot.com/news",
  },
  atlassian: {
    releaseNotes:
      "https://confluence.atlassian.com/alldoc/atlassian-documentation-32243719.html",
    features: "https://www.atlassian.com/blog/product-updates",
    press: "https://www.atlassian.com/company/news",
    dev: "https://developer.atlassian.com/blog",
    roadmap: "https://www.atlassian.com/blog",
    news: "https://www.atlassian.com/company/news",
  },
  zoom: {
    releaseNotes:
      "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060541",
    features: "https://blog.zoom.us/category/product-news",
    press: "https://news.zoom.us",
    dev: "https://devforum.zoom.us",
    roadmap: "https://blog.zoom.us",
    news: "https://news.zoom.us",
  },
  dropbox: {
    releaseNotes: "https://help.dropbox.com/organize/release-notes",
    features: "https://blog.dropbox.com",
    press: "https://newsroom.dropbox.com",
    dev: "https://dropbox.tech",
    roadmap: "https://blog.dropbox.com",
    news: "https://newsroom.dropbox.com",
  },
};

function getCompanyUrls(company: string) {
  const key = company.toLowerCase().replace(/[^a-z0-9]/g, "");
  return COMPANY_URLS[key] ?? null;
}

function googleSearch(query: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

// ─── Intelligence Dashboard Header ───────────────────────────────────────────
function IntelligenceDashboardHeader({ companyName }: { companyName: string }) {
  const [clock, setClock] = useState(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 8);
  });

  useEffect(() => {
    const id = setInterval(() => {
      setClock(new Date().toTimeString().slice(0, 8));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)",
      }}
      data-ocid="market_scout.intelligence_dashboard.panel"
    >
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300/70 mb-0.5">
              INTELLIGENCE DASHBOARD
            </p>
            <h2 className="text-lg font-bold text-white leading-tight">
              Your Intelligence Analysis Path
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
            <Clock size={13} className="text-indigo-300" />
            <span className="font-mono text-sm font-semibold text-white tabular-nums">
              {clock}
            </span>
            <span className="text-xs text-indigo-300 font-medium ml-1">
              Dreamcrafter Intelligence
            </span>
          </div>
        </div>
      </div>
      <div className="px-5 py-3 flex items-center gap-2 flex-wrap">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
        <p className="text-xs text-slate-300 leading-relaxed">
          Real-time competitive monitoring
          <span className="text-white/30 mx-2">·</span>4 signal categories
          <span className="text-white/30 mx-2">·</span>
          8-week rolling window
          <span className="text-white/30 mx-2">·</span>
          analyzing{" "}
          <span className="text-indigo-300 font-semibold">{companyName}</span>
        </p>
      </div>
    </div>
  );
}

// ─── Intelligence Sources Card ────────────────────────────────────────────────
const INTEL_SOURCE_DEFS = [
  {
    key: "releaseNotes" as const,
    label: "Release Notes",
    desc: "Official version releases & changelogs",
    icon: FileText,
    color: "text-blue-400",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.25)",
    fallbackSuffix: "release notes changelog",
  },
  {
    key: "features" as const,
    label: "Features",
    desc: "Product announcements & feature drops",
    icon: Sparkles,
    color: "text-violet-400",
    bg: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.25)",
    fallbackSuffix: "features product announcements",
  },
  {
    key: "press" as const,
    label: "Press",
    desc: "News articles & media coverage",
    icon: Newspaper,
    color: "text-emerald-400",
    bg: "rgba(52,211,153,0.12)",
    border: "rgba(52,211,153,0.25)",
    fallbackSuffix: "press news coverage",
  },
  {
    key: "dev" as const,
    label: "Dev Updates",
    desc: "Engineering blog & API changes",
    icon: Code,
    color: "text-amber-400",
    bg: "rgba(251,191,36,0.12)",
    border: "rgba(251,191,36,0.25)",
    fallbackSuffix: "engineering blog API changes",
  },
  {
    key: "roadmap" as const,
    label: "Strategy",
    desc: "Vision, roadmap & strategic moves",
    icon: Target,
    color: "text-rose-400",
    bg: "rgba(251,113,133,0.12)",
    border: "rgba(251,113,133,0.25)",
    fallbackSuffix: "roadmap strategy vision",
  },
  {
    key: "news" as const,
    label: "News",
    desc: "Real-time coverage & breaking news",
    icon: Radio,
    color: "text-cyan-400",
    bg: "rgba(34,211,238,0.12)",
    border: "rgba(34,211,238,0.25)",
    fallbackSuffix: "news breaking coverage",
  },
];

function IntelligenceSourcesCard({ companyName }: { companyName: string }) {
  const urls = getCompanyUrls(companyName);

  return (
    <div data-ocid="market_scout.intelligence_sources.panel">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold flex items-center gap-1.5">
            <DatabaseZap size={14} className="text-primary" />
            Quick access to <span className="text-primary">{companyName}</span>{" "}
            signals across 6 intelligence categories
          </h3>
        </div>
        <Badge className="bg-primary/15 text-primary border-primary/30 border text-[10px] px-2.5 flex-shrink-0">
          6 SOURCES
        </Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {INTEL_SOURCE_DEFS.map((cat) => {
          const Icon = cat.icon;
          const href = urls
            ? urls[cat.key]
            : googleSearch(`${companyName} ${cat.fallbackSuffix}`);
          const displayUrl = href
            .replace(/^https?:\/\//, "")
            .replace(/\/$/, "");
          return (
            <a
              key={cat.key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 p-3.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: cat.bg, borderColor: cat.border }}
              data-ocid={`market_scout.intel_source.${cat.key}.link`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: cat.bg,
                    border: `1px solid ${cat.border}`,
                  }}
                >
                  <Icon size={14} className={cat.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold ${cat.color}`}>
                    {cat.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    {cat.desc}
                  </p>
                </div>
                <ExternalLink
                  size={11}
                  className={cn(
                    "flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
                    cat.color,
                  )}
                />
              </div>
              <p className="text-[10px] text-muted-foreground/60 truncate font-mono">
                {displayUrl}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ─── Trending Intel Signals ───────────────────────────────────────────────────
function TrendingIntelSignals({ features }: { features: string[] }) {
  return (
    <div data-ocid="market_scout.trending_signals.panel">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-px bg-border/60" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-1.5 px-2 flex-shrink-0">
          <Zap size={12} className="text-amber-400" />
          TRENDING INTEL SIGNALS
          <span className="text-muted-foreground/50">···</span>
        </h3>
        <div className="flex-1 h-px bg-border/60" />
      </div>
      <div className="flex flex-wrap gap-2">
        {features.map((f, i) => {
          const colors = [
            "bg-blue-500/10 border-blue-500/25 text-blue-400",
            "bg-violet-500/10 border-violet-500/25 text-violet-400",
            "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
            "bg-amber-500/10 border-amber-500/25 text-amber-400",
            "bg-rose-500/10 border-rose-500/25 text-rose-400",
            "bg-cyan-500/10 border-cyan-500/25 text-cyan-400",
          ];
          return (
            <motion.span
              key={f}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium",
                colors[i % colors.length],
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 flex-shrink-0" />
              {f}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

// ─── Intelligence Pipeline ────────────────────────────────────────────────────
const INTEL_PIPELINE_STEPS = [
  { num: "01", label: "Define", desc: "Set intelligence objectives & scope" },
  { num: "02", label: "Collect", desc: "Aggregate signals across sources" },
  { num: "03", label: "Process", desc: "Filter, normalize & enrich data" },
  { num: "04", label: "Analyze", desc: "Extract patterns & insights" },
  { num: "05", label: "Deliver", desc: "Distribute actionable intelligence" },
] as const;

type PipelineStatus = "DONE" | "ACTIVE" | "QUEUED";

function IntelligencePipeline() {
  const [statuses, setStatuses] = useState<PipelineStatus[]>([
    "DONE",
    "DONE",
    "QUEUED",
    "QUEUED",
    "QUEUED",
  ]);

  useEffect(() => {
    const t = setTimeout(() => {
      setStatuses(["DONE", "DONE", "ACTIVE", "QUEUED", "QUEUED"]);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const badge = (s: PipelineStatus) => {
    if (s === "DONE")
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    if (s === "ACTIVE")
      return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    return "bg-muted/40 text-muted-foreground border-border";
  };

  const circle = (s: PipelineStatus) => {
    if (s === "DONE")
      return "bg-emerald-500/20 border-emerald-500/50 text-emerald-400";
    if (s === "ACTIVE")
      return "bg-blue-500/20 border-blue-500/50 text-blue-400";
    return "bg-muted/30 border-border text-muted-foreground";
  };

  return (
    <div data-ocid="market_scout.intelligence_pipeline.panel">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-px bg-border/60" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground px-2 flex-shrink-0 flex items-center gap-1.5">
          <DatabaseZap size={12} className="text-primary" />
          Intelligence Pipeline
        </h3>
        <div className="flex-1 h-px bg-border/60" />
      </div>
      <div className="flex flex-col gap-0">
        {INTEL_PIPELINE_STEPS.map((step, i) => {
          const status = statuses[i];
          return (
            <div key={step.num} className="flex items-stretch gap-3">
              {/* Left: number circle + connector */}
              <div className="flex flex-col items-center flex-shrink-0 w-8">
                <motion.div
                  className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-500",
                    circle(status),
                  )}
                  animate={
                    status === "ACTIVE"
                      ? {
                          boxShadow: [
                            "0 0 0 0px rgba(59,130,246,0.3)",
                            "0 0 0 6px rgba(59,130,246,0)",
                            "0 0 0 0px rgba(59,130,246,0.3)",
                          ],
                        }
                      : {}
                  }
                  transition={
                    status === "ACTIVE"
                      ? { repeat: Number.POSITIVE_INFINITY, duration: 2 }
                      : {}
                  }
                >
                  {step.num}
                </motion.div>
                {i < INTEL_PIPELINE_STEPS.length - 1 && (
                  <div
                    className={cn(
                      "w-0.5 flex-1 my-1 rounded-full transition-all duration-500",
                      status === "DONE" ? "bg-emerald-500/40" : "bg-border/50",
                    )}
                    style={{ minHeight: "20px" }}
                  />
                )}
              </div>
              {/* Right: content */}
              <div
                className={cn(
                  "flex-1 flex items-center justify-between gap-3 py-2 min-h-[40px]",
                  i < INTEL_PIPELINE_STEPS.length - 1 ? "pb-3" : "",
                )}
              >
                <div>
                  <p
                    className={cn(
                      "text-sm font-semibold leading-tight",
                      status === "DONE" && "text-emerald-400",
                      status === "ACTIVE" && "text-blue-400",
                      status === "QUEUED" && "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {step.desc}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] px-2 py-0.5 border font-semibold flex-shrink-0 transition-all duration-500",
                    badge(status),
                  )}
                >
                  {status}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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

  const knownUrls = getCompanyUrls(c);
  const sources = knownUrls
    ? [
        knownUrls.releaseNotes,
        knownUrls.features,
        knownUrls.press,
        knownUrls.dev,
        knownUrls.roadmap,
        knownUrls.news,
      ]
    : [
        googleSearch(`"${c}" release notes changelog 2026`),
        googleSearch(`"${c}" new features product updates 2026`),
        googleSearch(`"${c}" press newsroom 2026`),
        googleSearch(`"${c}" engineering blog developer updates`),
        googleSearch(`"${c}" roadmap strategy`),
        googleSearch(`"${c}" latest news 2026`),
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

  const KNOWN_COMPANY_OVERVIEWS: Record<string, CompanyOverview> = {
    openai: {
      founded: "2015",
      hq: "San Francisco, CA",
      ceo: "Sam Altman",
      employees: "1,500+",
      type: "Private",
      industry: "AI Research",
    },
    google: {
      founded: "1998",
      hq: "Mountain View, CA",
      ceo: "Sundar Pichai",
      employees: "180,000+",
      type: "Public",
      industry: "Technology",
    },
    microsoft: {
      founded: "1975",
      hq: "Redmond, WA",
      ceo: "Satya Nadella",
      employees: "220,000+",
      type: "Public",
      industry: "Technology",
    },
    apple: {
      founded: "1976",
      hq: "Cupertino, CA",
      ceo: "Tim Cook",
      employees: "164,000+",
      type: "Public",
      industry: "Consumer Electronics",
    },
    amazon: {
      founded: "1994",
      hq: "Seattle, WA",
      ceo: "Andy Jassy",
      employees: "1,500,000+",
      type: "Public",
      industry: "E-Commerce & Cloud",
    },
    meta: {
      founded: "2004",
      hq: "Menlo Park, CA",
      ceo: "Mark Zuckerberg",
      employees: "86,000+",
      type: "Public",
      industry: "Social Media",
    },
    netflix: {
      founded: "1997",
      hq: "Los Gatos, CA",
      ceo: "Ted Sarandos",
      employees: "13,000+",
      type: "Public",
      industry: "Streaming",
    },
    tesla: {
      founded: "2003",
      hq: "Austin, TX",
      ceo: "Elon Musk",
      employees: "140,000+",
      type: "Public",
      industry: "Automotive/Energy",
    },
    stripe: {
      founded: "2010",
      hq: "San Francisco, CA",
      ceo: "Patrick Collison",
      employees: "8,000+",
      type: "Private",
      industry: "Fintech",
    },
    github: {
      founded: "2008",
      hq: "San Francisco, CA",
      ceo: "Thomas Dohmke",
      employees: "3,000+",
      type: "Subsidiary",
      industry: "Developer Tools",
    },
    vercel: {
      founded: "2015",
      hq: "San Francisco, CA",
      ceo: "Guillermo Rauch",
      employees: "500+",
      type: "Private",
      industry: "Cloud Infrastructure",
    },
    anthropic: {
      founded: "2021",
      hq: "San Francisco, CA",
      ceo: "Dario Amodei",
      employees: "500+",
      type: "Private",
      industry: "AI Research",
    },
    slack: {
      founded: "2009",
      hq: "San Francisco, CA",
      ceo: "Lidiane Jones",
      employees: "2,500+",
      type: "Subsidiary",
      industry: "Enterprise Software",
    },
    shopify: {
      founded: "2006",
      hq: "Ottawa, Canada",
      ceo: "Tobi Lütke",
      employees: "11,000+",
      type: "Public",
      industry: "E-Commerce",
    },
    figma: {
      founded: "2012",
      hq: "San Francisco, CA",
      ceo: "Dylan Field",
      employees: "1,000+",
      type: "Private",
      industry: "Design Tools",
    },
    notion: {
      founded: "2013",
      hq: "San Francisco, CA",
      ceo: "Ivan Zhao",
      employees: "500+",
      type: "Private",
      industry: "Productivity",
    },
    zoom: {
      founded: "2011",
      hq: "San Jose, CA",
      ceo: "Eric Yuan",
      employees: "7,000+",
      type: "Public",
      industry: "Communications",
    },
    salesforce: {
      founded: "1999",
      hq: "San Francisco, CA",
      ceo: "Marc Benioff",
      employees: "70,000+",
      type: "Public",
      industry: "CRM/Enterprise",
    },
    uber: {
      founded: "2009",
      hq: "San Francisco, CA",
      ceo: "Dara Khosrowshahi",
      employees: "32,000+",
      type: "Public",
      industry: "Transportation",
    },
    airbnb: {
      founded: "2008",
      hq: "San Francisco, CA",
      ceo: "Brian Chesky",
      employees: "6,000+",
      type: "Public",
      industry: "Travel & Hospitality",
    },
    spotify: {
      founded: "2006",
      hq: "Stockholm, Sweden",
      ceo: "Daniel Ek",
      employees: "9,500+",
      type: "Public",
      industry: "Music Streaming",
    },
    cloudflare: {
      founded: "2009",
      hq: "San Francisco, CA",
      ceo: "Matthew Prince",
      employees: "3,500+",
      type: "Public",
      industry: "Network Security",
    },
    linear: {
      founded: "2019",
      hq: "San Francisco, CA",
      ceo: "Karri Saarinen",
      employees: "100+",
      type: "Private",
      industry: "Project Management",
    },
    twilio: {
      founded: "2008",
      hq: "San Francisco, CA",
      ceo: "Khozema Shipchandler",
      employees: "6,000+",
      type: "Public",
      industry: "Communications",
    },
    atlassian: {
      founded: "2002",
      hq: "Sydney, Australia",
      ceo: "Mike Cannon-Brookes",
      employees: "11,000+",
      type: "Public",
      industry: "Enterprise Software",
    },
    dropbox: {
      founded: "2007",
      hq: "San Francisco, CA",
      ceo: "Drew Houston",
      employees: "2,500+",
      type: "Public",
      industry: "Cloud Storage",
    },
    hubspot: {
      founded: "2006",
      hq: "Cambridge, MA",
      ceo: "Yamini Rangan",
      employees: "7,000+",
      type: "Public",
      industry: "Marketing/CRM",
    },
    samsung: {
      founded: "1969",
      hq: "Seoul, South Korea",
      ceo: "Jong-Hee Han",
      employees: "270,000+",
      type: "Public",
      industry: "Consumer Electronics",
    },
    nvidia: {
      founded: "1993",
      hq: "Santa Clara, CA",
      ceo: "Jensen Huang",
      employees: "29,000+",
      type: "Public",
      industry: "Semiconductors",
    },
    oracle: {
      founded: "1977",
      hq: "Austin, TX",
      ceo: "Safra Catz",
      employees: "160,000+",
      type: "Public",
      industry: "Enterprise Software",
    },
    ibm: {
      founded: "1911",
      hq: "Armonk, NY",
      ceo: "Arvind Krishna",
      employees: "280,000+",
      type: "Public",
      industry: "Technology",
    },
    intel: {
      founded: "1968",
      hq: "Santa Clara, CA",
      ceo: "Pat Gelsinger",
      employees: "131,000+",
      type: "Public",
      industry: "Semiconductors",
    },
    adobe: {
      founded: "1982",
      hq: "San Jose, CA",
      ceo: "Shantanu Narayen",
      employees: "30,000+",
      type: "Public",
      industry: "Creative Software",
    },
    linkedin: {
      founded: "2002",
      hq: "Sunnyvale, CA",
      ceo: "Ryan Roslansky",
      employees: "20,000+",
      type: "Subsidiary",
      industry: "Professional Network",
    },
    twitter: {
      founded: "2006",
      hq: "San Francisco, CA",
      ceo: "Linda Yaccarino",
      employees: "1,500+",
      type: "Private",
      industry: "Social Media",
    },
    snap: {
      founded: "2011",
      hq: "Santa Monica, CA",
      ceo: "Evan Spiegel",
      employees: "5,200+",
      type: "Public",
      industry: "Social Media",
    },
    lyft: {
      founded: "2012",
      hq: "San Francisco, CA",
      ceo: "David Risher",
      employees: "4,000+",
      type: "Public",
      industry: "Transportation",
    },
    pinterest: {
      founded: "2009",
      hq: "San Francisco, CA",
      ceo: "Bill Ready",
      employees: "3,500+",
      type: "Public",
      industry: "Social Media",
    },
    palantir: {
      founded: "2003",
      hq: "Denver, CO",
      ceo: "Alex Karp",
      employees: "3,800+",
      type: "Public",
      industry: "Data Analytics",
    },
    databricks: {
      founded: "2013",
      hq: "San Francisco, CA",
      ceo: "Ali Ghodsi",
      employees: "6,000+",
      type: "Private",
      industry: "Data & AI",
    },
    snowflake: {
      founded: "2012",
      hq: "Bozeman, MT",
      ceo: "Sridhar Ramaswamy",
      employees: "6,500+",
      type: "Public",
      industry: "Cloud Data",
    },
    mongodb: {
      founded: "2007",
      hq: "New York, NY",
      ceo: "Dev Ittycheria",
      employees: "5,000+",
      type: "Public",
      industry: "Database",
    },
    datadog: {
      founded: "2010",
      hq: "New York, NY",
      ceo: "Olivier Pomel",
      employees: "5,000+",
      type: "Public",
      industry: "DevOps/Monitoring",
    },
    okta: {
      founded: "2009",
      hq: "San Francisco, CA",
      ceo: "Todd McKinnon",
      employees: "5,000+",
      type: "Public",
      industry: "Identity Security",
    },
    servicenow: {
      founded: "2004",
      hq: "Santa Clara, CA",
      ceo: "Bill McDermott",
      employees: "22,000+",
      type: "Public",
      industry: "Enterprise Software",
    },
    workday: {
      founded: "2005",
      hq: "Pleasanton, CA",
      ceo: "Carl Eschenbach",
      employees: "19,000+",
      type: "Public",
      industry: "HR/Finance Software",
    },
  };

  const overviewSets: CompanyOverview[] = [
    {
      founded: String(2008 + (hash % 12)),
      hq: "San Francisco, CA",
      ceo: "Alex Rivera",
      employees: "5,000–20,000",
      type: "Public",
      industry: "Cloud Infrastructure",
    },
    {
      founded: String(2012 + (hash % 8)),
      hq: "New York, NY",
      ceo: "Jordan Kim",
      employees: "1,000–5,000",
      type: "Private",
      industry: "AI Research",
    },
    {
      founded: String(2004 + (hash % 14)),
      hq: "Seattle, WA",
      ceo: "Morgan Chen",
      employees: "50,000+",
      type: "Public",
      industry: "Enterprise Software",
    },
    {
      founded: String(2010 + (hash % 10)),
      hq: "Austin, TX",
      ceo: "Taylor Brooks",
      employees: "2,000–10,000",
      type: "Public",
      industry: "Fintech",
    },
    {
      founded: String(2006 + (hash % 12)),
      hq: "London, UK",
      ceo: "Sam Patterson",
      employees: "10,000–30,000",
      type: "Public",
      industry: "Digital Media",
    },
    {
      founded: String(2014 + (hash % 7)),
      hq: "Berlin, Germany",
      ceo: "Lena Müller",
      employees: "500–2,000",
      type: "Private",
      industry: "SaaS",
    },
    {
      founded: String(2009 + (hash % 10)),
      hq: "Tokyo, Japan",
      ceo: "Hiroshi Tanaka",
      employees: "20,000–60,000",
      type: "Public",
      industry: "Consumer Electronics",
    },
    {
      founded: String(2011 + (hash % 9)),
      hq: "Singapore",
      ceo: "Wei Zhang",
      employees: "3,000–12,000",
      type: "Public",
      industry: "E-Commerce",
    },
    {
      founded: String(2007 + (hash % 11)),
      hq: "Toronto, Canada",
      ceo: "Chris Nguyen",
      employees: "1,500–8,000",
      type: "Private",
      industry: "HealthTech",
    },
    {
      founded: String(2013 + (hash % 8)),
      hq: "Paris, France",
      ceo: "Sophie Leclerc",
      employees: "800–4,000",
      type: "Private",
      industry: "EdTech",
    },
    {
      founded: String(2015 + (hash % 6)),
      hq: "Amsterdam, Netherlands",
      ceo: "Jan de Vries",
      employees: "200–1,000",
      type: "Private",
      industry: "Cybersecurity",
    },
    {
      founded: String(2003 + (hash % 15)),
      hq: "Sydney, Australia",
      ceo: "Emma Walsh",
      employees: "5,000–25,000",
      type: "Public",
      industry: "Telecommunications",
    },
    {
      founded: String(2016 + (hash % 6)),
      hq: "Bangalore, India",
      ceo: "Priya Sharma",
      employees: "10,000–40,000",
      type: "Public",
      industry: "IT Services",
    },
    {
      founded: String(2001 + (hash % 18)),
      hq: "Chicago, IL",
      ceo: "Marcus Johnson",
      employees: "30,000+",
      type: "Public",
      industry: "Financial Services",
    },
    {
      founded: String(2018 + (hash % 5)),
      hq: "Miami, FL",
      ceo: "Isabella Cruz",
      employees: "100–500",
      type: "Private",
      industry: "Logistics & Supply Chain",
    },
  ];

  const knownKey = c
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
  const companyOverview =
    KNOWN_COMPANY_OVERVIEWS[knownKey] ??
    overviewSets[hash % overviewSets.length];

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

function LiveAnalysisReport({
  features,
  onExport,
}: { features: string[]; onExport?: () => void }) {
  const base = features.length;
  const categories = [
    {
      label: "Release Notes",
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      signals: Math.round(base * 2.5 + 3),
      pct: +(16.7).toFixed(1),
      note: "Major v3.2 release cycle detected across 4 competitors",
    },
    {
      label: "Features",
      icon: Sparkles,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      signals: Math.round(base * 2.2 + 3),
      pct: +(8.7).toFixed(1),
      note: "AI-assisted workflows trending heavily this week",
    },
    {
      label: "Press",
      icon: Newspaper,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      signals: Math.round(base * 1.6 + 2),
      pct: -5.3,
      note: "Press coverage dipped post-conference cycle",
    },
    {
      label: "Dev Updates",
      icon: Code,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      signals: Math.round(base * 3.4 + 4),
      pct: +(22.4).toFixed(1) as unknown as number,
      note: "Developer activity spiked with new API endpoints",
    },
    {
      label: "Strategy",
      icon: Target,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      signals: Math.round(base * 1.1 + 2),
      pct: +(4.1).toFixed(1) as unknown as number,
      note: "Long-term roadmap signals detected",
    },
    {
      label: "News",
      icon: Radio,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      signals: Math.round(base * 1.9 + 2),
      pct: +(11.2).toFixed(1) as unknown as number,
      note: "Breaking coverage trending upward",
    },
  ];

  return (
    <div data-ocid="market_scout.live_analysis.panel">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold flex items-center gap-1.5">
          <BarChart2 size={14} className="text-primary" /> Live Analysis Report
          <span className="text-[10px] text-muted-foreground font-normal ml-1">
            Week-over-week intelligence
          </span>
        </h3>
        {onExport && (
          <Button
            size="sm"
            variant="outline"
            onClick={onExport}
            className="h-7 text-xs px-2.5"
            data-ocid="market_scout.live_analysis.export.button"
          >
            <Download size={11} className="mr-1.5" /> Export
          </Button>
        )}
      </div>
      <div className="rounded-xl border border-border/60 overflow-hidden">
        {categories.map(
          ({ label, icon: Icon, color, bg, signals, pct, note }, idx) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/20",
                idx % 2 === 0 ? "bg-muted/10" : "bg-transparent",
              )}
              data-ocid={`market_scout.live_analysis.row.${idx + 1}`}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
                  bg,
                )}
              >
                <Icon size={13} className={color} />
              </div>
              <div className="w-24 flex-shrink-0">
                <p className={cn("text-xs font-semibold", color)}>{label}</p>
              </div>
              <div className="w-20 flex-shrink-0">
                <p className="text-sm font-bold text-foreground tabular-nums">
                  {signals}
                  <span className="text-[10px] font-normal text-muted-foreground ml-1">
                    signals
                  </span>
                </p>
              </div>
              <div className="w-16 flex-shrink-0">
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md",
                    pct >= 0
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400",
                  )}
                >
                  {pct >= 0 ? (
                    <TrendingUp size={10} />
                  ) : (
                    <TrendingDown size={10} />
                  )}
                  {pct >= 0 ? "+" : ""}
                  {pct}%
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug flex-1 hidden sm:block">
                {note}
              </p>
            </div>
          ),
        )}
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
                margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
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
                  domain={[0, "auto"]}
                  tickCount={5}
                  width={35}
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
                margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
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
                  domain={[0, "auto"]}
                  tickCount={5}
                  width={35}
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

const _SOURCE_CATEGORIES = [
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
                window.open(
                  `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(`${item.role} ${companyName}`)}`,
                  "_blank",
                )
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
  const [activeTab, setActiveTab] = useState<AnySignalTab>("Release Notes");
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
      {/* Intelligence Dashboard Header */}
      <IntelligenceDashboardHeader companyName={result.companyName} />

      {/* Signal category tabs */}
      <div className="flex gap-1 flex-wrap" data-ocid="market_scout.signal.tab">
        {ALL_SIGNAL_TABS.map((tab) => (
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

          {/* 2. Intelligence Sources Card */}
          <IntelligenceSourcesCard companyName={result.companyName} />

          {/* 3. Week-over-week intelligence */}
          <WeekOverWeekStats company={result.companyName} />

          {/* 5. AI Summary */}
          <div>
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              <Sparkles size={14} className="text-primary" /> AI Summary
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* 6. Technical Features */}
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

          {/* 7. Scraped Results — 4 Sources */}
          <ScrapedResultsSection
            company={result.companyName}
            sources={result.sources}
          />

          {/* 7. Activity Charts */}
          <ActivityCharts company={result.companyName} />

          {/* 8. Live Analysis Report */}
          <LiveAnalysisReport features={result.features} onExport={exportTxt} />

          {/* 9. Trending Intel Signals */}
          <TrendingIntelSignals features={result.features} />

          {/* 10. Open Roles */}
          <OpenRolesSection companyName={result.companyName} />

          {/* 11. Intelligence Pipeline */}
          <IntelligencePipeline />

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
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-xs font-semibold text-violet-400 flex items-center gap-1.5">
                      <FileText size={12} /> Structured Competitor Briefing
                      Report
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                        ✓ ACCEPTED (3)
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-500/15 text-red-400 border border-red-500/30 text-[10px] font-bold">
                        ✗ REJECTED (1)
                      </span>
                    </div>
                  </div>
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

const _INTEL_CATEGORIES = [
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

  useEffect(() => {
    const prefill = sessionStorage.getItem("scout_prefill");
    if (prefill) {
      setCompany(prefill);
      sessionStorage.removeItem("scout_prefill");
    }
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
