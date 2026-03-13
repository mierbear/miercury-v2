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
      <div className={`w-5xl max-w-screen flex-auto flex flex-col transition-opacity duration-500 z-50`}>

        {/* HEADER */}
        <div className="bg-[#879097] h-30 sm:h-50 md:h-60 rounded-t-2xl flex items-end relative text-white ">
          <p 
            className={`z-60 text-[#fdffffc7]
            text-6xl transition-all duration-300
            translate-y-2.5 font-bold
            min-[375px]:text-7xl
            min-[375px]:translate-y-3
            min-[425px]:text-[80px]
            min-[425px]:translate-y-3.5
            min-[500px]:text-[90px]
            min-[500px]:translate-y-4
            min-[640px]:text-[100px]
            min-[640px]:translate-y-4.5
            min-[724px]:text-[110px]
            min-[724px]:translate-y-5
            min-[768px]:text-[130px]
            min-[768px]:translate-y-5.5
            min-[800px]:text-[140px]
            min-[800px]:translate-y-6
            min-[850px]:text-[150px]
            min-[850px]:translate-y-6.5
            min-[900px]:text-[160px]
            min-[900px]:translate-y-7
            min-[950px]:text-[180px]
            min-[950px]:translate-y-7.5
            min-[1024px]:text-[200px]
            min-[1024px]:translate-y-8
            IMHAVINGFUNLOLIGNOREMYCODE
          `}
          >
          GAMES
          </p>

          <img src="/images/games-mier.png" className="absolute bottom-0 z-50 -right-20 md:-right-30 origin-bottom-right scale-80 nonsel pointer-events-none" />
        </div>

        {/* INTRO */}
        <div className="z-60 flex md:flex-row flex-col h-full gap-4 md:gap-8 text-xs sm:text-sm py-4 px-4 md:px-8 bg-[#d0d3d8] text-black">
          <div className="md:w-[70%] text-justify">
            <p className="rounded-md text-xl sm:text-2xl text-center font-bold">welcome to my games page !</p>
            <p>i'll be making more eventually as time passes, it will be simple ones for now though! if you'd like to see updates or know more about my 'serious' projects, check out my blog. or check out my characters to know more about their lore, which i will portray in my future games!</p>
            <br />
            <p>currently, i don't have much to show off except for these two games lol</p>
            <p>(this page will be polished and updated once i become a 'proper' game dev)</p>
          </div>
          <div className="md:w-[30%] w-[70%] self-center flex flex-col rounded-md bg-red-500 text-white p-4 text-center">
            <p className="font-bold">it should be noted that these two games are not optimized for phones.</p>
            <br />
            <p>the fishing game will not work especially,
            unless you have those keyboards for phones like a weirdo lol</p>
          </div>
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

          <p className="self-center">...</p>

          <div 
            className={`
              transition-all duration-500
              flex items-center justify-center
              h-16 overflow-hidden w-full
              rounded-2xl bg-gray-200 text-xs sm:text-sm
            `}
          >
            
            <p>more coming soon enough</p>


          </div>

        </div>
      </div>

      <Footer />

    </div>
  )
}

export default GamesComponent;