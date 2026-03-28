import React, { useRef, useState } from "react";
import { Search, Sun, Moon, Bell, User } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useUser } from "../../hooks/useUser";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import styles from "./Navbar.module.css";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { profile } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <header className={styles.navbar}>
      <div className={styles.searchContainer}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
        />
      </div>

      <div className={styles.actions}>
        <button
          onClick={toggleTheme}
          className={styles.iconButton}
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className={styles.iconButton} aria-label="Notifications">
          <Bell size={20} />
          <span className={styles.notificationBadge}>3</span>
        </button>

        <div className={styles.avatarContainer} ref={dropdownRef}>
          <button
            className={styles.avatarButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="User Avatar"
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.avatarFallback}>
                <User size={20} />
              </div>
            )}
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <p className={styles.userName}>{profile?.email || "User"}</p>
                <p className={styles.userRole}>{profile?.role}</p>
              </div>
              <div className={styles.dropdownItems}>
                <a href="#/profile" className={styles.dropdownItem}>
                  Edit Profile
                </a>
                <a href="#/settings" className={styles.dropdownItem}>
                  Settings
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
