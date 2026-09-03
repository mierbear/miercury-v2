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

  useEffect(() => {
    if (!textRef.current || !infoRef.current || !imgRef.current) return;

    const split = new SplitText(textRef.current, {
      type: "chars",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 100%",
        toggleActions: "restart none restart none",
      },
    });

    tl.from(split.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
    })
    .from(infoRef.current, {
      opacity: 0,
      duration: 2,
      ease: "power2.out",
    }, "-=0.7")
    .from(imgRef.current, {
      opacity: 0,
      xPercent: 30,
      duration: 2,
      ease: "power2.out"
    }, "-=1.5")

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      split.revert();
    };
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
        <p className="w-[50%] text-justify" ref={infoRef}>{info}</p>
        <img className="self-end absolute right-8 h-90 nonsel pointer-events-none" src={`/images/gallery/gallery-me.png`} ref={imgRef} />
      </div>
    </div>
  )
}