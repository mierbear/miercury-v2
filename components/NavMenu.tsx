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
  console.log(pathname);

  const navMenuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const moonRef = useRef<HTMLDivElement | null>(null);
  const goHomeRef = useRef<HTMLAnchorElement | null>(null);
  const [open, setOpen] = useState(false);
  
  const moonClickHandler = () => {
    listReset();
    if (navMenuRef.current === null || overlayRef.current === null || moonRef.current === null || menuRef.current === null || goHomeRef.current === null) return;

    if (isDesktop()) {
      menuRef.current.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
    } else {
      menuRef.current.style.gridTemplateColumns = "1fr 1fr";
      menuRef.current.style.gridTemplateRows = "1fr 1fr";
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

    menuRef.current!.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
    menuRef.current!.style.removeProperty("grid-template-columns");
  };

  type LinkKey =
  | "characters"
  | "gallery"
  | "mtwim"
  | "games"

  const [activeLink, setActiveLink] = useState<LinkKey | null>(null);

  const navMenuSelectHandler = (link: LinkKey) => {
    if (!menuRef.current) return;
    resetInlineStyles();
    setActiveLink(link);

    if (isDesktop()) {
    const cols = {
      characters:  "2fr 1.125fr 1.025fr .95fr",
      gallery:     "1.05fr 2fr 1.05fr 1fr",
      mtwim:       "1fr 1.05fr 2fr 1.05fr",
      games:       ".95fr 1.025fr 1.125fr 2fr",
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
    
    console.log(data);
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
    console.log(data);
    setCrowd(data); 
  }

  useEffect(() => {
    getCrowd();
  }, [])

  return (
    <div 
      className={`
      fixed inset-0 flex
      justify-center items-center text-white
      z-5555 pointer-events-none bg-linear-to-t
      via-transparent to-transparent
      duration-1000 transition-colors
      ${open ? "from-black/50" : "from-transparent"}
      ${anonymous.className}
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
          <div className="w-full h-full grid grid-rows-2 grid-cols-2 xl:grid-cols-4 xl:grid-rows-none rounded-b-4xl overflow-hidden relative transition-grid ease-in-out duration-500" ref={menuRef}>

            {/* CHARACTERS */}
            <div
              onClick={() => handleSelect("characters")}
              onMouseEnter={!isPhone ? () => navMenuSelectHandler("characters") : undefined}
              className={`cursor-pointer flex justify-center items-center bg-[#838177] overflow-hidden relative transition-saturate duration-400 ${activeLink === "characters" ? "saturate-100 brightness-100" : "saturate-60 brightness-60"}`}
            >

              <div className="aspect-square h-[110%] md:h-[130%] xl:h-[95%] flex justify-center items-center">
                <img
                  src="/images/moon-characters.png"
                  className="slower-spin w-auto nonsel pointer-events-none"
                />
              </div>

              <Label activeLink={activeLink} link="characters" title="CHARACTERS" desc="learn about my characters here!" />
            </div>

            {/* GALLERY */}
            <div 
              onClick={() => handleSelect("gallery")}
              onMouseEnter={!isPhone ? () => navMenuSelectHandler("gallery") : undefined}
              className={`cursor-pointer flex justify-center items-center bg-[#393a3b] overflow-hidden relative duration-400 ${activeLink === "gallery" ? "saturate-100 brightness-100" : "saturate-60 brightness-60"}`}
            >
              
              {/* LIGHTS */}
              <div className="absolute w-full h-full grid grid-cols-2 z-800 opacity-70">
                <img className="w-full h-full nonsel pointer-events-none" src="/images/light.png" />
                <img className="w-full h-full nonsel pointer-events-none scale-x-[-1]" src="/images/light.png" />
              </div>

              {/* FEATURED ARTWORK */}
              <div className="h-[90%] absolute flex justify-center items-center">
                <img ref={featArtRef} src={artwork?.url} className={`w-full h-full object-cover nonsel pointer-events-none`} />
              </div>

              {/* CHARACTERS */}
              <div className="absolute bottom-0 w-full h-[50%] xl:h-[40%] grid grid-cols-2">

                {/* LEFT SIDE */}
                <div className="relative">
                  {crowd[0] && (
                    <img
                      src={`/images/figure-${crowd[0].name}.png`}
                      className={`absolute ${crowd[0].name === "ignatius" ? "-right-4" : "right-5"} h-full w-auto max-w-none nonsel pointer-events-none figure-breathe-${crowd[0].pace}`}
                    />
                  )}
                </div>

                {/* RIGHT SIDE */}
                <div className="relative">
                  {crowd[1] && (
                    <img
                      src={`/images/figure-${crowd[1].name}.png`}
                      className={`absolute ${crowd[0].name === "ignatius" ? "left-4" : "left-5"} h-full w-auto max-w-none nonsel pointer-events-none figure-breathe-${crowd[1].pace}`}
                    />
                  )}
                </div>

              </div>

              <Label activeLink={activeLink} link="gallery" title="GALLERY" desc="gaze upon my art!" />
            </div>

            {/* MTWIM */}
            <div 
              onClick={() => handleSelect("mtwim")}
              onMouseEnter={!isPhone ? () => navMenuSelectHandler("mtwim") : undefined}
              className={`cursor-pointer landing-tile flex justify-center items-center bg-[#8b979b] overflow-hidden relative duration-400 ${activeLink === "mtwim" ? "saturate-100 brightness-100" : "saturate-60 brightness-60"}`}
            >
              
              {/* CHARACTERS */}
              <div className="absolute bottom-0 w-full h-full grid grid-cols-2">

                {/* FRANK */}
                <div className="relative flex justify-center">
                  <img
                    src={`/images/mtwimfrank.png`}
                    className={`
                      scale-105
                      translate-x-6
                      min-[768px]:scale-160
                      min-[768px]:translate-x-7
                      min-[1024px]:translate-x-10
                      min-[1280px]:scale-105
                      min-[1280px]:translate-x-9
                      min-[1600px]:translate-x-5
                      transition-translate
                      duration-300
                      absolute 
                      h-full w-auto max-w-none 
                      nonsel pointer-events-none 
                      object-cover`}
                  />
                </div>

                {/* MIER */}
                <div className="relative flex justify-center">
                  <img
                    src={`/images/mtwimmier.png`}
                    className={`
                      scale-105
                      -translate-x-9
                      min-[768px]:scale-160
                      min-[768px]:-translate-x-12
                      min-[1024px]:-translate-x-15
                      min-[1280px]:scale-105
                      min-[1280px]:-translate-x-12
                      min-[1600px]:-translate-x-8
                      transition-translate
                      duration-300
                      absolute 
                      h-full w-auto max-w-none 
                      nonsel pointer-events-none 
                      object-cover`}
                  />
                </div>

              </div>

              {/* <div className="w-full h-full relative">
                <img src="/images/mtwimfrank.png" className="absolute left-0 scale-110 bottom-0 h-full object-cover" />
                <img src="/images/mtwimmier.png" className="absolute right-0 scale-110 bottom-0 h-full object-cover" />
              </div>  */}

              <Label activeLink={activeLink} link="mtwim" title="MTWIM" desc="learn about a story i want to tell!" />
            </div>
            
            {/* GAMES */}
            <div 
              onClick={() => handleSelect("games")}
              onMouseEnter={!isPhone ? () => navMenuSelectHandler("games") : undefined}
              className={`cursor-pointer landing-tile flex justify-center items-center bg-[#8a8b7d] overflow-hidden relative duration-400 ${activeLink === "games" ? "saturate-100 brightness-100" : "saturate-60 brightness-60"}`}
            >
              
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
