"use client";
import { userAgent } from "next/server";
import { useEffect, useState, useRef } from "react";

export default function Ocs() {

  const [hoveredMier, setHoveredMier] = useState("");
  const [selectedMier, setSelectedMier] = useState("");
  const blockerRef = useRef<HTMLDivElement | null>(null);
  const mierAngelRef = useRef<HTMLImageElement | null>(null);
  const bulletHoleRef = useRef<HTMLDivElement | null>(null);

  const blockHandler = () => {
    if (!blockerRef.current) return;

    blockerRef.current.style.display = "block";
    setTimeout(() => {
      blockerRef.current!.style.display = "none";
    }, 1200);
  }

  const mierSelectHandler = (mierType: string) => {
    if (!mierAngelRef.current) return;
    blockHandler();
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

    // TYRANT CONDITION
    if (mierType === "tyrant" && selectedMier !== "tyrant") {
      console.log("BAM PEWPEW")
    }

  }

  return (
    <div className="w-screen max-w-screen align-center flex flex-col bg-[#879da7] relative">
      
      {/* BLOCKER */}
      <div
        className="fixed w-full h-full bg-[#00000000] z-1000 hidden"
        ref={blockerRef}
      >
      </div>

      {/* MIERS */}
      <div
        className={`
          w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col relative transition-colors duration-600
          ${selectedMier === "angel" ? "bg-[#0e6188]"
            : selectedMier === "icemage" ? "bg-[#a1c9da]"
            : selectedMier === "tyrant" ? "bg-[#6e1717]"
            : ""
          }
          ${hoveredMier === "angel" ? "bg-[#0e6188]/30"
            : hoveredMier === "icemage" ? "bg-[#a1c9da]/30"
            : hoveredMier === "tyrant" ? "bg-[#6e1717]/30"
            : ""
          }
        `}
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
              absolute bottom-0 left-0 h-screen overflow-hidden z-100 transition-opacity duration-50 nonsel pointer-events-none opacity-0
            `}
            ref={bulletHoleRef}
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

        {/* INTROS */}
        <div
          className={`
            grid w-full h-full transition-grid 
            ${selectedMier ? "duration-1200" : "duration-600"}
            ${hoveredMier === "icemage" ? "grid-cols-[1.5fr_1fr_1fr]" :
              hoveredMier === "angel" ? "grid-cols-[1fr_1.5fr_1fr]" :
              hoveredMier === "tyrant" ? "grid-cols-[1fr_1fr_1.5fr]" :
              "grid-cols-[1fr_1fr_1fr]"
            }
          `}
        >

          {/* ICE MAGE */}
          <div
            className={`
              h-screen flex justify-center items-end cursor-pointer
            `}
          >
            <img
              className={`
                h-full object-cover absolute z-22 max-w-none transition-transform duration-1200
                nonsel pointer-events-none origin-top
                ${!selectedMier &&
                  hoveredMier === "icemage" ? "z-55" :
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
          >
            <img
              className={`
                h-full object-cover absolute z-11 max-w-none transition-transform duration-1200
                nonsel pointer-events-none origin-top
                ${!selectedMier &&
                  hoveredMier === "tyrant" ? "z-55" :
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

        {/* MIER INFO */}
        <div
          className={`
            absolute grid h-screen w-screen z-99
            transition-all duration-600
            ${selectedMier === "icemage" ? "grid-cols-[1.75fr_1fr_0.25fr]"
            : selectedMier === "angel" ?   "grid-cols-[0.25fr_1fr_1.75fr]"
            : selectedMier === "tyrant" ?  "grid-cols-[0.25fr_1fr_1.75fr]"
            : "grid-cols-[1fr_1fr_1fr]"
            }
          `}
        >
          
          <div
            className="w-full h-full cursor-pointer"
            onMouseEnter={() => {
              if (!selectedMier) setHoveredMier("icemage")
            }}
            onMouseLeave={() => setHoveredMier("")}
            onClick={() => {
              if (!selectedMier) {
                mierSelectHandler("icemage")
              } else {
                mierSelectHandler("")
              }
            }}
          >
          </div>
          
          {/* INFO */}
          <div 
            className={`
              w-full h-full relative transition-colors
              ${selectedMier ? "bg-black/20 duration-1200" : "bg-[#00000000] duration-200 cursor-pointer"}
            `}
            onMouseEnter={() => {
              if (!selectedMier) setHoveredMier("angel")
            }}
            onMouseLeave={() => setHoveredMier("")}
            onClick={() => {
              if (!selectedMier) {
                mierSelectHandler("angel")
              } else {
                return
              }
            }}
          >
            
            {/* PORTRAITS */}
            <div
              className={`
                absolute grid left-1/2 transform h-[14%] w-[62%] min-w-80
                -translate-x-1/2 bottom-8 max-w-screen
                border border-black rounded-md overflow-hidden 
                transition-all duration-600
                ${!selectedMier && "nonsel pointer-events-auto"}
                ${selectedMier === "icemage" ? "grid-cols-[1.2fr_1fr_1fr]"
                : selectedMier === "angel" ?   "grid-cols-[1fr_1.2fr_1fr]"
                : selectedMier === "tyrant" ?  "grid-cols-[1fr_1fr_1.2fr]"
                : "grid-cols-[1fr_1fr_1fr]"
                }
              `}
            >

              <div
                className={`
                  transition-all duration-300 shadow-2xl
                  flex flex-col items-center
                  justify-center nonsel cursor-pointer overflow-hidden
                  ${selectedMier === "icemage" ? " saturate-100 opacity-100" : "saturate-20"}
                  ${hoveredMier === "icemage" ? "opacity-100 " : "opacity-40 hover:opacity-100 "}
                `}
                onMouseEnter={() => {
                  if (!selectedMier) setHoveredMier("icemage")
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  mierSelectHandler("icemage")
                }}
              >
                <img
                  src="/images/ocs/mier-portrait-icemage.png"
                  className={`
                    nonsel pointer-events-none transition-scale duration-300 min-h-full min-w-full object-cover
                    ${hoveredMier === "icemage" && "scale-110"}
                    ${selectedMier === "icemage" && "scale-110"}
                  `}
                />
              </div>
              <div
                className={`
                  transition-all duration-300 shadow-2xl
                  flex flex-col items-center
                  justify-center nonsel cursor-pointer overflow-hidden
                  ${selectedMier === "angel" ? " saturate-100 opacity-100" : "saturate-20"}
                  ${hoveredMier === "angel" ? "opacity-100 " : "opacity-40 hover:opacity-100 "}
                `}
                onMouseEnter={() => {
                  if (!selectedMier) setHoveredMier("angel")
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  mierSelectHandler("angel")
                }}
              >
                <img
                  src="/images/ocs/mier-portrait-angel.png"
                  className={`
                    nonsel pointer-events-none transition-scale duration-300 min-h-full min-w-full object-cover
                    ${hoveredMier === "angel" && "scale-110"}
                    ${selectedMier === "angel" && "scale-110"}
                  `}
                />
              </div>
              <div
                className={`
                  transition-all duration-300 shadow-2xl
                  flex flex-col items-center
                  justify-center nonsel cursor-pointer overflow-hidden
                  ${selectedMier === "tyrant" ? " saturate-100 opacity-100" : "saturate-20"}
                  ${hoveredMier === "tyrant" ? "opacity-100 " : "opacity-40 hover:opacity-100 "}
                `}
                onMouseEnter={() => {
                  if (!selectedMier) setHoveredMier("tyrant")
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  mierSelectHandler("tyrant")
                }}
              >
                <img
                  src="/images/ocs/mier-portrait-tyrant.png"
                  className={`
                    nonsel pointer-events-none transition-scale duration-300 min-h-full min-w-full object-cover
                    ${hoveredMier === "tyrant" && "scale-110"}
                    ${selectedMier === "tyrant" && "scale-110"}
                  `}
                />
              </div>
            </div>

          </div>
          
          <div
            className="w-full h-full cursor-pointer"
            onMouseEnter={() => {
              if (!selectedMier) setHoveredMier("tyrant")
            }}
            onMouseLeave={() => setHoveredMier("")}
            onClick={() => {
              if (!selectedMier) {
                mierSelectHandler("tyrant")
              } else {
                mierSelectHandler("")
              }
            }}
          >
          </div>

        </div>

      </div>

      {/* KANIN */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col relative bg-[#e0f8b9] z-111">
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