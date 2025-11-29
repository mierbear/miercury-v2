"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Stars = () => {
  const stars = useRef<HTMLImageElement | null>(null);
  const stars2 = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    gsap.set(stars.current, { autoAlpha: 1 });
    gsap.set(stars2.current, { autoAlpha: 1 });

    if (stars.current) {
      gsap.to(stars.current, {rotation:360, duration: 360, repeat: -1, ease: "linear", transformOrigin: "center center"});
    }

    if (stars2.current) {
      gsap.to(stars2.current, {rotation:360, duration: 480, repeat: -1, ease: "linear", transformOrigin: "center center"});
    }
  }, []);

  useEffect(() => {
    const twinkle = (el: HTMLImageElement) => {
      gsap.to(el, {
        opacity: gsap.utils.random(0.5, 1),
        duration: gsap.utils.random(2, 3.2),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    };

    if (stars.current) twinkle(stars.current);
    if (stars2.current) twinkle(stars2.current);
  }, []);


  return (
    <div className="bg-[#17171a] min-w-screen min-h-screen flex justify-end align-center items-center flex-col fixed top-0 -translate-y-[20vh]">
    <img src={"/images/stars.png"} ref={stars} className="stars fixed origin-center scale-200 -z-50]" style={{ visibility: "hidden", pointerEvents: "none" }} />
    <img src={"/images/stars2.png"} ref={stars2} className="stars fixed origin-center scale-200 -z-50]" style={{ visibility: "hidden", pointerEvents: "none" }} />
    </div>
  )
}

export default Stars;