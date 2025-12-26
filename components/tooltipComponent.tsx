"use client";

import { useEffect, useRef, useState } from "react";

type TooltipProps = {
  info: string;
  status: boolean;
};

export default function Tooltip({ info, status }: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    const move = (e: MouseEvent) => {
      tooltip.style.left = `${e.clientX}px`;
      tooltip.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={tooltipRef}
      className={`
        pointer-events-none
        fixed
        z-1000
        -translate-x-1/2 -translate-y-full
        bg-black/80 text-white
        p-1
        rounded-xs
        text-sm
        border border-white
        transition-opacity duration-150
        max-w-[22em]
        text-center
        ${status? "visible" : "invisible"}
      `}
    >
      <p>{info}</p>
    </div>
  );
}
