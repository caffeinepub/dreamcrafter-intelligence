import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  BarChart2,
  Bot,
  Brain,
  Briefcase,
  Building2,
  ChevronDown,
  Database,
  FolderOpen,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Plug,
  Radar,
  Search,
  Send,
  Settings,
  User,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useUserProfile } from "../hooks/useQueries";
import NotificationDropdown from "./NotificationDropdown";

const navLinks = [
  { label: "Companies", to: "/companies" },
  { label: "Market Scout", to: "/market-scout" },
  { label: "API Keys", to: "/api-keys" },
];

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Companies", icon: Building2, to: "/companies" },
  { label: "Market Scout", icon: Radar, to: "/market-scout" },
  { label: "Analytics", icon: BarChart2, to: "/analytics" },
  { label: "Open Roles", icon: Briefcase, to: "/open-roles" },
  { label: "Projects", icon: FolderOpen, to: "/" },
  { label: "Datasets", icon: Database, to: "/" },
  { label: "Integrations", icon: Plug, to: "/" },
  { label: "Settings", icon: Settings, to: "/" },
  { label: "Help", icon: HelpCircle, to: "/" },
];

const EXACT_ROUTES = [
  "/",
  "/analysis-path",
  "/api-keys",
  "/companies",
  "/market-scout",
  "/analytics",
  "/open-roles",
  "/profile",
];

function isRouteActive(currentPath: string, to: string): boolean {
  if (to === "/") return currentPath === "/";
  if (EXACT_ROUTES.includes(to)) return currentPath === to;
  return currentPath.startsWith(to);
}

// ─── Floating Chatbot ──────────────────────────────────────────────────────

type ChatRole = "user" | "bot";
interface ChatMessage {
  id: number;
  role: ChatRole;
  text: string;
}

const QUICK_PROMPTS = [
  "Top AI companies",
  "Compare Google vs Microsoft",
  "Latest tech trends",
];

function getBotResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("google") && q.includes("microsoft")) {
    return "**Google vs Microsoft** — Both are dominant AI players. Google leads in research (DeepMind, Gemini) and cloud AI (Vertex AI). Microsoft has execution edge with OpenAI integration across Azure, Office 365, and GitHub Copilot.";
  }
  if (q.includes("google")) {
    return "**Google (Alphabet)** is a dominant force in AI and cloud infrastructure. Key products: Gemini (LLM), Vertex AI (cloud ML), DeepMind (research), and Google Cloud. Competitive threat level: Very High.";
  }
  if (q.includes("microsoft")) {
    return "**Microsoft** has become the enterprise AI market leader through its OpenAI partnership. Azure OpenAI, Copilot across M365, and GitHub Copilot are driving significant revenue growth.";
  }
  if (q.includes("openai")) {
    return "**OpenAI** leads in consumer AI (ChatGPT: 100M+ users) and enterprise APIs. GPT-4o is the current flagship. Revenue run rate estimated at $2B+.";
  }
  if (q.includes("anthropic")) {
    return "**Anthropic** positions Claude as the safety-focused enterprise AI. Claude 3.5 Sonnet scores highly on coding benchmarks. Backed by Google and Amazon.";
  }
  if (q.includes("ai compan") || q.includes("top ai")) {
    return "**Top AI Companies (2025)**:\n1. OpenAI — GPT-4o, ChatGPT\n2. Google DeepMind — Gemini Ultra\n3. Anthropic — Claude 3.5\n4. Microsoft — Azure AI, Copilot\n5. Meta AI — Llama 3 (open-source)";
  }
  if (q.includes("trend")) {
    return "**Latest Tech Trends (Q1 2025)**:\n• Multimodal AI becoming standard\n• Small/efficient models challenging large models\n• AI agents gaining enterprise traction\n• Open-source models closing the quality gap";
  }
  if (q.includes("competitor")) {
    return "To suggest competitors, tell me which company you're analyzing. For example: \"Who are Apple's main AI competitors?\"";
  }
  return `I can help with market intelligence on **${input}**. Try running it through **Market Scout** for live technical signals and a structured report. Would you like key competitors or industry benchmarks instead?`;
}

let chatCounter = 0;

