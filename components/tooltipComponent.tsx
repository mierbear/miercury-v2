"use client";

import { useEffect, useRef, useState } from "react";

type TooltipProps = {
  info: string;
  status: boolean;
  structured?: boolean;
};

export default function Tooltip({ info, status, structured }: TooltipProps) {
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
        translate-x-3
        -translate-y-1/4
        bg-black/80 text-white
        py-1
        px-2
        rounded-xs
        text-sm
        border border-white
        transition-opacity duration-150
        max-w-[22em]
        text-center
        ${status? "visible" : "invisible"}
      `}
    >
      {structured ? (
        <div className="">
          {info.split("*").map((item, i, arr) => (
            <p 
              key={i} 
              className={`py-2`}
            >
              {item}
              {i !== arr.length - 1 && <br />}
            </p>
          ))}
        </div>
      ) : (
        <p>{info}</p>
      )}
    </div>
  );
}
