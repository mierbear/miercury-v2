"use client";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { Boldonse } from "next/font/google"
import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { usePathname } from "next/navigation";
import NavMenuLink from "./NavMenuLink";
import { Sono } from "next/font/google";

const sono = Sono({
  weight: "400",
  subsets: ["latin"],
})

gsap.registerPlugin(CustomEase);

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
})

const NavMenu = () => {

  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const pathname = usePathname();
  console.log(pathname);

  const navMenuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const moonRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  
  const moonClickHandler = () => {
    if (navMenuRef.current === null || overlayRef.current === null || moonRef.current === null) return;

    if (open) {
      setOpen(false);

      moonRef.current.style.pointerEvents = "none";
      overlayRef.current.style.pointerEvents = "none";
      setTimeout(() => {
        navMenuRef.current!.style.display = "none";
        moonRef.current!.style.pointerEvents = "auto";
        overlayRef.current!.style.pointerEvents = "auto";
      }, 1100);
    } else {
      navMenuRef.current.style.display = "flex";
      setTimeout(() => {
        setOpen(true);
        moonRef.current!.style.pointerEvents = "none";
        overlayRef.current!.style.pointerEvents = "none";
      }, 0);
      setTimeout(() => {
        moonRef.current!.style.pointerEvents = "auto";
        overlayRef.current!.style.pointerEvents = "auto";
      }, 1000);
    }
  }

  const routes = [
    { img: "moon.png", desc: "home", href: "/" },
    { img: "moon.png", desc: "with everyone", href: "/characters" },
    { img: "moonblank.png", desc: "somewhere cold", href: "/mtwim" },
    { img: "moonblank.png", desc: "looking for something to play", href: "/games" },
    { img: "moonblank.png", desc: "in Pacific Purgatory", href: "/pp" },
    { img: "moonblank.png", desc: "in the gallery", href: "/gallery" },
    { img: "moonblank.png", desc: "in my mind", href: "/blog" },
    { img: "moonblank.png", desc: "here with me", href: "/about" },
    { img: "moonblank.png", desc: "in the secret base..", href: "/admin" },
  ]

  const currentRoute = routes.find((route) =>
    route.href === "/"
      ? pathname === "/"
      : pathname.startsWith(route.href)
  );

  const menuRef = useRef<HTMLDivElement | null>(null);

  return (
    <div 
      className={`
      fixed inset-0 flex
      justify-center items-center text-white
      z-5555 pointer-events-none bg-linear-to-t
      via-transparent to-transparent
      duration-1000 transition-colors
      ${open ? "from-black/50" : "from-transparent"}
      ${sono.className}
    `}>

      {/* MESSAGE */}
      <p 
      className={`
        meow absolute z-5555 items-center
        text-center lg:items-start
        px-7 lg:pl-12 pb-12 bottom-0
        text-2xl w-full flex flex-col nonsel
        transition-opacity duration-1000
        ${open ? "opacity-100" : "opacity-0"}`}
      >
        you're currently {currentRoute?.desc}. where do you wish to go?
      </p>

      {/* NAVMENU */}
      <div
        ref={navMenuRef}
        className={`
        bg-black/50 rounded-b-2xl h-[80vh]
        w-screen md:w-[90%]
        flex-col self-start justify-center 
        items-center z-777 pointer-events-auto 
        transition-all overflow-hidden
        ${open ? "translate-y-0 duration-1000 ease-in-out" : "translate-y-[-100vh] duration-1100 ease-out"}
      `}
      >
        
        <div className="w-full h-full flex-col">
          <div className="bg-amber-100 w-full h-full grid grid-rows-4 grid-cols-none lg:grid-cols-4 lg:grid-rows-none" ref={menuRef}>
            <NextLink href="/characters" onClick={moonClickHandler} className="landing-tile flex justify-center items-center bg-[#838177]">
              <span>Characters</span>
            </NextLink>
            <NextLink href="/gallery" onClick={moonClickHandler} className="landing-tile flex justify-center items-center bg-[#616d7a]">
              <span>Gallery</span>
            </NextLink>
            <NextLink href="/mtwim" onClick={moonClickHandler} className="landing-tile flex justify-center items-center bg-[#8b979b]">
              <span>MTWIM Compendium</span>
            </NextLink>
            <NextLink href="/games" onClick={moonClickHandler} className="landing-tile flex justify-center items-center bg-[#8a8b7d]">
              <span>Games</span>
            </NextLink>
          </div>
        </div>

      </div>
      
      {/* MOON HITBOX */}
      <div
        className={`
          z-556
          fixed
          left-1/2
          -translate-x-1/2
          cursor-grab
          pointer-events-auto
          nonsel
          bg-black
          opacity-0
          ${open ? "translate-y-[50vh] h-100 w-100" : "-translate-y-[50vh] h-50 w-50"}
        `}
        onClick={moonClickHandler}
        ref={moonRef}
      >
      </div>
      
      {/* MOON IMAGE */}
      <div
        className={`
          z-778
          fixed
          left-1/2
          -translate-x-1/2
          transition-transform
          duration-1000
          ease-in-out
          pointer-events-none
          nonsel
          -translate-y-[50vh]
        `}
      >
        <img 
          className={`slow-spin ${open ? "translate-y-[100vh] lg:scale-40 scale-90 duration-700" : "lg:scale-20 scale-45 duration-1100"}  transition-transform origin-center  ease-in-out nonsel pointer-events-none`}
          src={`/images/${currentRoute?.img}`} 
        />
      </div>
      
      {/* BLUR */}
      <div 
        className={`${open ? "opacity-100 backdrop-blur-[2px] pointer-events-auto" : "opacity-0 invisible backdrop-blur-0 pointer-events-none"} fixed transition-opacity duration-1000 ease-in-out w-screen h-screen nonsel`}
        onClick={() => {moonRef.current?.click()}}
        ref={overlayRef}
      ></div>

    </div>
  );
};

export default NavMenu;
