import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  Code2,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  Key,
  Loader2,
  Plus,
  RefreshCw,
  Shield,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useApiKeys,
  useCallerApiKey,
  useCreateApiKey,
  useGenerateApiKey,
  useRegenerateApiKey,
} from "../hooks/useQueries";

function formatDate(ts: bigint) {
  const ms = Number(ts / BigInt(1000000));
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const FALLBACK_KEYS = [
  {
    name: "Production API Key",
    createdDate: BigInt(Date.now() - 2592000000) * BigInt(1000000),
    isActive: true,
  },
  {
    name: "Staging Integration",
    createdDate: BigInt(Date.now() - 1296000000) * BigInt(1000000),
    isActive: true,
  },
  {
    name: "Analytics Connector",
    createdDate: BigInt(Date.now() - 604800000) * BigInt(1000000),
    isActive: false,
  },
];

// ── Primary Key Card ────────────────────────────────────────────────────────
function PrimaryKeyCard() {
  const { data: apiKey, isLoading } = useCallerApiKey();
  const generate = useGenerateApiKey();
  const regenerate = useRegenerateApiKey();
  const [revealed, setRevealed] = useState(false);
  const [regenOpen, setRegenOpen] = useState(false);

  const maskedKey = apiKey ? `dk_live_${"•".repeat(24)}` : null;

  const handleCopy = () => {
    if (!apiKey) return;
    void navigator.clipboard.writeText(apiKey);
    toast.success("API key copied to clipboard");
  };

  const handleGenerate = async () => {
    try {
      await generate.mutateAsync();
      toast.success("API key generated successfully");
    } catch {
      toast.error("Failed to generate API key");
    }
  };

  const handleRegenerate = async () => {
    try {
      await regenerate.mutateAsync();
      setRegenOpen(false);
      setRevealed(false);
      toast.success("API key regenerated — update your integrations");
    } catch {
      toast.error("Failed to regenerate API key");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Card className="border-border shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield size={16} className="text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Your API Key</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Use this key to authenticate requests to the Dreamcrafter API
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {isLoading ? (
            <Skeleton
              className="h-10 w-full"
              data-ocid="api_keys.primary.loading_state"
            />
          ) : apiKey ? (
            <>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    readOnly
                    value={revealed ? apiKey : (maskedKey ?? "")}
                    className="font-mono text-sm pr-10 bg-muted/50"
                    data-ocid="api_keys.primary.input"
                  />
                  <button
                    type="button"
                    onClick={() => setRevealed((v) => !v)}
                    data-ocid="api_keys.primary.toggle"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={revealed ? "Hide key" : "Reveal key"}
                  >
                    {revealed ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  data-ocid="api_keys.primary.button"
                  aria-label="Copy API key"
                >
                  <Copy size={15} />
                </Button>

                {/* Regenerate dialog */}
                <Dialog open={regenOpen} onOpenChange={setRegenOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      data-ocid="api_keys.regenerate.open_modal_button"
                      aria-label="Regenerate key"
                    >
                      <RefreshCw size={15} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent data-ocid="api_keys.regenerate.dialog">
                    <DialogHeader>
                      <DialogTitle>Regenerate API Key?</DialogTitle>
                      <DialogDescription>
                        Your current key will be permanently invalidated. Any
                        integrations using it will stop working immediately.
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setRegenOpen(false)}
                        data-ocid="api_keys.regenerate.cancel_button"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => void handleRegenerate()}
                        disabled={regenerate.isPending}
                        data-ocid="api_keys.regenerate.confirm_button"
                      >
                        {regenerate.isPending ? (
                          <>
                            <Loader2
                              size={14}
                              className="mr-1.5 animate-spin"
                            />
                            Regenerating...
                          </>
                        ) : (
                          "Yes, regenerate"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Active
                </span>
                <span className="text-muted-foreground text-xs">
                  • Keep this key secret. Never expose it in client-side code.
                </span>
              </div>
            </>
          ) : (
            <div className="py-4 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                No API key yet. Generate one to start making requests.
              </p>
              <Button
                onClick={() => void handleGenerate()}
                disabled={generate.isPending}
                data-ocid="api_keys.generate.primary_button"
              >
                {generate.isPending ? (
                  <>
                    <Loader2 size={14} className="mr-1.5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Key size={14} className="mr-1.5" />
                    Generate API Key
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── API Reference Card ───────────────────────────────────────────────────────
function ApiReferenceCard({ apiKey }: { apiKey: string | null | undefined }) {
  const exampleUrl = apiKey
    ? `/api/report?key=${apiKey}&company=OpenAI`
    : "/api/report?key=YOUR_API_KEY&company=COMPANY_NAME";

  const handleCopyUrl = () => {
    void navigator.clipboard.writeText(exampleUrl);
    toast.success("Example URL copied");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
    >
      <Card className="border-border shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Code2 size={16} className="text-accent-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">API Reference</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                How to use your key to fetch intelligence reports
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Endpoint */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Endpoint
            </Label>
            <div className="flex items-center gap-2 rounded-lg bg-muted/60 border border-border px-3 py-2.5 font-mono text-sm">
              <span className="text-success font-semibold text-xs">GET</span>
              <span className="text-foreground flex-1 truncate">
                /api/report?key=YOUR_KEY&company=COMPANY_NAME
              </span>
            </div>
          </div>

          {/* Example URL */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Example
            </Label>
            <div className="flex items-center gap-2 rounded-lg bg-muted/60 border border-border px-3 py-2.5">
              <span className="font-mono text-xs text-foreground flex-1 truncate break-all">
                {exampleUrl}
              </span>
              <button
                type="button"
                onClick={handleCopyUrl}
                data-ocid="api_keys.reference.button"
                className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Copy URL"
              >
                <Copy size={13} />
              </button>
              <a
                href={exampleUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="api_keys.reference.link"
                className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Open in browser"
              >
                <ExternalLink size={13} />
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Returns a styled HTML page in browsers. API clients receive JSON.
            </p>
          </div>

          <Separator />

          {/* Parameters */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Parameters
            </Label>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">
                      Param
                    </th>
                    <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">
                      Required
                    </th>
                    <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-3 py-2.5 font-mono text-xs text-primary">
                      key
                    </td>
                    <td className="px-3 py-2.5">
                      <Badge variant="outline" className="text-[10px] px-1.5">
                        required
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground">
                      Your API key
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 font-mono text-xs text-primary">
                      company
                    </td>
                    <td className="px-3 py-2.5">
                      <Badge variant="outline" className="text-[10px] px-1.5">
                        required
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground">
                      Company name to look up
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Response */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              HTML Report Includes
            </Label>
            <ul className="grid grid-cols-2 gap-1.5">
              {[
                "Company Overview",
                "Key Features",
                "Market Intelligence",
                "Sources & Citations",
                "Export Options",
                "Date & Metadata",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <CheckCircle
                    size={11}
                    className="text-success flex-shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Named Keys List ─────────────────────────────────────────────────────────
function NamedKeysCard() {
  const [open, setOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const { data: apiKeys, isLoading } = useApiKeys();
  const createKey = useCreateApiKey();
  const displayKeys = apiKeys && apiKeys.length > 0 ? apiKeys : FALLBACK_KEYS;

  const handleCreate = async () => {
    if (!newKeyName.trim()) return;
    try {
      await createKey.mutateAsync(newKeyName.trim());
      toast.success(`API key "${newKeyName}" created`);
      setNewKeyName("");
      setOpen(false);
    } catch {
      toast.error("Failed to create API key");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
    >
      <Card className="border-border shadow-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Named API Keys</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Create named keys for different integrations and services
              </CardDescription>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" data-ocid="api_keys.create.open_modal_button">
                  <Plus size={13} className="mr-1.5" /> New Key
                </Button>
              </DialogTrigger>
              <DialogContent data-ocid="api_keys.create.dialog">
                <DialogHeader>
                  <DialogTitle>Create Named API Key</DialogTitle>
                  <DialogDescription>
                    Give this key a name to identify where it's used.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-2">
                  <Label htmlFor="keyName" className="text-sm font-medium">
                    Key Name
                  </Label>
                  <Input
                    id="keyName"
                    data-ocid="api_keys.create.input"
                    placeholder="e.g. Production Backend Key"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && void handleCreate()}
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                    data-ocid="api_keys.create.cancel_button"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => void handleCreate()}
                    disabled={!newKeyName.trim() || createKey.isPending}
                    data-ocid="api_keys.create.submit_button"
                  >
                    {createKey.isPending ? (
                      <>
                        <Loader2 size={14} className="mr-1.5 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Key"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="px-0 pb-4">
          {isLoading ? (
            <div className="px-5 space-y-3" data-ocid="api_keys.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-14 w-full rounded-lg" />
              ))}
            </div>
          ) : displayKeys.length === 0 ? (
            <div
              className="px-5 py-8 text-center"
              data-ocid="api_keys.empty_state"
            >
              <Key
                size={28}
                className="mx-auto text-muted-foreground/30 mb-2"
              />
              <p className="text-sm text-muted-foreground">
                No named keys yet.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border" data-ocid="api_keys.list">
              {displayKeys.map((key, i) => (
                <motion.li
                  key={key.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-muted/40 transition-colors"
                  data-ocid={`api_keys.item.${i + 1}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0",
                        key.isActive ? "bg-success/10" : "bg-muted",
                      )}
                    >
                      <Key
                        size={13}
                        className={
                          key.isActive
                            ? "text-success"
                            : "text-muted-foreground"
                        }
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {key.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Created {formatDate(key.createdDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge
                      className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full border-0",
                        key.isActive
                          ? "bg-success/10 text-success"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {key.isActive ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle size={9} />
                          Active
                        </span>
                      ) : (
                        "Inactive"
                      )}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => {
                        void navigator.clipboard.writeText(key.name);
                        toast.success("Copied!");
                      }}
                      data-ocid={`api_keys.copy.button.${i + 1}`}
                      className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      aria-label="Copy"
                    >
                      <Copy size={13} />
                    </button>
                    <button
                      type="button"
                      data-ocid={`api_keys.delete_button.${i + 1}`}
                      className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      aria-label="Revoke"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ApiKeysPage() {
  const { data: primaryKey } = useCallerApiKey();

  return (
    <div className="p-6 max-w-3xl space-y-6" data-ocid="api_keys.page">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2.5 mb-1">
          <Key size={20} className="text-primary" />
          <h1 className="text-xl font-bold text-foreground">API Keys</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Manage authentication keys for accessing the Dreamcrafter Intelligence
          API.
        </p>
      </motion.div>

      <PrimaryKeyCard />
      <ApiReferenceCard apiKey={primaryKey} />
      <NamedKeysCard />
    </div>
  );
}
