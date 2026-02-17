import React, { createContext, useContext, useEffect, useState } from "react";

interface DarkModeContextValue {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  toggle: () => void;
}

const STORAGE_KEY = "darkModeEnabled";

const DarkModeContext = createContext<DarkModeContextValue | undefined>(
  undefined,
);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, darkMode ? "true" : "false");
    } catch {}

    // Apply structural class for styling (actual colors handled elsewhere)
    try {
      const root = document.documentElement;
      if (darkMode) root.classList.add("dark");
      else root.classList.remove("dark");
      window.dispatchEvent(
        new CustomEvent("dark-mode-changed", { detail: { enabled: darkMode } }),
      );
    } catch {}
  }, [darkMode]);

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
