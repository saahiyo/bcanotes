"use client";

import { useEffect, useRef, useState } from "react";

type Mood = "neutral" | "happy" | "surprised" | "suspicious";

export function BlobMascot({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [eyeTransform, setEyeTransform] = useState({ x: 0, y: 0 });
  const [svgTilt, setSvgTilt] = useState({ x: 0, y: 0 });
  const [mood, setMood] = useState<Mood>("neutral");

  // Mouse Tracking (Look Around)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Stay locked during surprise
      if (mood === "surprised") return;
      if (!svgRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angleX = (e.clientX - centerX) / 25;
      const angleY = (e.clientY - centerY) / 25;

      // Limit movement range
      const moveX = Math.max(-15, Math.min(15, angleX));
      const moveY = Math.max(-10, Math.min(10, angleY));

      setEyeTransform({ x: moveX, y: moveY });
      setSvgTilt({ x: -moveY, y: moveX });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mood]);

  // Random Mood changes to keep it alive automatically
  useEffect(() => {
    const moodLoop = () => {
      const delay = 5000 + Math.random() * 8000;
      setTimeout(() => {
        const moods: Mood[] = ["neutral", "happy", "surprised", "suspicious"];
        const nextMood = moods[Math.floor(Math.random() * moods.length)];
        setMood(nextMood);
        
        // Reset to neutral after a short while
        setTimeout(() => setMood("neutral"), 2000 + Math.random() * 2000);
        
        moodLoop();
      }, delay);
    };
    moodLoop();
  }, []);

  const getEyeAttributes = () => {
    switch (mood) {
      case "happy":
        return { height: 15, y: 90, width: 10, rx: 5 };
      case "surprised":
        return { height: 45, y: 77, width: 14, rx: 7 };
      case "suspicious":
        return { height: 8, y: 95, width: 20, rx: 4 };
      default: // neutral
        return { height: 30, y: 85, width: 10, rx: 5 };
    }
  };

  const attrs = getEyeAttributes();

  return (
    <div 
      className={`relative cursor-pointer ${className}`} 
      style={{ perspective: "1000px" }}
      onClick={() => {
        // Toggle moods on click for fun interactivity
        const moods: Mood[] = ["neutral", "happy", "surprised", "suspicious"];
        const currentIndex = moods.indexOf(mood);
        setMood(moods[(currentIndex + 1) % moods.length]);
      }}
    >
      <style>
        {`
          @keyframes mascotBlink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
          .mascot-eye-blink {
            animation: mascotBlink 4s infinite;
            transform-origin: center;
          }
          .mascot-eye-transition {
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
        `}
      </style>
      
      <svg
        ref={svgRef}
        viewBox="0 0 300 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
        style={{
          transform: `rotateX(${svgTilt.x}deg) rotateY(${svgTilt.y}deg)`,
          transformStyle: "preserve-3d"
        }}
        aria-label="Expressive Mascot"
      >
        {/* Body (Capsule shape) - Uses theme foreground color */}
        <rect x="75" y="50" width="150" height="100" rx="50" className="fill-foreground text-foreground" />
        
        {/* Eyes Group */}
        <g
          style={{
            transform: `translate(${eyeTransform.x}px, ${eyeTransform.y}px)`
          }}
        >
          {/* Left Eye - Uses theme background color for contrast */}
          <rect
            className="mascot-eye-blink mascot-eye-transition fill-background"
            x="125"
            y={attrs.y}
            width={attrs.width}
            height={attrs.height}
            rx={attrs.rx}
          />
          {/* Right Eye */}
          <rect
            className="mascot-eye-blink mascot-eye-transition fill-background"
            x="165"
            y={attrs.y}
            width={attrs.width}
            height={attrs.height}
            rx={attrs.rx}
          />
        </g>
      </svg>
    </div>
  );
}
