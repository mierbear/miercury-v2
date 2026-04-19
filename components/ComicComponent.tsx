"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Comic({ initialChapter = 1 }: { initialChapter?: number }) {

  const [currentChapter, setCurrentChapter] = useState(initialChapter);
  const [chapters, setChapters] = useState<string[]>([]);
  const [pages, setPages] = useState<string[]>([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const comicRef = useRef<any>(null);
  const formattedChapter = String(currentChapter).padStart(3, '0');
  const router = useRouter();
  const [isPhone, setIsPhone] = useState(false);
  
  useEffect(() => {
    setIsPhone(window.matchMedia("(pointer: coarse)").matches);
  }, []);

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

  const [openChapters, setOpenChapters] = useState(false);
  const [scrollMode, setScrollMode] = useState(true);
  const [hidePanel, setHidePanel] = useState(false);

  return (
    <div
      className={`flex flex-col items-center relative w-full bg-black`}
      ref={comicRef}
    >
      
      {/* PAGES */}
      <div className="flex flex-col items-center relative bg-black w-full overflow-y-scroll h-screen">
        
        {pagesLoading && (
          <div className="z-10 flex items-center justify-center absolute bg-black w-full h-full">
            <p className="animate-pulse fixed inset-0">loading...</p>
          </div>
        )}

        {pages.map((src, i) => (
          <div key={i} className={`snap-start w-full flex justify-center ${i === pages.length - 1 && "pb-16"}`}>
            <Image
              src={src}
              alt={`Page ${i + 1}`}
              width={800}
              height={1200}
              className="w-175 max-w-screen h-auto nonsel pointer-events-none"
            />
          </div>
        ))}
          
      </div>
      
      {/* PANEL */}
      <div 
        className={`
        bg-gray-300 h-16 z-10
        fixed bottom-0 w-screen
        flex flex-row items-center px-4
        transition-opacity duration-300
        ${hidePanel ? "opacity-0" : "opacity-100"}
        `}
        onMouseEnter={() => {
          if (!isPhone) {
            setHidePanel(false)
          }
        }}
        onMouseLeave={() => {
          if (!isPhone) {
            setHidePanel(true)
            setOpenChapters(false)
          }
        }}
      >
        {/* CHAPTERS */}
        <div className={`relative w-80 mr-auto z-100`}>

          <div
            className="bg-gray-500 cursor-pointer p-2 text-center"
            onClick={() => setOpenChapters(prev => !prev)}
          >
            Chapter {currentChapter}
          </div>

          <div
            className={`
              absolute left-0 w-full
              bg-gray-400 overflow-hidden
              bottom-full
              ${openChapters ? "opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
            `}
          >
            {chapters.map((chapter, i) => (
              <p
                key={chapter}
                className={`
                  cursor-pointer p-2 text-center
                  hover:bg-gray-500
                  ${currentChapter === i + 1 && "bg-gray-600 pointer-events-none"}
                `}
                onClick={() => {
                  setCurrentChapter(i + 1);
                  setOpenChapters(false);
                  router.push(`/mtwim/read/${i + 1}`);
                }}
              >
                Chapter {i + 1}
              </p>
            ))}
          </div>
        </div>

        {/* CONTROLS */}
        <div className={`grid grid-cols-3 h-16 px-2 nonsel place-items-center`}>
          <img
            src="/images/minus.svg"
            className="cursor-pointer h-8"
            onClick={() => console.log(`zoom out`) }
          />
          <img
            src="/images/plus.svg"
            className="cursor-pointer h-8"
            onClick={() => console.log(`zoom in`) }
          />
          <img
            className="cursor-pointer h-14"
            src={scrollMode ? "/images/book.svg" : "/images/scroll.svg"}
            onClick={() => setScrollMode(!scrollMode)}
          />
        </div>

      </div>
      
    </div>
  )
}