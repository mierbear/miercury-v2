"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Stars = () => {
  const stars = useRef<HTMLImageElement | null>(null);
  const stars2 = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (stars.current) {
      gsap.to(stars.current, {rotation:360, duration: 360, repeat: -1, ease: "linear", transformOrigin: "center center"});
    }

    if (stars2.current) {
      gsap.to(stars2.current, {rotation:360, duration: 480, repeat: -1, ease: "linear", transformOrigin: "center center"});
    }
  }, []);

  return (
    <div className="bg-black min-w-screen min-h-[40vh] flex justify-end align-center items-center top-0 flex-col fixed">
    <img src={"/images/stars.png"} ref={stars} className="stars fixed origin-center scale-180 -z-50]" />
    <img src={"/images/stars2.png"} ref={stars2} className="stars fixed origin-center scale-180 -z-50]" />
    </div>
  )
}

export default Stars;