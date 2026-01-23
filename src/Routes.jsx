import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
import NotFound from "pages/NotFound";
import SignUpAndLogin from './pages/SignUpAndLogin';
import GoalsAndReminders from './pages/GoalsAndReminders';
import HabitTracking from './pages/HabitTracking';
import HabitMotivationLibrary from './pages/HabitMotivationLibrary';
import UserProfileAndSettings from './pages/UserProfileAndSettings';
import ProgressReportsAnalytics from './pages/ProgressReportsAnalytics';
import Dashboard from './pages/Dashboard';
import PanicMode from './pages/PanicMode';
import Journal from './pages/Journal';
import Community from './pages/Community';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public routes */}
        <Route path="/sign-up-and-login" element={<SignUpAndLogin />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/goals-and-reminders" element={<ProtectedRoute><GoalsAndReminders /></ProtectedRoute>} />
        <Route path="/habit-tracking" element={<ProtectedRoute><HabitTracking /></ProtectedRoute>} />
        <Route path="/habit-motivation-library" element={<ProtectedRoute><HabitMotivationLibrary /></ProtectedRoute>} />
        <Route path="/user-profile-and-settings" element={<ProtectedRoute><UserProfileAndSettings /></ProtectedRoute>} />
        <Route path="/progress-reports-analytics" element={<ProtectedRoute><ProgressReportsAnalytics /></ProtectedRoute>} />
        <Route path="/panic-mode" element={<ProtectedRoute><PanicMode /></ProtectedRoute>} />
        <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
