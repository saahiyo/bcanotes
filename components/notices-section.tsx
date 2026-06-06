"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, orderBy, limit, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Bell, ArrowRight, AlertCircle, Info, Calendar, Megaphone, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Notice {
  id: string;
  title: string;
  content: string;
  type: "notice" | "update" | "alert" | "event";
  important?: boolean;
  link?: string;
  createdAt: Timestamp;
}

const typeConfig = {
  alert: {
    label: "Alert",
    icon: AlertCircle,
    styles: "border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 ring-red-500/20",
    dot: "bg-red-500",
  },
  update: {
    label: "Update",
    icon: Sparkles,
    styles: "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20",
    dot: "bg-emerald-500",
  },
  event: {
    label: "Event",
    icon: Calendar,
    styles: "border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400 ring-amber-500/20",
    dot: "bg-amber-500",
  },
  notice: {
    label: "Notice",
    icon: Megaphone,
    styles: "border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 ring-blue-500/20",
    dot: "bg-blue-500",
  },
};

export function NoticesSection() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestNotices() {
      try {
        const noticesRef = collection(db, "notices");
        const q = query(noticesRef, orderBy("createdAt", "desc"), limit(3));
        const querySnapshot = await getDocs(q);
        
        const fetchedNotices: Notice[] = [];
        querySnapshot.forEach((doc) => {
          fetchedNotices.push({ id: doc.id, ...doc.data() } as Notice);
        });
        setNotices(fetchedNotices);
      } catch (error) {
        console.error("Error fetching latest notices:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestNotices();
  }, []);

  const formatDate = (timestamp?: Timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="w-full py-12 relative overflow-hidden border-t border-border/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <div className="h-6 w-32 bg-muted animate-pulse rounded-full mb-3" />
            <div className="h-8 w-64 bg-muted animate-pulse rounded-md" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 rounded-xl bg-card border ring-1 ring-foreground/5 p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="h-5 w-16 bg-muted animate-pulse rounded-full" />
                  <div className="h-4 w-24 bg-muted animate-pulse rounded-md" />
                </div>
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md" />
                <div className="h-12 w-full bg-muted animate-pulse rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (notices.length === 0) {
    return null; // Don't show the section if there are no notices to display
  }

  return (
    <section className="w-full py-16 relative overflow-hidden border-t border-border/20 bg-muted/10">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-20 dark:opacity-10" />
      <div className="absolute -top-40 -left-40 size-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary mb-3">
              <Bell className="size-3.5 animate-bounce" />
              <span>Announcements</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Latest <span className="text-primary">Updates & Notices</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Stay informed about important exam dates, newly added materials, practical sheets, and other official BCA updates.
            </p>
          </div>
          
          <Link href="/notices" className="shrink-0">
            <Button variant="outline" className="gap-2 group shadow-sm">
              View All Updates
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Notices Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {notices.map((notice, index) => {
            const config = typeConfig[notice.type] || typeConfig.notice;
            const Icon = config.icon;

            return (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-border/60 hover:border-primary/30">
                  <CardHeader className="p-5 pb-3">
                    <div className="flex justify-between items-center gap-2 mb-2">
                      {/* Badge / Type */}
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ${config.styles}`}>
                        <Icon className="size-3" />
                        <span>{config.label}</span>
                      </div>
                      
                      {/* Date */}
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="size-3" />
                        {formatDate(notice.createdAt)}
                      </span>
                    </div>

                    <CardTitle className="text-base font-semibold leading-snug line-clamp-1 flex items-center gap-2">
                      {notice.important && (
                        <span className="relative flex h-2 w-2">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`}></span>
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`}></span>
                        </span>
                      )}
                      <span className={notice.important ? "text-foreground font-bold" : "text-foreground"}>
                        {notice.title}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-between">
                    <CardDescription className="text-xs leading-relaxed text-foreground/70 dark:text-foreground/80 line-clamp-3 mb-4 whitespace-pre-wrap">
                      {notice.content}
                    </CardDescription>

                    {/* Action link if available */}
                    {notice.link && (
                      <Link href={notice.link} className="inline-flex items-center text-xs font-semibold text-primary hover:underline gap-1 mt-auto">
                        View Resource
                        <ArrowRight className="size-3" />
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
