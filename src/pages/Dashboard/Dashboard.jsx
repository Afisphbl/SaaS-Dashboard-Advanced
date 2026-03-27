import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, currentPath]);
  return <div>Dashboard</div>;
}

export default Dashboard;
