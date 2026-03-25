import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Code2,
  Copy,
  Database,
  Globe,
  Key,
  Layers,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const stagger = (i: number) => ({
  ...fadeUp,
  transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.1 },
});

const STATS = [
  { icon: Database, label: "Companies", value: "1,026+" },
  { icon: Layers, label: "Signal Categories", value: "6" },
  { icon: Zap, label: "Data Freshness", value: "Real-time" },
  { icon: CheckCircle2, label: "Uptime", value: "99.9%" },
];

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/report",
    status: "active",
    description:
      "Fetch a full competitive intelligence report for any company.",
    params: [
      {
        name: "key",
        type: "string",
        required: true,
        description: "Your API key",
      },
      {
        name: "company",
        type: "string",
        required: true,
        description: "Company name (e.g. OpenAI)",
      },
      {
        name: "format",
        type: "string",
        required: false,
        description: "html | json — default: html",
      },
    ],
    returns: "HTML report or structured JSON data",
  },
  {
    method: "GET",
    path: "/api/companies",
    status: "coming",
    description:
      "List all tracked companies with metadata including industry, country, and website.",
    params: [],
    returns: "Array of company objects",
  },
  {
    method: "GET",
    path: "/api/signals",
    status: "coming",
    description: "Get real-time intelligence signals for a specific company.",
    params: [],
    returns: "Signal breakdown per category",
  },
  {
    method: "POST",
    path: "/api/scout",
    status: "coming",
    description:
      "Trigger a full Market Scout AI analysis pipeline for any company.",
    params: [],
    returns: "Full scout result with insights",
  },
];

const CURL_CODE = `curl "https://your-app.ic0.app/api/report?key=YOUR_API_KEY&company=OpenAI" \\\n  -H "Accept: application/json"`;

const JS_CODE = `const response = await fetch(\n  \`/api/report?key=\${apiKey}&company=OpenAI\`,\n  { headers: { Accept: "application/json" } }\n);\nconst data = await response.json();\nconsole.log(data.company, data.signals);`;

const PYTHON_CODE = `import requests\n\nresponse = requests.get(\n    "https://your-app.ic0.app/api/report",\n    params={"key": "YOUR_API_KEY", "company": "OpenAI"},\n    headers={"Accept": "application/json"}\n)\ndata = response.json()\nprint(data["company"], data["signals"])`;

const SAMPLE_JSON = `{
  "company": "OpenAI",
  "signals": {
    "releaseNotes": 28,
    "features": 25,
    "press": 18,
    "devUpdates": 38,
    "strategy": 14,
    "news": 22
  },
  "weekOverWeek": {
    "signals": "+16.7%",
    "features": "+8.7%",
    "updates": "+22.0%"
  },
  "reportUrl": "/api/report?key=YOUR_KEY&company=OpenAI",
  "generatedAt": "2026-03-25T00:00:00Z"
}`;

