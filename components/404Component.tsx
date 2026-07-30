'use client';
import Stars from "@/components/indexStars";
import { useEffect, useState, useRef } from "react";
import Loading from "@/components/LoadingScreenComponent";
import { Boldonse } from "next/font/google";

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
})

export default function NotFound() {

  const [lostMessage, setLostMessage] = useState("");

  const lostMessages = [
    "you're not supposed to be here, but come stargaze with us.",
    "each thought better than the last.",
    "you seem have lost your way, take a breather.",
  ]

  const randomizer = (arr: string[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  useEffect(() => {
    setLostMessage(randomizer(lostMessages));
  }, [])

  const loadingScreenRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  // PRELOAD
  useEffect(() => {
    const preload = [
      "/images/index/mierfigure.png",
      "/images/index/kaninfigure.png",
    ];

    const promises = preload.map(src => new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    }));

    Promise.all(promises).then(() => setReady(true));
  }, []);

  return (
    <div className="w-screen h-screen flex items-end justify-center relative bg-[#17191a]">

      <div className="z-5000 flex origin-bottom scale-50 nonsel pointer-events-none opacity-90 w-screen items-center justify-center px-8">
        <img src="/images/kaninfigure.png" className="figure-breathe-medium" />
        <img src="/images/mierfigure.png" className="figure-breathe-slow" />
      </div>

      <p className={`
        absolute text-white w-screen h-screen
        flex items-center justify-center z-5001
        nonsel pointer-events-none monospace p-4
        lg:items-end lg:justify-start
        `}
      >
        {lostMessage}
      </p>

      <p className={`
        absolute text-white w-screen h-screen
        flex items-center justify-center z-5001
        nonsel pointer-events-none monospace p-4
        lg:items-end lg:justify-start text-8xl opacity-20
        ${boldonse.className}
        `}
      >
        404
      </p>

      <Stars lost={true} />
      <Loading loadingRef={loadingScreenRef} ready={ready} />
    </div>
  );
}
