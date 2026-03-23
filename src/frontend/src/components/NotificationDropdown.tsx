import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "@tanstack/react-router";
import { Bell, Briefcase, ChevronRight } from "lucide-react";
import { useState } from "react";

interface JobAlert {
  role: string;
  company: string;
  location: string;
  postedAgo: string;
  color: string;
}

const SAMPLE_ALERTS: JobAlert[] = [
  {
    role: "AI/ML Engineer",
    company: "Anthropic",
    location: "San Francisco, CA",
    postedAgo: "3h ago",
    color: "#ec4899",
  },
  {
    role: "Software Engineer",
    company: "OpenAI",
    location: "San Francisco, CA",
    postedAgo: "8h ago",
    color: "#4f7df3",
  },
  {
    role: "Cloud Engineer",
    company: "Microsoft",
    location: "Redmond, WA",
    postedAgo: "5h ago",
    color: "#06b6d4",
  },
  {
    role: "Data Scientist",
    company: "Meta",
    location: "Menlo Park, CA",
    postedAgo: "6h ago",
    color: "#a855f7",
  },
  {
    role: "DevOps Engineer",
    company: "Stripe",
    location: "Remote",
    postedAgo: "9h ago",
    color: "#22c55e",
  },
  {
    role: "Cybersecurity Engineer",
    company: "CrowdStrike",
    location: "Austin, TX",
    postedAgo: "14h ago",
    color: "#ef4444",
  },
  {
    role: "Product Manager",
    company: "Figma",
    location: "Remote",
    postedAgo: "1d ago",
    color: "#f59e0b",
  },
];

interface NotificationDropdownProps {
  count?: number;
}

export default function NotificationDropdown({
  count = 7,
}: NotificationDropdownProps) {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(false);

  const displayCount = read ? 0 : count;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-ocid="nav.notification.button"
          className="relative w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Job alerts"
        >
          <Bell size={16} />
          {displayCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-destructive text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {displayCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 p-0 shadow-lg"
        data-ocid="notifications.popover"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Briefcase size={14} className="text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Job Alerts
            </span>
            {!read && (
              <span className="text-[10px] font-bold bg-primary text-white px-1.5 py-0.5 rounded-full">
                {count} new
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground"
            onClick={() => setRead(true)}
            data-ocid="notifications.mark_read.button"
          >
            Mark all read
          </Button>
        </div>

        <ScrollArea className="max-h-72">
          <div className="py-1">
            {SAMPLE_ALERTS.map((alert, i) => (
              <div
                key={`${alert.company}-${alert.role}`}
                className={`flex items-start gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors ${
                  !read && i < count ? "bg-primary/5" : ""
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: alert.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">
                    New {alert.role} at {alert.company}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {alert.location} · {alert.postedAgo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t border-border px-4 py-2.5">
          <Link
            to="/open-roles"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between text-xs font-medium text-primary hover:underline"
            data-ocid="notifications.view_all.link"
          >
            View all open roles
            <ChevronRight size={13} />
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
