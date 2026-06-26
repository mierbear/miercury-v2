"use client";
import { Boldonse } from "next/font/google"
import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Sono, Anonymous_Pro } from "next/font/google";
import { useRouter } from "next/navigation";
import Label from "@/components/NavMenuLabel";
import ArtType from "@/types/artType";
import supabase from "@/lib/supabaseClient";
import Marquee from "react-fast-marquee";

const anonymous = Anonymous_Pro({
  weight: "400",
  subsets: ["latin"],
})

// const sono = Sono({
//   weight: "400",
//   subsets: ["latin"],
// })

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
})

const NavMenu = () => {
  
  const [ready, setReady] = useState(false);
  
  const router = useRouter();

  const pathname = usePathname();
  // console.log(pathname);

  const navMenuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const moonRef = useRef<HTMLDivElement | null>(null);
  const goHomeRef = useRef<HTMLAnchorElement | null>(null);
  const [open, setOpen] = useState(false);
  
  const moonClickHandler = () => {
    listReset();
    stopFishing();
    resetInlineStyles();
    if (navMenuRef.current === null || overlayRef.current === null || moonRef.current === null || menuRef.current === null || goHomeRef.current === null) return;

    if (isDesktop()) {
      menuRef.current.style.gridTemplateColumns = "1fr 1fr 1fr";
    } else {
      menuRef.current.style.gridTemplateRows = "1fr 1fr 1fr";
    }

    // CLOSE
    if (open) {
      setOpen(false);
      setActiveLink(null);
      moonRef.current.style.pointerEvents = "none";
      overlayRef.current.style.pointerEvents = "none";
      menuRef.current.style.pointerEvents = "none";
      if (currentRoute?.href !== "/") {
        goHomeRef.current.style.opacity = "0";
      }
      setTimeout(() => {
        navMenuRef.current!.style.display = "none";
        moonRef.current!.style.pointerEvents = "auto";
        overlayRef.current!.style.pointerEvents = "auto";
        menuRef.current!.style.pointerEvents = "auto";
        if (currentRoute?.href !== "/") {
          goHomeRef.current!.style.display = "none";
        }
      }, 1100);

    // OPEN
    } else {
      navMenuRef.current.style.display = "flex";
      menuRef.current.style.pointerEvents = "none";
      if (currentRoute?.href !== "/") {
        goHomeRef.current.style.display = "flex";
      }
      setTimeout(() => {
        setOpen(true);
        moonRef.current!.style.pointerEvents = "none";
        overlayRef.current!.style.pointerEvents = "none";
        if (currentRoute?.href !== "/") {
          goHomeRef.current!.style.opacity = "100";
        }
      }, 0);
      setTimeout(() => {
        moonRef.current!.style.pointerEvents = "auto";
        overlayRef.current!.style.pointerEvents = "auto";
        menuRef.current!.style.pointerEvents = "auto";
      }, 1000);
    }
  }

  const routes = [
    { img: "moon.png",      desc: "home",                          href: "/" },
    { img: "star.png",      desc: "with everyone",                 href: "/characters" },
    { img: "snowflake.svg", desc: "somewhere cold",                href: "/worlds" },
    { img: "moon.png",      desc: "looking for something to play", href: "/games" },
    { img: "moon.png",      desc: "in the gallery",                href: "/gallery" },
    { img: "star.png",      desc: "in my mind",                    href: "/blog" },
    { img: "sun.png",       desc: "here with me",                  href: "/about" },
    { img: "moon.png",      desc: "with my projected principles",  href: "/quotes" },
    { img: "moon.png",      desc: "in the secret base..",          href: "/admin" },
  ]

  const currentRoute = routes.find((route) =>
    route.href === "/"
      ? pathname === "/"
      : pathname.startsWith(route.href)
  );

  const menuRef = useRef<HTMLDivElement | null>(null);

  const isDesktop = () => window.innerWidth >= 1024;

  const isPhone = typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

  const resetInlineStyles = () => {
    menuRef.current!.style.removeProperty("grid-template-columns");
    menuRef.current!.style.removeProperty("grid-template-rows");
  };

  const listReset = () => {
    if (!isDesktop()) {
      resetInlineStyles();
      return;
    }

    menuRef.current!.style.gridTemplateColumns = "1fr 1fr 1fr";
    menuRef.current!.style.removeProperty("grid-template-columns");
  };

  type LinkKey =
  | "characters"
  | "gallery"
  | "games"

  const [activeLink, setActiveLink] = useState<LinkKey | null>(null);

  const navMenuSelectHandler = (link: LinkKey) => {
    if (!menuRef.current) return;
    resetInlineStyles();
    setActiveLink(link);

    if (isDesktop()) {
    const cols = {
      characters:  "2fr 1.125fr 1.025fr",
      gallery:     "1.075fr 2fr 1.075fr",
      games:       "1.025fr 1.125fr 2fr",
    }

    menuRef.current.style.gridTemplateColumns = cols[link];
    } else {
    
    const rows = {
      characters:  "4fr 1fr 1fr",
      gallery:     "1fr 4fr 1fr",
      games:       "1fr 1fr 4fr",
    }

    menuRef.current.style.gridTemplateRows = rows[link];
    }

    if (link === "games") {
      fishHandler(true)
    } else {
      fishHandler(false)
    }

  };

  useEffect(() => {
    const handleResize = () => {
      if (isDesktop()) {
        // console.log(`is desktop :3`)
      } else {
        resetInlineStyles();
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = (link: LinkKey) => {
    if (activeLink === link) {
      moonClickHandler();
      router.push(`/${link}`);
    } else {
      setActiveLink(link);
      navMenuSelectHandler(link);
    }
  };

  const featArtRef = useRef<HTMLImageElement | null>(null);
  const [artwork, setArtwork] = useState<ArtType | null>(null);
    
  const fetchArt = async () => {
    const { error, data } = await supabase
      .from("art")
      .select("*")
      .eq("featured", true)
    
    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }
    
    // console.log(data);
    setArtwork(data[0]);
  }

  useEffect(() => {
    setReady(true);
    fetchArt();
  }, []);

  type CrowdType = {
    name: string;
    pace: string;
    position: string;
  }

  const potentialCrowd = [
    { name: "aurelius", pace: "medium", position: "right" },
    { name: "rufus" , pace: "fast", position: "right" },
    { name: "brutus" , pace: "slow", position: "left" },
    { name: "ignatius" , pace: "fast", position: "left" },
  ];

  const [crowd, setCrowd] = useState<CrowdType[]>([])

  const randomizer = (arr: CrowdType[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const getCrowd = () => {
    const data = [];
    data.push(randomizer(potentialCrowd.filter((person) => person.position === "left")))
    data.push(randomizer(potentialCrowd.filter((person) => person.position === "right")))
    // console.log(data);
    setCrowd(data); 
  }

  useEffect(() => {
    getCrowd();
  }, [])

  const onComic = pathname.startsWith("/worlds/read");
  const onOS = pathname.startsWith("/mieros");

  // PRELOAD
  useEffect(() => {
    Array.from({ length: 24 }, (_, i) => {
      const img = new window.Image();
      img.src = `/images/navmenu/games/fish-${i}.png`;
    });
    Array.from({ length: 9 }, (_, i) => {
      const img = new window.Image();
      img.src = `/images/navmenu/games/mier-${i}.png`;
    });
  }, []);
  
  const fishHandler = (bool: boolean) => {
    if (bool === true && activeLink !== "games") {
      playFishing();
    } else if (bool === false) {
      stopFishing();
    }
  };

  const [fished, setFished] = useState(false);
  const [currentFish, setCurrentFish] = useState<number | null>(null);
  const [mierState, setMierState] = useState<string>("start");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mierFish = useRef(0)
  const mierProgress = useRef(0)

  const resetFishing = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    mierProgress.current = 0;
  }

  const playFishing = () => {
    resetFishing();
    mierFish.current = 0;
    setMierState(`${mierFish.current}`);
    setCurrentFish(Math.floor(Math.random() * 24));

    intervalRef.current = setInterval(() => {
      if (mierFish.current < 8) {
        mierFish.current += 1;  
        setMierState(`${mierFish.current}`)
      }
      
      if (mierFish.current > 3 && mierFish.current < 8) {
        mierProgress.current -= 1;  
      } else {
        mierProgress.current = 0;
      }

      if (mierFish.current === 8) {
        setFished(true);
      }

      // console.log(mierProgress.current);
    }, 500);
  };

  const stopFishing = () => {
    resetFishing();
    setMierState(`start`)
    setFished(false);
  };

  return (
    <div 
      className={`
      fixed inset-0 flex
      justify-center items-center text-white
      z-5555 pointer-events-none bg-linear-to-t
      to-transparent
      duration-1000 transition-colors
      ${open ? "from-[rgb(11,12,13)]/70 via-[rgb(11,12,13)]/40" : "via-transparent from-transparent"}
      ${anonymous.className}
      ${onComic || onOS && "hidden"}
    `}>
      
      {/* HOME LINK */}
      <NextLink 
      href="/"
      onClick={moonClickHandler}
      ref={goHomeRef}
      className={`
        absolute z-5555 lg:rounded-tl-4xl rounded-tl-2xl
        bottom-0 right-0 bg-[#17191a]/80
        p-3 lg:p-6 pointer-events-auto
        text-xl lg:text-4xl hidden opacity-0 flex-col nonsel
        transition-opacity duration-1000
        ${currentRoute?.href === "/" && "hidden"}
        ${boldonse.className}
        ${open ? "duration-1000 pointer-events-auto" : "duration-1100 pointer-events-none"}
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
          <div className="w-full h-full grid rounded-b-4xl overflow-hidden relative transition-grid ease-in-out duration-500" ref={menuRef}>

            {/* CHARACTERS */}
            <div
              onClick={() => handleSelect("characters")}
              onMouseEnter={!isPhone ? () => navMenuSelectHandler("characters") : undefined}
              className={`
                cursor-pointer flex justify-center items-center
                overflow-hidden relative transition-saturate duration-400
                ${activeLink === "characters"
                ? "saturate-100 brightness-100 bg-[rgb(33,37,38)]"
                : "saturate-60 brightness-60 bg-[rgb(48,54,56)]"}
              `}
            >

              <div 
                className={`
                  aspect-square w-full h-auto lg:h-full lg:w-auto flex justify-center items-center relative 
                  transition-scale duration-800 ease-in-out
                  ${activeLink === "characters" ? "scale-105" : "scale-100"}
                `}
              >
                <img
                  src="/images/navmenu/moon-stars.png"
                  className="slowest-spin w-auto nonsel pointer-events-none absolute scale-[150%]"
                />
                <img
                  src="/images/navmenu/moon-characters.png"
                  className="slower-spin w-auto nonsel pointer-events-none absolute"
                />
              </div>

              <Label activeLink={activeLink} link="characters" title="CHARACTERS" desc="learn about my characters here!" />
            </div>

            {/* GALLERY */}
            <div 
              onClick={() => handleSelect("gallery")}
              onMouseEnter={!isPhone ? () => navMenuSelectHandler("gallery") : undefined}
              className={`cursor-pointer flex justify-center items-center bg-gray-200 overflow-hidden relative duration-400 ${activeLink === "gallery" ? "saturate-100 brightness-100" : "saturate-60 brightness-60"}`}
            >
              
              {/* LIGHTS */}
              <div className="absolute w-full h-full grid grid-cols-2 z-800 opacity-70">
                <img className="w-full h-full nonsel pointer-events-none" src="/images/navmenu/light.png" />
                <img className="w-full h-full nonsel pointer-events-none scale-x-[-1]" src="/images/navmenu/light.png" />
              </div>

              {/* FEATURED ARTWORK */}
              <div 
                className={`
                  h-100 lg:h-[80%] absolute flex justify-center items-center
                  border-y-12 border-t-[#ada283] border-b-[#6b6965] shadow-2xl
                  transition-all duration-500
                  ${activeLink === "gallery" ? "blur-none mb-[12%] lg:mb-[12%]" : "blur-[1px] mb-[60%] lg:mb-[12%]"}
                `}
              >

                <img
                  ref={featArtRef}
                  src={artwork?.url}
                  className={`w-full h-full object-cover nonsel pointer-events-none`}
                />
                
              </div>

              {/* AUDIENCE */}
              <div 
                className={`
                  absolute bottom-0 w-full h-60 lg:h-80
                  grid grid-cols-2 transition-all duration-1000
                  ${activeLink === "gallery" ? "blur-[2px] translate-y-8" : "blur-none translate-y-0"}
                `}
              >

                {/* LEFT SIDE */}
                <div className="relative">
                  {crowd[0] && (
                    <img
                      src={`/images/navmenu/figure-${crowd[0].name}.png`}
                      className={`absolute ${crowd[0].name === "ignatius" ? "-right-4" : "right-5"} h-full w-auto max-w-none nonsel pointer-events-none figure-breathe-${crowd[0].pace}`}
                    />
                  )}
                </div>

                {/* RIGHT SIDE */}
                <div className="relative">
                  {crowd[1] && (
                    <img
                      src={`/images/navmenu/figure-${crowd[1].name}.png`}
                      className={`absolute ${crowd[0].name === "ignatius" ? "left-4" : "left-5"} h-full w-auto max-w-none nonsel pointer-events-none figure-breathe-${crowd[1].pace}`}
                    />
                  )}
                </div>

              </div>

              <Label activeLink={activeLink} link="gallery" title="GALLERY" desc="gaze upon my art!" />
            </div>

            {/* GAMES */}
            <div 
              onClick={() => handleSelect("games")}
              onMouseEnter={!isPhone ? () => navMenuSelectHandler("games") : undefined}
              className={`
                cursor-pointer landing-tile flex justify-center items-center
                overflow-hidden relative duration-400
                ${activeLink === "games" ? "saturate-100 brightness-100" : "saturate-60 brightness-60"}
                `}
              style={{ background: "linear-gradient(to bottom, rgb(105, 166, 208), rgb(105, 166, 208), rgb(117, 180, 216), rgb(160, 233, 255))" }}
            >

              <div
                className={`
                  relative w-full h-full origin-center transition-all ease-in-out nonsel pointer-events-none flex items-center justify-center
                  ${fished ? "duration-1000" : mierProgress.current ? "duration-100" : "duration-2000"}
                  ${fished ? "translate-x-[5%]" : activeLink === "games" ? "translate-x-[0%]" : "translate-x-[0%] lg:translate-x-[-20%]"}
                `}
                style={{
                  scale: `${fished ? `115%` : `${105 - (mierProgress.current * 12)}%`}`,
                }}
              >
                
                {/* MIER */}
                <img 
                  src={`/images/navmenu/games/mier-${mierState || "start"}.png`}
                  className={`
                    min-h-full object-cover absolute overflow-visible
                    transition-[translate] duration-400
                  `}
                  style={{ translate: `${mierProgress.current * 20}px` }}
                />

                {/* BG */}
                <img 
                  src={`/images/navmenu/games/bg.png`}
                  className={`
                    min-h-full object-cover absolute overflow-visible
                  `}
                />

                {/* FISH */}
                <img 
                  src={`/images/navmenu/games/fish-${currentFish || "0"}.png`}
                  className={`
                    min-h-full object-cover absolute overflow-visible glowing
                    ${fished ? "block" : "hidden"}
                  `}
                />

                {/* WATER */}
                <img 
                  src={`/images/navmenu/games/water.png`}
                  className={`
                    min-h-full object-cover absolute overflow-visible waves
                  `}
                />

              </div>
              
              <Label activeLink={activeLink} link="games" title="GAMES" desc="play my games here!" />
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
          ${open ? "translate-y-[50vh] h-100 w-100" : "translate-y-[-50vh] h-50 w-50"}
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
          translate-y-[-50vh]
        `}
      >
        <img 
          className={`
            slow-spin 
            ${open ? "translate-y-[100vh] scale-90 md:scale-74 lg:scale-60 xl:scale-40 duration-700" : "scale-45 md:scale-37 lg:scale-30 xl:scale-20 duration-1100"}
            transition-transform origin-center
            ease-in-out nonsel pointer-events-none
          `}
          src={`/images/navmenu/${currentRoute?.img}`} 
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
