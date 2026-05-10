"use client";

import { useEffect, useRef, useState } from "react";

export function CursorFollower() {
  const [isMobile, setIsMobile] = useState(true);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const outerPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const clicking = useRef(false);
  const hovering = useRef(false);

  const updateVisualState = () => {
    const outer = outerRef.current;
    const inner = innerRef.current;

    if (!outer || !inner) return;

    outer.style.opacity = visible.current ? "1" : "0";
    outer.style.width = hovering.current ? "48px" : clicking.current ? "28px" : "36px";
    outer.style.height = hovering.current ? "48px" : clicking.current ? "28px" : "36px";
    outer.style.borderColor = hovering.current
      ? "var(--primary)"
      : "color-mix(in oklch, var(--primary) 50%, transparent)";

    inner.style.opacity = visible.current ? "1" : "0";
    inner.style.width = clicking.current ? "10px" : hovering.current ? "6px" : "5px";
    inner.style.height = clicking.current ? "10px" : hovering.current ? "6px" : "5px";
    inner.style.backgroundColor = "var(--primary)";
  };

  useEffect(() => {
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

    const handleMouseMove = (event: MouseEvent) => {
      targetPos.current = { x: event.clientX, y: event.clientY };
      visible.current = true;

      const target = event.target as HTMLElement;
      hovering.current = Boolean(
        target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]")
      );
      updateVisualState();
    };

    const handleMouseDown = () => {
      clicking.current = true;
      updateVisualState();
    };

    const handleMouseUp = () => {
      clicking.current = false;
      updateVisualState();
    };

    const handleMouseEnter = () => {
      visible.current = true;
      updateVisualState();
    };

    const handleMouseLeave = () => {
      visible.current = false;
      updateVisualState();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const animate = () => {
      outerPos.current.x += (targetPos.current.x - outerPos.current.x) * 0.12;
      outerPos.current.y += (targetPos.current.y - outerPos.current.y) * 0.12;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${targetPos.current.x}px, ${targetPos.current.y}px) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={outerRef}
        className="cursor-follower-outer"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <div
        ref={innerRef}
        className="cursor-follower-inner"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </>
  );
}
