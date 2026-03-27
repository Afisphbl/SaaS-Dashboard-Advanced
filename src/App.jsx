import { BrowserRouter, Routes, Route } from "react-router";
import { ToastProvider } from "./context/ToastContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<div>Profile (Coming Soon)</div>} />
          <Route path="/settings" element={<div>Settings (Coming Soon)</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
