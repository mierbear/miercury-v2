"use client";
import NextLink from "next/link";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/footerComponent";
import Game from "@/components/gameListingComponent"

const GamesComponent = () => {

  return (
    <div className="min-w-screen min-h-screen align-center items-center flex flex-col relative bg-[#17191a] nonsel">

      {/* SPACE */}
      <div className="w-5xl max-w-screen flex flex-col justify-end items-center h-32">
      </div>

      {/* MAIN */}
      <div className={`w-5xl max-w-screen flex-auto flex flex-col bg-white transition-opacity duration-500 z-50`}>

        {/* INTRO */}
        <div className="bg-gray-600 h-80">
          <p>fdsdfewfwef</p>
        </div>
                
        {/* GAMES LIST */}
        <div className="flex flex-col gap-2 bg-white flex-auto p-4">

          <Game 
            src="/videos/games/fish.mov" 
            link="/mierfishing/index.html" 
            title="Mier Fishing" 
            date="04/05/2025"
            description="A fishing typing game I made for fun purely in vanilla HTML/CSS/JS." 
          />
          
          <Game 
            src="/videos/games/match.mov" 
            link="/match/index.html"
            title="Match Game" 
            date="03/18/2025"
            description="My first attempt in making a game 3-4 months into learning web development." 
          />

        </div>
      </div>

      <Footer />

    </div>
  )
}

export default GamesComponent;