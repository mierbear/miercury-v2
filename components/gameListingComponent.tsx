"use client";
import { useRef, useState, useEffect } from "react";
import NextLink from "next/link";
import { Sono, Noto_Serif_JP, Kosugi_Maru } from "next/font/google";

const sono = Sono({
  weight: "400",
  subsets: ["latin"],
})

const noto = Noto_Serif_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
})

const kosugi = Kosugi_Maru({
  weight: "400",
  subsets: ["latin"],
})

type Props = {
  src: string;
  link: string;
  title: string;
  date: string;
  description: string;
};

const Project = ({ src, link, title, date, description }: Props) => {

  const isPhone = typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => 
    videoRef.current?.play();

  const handlePause = () =>
    videoRef.current?.pause();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    if (isPhone) {
      videoRef.current?.play();
      setHovered(true);
    }
  }, []);

  return (
    <NextLink 
      href={link}
      target="_blank" 
      rel="noopener noreferrer" 
      onMouseEnter={() => { isPhone ? undefined : setHovered(true); isPhone ? undefined : videoRef.current?.play(); }}
      onMouseLeave={() => { isPhone ? undefined : setHovered(false); isPhone ? undefined : videoRef.current?.pause(); }}
      className={`
        transition-all duration-500 flex flex-row
        h-40 md:h-50 overflow-hidden w-full
        rounded-2xl bg-gray-200
        ${hovered ? "grayscale-0 scale-100" : "grayscale-50"}
      `}
    >
      
      {/* PREVIEW */}
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        
        className={`
          h-full transition-colors duration-500
          ${hovered ? "grayscale-0" : "grayscale-50"}
           object-cover
          max-w-[30vw]
        `}
      />

      {/* INFO */}
      <div className="flex flex-col h-full w-full py-2">
        
        {/* TOP */}
        <div className="px-4">

          {/* TITLE */}
          <p 
            className={`
            flex transition-gap duration-500
            ${hovered ? "gap-3" : "gap-2"} text-nowrap
            text-xl sm:text-2xl md:text-3xl font-bold ${noto.className}
            `}
          >
            <span className={`
              ${hovered ? "scale-100 spin" : "scale-80 -rotate-90 -translate-y-px"} 
              w-4 h-4 mt-1 flex items-center justify-center
              transition-all duration-500 self-center
              ${sono.className}
              `}
            >
              {hovered ? "★" : "✦"}
            </span>
            {title}
          </p>
          
          {/* DATE */}
          <p className={`text-xs sm:text-sm ${sono.className} text-black/60`}>{date}</p>
        </div>

        <hr className="my-2 border-gray-500/30 w-full" />

        {/* DESCRIPTION */}
        <p className="text-xs sm:text-sm md:text-base px-4">
          {description} 
        </p>

      </div>

    </NextLink>
  );
};

export default Project;
