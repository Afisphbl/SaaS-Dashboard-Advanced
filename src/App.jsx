import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="app-layout">
        <ToastProvider>
          <BrowserRouter>
            <Sidebar />
            <div className="main-content-wrapper">
              <Navbar />
              <div className="main-content">
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="/profile"
                    element={<div>Profile (Coming Soon)</div>}
                  />
                  <Route
                    path="/settings"
                    element={<div>Settings (Coming Soon)</div>}
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </ToastProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
