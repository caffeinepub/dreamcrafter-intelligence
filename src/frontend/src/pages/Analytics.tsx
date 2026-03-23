import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  ArrowUpRight,
  BarChart2,
  ChevronDown,
  GitBranch,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SIGNAL_COLOR = "#4f7df3";
const FEATURE_COLOR = "#a855f7";
const UPDATE_COLOR = "#22c55e";

const weeklyData = [
  { day: "Mon", signals: 82, features: 34, updates: 12 },
  { day: "Tue", signals: 110, features: 45, updates: 8 },
  { day: "Wed", signals: 95, features: 52, updates: 15 },
  { day: "Thu", signals: 138, features: 61, updates: 11 },
  { day: "Fri", signals: 124, features: 48, updates: 18 },
  { day: "Sat", signals: 67, features: 29, updates: 6 },
  { day: "Sun", signals: 55, features: 22, updates: 4 },
];

const eightWeekData = [
  { week: "W1", signals: 420, features: 180, updates: 45 },
  { week: "W2", signals: 510, features: 210, updates: 58 },
  { week: "W3", signals: 475, features: 195, updates: 52 },
  { week: "W4", signals: 640, features: 255, updates: 71 },
  { week: "W5", signals: 590, features: 240, updates: 64 },
  { week: "W6", signals: 720, features: 290, updates: 82 },
  { week: "W7", signals: 680, features: 275, updates: 76 },
  { week: "W8", signals: 810, features: 320, updates: 91 },
];

const monthlyData = [
  { month: "Oct", signals: 1800, features: 720, updates: 185 },
  { month: "Nov", signals: 2100, features: 840, updates: 210 },
  { month: "Dec", signals: 1950, features: 780, updates: 195 },
  { month: "Jan", signals: 2450, features: 960, updates: 240 },
  { month: "Feb", signals: 2800, features: 1100, updates: 275 },
  { month: "Mar", signals: 3200, features: 1280, updates: 320 },
];

const statCards = [
  {
    label: "Total Signals",
    value: "1,284",
    change: "+12.4%",
    icon: Zap,
    color: "text-blue-400",
    bg: "bg-blue-500/15",
  },
  {
    label: "Features Tracked",
    value: "342",
    change: "+8.1%",
    icon: GitBranch,
    color: "text-purple-400",
    bg: "bg-purple-500/15",
  },
  {
    label: "Dev Updates",
    value: "89",
    change: "+5.7%",
    icon: Activity,
    color: "text-green-400",
    bg: "bg-green-500/15",
  },
  {
    label: "Active Users",
    value: "47",
    change: "+22.3%",
    icon: Users,
    color: "text-amber-400",
    bg: "bg-amber-500/15",
  },
];

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
  fontSize: "12px",
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen" data-ocid="analytics.page">
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
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(139,92,246,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 px-6 py-10 max-w-full">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                <BarChart2 size={20} className="text-violet-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Analytics</h1>
                <p className="text-xs text-indigo-200/60">
                  Platform activity over time
                </p>
              </div>
            </div>
            <button
              type="button"
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
            >
              <span>Mar 2026</span>
              <ChevronDown size={14} className="text-indigo-200/60" />
            </button>
          </motion.div>

          {/* Inline stat cards in hero */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${card.bg}`}>
                      <Icon size={16} className={card.color} />
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowUpRight size={12} className="text-green-400" />
                      <span className="text-xs font-semibold text-green-400">
                        {card.change}
                      </span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white">{card.value}</p>
                  <p className="text-xs text-indigo-200/60 mt-0.5">
                    {card.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="p-6 space-y-6">
        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0 }}
        >
          <Card className="shadow-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Weekly Activity
              </CardTitle>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={weeklyData} barCategoryGap="30%" barGap={3}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    tick={{
                      fontSize: 11,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fontSize: 11,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    cursor={{ fill: "hsl(var(--muted))" }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Bar
                    dataKey="signals"
                    name="Signals"
                    fill={SIGNAL_COLOR}
                    radius={[3, 3, 0, 0]}
                  />
                  <Bar
                    dataKey="features"
                    name="Features"
                    fill={FEATURE_COLOR}
                    radius={[3, 3, 0, 0]}
                  />
                  <Bar
                    dataKey="updates"
                    name="Updates"
                    fill={UPDATE_COLOR}
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 8-Week Trend */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <Card className="shadow-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                  8-Week Trend
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Rolling 8-week view
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={eightWeekData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="week"
                      tick={{
                        fontSize: 11,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{
                        fontSize: 11,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend
                      wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
                      iconType="circle"
                      iconSize={8}
                    />
                    <Line
                      type="monotone"
                      dataKey="signals"
                      name="Signals"
                      stroke={SIGNAL_COLOR}
                      strokeWidth={2}
                      dot={{ r: 3, fill: SIGNAL_COLOR }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="features"
                      name="Features"
                      stroke={FEATURE_COLOR}
                      strokeWidth={2}
                      dot={{ r: 3, fill: FEATURE_COLOR }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="updates"
                      name="Updates"
                      stroke={UPDATE_COLOR}
                      strokeWidth={2}
                      dot={{ r: 3, fill: UPDATE_COLOR }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Monthly Trend */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <Card className="shadow-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                  Monthly Trend
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Oct 2025 – Mar 2026
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient
                        id="signalGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={SIGNAL_COLOR}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={SIGNAL_COLOR}
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                      <linearGradient
                        id="featureGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={FEATURE_COLOR}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={FEATURE_COLOR}
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                      <linearGradient
                        id="updateGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={UPDATE_COLOR}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={UPDATE_COLOR}
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tick={{
                        fontSize: 11,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{
                        fontSize: 11,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend
                      wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
                      iconType="circle"
                      iconSize={8}
                    />
                    <Area
                      type="monotone"
                      dataKey="signals"
                      name="Signals"
                      stroke={SIGNAL_COLOR}
                      strokeWidth={2}
                      fill="url(#signalGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="features"
                      name="Features"
                      stroke={FEATURE_COLOR}
                      strokeWidth={2}
                      fill="url(#featureGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="updates"
                      name="Updates"
                      stroke={UPDATE_COLOR}
                      strokeWidth={2}
                      fill="url(#updateGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
