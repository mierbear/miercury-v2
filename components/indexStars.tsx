"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const Stars = () => {
  const [ready, setReady] = useState(false);
  const rotation = useRef<number | null>(null);
  
  useEffect(() => {
    setReady(true);
    rotation.current = Math.trunc(Math.random() * 361);
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      document.documentElement.classList.toggle(
        "page-hidden",
        document.hidden
      );
    };

    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div className={`min-w-screen min-h-screen bg-[#17191a] flex justify-end align-center items-center flex-col fixed top-0 -translate-y-[30vh] transition-opacity duration-3000 ${ready ? "opacity-100" : "opacity-0"}`}>

      <div className="fixed scale-225 -z-50 origin-center twinkle2" style={{ transform: `rotate(${rotation.current}deg)` }}>
        <img src="/images/stars.png" className="spin spin-slow nonsel pointer-events-none stars" />
      </div>

      <div className="fixed scale-225 -z-50 origin-center twinkle" style={{ transform: `rotate(${rotation.current}deg)` }}>
        <img src="/images/stars2.png" className="spin spin-medium nonsel pointer-events-none stars" />
      </div>

      <div className="fixed scale-225 -z-50 origin-center" style={{ transform: `rotate(${rotation.current}deg)` }}>
        <img src="/images/stars3.png" className="spin spin-fast nonsel pointer-events-none stars" />
      </div>


      <div style={{ pointerEvents: "none" }} className="nonsel glow translate-y-[30vh]"></div>
      <img src={"/images/bg.png"} className="fixed -z-60 translate-y-[30vh] min-w-screen min-h-screen object-cover nonsel" style={{ pointerEvents: "none" }} />
    </div>
  )
}

export default Stars;