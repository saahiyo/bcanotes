"use client";

import {
  ExternalLink,
  Globe,
  ClipboardList,
  UserCheck,
  CalendarCheck,
} from "lucide-react";
import { toast, dismissToast } from "@/hooks/use-toast";

const officialLinks = [
  {
    title: "YCMOU Official Website",
    description: "The official portal of Yashwantrao Chavan Maharashtra Open University.",
    icon: Globe,
    color: "text-indigo-500",
  },
  {
    title: "Online Exam Portal",
    description: "Access the YCMOU online examination system for tests and results.",
    icon: ClipboardList,
    color: "text-rose-500",
  },
  {
    title: "Student Login (LMS)",
    description: "Login to the Learning Management System for assignments and courses.",
    icon: UserCheck,
    color: "text-teal-500",
  },
  {
    title: "Exam Timetable",
    description: "View the latest examination schedule and important dates.",
    icon: CalendarCheck,
    color: "text-orange-500",
  },
];

let lastToastId: string | null = null;

export function OfficialLinks() {
  const handleClick = (title: string) => {
    if (lastToastId) dismissToast(lastToastId);
    lastToastId = toast({
      title: "Link Coming Soon",
      description: `The "${title}" link will be added shortly. Stay tuned!`,
    });
  };

  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight mb-6 text-foreground">
        Official YCMOU Links
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {officialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.title}
              onClick={() => handleClick(link.title)}
              className="group flex flex-col sm:flex-row items-start gap-2 sm:gap-4 p-3.5 sm:p-5 rounded-xl border border-border/70 bg-card hover:bg-muted/40 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg text-left cursor-pointer"
            >
              <div className={`shrink-0 ${link.color}`}>
                <Icon className="size-4 sm:size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                  {link.title}
                  <ExternalLink className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 leading-relaxed hidden sm:block">
                  {link.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
