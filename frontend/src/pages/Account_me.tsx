import Account_page_menu from "../components/Account_page_menu";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";
import styles from "./Account_me.module.css";
import { toast } from "sonner";

const Account_me = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 1. Hook-ok MINDIG legfelül!
  const [userApi, setUserApi] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // 3. Adatok lekérése
  useEffect(() => {
    async function getAccountData() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        setUserApi(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false); // Befejeződött a töltés (akár sikeres, akár nem)
      }
    }

    // Csak akkor indítjuk el a fetch-et, ha van bejelentkezett user
    if (user) {
      getAccountData();
    }
  }, [user]);

  async function saveEmail() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/me/email`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email: userApi.email }),
      });

      if (!response.ok) {
        toast.error("Failed to update email.");
        return false;
      }

      toast.success("Email updated successfully!");
      return true;
    } catch (error) {
      console.error("Error updating email:", error);
      toast.error("Network error while updating email.");
      return false;
    }
  }

  async function saveUsername() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/me/username`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ username: userApi.username }),
      });

      if (!response.ok) {
        toast.error("Failed to update email.");
        return false;
      }

      toast.success("Username updated successfully!");
      useAuth;
      return true;
    } catch (error) {
      console.error("Error updating username:", error);
      toast.error("Network error while updating username.");
      return false;
    }
  }

  async function handleUsernameButtonClick() {
    if (isEditingUsername) {
      const success = await saveUsername();
      if (success) {
        setIsEditingUsername(false);
      }
    }
    if (!isEditingUsername) {
      setIsEditingUsername(true);
      return;
    }
  }
  async function handleEmailButtonClick() {
    if (isEditingEmail) {
      const success = await saveEmail();
      if (success) {
        setIsEditingEmail(false);
      }
    }
    if (!isEditingEmail) {
      setIsEditingEmail(true);
      return;
    }
  }

  if (!user) {
    navigate("/login");
  }

  return (
    <>
      <Account_page_menu>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.h1}>My Account</h1>
            <p className={styles.subtitle}>
              Check and modify your account data.
            </p>
          </div>

          {userApi ? (
            <>
              <div className={styles.card}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="username">
                    Username
                  </label>
                  <input
                    id="username"
                    className={`${styles.input} ${isEditingUsername ? styles.inputEditing : ""}`}
                    type="text"
                    value={userApi.username ?? ""}
                    readOnly={!isEditingUsername}
                    onChange={(e) =>
                      setUserApi({ ...userApi, username: e.target.value })
                    }
                  />
                </div>
                <button
                  className={`${styles.modifyButton} ${isEditingUsername ? styles.modifyButtonActive : ""}`}
                  onClick={handleUsernameButtonClick}
                >
                  {isEditingUsername ? "Done" : "Modify"}
                </button>
              </div>

              <div className={styles.card}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    className={`${styles.input} ${isEditingEmail ? styles.inputEditing : ""}`}
                    type="email"
                    value={userApi.email ?? ""}
                    readOnly={!isEditingEmail}
                    onChange={(e) =>
                      setUserApi({ ...userApi, email: e.target.value })
                    }
                  />
                </div>
                <button
                  className={`${styles.modifyButton} ${isEditingEmail ? styles.modifyButtonActive : ""}`}
                  onClick={handleEmailButtonClick}
                >
                  {isEditingEmail ? "Done" : "Modify"}
                </button>
              </div>
            </>
          ) : isLoading ? (
            <p className={styles.status}>Loading user information...</p>
          ) : (
            <p className={styles.status}>Failed to load user data.</p>
          )}
        </div>
      </Account_page_menu>
    </>
  );
};

export default Account_me;
