"use client";

import NextLink from "next/link";
import gsap from "gsap";
import React from "react";

const GamesList = () => {
  const fishingRef = React.useRef<HTMLAnchorElement | null>(null);
  const matchRef = React.useRef<HTMLAnchorElement | null>(null);
  const moreRef = React.useRef<HTMLDivElement | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);


  const listReset = () => {
    listRef.current!.style.gridTemplateColumns = "1fr 1fr 1fr";
  };

  const listFishSel = () => {
    listRef.current!.style.gridTemplateColumns = "1.8fr 1fr 0.8fr";
  };

  const listMatchSel = () => {
    listRef.current!.style.gridTemplateColumns = "0.9fr 1.8fr 0.9fr";
  };

  const listMoreSel = () => {
    listRef.current!.style.gridTemplateColumns = "0.8fr 1fr 1.8fr";
  };

  return (
    <div ref={listRef} className="grid grid-cols-[1fr_1fr_1fr] bg-[#535961] z-50 list">

        <NextLink onMouseEnter={listFishSel} onMouseLeave={listReset} ref={fishingRef} href="/mierfishing/index.html" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center min-w-[80%] min-h-[50vh] bg-[#858d94]">
          <span>fishing</span>
        </NextLink>

        <NextLink onMouseEnter={listMatchSel} onMouseLeave={listReset} ref={matchRef} href="/match/index.html" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center min-w-[80%] min-h-[50vh] bg-[#707c86]">
          <span>match</span>
        </NextLink>

        <div onMouseEnter={listMoreSel} onMouseLeave={listReset} ref={moreRef} className="flex justify-center items-center min-w-[80%] min-h-[50vh] bg-[#858d94]">
          <span>more to come!</span>
        </div>

    </div>
  )
}

export default GamesList;