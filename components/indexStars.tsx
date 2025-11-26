"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Stars = () => {
  const stars = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (stars.current) {
      gsap.to(stars.current, {rotation:360, duration: 360, repeat: -1, ease: "linear", transformOrigin: "center center"});
    }
  }, []);

  return (
    <img src={"/images/stars.png"} ref={stars} className="stars fixed origin-center scale-180 -z-50]" />
  )
}

export default Stars;