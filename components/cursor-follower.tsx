"use client";

import { useEffect, useState, useRef } from "react";

export function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const outerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch/mobile devices
    const checkMobile = () => {
      const hasTouchScreen =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      const isNarrow = window.innerWidth < 768;
      setIsMobile(hasTouchScreen || isNarrow);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    // Detect hovering over interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleElementHover);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleElementHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile, visible]);

  // Smooth animation loop for the outer ring
  useEffect(() => {
    if (isMobile) return;

    const animate = () => {
      outerPos.current.x += (position.x - outerPos.current.x) * 0.12;
      outerPos.current.y += (position.y - outerPos.current.y) * 0.12;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [position, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer ring — follows with smooth lag */}
      <div
        ref={outerRef}
        className="cursor-follower-outer"
        style={{
          opacity: visible ? 1 : 0,
          width: hovering ? 48 : clicking ? 28 : 36,
          height: hovering ? 48 : clicking ? 28 : 36,
          borderColor: hovering
            ? "var(--primary)"
            : "color-mix(in oklch, var(--primary) 50%, transparent)",
        }}
        aria-hidden="true"
      />
      {/* Inner dot — follows instantly */}
      <div
        ref={innerRef}
        className="cursor-follower-inner"
        style={{
          opacity: visible ? 1 : 0,
          width: clicking ? 10 : hovering ? 6 : 5,
          height: clicking ? 10 : hovering ? 6 : 5,
          backgroundColor: "var(--primary)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
