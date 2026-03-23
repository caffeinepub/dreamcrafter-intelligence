import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Brain, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function LoginPage() {
  const { login, isLoggingIn } = useInternetIdentity();

  const features = [
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      desc: "Monitor KPIs and trends as they happen",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      desc: "Let intelligence surface what matters most",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      desc: "Secure, auditable, and access-controlled",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex w-1/2 bg-sidebar flex-col justify-between p-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Brain size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm tracking-wide">
              DREAMCRAFTER
            </p>
            <p className="text-white/40 text-[10px] tracking-widest">
              INTELLIGENCE
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-3">
              Turn raw data into{" "}
              <span className="text-primary">actionable intelligence.</span>
            </h1>
            <p className="text-white/60 text-base">
              Track companies, run analyses, and generate reports — all in one
              unified platform.
            </p>
          </div>
          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <f.icon size={15} className="text-primary" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{f.title}</p>
                  <p className="text-white/50 text-xs">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} Dreamcrafter Intelligence. All rights
          reserved.
        </p>
      </div>

      {/* Right auth panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain size={18} className="text-white" />
            </div>
            <span className="text-foreground font-bold">
              Dreamcrafter Intelligence
            </span>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList
              className="grid w-full grid-cols-2 mb-6"
              data-ocid="login.tab"
            >
              <TabsTrigger value="signin" data-ocid="login.signin.tab">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" data-ocid="login.signup.tab">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-0">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  Welcome back
                </h2>
                <p className="text-muted-foreground text-sm">
                  Sign in to access your intelligence dashboard.
                </p>
              </div>
              <Button
                data-ocid="login.primary_button"
                className="w-full h-11 text-sm font-semibold"
                onClick={login}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </span>
                ) : (
                  "Sign in with Internet Identity"
                )}
              </Button>
              <p className="mt-4 text-xs text-muted-foreground text-center">
                No password needed — secured by the Internet Computer.
              </p>
            </TabsContent>

            <TabsContent value="signup" className="space-y-0">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  Create account
                </h2>
                <p className="text-muted-foreground text-sm">
                  Get started with Dreamcrafter Intelligence for free.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-accent border border-border mb-5">
                <div className="flex items-start gap-2.5">
                  <Shield
                    size={15}
                    className="text-primary mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-0.5">
                      Decentralized & Secure
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Internet Identity creates your account without email or
                      password. After signing in you'll complete your profile.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                data-ocid="signup.primary_button"
                className="w-full h-11 text-sm font-semibold"
                onClick={login}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </span>
                ) : (
                  "Create Account with Internet Identity"
                )}
              </Button>
              <p className="mt-4 text-xs text-muted-foreground text-center">
                By signing up, you agree to our{" "}
                <span className="underline cursor-pointer hover:text-foreground">
                  Terms
                </span>{" "}
                and{" "}
                <span className="underline cursor-pointer hover:text-foreground">
                  Privacy Policy
                </span>
                .
              </p>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
