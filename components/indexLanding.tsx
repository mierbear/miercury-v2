"use client";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Boldonse } from "next/font/google"
import { useEffect, useRef } from "react";

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
})

const Landing = () => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const landingRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const openTl = gsap.timeline();
  const closeTl = gsap.timeline();

  const isOpen = useRef(true);

  const toggleLanding = () => {
    if (!landingRef.current) return;

    const height = landingRef.current.offsetHeight;
    const width = landingRef.current.offsetWidth;

    if (isOpen.current) {
      closeTl
      .to(landingRef.current, {
        y: -height,
        duration: .7,
        ease: "power1.inOut",
      })
      .to(buttonRef.current, {
        x: width / 2.2,
        duration: .7,
        ease: "power2.out",
      })
      .set(listRef.current, {
        pointerEvents: "none",
        visibility: "hidden"
      });
    } else {
      openTl
      .set(listRef.current, {
        pointerEvents: "auto",
        visibility: "visible"
      })
      .to(buttonRef.current, {
        x: 0,
        duration: .4,
        ease: "power1.out",
      })
      .to(landingRef.current, {
        y: 0,
        duration: .5,
        ease: "power1.inOut",
      });
    }

    isOpen.current = !isOpen.current;
  };

  useEffect(() => {
    if (!landingRef.current) return;
    gsap.set(landingRef.current, { autoAlpha: 1 });
    gsap.from(landingRef.current, { yPercent: -200, duration: 4, ease: "power3.out", delay: .8 });
  }, []);

  return (
    <div
      ref={landingRef}
      className="fixed min-w-screen min-h-[90vh] grid grid-rows-[5fr_1fr] z-500 bg-white/80 shadow-2xl"
      style={{ visibility: "hidden" }}
    >
      <div ref={listRef} className="grid grid-cols-4">
        <div className="landing-tile flex justify-center items-center bg-[#838177]">
          <span>Characters</span>
        </div>
        <div className="landing-tile flex justify-center items-center bg-[#8b979b]">
          <span>MTWIM Compendium</span>
        </div>
        <div className="landing-tile flex justify-center items-center bg-[#616d7a]">
          <span>Pacific Purgatory</span>
        </div>
        <div className="landing-tile flex justify-center items-center bg-[#8a8b7d]">
          <span>Games</span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-gray-600/50 relative">
        <h1>no thanks, take me back to the blog!</h1>

        <div
          ref={buttonRef}
          onClick={toggleLanding}
          className="absolute bottom-0 bg-white rounded-full min-w-[2em] min-h-[2em] text-3xl translate-y-[50%] text-center cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Landing;
