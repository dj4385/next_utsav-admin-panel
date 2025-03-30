"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  token: string;
  login: (userData: any) => void;
  logout: () => void;
  setTokenData: (token: string) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Simulate checking authentication (You should replace this with real API call)
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const tokenData = sessionStorage.getItem("token")
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if(tokenData) {
      setToken(tokenData);
    }

    setLoading(false);
  }, []);

  const setTokenData = (token: string) => {
    setToken(token);
    sessionStorage.setItem("token", token);
  }

  const login = (userData: any) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    router.push("/home"); // Redirect to dashboard after login
  };

  const logout = () => {
    setUser(null);
    setToken('');
    sessionStorage.clear();
    router.push("/"); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ token, user, setTokenData, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
