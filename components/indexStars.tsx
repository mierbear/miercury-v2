"use client";
import { time } from "console";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Stars = () => {
  const stars = useRef<HTMLImageElement | null>(null);
  const stars2 = useRef<HTMLImageElement | null>(null);
  const stars3 = useRef<HTMLImageElement | null>(null);

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
  }, []);

  useEffect(() => {
    const twinkle = (el: HTMLImageElement) => {
      gsap.set(el, { opacity: 1, delay: 3 });

      setTimeout(() => {
        gsap.to(el, {
          opacity: gsap.utils.random(0.5, 1),
          duration: gsap.utils.random(2, 3.2),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }, 3100);
    };

    if (stars.current) twinkle(stars.current);
    if (stars2.current) twinkle(stars2.current);
    if (stars3.current) twinkle(stars3.current);
  }, []);


  return (
    <div className="min-w-screen min-h-screen flex justify-end align-center items-center flex-col fixed top-0 -translate-y-[30vh]">
    <img src={"/images/stars.png"} ref={stars} className="stars fixed origin-center scale-250 -z-50" style={{ visibility: "hidden", pointerEvents: "none" }} />
    <img src={"/images/stars2.png"} ref={stars2} className="stars fixed origin-center scale-250 -z-50" style={{ visibility: "hidden", pointerEvents: "none" }} />
    <img src={"/images/stars3.png"} ref={stars3} className="stars fixed origin-center scale-250 -z-50" style={{ visibility: "hidden", pointerEvents: "none" }} />
    </div>
  )
}

export default Stars;