import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

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
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import VerifyEmail from "./pages/auth/verify-email";
import Unauthorized from "./pages/auth/unauthorized";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Manager & Employee Routes */}
        <Route element={<ProtectedRoute allowedRoles={['Manager', 'Employee']} />}>
          <Route path="/projects/active-projects" element={<ActiveProjects />} />
          <Route path="/projects/tasks" element={<Tasks />} />
          <Route path="/projects/timeline" element={<Timeline />} />
          <Route path="/resources/team" element={<Team />} />
          <Route path="/resources/equipment" element={<Equipment />} />
          <Route path="/resources/documents" element={<Documents />} />
          <Route path="/resources/budget" element={<Budget />} />
        </Route>
        
        {/* Manager Only Routes */}
        <Route element={<ProtectedRoute allowedRoles={['Manager']} />}>
          <Route path="/projects/project-planning" element={<ProjectPlanning />} />
          <Route path="/clients/client-list" element={<ClientList />} />
          <Route path="/clients/communications" element={<Communications />} />
        </Route>
        
        {/* Client Routes - they have limited access */}
        <Route element={<ProtectedRoute allowedRoles={['Client']} />}>
          {/* Specific client views would go here */}
        </Route>
        
        {/* Supplier Routes - they have limited access */}
        <Route element={<ProtectedRoute allowedRoles={['Supplier']} />}>
          {/* Specific supplier views would go here */}
        </Route>
        
        {/* Settings accessible by all authenticated users */}
        <Route path="/settings/settings" element={<Settings />} />
        <Route path="/settings/help-support" element={<HelpSupport />} />
      </Route>
      
      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <AppRoutes />
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