function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: ++chatCounter,
      role: "bot",
      text: "Hi! I'm your Dreamcrafter AI assistant. Ask me about any company, competitor analysis, or market intelligence.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new messages
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, open]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setMessages((prev) => [
      ...prev,
      { id: ++chatCounter, role: "user", text: trimmed },
    ]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: ++chatCounter, role: "bot", text: getBotResponse(trimmed) },
      ]);
      setIsTyping(false);
    }, 1400);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-80 rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "480px" }}
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border bg-card">
              <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <Bot size={15} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">
                  AI Intelligence Assistant
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-[10px] text-muted-foreground">
                    Online
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-6 h-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close chat"
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 px-3 py-3">
              <div className="space-y-2.5 pr-1">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "flex gap-2 max-w-[88%]",
                        msg.role === "user" ? "ml-auto flex-row-reverse" : "",
                      )}
                    >
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                          msg.role === "bot" ? "bg-primary/15" : "bg-primary",
                        )}
                      >
                        {msg.role === "bot" ? (
                          <Bot size={11} className="text-primary" />
                        ) : (
                          <User size={11} className="text-white" />
                        )}
                      </div>
                      <div
                        className={cn(
                          "rounded-2xl px-3 py-2 text-xs leading-relaxed",
                          msg.role === "bot"
                            ? "bg-muted text-foreground rounded-tl-sm"
                            : "bg-primary text-white rounded-tr-sm",
                        )}
                      >
                        <div style={{ whiteSpace: "pre-line" }}>
                          {msg.text
                            .split(/(\*\*[^*]+\*\*)/)
                            .map((part) =>
                              part.startsWith("**") && part.endsWith("**") ? (
                                <strong key={part}>{part.slice(2, -2)}</strong>
                              ) : (
                                part
                              ),
                            )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-2"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <Bot size={11} className="text-primary" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2.5 flex gap-1 items-center">
                        {[0, 0.18, 0.36].map((delay) => (
                          <motion.span
                            key={delay}
                            className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60"
                            animate={{ y: [0, -3, 0] }}
                            transition={{
                              duration: 0.55,
                              repeat: Number.POSITIVE_INFINITY,
                              delay,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            {/* Quick prompts */}
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => sendMessage(p)}
                  disabled={isTyping}
                  className="text-[10px] px-2 py-1 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors disabled:opacity-40"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-3 pb-3 flex gap-2">
              <Input
                placeholder="Ask about a company..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                disabled={isTyping}
                className="flex-1 h-8 text-xs"
                data-ocid="chatbot.input"
              />
              <Button
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                data-ocid="chatbot.primary_button"
              >
                <Send size={13} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-ocid="chatbot.toggle"
        aria-label="Toggle AI chatbot"
        className="w-13 h-13 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:bg-primary/90 transition-colors relative"
        style={{ width: 52, height: 52 }}
      >
        {open ? <X size={22} /> : <Bot size={22} />}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-card" />
        )}
      </motion.button>
    </div>
  );
}

// ─── Layout ────────────────────────────────────────────────────────────────

export default function Layout() {
  const { clear, identity: _identity } = useInternetIdentity();
  const { data: profile } = useUserProfile();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const displayName = profile?.displayName || "User";
  const initials = displayName.slice(0, 2).toUpperCase();
  const avatarUrl = profile?.avatarUrl?.getDirectURL?.() ?? "";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="w-60 flex-shrink-0 bg-sidebar flex flex-col fixed left-0 top-0 h-full z-30">
        <div className="h-16 flex items-center px-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <Brain size={18} className="text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-white text-xs font-bold tracking-wide">
                DREAMCRAFTER
              </p>
              <p className="text-white/40 text-[10px] font-medium tracking-wider">
                INTELLIGENCE
              </p>
            </div>
          </div>
        </div>

        <nav
          className="flex-1 py-4 px-3 overflow-y-auto"
          aria-label="Sidebar navigation"
        >
          <ul className="space-y-0.5">
            {sidebarItems.map((item) => {
              const isActive =
                isRouteActive(currentPath, item.to) &&
                (item.to !== "/" || item.label === "Dashboard") &&
                (item.to !== "/" ||
                  ![
                    "Projects",
                    "Datasets",
                    "Integrations",
                    "Settings",
                    "Help",
                  ].includes(item.label));
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    data-ocid={`sidebar.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-white"
                        : "text-sidebar-foreground/60 hover:text-white hover:bg-sidebar-accent/50",
                    )}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        <header className="h-16 bg-card border-b border-border fixed top-0 left-60 right-0 z-20 flex items-center px-6 gap-4">
          <nav
            className="flex items-center gap-0.5 flex-1 overflow-x-auto"
            aria-label="Top navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                isRouteActive(currentPath, link.to) && link.to !== "/";
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                    isActive
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              data-ocid="nav.search_input"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Search"
            >
              <Search size={16} />
            </button>

            <NotificationDropdown count={0} />

            <DropdownMenu>
              <DropdownMenuTrigger
                data-ocid="nav.profile.button"
                className="flex items-center gap-2 pl-2 pr-2 py-1.5 rounded-lg hover:bg-muted transition-colors ml-1"
              >
                <Avatar className="w-7 h-7">
                  {avatarUrl && (
                    <AvatarImage src={avatarUrl} alt={displayName} />
                  )}
                  <AvatarFallback className="bg-primary text-white text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground hidden sm:block max-w-28 truncate">
                  {displayName}
                </span>
                <ChevronDown size={13} className="text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem asChild>
                  <Link to="/profile" data-ocid="nav.profile.link">
                    <User size={13} className="mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  data-ocid="nav.logout.button"
                  className="text-destructive focus:text-destructive"
                  onClick={clear}
                >
                  <LogOut size={13} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 mt-16 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <FloatingChatbot />
    </div>
  );
}
