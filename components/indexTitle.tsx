"use client";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Boldonse } from "next/font/google"
import { useEffect, useRef } from "react";

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
})

const Title = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const titleAnim = () => {
    if (!titleRef.current) return;

    gsap.set(titleRef.current, { autoAlpha: 1 });

    const split = new SplitText(titleRef.current, { type: "words" });

    gsap.to(split.words, {
      keyframes:{
        "50%":{yPercent: 120},
        "100%":{yPercent: 0},
      },
      duration: 2,
      opacity: 1,
      stagger: {
          each: 0.04,
        },
      ease: "power4.out",
    })

    bellFX();

    return () => {
      // tl.kill();
      split.revert();
    };
  }

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.set(titleRef.current, { autoAlpha: 1 });

    const split = new SplitText(titleRef.current, { type: "chars" });

    const tl = gsap.timeline();

    tl.from(split.chars, {
      duration: 1,
      opacity: 0,
      yPercent: 120,
      stagger: 0.05,
      ease: "power4.out",
      delay: 1,
    })

    return () => {
      tl.kill();
      split.revert();
    };
  }, []);

  const bellSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const bellSound = new Audio("/audio/bells.mp3");

    bellSound.load();

    bellSoundRef.current = bellSound;
  }, []);

  const bellFX = () => {
    if (!bellSoundRef.current) return;
    bellSoundRef.current.currentTime = 0;
    bellSoundRef.current.play();
  }

  return (
    <div className="z-10 justify-end overflow-y-hidden min-h-[20vh] pt-5 items-end flex">
      <h1
        ref={titleRef}
        className={
          `${boldonse.className}
          nonsel
          text-[#d8e0e3]
          text-6xl
          sm:text-7xl
          md:text-8xl
          lg:text-9xl
          miercury-glow
          cursor-pointer
          `}
        style={{ visibility: "hidden" }}
        onClick={titleAnim}
      >
        MIERCURY
      </h1>
    </div>
  );
};

export default Title;
