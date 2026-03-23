import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Brain,
  Building2,
  ChevronDown,
  Database,
  FolderOpen,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Plug,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useUserProfile } from "../hooks/useQueries";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Analysis Path", to: "/analysis-path" },
  { label: "API Keys", to: "/api-keys" },
  { label: "Companies", to: "/companies" },
  { label: "Reports", to: "/" },
];

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Companies", icon: Building2, to: "/companies" },
  { label: "Projects", icon: FolderOpen, to: "/" },
  { label: "Datasets", icon: Database, to: "/" },
  { label: "Integrations", icon: Plug, to: "/" },
  { label: "Settings", icon: Settings, to: "/" },
  { label: "Help", icon: HelpCircle, to: "/" },
];

export default function Layout() {
  const { clear, identity } = useInternetIdentity();
  const { data: profile } = useUserProfile();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const displayName =
    profile?.displayName ||
    (identity
      ? `${identity.getPrincipal().toString().slice(0, 8)}...`
      : "User");
  const initials = displayName.slice(0, 2).toUpperCase();
  const avatarUrl = profile?.avatarUrl?.getDirectURL?.() ?? "";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="w-60 flex-shrink-0 bg-sidebar flex flex-col fixed left-0 top-0 h-full z-30">
        <div className="h-16 flex items-center px-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <Brain size={18} className="text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-white text-xs font-bold tracking-wide">
                DREAMCRAFTER
              </p>
              <p className="text-white/40 text-[10px] font-medium tracking-wider">
                INTELLIGENCE
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3" aria-label="Sidebar navigation">
          <ul className="space-y-0.5">
            {sidebarItems.map((item) => {
              const isDash = item.label === "Dashboard";
              const isCompanies = item.label === "Companies";
              const isActive = isDash
                ? currentPath === "/"
                : isCompanies
                  ? currentPath === "/companies"
                  : currentPath === item.to && item.to !== "/";
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    data-ocid={`sidebar.${item.label.toLowerCase().replace(" ", "_")}.link`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-white"
                        : "text-sidebar-foreground/60 hover:text-white hover:bg-sidebar-accent/50",
                    )}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 flex-shrink-0">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
              <AvatarFallback className="bg-primary text-white text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">
                {displayName}
              </p>
              <p className="text-white/40 text-[10px]">Active</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        <header className="h-16 bg-card border-b border-border fixed top-0 left-60 right-0 z-20 flex items-center px-6 gap-4">
          <nav
            className="flex items-center gap-0.5 flex-1"
            aria-label="Top navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                link.label === "Home"
                  ? currentPath === "/"
                  : link.label === "Analysis Path"
                    ? currentPath === "/analysis-path"
                    : link.label === "API Keys"
                      ? currentPath === "/api-keys"
                      : link.label === "Companies"
                        ? currentPath === "/companies"
                        : false;
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}.link`}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              data-ocid="nav.search_input"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Search"
            >
              <Search size={16} />
            </button>

            <button
              type="button"
              data-ocid="nav.notification.button"
              className="relative w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Notifications"
            >
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-destructive text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger
                data-ocid="nav.profile.button"
                className="flex items-center gap-2 pl-2 pr-2 py-1.5 rounded-lg hover:bg-muted transition-colors ml-1"
              >
                <Avatar className="w-7 h-7">
                  {avatarUrl && (
                    <AvatarImage src={avatarUrl} alt={displayName} />
                  )}
                  <AvatarFallback className="bg-primary text-white text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground hidden sm:block max-w-28 truncate">
                  {displayName}
                </span>
                <ChevronDown size={13} className="text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem asChild>
                  <Link to="/profile" data-ocid="nav.profile.link">
                    <User size={13} className="mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  data-ocid="nav.logout.button"
                  className="text-destructive focus:text-destructive"
                  onClick={clear}
                >
                  <LogOut size={13} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 mt-16 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
