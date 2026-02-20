import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from './AuthContext';
import { API_BASE_URL } from "./config/api";

interface DarkModeContextValue {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  toggle: () => void;
}

const STORAGE_KEY = "darkModeEnabled";
const DarkModeContext = createContext<DarkModeContextValue | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [darkMode, setDarkMode] = useState<boolean>(() => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
});

useEffect(() => {
  if (user) {
    fetch(`${API_BASE_URL}/api/users/me/theme`, {
      credentials: "include",
    })
      .then((resp) => (resp.ok ? resp.json() : null))
      .then((data) => {
        if (data && data.theme) {
          const isDark = data.theme === "dark";
          setDarkMode(isDark);
          localStorage.setItem(STORAGE_KEY, isDark ? "true" : "false");
        }
      })
      .catch((err) => console.error("Nem sikerült lekérni a témát:", err));
  }
}, [user]); 

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, darkMode ? "true" : "false");
      if (user) {
        const payload = darkMode ? "dark" : "light";
        fetch(`${API_BASE_URL}/api/users/me/theme`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ theme: payload }),
        });
      }
    } catch (err) {
        console.error("Hiba a mentés során", err);
    }

    // Osztályok érvényesítése a HTML gyökéren
    try {
      const root = document.documentElement;
      if (darkMode) root.classList.add("dark");
      else root.classList.remove("dark");
      
      window.dispatchEvent(
        new CustomEvent("dark-mode-changed", { detail: { enabled: darkMode } }),
      );
    } catch {}
  }, [darkMode, user]); // Fontos: user is legyen itt függőség

  const toggle = () => setDarkMode((v) => !v);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const ctx = useContext(DarkModeContext);
  if (!ctx) throw new Error("useDarkMode must be used within DarkModeProvider");
  return ctx;
};

export default DarkModeProvider;