import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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

const barData = ROLES.map((role) => ({
  role: role.replace(" Engineer", " Eng.").replace("Product Manager", "PM"),
  fullRole: role,
  count: getRoleCount(role),
  fill: ROLE_COLORS[role],
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

export default function OpenRolesPage() {
  const [activeRole, setActiveRole] = useState<Role | "All">("All");

  const filtered =
    activeRole === "All" ? JOBS : JOBS.filter((j) => j.role === activeRole);

  return (
    <div className="p-6 space-y-6" data-ocid="open-roles.page">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Briefcase size={22} className="text-primary" />
          Open Roles
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Last 24–48 hours · 7 tracked roles
        </p>
      </div>

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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <Card className="shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              Role Distribution
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Jobs per tracked role
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
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
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: "11px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hiring Trends Bar Chart */}
        <Card className="shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              Hiring Trends
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Jobs posted per role
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} layout="horizontal">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="role"
                  tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(
                    val: number,
                    _name: string,
                    entry: { payload?: { fullRole?: string } },
                  ) => [val, entry?.payload?.fullRole ?? ""]}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {barData.map((entry) => (
                    <Cell key={entry.role} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Job Listings */}
      <div>
        <p className="text-xs text-muted-foreground mb-3">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filtered.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">{JOBS.length}</span>{" "}
          jobs
        </p>
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          data-ocid="open-roles.list"
        >
          {filtered.map((job, idx) => (
            <Card
              key={job.id}
              className="shadow-card border-border hover:border-primary/30 transition-colors"
              data-ocid={`open-roles.item.${idx + 1}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
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
                    <p className="text-sm font-bold text-foreground">
                      {job.company}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <MapPin size={11} />
                      <span>{job.location}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground/60 mt-1">
                      {job.postedAgo}
                    </p>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="shrink-0 h-8 text-xs"
                    data-ocid={`open-roles.apply_button.${idx + 1}`}
                  >
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply Now
                      <ExternalLink size={11} className="ml-1" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
