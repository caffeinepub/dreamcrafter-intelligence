import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart2,
  FlaskConical,
  GitBranch,
  Layers,
} from "lucide-react";
import { motion } from "motion/react";

const paths = [
  {
    title: "Market Intelligence Analysis",
    description:
      "Deep-dive competitive analysis using multi-source data ingestion and NLP scoring models.",
    icon: BarChart2,
    badge: "Popular",
    badgeClass: "bg-primary/10 text-primary",
    steps: 5,
    duration: "~2 hours",
  },
  {
    title: "Supply Chain Risk Path",
    description:
      "Trace supplier dependencies, flag single points of failure, and model risk scenarios.",
    icon: GitBranch,
    badge: "New",
    badgeClass: "bg-success/10 text-success",
    steps: 7,
    duration: "~4 hours",
  },
  {
    title: "ESG Compliance Audit",
    description:
      "Evaluate ESG commitments across all tracked entities against regulatory frameworks.",
    icon: Layers,
    badge: "Beta",
    badgeClass: "bg-chart-4/20 text-chart-4",
    steps: 4,
    duration: "~1.5 hours",
  },
];

export default function AnalysisPathPage() {
  return (
    <div className="p-6 max-w-4xl" data-ocid="analysis_path.page">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2.5 mb-1">
          <FlaskConical size={20} className="text-primary" />
          <h1 className="text-xl font-bold text-foreground">Analysis Path</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Choose a guided analysis workflow to extract structured intelligence
          from your tracked companies.
        </p>
      </motion.div>

      <div className="space-y-4">
        {paths.map((path, i) => (
          <motion.div
            key={path.title}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <Card
              className="shadow-card border-border hover:border-primary/30 transition-colors"
              data-ocid={`analysis_path.item.${i + 1}`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                      <path.icon size={18} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-foreground">
                          {path.title}
                        </h3>
                        <Badge
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border-0 ${path.badgeClass}`}
                        >
                          {path.badge}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {path.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{path.steps} steps</span>
                        <span>·</span>
                        <span>{path.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0"
                    data-ocid={`analysis_path.start.button.${i + 1}`}
                  >
                    Start <ArrowRight size={13} className="ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-8 p-5 rounded-xl bg-card border border-dashed border-primary/30"
      >
        <h3 className="text-sm font-semibold text-foreground mb-1">
          Build a Custom Analysis Path
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Combine data sources, scoring models, and output formats into your own
          repeatable workflow.
        </p>
        <Button size="sm" data-ocid="analysis_path.custom.button">
          Create Custom Path
        </Button>
      </motion.div>
    </div>
  );
}
