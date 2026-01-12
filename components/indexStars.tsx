"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const Stars = () => {
  const stars = useRef<HTMLImageElement | null>(null);
  const stars2 = useRef<HTMLImageElement | null>(null);
  const stars3 = useRef<HTMLImageElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  const getNumber = () => {
    return Math.trunc(Math.random() * 361);
  }

  useEffect(() => {
    const rotation = getNumber();
    gsap.set(stars.current, { rotation: rotation, opacity: 0, visibility: "visible" });
    gsap.set(stars2.current, { rotation: rotation, opacity: 0, visibility: "visible" });
    gsap.set(stars3.current, { rotation: rotation, opacity: 0, visibility: "visible" });

    if (stars.current) {
      gsap.to(stars.current, {opacity: 1, duration: 4, ease: "power4.out"});
      gsap.to(stars.current, {rotation: "+=360", duration: 360, repeat: -1, ease: "linear", transformOrigin: "center center"});
    }

    if (stars2.current) {
      gsap.to(stars2.current, {opacity: 1, duration: 4, ease: "power4.out"});
      gsap.to(stars2.current, {rotation: "+=360", duration: 480, repeat: -1, ease: "linear", transformOrigin: "center center"});
    }

    if (stars3.current) {
      gsap.to(stars3.current, {opacity: 1, duration: 4, ease: "power4.out"});
      gsap.to(stars3.current, {rotation: "+=360", duration: 280, repeat: -1, ease: "linear", transformOrigin: "center center"});
    }

    setReady(true);
  }, []);


  return (
    <div className={`min-w-screen min-h-screen flex justify-end align-center items-center flex-col fixed top-0 -translate-y-[30vh] transition-opacity duration-3000 ${ready ? "opacity-100" : "opacity-0"}`} ref={starsRef}>
      <img src={"/images/stars.png"} ref={stars} className="stars nonsel fixed origin-center scale-225 -z-50 twinkle2" style={{ visibility: "hidden", pointerEvents: "none" }} />
      <img src={"/images/stars2.png"} ref={stars2} className="stars nonsel fixed origin-center scale-225 -z-50 twinkle" style={{ visibility: "hidden", pointerEvents: "none" }} />
      <img src={"/images/stars3.png"} ref={stars3} className="stars nonsel fixed origin-center scale-225 -z-50" style={{ visibility: "hidden", pointerEvents: "none" }} />
      <div style={{ pointerEvents: "none" }} className="nonsel lighten translate-y-[30vh]"></div>
      <div style={{ pointerEvents: "none" }} className="nonsel overlay translate-y-[30vh]"></div>
      <div style={{ pointerEvents: "none" }} className="nonsel glow translate-y-[30vh]"></div>
      <img src={"/images/bg.png"} className="fixed -z-60 translate-y-[30vh] min-w-screen min-h-screen object-cover nonsel" style={{ pointerEvents: "none" }} />
    </div>
  )
}

export default Stars;