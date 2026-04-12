"use client";

import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProfile } from "firebase/auth";
import {
  Mail, User, Calendar, Shield, Pencil, Check, X, LogOut, Loader2, KeyRound,
} from "lucide-react";
import { BlobMascot } from "@/components/blob-mascot";

export default function ProfilePage() {
  const { user, loading, signOut, resetPassword } = useAuth();
  const router = useRouter();

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleSaveName = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    try {
      await updateProfile(user, { displayName: newName.trim() });
      // Force re-render by reloading user
      await user.reload();
      setEditingName(false);
    } catch {
      // Silently fail
    } finally {
      setSaving(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) return;
    setResetLoading(true);
    try {
      await resetPassword(user.email);
      setResetSent(true);
      setTimeout(() => setResetSent(false), 5000);
    } catch {
      // Silently fail
    } finally {
      setResetLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const createdAt = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const lastSignIn = user.metadata.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  const provider = user.providerData[0]?.providerId === "google.com" ? "Google" : "Email & Password";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* Profile Header Card with Cover */}
      <Card className="mb-8 overflow-hidden border-none shadow-xl shadow-primary/5 bg-card/60 backdrop-blur-sm rounded-xl">
        <div className="h-40 sm:h-48 w-full bg-gradient-to-r from-[#8AB4F8] via-[#4285f4] to-[#1a73e8] relative overflow-hidden rounded-t-xl">
          {/* Subtle pattern or overlay in banner */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          
          {/* Mascot in the banner */}
          <div className="absolute -bottom-2 right-4 sm:right-12 w-32 sm:w-40 md:w-48 z-10 transition-transform hover:-translate-y-2 duration-300 pointer-events-none hidden sm:block">
             <BlobMascot />
          </div>
        </div>
        
        <CardContent className="px-6 sm:px-10 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end sm:justify-start gap-4 sm:gap-6 -mt-16 sm:-mt-20 text-center sm:text-left relative z-20">
            {/* Avatar Container */}
            <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-card p-1.5 shadow-lg shrink-0 relative transition-transform hover:scale-[1.02] duration-300">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-white font-bold text-4xl sm:text-5xl uppercase overflow-hidden">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="h-full w-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  user.displayName?.charAt(0) || user.email?.charAt(0) || "U"
                )}
              </div>
            </div>
            
            {/* User Info */}
            <div className="pb-2 sm:pb-4 flex-1 w-full max-w-full">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground truncate">
                {user.displayName || "BCA Student"}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base mt-2 flex items-center justify-center sm:justify-start gap-2 bg-muted/50 w-fit sm:max-w-full mx-auto sm:mx-0 px-3 py-1 rounded-full border border-border/50 truncate">
                <Mail className="h-4 w-4 shrink-0" /> <span className="truncate">{user.email}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Account Info - takes up 2 columns on large screens */}
        <div className="md:col-span-2 space-y-8">
        <Card className="h-full shadow-lg border-none bg-card/60 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
          <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Display Name */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <Pencil className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Display Name</p>
                {editingName ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Enter your name"
                      autoFocus
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <Button size="icon" variant="ghost" className="h-9 w-9 shrink-0 text-green-600" onClick={handleSaveName} disabled={saving}>
                      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    </Button>
                    <Button size="icon" variant="ghost" className="h-9 w-9 shrink-0 text-destructive" onClick={() => setEditingName(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm font-medium truncate">{user.displayName || "Not set"}</p>
                )}
              </div>
            </div>
            {!editingName && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-foreground shrink-0"
                onClick={() => {
                  setNewName(user.displayName || "");
                  setEditingName(true);
                }}
              >
                Edit
              </Button>
            )}
          </div>

          <hr className="border-border/50" />

          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Email</p>
              <p className="text-sm font-medium">{user.email}</p>
            </div>
          </div>

          <hr className="border-border/50" />

          {/* Sign-in Provider */}
          <div className="flex items-start gap-3">
            <Shield className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Sign-in Method</p>
              <p className="text-sm font-medium">{provider}</p>
            </div>
          </div>

          <hr className="border-border/50" />

          {/* Account Created */}
          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Member Since</p>
              <p className="text-sm font-medium">{createdAt}</p>
            </div>
          </div>

          <hr className="border-border/50" />

          {/* Last Sign In */}
          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Last Sign In</p>
              <p className="text-sm font-medium">{lastSignIn}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
      
      <div className="space-y-8">
        {/* Actions Card - Takes up 1 column and visually identical */}
      <Card className="h-fit shadow-lg border-none bg-card/60 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-primary" />
            Account Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {provider === "Email & Password" && (
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-11"
              onClick={handleResetPassword}
              disabled={resetLoading || resetSent}
            >
              {resetLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <KeyRound className="h-4 w-4" />
              )}
              {resetSent ? "Password reset email sent!" : "Reset Password"}
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-11 text-destructive hover:text-destructive hover:bg-destructive/5 hover:border-destructive/30"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </CardContent>
      </Card>
      </div>
    </div>
  </div>
  );
}
