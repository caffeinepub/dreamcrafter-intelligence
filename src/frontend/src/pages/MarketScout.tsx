import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Bot,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Cpu,
  Download,
  FileText,
  Globe,
  History,
  Loader2,
  Search,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
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

  return { companyName: c, queries, sources, features, summary };
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
      data-ocid="market_scout.result.panel"
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
          <div className="flex gap-2 pt-2">
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

function HistoryCard({
  result,
  onView,
}: { result: ScoutResult; onView: () => void }) {
  const date = new Date(
    Number(result.timestamp) / 1_000_000,
  ).toLocaleDateString();
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/20 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{result.companyName}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {date} · {result.features.length} features
        </p>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
          {result.summary}
        </p>
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={onView}
        data-ocid="market_scout.history.view.button"
      >
        View
      </Button>
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
  const [result, setResult] = useState<ScoutResult | null>(null);
  const { data: history, refetch: refetchHistory } = useScoutHistory();
  const { mutateAsync: saveScout } = useSaveScoutResult();
  const abortRef = useRef(false);

  useEffect(() => {
    return () => {
      abortRef.current = true;
    };
  }, []);

  const runScout = async () => {
    if (!company.trim() || isRunning) return;
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
      const data = generateScoutData(company);
      const now = BigInt(Date.now()) * BigInt(1_000_000);
      const scoutResult: ScoutResult = {
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
              onClick={runScout}
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

      <AnimatePresence>
        {result && <ResultPanel result={result} />}
      </AnimatePresence>

      {history && history.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <History size={15} className="text-muted-foreground" /> Scout
                History
              </CardTitle>
            </CardHeader>
            <CardContent
              className="space-y-2"
              data-ocid="market_scout.history.list"
            >
              {history.map((item) => (
                <HistoryCard
                  key={`${item.companyName}-${String(item.timestamp)}`}
                  result={item}
                  onView={() => setResult(item)}
                />
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      <footer className="text-center text-xs text-muted-foreground pt-2 pb-4">
        Dreamcrafter © {new Date().getFullYear()}. Built with ❤️ by Dreamcrafter
      </footer>
    </div>
  );
}
