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

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.set(titleRef.current, { autoAlpha: 1 });

    const split = new SplitText(titleRef.current, { type: "chars" });

    const tl = gsap.timeline();

    tl.from(split.chars, {
      duration: 0.8,
      opacity: 0,
      yPercent: 120,
      stagger: 0.05,
      ease: "power4.out",
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
        className={`${boldonse.className} header text-gray-300 text-9xl`}
        style={{ visibility: "hidden" }}
      >
        MIERCURY
      </h1>
    </div>
  );
};

export default Title;
