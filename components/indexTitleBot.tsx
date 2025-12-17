"use client";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";

const TitleBot = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!divRef.current || !textRef.current) return;

    gsap.set(textRef.current, { autoAlpha: 1 });

    const split = new SplitText(divRef.current, { type: "words" });

    const tl = gsap.timeline();

    tl.from(split.words, {
      duration: 1,
      opacity: 0,
      yPercent: 50,
      stagger: 0.08,
      ease: "power4.out",
      delay: 0.8,
    })

    return () => {
      tl.kill();
      split.revert();
    };
  }, []);

  return (
    <div ref={divRef} className="bg-[#d8e0e3] rounded-t-xl flex flex-col justify-center items-center z-11">
      <p ref={textRef} style={{ visibility: "hidden" }} className="text-xs">enjoy the stay, keep it mirthful</p>
    </div>
  );
};

export default TitleBot;
