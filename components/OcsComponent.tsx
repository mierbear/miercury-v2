"use client";
import { useEffect, useState, useRef } from "react";

export default function Ocs() {

  const [hoveredMier, setHoveredMier] = useState("");

  return (
    <div className="w-screen max-w-screen justify-center align-center items-center flex flex-col">

      {/* MIERS */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col relative bg-[#d1f8ff]">
        
        <div
          className={`
            grid w-full h-full transition-grid duration-1000
            ${hoveredMier === "icemage" ? "grid-cols-[3fr_1fr_1fr]" :
              hoveredMier === "angel" ? "grid-cols-[1fr_3fr_1fr]" :
              hoveredMier === "tyrant" ? "grid-cols-[1fr_1fr_3fr]" :
              "grid-cols-[1fr_1fr_1fr]"
            }
          `}
        >

          {/* ICE MAGE */}
          <div
            className="w-full h-full flex justify-center items-end cursor-pointer"
            onMouseEnter={() => setHoveredMier("icemage")}
            onMouseLeave={() => setHoveredMier("")}
          >
            <img
              className={`
                object-cover absolute z-22 transition-transform duration-1200
                nonsel pointer-events-none origin-top
                ${hoveredMier === "icemage" ? "z-55 scale-110 translate-x-[-5%] duration-1400" :
                  hoveredMier === "tyrant" && "translate-x-[-25%]"
                }
              `}
              src="/images/ocs/mierintro-icemage.png"
            />
          </div>

          {/* ANGEL */}
          <div
            className="w-full h-full flex justify-center items-end cursor-pointer"
            onMouseEnter={() => setHoveredMier("angel")}
            onMouseLeave={() => setHoveredMier("")}
          >
            <img
              className={`
                object-cover absolute z-33 transition-transform duration-800
                nonsel pointer-events-none origin-top
                ${hoveredMier === "icemage" ? "translate-x-[10%]" :
                  hoveredMier === "angel" ? "scale-110 duration-1400" :
                  hoveredMier === "tyrant" && "translate-x-[-10%]"
                }
              `}
              src="/images/ocs/mierintro-angel.png"
            />
          </div>

          {/* TYRANT */}
          <div
            className="w-full h-full flex justify-center items-end cursor-pointer"
            onMouseEnter={() => setHoveredMier("tyrant")}
            onMouseLeave={() => setHoveredMier("")}
          >
            <img
              className={`
                object-cover absolute z-11 transition-transform duration-1200
                nonsel pointer-events-none origin-top
                ${hoveredMier === "tyrant" ? "z-55 scale-110 translate-x-[5%] duration-1400" :
                  hoveredMier === "icemage" && "translate-x-[25%]"
                }
              `}
              src="/images/ocs/mierintro-tyrant.png"
            />
          </div>
        </div>

        <div className="absolute bottom-12 grid grid-cols-3 gap-4 max-w-screen z-99 bg-[#00000000]">
          <div
            className="aspect-square w-30 h-30 bg-white flex flex-col items-center justify-center nonsel cursor-pointer rounded-xl overflow-hidden"
            onMouseEnter={() => setHoveredMier("icemage")}
            onMouseLeave={() => setHoveredMier("")}
          >
            <img src="/images/ocs/mier-portrait-icemage.png" />
          </div>
          <div
            className="aspect-square w-30 h-30 bg-white flex flex-col items-center justify-center nonsel cursor-pointer rounded-xl overflow-hidden"
            onMouseEnter={() => setHoveredMier("angel")}
            onMouseLeave={() => setHoveredMier("")}
          >
            <img src="/images/ocs/mier-portrait-angel.png" />
          </div>
          <div
            className="aspect-square w-30 h-30 bg-white flex flex-col items-center justify-center nonsel cursor-pointer rounded-xl overflow-hidden"
            onMouseEnter={() => setHoveredMier("tyrant")}
            onMouseLeave={() => setHoveredMier("")}
          >
            <img src="/images/ocs/mier-portrait-tyrant.png" />
          </div>
        </div>

      </div>

      {/* KANIN */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col relative bg-[#e0f8b9] z-100">
        KANIN
      </div>

      {/* SKULLBOUND */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col relative bg-[#acaaa9] z-200">
        SKULLBOUND
      </div>

      {/* QUINCE */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col relative bg-[#9e937a] z-300">
        QUINCE
      </div>

      {/* SIMEON */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col relative bg-[#303a8d] z-400">
        SIMEON
      </div>

      {/* PIO */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col relative bg-[#413f3d] z-500">
        PIO
      </div>


    </div>
  )
}