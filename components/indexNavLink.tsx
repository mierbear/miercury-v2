"use client";
import NextLink from "next/link";
import Marquee from "react-fast-marquee";
import { Sono } from "next/font/google";
import { useState, useEffect } from "react";

const sono = Sono({
  weight: "400",
  subsets: ["latin"],
})

type LinkKey =
| "characters"
| "mtwim"
| "games"
| "pp"
| "gallery"
| "blog"
| "about";

type LinkItemProps = {
  desc: string;
  active: LinkKey;
  type: string;
  pos: string;
  link: LinkKey;
  onHover: (link: LinkItemProps["link"]) => void;
};

export default function LinkItem({ desc, active, type, pos, link, onHover }: LinkItemProps) {

  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    setIsPhone(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <div
      className={`
        border-[#d8e0e3]/70 relative overflow-hidden 
        ${pos === "top" ? "border-t rounded-t-xl" : 
          pos === "bot" && "border-b rounded-b-xl"}
        border-x 
        ${active === link ? "bg-[#17191a]" : "bg-[#17191a]/50"}
        `}
      onMouseEnter={() => onHover(link)}
      onClick={() => onHover(link)}
    >
      <div>
        
        {/* TITLE */}
        <NextLink 
          href={`/${link === "blog" ? "blog/page/1" : link}`}
          className={`
          ${sono.className} 
          nonsel h-12.5 flex
          items-center pl-3.5 transition-all duration-400
          ${isPhone && "pointer-events-none"}
          ${active === link || "pointer-events-none"}
          ${active === link ? "text-yellow-300 white-glow text-xl gap-3.5" : "text-white/50 gap-2.5"}
          `}
        >
          <span className={`
            ${active === link ? "scale-100 spin" : "scale-70 -rotate-90 -translate-y-px"} 
            text-2xl w-3 h-3 ml-px flex items-center justify-center
            transition-all duration-500
            ${sono.className}
            `}
          >
            {active === link ? "★" : "✦"}
          </span>

          <span 
            className={`
              text-xl
              w-full h-full text-start flex items-center
              origin-left transition-[scale] duration-500
              ${active === link ? "scale-100" : "scale-80"}
            `}
          >
            {link}
          </span>
        </NextLink>

        {/* DESCRIPTION */}
        <p className={`
          nonsel pointer-events-none transition-opacity z-10
          ${active === link ? "opacity-100 duration-500" : "opacity-0 duration-0"} 
          bg-[#17191a]/80 py-1 px-2 ml-1 text-center rounded absolute txt-glow text-xs bottom-1 right-1
          `}
        >
          {desc}
        </p>

        {/* MEDIA */}
        <NextLink
        href={`/${link === "blog" ? "blog/page/1" : link}`}
        >
          {type === "img" ? (
            <img src={`/images/${link}.png`} className="h-47.5 w-full pointer-events-none nonsel object-cover" />
          ) : (
            <Marquee>
              <div className="-mr-px">
                <img src={`/images/${link}.png`} className="h-47.5 pointer-events-none nonsel" />
              </div>
            </Marquee>
          )}
        </NextLink>

      </div>
    </div>
  );
}