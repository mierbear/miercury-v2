"use client";
import { useEffect, useState, useRef } from "react";

export default function Ocs() {

  const [selectedMier, setSelectedMier] = useState("");

  return (
    <div className="w-screen max-w-screen justify-center align-center items-center flex flex-col">

      {/* MIERS */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col bg-[#d1f8ff]">
        
        <div
          className={`
            grid w-full h-full transition-grid duration-1000
            ${selectedMier === "icemage" ? "grid-cols-[3fr_1fr_1fr]" :
              selectedMier === "angel" ? "grid-cols-[1fr_3fr_1fr]" :
              selectedMier === "tyrant" ? "grid-cols-[1fr_1fr_3fr]" :
              "grid-cols-[1fr_1fr_1fr]"
            }
          `}
        >
          <div
            className="w-full h-full flex justify-center items-end"
            onMouseEnter={() => setSelectedMier("icemage")}
            onMouseLeave={() => setSelectedMier("")}
          >
            <img
              className={`
                object-cover absolute z-22 transition-[translate] duration-1200
                nonsel pointer-events-none
                ${selectedMier === "icemage" ? "z-55" :
                  selectedMier === "tyrant" && "translate-x-[-25%]"
                }
              `}
              src="/images/ocs/mierintro-icemage.png"
            />
          </div>
          <div
            className="w-full h-full flex justify-center items-end"
            onMouseEnter={() => setSelectedMier("angel")}
            onMouseLeave={() => setSelectedMier("")}
          >
            <img
              className={`
                object-cover absolute z-33 transition-[translate] duration-800
                nonsel pointer-events-none
                ${selectedMier === "icemage" ? "translate-x-[10%]" :
                  selectedMier === "tyrant" && "translate-x-[-10%]"
                }
              `}
              src="/images/ocs/mierintro-angel.png"
            />
          </div>
          <div
            className="w-full h-full flex justify-center items-end"
            onMouseEnter={() => setSelectedMier("tyrant")}
            onMouseLeave={() => setSelectedMier("")}
          >
            <img
              className={`
                object-cover absolute z-11 transition-[translate] duration-1200
                nonsel pointer-events-none
                ${selectedMier === "tyrant" ? "z-55" :
                  selectedMier === "icemage" && "translate-x-[25%]"
                }
              `}
              src="/images/ocs/mierintro-tyrant.png"
            />
          </div>
        </div>


      </div>

      {/* KANIN */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col bg-[#e0f8b9]">
        KANIN
      </div>

      {/* SKULLBOUND */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col bg-[#acaaa9]">
        SKULLBOUND
      </div>

      {/* QUINCE */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col bg-[#9e937a]">
        QUINCE
      </div>

      {/* SIMEON */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col bg-[#303a8d]">
        SIMEON
      </div>

      {/* PIO */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col bg-[#413f3d]">
        PIO
      </div>


    </div>
  )
}