"use client";
import { useState, useRef, useEffect } from "react";

export default function QuotesComponent() {
  
  const introRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);

  const scrollToHandler = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="text-black bg-[#17191a] w-screen min-h-screen flex flex-col items-center justify-center relative">

      {/* INTRO */}
      <div
        className="flex items-center justify-center w-screen h-screen bg-[#dadfe1]"
        ref={introRef}
      >

        {/* TEXT */}
        <div
          className="flex items-center justify-center w-[40%] flex-col"
        >
          <p className="text-6xl">HELLO, IM</p>
          <p className="text-9xl">KYLE!</p>
        </div>

        {/* PFP */}
        <div
          className="flex items-center justify-center w-[40%]"
        >
          <div
            className="w-[60vh] h-[60vh] rounded-full bg-blue-500 flex items-center justify-center"
          >
            <img 
              src="/images/index/pfp.png"
              className={`
                w-[96%] h-[96%] rounded-full
              `}
              />
          </div>
        </div>

      </div>
      
      {/* INFO */}
      <div
        className="flex items-center justify-center w-screen h-screen bg-[#dadfe1]"
        ref={infoRef}
      >
        
      </div>

      {/* PROJECTS */}
      <div
        className="flex items-center justify-center w-screen h-screen bg-[#dadfe1]"
        ref={projectsRef}
      >
        PROJECTS
      </div>

      {/* EXPERIENCE */}
      <div
        className="flex items-center justify-center w-screen h-screen bg-[#dadfe1]"
        ref={experienceRef}
      >
        EXPERIENCE
      </div>

      {/* NAVIGATION */}
      <div
        className={`
          fixed bottom-4 text-xl px-4 py-2 bg-white/80 rounded-3xl
          flex gap-4 nonsel
        `}
      >
        <p className="cursor-pointer" onClick={() => scrollToHandler(introRef)}>Intro</p>
        <p>✦</p>
        <p className="cursor-pointer" onClick={() => scrollToHandler(infoRef)}>Info/Stack</p>
        <p>✦</p>
        <p className="cursor-pointer" onClick={() => scrollToHandler(projectsRef)}>Projects</p>
        <p>✦</p>
        <p className="cursor-pointer" onClick={() => scrollToHandler(experienceRef)}>Experience</p>
      </div>

    </div>
  );
}