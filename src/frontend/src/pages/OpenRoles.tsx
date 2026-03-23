import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, ExternalLink, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Role =
  | "Software Engineer"
  | "Data Scientist"
  | "AI/ML Engineer"
  | "Product Manager"
  | "DevOps Engineer"
  | "Cybersecurity Engineer"
  | "Cloud Engineer";

interface Job {
  id: number;
  company: string;
  role: Role;
  location: string;
  source: "LinkedIn" | "Indeed" | "Company Site";
  postedAgo: string;
  applyLink: string;
}

const ROLE_COLORS: Record<Role, string> = {
  "Software Engineer": "#4f7df3",
  "Data Scientist": "#a855f7",
  "AI/ML Engineer": "#ec4899",
  "Product Manager": "#f59e0b",
  "DevOps Engineer": "#22c55e",
  "Cybersecurity Engineer": "#ef4444",
  "Cloud Engineer": "#06b6d4",
};

const ROLES: Role[] = [
  "Software Engineer",
  "Data Scientist",
  "AI/ML Engineer",
  "Product Manager",
  "DevOps Engineer",
  "Cybersecurity Engineer",
  "Cloud Engineer",
];

const JOBS: Job[] = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    location: "Mountain View, CA",
    source: "LinkedIn",
    postedAgo: "2h ago",
    applyLink: "#",
  },
  {
    id: 2,
    company: "Anthropic",
    role: "AI/ML Engineer",
    location: "San Francisco, CA",
    source: "Company Site",
    postedAgo: "3h ago",
    applyLink: "#",
  },
  {
    id: 3,
    company: "Microsoft",
    role: "Cloud Engineer",
    location: "Redmond, WA",
    source: "LinkedIn",
    postedAgo: "5h ago",
    applyLink: "#",
  },
  {
    id: 4,
    company: "Meta",
    role: "Data Scientist",
    location: "Menlo Park, CA",
    source: "Indeed",
    postedAgo: "6h ago",
    applyLink: "#",
  },
  {
    id: 5,
    company: "OpenAI",
    role: "Software Engineer",
    location: "San Francisco, CA",
    source: "Company Site",
    postedAgo: "8h ago",
    applyLink: "#",
  },
  {
    id: 6,
    company: "Stripe",
    role: "DevOps Engineer",
    location: "Remote",
    source: "LinkedIn",
    postedAgo: "9h ago",
    applyLink: "#",
  },
  {
    id: 7,
    company: "Amazon",
    role: "Product Manager",
    location: "Seattle, WA",
    source: "Indeed",
    postedAgo: "11h ago",
    applyLink: "#",
  },
  {
    id: 8,
    company: "Databricks",
    role: "AI/ML Engineer",
    location: "San Francisco, CA",
    source: "Company Site",
    postedAgo: "12h ago",
    applyLink: "#",
  },
  {
    id: 9,
    company: "CrowdStrike",
    role: "Cybersecurity Engineer",
    location: "Austin, TX",
    source: "LinkedIn",
    postedAgo: "14h ago",
    applyLink: "#",
  },
  {
    id: 10,
    company: "Netflix",
    role: "Software Engineer",
    location: "Los Gatos, CA",
    source: "Company Site",
    postedAgo: "16h ago",
    applyLink: "#",
  },
  {
    id: 11,
    company: "Apple",
    role: "Cloud Engineer",
    location: "Cupertino, CA",
    source: "LinkedIn",
    postedAgo: "18h ago",
    applyLink: "#",
  },
  {
    id: 12,
    company: "Palantir",
    role: "Data Scientist",
    location: "New York, NY",
    source: "Indeed",
    postedAgo: "20h ago",
    applyLink: "#",
  },
  {
    id: 13,
    company: "Palo Alto Networks",
    role: "Cybersecurity Engineer",
    location: "Santa Clara, CA",
    source: "Company Site",
    postedAgo: "22h ago",
    applyLink: "#",
  },
  {
    id: 14,
    company: "Figma",
    role: "Product Manager",
    location: "Remote",
    source: "LinkedIn",
    postedAgo: "1d ago",
    applyLink: "#",
  },
  {
    id: 15,
    company: "Cloudflare",
    role: "DevOps Engineer",
    location: "San Francisco, CA",
    source: "Indeed",
    postedAgo: "1d ago",
    applyLink: "#",
  },
  {
    id: 16,
    company: "Nvidia",
    role: "AI/ML Engineer",
    location: "Santa Clara, CA",
    source: "LinkedIn",
    postedAgo: "1d ago",
    applyLink: "#",
  },
  {
    id: 17,
    company: "Snowflake",
    role: "Cloud Engineer",
    location: "Bozeman, MT",
    source: "Company Site",
    postedAgo: "1d ago",
    applyLink: "#",
  },
  {
    id: 18,
    company: "GitHub",
    role: "Software Engineer",
    location: "Remote",
    source: "LinkedIn",
    postedAgo: "1d ago",
    applyLink: "#",
  },
];

