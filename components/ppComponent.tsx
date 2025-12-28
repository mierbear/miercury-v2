"use client";
import { Bodoni_Moda, Questrial } from "next/font/google"
import { use, useEffect, useRef, useState } from "react";
import gsap from "gsap";

const font = Bodoni_Moda({
  weight: "400",
  subsets: ["latin"],
})

const font2 = Questrial({
  weight: "400",
  subsets: ["latin"],
})

export default function Home() {
  const marqueeRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    gsap.fromTo(marqueeRef.current,
      { xPercent: 150 },
      { xPercent: -150, duration: 25, ease: "none", repeat: -1 }
    );
  }, [])

  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const [mierHover, setMierHover] = useState(false);

  const mierHoverHandler = () => {
    setMierHover(true);
  }
  
  const mierUnhoverHandler = () => {
    setMierHover(false);
  }

  const news = [`— the secret santa event is over, thank you to those who participated <3 check out the secret santa gallery to see the results! — have a merry christmas and a happy new year! —`];

  const [currentTab, setCurrentTab] = useState<"about" | "lore" | "characters">("about")
  
  return (
    <main className="min-w-screen min-h-screen flex flex-col z-50 bg-[#c1f8ff]">
      <div className="min-w-screen min-h-screen grid grid-cols-[20fr_60fr_20fr] z-50">
        <div className="invisible md:flex">
        </div>

        
        <div className="flex flex-col z-100 min-w-screen lg:min-w-[50vw]">
          <div className="flex flex-col justify-end pt-[10vh]">
            <h1 className={`${font.className} nonsel text-[#1a1d20] text-shadow-md text-6xl z-50 translate-y-1`}>
              PACIFIC <span className="text-red-600">🞨</span> PURGATORY
            </h1>
          </div>

          <div className="bg-[#c1f8ff]/50 min-h-[50vh] shadow-xl flex flex-col">
            
            {/* MARQUEE */}
            <div className="bg-[#1a1d20] overflow-x-hidden self-center w-full flex justify-center">
              <p 
                className={`${font2.className} bg-[#1a1d20] text-xs text-white inline-block whitespace-nowrap pb-0.5 pt-1`}
                ref={marqueeRef}
                style={{ opacity: ready ? 1 : 0 }}
              >
                {news}
              </p>
            </div>
            
            {/* CAROUSEL */}
            <div className="min-h-[40vh] max-h-[40vh] bg-black/50">

            </div>

            {/* TABS */}
            <div className="grid grid-cols-[1fr_4fr]">
              <div className="flex flex-col">
                <div className="grid grid-rows-1 pt-4">
                  
                  <button onClick={() => {setCurrentTab("about")}} className={`${font2.className} bg-white cursor-pointer rounded p-4 text-center m-4 mt-0`}>
                    About
                  </button>
                  
                  <button onClick={() => {setCurrentTab("characters")}} className={`${font2.className} bg-white cursor-pointer rounded p-4 text-center m-4 mt-0`}>
                    Characters
                  </button>

                  <button onClick={() => {setCurrentTab("lore")}} className={`${font2.className} bg-white cursor-pointer rounded p-4 text-center m-4 mt-0`}>
                    "Lore"
                  </button>
                  
                  <button className={`${font2.className} bg-white cursor-pointer rounded p-4 text-center m-4 mt-0`}>
                    Collabs
                  </button>
                  
                  <button className={`${font2.className} bg-white cursor-pointer rounded p-4 text-center m-4 mt-0`}>
                    News
                  </button>
                  
                  <button className={`${font2.className} bg-white cursor-pointer rounded p-4 text-center m-4 mt-0`}>
                    Submit Story
                  </button>
                
                </div>
                <div className="pt-[20vh] z-100">
                  <a 
                    href="https://mierbear.github.io/miercury/fish.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={mierHover ? "/images/mierfisheth2.png" : "/images/mierfisheth.png"}
                      className="origin-bottom-right relative scale-150 nonsel translate-y-[15%] z-100 cursor-pointer" 
                      onMouseEnter={mierHoverHandler}
                      onMouseLeave={mierUnhoverHandler}
                    />
                  </a>
                </div>
              </div>

              {/* CONTENT */}
              <div className="bg-white/20 flex flex-col items-center p-6">
                {currentTab === "about" && (
                  <div className="flex items-center text-center flex-col">
                    <h1 className={`${font2.className} text-3xl`}>About</h1>
                    <p className={`${font2.className}`}>Pacific Purgatory is a small online community of artists that I <i>somehow</i> managed to cultivate since May of 2023. </p>

                    <h1 className={`${font2.className} text-3xl pt-4`}>How to Join?</h1>
                    <p className={`${font2.className}`}>Join the drawpile.</p>

                    <h1 className={`${font2.className} text-3xl pt-4`}>Discord Server?</h1>
                    <p className={`${font2.className}`}>I gatekeep it. Come hang out in the drawpile enough and we will see if we like you :]</p>
                    
                  </div>
                )}
                {currentTab === "lore" && (
                  <p>lore</p>
                )}
                {currentTab === "characters" && (
                  <p>characters</p>
                )}
              </div>

            </div>

          </div>

        </div>

        <div className="invisible md:flex">
        </div>

      </div>

      <div className="bg-[#17191a] min-w-screen z-1">
        <footer className="relative z-1">
          <div className="bg-[#101113]/90 py-2 min-w-screen flex flex-col justify-center align-center items-center bottom-0 text-white text-xs">

            <p>Copyright © 2025 Miercury. All Rights Reserved.</p>
            <p>
              <a href="mailto:admin@miercury.com">admin@miercury.com</a>
            </p>

          </div>
        </footer>
      </div>
      <video autoPlay muted loop className="object-cover fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[120vw] min-h-[120vh] blur-[10px]">
        <source src="videos/pp.mp4" type="video/mp4" />
      </video>
    </main>
  );
}
