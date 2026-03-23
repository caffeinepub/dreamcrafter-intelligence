import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  AtSign,
  BarChart3,
  Briefcase,
  Building2,
  Camera,
  CheckCircle,
  Clock,
  Copy,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Linkedin,
  Loader2,
  MapPin,
  Phone,
  Shield,
  Star,
  Upload,
  User,
  X,
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

const AVAILABLE_ROLES = [
  "Software Engineer",
  "Data Scientist",
  "AI/ML Engineer",
  "Product Manager",
  "DevOps Engineer",
  "Cybersecurity Engineer",
  "Cloud Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UX Designer",
  "Business Analyst",
];

const AVAILABLE_INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "AI/ML",
  "Gaming",
  "Retail",
  "Energy",
  "Media",
  "Automotive",
  "Logistics",
];

export default function ProfilePage() {
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading } = useUserProfile();
  const { data: usageStats, isLoading: statsLoading } = useUsageStats();
  const { data: apiKeys, isLoading: keysLoading } = useApiKeys();
  const saveProfile = useSaveUserProfile();

  // Existing fields
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

  // Social links
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");

  // Contact info
  const [phone, setPhone] = useState("");
  const [twitter, setTwitter] = useState("");
  const [timezone, setTimezone] = useState("");
  const [preferredContact, setPreferredContact] = useState<
    "Email" | "LinkedIn" | "Phone"
  >("Email");

  // Interests & roles
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [openToOpportunities, setOpenToOpportunities] = useState(false);

  // Resume
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeDate, setResumeDate] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

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

  const handleResumeFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume must be smaller than 5MB");
      return;
    }
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !["pdf", "doc", "docx"].includes(ext)) {
      toast.error("Only PDF or DOC files are supported");
      return;
    }
    setResumeFile(file);
    setResumeDate(new Date().toLocaleDateString("en-GB"));
    toast.success("Resume uploaded successfully");
  };

  const handleResumeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleResumeFile(file);
  };

  const handleResumeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleResumeFile(file);
  };

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry],
    );
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

  const openUrl = (url: string) => {
    if (!url) return;
    const full = url.startsWith("http") ? url : `https://${url}`;
    window.open(full, "_blank", "noopener,noreferrer");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
          Manage your account information, social links, and career preferences.
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
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-lg font-semibold text-foreground">
                          {effectiveName || "Set your display name"}
                        </p>
                        {openToOpportunities && (
                          <Badge className="bg-emerald-500/15 text-emerald-600 border-0 text-xs font-semibold px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 inline-block" />
                            Open to Opportunities
                          </Badge>
                        )}
                      </div>
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
                      {/* Social links quick access */}
                      {(linkedin || github) && (
                        <div className="flex items-center gap-3 mt-2.5">
                          {linkedin && (
                            <button
                              type="button"
                              onClick={() => openUrl(linkedin)}
                              className="text-muted-foreground hover:text-primary transition-colors"
                              aria-label="LinkedIn"
                            >
                              <Linkedin size={15} />
                            </button>
                          )}
                          {github && (
                            <button
                              type="button"
                              onClick={() => openUrl(github)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              aria-label="GitHub"
                            >
                              <Github size={15} />
                            </button>
                          )}
                          {portfolio && (
                            <button
                              type="button"
                              onClick={() => openUrl(portfolio)}
                              className="text-muted-foreground hover:text-primary transition-colors"
                              aria-label="Portfolio"
                            >
                              <Globe size={15} />
                            </button>
                          )}
                        </div>
                      )}
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

        {/* Social & Links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card className="shadow-card border-border">
            <CardHeader className="pb-3 px-5 pt-5">
              <div className="flex items-center gap-2">
                <Globe size={15} className="text-primary" />
                <CardTitle className="text-sm font-semibold text-foreground">
                  Social &amp; Links
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              {/* LinkedIn */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="linkedin"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <Linkedin size={13} className="text-blue-600" />
                  LinkedIn
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="linkedin"
                    data-ocid="profile.linkedin.input"
                    placeholder="https://linkedin.com/in/yourname"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={!linkedin}
                    onClick={() => openUrl(linkedin)}
                    className="shrink-0"
                  >
                    <ExternalLink size={13} className="mr-1" />
                    Visit
                  </Button>
                </div>
              </div>

              {/* GitHub */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="github"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <Github size={13} />
                  GitHub
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="github"
                    data-ocid="profile.github.input"
                    placeholder="https://github.com/yourhandle"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={!github}
                    onClick={() => openUrl(github)}
                    className="shrink-0"
                  >
                    <ExternalLink size={13} className="mr-1" />
                    Visit
                  </Button>
                </div>
              </div>

              {/* Portfolio */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="portfolio"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <Globe size={13} className="text-primary" />
                  Portfolio / Website
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="portfolio"
                    data-ocid="profile.portfolio.input"
                    placeholder="https://yourwebsite.com"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={!portfolio}
                    onClick={() => openUrl(portfolio)}
                    className="shrink-0"
                  >
                    <ExternalLink size={13} className="mr-1" />
                    Visit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="shadow-card border-border">
            <CardHeader className="pb-3 px-5 pt-5">
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-primary" />
                <CardTitle className="text-sm font-semibold text-foreground">
                  Contact Information
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium flex items-center gap-1.5"
                  >
                    <Phone size={12} className="text-muted-foreground" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    data-ocid="profile.phone.input"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="twitter"
                    className="text-sm font-medium flex items-center gap-1.5"
                  >
                    <AtSign size={12} className="text-muted-foreground" />
                    Twitter / X Handle
                  </Label>
                  <Input
                    id="twitter"
                    data-ocid="profile.twitter.input"
                    placeholder="@yourhandle"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="timezone"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <Clock size={12} className="text-muted-foreground" />
                  Timezone
                </Label>
                <Input
                  id="timezone"
                  data-ocid="profile.timezone.input"
                  placeholder="e.g. UTC+5:30 / EST"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Preferred Contact Method
                </Label>
                <div className="flex flex-wrap gap-2">
                  {(["Email", "LinkedIn", "Phone"] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      data-ocid={`profile.contact.${method.toLowerCase()}.toggle`}
                      onClick={() => setPreferredContact(method)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                        preferredContact === method
                          ? "bg-primary text-white border-primary"
                          : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interests & Role Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <Card className="shadow-card border-border">
            <CardHeader className="pb-3 px-5 pt-5">
              <div className="flex items-center gap-2">
                <Star size={15} className="text-primary" />
                <CardTitle className="text-sm font-semibold text-foreground">
                  Interests &amp; Role Preferences
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-5">
              {/* Interested Roles */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Interested Roles
                  {selectedRoles.length > 0 && (
                    <span className="ml-2 text-xs text-primary font-normal">
                      {selectedRoles.length} selected
                    </span>
                  )}
                </Label>
                <div
                  className="flex flex-wrap gap-2"
                  data-ocid="profile.roles.panel"
                >
                  {AVAILABLE_ROLES.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => toggleRole(role)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                        selectedRoles.includes(role)
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-muted text-muted-foreground border-border hover:border-primary/40"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Industries of Interest */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Industries of Interest
                  {selectedIndustries.length > 0 && (
                    <span className="ml-2 text-xs text-primary font-normal">
                      {selectedIndustries.length} selected
                    </span>
                  )}
                </Label>
                <div
                  className="flex flex-wrap gap-2"
                  data-ocid="profile.industries.panel"
                >
                  {AVAILABLE_INDUSTRIES.map((industry) => (
                    <button
                      key={industry}
                      type="button"
                      onClick={() => toggleIndustry(industry)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                        selectedIndustries.includes(industry)
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-muted text-muted-foreground border-border hover:border-primary/40"
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience & Open to Opportunities */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="experience" className="text-sm font-medium">
                    Years of Experience
                  </Label>
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger
                      id="experience"
                      data-ocid="profile.experience.select"
                    >
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0 – 1 year</SelectItem>
                      <SelectItem value="1-3">1 – 3 years</SelectItem>
                      <SelectItem value="3-5">3 – 5 years</SelectItem>
                      <SelectItem value="5-10">5 – 10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">
                    Open to Opportunities
                  </Label>
                  <div className="flex items-center gap-3 h-10">
                    <Switch
                      id="openToOpportunities"
                      data-ocid="profile.opportunities.switch"
                      checked={openToOpportunities}
                      onCheckedChange={setOpenToOpportunities}
                    />
                    <Label
                      htmlFor="openToOpportunities"
                      className={`text-sm cursor-pointer select-none ${
                        openToOpportunities
                          ? "text-emerald-600 font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {openToOpportunities
                        ? "Yes, actively looking"
                        : "Not currently"}
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resume & Documents */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="shadow-card border-border">
            <CardHeader className="pb-3 px-5 pt-5">
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-primary" />
                <CardTitle className="text-sm font-semibold text-foreground">
                  Resume &amp; Documents
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              {/* Upload zone */}
              {!resumeFile ? (
                <label
                  htmlFor="resumeUpload"
                  data-ocid="profile.resume.dropzone"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleResumeDrop}
                  className={`border-dashed border-2 rounded-lg p-8 text-center cursor-pointer transition-all block ${
                    isDragOver
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/30"
                  }`}
                >
                  <Upload
                    size={32}
                    className={`mx-auto mb-3 ${
                      isDragOver ? "text-primary" : "text-muted-foreground/50"
                    }`}
                  />
                  <p className="text-sm font-medium text-foreground mb-1">
                    Drag &amp; drop your resume or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports PDF, DOC, DOCX · Max 5MB
                  </p>
                  <input
                    ref={resumeInputRef}
                    id="resumeUpload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleResumeInputChange}
                    data-ocid="profile.resume.upload_button"
                  />
                </label>
              ) : (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {resumeFile.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(resumeFile.size)}
                      </p>
                      {resumeDate && (
                        <>
                          <span className="text-muted-foreground/40 text-xs">
                            ·
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Updated {resumeDate}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    data-ocid="profile.resume.delete_button"
                    onClick={() => {
                      setResumeFile(null);
                      setResumeDate("");
                    }}
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                    aria-label="Remove resume"
                  >
                    <X size={15} />
                  </Button>
                </div>
              )}

              {/* Cover Letter */}
              <div className="space-y-1.5">
                <Label htmlFor="coverLetter" className="text-sm font-medium">
                  Cover Letter
                  <span className="text-muted-foreground font-normal ml-1 text-xs">
                    (optional)
                  </span>
                </Label>
                <Textarea
                  id="coverLetter"
                  data-ocid="profile.coverletter.textarea"
                  placeholder="Paste your cover letter or a brief introduction..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Template link */}
              <div className="flex items-center gap-2 pt-1">
                <ExternalLink size={13} className="text-primary shrink-0" />
                <button
                  type="button"
                  className="text-sm text-primary hover:underline font-medium"
                  onClick={() => toast.info("Resume template coming soon!")}
                >
                  Download sample resume template
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Usage Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
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
          transition={{ duration: 0.3, delay: 0.4 }}
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
