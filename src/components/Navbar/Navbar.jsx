import { Bell, Moon, Sun, Search, User } from "lucide-react";
import styles from "./Navbar.module.css";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className={styles.navbar}>
      <div className={styles.searchContainer}>
        <Search size={20} className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.iconButton} onClick={toggleTheme}>
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button className={styles.iconButton}>
          <Bell size={20} />
          <span className={styles.notificationBadge}>3</span>
        </button>
        <button className={`${styles.iconButton} ${styles.avatarButton}`}>
          <User size={20} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
