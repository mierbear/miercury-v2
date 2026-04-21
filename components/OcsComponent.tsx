"use client";
import { userAgent } from "next/server";
import { useEffect, useState, useRef } from "react";

export default function Ocs() {

  const [hoveredMier, setHoveredMier] = useState("");
  const [selectedMier, setSelectedMier] = useState("");
  const miersRef = useRef<HTMLDivElement | null>(null);
  const mierAngelRef = useRef<HTMLImageElement | null>(null);

  const miersClickHandler = () => {
    if (!miersRef.current) return;

    miersRef.current.style.pointerEvents = "none";
    setTimeout(() => {
      miersRef.current!.style.pointerEvents = "auto";
    }, 1200);
  }

  const mierSelectHandler = (mierType: string) => {
    if (!mierAngelRef.current) return;
    miersClickHandler();
    setHoveredMier("");

    if (selectedMier === mierType) {
      setSelectedMier("")
    } else if (mierType === "icemage" && selectedMier === "tyrant") {
      setSelectedMier(mierType)
      mierAngelRef.current.style.opacity = "0";
      setTimeout(() => {
        mierAngelRef.current!.style.opacity = "1";
      }, 1200);
    } else if (mierType === "tyrant" && selectedMier === "icemage") {
      setSelectedMier(mierType)
      mierAngelRef.current.style.opacity = "0";
      setTimeout(() => {
        mierAngelRef.current!.style.opacity = "1";
      }, 1200);
    } else if (selectedMier === "angel" && mierType) {
      setSelectedMier(mierType)
      mierAngelRef.current.style.opacity = "0";
      setTimeout(() => {
        mierAngelRef.current!.style.opacity = "1";
      }, 1200);
    } else if (mierType === "angel" && selectedMier) {
      setSelectedMier(mierType)
      mierAngelRef.current.style.opacity = "0";
      setTimeout(() => {
        mierAngelRef.current!.style.opacity = "1";
      }, 1200);
    } else {
      setSelectedMier(mierType)
    }
  }

  return (
    <div className="w-screen max-w-screen justify-center align-center items-center flex flex-col">

      {/* MIERS */}
      <div
        className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col relative bg-[#d1f8ff]"
        ref={miersRef}
      >
         
        {/* DECORS */}
        <div
          className="flex items-center justify-center"
        >

          {/* DECO - ICE MAGE */}
          <div
            className={`
              absolute bottom-0 right-[2vw] h-screen overflow-hidden z-99 transition-[translate] duration-1400 nonsel pointer-events-none
              ${selectedMier === "icemage" ? "" : "translate-x-[200%]"}
            `}
          >
            <img 
              src={`/images/ocs/mier-icemage-deco.png`}
              className="h-full w-auto max-w-none nonsel pointer-events-none"
            />
          </div>

          {/* DECO - TYRANT */}
          <div
            className={`
              absolute bottom-0 left-0 h-screen overflow-hidden z-100 transition-opacity duration-600 nonsel pointer-events-none
              ${selectedMier === "tyrant" ? "opacity-100" : "opacity-0"}
            `}
          >
            <img 
              src={`/images/ocs/mier-tyrant-deco.png`}
              className="h-full w-auto max-w-none nonsel pointer-events-none"
            />
          </div>

        </div>

        {/* CLOSE-UPS */}
        <div className="flex items-center justify-center">

          {/* ICEMAGE */}
          <div
            className={`
              absolute bottom-0 h-screen overflow-hidden z-88 transition-[translate] duration-1200 cursor-pointer left-[5vw]
              ${selectedMier === "icemage" ? "" : "-translate-x-full"}
            `}
            onClick={() => mierSelectHandler("")}
          >
            <img 
              src={`/images/ocs/mier-icemage.png`}
              className="h-full w-auto max-w-none nonsel pointer-events-none"
            />
          </div>

          {/* ANGEL */}
          <div
            className={`
              absolute bottom-0 h-screen overflow-hidden z-88 transition-[translate] duration-1200 cursor-pointer
              ${selectedMier === "angel" ? "" : "translate-y-full"}
            `}
            onClick={() => mierSelectHandler("")}
          >
            <img 
              src={`/images/ocs/mier-angel.png`}
              className="h-full w-auto max-w-none nonsel pointer-events-none"
            />
          </div>

          {/* TYRANT */}
          <div 
            className={`
              absolute bottom-0 h-screen overflow-hidden z-88 transition-[translate] duration-1200 cursor-pointer right-[5vw]
              ${selectedMier === "tyrant" ? "" : "translate-x-full"}
            `}
            onClick={() => mierSelectHandler("")}
          >
            <img 
              src={`/images/ocs/mier-tyrant.png`}
              className="h-full w-auto max-w-none nonsel pointer-events-none"
            />
          </div>

        </div>

        {/* GRIDS */}
        <div
          className={`
            grid w-full h-full transition-grid 
            ${selectedMier ? "duration-1200" : "duration-600"}
            ${hoveredMier === "icemage" ? "grid-cols-[3fr_1fr_1fr]" :
              hoveredMier === "angel" ? "grid-cols-[1fr_1.5fr_1fr]" :
              hoveredMier === "tyrant" ? "grid-cols-[1fr_1fr_3fr]" :
              "grid-cols-[1fr_1fr_1fr]"
            }
          `}
        >

          {/* ICE MAGE */}
          <div
            className={`
              h-screen flex justify-center items-end cursor-pointer
            `}
            onMouseEnter={() => {
              if (!selectedMier) setHoveredMier("icemage")
            }}
            onMouseLeave={() => setHoveredMier("")}
            onClick={() => mierSelectHandler("icemage")}
          >
            <img
              className={`
                h-full object-cover absolute z-22 max-w-none transition-transform duration-1200
                nonsel pointer-events-none origin-top
                ${!selectedMier &&
                  hoveredMier === "icemage" ? "z-55 scale-110 translate-x-[-5%]" :
                  hoveredMier === "tyrant" && "translate-x-[-25%]"
                }
                ${selectedMier === "icemage" ? "-translate-x-full"
                  : selectedMier === "" ? ""
                  : "-translate-x-full"
                }
              `}
              src="/images/ocs/mierintro-icemage.png"
            />
          </div>

          {/* ANGEL */}
          <div
            className={`
              h-screen flex justify-center items-end cursor-pointer
            `}
            onMouseEnter={() => {
              if (!selectedMier) setHoveredMier("angel")
            }}
            onMouseLeave={() => setHoveredMier("")}
            onClick={() => mierSelectHandler("angel")}
            ref={mierAngelRef}
          >
            <img
              className={`
                h-full object-cover absolute z-33 max-w-none transition-transform
                nonsel pointer-events-none origin-top duration-1200
                ${!selectedMier &&
                  hoveredMier === "icemage" ? "translate-x-[10%]" :
                  hoveredMier === "angel" ? "scale-110" :
                  hoveredMier === "tyrant" && "translate-x-[-10%]"
                }
                ${selectedMier === "angel" ? "translate-y-full"
                  : selectedMier === "icemage" ? "translate-x-[180%]"
                  : selectedMier === "tyrant" ? "translate-x-[-180%]"
                  : selectedMier === ""
                }
              `}
              src="/images/ocs/mierintro-angel.png"
            />
          </div>

          {/* TYRANT */}
          <div
            className={`
              h-screen flex justify-center items-end cursor-pointer
            `}
            onMouseEnter={() => {
              if (!selectedMier) setHoveredMier("tyrant")
            }}
            onMouseLeave={() => setHoveredMier("")}
            onClick={() => mierSelectHandler("tyrant")}
          >
            <img
              className={`
                h-full object-cover absolute z-11 max-w-none transition-transform duration-1200
                nonsel pointer-events-none origin-top
                ${!selectedMier &&
                  hoveredMier === "tyrant" ? "z-55 scale-110 translate-x-[5%]" :
                  hoveredMier === "icemage" && "translate-x-[25%]"
                }
                ${selectedMier === "tyrant" ? "translate-x-full"
                  : selectedMier === "" ? ""
                  : "translate-x-full"
                }
              `}
              src="/images/ocs/mierintro-tyrant.png"
            />
          </div>

        </div>

        {/* PORTRAITS */}
        <div className="absolute bottom-12 grid grid-cols-3 gap-4 max-w-screen z-99 bg-[#00000000]">
          <div
            className="aspect-square w-30 h-30 bg-white flex flex-col items-center justify-center nonsel cursor-pointer rounded-xl overflow-hidden"
            onMouseEnter={() => {
              if (!selectedMier) setHoveredMier("icemage")
            }}
            onClick={() => mierSelectHandler("icemage")}
          >
            <img
              src="/images/ocs/mier-portrait-icemage.png"
              className="nonsel pointer-events-none"  
            />
          </div>
          <div
            className="aspect-square w-30 h-30 bg-white flex flex-col items-center justify-center nonsel cursor-pointer rounded-xl overflow-hidden"
            onMouseEnter={() => {
              if (!selectedMier) setHoveredMier("angel")
            }}
            onClick={() => mierSelectHandler("angel")}
          >
            <img
              src="/images/ocs/mier-portrait-angel.png"
              className="nonsel pointer-events-none"  
            />
          </div>
          <div
            className="aspect-square w-30 h-30 bg-white flex flex-col items-center justify-center nonsel cursor-pointer rounded-xl overflow-hidden"
            onMouseEnter={() => {
              if (!selectedMier) setHoveredMier("tyrant")
            }}
            onClick={() => mierSelectHandler("tyrant")}
          >
            <img
              src="/images/ocs/mier-portrait-tyrant.png"
              className="nonsel pointer-events-none"  
            />
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