import { Toaster } from "@/components/ui/sonner";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useUserProfile } from "./hooks/useQueries";
import AnalysisPathPage from "./pages/AnalysisPath";
import AnalyticsPage from "./pages/Analytics";
import ApiKeysPage from "./pages/ApiKeys";
import CompaniesPage from "./pages/Companies";
import CompanyDetailPage from "./pages/CompanyDetail";
import DashboardPage from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import MarketScoutPage from "./pages/MarketScout";
import OnboardingPage from "./pages/Onboarding";
import OpenRolesPage from "./pages/OpenRoles";
import ProfilePage from "./pages/Profile";

const rootRoute = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useUserProfile();

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!identity) {
    return <LoginPage />;
  }

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">Checking profile...</p>
        </div>
      </div>
    );
  }

  if (profile === null || profile === undefined) {
    return <OnboardingPage onComplete={() => {}} />;
  }

  return <Layout />;
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});
const analysisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analysis-path",
  component: AnalysisPathPage,
});
const apiKeysRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/api-keys",
  component: ApiKeysPage,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});
const companiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/companies",
  component: CompaniesPage,
});
const companyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/company/$companyName",
  component: CompanyDetailPage,
});
const marketScoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/market-scout",
  component: MarketScoutPage,
});
const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: AnalyticsPage,
});
const openRolesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/open-roles",
  component: OpenRolesPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  analysisRoute,
  apiKeysRoute,
  profileRoute,
  companiesRoute,
  companyDetailRoute,
  marketScoutRoute,
  analyticsRoute,
  openRolesRoute,
]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
