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
      navMenuRef.current.style.opacity = "0";
      setTimeout(() => {
        navMenuRef.current!.style.display = "none";
        moonRef.current!.style.pointerEvents = "auto";
        overlayRef.current!.style.pointerEvents = "auto";
      }, 500);
    } else {
      setOpen(true);
      moonRef.current!.style.pointerEvents = "none";
      overlayRef.current!.style.pointerEvents = "none";
      navMenuRef.current.style.display = "flex";
      setTimeout(() => {
        navMenuRef.current!.style.opacity = "100";
      }, 0);
      setTimeout(() => {
        moonRef.current!.style.pointerEvents = "auto";
        overlayRef.current!.style.pointerEvents = "auto";
      }, 500);
    }
  }

  const routes = [
    { img: "moon.png", desc: "home", href: "/" },
    { img: "trash.svg", desc: "with everyone", href: "/characters" },
    { img: "moon.png", desc: "somewhere cold", href: "/mtwim" },
    { img: "trash.svg", desc: "looking for something to play", href: "/games" },
    { img: "moon.png", desc: "in Pacific Purgatory", href: "/pp" },
    { img: "trash.svg", desc: "in the gallery", href: "/gallery" },
    { img: "moon.png", desc: "inside my mind", href: "/blog" },
    { img: "trash.svg", desc: "learning about me", href: "/about" },
  ]

  const currentRoute = routes.find((route) =>
    route.href === "/"
      ? pathname === "/"
      : pathname.startsWith(route.href)
  );


  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center", 
      dragFree: true,
    },
  );

  return (
    <div className="fixed w-screen h-screen flex flex-col justify-center items-center text-white z-5555 pointer-events-none">

      <div
      className={`bg-black/60 h-[50vh] w-screen lg:w-[80%] hidden opacity-0 flex-col justify-center items-center p-4 z-777 pointer-events-auto duration-500 transition-opacity`}
      ref={navMenuRef}
      >
        
        <p>you're currently {currentRoute?.desc}</p>
        <div className="text-white border border-white p-4 w-full h-full">

           <div className="overflow-hidden h-full w-full" ref={emblaRef}>
            <div className="flex h-full"
            onClick={moonClickHandler}
            >
              <NavMenuLink title="characters" href="/characters" img="/images/characters.png" />
              <NavMenuLink title="mtwim" href="/mtwim" img="/images/mtwim.png" />
              <NavMenuLink title="games" href="/games" img="/images/games.png" />
              <NavMenuLink title="pp" href="/pp" img="/images/pp.png" />
              <NavMenuLink title="gallery" href="/gallery" img="/images/gallery.png" />
              <NavMenuLink title="blog" href="/blog/page/1" img="/images/blog.png" />
              <NavMenuLink title="home" href="/" img="/images/moon.png" />
              <NavMenuLink title="about" href="/about" img="/images/about.png" />
            </div>
          </div>
        
        </div>
      </div>

      <div
        className={`
          z-556
          fixed
          left-1/2
          -translate-x-1/2
          cursor-grab
          pointer-events-auto
          nonsel
          -translate-y-[50vh]
          bg-black
          opacity-0
          ${open ? "h-200 w-200" : "h-50 w-50"}
        `}
        onClick={moonClickHandler}
        ref={moonRef}
      >
        sdfdsfdsfdsf
      </div>
      <div
        className={`
          z-555
          fixed
          left-1/2
          -translate-x-1/2
          transition-transform
          duration-500
          ease-in-out
          pointer-events-none
          nonsel
          -translate-y-[50vh]
        `}
      >
        <img 
        className={`slow-spin ${open ? "scale-150" : "scale-20"} transition-scale origin-center duration-500 ease-in-out nonsel pointer-events-none`}
        src={`/images/${currentRoute?.img}`} 
        />
      </div>
      
      <div 
      className={`${open ? "opacity-100 backdrop-blur-[2px] pointer-events-auto" : "opacity-0 invisible backdrop-blur-0 pointer-events-none"} fixed transition-opacity duration-500 ease-in-out w-screen h-screen nonsel`}
      onClick={() => {moonRef.current?.click()}}
      ref={overlayRef}
      ></div>

    </div>
  );
};

export default NavMenu;
