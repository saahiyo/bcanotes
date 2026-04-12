"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion";
import { FileText, Library, FolderOpen, BookOpen, Users, GraduationCap } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;        // e.g. "blue"
  gradient: string;     // tailwind gradient classes
}

const stats: StatItem[] = [
  {
    icon: FileText,
    value: 100,
    suffix: "+",
    label: "PDF Notes",
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: FolderOpen,
    value: 8,
    suffix: "",
    label: "Years of PYQs",
    color: "green",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: BookOpen,
    value: 50,
    suffix: "+",
    label: "Solved Practicals",
    color: "orange",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    icon: GraduationCap,
    value: 6,
    suffix: "",
    label: "Semesters Covered",
    color: "purple",
    gradient: "from-purple-500 to-violet-600",
  },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 60,
    damping: 25,
    duration: 1.8,
  });
  const display = useTransform(spring, (latest) => `${Math.round(latest)}${suffix}`);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    } else {
      motionValue.set(0);
    }
  }, [inView, motionValue, value]);

  // Update DOM directly for performance
  useEffect(() => {
    const unsubscribe = display.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = v;
      }
    });
    return unsubscribe;
  }, [display]);

  return <span ref={ref}>0{suffix}</span>;
}

const colorMap: Record<string, { bg: string; ring: string; text: string; glow: string }> = {
  blue: {
    bg: "bg-blue-500/10 dark:bg-blue-500/15",
    ring: "ring-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
    glow: "group-hover:shadow-blue-500/20",
  },
  green: {
    bg: "bg-green-500/10 dark:bg-green-500/15",
    ring: "ring-green-500/20",
    text: "text-green-600 dark:text-green-400",
    glow: "group-hover:shadow-green-500/20",
  },
  orange: {
    bg: "bg-orange-500/10 dark:bg-orange-500/15",
    ring: "ring-orange-500/20",
    text: "text-orange-600 dark:text-orange-400",
    glow: "group-hover:shadow-orange-500/20",
  },
  purple: {
    bg: "bg-purple-500/10 dark:bg-purple-500/15",
    ring: "ring-purple-500/20",
    text: "text-purple-600 dark:text-purple-400",
    glow: "group-hover:shadow-purple-500/20",
  },
};

export function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-16 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      {/* Technical Grid */}
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-30 dark:opacity-20" />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Grid Container with faint subtle dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 lg:gap-8 lg:divide-x divide-border/20 py-8 relative">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colors = colorMap[stat.color];

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="group relative flex flex-col items-center text-center px-4"
              >
                {/* Massive Ambient Glow (Triggered on hover) */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-full ${colors.bg.replace('/10', '/30')} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                {/* Raw Minimal Icon */}
                <div className="relative z-10 mb-4 inline-flex items-center justify-center transform group-hover:-translate-y-1 transition-transform duration-500">
                  <Icon className={`h-8 w-8 md:h-10 md:w-10 ${colors.text} drop-shadow-sm`} strokeWidth={2} />
                </div>

                {/* Typography Number */}
                <div className="relative z-10 text-4xl lg:text-5xl font-extrabold tracking-tighter mb-2 group-hover:scale-105 transition-transform duration-500 origin-bottom">
                  <span className={`bg-gradient-to-b ${stat.gradient} bg-clip-text text-transparent`}>
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
                  </span>
                </div>

                {/* Sleek Uppercase Label */}
                <p className="relative z-10 text-xs sm:text-sm text-foreground/60 font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] group-hover:text-foreground/80 transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
