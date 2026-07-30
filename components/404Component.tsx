'use client';
import Stars from "@/components/indexStars";
import { useEffect, useState } from "react";

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

  return (
    <div className="w-screen h-screen flex items-end justify-center relative">

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

      <Stars lost={true} />
    </div>
  );
}
