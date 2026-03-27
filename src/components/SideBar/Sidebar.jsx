import { Link, useLocation } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  LayoutDashboard,
  LogOutIcon,
  Settings,
  SquareUserRound,
} from "lucide-react";
import styles from "./Sidebar.module.css";
import { useState } from "react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <button
        className={styles.mobileHamburger}
        onClick={() => {
          setMobileOpen(true);
          setCollapsed(true);
        }}
      >
        <Menu size={20} />
      </button>
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOpen : ""}`}
        onClick={() => {
          setMobileOpen(false);
          setCollapsed(false);
        }}
      />
      <aside
        className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""} ${mobileOpen ? styles.mobileOpen : ""}`}
      >
        <section className={styles.logoSection}>
          <div className={styles.logoArea}>
            <div className={styles.logoIcon}></div>
            <h1 className={styles.logoText}>SaaS Panel</h1>
          </div>

          <button
            className={styles.collapseToggle}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </section>

        <nav className={styles.navSection}>
          <Link
            to="/dashboard"
            className={`${styles.navItem} ${currentPath === "/dashboard" ? styles.active : ""}`}
          >
            <LayoutDashboard size={20} />
            {!collapsed && <span>Dashboard</span>}
          </Link>

          <Link
            to="/profile"
            className={`${styles.navItem} ${currentPath === "/profile" ? styles.active : ""}`}
          >
            <SquareUserRound size={20} />
            {!collapsed && <span>Profile</span>}
          </Link>

          <Link
            to="/settings"
            className={`${styles.navItem} ${currentPath === "/settings" ? styles.active : ""}`}
          >
            <Settings size={20} className={styles.icon} />
            {!collapsed && <span>Settings</span>}
          </Link>
        </nav>

        <footer className={styles.footerSection}>
          <Link className={styles.navItem}>
            <LogOutIcon size={20} />
            {!collapsed && <span>Log Out</span>}
          </Link>
        </footer>
      </aside>
    </>
  );
}

export default Sidebar;
