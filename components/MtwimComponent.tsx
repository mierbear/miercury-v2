"use client";
import Marquee from "react-fast-marquee";
import { Gloock } from "next/font/google";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import supabase from "@/lib/supabaseClient";

const rozha = Gloock({
  weight: "400",
  subsets: ["latin"],
})

export default function Mtwim() {

  const [chapters, setChapters] = useState<string[]>([]);
  const [currentChapter, setCurrentChapter] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<string>("about");
  const [pages, setPages] = useState<string[]>([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const comicRef = useRef<any>(null);
  const formattedChapter = String(currentChapter).padStart(3, '0');
  

  // FETCH CHAPTERS AMOUNT
  useEffect(() => {
    const fetchChapters = async () => {
      const { data, error } = await supabase
        .storage
        .from('mtwim')
        .list();

      if (error || !data) return;
      
      const chapters = data
        .filter(item => item.id === null)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(item => item.name)

      setChapters(chapters)
    };

    fetchChapters();
  }, [])

  // FETCH CHAPTER PAGES
  useEffect(() => {
    const fetchPages = async () => {
      setPagesLoading(true);
      const { data, error } = await supabase
        .storage
        .from('mtwim')
        .list(`chapter-${formattedChapter}`);

      if (error || !data) return;

      const urls = data
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(file => {
          const { data: urlData } = supabase
            .storage
            .from('mtwim')
            .getPublicUrl(`chapter-${formattedChapter}/${file.name}`);
          return urlData.publicUrl;
        });

      setPages(urls);
      setPagesLoading(false);
    };

    fetchPages();
  }, [currentChapter]);

  const [fullscreen, setFullscreen] = useState(false);
  const [scrollMode, setScrollMode] = useState(true);
  const [zoom, setZoom] = useState(80);

  const toggleFullscreen = () => {
    // if (!document.fullscreenElement) {
    //   document.documentElement.requestFullscreen();
    //   setFullscreen(true);
    // } else {
    //   setFullscreen(false);
    // }

    setFullscreen(!fullscreen);
    if (fullscreen) {
      setZoom(80);
    } else {
      setZoom(40);
    }
  };

  return (
    <div className="min-w-screen min-h-screen max-w-screen flex flex-col items-center">

      {/* TOP */}
      <div className={`flex flex-col justify-center items-center h-screen w-full`}>
        <div className="bg-[#9eadb9] h-[16%] w-full"></div>
        <div className="bg-[#90b5d3] h-[68%] w-full relative items-center justify-center flex">

          {/* MARQUEE */}
          <Marquee speed={30} className="absolute pointer-events-none nonsel" >
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
              onClick={() => {
                setCurrentPage("comic");
                setTimeout(() => {
                  comicRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 0);
              }}
            >
              READ PROLOGUE
            </p>
          </div>
          
        </div>

        <div className="bg-[#000000] h-[16%] w-full z-60"></div>
      </div>

      <div
        className={`
        ${currentPage === "comic" ? "h-0" : "min-h-screen"}
        ${fullscreen ? "w-full" : "w-7xl"}
        bg-white flex flex-col items-center
        `}
      >

        {/* ABOUT */}
        {currentPage === "about" && (
          <div className="flex flex-col items-center">
            <p>about</p>
          </div>
        )}

        {/* COMIC */}
        {currentPage === "comic" && (
          <div
            className={`flex relative w-full bg-gray-50`}
            ref={comicRef}
          >
            
            {/* PAGES */}
            <div className={`flex flex-col items-center relative bg-black ${fullscreen ? "w-full" : "w-[75%]"}`}>
              {pagesLoading && (
                <div className="z-10 flex items-center justify-center absolute bg-black w-full h-full">
                  <p className="animate-pulse fixed inset-0">loading...</p>
                </div>
              )}

              {pages.map((src, i) => (  
                <Image
                  key={i}
                  src={src}
                  alt={`Page ${i + 1}`}
                  width={800}
                  height={1200}
                  style={{ width: `${zoom}%`, height: "auto" }}
                />
              ))}

              {pagesLoading || (
                <div className="h-40 bg-black w-full">
                </div>
              )}
            </div>
            
            {/* RIGHT PANEL */}
            <div 
              className={`
              bg-gray-300 ${fullscreen 
              ? "fixed bottom-0 w-screen flex flex-row" 
              : "w-[25%] sticky top-0 h-screen overflow-y-auto p-4 gap-4 flex flex-col items-center"}
              `}
            >
              {/* CHAPTERS */}
              <div className="grid grid-rows bg-gray-400 w-full">
                <p>you're currently reading chapter {currentChapter}</p>
                {chapters.map((chapter, i) => (
                  <p
                    key={chapter}
                    className={`cursor-pointer ${currentChapter === i + 1 && "pointer-events-none"}`}
                    onClick={() => {
                      setCurrentChapter(i + 1)
                      setTimeout(() => {
                        comicRef.current?.scrollIntoView({ behavior: "smooth" });
                      }, 0);
                    }}
                  >
                    chapter {i + 1}
                  </p>
                ))}
              </div>

              {/* ZOOM */}
              <div>
                <input 
                type="range"
                min={20}
                max={100}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
                />
                <p>zoom: {zoom}%</p>
              </div>
              
              {/* CONTROLS */}
              <div className={`grid grid-cols-2 h-20 px-2 nonsel`}>
                <img
                  className="cursor-pointer h-20"
                  src={scrollMode ? "/images/book.svg" : "/images/scroll.svg"}
                  onClick={() => setScrollMode(!scrollMode)}
                />
                <img
                  className="cursor-pointer h-20 scale-80 origin-right"
                  src={fullscreen ? "/images/minscreen.svg" : "/images/fullscreen.svg"}
                  onClick={() => toggleFullscreen()}
                />
              </div>

              <div 
              className={`
                border border-black flex-col flex bg-white/80
                items-center justify-center
                p-4 gap-2 mt-auto
                nonsel duration-200
                ${fullscreen && "hidden"}
              `}
              >
                <p className="text-center font-bold">currently this is just a sketch of how reading the comic would look and feel like!</p>
                <p className="text-center">i'll eventually draw these into full sized pages and much more in the future.</p>
              </div>
            </div>
            
          </div>
        )}

      </div>

    </div>
  )
}