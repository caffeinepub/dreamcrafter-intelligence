import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  BarChart3,
  Briefcase,
  Building2,
  Camera,
  CheckCircle,
  Copy,
  FileText,
  Loader2,
  MapPin,
  Shield,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useApiKeys,
  useSaveUserProfile,
  useUsageStats,
  useUserProfile,
} from "../hooks/useQueries";

export default function ProfilePage() {
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading } = useUserProfile();
  const { data: usageStats, isLoading: statsLoading } = useUsageStats();
  const { data: apiKeys, isLoading: keysLoading } = useApiKeys();
  const saveProfile = useSaveUserProfile();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarBytes, setAvatarBytes] =
    useState<Uint8Array<ArrayBuffer> | null>(null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const principal = identity?.getPrincipal().toString() ?? "";
  const currentName = profile?.displayName || "";
  const currentEmail = profile?.email || "";
  const currentAvatarUrl = profile?.avatarUrl?.getDirectURL?.() ?? "";
  const displayedAvatar = avatarPreview || currentAvatarUrl;
  const effectiveName = displayName || currentName;
  const initials = effectiveName
    ? effectiveName.slice(0, 2).toUpperCase()
    : principal.slice(0, 2).toUpperCase();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer) as Uint8Array<ArrayBuffer>;
    setAvatarBytes(bytes);
    const reader = new FileReader();
    reader.onload = (ev) =>
      setAvatarPreview((ev.target?.result as string) || "");
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const name = displayName.trim() || currentName.trim();
    if (!name) {
      toast.error("Display name cannot be empty");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        displayName: name,
        email: email.trim() || currentEmail.trim(),
        ...(avatarBytes ? { avatarBytes } : { avatarUrl: currentAvatarUrl }),
      });
      toast.success("Profile saved successfully");
      setSaved(true);
      setAvatarBytes(null);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      toast.error("Failed to save profile");
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const statCards = [
    {
      icon: Activity,
      label: "API Calls",
      value: usageStats?.apiCallCount ?? 0n,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: FileText,
      label: "Reports Generated",
      value: usageStats?.reportsGenerated ?? 0n,
      color: "text-chart-2",
      bg: "bg-chart-2/10",
    },
    {
      icon: Building2,
      label: "Companies Tracked",
      value: usageStats?.companiesTracked ?? 0n,
      color: "text-chart-3",
      bg: "bg-chart-3/10",
    },
  ];

  return (
    <div className="p-6 max-w-3xl" data-ocid="profile.page">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2.5 mb-1">
          <User size={20} className="text-primary" />
          <h1 className="text-xl font-bold text-foreground">Profile</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Manage your account information and settings.
        </p>
      </motion.div>

      <div className="space-y-5">
        {/* Header card with avatar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <Card className="shadow-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start gap-5">
                <div className="relative group shrink-0">
                  <Avatar className="w-20 h-20">
                    {displayedAvatar && (
                      <AvatarImage src={displayedAvatar} alt={effectiveName} />
                    )}
                    <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    data-ocid="profile.upload_button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    aria-label="Upload avatar"
                  >
                    <Camera size={18} className="text-white" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-6 w-40 mb-2" />
                      <Skeleton className="h-4 w-56 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-semibold text-foreground">
                        {effectiveName || "Set your display name"}
                      </p>
                      {(email || currentEmail) && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {email || currentEmail}
                        </p>
                      )}
                      {/* Extra profile details as chips */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {jobTitle && (
                          <Badge
                            variant="secondary"
                            className="text-xs gap-1 px-2 py-0.5"
                          >
                            <Briefcase size={10} />
                            {jobTitle}
                          </Badge>
                        )}
                        {organization && (
                          <Badge
                            variant="secondary"
                            className="text-xs gap-1 px-2 py-0.5"
                          >
                            <Building2 size={10} />
                            {organization}
                          </Badge>
                        )}
                        {location && (
                          <Badge
                            variant="secondary"
                            className="text-xs gap-1 px-2 py-0.5"
                          >
                            <MapPin size={10} />
                            {location}
                          </Badge>
                        )}
                        {bio && (
                          <p className="text-xs text-muted-foreground mt-1 w-full line-clamp-2">
                            {bio}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground/60 mt-1.5 truncate font-mono">
                        {principal.slice(0, 24)}...
                      </p>
                    </>
                  )}
                </div>

                <Badge className="bg-primary/10 text-primary border-0 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0">
                  <Shield size={11} className="mr-1" />
                  Verified
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Edit form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="shadow-card border-border">
            <CardHeader className="pb-3 px-5 pt-5">
              <CardTitle className="text-sm font-semibold text-foreground">
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="displayName" className="text-sm font-medium">
                    Display Name
                  </Label>
                  <Input
                    id="displayName"
                    data-ocid="profile.input"
                    placeholder={currentName || "Enter your display name"}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="profileEmail" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="profileEmail"
                    data-ocid="profile.email.input"
                    type="email"
                    placeholder={currentEmail || "you@example.com"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="jobTitle" className="text-sm font-medium">
                    Job Title
                    <span className="text-muted-foreground font-normal ml-1 text-xs">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="jobTitle"
                    data-ocid="profile.jobtitle.input"
                    placeholder="e.g. Senior Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="organization" className="text-sm font-medium">
                    Company / Organization
                    <span className="text-muted-foreground font-normal ml-1 text-xs">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="organization"
                    data-ocid="profile.organization.input"
                    placeholder="e.g. Acme Corp"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                  <span className="text-muted-foreground font-normal ml-1 text-xs">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="location"
                  data-ocid="profile.location.input"
                  placeholder="City, Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="bio" className="text-sm font-medium">
                  Bio
                  <span className="text-muted-foreground font-normal ml-1 text-xs">
                    (optional)
                  </span>
                </Label>
                <Textarea
                  id="bio"
                  data-ocid="profile.bio.textarea"
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Principal ID</Label>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={principal}
                    className="text-muted-foreground text-xs font-mono bg-muted border-muted flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    data-ocid="profile.copy.button"
                    onClick={() => copyToClipboard(principal, "Principal ID")}
                    className="shrink-0"
                  >
                    <Copy size={14} />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your unique identifier on the Internet Computer.
                </p>
              </div>

              {avatarPreview && (
                <p className="text-xs text-primary font-medium flex items-center gap-1">
                  <Camera size={12} />
                  New avatar selected — save to apply
                </p>
              )}

              <Button
                onClick={handleSave}
                disabled={
                  saveProfile.isPending ||
                  (!displayName.trim() && !currentName && !avatarBytes)
                }
                data-ocid="profile.save.submit_button"
                className="w-full sm:w-auto"
              >
                {saveProfile.isPending ? (
                  <>
                    <Loader2 size={14} className="mr-1.5 animate-spin" />
                    Saving...
                  </>
                ) : saved ? (
                  <>
                    <CheckCircle size={14} className="mr-1.5" />
                    Saved!
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Usage Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card className="shadow-card border-border">
            <CardHeader className="pb-3 px-5 pt-5">
              <div className="flex items-center gap-2">
                <BarChart3 size={15} className="text-primary" />
                <CardTitle className="text-sm font-semibold text-foreground">
                  Usage Statistics
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div
                className="grid grid-cols-3 gap-4"
                data-ocid="profile.stats.panel"
              >
                {statCards.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="text-center p-4 rounded-lg bg-muted/50"
                    >
                      {statsLoading ? (
                        <>
                          <Skeleton className="h-8 w-16 mx-auto mb-2" />
                          <Skeleton className="h-4 w-20 mx-auto" />
                        </>
                      ) : (
                        <>
                          <div
                            className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-2`}
                          >
                            <Icon size={16} className={stat.color} />
                          </div>
                          <p className="text-2xl font-bold text-foreground">
                            {stat.value.toString()}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {stat.label}
                          </p>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Keys */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="shadow-card border-border">
            <CardHeader className="pb-3 px-5 pt-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield size={15} className="text-primary" />
                  <CardTitle className="text-sm font-semibold text-foreground">
                    API Keys
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              {keysLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : !apiKeys || apiKeys.length === 0 ? (
                <div
                  className="text-center py-6"
                  data-ocid="profile.apikeys.empty_state"
                >
                  <Shield
                    size={28}
                    className="text-muted-foreground/30 mx-auto mb-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    No API keys yet.
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    Generate keys from the{" "}
                    <a
                      href="/api-keys"
                      className="text-primary hover:underline"
                    >
                      API Keys page
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <div className="space-y-2" data-ocid="profile.apikeys.list">
                  {apiKeys.map((key, i) => (
                    <div
                      key={key.name}
                      data-ocid={`profile.apikey.item.${i + 1}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {key.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {key.isActive ? (
                            <span className="text-success">Active</span>
                          ) : (
                            <span className="text-destructive">Inactive</span>
                          )}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        data-ocid={`profile.apikey.copy.button.${i + 1}`}
                        onClick={() =>
                          copyToClipboard(key.name, "API key name")
                        }
                        className="shrink-0"
                      >
                        <Copy size={13} className="mr-1.5" />
                        Copy
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
