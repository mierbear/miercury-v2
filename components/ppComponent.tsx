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
      { xPercent: -150, duration: 20, ease: "none", repeat: -1 }
    );
  }, [])

  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const news = [`--- the secret santa event is over, thank you to those who participated <3 check out the secret santa gallery to see the results! --- have a merry christmas and a happy new year! ---`];
  
  return (
    // <main className="min-w-screen min-h-[300vh] align-center items-center flex flex-col z-50 bg-linear-to-b from-[rgb(8,173,223)] via-[rgb(20,86,140)] to-[rgb(33,50,67)]">
    <main className="min-w-screen min-h-screen grid grid-cols-[20fr_60fr_20fr] z-50 bg-[#c1f8ff]">
      <div className="invisible md:flex">
      </div>

       
      <div className="flex flex-col z-100 min-w-screen lg:min-w-[80vw]">
        <div className="flex flex-col justify-end pt-[10vh]">
          <h1 className={`${font.className} nonsel text-[#1a1d20] text-shadow-md text-6xl z-50 translate-y-1`}>
            PACIFIC <span className="text-red-600">🞨</span> PURGATORY
          </h1>
        </div>

        <div className="bg-[#c1f8ff]/50 min-h-[50vh] shadow-xl flex flex-col">

          <div className="bg-[#1a1d20] overflow-x-hidden self-center w-full flex justify-center">
            <p 
              className={`${font2.className} bg-[#1a1d20] text-sm text-white inline-block whitespace-nowrap py-0.5`}
              ref={marqueeRef}
              style={{ opacity: ready ? 1 : 0 }}
            >
              {news}
            </p>
          </div>
          
          <div className="">

          </div>

        </div>

      </div>

      <div className="invisible md:flex">
      </div>

      <video autoPlay muted loop className="object-cover fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[120vw] min-h-[120vh] blur-[10px]">
        <source src="videos/pp.mp4" type="video/mp4" />
      </video>
    </main>
  );
}
