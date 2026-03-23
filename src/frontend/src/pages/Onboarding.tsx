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
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-[oklch(0.13_0.04_270)]">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.13 0.04 270) 0%, oklch(0.16 0.06 290) 40%, oklch(0.14 0.05 260) 100%)",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[420px] h-[420px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.45 0.22 275 / 0.35) 0%, transparent 70%)",
          animation: "orbFloat1 12s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.50 0.25 300 / 0.30) 0%, transparent 70%)",
          animation: "orbFloat2 15s ease-in-out infinite",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute top-[40%] right-[15%] w-[280px] h-[280px] rounded-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.20 260 / 0.25) 0%, transparent 70%)",
          animation: "orbFloat3 10s ease-in-out infinite",
          filter: "blur(35px)",
        }}
      />

      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, 30px) scale(1.05); }
          66% { transform: translate(-20px, 50px) scale(0.97); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-50px, -40px) scale(1.07); }
          70% { transform: translate(30px, -20px) scale(0.95); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 40px) scale(1.1); }
        }
      `}</style>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "backOut" }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.25 280), oklch(0.50 0.28 305))",
            }}
          >
            <Brain size={28} className="text-white" />
          </motion.div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "oklch(0.97 0.01 270)" }}
          >
            Welcome aboard!
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.70 0.05 270)" }}>
            Let's set up your profile before you dive in.
          </p>
        </div>

        {/* Glassmorphism card */}
        <div
          className="rounded-2xl p-6 shadow-2xl"
          style={{
            background: "oklch(0.20 0.04 270 / 0.55)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid oklch(0.50 0.12 270 / 0.30)",
          }}
        >
          <div
            className="flex items-center gap-2 mb-5 p-3 rounded-lg"
            style={{ background: "oklch(0.55 0.22 280 / 0.18)" }}
          >
            <Sparkles size={14} style={{ color: "oklch(0.75 0.18 280)" }} />
            <p
              className="text-xs font-medium"
              style={{ color: "oklch(0.85 0.10 270)" }}
            >
              You're authenticated! Complete your profile to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="onboard-name"
                className="text-sm font-medium"
                style={{ color: "oklch(0.88 0.05 270)" }}
              >
                Display Name{" "}
                <span style={{ color: "oklch(0.65 0.25 25)" }}>*</span>
              </Label>
              <Input
                id="onboard-name"
                data-ocid="onboarding.input"
                placeholder="e.g. Alex Johnson"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoFocus
                required
                className="text-white placeholder:text-white/40"
                style={{
                  background: "oklch(0.15 0.04 270 / 0.60)",
                  border: "1px solid oklch(0.50 0.12 270 / 0.40)",
                }}
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="onboard-email"
                className="text-sm font-medium"
                style={{ color: "oklch(0.88 0.05 270)" }}
              >
                Email Address
              </Label>
              <Input
                id="onboard-email"
                data-ocid="onboarding.email.input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-white placeholder:text-white/40"
                style={{
                  background: "oklch(0.15 0.04 270 / 0.60)",
                  border: "1px solid oklch(0.50 0.12 270 / 0.40)",
                }}
              />
              <p className="text-xs" style={{ color: "oklch(0.60 0.05 270)" }}>
                Optional — for notifications and updates.
              </p>
            </div>

            <Button
              type="submit"
              data-ocid="onboarding.submit_button"
              className="w-full h-11 text-sm font-semibold mt-2 text-white border-0"
              disabled={saveProfile.isPending || !displayName.trim()}
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.25 280), oklch(0.50 0.28 305))",
              }}
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