const PLANS = [
  { plan: "Free", requests: "100", companies: "1,026+", categories: "6" },
  {
    plan: "Pro",
    requests: "10,000",
    companies: "1,026+",
    categories: "6 + Priority",
  },
  {
    plan: "Enterprise",
    requests: "Unlimited",
    companies: "1,026+",
    categories: "6 + Custom",
  },
];

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderLine = (line: string, idx: number) => {
    // Very lightweight syntax colouring
    const parts: React.ReactNode[] = [];
    let rest = line;

    if (language === "python" || language === "javascript") {
      // strings green
      rest = rest.replace(/("[^"]*"|'[^']*'|`[^`]*`)/g, "§STR§$1§END§");
    }

    const segments = rest.split(/(§STR§.*?§END§)/);
    for (const seg of segments) {
      if (seg.startsWith("§STR§") && seg.endsWith("§END§")) {
        parts.push(
          <span key={idx + seg} style={{ color: "#34D399" }}>
            {seg.slice(5, -5)}
          </span>,
        );
      } else {
        // keywords blue
        const kw = seg.replace(
          /\b(const|let|await|import|export|print|from|return|async|function|def|requests)\b/g,
          "§KW§$1§END§",
        );
        const kwParts = kw.split(/(§KW§.*?§END§)/);
        for (const k of kwParts) {
          if (k.startsWith("§KW§") && k.endsWith("§END§")) {
            parts.push(
              <span key={idx + k} style={{ color: "#818cf8" }}>
                {k.slice(4, -5)}
              </span>,
            );
          } else {
            // params yellow
            const pm = k.replace(/(\?[\w=&]+)/g, "§PM§$1§END§");
            const pmParts = pm.split(/(§PM§.*?§END§)/);
            for (const p of pmParts) {
              if (p.startsWith("§PM§") && p.endsWith("§END§")) {
                parts.push(
                  <span key={idx + p} style={{ color: "#fbbf24" }}>
                    {p.slice(4, -5)}
                  </span>,
                );
              } else {
                parts.push(<span key={idx + p}>{p}</span>);
              }
            }
          }
        }
      }
    }
    return <div key={idx}>{parts}</div>;
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-[#223046]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B1220] border-b border-[#223046]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-xs text-[#4a6480] font-mono">
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-[#4a6480] hover:text-[#22D3EE] transition-colors"
        >
          <Copy size={12} />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre
        className="px-4 py-4 overflow-x-auto text-sm leading-relaxed font-mono text-[#c9d5e0]"
        style={{ background: "#060d18" }}
      >
        <code>{code.split("\n").map((line, i) => renderLine(line, i))}</code>
      </pre>
    </div>
  );
}

export default function ApiServicePage() {
  return (
    <div className="min-h-screen bg-[#0B1220]">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden px-6 py-24 text-center"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34,211,238,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(139,92,246,0.1) 0%, transparent 55%), #0B1220",
        }}
      >
        {/* animated grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE] text-xs font-semibold tracking-widest mb-6">
            <Zap size={11} />
            v1.0 · REST API · JSON
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Dreamcrafter{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Intelligence API
            </span>
          </h1>

          <p className="text-[#7a9ab8] text-lg mb-8 max-w-xl mx-auto">
            Access real-time competitive intelligence programmatically.
            Integrate company data, signals, and AI-powered reports into your
            own tools.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/api-keys">
              <Button
                className="bg-[#22D3EE] hover:bg-[#06b6d4] text-black font-semibold px-6"
                data-ocid="api_service.primary_button"
              >
                <Key size={15} className="mr-2" />
                Get Your API Key
              </Button>
            </Link>
            <a href="#endpoints">
              <Button
                variant="outline"
                className="border-[#223046] text-[#c9d5e0] hover:border-[#22D3EE]/50 hover:text-[#22D3EE] bg-transparent"
                data-ocid="api_service.secondary_button"
              >
                <BookOpen size={15} className="mr-2" />
                View Endpoints
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div key={s.label} {...stagger(i)}>
              <Card className="bg-[#0F1B2A] border-[#223046] text-center">
                <CardContent className="p-5">
                  <s.icon size={20} className="text-[#22D3EE] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-0.5">
                    {s.value}
                  </div>
                  <div className="text-xs text-[#4a6480]">{s.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Auth Section ── */}
      <motion.section {...fadeUp} className="px-6 py-10 max-w-5xl mx-auto">
        <Card className="bg-[#0F1B2A] border-[#223046]">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                <Key size={16} className="text-[#22D3EE]" />
              </div>
              <CardTitle className="text-white text-lg">
                Authentication
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#7a9ab8] text-sm">
              All API requests require your API key passed as a{" "}
              <code className="text-[#22D3EE] bg-[#0B1220] px-1.5 py-0.5 rounded text-xs">
                key
              </code>{" "}
              query parameter. Keep your key secret — never expose it in
              client-side code.
            </p>
            <CodeBlock
              language="bash"
              code={"GET /api/report?key=YOUR_API_KEY&company=OpenAI"}
            />
            <p className="text-xs text-[#4a6480]">
              Don't have a key yet?{" "}
              <Link to="/api-keys" className="text-[#22D3EE] hover:underline">
                Generate one on the API Keys page →
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.section>

      {/* ── Endpoints ── */}
      <motion.section
        {...fadeUp}
        id="endpoints"
        className="px-6 py-10 max-w-5xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
            <Code2 size={16} className="text-[#8B5CF6]" />
          </div>
          <h2 className="text-xl font-bold text-white">Available Endpoints</h2>
        </div>

        <div className="space-y-4">
          {ENDPOINTS.map((ep, i) => (
            <motion.div key={ep.path} {...stagger(i)}>
              <Card className="bg-[#0F1B2A] border-[#223046]">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-md"
                        style={{
                          background:
                            ep.method === "POST"
                              ? "rgba(139,92,246,0.15)"
                              : "rgba(34,211,238,0.12)",
                          color: ep.method === "POST" ? "#a78bfa" : "#22D3EE",
                        }}
                      >
                        {ep.method}
                      </span>
                      <code className="text-white font-mono text-sm">
                        {ep.path}
                      </code>
                    </div>
                    <Badge
                      className="text-xs"
                      style={{
                        background:
                          ep.status === "active"
                            ? "rgba(52,211,153,0.15)"
                            : "rgba(251,191,36,0.12)",
                        color: ep.status === "active" ? "#34D399" : "#fbbf24",
                        border:
                          ep.status === "active"
                            ? "1px solid rgba(52,211,153,0.3)"
                            : "1px solid rgba(251,191,36,0.3)",
                      }}
                    >
                      {ep.status === "active" ? "ACTIVE" : "COMING SOON"}
                    </Badge>
                  </div>
                  <p className="text-[#7a9ab8] text-sm mt-1">
                    {ep.description}
                  </p>
                </CardHeader>

                {ep.params.length > 0 && (
                  <CardContent className="pt-0">
                    <p className="text-xs text-[#4a6480] font-semibold uppercase tracking-widest mb-2">
                      Parameters
                    </p>
                    <div className="rounded-lg overflow-hidden border border-[#223046]">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-[#223046] hover:bg-transparent">
                            <TableHead className="text-[#4a6480] text-xs">
                              Name
                            </TableHead>
                            <TableHead className="text-[#4a6480] text-xs">
                              Type
                            </TableHead>
                            <TableHead className="text-[#4a6480] text-xs">
                              Required
                            </TableHead>
                            <TableHead className="text-[#4a6480] text-xs">
                              Description
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ep.params.map((p) => (
                            <TableRow
                              key={p.name}
                              className="border-[#223046] hover:bg-[#0B1220]/50"
                            >
                              <TableCell>
                                <code className="text-[#22D3EE] text-xs">
                                  {p.name}
                                </code>
                              </TableCell>
                              <TableCell>
                                <span className="text-[#7a9ab8] text-xs">
                                  {p.type}
                                </span>
                              </TableCell>
                              <TableCell>
                                {p.required ? (
                                  <Badge className="bg-[#34D399]/10 text-[#34D399] border-[#34D399]/20 text-[10px]">
                                    required
                                  </Badge>
                                ) : (
                                  <Badge className="bg-[#223046] text-[#4a6480] border-[#223046] text-[10px]">
                                    optional
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-[#7a9ab8] text-xs">
                                {p.description}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <p className="mt-2 text-xs text-[#4a6480]">
                      <span className="text-[#7a9ab8]">Returns:</span>{" "}
                      {ep.returns}
                    </p>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Code Examples ── */}
      <motion.section {...fadeUp} className="px-6 py-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
            <Code2 size={16} className="text-[#22D3EE]" />
          </div>
          <h2 className="text-xl font-bold text-white">Code Examples</h2>
        </div>

        <Card className="bg-[#0F1B2A] border-[#223046]">
          <CardContent className="p-6">
            <Tabs defaultValue="curl" data-ocid="api_service.tab">
              <TabsList className="bg-[#0B1220] border border-[#223046] mb-4">
                <TabsTrigger
                  value="curl"
                  className="data-[state=active]:bg-[#22D3EE]/10 data-[state=active]:text-[#22D3EE]"
                >
                  cURL
                </TabsTrigger>
                <TabsTrigger
                  value="javascript"
                  className="data-[state=active]:bg-[#22D3EE]/10 data-[state=active]:text-[#22D3EE]"
                >
                  JavaScript
                </TabsTrigger>
                <TabsTrigger
                  value="python"
                  className="data-[state=active]:bg-[#22D3EE]/10 data-[state=active]:text-[#22D3EE]"
                >
                  Python
                </TabsTrigger>
              </TabsList>
              <TabsContent value="curl">
                <CodeBlock language="bash" code={CURL_CODE} />
              </TabsContent>
              <TabsContent value="javascript">
                <CodeBlock language="javascript" code={JS_CODE} />
              </TabsContent>
              <TabsContent value="python">
                <CodeBlock language="python" code={PYTHON_CODE} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.section>

      {/* ── Sample Response ── */}
      <motion.section {...fadeUp} className="px-6 py-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#34D399]/10 flex items-center justify-center">
            <Globe size={16} className="text-[#34D399]" />
          </div>
          <h2 className="text-xl font-bold text-white">Sample JSON Response</h2>
        </div>
        <Card className="bg-[#0F1B2A] border-[#223046]">
          <CardContent className="p-0">
            <CodeBlock language="json" code={SAMPLE_JSON} />
          </CardContent>
        </Card>
      </motion.section>

      {/* ── Rate Limits ── */}
      <motion.section {...fadeUp} className="px-6 py-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
            <Clock size={16} className="text-[#8B5CF6]" />
          </div>
          <h2 className="text-xl font-bold text-white">Rate Limits & Plans</h2>
        </div>

        <Card className="bg-[#0F1B2A] border-[#223046]">
          <CardContent className="p-0">
            <div className="rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#223046] bg-[#0B1220] hover:bg-[#0B1220]">
                    <TableHead className="text-[#4a6480] font-semibold">
                      Plan
                    </TableHead>
                    <TableHead className="text-[#4a6480] font-semibold">
                      Requests / Day
                    </TableHead>
                    <TableHead className="text-[#4a6480] font-semibold">
                      Companies
                    </TableHead>
                    <TableHead className="text-[#4a6480] font-semibold">
                      Signal Categories
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PLANS.map((p, i) => (
                    <TableRow
                      key={p.plan}
                      className="border-[#223046] hover:bg-[#0B1220]/50"
                      data-ocid={`api_service.item.${i + 1}`}
                    >
                      <TableCell>
                        <span
                          className="font-semibold"
                          style={{
                            color:
                              i === 0
                                ? "#7a9ab8"
                                : i === 1
                                  ? "#22D3EE"
                                  : "#8B5CF6",
                          }}
                        >
                          {p.plan}
                        </span>
                      </TableCell>
                      <TableCell className="text-white">{p.requests}</TableCell>
                      <TableCell className="text-[#7a9ab8]">
                        {p.companies}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className="text-xs"
                          style={{
                            background:
                              i === 0
                                ? "rgba(74,100,128,0.2)"
                                : i === 1
                                  ? "rgba(34,211,238,0.1)"
                                  : "rgba(139,92,246,0.1)",
                            color:
                              i === 0
                                ? "#7a9ab8"
                                : i === 1
                                  ? "#22D3EE"
                                  : "#a78bfa",
                            border: "none",
                          }}
                        >
                          {p.categories}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* ── Footer CTA ── */}
      <motion.section
        {...fadeUp}
        className="px-6 py-16 text-center"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(139,92,246,0.12) 0%, transparent 60%), #0B1220",
        }}
      >
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl font-bold text-white mb-3">
            Ready to start building?
          </h2>
          <p className="text-[#7a9ab8] mb-8">
            Generate your free API key and start querying competitive
            intelligence data in minutes.
          </p>
          <Link to="/api-keys">
            <Button
              className="bg-[#22D3EE] hover:bg-[#06b6d4] text-black font-semibold px-8 py-3 text-base"
              data-ocid="api_service.cta_button"
            >
              Get Your API Key
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-[#223046] py-6 text-center text-xs text-[#4a6480]">
        Dreamcrafter © {new Date().getFullYear()}. Built with ❤️ by Dreamcrafter
      </footer>
    </div>
  );
}
