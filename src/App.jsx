import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AdminRoute } from "./routes/AdminRoute";
import { Loader } from "./components/Loader/Loader";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";

// Lazy load pages for performance
const Login = lazy(() => import("./pages/Login/Login"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Users = lazy(() => import("./pages/Users/Users"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Settings = lazy(() => import("./pages/Settings/Settings"));

// App Layout for authenticated routes
function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content-wrapper">
        <Navbar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// We will extract AppLayout structure inside ProtectedRoute, or just use it as a wrapper Route
import { Outlet } from "react-router-dom";

function LayoutWrapper() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content-wrapper">
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<Loader fullScreen />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <UserProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/login"
                  element={
                    <Suspense fallback={<Loader fullScreen />}>
                      <Login />
                    </Suspense>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <Suspense fallback={<Loader fullScreen />}>
                      <Signup />
                    </Suspense>
                  }
                />

                {/* Protected Routes nested in Layout */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<LayoutWrapper />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />

                    {/* Admin Only Route */}
                    <Route element={<AdminRoute />}>
                      <Route path="/users" element={<Users />} />
                    </Route>

                    {/* Default Redirect */}
                    <Route
                      path="*"
                      element={<Navigate to="/dashboard" replace />}
                    />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