function getRoleCount(role: Role) {
  return JOBS.filter((j) => j.role === role).length;
}

const pieData = ROLES.map((role) => ({
  name: role,
  value: getRoleCount(role),
  color: ROLE_COLORS[role],
}));

const SOURCE_BADGE: Record<string, string> = {
  LinkedIn: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Indeed: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Company Site": "bg-muted text-muted-foreground border-border",
};

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
  fontSize: "12px",
};

function getPostedAgoBadge(postedAgo: string) {
  const hoursMatch = postedAgo.match(/^(\d+)h/);
  if (hoursMatch) {
    const hours = Number.parseInt(hoursMatch[1]);
    if (hours <= 4)
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
    if (hours <= 12)
      return "bg-amber-500/15 text-amber-400 border-amber-500/20";
  }
  return "bg-muted text-muted-foreground border-border";
}

function CompanyAvatar({ company }: { company: string }) {
  const colors = [
    "from-violet-500 to-indigo-600",
    "from-blue-500 to-cyan-600",
    "from-emerald-500 to-teal-600",
    "from-pink-500 to-rose-600",
    "from-amber-500 to-orange-600",
  ];
  let hash = 0;
  for (let i = 0; i < company.length; i++) {
    hash = (hash * 31 + company.charCodeAt(i)) & 0xffffffff;
  }
  const grad = colors[Math.abs(hash) % colors.length];
  return (
    <div
      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow`}
    >
      {company.charAt(0).toUpperCase()}
    </div>
  );
}

export default function OpenRolesPage() {
  const [activeRole, setActiveRole] = useState<Role | "All">("All");

  const filtered =
    activeRole === "All" ? JOBS : JOBS.filter((j) => j.role === activeRole);

  return (
    <div className="min-h-screen" data-ocid="open-roles.page">
      {/* Hero Banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #1a0533 30%, #24243e 60%, #0d1b3e 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Briefcase size={20} className="text-indigo-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Open Roles</h1>
                <p className="text-xs text-indigo-200/60">
                  Real-time tech job listings
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                <span className="text-xs font-semibold text-white">
                  48 Active Listings
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                <span className="text-xs font-semibold text-white">
                  7 Role Types
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-semibold text-white">
                  Live · Last 24h
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2" data-ocid="open-roles.filter.tab">
          <button
            type="button"
            onClick={() => setActiveRole("All")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              activeRole === "All"
                ? "bg-primary text-white border-primary"
                : "bg-muted text-muted-foreground border-border hover:border-primary/40"
            }`}
          >
            All ({JOBS.length})
          </button>
          {ROLES.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setActiveRole(role)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                activeRole === role
                  ? "text-white border-transparent"
                  : "bg-muted text-muted-foreground border-border hover:border-primary/40"
              }`}
              style={
                activeRole === role
                  ? {
                      backgroundColor: ROLE_COLORS[role],
                      borderColor: ROLE_COLORS[role],
                    }
                  : {}
              }
            >
              {role} ({getRoleCount(role)})
            </button>
          ))}
        </div>

        {/* Main layout: listings + sidebar chart */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Job Listings */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-3">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {JOBS.length}
              </span>{" "}
              jobs
            </p>
            <div
              className="grid grid-cols-1 xl:grid-cols-2 gap-4"
              data-ocid="open-roles.list"
            >
              {filtered.map((job, idx) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: idx * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  data-ocid={`open-roles.item.${idx + 1}`}
                >
                  <Card className="shadow-card border-border hover:border-primary/30 transition-colors h-full">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <CompanyAvatar company={job.company} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <p className="text-sm font-bold text-foreground">
                              {job.company}
                            </p>
                            <Badge
                              className={`text-[10px] font-medium px-2 py-0.5 rounded border flex-shrink-0 ${getPostedAgoBadge(job.postedAgo)}`}
                            >
                              {job.postedAgo}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span
                              className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-white"
                              style={{ backgroundColor: ROLE_COLORS[job.role] }}
                            >
                              {job.role}
                            </span>
                            <span
                              className={`text-[10px] font-medium px-2 py-0.5 rounded border ${SOURCE_BADGE[job.source]}`}
                            >
                              {job.source}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin size={11} />
                              <span>{job.location}</span>
                            </div>
                            <Button
                              asChild
                              size="sm"
                              className="h-7 text-xs"
                              data-ocid={`open-roles.apply_button.${idx + 1}`}
                            >
                              <a
                                href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(`${job.role} ${job.company}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Apply
                                <ExternalLink size={10} className="ml-1" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar: Role Distribution Chart */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <Card className="shadow-card border-border sticky top-20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">
                  Role Distribution
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Jobs per tracked role
                </p>
              </CardHeader>
              <CardContent className="pb-4">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={entry.color}
                          stroke="transparent"
                        />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 mt-2">
                  {pieData.map((entry) => (
                    <div
                      key={entry.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-[11px] text-muted-foreground truncate max-w-[140px]">
                          {entry.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-foreground">
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
