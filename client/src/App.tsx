import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Dashboard from "@/pages/dashboard";
import ActiveProjects from "@/pages/projects/active-projects";
import ProjectPlanning from "@/pages/projects/project-planning";
import Tasks from "@/pages/projects/tasks";
import Timeline from "@/pages/projects/timeline";
import Team from "@/pages/resources/team";
import Equipment from "@/pages/resources/equipment";
import Budget from "@/pages/resources/budget";
import Documents from "@/pages/resources/documents";
import ClientList from "@/pages/clients/client-list";
import Communications from "@/pages/clients/communications";
import Settings from "@/pages/settings/settings";
import HelpSupport from "@/pages/settings/help-support";
import Login from "@/pages/auth/login";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/projects/active-projects" component={ActiveProjects} />
      <Route path="/projects/project-planning" component={ProjectPlanning} />
      <Route path="/projects/tasks" component={Tasks} />
      <Route path="/projects/timeline" component={Timeline} />
      <Route path="/resources/team" component={Team} />
      <Route path="/resources/equipment" component={Equipment} />
      <Route path="/resources/budget" component={Budget} />
      <Route path="/resources/documents" component={Documents} />
      <Route path="/clients/client-list" component={ClientList} />
      <Route path="/clients/communications" component={Communications} />
      <Route path="/settings/settings" component={Settings} />
      <Route path="/settings/help-support" component={HelpSupport} />
      <Route path="/auth/login" component={Login} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
