"use client";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Boldonse } from "next/font/google"
import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
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
    listReset();
    if (navMenuRef.current === null || overlayRef.current === null || moonRef.current === null || menuRef.current === null) return;

    if (isDesktop()) {
      menuRef.current.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
    } else {
      menuRef.current.style.gridTemplateColumns = "1fr 1fr";
      menuRef.current.style.gridTemplateRows = "1fr 1fr";
    }

    if (open) {
      setOpen(false);
      moonRef.current.style.pointerEvents = "none";
      overlayRef.current.style.pointerEvents = "none";
      menuRef.current.style.pointerEvents = "none";
      setTimeout(() => {
        navMenuRef.current!.style.display = "none";
        moonRef.current!.style.pointerEvents = "auto";
        overlayRef.current!.style.pointerEvents = "auto";
        menuRef.current!.style.pointerEvents = "auto";
      }, 1100);
    } else {
      navMenuRef.current.style.display = "flex";
      menuRef.current.style.pointerEvents = "none";
      setTimeout(() => {
        setOpen(true);
        moonRef.current!.style.pointerEvents = "none";
        overlayRef.current!.style.pointerEvents = "none";
      }, 0);
      setTimeout(() => {
        moonRef.current!.style.pointerEvents = "auto";
        overlayRef.current!.style.pointerEvents = "auto";
        menuRef.current!.style.pointerEvents = "auto";
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
  const isDesktop = () => window.innerWidth >= 1280;

  const resetInlineStyles = () => {
    menuRef.current!.style.removeProperty("grid-template-columns");
    menuRef.current!.style.removeProperty("grid-template-rows");
  };

  const listReset = () => {
    if (!isDesktop()) {
      resetInlineStyles();
      return;
    }

    menuRef.current!.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
    menuRef.current!.style.removeProperty("grid-template-columns");
  };

  type LinkKey =
  | "characters"
  | "gallery"
  | "mtwim"
  | "games"

  const navMenuSelectHandler = (link: LinkKey) => {
    if (!menuRef.current) return;
    resetInlineStyles();

    if (isDesktop()) {
    const cols = {
      characters:  "2fr 1fr 1fr 1fr",
      gallery:     "1fr 2fr 1fr 1fr",
      mtwim:       "1fr 1fr 2fr 1fr",
      games:       "1fr 1fr 1fr 2fr",
    }

    menuRef.current.style.gridTemplateColumns = cols[link];
    } else {
    
    const cols = {
      characters:  "2fr 1fr",
      gallery:     "1fr 2fr",
      mtwim:       "2fr 1fr",
      games:       "1fr 2fr",
    }
    
    const rows = {
      characters:  "2fr 1fr",
      gallery:     "2fr 1fr",
      mtwim:       "1fr 2fr",
      games:       "1fr 2fr",
    }

    menuRef.current.style.gridTemplateRows = rows[link];
    menuRef.current.style.gridTemplateColumns = cols[link];
    }

  };

  useEffect(() => {
    const handleResize = () => {
      if (isDesktop()) {
        console.log(`is desktop :3`)
      } else {
        resetInlineStyles();
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      
      {/* HOME LINK */}
      <NextLink 
      href="/"
      onClick={moonClickHandler}
      className={`
        absolute z-5555 lg:rounded-tl-4xl rounded-tl-2xl
        bottom-0 right-0 bg-[#17191a]/80
        p-3 lg:p-6 pointer-events-auto
        text-xl lg:text-4xl flex flex-col nonsel
        transition-opacity duration-1000
        ${currentRoute?.href === "/" && "hidden"}
        ${boldonse.className}
        ${open ? "opacity-100" : "opacity-0"}
      `}
      >
        GO HOME?
      </NextLink>

      {/* NAVMENU */}
      <div
        ref={navMenuRef}
        className={`
        h-[80vh]
        w-screen md:w-[90%]
        flex-col self-start justify-center 
        items-center z-777 pointer-events-auto 
        transition-all
        ${open ? "translate-y-0 duration-1000 ease-in-out" : "translate-y-[-100vh] duration-1100 ease-out"}
      `}
      >
        
        {/* MENU */}
        <div className="w-full h-full flex-col">
          <div className="w-full h-full grid grid-rows-2 grid-cols-2 xl:grid-cols-4 xl:grid-rows-none rounded-b-2xl overflow-hidden relative transition-grid ease-in-out duration-500" ref={menuRef}>
            <div
              onClick={() => navMenuSelectHandler("characters")}
              onMouseEnter={() => navMenuSelectHandler("characters")}
              className="landing-tile flex justify-center items-center bg-[#838177] overflow-hidden relative"
            >

              <div className="aspect-square h-[110%] md:h-[130%] xl:h-[90%] flex justify-center items-center">
                <img
                  src="/images/moon-characters.png"
                  className="slower-spin w-auto"
                />
              </div>
              <p className="absolute bottom-0 text-4xl">Characters</p>
              
            </div>

            <div 
              onClick={() => navMenuSelectHandler("gallery")}
              onMouseEnter={() => navMenuSelectHandler("gallery")}
              className="landing-tile flex justify-center items-center bg-[#616d7a]"
            >
              
              <span>Gallery</span>

            </div>
            <div 
              onClick={() => navMenuSelectHandler("mtwim")}
              onMouseEnter={() => navMenuSelectHandler("mtwim")}
              className="landing-tile flex justify-center items-center bg-[#8b979b]"
            >
              
              <span>MTWIM Compendium</span>

            </div>
            <div 
              onClick={() => navMenuSelectHandler("games")}
              onMouseEnter={() => navMenuSelectHandler("games")}
              className="landing-tile flex justify-center items-center bg-[#8a8b7d]"
            >
              
              <span>Games</span>

            </div>
          </div>
        </div>

        {/* MESSAGE */}
        <p 
        className={`
          meow absolute z-5555 items-center
          text-center
          -bottom-12 px-4
          text-sm lg:text-lg 
          w-full flex flex-col nonsel
          transition-opacity duration-1000
          ${open ? "opacity-100" : "opacity-0"}`}
        >
          you're currently {currentRoute?.desc}. where do you wish to go?
        </p>
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
          z-776
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
          className={`
            slow-spin 
            ${open ? "translate-y-[100vh] scale-90 md:scale-74 lg:scale-60 xl:scale-40 duration-700" : "scale-45 md:scale-37 lg:scale-30 xl:scale-20 duration-1100"}
            transition-transform origin-center
            ease-in-out nonsel pointer-events-none
          `}
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
