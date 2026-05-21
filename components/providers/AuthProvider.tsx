"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fetchMe, getGoogleAuthUrl, logout as apiLogout, type AuthUser } from "@/lib/api/auth";
import { getAuthToken, setAuthToken } from "@/lib/api/http";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  loginWithGoogle: (redirect?: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!getAuthToken()) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const me = await fetchMe();
      setUser(me);
    } catch {
      setAuthToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const loginWithGoogle = useCallback(async (redirect = "/account") => {
    const url = await getGoogleAuthUrl(redirect);
    window.location.href = url;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      /* ignore */
    }
    setAuthToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, loginWithGoogle, logout, refresh }),
    [user, loading, loginWithGoogle, logout, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
