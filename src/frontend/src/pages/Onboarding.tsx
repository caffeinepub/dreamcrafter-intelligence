import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, CheckCircle, Loader2, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSaveUserProfile } from "../hooks/useQueries";

interface OnboardingPageProps {
  onComplete: () => void;
}

export default function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const saveProfile = useSaveUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      toast.error("Please enter your display name");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        displayName: displayName.trim(),
        email: email.trim(),
        avatarUrl: "",
      });
      toast.success("Profile created! Welcome to Dreamcrafter Intelligence.");
      onComplete();
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "backOut" }}
            className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <Brain size={28} className="text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome aboard!
          </h1>
          <p className="text-muted-foreground text-sm">
            Let's set up your profile before you dive in.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-5 p-3 rounded-lg bg-accent">
            <Sparkles size={14} className="text-primary" />
            <p className="text-xs text-accent-foreground font-medium">
              You're authenticated! Complete your profile to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="onboard-name" className="text-sm font-medium">
                Display Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="onboard-name"
                data-ocid="onboarding.input"
                placeholder="e.g. Alex Johnson"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="onboard-email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="onboard-email"
                data-ocid="onboarding.email.input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Optional — for notifications and updates.
              </p>
            </div>

            <Button
              type="submit"
              data-ocid="onboarding.submit_button"
              className="w-full h-11 text-sm font-semibold mt-2"
              disabled={saveProfile.isPending || !displayName.trim()}
            >
              {saveProfile.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={15} className="animate-spin" />
                  Setting up...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CheckCircle size={15} />
                  Enter Dashboard
                </span>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
