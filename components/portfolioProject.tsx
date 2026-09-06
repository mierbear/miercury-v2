"use client"
import { Kosugi_Maru } from "next/font/google"
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const kosugi = Kosugi_Maru({
  weight: "400",
  subsets: ["latin"],
})

type ProjectProps = {
  title: string,
  info: string,
  src: string,
  link: string,
}

export default function Project({ title, info, src, link }: ProjectProps) {
  const textRef = useRef<HTMLAnchorElement>(null);
  const infoRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const ignatiusRef = useRef<HTMLImageElement>(null);
  const rufusRef = useRef<HTMLImageElement>(null);
  const aureliusRef = useRef<HTMLImageElement>(null);
  const brutusRef = useRef<HTMLImageElement>(null);
  
  // DEFAULT TL
  useEffect(() => {
    if (!textRef.current || !infoRef.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(textRef.current!, { type: "chars" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 100%",
          toggleActions: "restart none none none",
        },
      });

      tl.from(split.chars, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      })
      .from(infoRef.current, { opacity: 0, duration: 2, ease: "power2.out" }, "-=0.7")
      .from(imgRef.current,  { opacity: 0, xPercent: 30, duration: 1.5, ease: "power2.out" }, "-=1.5");
    });

    return () => ctx.revert();
  }, []);

  // CALVARIUS TL
  useEffect(() => {
    if (!textRef.current || !infoRef.current || !ignatiusRef.current || !rufusRef.current || !aureliusRef.current || !brutusRef.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(textRef.current, {
        type: "chars",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 100%",
          toggleActions: "restart none none none",
        },
      });

      tl.from(split.chars, { 
        opacity: 0, 
        y: 20, 
        stagger: 0.06, 
        duration: 0.8, 
        ease: "power2.out" 
      })
      .from(infoRef.current,     { opacity: 0, duration: 2, ease: "power2.out" }, "-=0.7")
      .from(ignatiusRef.current, { opacity: 0, xPercent: 30, duration: 1.4, ease: "power2.out" }, "<+0.4")
      .from(rufusRef.current,    { opacity: 0, xPercent: 30, duration: 1.4, ease: "power2.out" }, "<+0.4")
      .from(aureliusRef.current, { opacity: 0, xPercent: 30, duration: 1.4, ease: "power2.out" }, "<+0.4")
      .from(brutusRef.current,   { opacity: 0, xPercent: 30, duration: 1.4, ease: "power2.out" }, "<+0.4");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col w-[80%]">
      
      <div className="flex flex-col group gap-2">
        <Link href={link} target="_blank" className="group-hover:scale-100 scale-99 transition-scale duration-1000">
          <img className="rounded-2xl nonsel" src={src} />
        </Link>

        <div>
          <Link 
            href={link}
            ref={textRef}
            className={`text-7xl ${kosugi.className} text-gray-500 group-hover:text-blue-500 transition-colors duration-500`}
          >
            {title}
          </Link>
        </div>
      </div>
      
      <div className="text-sm flex justify-between relative">
        <p className={`${title === "CHARACTERS" ? "w-[40%]" : "w-[50%]"} text-justify`} ref={infoRef}>{info}</p>
        {title !== "CHARACTERS" ? (
          <img 
            className={`self-end absolute right-8 h-90 nonsel pointer-events-none`}
            src={title === "GALLERY" ? `/images/gallery/gallery-me.png` : `/images/mier.png`}
            ref={imgRef} 
          />
        ) : (
          <div className={`self-end absolute right-4 h-80 w-full nonsel pointer-events-none`}>
            <img className="absolute h-full right-0" ref={ignatiusRef} src={`/images/ignatius.png`} />
            <img className="absolute h-full right-0" ref={rufusRef} src={`/images/rufus.png`} />
            <img className="absolute h-full right-0" ref={aureliusRef} src={`/images/aurelius.png`} />
            <img className="absolute h-full right-0" ref={brutusRef} src={`/images/brutus.png`} />
          </div>
        )}
      </div>
    </div>
  )
}