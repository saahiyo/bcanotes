"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

const AUTH_SESSION_FLAG = "bcanotes_has_auth";
const AUTH_ROUTES = ["/login", "/signup", "/profile"];

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname?.startsWith(route));
    const hasSessionFlag =
      typeof window !== "undefined" && window.localStorage.getItem(AUTH_SESSION_FLAG) === "1";

    if (!isAuthRoute && !hasSessionFlag) {
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      try {
        const [{ onAuthStateChanged }, auth] = await Promise.all([
          import("firebase/auth"),
          getFirebaseAuth(),
        ]);
        if (cancelled) return;
        unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
          if (typeof window !== "undefined") {
            if (currentUser) {
              window.localStorage.setItem(AUTH_SESSION_FLAG, "1");
            } else {
              window.localStorage.removeItem(AUTH_SESSION_FLAG);
            }
          }
        });
      } catch {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [pathname]);

  const signIn = async (email: string, password: string) => {
    const [{ signInWithEmailAndPassword }, auth] = await Promise.all([
      import("firebase/auth"),
      getFirebaseAuth(),
    ]);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    setUser(cred.user);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_SESSION_FLAG, "1");
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const [{ createUserWithEmailAndPassword, updateProfile }, auth] = await Promise.all([
      import("firebase/auth"),
      getFirebaseAuth(),
    ]);
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName });
    setUser(credential.user);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_SESSION_FLAG, "1");
    }
  };

  const signInWithGoogle = async () => {
    const [{ GoogleAuthProvider, signInWithPopup }, auth] = await Promise.all([
      import("firebase/auth"),
      getFirebaseAuth(),
    ]);
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    setUser(cred.user);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_SESSION_FLAG, "1");
    }
  };

  const signOut = async () => {
    const [{ signOut: firebaseSignOut }, auth] = await Promise.all([
      import("firebase/auth"),
      getFirebaseAuth(),
    ]);
    await firebaseSignOut(auth);
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_SESSION_FLAG);
    }
  };

  const resetPassword = async (email: string) => {
    const [{ sendPasswordResetEmail }, auth] = await Promise.all([
      import("firebase/auth"),
      getFirebaseAuth(),
    ]);
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
