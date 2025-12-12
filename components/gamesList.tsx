"use client";

import NextLink from "next/link";
import gsap from "gsap";
import React from "react";
import { useEffect, useRef, useState } from "react";

const GamesList = () => {
  const fishingRef = React.useRef<HTMLAnchorElement | null>(null);
  const matchRef = React.useRef<HTMLAnchorElement | null>(null);
  const moreRef = React.useRef<HTMLDivElement | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const isDesktop = () => window.innerWidth >= 1280;

  const resetInlineStyles = () => {
    listRef.current!.style.removeProperty("grid-template-columns");
    listRef.current!.style.removeProperty("grid-template-rows");
  };

  const listReset = () => {
    if (!isDesktop()) {
      resetInlineStyles();
      return;
    }
    
    listRef.current!.style.gridTemplateColumns = "1fr 1fr 1fr";
  };

  const listFishSel = () => {
    if (!isDesktop()) return resetInlineStyles();
    listRef.current!.style.gridTemplateColumns = "0.9fr 1.8fr 0.9fr";
  };
  
  const listMatchSel = () => {
    if (!isDesktop()) return resetInlineStyles();
    listRef.current!.style.gridTemplateColumns = "1.8fr 1fr 0.8fr";
  };

  const listMoreSel = () => {
    if (!isDesktop()) return resetInlineStyles();
    listRef.current!.style.gridTemplateColumns = "0.8fr 1fr 1.8fr";
  };

  useEffect(() => {
    const handleResize = () => {
      if (isDesktop()) {
        listRef.current!.style.gridTemplateColumns = "1fr 1fr 1fr";
        listRef.current!.style.removeProperty("grid-template-rows");
        console.log(`is desktop :3`)
      } else {
        listRef.current!.style.removeProperty("grid-template-columns");
        listRef.current!.style.removeProperty("grid-template-rows");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={listRef} className="grid grid-cols-[1fr] grid-rows-3 xl:grid-cols-[1fr_1fr_1fr] xl:grid-rows-1 bg-[#535961] z-50 list gameList">

        <NextLink onMouseEnter={listMatchSel} onMouseLeave={listReset} ref={matchRef} href="/match/index.html" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center xl:min-w-[80%] xl:min-h-[50vh] bg-[#858d94]">
          <span>match</span>
        </NextLink>

        <NextLink onMouseEnter={listFishSel} onMouseLeave={listReset} ref={fishingRef} href="/mierfishing/index.html" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center min-w-[80%] min-h-[50vh] bg-[#707c86]">
          <span>fishing</span>
        </NextLink>

        <div onMouseEnter={listMoreSel} onMouseLeave={listReset} ref={moreRef} className="flex justify-center items-center min-w-[80%] min-h-[50vh] bg-[#858d94]">
          <span>more to come!</span>
        </div>

    </div>
  )
}

export default GamesList;