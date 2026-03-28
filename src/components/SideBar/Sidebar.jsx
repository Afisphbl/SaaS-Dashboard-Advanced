import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserSquare2,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";
import { logoutUser } from "../../api/authApi";
import styles from "./Sidebar.module.css";

// Memoized custom Nav item
const NavItem = React.memo(
  ({ to, icon: Icon, label, isCollapsed, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${styles.navItem} ${isActive ? styles.active : ""}`
      }
      title={isCollapsed ? label : ""}
    >
      <Icon size={20} className={styles.icon} />
      {!isCollapsed && <span className={styles.label}>{label}</span>}
    </NavLink>
  ),
);

export const Sidebar = React.memo(function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { dispatch } = useAuth();
  const { profile } = useUser();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch({ type: "SIGN_OUT" });
    } catch (error) {
      console.error("Logout error UI notification needed here", error);
    }
  };

  const navLinks = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      role: "user",
    },
    { to: "/users", label: "Users", icon: Users, role: "admin" },
    { to: "/profile", label: "Profile", icon: UserSquare2, role: "user" },
    { to: "/settings", label: "Settings", icon: Settings, role: "user" },
  ];

  // Role based filtering logic
  const filteredLinks = navLinks.filter(
    (link) => link.role === "user" || profile?.role === link.role,
  );

  return (
    <>
      <div
        className={`${styles.mobileOverlay} ${isMobileOpen ? styles.mobileOpen : ""}`}
        onClick={() => setIsMobileOpen(false)}
      />

      <button
        className={styles.mobileHamburger}
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu size={24} />
      </button>

      <aside
        className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""} ${isMobileOpen ? styles.mobileOpen : ""}`}
      >
        <div className={styles.logoSection}>
          <div className={styles.logoArea}>
            <div className={styles.logoIcon}></div>
            {!isCollapsed && (
              <span className={styles.logoText}>SaaS Panel</span>
            )}
          </div>
          <button
            className={styles.collapseToggle}
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        <nav className={styles.navSection}>
          {filteredLinks.map((link) => (
            <NavItem
              key={link.to}
              {...link}
              isCollapsed={isCollapsed}
              onClick={() => setIsMobileOpen(false)}
            />
          ))}
        </nav>

        <div className={styles.footerSection}>
          <button
            onClick={handleLogout}
            className={styles.navItem}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut size={20} className={styles.icon} />
            {!isCollapsed && <span className={styles.label}>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
});
