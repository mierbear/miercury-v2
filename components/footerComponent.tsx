"use client";
import { useRef } from "react";
import gsap from "gsap";
import { Anonymous_Pro } from "next/font/google";

const anonymous = Anonymous_Pro({
  weight: "400",
  subsets: ["latin"],
})

const Footer = () => {
  const loginTextRef = useRef<HTMLParagraphElement | null>(null);
  const mierTakethRef = useRef<HTMLImageElement | null>(null);
  const currentYear = new Date().getFullYear();
  const loginTexts = ["log in", "are you sure?", "ur not even admin go away", ">:p"]
  const currentText = useRef(0);

  const handleLoginClick = () => {
    
    if (currentText.current < 6) {
      currentText.current++;
      loginTextRef.current!.textContent = loginTexts[currentText.current % loginTexts.length];

    } else {
      const tl = gsap.timeline();

      tl
      .set(loginTextRef.current, {
        pointerEvents: "none",
      })
      .set(mierTakethRef.current, {
        visibility: "visible",
      })
      .to(mierTakethRef.current, {
        xPercent: -75,
        duration: 1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1
      })
      .to(loginTextRef.current, {
        xPercent: 125,
        duration: 1,
        ease: "power2.inOut",
      }, "<1")
      .set(mierTakethRef.current, {
        display: "none",
      })
      .set(loginTextRef.current, {
        display: "none",
      })
    }
  }

 return (
  <footer className={`z-50 h-12 relative ${anonymous.className}`}>
    <div className="bg-[#101113]/90 py-2 min-w-screen h-full flex flex-col justify-center align-center items-center bottom-0 text-white text-xs">

      <p className="text-center">
        Copyright © 2025 - {currentYear} Miercury. All Rights Reserved.
        <br />
        <a
        href="mailto:admin@miercury.com"
        className="hover:underline blue"
        >admin@miercury.com</a>
      </p>

      <div className={`right-1 absolute flex items-center justify-center md:visible invisible`}>
        <p ref={loginTextRef} onClick={handleLoginClick} className="pr-5 text-gray-100/90 text-xs hover:underline blue cursor-pointer nonsel">log in</p>
      </div>

    </div>
    <img ref={mierTakethRef} src="/images/miertaketh.png" className="absolute z-100 nonsel -right-80 bottom-4 invisible" draggable="false" style={{ pointerEvents: "none" }} />
  </footer>
 )
}

export default Footer;