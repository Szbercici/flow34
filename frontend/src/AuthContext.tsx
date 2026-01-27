import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { API_BASE_URL } from "./config/api";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Egyszerű inicializálás: megpróbáljuk lekérni az aktuális usert
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const resp = await fetch(`${API_BASE_URL}/api/users/me`, {
          credentials: "include",
        });
        if (resp.ok) {
          const data = await resp.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth csak AuthProvider-en belül használható");
  }
  return ctx;
};

export const logout = async (setUser: (user: AuthUser | null) => void) => {
  try {
    const resp = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (resp.ok) {
      setUser(null);
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Hiba a kijelentkezés során:", error);
  }
};


