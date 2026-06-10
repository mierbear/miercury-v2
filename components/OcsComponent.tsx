"use client";
import { userAgent } from "next/server";
import { useEffect, useState, useRef } from "react";
import OcInfo from "@/components/OcInfoComponent";
import Footer from "@/components/footerComponent";
import Tooltip from "@/components/tooltipComponent";
import { Bodoni_Moda, Noto_Serif_JP, Barlow_Semi_Condensed } from "next/font/google"

const bodoni = Bodoni_Moda({
  weight: "400",
  subsets : ["latin"]
})

const noto = Noto_Serif_JP({
  weight: "400",
  subsets : ["latin"]
})

const barlow = Barlow_Semi_Condensed ({
  weight: "400",
  subsets : ["latin"]
})

export default function Ocs() {

  const blockerRef = useRef<HTMLDivElement | null>(null);

  const blockHandler = (duration: number) => {
    if (!blockerRef.current) return;

    blockerRef.current.style.display = "block";
    setTimeout(() => {
      blockerRef.current!.style.display = "none";
    }, duration);
  }

  // SKULLBOUND
  const calvariusHitboxRef = useRef<HTMLDivElement | null>(null);
  const [currentBrother, setCurrentBrother] = useState("");

  // SCROLL FUNCTIONS
  const mierScrollRef       = useRef<HTMLDivElement | null>(null)
  const kaninScrollRef      = useRef<HTMLDivElement | null>(null)
  const calvariusScrollRef  = useRef<HTMLDivElement | null>(null)
  const quinceScrollRef     = useRef<HTMLDivElement | null>(null)
  const simeonScrollRef     = useRef<HTMLDivElement | null>(null)
  const pioScrollRef        = useRef<HTMLDivElement | null>(null)

  const characters = [
    {name: "mier",      ref: mierScrollRef      },
    {name: "kanin",     ref: kaninScrollRef     },
    {name: "calvarius", ref: calvariusScrollRef },
    {name: "quince",    ref: quinceScrollRef    },
    {name: "simeon",    ref: simeonScrollRef    },
    {name: "pio",       ref: pioScrollRef       }
  ]

  const scrollToHandler = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }

  const [currentOc, setCurrentOc] = useState<string>("mier");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      if (pioScrollRef.current && scrollY >= pioScrollRef.current.offsetTop) {
        setCurrentOc("pio");
      } else if (simeonScrollRef.current && scrollY >= simeonScrollRef.current.offsetTop) {
        setCurrentOc("simeon");
      } else if (quinceScrollRef.current && scrollY >= quinceScrollRef.current.offsetTop) {
        setCurrentOc("quince");
      } else if (calvariusScrollRef.current && scrollY >= calvariusScrollRef.current.offsetTop) {
        setCurrentOc("calvarius");
      } else if (kaninScrollRef.current && scrollY >= kaninScrollRef.current.offsetTop) {
        setCurrentOc("kanin");
      } else {
        setCurrentOc("mier");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const brotherBg =
    currentBrother === "brutus"   ? "bg-[rgba(16,17,20,0.8)]" :
    currentBrother === "ignatius" ? "bg-[rgba(28,25,22,0.8)]" :
    currentBrother === "aurelius" ? "bg-[rgba(26,32,36,0.8)]" :
    currentBrother === "rufus"    ? "bg-[rgba(25,28,23,0.8)]" :
    "rgba(16,17,19,0.6)"
    
  const brotherColors = {
    brutus:   "rgb(114,129,206)",
    ignatius: "rgb(212,174,113)",
    aurelius: "rgb(132,191,210)",
    rufus:    "rgb(157,206,114)"
  }

  const [hoveredMier, setHoveredMier] = useState("");
  const [selectedMier, setSelectedMier] = useState("");
  const mierTyrantRef = useRef<HTMLImageElement | null>(null);
  const bulletHoleRef = useRef<HTMLImageElement | null>(null);
  const flashRef = useRef<HTMLImageElement | null>(null);
  const [shot, setShot] = useState(false);

   // PRELOAD AUDIO
  const audioRefs = useRef<HTMLAudioElement[]>([]);

  useEffect(() => {
    const files = [
      "/audio/shoot-0.mp3",
      "/audio/shoot-1.mp3",
    ];

    audioRefs.current = files.map(src => {
      const audio = new Audio(src);
      audio.preload = "auto";
      return audio;
    });
  }, []);

  const akReadyFX = () => {
    new Audio("/audio/shoot-0.mp3").play();
  }

  const akShootFX = () => {
    new Audio("/audio/shoot-1.mp3").play();
  }

  const mierShoot = () => {
    recoil();
    shatter();
    akShootFX();
    setShot(true);
    bulletHoleRef.current!.style.opacity = "1"
    flashRef.current!.style.opacity = "1"

    setTimeout(() => {
      flashRef.current!.style.opacity = "0"
    }, 50);
  }

  const recoil = () => {
    mierTyrantRef.current?.classList.remove("recoil");
    void mierTyrantRef.current?.offsetWidth;
    mierTyrantRef.current?.classList.add("recoil");
  }
  
  const shatter = () => {
    bulletHoleRef.current?.classList.remove("shatter");
    void bulletHoleRef.current?.offsetWidth;
    bulletHoleRef.current?.classList.add("shatter");
  }

  const [openInfo, setOpenInfo] = useState(false);
  const [openWhy, setOpenWhy] = useState(false);

  const selectMier = (mier: string) => {
    setHoveredMier("");
    setSelectedMier(mier);

     if (mier === "tyrant" && selectedMier !== "tyrant") {
      blockHandler(1400);

      setTimeout(() => {
        akReadyFX()
      }, 100);

      setTimeout(() => {
        mierShoot()
      }, 1000);

    } else {
      clearTyrantDeco();
      blockHandler(1200);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (currentOc !== "mier" && mier === "angel") {
      setTimeout(() => {
        setSelectedMier(mier);
      }, 0);
    }
  }

  useEffect(() => {
    if (currentOc !== "mier" && selectedMier === "angel") {
      setSelectedMier("");
    }
    setOpenWhy(false);
  }, [currentOc, selectedMier]);

  const clearTyrantDeco = () => {
    setShot(false);
    bulletHoleRef.current!.style.opacity = "0"
    flashRef.current!.style.opacity = "0"
  }

  const mierColors = {
    icemage: "#b6c9db",
    angel:   "#4592a5",
    tyrant:  "#9c1313",
  }

  const tooltipText = `
    Pacific Purgatory / PP (the community I host) has no connection or relation to Pacific Purgatory (the musician, Ethan Silva).*
    It was a session title I chose on a whim because I liked their music and it just stuck there overtime for everybody.*
    Ever since then, I've met a lot of friends and artists that I love and look up to. :D (one of them is the reason why I became a webdev, whom I'm deeply grateful for)
    `
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="w-screen max-w-screen align-center flex flex-col bg-[#17191a] relative">
      
      {/* BLOCKER */}
      <div
        className="fixed w-full h-full bg-[#00000000] z-1000 hidden"
        ref={blockerRef}
      >
      </div>

      {/* OC INFO */}
      <div 
        className={`
          fixed w-2xl h-70 z-544 items-center justify-center bottom-4 left-1/2 -translate-x-1/2 bg-gray-200
          ${openInfo ? "flex" : "hidden"}
        `}
      >
        {/* X */}
        <p 
          className="cursor-pointer hover:text-red-500 text-5xl absolute top-2 right-6"
          onClick={() => setOpenInfo(false)}
        >
          x
        </p>
      </div>

      {/* WHY?? */}
      <div 
        className={`
          fixed w-full h-full z-544 items-center justify-center
          backdrop-blur-[2px]
          ${openWhy ? "flex" : "hidden"}
        `}
      >
        <div
          className="bg-gray-200 flex flex-col items-center w-2xl h-auto rounded-3xl text-center nonsel relative"
        >

          {/* X */}
          <p 
            className="cursor-pointer hover:text-red-500 text-4xl absolute top-3 right-3"
            onClick={() => setOpenWhy(false)}
          >
            🞮
          </p>
          
          {/* TEXT */}
          <div className="p-12 pb-[40%]">
            <p>because i have..</p>
            <p className={`text-4xl font-bold slow-breathe ${bodoni.className}`}>same hair syndrome u_u</p>
            <br />
            <p className="text-justify">
              it started as me drawing mier with different hair/eye colors for fun, and then drawing him with black hair since it was easier to just fill in the hair to render it quickly and so on.
            <br />
            <br />
              but as time passed, i slowly realized i clearly havent studied hair structure at all and just had a 'comfort hair' to draw all the time. and even if i try to not make it like mier's hair, the general shape/style still bleeds into other hairstyles i draw because i genuinely really love how it looks.
            <br />
              (which can be very clear to see once you scroll down more...)
            <br />
            <br />
              so now i just let it be and accepted that there are 'multiple versions' of mier LOL
            </p>
          </div>
          
          {/* IMG */}
          <img  
            src="/images/ocs/miers.png"
            className="absolute bottom-0 w-full nonsel pointer-events-none"
          />
        </div>
      </div>

      {/* NAV */}
      <div 
        className={`
          fixed right-4 top-1/2 -translate-y-1/2 z-543 text-white rounded-full
          meow px-3 py-6 gap-2 flex flex-col items-center bg-black/20 nonsel
        `}
      >
        {characters.map((character, index) => (
          <div
            key={index}
            className={`
              group
              ${currentOc === character.name || "cursor-pointer"}
              ${character.name === "mier" && selectedMier === "icemage" ? "hue-rotate-170 rotate-55" :
                character.name === "mier" && selectedMier === "angel"   ? "hue-rotate-150 saturate-50 rotate-140" :
                character.name === "mier" && selectedMier === "tyrant" && "brightness-60 saturate-200 hue-rotate-[-55deg] -rotate-40"}
            `}
            onClick={() => scrollToHandler(character.ref)}
          >
            <img
              src={`/images/ocs/icon-${character.name}.png`}
              className={`
                aspect-square w-15 h-15
                transition-all duration-300 nonsel pointer-events-none
                ${currentOc === character.name 
                  ? "saturate-100 brightness-100 scale-120" 
                  : "saturate-50 brightness-50 scale-100 group-hover:scale-110"}
              `}
            />
          </div>
        ))}
        {/* <p 
          className="w-10 h-10 mt-4 bg-black rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => setOpenInfo(true)}
        >
          ?
        </p> */}
      </div>

      {/* TYRANT DECO - WHY */}
      <div
        className={`
          fixed h-full w-screen z-1000 transition-opacity nonsel pointer-events-none text-[26px]
          ${barlow.className}
        `}
        >
        <img 
          src={`/images/ocs/mier-tyrant-deco.png`}
          className={`
            h-full w-auto max-w-none nonsel pointer-events-none opacity-0
            ${selectedMier === "tyrant" ? "duration-100" : "duration-300"}
          `}
          ref={bulletHoleRef}
        />
        <div
          className={`
            absolute bottom-4 left-4 font-bold nonsel flex gap-4
          `}
        >
          <p
            onClick={() => setOpenWhy(true)} 
            className={`
              transition-opacity duration-300 cursor-pointer text-white/50 hover:text-white
              ${currentOc === "mier" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
          >
            why are there multiple miers ?? this makes no sense !!
          </p>
        </div>

        <div
          className={`
            absolute bottom-4 right-4 font-bold nonsel flex gap-4
          `}
        >
          
          <p
            onClick={() => mierShoot()} 
            className={`
              transition-opacity duration-300 cursor-pointer text-white/50 hover:text-white
              ${currentOc === "mier" && selectedMier === "tyrant" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
          >
            shoot me again
          </p>
          
          <p
            className={`
              transition-opacity duration-300 text-white/50
              ${currentOc === "mier" && shot ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
          >
            |
          </p>
          
          <p 
            onClick={() => clearTyrantDeco()} 
            className={`
              transition-opacity duration-300 cursor-pointer text-white/50 hover:text-white
              ${shot ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
          >
            clear
          </p>

        </div>
      </div>

      {/* ANGEL SELECT */}
      <div 
        className={`
          flex items-center justify-center scale-100
          w-screen h-screen z-200 fixed nonsel pointer-events-none
          transition-brightness duration-600
          ${currentOc === "mier" ? "brightness-100" : "brightness-50"}
        `}
      >
        <div 
          className={`
            w-full h-full flex items-center justify-center
            transition-brightness duration-600
            ${selectedMier === "angel" ? "brightness-100" : "brightness-50"}
          `}
        >
          <img
            src="/images/ocs/mier-angel.png"
            className={`
              transition-transform ease-in-out absolute min-h-full w-auto max-w-none bg-cover
              ${selectedMier === "angel" ? "translate-y-0 duration-1200" : "translate-y-[200vh] duration-1600"}
            `}
          />
          {Array.from({ length: 10 }, (_, i) => (
            <img 
              key={i} 
              src={`images/ocs/mier-angel-deco-${String(i).padStart(2, '0')}.png`}
              style={{ animationDelay: `${i * 0.15}s` }}
              className={`
                transition-transform ease-in-out absolute scale-200 panic
                ${selectedMier === "angel" ? "translate-y-0 duration-1200" : "translate-y-[200vh] duration-1600"}
              `}
            />
          ))}
        </div>
      </div>

      {/* MIERS */}
      <div className="h-[10vh] brightness-40 saturate-70 bg-linear-to-b from-[rgb(25,27,29)] to-[rgb(25,27,29)]" ref={mierScrollRef} />
      <div 
        className={`
          w-screen max-w-screen h-[80vh] max-h-[80vh]
          justify-center align-center items-center
          flex flex-col relative bg-[#879da7]
          overflow-hidden
        `}
      >

        {/* ANGEL INFO */}
        <div
          className={`
            z-200 bg-[rgba(16,17,19,0.7)] absolute w-[60%] h-[33%] bottom-4 px-16 nonsel
            flex flex-col items-center justify-center text-white duration-300 ease-in-out
            ${selectedMier === "angel" ? "opacity-100 duration-1200 pointer-events-auto" : "opacity-0 duration-200 pointer-events-none"}
            ${noto.className}
          `}
        >
          <p className={`text-6xl text-nowrap ${bodoni.className}`}>
            Mier
          </p>
          <p className="text-nowrap text-xl">
            The Guide
          </p>
          <br />
          <p className="text-center">
            Created as a magician character back in 2018. Many revisions were made and now finalized as a sort of messenger that can travel between worlds.
            <br />
            He acts as my artist 'mascot' which I draw frequently.
          </p>
        </div>

        {/* GRIDS */}
        <div 
          className={`
          w-full h-full grid transition-grid duration-800 absolute
          ${hoveredMier  === "icemage" ? "grid-cols-[2.6fr_1.2fr_1fr]" :
            hoveredMier  === "angel"   ? "grid-cols-[1.1fr_2.6fr_1.1fr]" :
            hoveredMier  === "tyrant"  ? "grid-cols-[1fr_1.2fr_2.6fr]" :
            selectedMier === "icemage" ? "grid-cols-[1fr_0fr_0fr]" :
            selectedMier === "angel"   ? "grid-cols-[0fr_1fr_0fr]" :
            selectedMier === "tyrant"  ? "grid-cols-[0fr_0fr_1fr]" :
            "grid-cols-[1fr_1fr_1fr] duration-1200"
          }
          `}
        >
          {/* ICE MAGE */}
          <div
            className={`
              w-full h-full relative flex items-end justify-center cursor-pointer
              transition-brightness duration-600 overflow-hidden 
              ${currentOc !== "mier" || currentOc === "mier" && selectedMier && selectedMier !== "icemage" ? "brightness-50" :
                selectedMier === "icemage" || hoveredMier === "icemage" || !hoveredMier ? "brightness-100" : "brightness-50"
              }
            `}
            onMouseEnter={selectedMier ? undefined : () => setHoveredMier("icemage")}
            onMouseLeave={() => setHoveredMier("")}
            onClick={selectedMier === "icemage" ? () => selectMier("") : () => selectMier("icemage")}
          >
            <img 
             className={`
              absolute object-cover h-full min-w-full transition-scale duration-2000 nonsel pointer-events-none
              ${selectedMier === "icemage" ? "scale-110" : "scale-100"}
             `}
             src={`/images/ocs/mier-icemage-bg.jpg`}
            />
            <img 
              src={`/images/ocs/mier-intro-icemage.png`} 
              className={`
                absolute object-cover h-full nonsel pointer-events-none
                transition-transform duration-1200 scale-170
                ${selectedMier && "translate-x-[-200vw] duration-1400"}
              `}
            />

          </div>

          {/* ANGEL */}
          <div
            className={`
              w-full h-full relative flex items-end justify-center cursor-pointer
              transition-brightness duration-600 overflow-hidden
              ${currentOc !== "mier" || currentOc === "mier" && selectedMier && selectedMier !== "angel" ? "brightness-50" :
                selectedMier === "angel" || hoveredMier === "angel" || !hoveredMier ? "brightness-100" : "brightness-50"
              }
            `}
            onMouseEnter={selectedMier ? undefined : () => setHoveredMier("angel")}
            onMouseLeave={() => setHoveredMier("")}
            onClick={selectedMier === "angel" ? () => selectMier("") : () => selectMier("angel")}
          >
            <img 
             className={`
              absolute object-cover h-full min-w-full transition-scale duration-2000 nonsel pointer-events-none
              ${selectedMier === "angel" ? "scale-110" : "scale-100"}
             `}
             src={`/images/ocs/mier-angel-bg.jpg`}
            />
            <img 
              src={`/images/ocs/mier-intro-angel.png`} 
              className={`
              absolute object-cover h-full nonsel pointer-events-none
              transition-transform duration-1200 scale-160
              ${selectedMier && "translate-y-[200vh]"}
            `}
            />
          </div>

          {/* TYRANT */}
          <div
            className={`
              w-full h-full relative flex items-end justify-center cursor-pointer
              transition-brightness duration-600 overflow-hidden
              ${currentOc !== "mier" || currentOc === "mier" && selectedMier && selectedMier !== "tyrant" ? "brightness-50" :
                selectedMier === "tyrant" || hoveredMier === "tyrant" || !hoveredMier ? "brightness-100" : "brightness-50"
              }
            `}
            onMouseEnter={selectedMier ? undefined : () => setHoveredMier("tyrant")}
            onMouseLeave={() => setHoveredMier("")}
            onClick={selectedMier === "tyrant" ? () => selectMier("") : () => selectMier("tyrant")}
          >
            <img 
             className={`
              absolute object-cover h-full min-w-full transition-scale duration-2000 nonsel pointer-events-none
              ${selectedMier === "tyrant" ? "scale-110" : "scale-100"}
             `}
             src={`/images/ocs/mier-tyrant-bg.jpg`}
            />
            <img 
              src={`/images/ocs/mier-intro-tyrant.png`}
              className={`
                absolute object-cover h-full nonsel pointer-events-none
                transition-transform duration-1200 scale-170
                ${selectedMier && "translate-x-[200vw] duration-1400"}
              `}
            />

          </div>

        </div>

        {/* ICE MAGE SELECT */}
        <div 
          className={`
            absolute w-full h-full grid grid-cols-[1.5fr_0.25fr_1fr_0.25fr]
            nonsel pointer-events-none transition-brightness duration-600
            ${currentOc === "mier" ? "brightness-100" : "brightness-50"}
          `}
        >

          <div 
            className={`
              w-full h-full relative col-span-2 flex items-center justify-center
              transition-brightness duration-600
              ${selectedMier === "icemage" ? "brightness-100" : "brightness-50"}
            `}
          >
            <img
              src="/images/ocs/mier-icemage-0.png"
              className={`
                h-full w-auto max-w-none absolute transition-transform ease-in-out scale-120
                ${selectedMier === "icemage" ? "translate-x-0 duration-1100" : "translate-x-[-100vw] duration-1800"}
              `}
            />
            <div
              className={`
                h-full w-full max-w-none absolute transition-transform ease-in-out scale-110 slow-backwards-spin flex items-center justify-center
                ${selectedMier === "icemage" ? "translate-x-0 duration-1100" : "translate-x-[-100vw] duration-1800"}
              `}
            >
              {Array.from({ length: 22 }, (_, i) => (
                <img 
                  key={i} 
                  src={`images/ocs/mier-icemage-deco-${String(i).padStart(2, '0')}.png`}
                  style={{ animationDelay: `${i * 1}s` }}
                  className={`
                    w-auto h-full ease-in-out absolute scaleless-waves
                  `}
                />
              ))}
            </div>
            <img
              src="/images/ocs/mier-icemage-1.png"
              className={`
                h-full w-auto max-w-none absolute transition-transform ease-in-out scale-120
                ${selectedMier === "icemage" ? "translate-x-0 duration-1100" : "translate-x-[-100vw] duration-1800"}
              `}
            />
          </div>
          
          <div
            className={`
              duration-300 w-full ease-in-out
              ${selectedMier === "icemage" ? "opacity-100 duration-1200 pointer-events-auto" : "opacity-0 duration-200 pointer-events-none"}
            `}
          >
            <OcInfo
              name="Mier Colwyn"
              title="The Ice Mage"
              info={`
                Despite being orphaned and losing everything, he strives to be the strongest mage (physically) after being taken under the tutelage of Frank, The Ice Cannon.*
                This is a Gurren Lagann ripoff that I've thought about and written a lot for, which I'll make into a 3D animated series in the far future...*
                (This is also generally 'the only Mier' that I want to show off to the wider public with his individual story.. The other two really only act as a mascot/persona when I'm drawing with friends or for fun.)
              `} 
            />
          </div>

          <div />

        </div>

        {/* TYRANT SELECT */}
        <div 
          className={`
            absolute w-full h-full grid grid-cols-[0.25fr_1fr_0.25fr_1.5fr]
            nonsel pointer-events-none transition-brightness duration-600
            ${currentOc === "mier" ? "brightness-100" : "brightness-50"}
          `}
        >

          <div />

          <div
            className={`
              pointer-events-auto ease-in-out
              ${selectedMier === "tyrant" ? "opacity-100 duration-1200 pointer-events-auto" : "opacity-0 duration-200 pointer-events-none"}
            `}
            onMouseEnter={() => clearTyrantDeco()}
          >
            
              <div
                className={`
                  flex relative flex-col items-center text-center justify-center
                  w-full h-full text-white px-16
                  nonsel pointer-events-none ${noto.className}
                `}
                style={{ backgroundColor: "rgba(16,17,19,0.7)" }}
              >
                
                {/* NAME */}
                <p className={`text-6xl text-nowrap ${bodoni.className}`}>
                  Mier Morozov
                </p>

                {/* TITLE */}
                <p className="text-nowrap text-xl">
                  The&nbsp; 
                  <span className="line-through">
                    Little
                  </span>
                  &nbsp;Tyrant of Pacific Purgatory
                </p>
                <br />
                  
                {/* INFO */}
                <div className="gap-4 flex flex-col">
                  <p>
                    Made as the pirate captain of&nbsp;
                    <span 
                      className="underline underline-offset-2 pointer-events-auto decoration-white/50 hover:decoration-white cursor-help"
                      onMouseEnter={() => setTooltipVisible(true)}
                      onMouseLeave={() => setTooltipVisible(false)}
                    >
                    Pacific Purgatory (?)
                    </span>
                    , an art community I grew in Drawpile since the May of 2023.
                    <br />
                  </p>
                  <p>Since 90% of the sessions and artists in Drawpile were and for furry/nsfw art, I conjured/adapted the most offensive and obnoxiously edgy character/persona in a pure contrarian act and love of counter culture.</p>
                  <p>He is a ruthless, psychopathic and genocidal maniac who has a deep seated hatred for furries and nsfw artists.</p>
                  <p>(It should obviously go without saying that he's supposed to be a satirical and extreme character lol)</p>
                </div>
                <br />

                {/* <img 
                  className="absolute bottom-0 opacity-30"
                  src="/images/ocs/${name.toLowerCase()}-alt.png"
                /> */}

              </div>

          </div>

          <div 
            className={`
              w-full h-full relative col-span-2 flex items-center justify-center
              transition-brightness duration-600
              ${selectedMier === "tyrant" ? "brightness-100" : "brightness-50"}
            `}
          >
            <img
              src="/images/ocs/mier-tyrant.png"
              ref={mierTyrantRef}
              className={`
                h-full w-auto max-w-none absolute transition-transform ease-in-out scale-120
                ${selectedMier === "tyrant" ? "translate-x-0 duration-1100" : "translate-x-[100vw] duration-1800"}
              `}
            />
            <img
              src="/images/ocs/mier-tyrant-flash.png"
              ref={flashRef}
              className={`
                h-full w-auto max-w-none absolute opacity-0 transition-transform ease-in-out scale-120
                ${selectedMier === "tyrant" ? "translate-x-0 duration-1100" : "translate-x-[100vw] duration-1800"}
              `}
            />
          </div>

        </div>
          
      </div>

      {/* KANIN */}
      <div className="h-[10vh] z-201 flex items-center justify-center relative" ref={kaninScrollRef}>
        <div className="w-full h-full brightness-40 saturate-70 bg-linear-to-b from-[rgb(25,27,29)] to-[rgb(25,27,29)] absolute" />

        <div
          className={`
            absolute grid gap-2 h-full w-auto py-2 scale-120
            transition-all duration-600 grid-cols-3
            ${selectedMier || "subtle-breathe"}
            ${currentOc === "mier" ? "translate-y-[-30%] brightness-100 opacity-100" : "translate-y-full brightness-40 opacity-0 pointer-events-none"}
          `}
        >

          {["icemage", "angel", "tyrant"].map((mier, index) => (
          <div
            key={index}
            className={`
              w-full h-full flex items-center justify-center cursor-pointer shadow-2xl
              overflow-hidden border-5 rounded-full duration-300 hover:scale-102
              ${selectedMier === mier || hoveredMier === mier ? "scale-102 saturate-100" 
              : selectedMier && selectedMier !== mier ? "scale-98 hover:saturate-100 saturate-20 brightness-75 hover:brightness-100" 
              : "saturate-100"}
              `}
            onClick={selectedMier === mier ? () => selectMier("") : () => selectMier(mier)}
            onMouseEnter={selectedMier ? undefined : () => setHoveredMier(mier)}
            onMouseLeave={() => setHoveredMier("")}
            style={{ borderColor: mierColors[mier as keyof typeof mierColors] }}
          >
            <img 
              src={`/images/ocs/mier-portrait-${mier}.png`} 
              className={`
                w-full h-full object-cover nonsel pointer-events-none
                transition-scale duration-300
                ${selectedMier === mier ? "scale-120" : "scale-110"}
              `}
            />
          </div>
          ))}
        </div>

        {/* <p 
          className={`
            brightness-100 transition-opacity duration-300 text-white/80 cursor-pointer nonsel
            underline-offset-2 underline decoration-white/50 hover:decoration-white/80
            ${currentOc !== "mier" ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
          onClick={() => setOpenWhy(true)}
        >
          why are there multiple miers ?? this makes no sense !! 
        </p> */}
      </div>
      <div
        className={`
          w-screen max-w-screen h-[80vh] max-h-[80vh] z-201
          justify-center align-center items-center
          flex flex-col relative bg-[rgb(25,27,29)]
          overflow-hidden transition-brightness duration-600
          ${currentOc === "kanin" ? "brightness-100" : "brightness-50"}
        `}
      >

        <div className="w-full h-full grid grid-cols-[1.5fr_0.25fr_1fr_0.25fr]">

          <div className="w-full h-full relative col-span-2 flex items-center justify-center">
            <img src="/images/stars.png" className="absolute h-full w-auto object-cover overflow-visible nonsel pointer-events-none scale-400 spin spin-slow" />
            <img src="/images/stars2.png" className="absolute h-full w-auto object-cover overflow-visible nonsel pointer-events-none scale-400 spin spin-medium" />
            <img src="/images/ocs/kanin-0.png" className="absolute h-full w-auto object-cover overflow-visible nonsel pointer-events-none" />
            <img src="/images/ocs/kanin-deco.png" className="absolute h-full w-auto object-cover overflow-visible nonsel pointer-events-none translate-y-[50%] slowest-spin" />
            <img src="/images/ocs/kanin-1.png" className="absolute h-full w-auto object-cover overflow-visible nonsel pointer-events-none" />
          </div>
          
          <OcInfo 
            name="Kanin" 
            title="The Gatekeeper"
            info={`
              At the cost of a rib, made as the distant and alluring counterpart for Mier, also as a 'mascot' herself.
            `}
          />
          <div />

        </div>

      </div>
      
      {/* CAVARIUS */}
      <div className="h-[10vh] brightness-40 saturate-70 bg-linear-to-b from-[rgb(25,27,29)] to-[rgb(36,46,60)] z-201" ref={calvariusScrollRef} />
      <div 
        className={`
          w-screen max-w-screen h-[80vh] max-h-[80vh] z-201
          justify-center align-center items-center
          flex flex-col relative bg-[rgb(36,48,60)]
          overflow-hidden transition-brightness duration-600
          ${currentOc === "calvarius" ? "brightness-100" : "brightness-50"}
        `}
      >

        {/* IMAGES */}
        <div
          className={`
            w-full h-full relative flex items-center justify-center transition-transform duration-1600
            ${currentBrother === 
              "ignatius" ? "translate-x-[83%] translate-y-[66%] scale-360" :
              currentBrother ===
              "brutus"   ? "translate-x-[-76%] translate-y-[106%] scale-360" :
              currentBrother ===
              "aurelius" ? "translate-x-[60%] translate-y-[29%] scale-360" :
              currentBrother ===
              "rufus"    ? "translate-x-[-62%] translate-y-[-10%] scale-360" :
              "translate-y-[16%] scale-140 -rotate-7"
            }
          `}
        >
          <img 
            src="/images/ocs/calvarius-bg.jpg"
            className={`
              ${currentBrother ? "brightness-80" : "brightness-100"}
              transition-brightness duration-600 h-full w-auto nonsel pointer-events-none
              object-cover absolute scale-120 translate-y-[-5%]
            `}
          />
          <img
            className={`
              h-full w-auto max-w-none absolute nonsel pointer-events-none transition-all duration-1600
              ${currentBrother === "brutus" ? "saturate-100 brightness-100 scale-105 origin-top-left blur-[0px]" :
                currentBrother && currentBrother !== "brutus" ? "saturate-50 brightness-70 scale-100 blur-[1px]" :
                "saturate-100 brightness-100 scale-100 blur-[0px]"
              }
            `}
            src="/images/ocs/calvarius-brutus.png"
          />
          <img
            className={`
              h-full w-auto max-w-none absolute nonsel pointer-events-none transition-all duration-1600
              ${currentBrother === "ignatius" ? "saturate-100 brightness-100 scale-105 origin-top-right blur-[0px]" :
                currentBrother && currentBrother !== "ignatius" ? "saturate-50 brightness-70 scale-100 blur-[1px]" :
                "saturate-100 brightness-100 scale-100 blur-[0px]"
              }
            `}
            src="/images/ocs/calvarius-ignatius.png"
          />
          <img
            className={`
              h-full w-auto max-w-none absolute nonsel pointer-events-none transition-all duration-1600
              ${currentBrother === "aurelius" ? "saturate-100 brightness-100 scale-110 origin-bottom-right blur-[0px]" :
                currentBrother && currentBrother !== "aurelius" ? "saturate-50 brightness-70 scale-100 blur-[1px]" :
                "saturate-100 brightness-100 scale-100 blur-[0px]"
              }
            `}
            src="/images/ocs/calvarius-aurelius.png"
          />
          <img
            className={`
              h-full w-auto max-w-none absolute nonsel pointer-events-none transition-all duration-1600
              ${currentBrother === "rufus" ? "saturate-100 brightness-100 scale-110 origin-bottom-left blur-[0px]" :
                currentBrother && currentBrother !== "rufus" ? "saturate-50 brightness-70 scale-100 blur-[1px]" :
                "saturate-100 brightness-100 scale-100 blur-[0px]"
              }
            `}
            src="/images/ocs/calvarius-rufus.png"
          />
        </div>
        
        {/* BROTHER INFO */}
        <div className="w-full h-full grid grid-cols-2 absolute">
          <div className="w-full h-full relative" />
          
          <div
            className={`
              absolute grid h-full w-screen z-20
              transition-all duration-800 nonsel
              ${currentBrother === "brutus" ? "grid-cols-[1.75fr_1fr_0.25fr]"
              : currentBrother === "rufus" ?   "grid-cols-[1.75fr_1fr_0.25fr]"
              : currentBrother === "ignatius" ?   "grid-cols-[0.25fr_1fr_1.75fr]"
              : currentBrother === "aurelius" ?  "grid-cols-[0.25fr_1fr_1.75fr]"
              : "grid-cols-[1fr_1fr_1fr]"
              }
            `}
          >
            <div 
              className={`${currentBrother ? "cursor-pointer" : "pointer-events-none"}`}
              onClick={() => {
                blockHandler(1200);
                setCurrentBrother("");
                calvariusScrollRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            />
            
            {/* INFO */}
            <div 
              className={`
              flex flex-col relative items-center text-center
              w-full h-full text-white
              ${currentBrother 
                ? `${brotherBg} duration-600 backdrop-blur-[5px]` 
                : "bg-[#00000000] duration-200 backdrop-blur-[0px]"}
              `}
            >
              
              {currentBrother === "ignatius" && (
                <OcInfo 
                  name="Ignatius"
                  title="The 2nd Son / The Buffoon"
                  hidebg={true}
                  list={true}
                  info="
                  The mischief of the group. He likes to playfully tease his younger brothers, angering Rufus and scaring Aurelius. (mostly angering Rufus)
                  *Primarily fights with a spear, being able to run around nimbly and effectively poke enemies from afar. (balanced)
                  *Very active and hates dull moments. He loves making people laugh and is a bit of an adrenaline junkie.
                  *Highly respects Brutus and wishes to be someone like him. Deep inside, he doubts if he is capable of it, masking it with his joker personality.
                  *In the end, he fully believes in himself as he embodies the man he wants and needs to be.
                  "
                />
              )}
              {currentBrother === "aurelius" && (
                <OcInfo 
                  name="Aurelius"
                  title="The 3rd Son / The Crybaby"
                  hidebg={true}
                  list={true}
                  info="
                  The heart of the group. Despite the overwhelmingly distressing situation they are in (and being the first to cry), he always sees the bright side of things and always relays it to his brothers
                  *Primarily fights with a giant hammer that is counter-balanced with the heavy skull on his right shoulder, while being the most effective with using magic attacks (mage / heavy-hitter)
                  *He is forgiving of wrongdoers and can be a bit naive, which his brothers have to tell him off from time to time.
                  *In his free time, he is often seen exploring on his own in the woods inspecting insects/creatures.
                  *In the end, he stands up and faces his fears head on even if he’s crying.
                  "
                />
              )}
              {currentBrother === "rufus" && (
                <OcInfo 
                  name="Rufus"
                  title="The 4th Son / The Indignant"
                  hidebg={true}
                  list={true}
                  info="
                  The hothead of the group, he can't control his anger. (lol)
                  *Primarily fights with a sword, while also using the skull on his head to sprint head on towards enemies to ram them with the point. (glass cannon)
                  *Despite being the youngest, he is very protective over Aurelius as if he were the older brother.
                  *Him and Ignatius are very competitive against each other, frequently getting into petty fights, only to make up 5 minutes later.
                  *In the end, he reigns in his anger and have it no longer dictate his judgement.
                  "
                />
              )}
              {currentBrother === "brutus" && (
                <OcInfo 
                  name="Brutus"
                  title="The 1st Son / The Unwavering"
                  hidebg={true}
                  list={true}
                  info="
                  The leader and brain of the group, usually scolds Ignatius for misbehaving. (and Rufus for following along)
                  *Primarily fights with a giant greatsword, being able to take many hits while dealing heavy damage with his sword and ramming through enemies with the three-pointed skull on his left shoulder. (tank)
                  *At nighttime, he stays awake for as long as he can until he falls asleep, watching over his brothers.
                  *Discreetly favors Aurelius over the other two. He tries his best to guide him in everything he knows in his knowledge as the oldest brother, rather than in physical capability.
                  *In the end, he learns to no longer worry and have faith in his brothers capabilities.
                  "
                />
              )}

            </div>

            <div 
              className={`${currentBrother ? "cursor-pointer" : "pointer-events-none"}`}
              onClick={() => {
                blockHandler(1200);
                setCurrentBrother("");
                calvariusScrollRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            />

          </div>

        </div>

      </div>

      {/* QUINCE */}
      <div className="h-[10vh] z-201 relative flex items-center justify-center" ref={quinceScrollRef}>
        <div className="w-full h-full brightness-40 saturate-70 bg-linear-to-b from-[rgb(36,46,60)] to-[rgb(24,28,25)] absolute" />
        <div
          className={`
            absolute grid gap-2 h-full w-auto py-2 scale-120
            transition-all duration-600 grid-cols-4
            ${currentBrother || "subtle-breathe"}
            ${currentOc === "calvarius" ? "translate-y-[-30%] brightness-100 opacity-100" : "translate-y-full brightness-40 opacity-0 pointer-events-none"}
          `}
        >

          {["ignatius", "aurelius", "rufus", "brutus"].map((brother, index) => (
          <div
            key={index}
            className={`
              w-full h-full flex items-center justify-center cursor-pointer shadow-2xl
              overflow-hidden border-5 rounded-full duration-300 hover:scale-102
              ${currentBrother === brother ? "scale-102 saturate-100" 
              : currentBrother && currentBrother !== brother ? "scale-98 hover:saturate-100 saturate-20 brightness-75 hover:brightness-100" 
              : "saturate-100"}
              `}
            onClick={() => {
              blockHandler(1200);
              setCurrentBrother(currentBrother === brother ? "" : brother);
              calvariusScrollRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{ borderColor: brotherColors[brother as keyof typeof brotherColors] }}
          >
            <img 
              src={`/images/ocs/calvarius-pfp-${brother}.png`} 
              className={`
                w-full h-full object-cover nonsel pointer-events-none
                transition-scale duration-300
                ${currentBrother === brother ? "scale-120" : "scale-110"}
              `}
            />
          </div>
          ))}
        </div>
      </div>
      <div 
        className={`
          w-screen max-w-screen h-[80vh] max-h-[80vh] z-201
          justify-center align-center items-center
          flex flex-row relative bg-[rgb(24,28,25)] 
          overflow-hidden transition-brightness duration-600
          ${currentOc === "quince" ? "brightness-100" : "brightness-50"}
        `}
      >

        <div className="w-full h-full grid grid-cols-[1.5fr_0.25fr_1fr_0.25fr]">

          <div className="w-full h-full relative col-span-2 flex items-center justify-center overflow-visible">
            <img src="/images/ocs/fd-0.png" className="absolute h-full w-auto object-cover translate-x-20 overflow-visible nonsel pointer-events-none lurk" />
            <img src="/images/ocs/fd-1.png" className="absolute h-full w-auto object-cover translate-x-20 overflow-visible nonsel pointer-events-none" />
            <img src="/images/ocs/fd-2.png" className="absolute h-full w-auto object-cover translate-x-20 overflow-visible nonsel pointer-events-none panic" />
            <img src="/images/ocs/fd-3.png" className="absolute h-full w-auto object-cover translate-x-20 overflow-visible nonsel pointer-events-none panic" />
          </div>
          
          <OcInfo
            name="Quince"
            title="The Flower Delivery Boy" 
            bg="rgba(13,16,15,0.7)"
            info={`
              Tricked into a false delivery by a demonic deity, he now must find a way out of a kingdom gone horribly mad.
              *Planning to make this into a survival horror RPG, blatantly inspired by the Fear & Hunger series by Miro Haverinen.
            `}
          />
          <div />

        </div>

      </div>

      {/* SIMEON */}
      <div className="h-[10vh] brightness-40 saturate-70 bg-linear-to-b from-[rgb(24,28,25)] to-[rgb(28,37,44)] z-201" ref={simeonScrollRef} />
      <div 
        className={`
          w-screen max-w-screen h-[80vh] max-h-[80vh] z-201
          justify-center align-center items-center
          flex flex-col relative bg-[rgb(28,37,44)]
          overflow-hidden transition-brightness duration-600
          ${currentOc === "simeon" ? "brightness-100" : "brightness-50"}
        `}
      >

        <div className="w-full h-full grid grid-cols-[0.25fr_1fr_0.25fr_1.5fr]">
          
          <div />
          <OcInfo 
            name="Simeon"
            title="The Sunken One" 
            bg="rgba(12,16,20,0.7)"
            info={`
              In a twist of fate, he embarks on a journey to the depths in search of his brother amongst the crowd of souls in the sea.
              *(also planned to be made as a horror but tear-jerker RPG ...though it's fair to say every story I make is sad lol)
            `}
          />

          <div className="w-full h-full relative col-span-2 flex items-center justify-center">
            <img src="/images/ocs/simeon.png" className="h-full w-auto max-w-none absolute nonsel pointer-events-none" />
          </div>
          
        </div>

      </div>

      {/* PIO */}
      <div className="h-[10vh] brightness-40 saturate-70 bg-linear-to-b from-[rgb(28,37,44)] to-[rgb(56,54,49)] z-201" ref={pioScrollRef} />
      <div
        className={`
          w-screen max-w-screen h-[80vh] max-h-[80vh] z-201
          justify-center align-center items-center
          flex flex-col relative bg-[rgb(56,54,49)]
          overflow-hidden transition-brightness duration-600
          ${currentOc === "pio" ? "brightness-100" : "brightness-50"}
        `}
      >

        <div className="w-full h-full grid grid-cols-[1.5fr_0.25fr_1fr_0.25fr]">

          <div className="w-full h-full relative col-span-2 flex items-center justify-center">
            <img src="/images/ocs/pio.png" className="h-full w-auto max-w-none absolute nonsel pointer-events-none" />
          </div>
          
          <OcInfo
            name="Pio" 
            title="The Deaf Hermit"
            info="Outcasted by everyone, he finds solace and friendship with his metallic friend.*(currently my least worked on story, might fully redesign them in the future)" 
            bg="rgba(11,11,10,0.7)"
          />
          <div />

        </div>

      </div>

      <div className="h-[10vh] flex flex-col z-201 bg-[#101113]">
        <div className="h-full bg-linear-to-b from-[rgb(27,27,25)] to-[#101113]" />
        <Footer />
      </div>

      <Tooltip info={tooltipText} status={tooltipVisible} structured={true} />
    </div>
  )
}