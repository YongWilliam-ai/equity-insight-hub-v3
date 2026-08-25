/** The Market Ledger application shell — uses a light editorial theme for the research reading experience. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import FullReportAug21 from "./pages/FullReportAug21";
import V3PreviewAug21 from "./pages/V3PreviewAug21";
import WeekendAug24Full from "./pages/WeekendAug24Full";
import DailyAug25Full from "./pages/DailyAug25Full";
import DailyHubAug25 from "./pages/DailyHubAug25";

function RootRoute() {
  const date = new URLSearchParams(window.location.search).get("date");
  if (date === "2026-08-21") return <FullReportAug21 />;
  if (date === "2026-08-24") return <WeekendAug24Full />;
  return <DailyHubAug25 />;
}

function Routes() {
  return (
    <Switch>
      <Route path="/" component={RootRoute} />
      <Route path="/archive/2026-08-21" component={V3PreviewAug21} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Routes />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
