"use client";
import NextLink from "next/link";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Footer from "./footerComponent";

const GamesComponent = () => {

  return (
    <div className="min-w-screen min-h-screen align-center items-center flex flex-col relative bg-[#17191a] nonsel">

      {/* SPACE */}
      <div className="w-5xl max-w-screen flex flex-col justify-end items-center h-32">
      </div>

      {/* MAIN */}
      <div className={`w-5xl max-w-screen flex-auto flex flex-col bg-white transition-opacity duration-500 z-50`}>

        {/* INTRO */}
        <div className="bg-amber-300 h-80">
          <p>fdsdfewfwef</p>
        </div>
                
        {/* GAMES LIST */}
        <div className="grid grid-cols-2 md:grid-cols-3 bg-amber-100 flex-auto">

          <NextLink 
            href="/match/index.html" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex justify-center items-center bg-[#858d94]">
            <span>match</span>
          </NextLink>

          <NextLink 
            href="/mierfishing/index.html" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex justify-center items-center bg-[#707c86]">
            <span>fishing</span>
          </NextLink>

          <div className="flex justify-center items-center bg-[#858d94]">
            <span>more to come!</span>
          </div>

        </div>
      </div>

      <Footer />

    </div>
  )
}

export default GamesComponent;