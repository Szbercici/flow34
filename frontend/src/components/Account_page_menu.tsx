// Account_page.tsx - A SAJÁT KÓDOD ALAPJÁN
import React from "react";
import { logout, useAuth } from "../AuthContext";
import { useDarkMode } from "../DarkModeContext";
import styles from "./Account_page_menu.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AccountPageProps {
  children?: React.ReactNode;
}

const Account_page: React.FC<AccountPageProps> = ({ children }) => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  // Use centralized DarkMode context for preference and actions
  const { darkMode, toggle } = useDarkMode();

  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.menu}>
        <a
          href="/account/me"
          className={styles.menuItem}
          onClick={(e) => {
            e.preventDefault();
            navigate("/account/me");
          }}
        >
          My account
        </a>
        <a
          href="/account/orders"
          className={styles.menuItem}
          onClick={(e) => {
            e.preventDefault();
            navigate("/account/orders");
          }}
        >
          My orders
        </a>
        <button
          className={styles.logoutBtn}
          onClick={async () => {
            const success = await logout(setUser);
            if (success) {
              toast.success("Logged out successfully");
              navigate("/login");
            }
          }}
        >
          Logout
        </button>
        <button
          type="button"
          className={styles.darkToggle}
          onClick={toggle}
          aria-pressed={darkMode}
          title="Toggle dark mode (preference saved)"
        >
          Dark mode: {darkMode ? "On" : "Off"}
        </button>
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Account_page;
