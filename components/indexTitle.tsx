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

    const tl = gsap.timeline();

    tl.to(split.words, {
      duration: .8,
      opacity: 0,
      stagger: {
          each: 0.08,
        },
      ease: "power4.out",
      delay: 0.3,
    })
    .to(split.words, {
      duration: 1,
      opacity: 1,
      stagger: {
          each: 0.05,
        },
      ease: "power4.out",
      delay: 0.3,
    }, "<.25")

    return () => {
      tl.kill();
      split.revert();
    };
  }

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.set(titleRef.current, { autoAlpha: 1 });

    const split = new SplitText(titleRef.current, { type: "chars" });

    const tl = gsap.timeline();

    tl.from(split.chars, {
      duration: 1.2,
      opacity: 0,
      yPercent: 50,
      stagger: 0.08,
      ease: "power4.out",
      delay: 0.3,
    })

    return () => {
      tl.kill();
      split.revert();
    };
  }, []);

  return (
    <div className="z-10 justify-end">
      <h1
        ref={titleRef}
        className={
          `${boldonse.className}
          nonsel
          text-[#d8e0e3]
          text-5xl
          sm:text-8xl
          lg:text-9xl
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
