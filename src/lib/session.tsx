"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Role } from "@/lib/demo-data";

type SessionState = {
  signedIn: boolean;
  role: Role | null;
  ready: boolean;
  signIn: () => void;
  signOut: () => void;
  setRole: (role: Role) => void;
};

const SessionContext = createContext<SessionState | null>(null);

const STORAGE_KEY = "aiu-digital-session";

type Stored = {
  signedIn: boolean;
  role: Role | null;
};

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);
  const [role, setRoleState] = useState<Role | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Stored;
        setSignedIn(Boolean(parsed.signedIn));
        setRoleState(parsed.role ?? null);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: Stored) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const signIn = useCallback(() => {
    setSignedIn(true);
    persist({ signedIn: true, role });
  }, [persist, role]);

  const signOut = useCallback(() => {
    setSignedIn(false);
    setRoleState(null);
    persist({ signedIn: false, role: null });
  }, [persist]);

  const setRole = useCallback(
    (next: Role) => {
      setRoleState(next);
      setSignedIn(true);
      persist({ signedIn: true, role: next });
    },
    [persist],
  );

  const value = useMemo(
    () => ({ signedIn, role, ready, signIn, signOut, setRole }),
    [signedIn, role, ready, signIn, signOut, setRole],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return ctx;
}
