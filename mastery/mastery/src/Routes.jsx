import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import LoginScreen from "pages/login-screen";
import RegisterScreen from "pages/register-screen";
import Dashboard from "pages/dashboard";
import TaskManagement from "pages/task-management";
import FocusHub from "pages/focus-hub";
import WillpowerChallenges from "pages/willpower-challenges";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login-screen" element={<LoginScreen />} />
          <Route path="/register-screen" element={<RegisterScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task-management" element={<TaskManagement />} />
          <Route path="/focus-hub" element={<FocusHub />} />
          <Route path="/willpower-challenges" element={<WillpowerChallenges />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;