import { useEffect } from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import { useLocation, useNavigate } from "react-router";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath === "/") {
      navigate("/dashboard");
    }
  }, [navigate, currentPath]);
  return (
    <div>
      <Sidebar />
    </div>
  );
}

export default Dashboard;
