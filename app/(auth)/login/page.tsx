"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Eye, EyeOff, Loader2 } from "lucide-react";
import { useReducer } from "react";
import { useAuth } from "@/components/auth-provider";

type State = {
  showPassword: boolean;
  email: string;
  password: string;
  error: string;
  loading: boolean;
};

type Action =
  | { type: "SET_FIELD"; field: keyof State; value: any }
  | { type: "SET_ERROR"; error: string }
  | { type: "START_LOADING" }
  | { type: "STOP_LOADING" }
  | { type: "TOGGLE_PASSWORD" };

const initialState: State = {
  showPassword: false,
  email: "",
  password: "",
  error: "",
  loading: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERROR":
      return { ...state, error: action.error, loading: false };
    case "START_LOADING":
      return { ...state, loading: true, error: "" };
    case "STOP_LOADING":
      return { ...state, loading: false };
    case "TOGGLE_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    default:
      return state;
  }
}

export default function LoginPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showPassword, email, password, error, loading } = state;
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();
  const { push } = router;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "START_LOADING" });
    try {
      await signIn(email, password);
      push("/");
    } catch (err: any) {
      const code = err?.code || "";
      let msg = "Something went wrong. Please try again.";
      if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        msg = "Invalid email or password.";
      } else if (code === "auth/too-many-requests") {
        msg = "Too many attempts. Please try again later.";
      }
      dispatch({ type: "SET_ERROR", error: msg });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

  const handleGoogleSignIn = async () => {
    dispatch({ type: "START_LOADING" });
    try {
      await signInWithGoogle();
      push("/");
    } catch (err: any) {
      if (err?.code !== "auth/popup-closed-by-user") {
        dispatch({ type: "SET_ERROR", error: "Google sign-in failed. Please try again." });
      }
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="flex items-center gap-2 text-primary">
              <BookOpen className="size-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
          <CardDescription>Sign in to your BCA YCMOU account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
                required
                disabled={loading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium leading-none">
                  Password
                </label>
                <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })}
                  required
                  disabled={loading}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => dispatch({ type: "TOGGLE_PASSWORD" })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <Button className="w-full h-10" type="submit" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : "Sign in"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full h-10 gap-2" onClick={handleGoogleSignIn} disabled={loading}>
            <svg className="size-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-foreground hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
