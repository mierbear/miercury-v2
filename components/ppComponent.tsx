"use client";
import { Bodoni_Moda, Questrial } from "next/font/google"
import { use, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Tooltip from "@/components/tooltipComponent";

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
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const mierHoverHandler = () => {
    setMierHover(true);
    setTooltipVisible(true);
  }
  
  const mierUnhoverHandler = () => {
    setMierHover(false);
    setTooltipVisible(false);
  }

  const news = [`— the secret santa event is over, thank you to those who participated <3 check out the secret santa gallery to see the results! — have a merry christmas and a happy new year! —`];

  const [currentTab, setCurrentTab] = useState<"about" | "lore" | "characters" | "home" | "history">("about")
  
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


            <div className="grid grid-cols-[1fr_4fr]">

               {/* LEFT COL */}
              <div className="flex flex-col justify-between">

                {/* TABS */}
                <div className="grid grid-rows-1 pt-4">
                  
                  <button onClick={() => {setCurrentTab("home")}} className={`${font2.className} bg-white cursor-pointer rounded p-4 text-center m-4 mt-0`}>
                    Home
                  </button>

                  <button onClick={() => {setCurrentTab("about")}} className={`${font2.className} bg-white cursor-pointer rounded p-4 text-center m-4 mt-0`}>
                    About
                  </button>
                  
                  <button onClick={() => {setCurrentTab("characters")}} className={`${font2.className} bg-white cursor-pointer rounded p-4 text-center m-4 mt-0`}>
                    Characters
                  </button>

                  <button onClick={() => {setCurrentTab("lore")}} className={`${font2.className} bg-white cursor-pointer rounded p-4 text-center m-4 mt-0`}>
                    "Lore"
                  </button>

                  <button onClick={() => {setCurrentTab("history")}} className={`${font2.className} bg-white cursor-pointer rounded p-4 text-center m-4 mt-0`}>
                    History
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

                {/* MIERFISHING LINK */}
                <div className="pt-[20vh] z-100">
                  <a 
                    href="https://mierbear.github.io/miercury/fish.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={mierHover ? "/images/mierfisheth2.png" : "/images/mierfisheth.png"}
                      className="origin-bottom-right relative scale-150 nonsel translate-y-[15%] lg:translate-x-0 translate-x-[20%] z-100 cursor-pointer" 
                      onMouseEnter={mierHoverHandler}
                      onMouseLeave={mierUnhoverHandler}
                    />
                  </a>
                </div>

              </div>

              {/* RIGHT COL */}
              <div className="bg-white/30 rounded-xl flex flex-col p-6 m-4 ml-0">

                {/* ABOUT */}
                {currentTab === "about" && (
                  <div className="flex flex-col">
                    <h1 className={`${font2.className} text-3xl`}><b>● About</b></h1>
                    <p className={`${font2.className}`}>This page is dedicated to my community, Pacific Purgatory, a small online community of artists that I <i>somehow</i> managed to cultivate on Drawpile since May of 2023.
                    The Drawpile session is online 24/7, so feel free to join and draw with us.
                    <br />
                    <br />
                    <i className="text-sm">Much of the content here consists of inside jokes between me and my friends which can be crass/abrasive, don't take it too seriously.</i>
                    </p>

                    <hr className="my-6 border-gray-900/20 w-full" />

                    <h1 className={`${font2.className} text-3xl`}><b>● How do I Join?</b></h1>
                    <p className={`${font2.className}`}>- Install <a href="https://drawpile.net/download" target="_blank" className="underline cursor-pointer text-[#098899]" rel="noopener noreferrer">Drawpile</a>.</p>
                    <p className={`${font2.className}`}>- Open Drawpile, click on Session {`>`} Browse.</p>
                    <p className={`${font2.className}`}>- On the bottom left, click on "Add Server" and enter in <span className="underline bg-amber-100/50">https://pub.drawpile.net/listing/</span></p>
                    <p className={`${font2.className}`}>- Now you should be able to see and join the server.</p>

                    <p className={`${font2.className} text-sm pt-6`}>The session should be hosted by Mier, but the title might be ridiculous like:
                    <br />
                    <span className="text-xl">"⚓Pacific Purgatory v2  𓆝 𓆟 𓆞 𓆜 𓆛 ⊹ ࣪ ﹏𓊝﹏𓂁﹏⊹"</span>
                    <br />
                    which is what it is right now at the time of writing..
                    </p>

                    <hr className="my-6 border-gray-900/20 w-full" />

                    <h1 className={`${font2.className} text-3xl`}><b>● Discord Server?</b></h1>
                    <p className={`${font2.className}`}>I gatekeep it. Come hang out in the Drawpile long enough and ask to see if we like you :]</p>
                    
                    <hr className="my-6 border-gray-900/20 w-full" />

                    <h1 className={`${font2.className} text-3xl`}><b>● Why "Pacific Purgatory"?</b></h1>
                    <p className={`${font2.className}`}>
                    When I started hosting on Drawpile, I chose the session name on a whim based on the musician Pacific Purgatory since I really liked his music at the time (and still do) so it kinda just stuck there overtime.<br />
                    <br />
                    <b>Pacific Purgatory (this community)</b> has no connection or relation to <b>Pacific Purgatory (the musician, Ethan Silva)</b>.<br />
                    In fact, you should support Ethan Silva through <a href="https://pacificpurgatory.bandcamp.com" target="_blank" className="underline cursor-pointer text-[#098899]" rel="noopener noreferrer">Bandcamp</a> and listening to his music on <a href="https://open.spotify.com/artist/0syDmy3yzknmkbJGdExEpW" target="_blank" className="underline cursor-pointer text-[#098899]" rel="noopener noreferrer">Spotify</a>!
                    </p>
                  </div>
                )}

                {/* LORE */}
                {currentTab === "lore" && (
                  <p>lore</p>
                )}

                {/* CHARACTERS */}
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

      <Tooltip info="go fishing?" status={tooltipVisible} />
      <video autoPlay muted loop className="object-cover fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[120vw] min-h-[120vh] blur-[10px]">
        <source src="videos/pp.mp4" type="video/mp4" />
      </video>
    </main>
  );
}
