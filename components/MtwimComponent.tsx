"use client";
import Marquee from "react-fast-marquee";
import { Gloock } from "next/font/google";
import { useEffect, useState } from "react";

const rozha = Gloock({
  weight: "400",
  subsets: ["latin"],
})

export default function Mtwim() {

  const [comicOpen, setComicOpen] = useState(false);
  
  const totalPages = 18; 
  const [currentPage, setCurrentPage] = useState(1);
  const formattedPage = String(currentPage).padStart(3, '0');

  useEffect(() => {
    if (!comicOpen) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
      } else {
        setCurrentPage(prev => Math.max(prev - 1, 1));
      }
    };

    const handleKeys = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setCurrentPage(prev => Math.max(prev - 1, 1));
          break;
        case "ArrowDown":
          setCurrentPage(prev => Math.min(prev + 1, totalPages));
          break;
        case "Escape":
          setComicOpen(false);
          break;
      }
    }

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("keydown", handleKeys);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeys);
    };
  }, [comicOpen]);

  const openComicHandler = () => {
    setCurrentPage(1);
    setComicOpen(true);
  }
  
  return (
    <div className="min-w-screen min-h-screen max-w-screen flex flex-col items-center">

      {/* TOP */}
      <div className={`${comicOpen && "hidden"} flex flex-col justify-center items-center h-screen w-full`}>
        <div className="bg-[#9eadb9] h-[16%] w-full"></div>
        <div className="bg-[#90b5d3] h-[68%] w-full relative items-center justify-center flex">

          {/* MARQUEE */}
          <Marquee speed={30} className="absolute" >
            <div className="flex items-center nonsel pointer-events-none">
              <p className={`text-[80vh] ${rozha.className} opacity-5`}>&nbsp;MAGE</p>
              <div className="h-[60vh] w-[60vh] flex slow-backwards-spin items-center justify-center">
                <p className="text-[60vh] text-white monospace opacity-30">❆</p>
              </div>
              <p className={`text-[80vh] ${rozha.className} opacity-5`}>MIER THE ICE</p>
            </div>
          </Marquee>

          {/* IMAGES */}
          <img src="/images/mtwim/frank.png" className="z-50 scale-70 origin-bottom-right nonsel pointer-events-none absolute  right-60 bottom-0 figure-breathe-slow" />
          <img src="/images/mtwim/mier.png"  className="z-50 scale-70 origin-bottom-right nonsel pointer-events-none absolute -right-20 bottom-0 figure-breathe-medium" />
          
          {/* CTA */}
          <div className="absolute h-full w-160 left-30 bg-black/30 z-70 flex gap-6 items-center justify-center flex-col">
            <p className="text-6xl font-bold text-center px-10  ">Mier: The Weakest Ice Mage</p>
            <p className="">sdfdsfdsfsdf</p>
            <p 
              className="px-12 py-8 text-xl bg-white rounded-2xl cursor-pointer"
              onClick={() => openComicHandler()}
            >
              READ PROLOGUE
            </p>
          </div>
          
        </div>

        <div className="bg-[#000000] h-[16%] w-full z-60"></div>
      </div>

      {/* COMIC */}
      <div className={`${comicOpen || "hidden"} flex flex-col justify-center items-center h-screen w-full bg-black z-10000 relative`}>
        <img src={`images/mtwim/${formattedPage}.png`} className="h-full nonsel pointer-events-none" />
        <p 
          className="text-6xl absolute text-white hover:text-blue-400 right-4 top-3 cursor-pointer duration-200"
          onClick={() => setComicOpen(false)}
          >🞮
        </p>
      </div>

      <div className={`${comicOpen && "hidden"} h-screen w-7xl bg-white flex flex-col items-center`}>
        CONTENT
      </div>

    </div>
  )
}