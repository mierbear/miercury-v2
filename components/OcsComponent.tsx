"use client";
import { userAgent } from "next/server";
import { useEffect, useState, useRef } from "react";
import OcInfo from "@/components/OcInfoComponent";
import Footer from "@/components/footerComponent";

export default function Ocs() {

  const [hoveredMier, setHoveredMier] = useState("");
  const [selectedMier, setSelectedMier] = useState("");
  const blockerRef = useRef<HTMLDivElement | null>(null);
  const mierAngelRef = useRef<HTMLImageElement | null>(null);
  const mierTyrantRef = useRef<HTMLImageElement | null>(null);
  const bulletHoleRef = useRef<HTMLDivElement | null>(null);
  const flashRef = useRef<HTMLImageElement | null>(null);

  const blockHandler = (duration: number) => {
    if (!blockerRef.current) return;

    blockerRef.current.style.display = "block";
    setTimeout(() => {
      blockerRef.current!.style.display = "none";
    }, duration);
  }

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

  // const [checkedMiers, setCheckedMiers] = useState(0);

  // const mierCheckHandler = () => {
  // }

  const [openInfo, setOpenInfo] = useState(false);
  const [openWhy, setOpenWhy] = useState(false);

  const mierSelectHandler = (mierType: string) => {
    if (!mierAngelRef.current || !bulletHoleRef.current || !flashRef.current) return;
    setHoveredMier("");

    if (selectedMier === mierType) {
      setSelectedMier("")
    } else if (
        mierType === "icemage" && selectedMier === "tyrant" ||
        mierType === "tyrant" && selectedMier === "icemage" ||
        mierType === "angel" && selectedMier ||
        selectedMier === "angel" && mierType
      ) {
      setSelectedMier(mierType)
      mierAngelRef.current.style.opacity = "0";
      setTimeout(() => {
        mierAngelRef.current!.style.opacity = "1";
      }, 1200);
    } else {
      setSelectedMier(mierType)
    }

    // TYRANT CONDITION
    if (mierType === "tyrant" && selectedMier !== "tyrant") {
      blockHandler(1400);

      setTimeout(() => {
        akReadyFX()
      }, 100);

      setTimeout(() => {
        mierShoot()
      }, 1000);

    } else {
      blockHandler(1200);
      bulletHoleRef.current!.style.opacity = "0"
      flashRef.current!.style.opacity = "0"
    }

  }

  // SKULLBOUND
  const calvariusHitboxRef = useRef<HTMLDivElement | null>(null);
  const [currentBrother, setCurrentBrother] = useState("");

  // SCROLL FUNCTIONS
  const mierScrollRef   = useRef<HTMLDivElement | null>(null)
  const kaninScrollRef  = useRef<HTMLDivElement | null>(null)
  const calvariusScrollRef  = useRef<HTMLDivElement | null>(null)
  const quinceScrollRef = useRef<HTMLDivElement | null>(null)
  const simeonScrollRef = useRef<HTMLDivElement | null>(null)
  const pioScrollRef    = useRef<HTMLDivElement | null>(null)

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
    currentBrother === "brutus"   ? "bg-[rgba(15,16,20,0.6)]" :
    currentBrother === "ignatius" ? "bg-[rgba(29,25,21,0.6)]" :
    currentBrother === "aurelius" ? "bg-[rgba(26,32,36,0.6)]" :
    currentBrother === "rufus"    ? "bg-[rgba(25,29,22,0.6)]" :
    "rgba(16,17,19,0.6)"

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
          className="bg-gray-200 flex flex-col items-center w-2xl h-[80%] rounded-3xl text-center nonsel relative"
        >

          {/* X */}
          <p 
            className="cursor-pointer hover:text-red-500 text-5xl absolute top-2 right-6"
            onClick={() => setOpenWhy(false)}
          >
            x
          </p>
          
          {/* TEXT */}
          <div className="p-12">
            <p className="text-3xl underline">why many miers??</p>
            <br />
            <p>because i have..</p>
            <p className="text-5xl font-bold  slow-breathe">same hair syndrome u_u</p>
            <br />
            <br />
            <p className="text-justify">
              it started as me drawing mier with different hair/eye colors for fun, and then drawing him with black hair since it was easier to just fill in the hair to render it quickly, then so on.
            <br />
            <br />
              but as time passed i slowly realized i clearly havent studied hair structure at all and just had a 'comfort hair' to draw all the time. and even if i try not to make it like mier's hair, the general shape/style still bleeds into other hairstyles i draw because i genuinely really love how it looks.
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
            className="cursor-pointer"
            onClick={() => scrollToHandler(character.ref)}
          >
            <img
              src={`/images/ocs/icon-${character.name}.png`}
              className={`
                aspect-square w-15 h-15 scale-110
                transition-all duration-300 nonsel
                pointer-events-none
                ${currentOc === character.name ? "saturate-100 brightness-100 scale-120" : "saturate-50 brightness-50 scale-100"}
              `}
            />
          </div>
        ))}
        <p 
          className="w-10 h-10 mt-4 bg-black rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => setOpenInfo(true)}
        >
          ?
        </p>
      </div>

      {/* DECO - TYRANT */}
      <div
        className={`
          fixed h-full w-screen z-5556 transition-opacity nonsel pointer-events-none opacity-0
          ${selectedMier === "tyrant" ? "duration-100" : "duration-300"}
        `}
        ref={bulletHoleRef}
      >
        <img 
          src={`/images/ocs/mier-tyrant-deco.png`}
          className="h-full w-auto max-w-none nonsel pointer-events-none"
        />
      </div>

      {/* MIERS */}
      <div className="h-[10vh] brightness-40 saturate-70 bg-linear-to-b from-[rgb(25,27,29)] to-[rgb(25,27,29)]" ref={mierScrollRef} />
      <div 
        className={`
          w-screen max-w-screen h-[80vh] max-h-[80vh]
          justify-center align-center items-center
          flex flex-col relative bg-[#879da7]
          overflow-hidden transition-brightness duration-600
          ${currentOc === "mier" ? "brightness-100" : "brightness-50"}
        `}
      >
         
        {/* DECO - ICE MAGE */}
        <div
          className={`
            absolute bottom-0 right-[2vw] h-full overflow-hidden z-99 transition-[translate] duration-1400 nonsel pointer-events-none
            ${selectedMier === "icemage" ? "" : "translate-x-[200%]"}
          `}
        >
          <img 
            src={`/images/ocs/mier-icemage-deco.png`}
            className="h-full w-auto max-w-none nonsel pointer-events-none"
          />
        </div>

        {/* CLOSE-UPS */}
        <div className="flex items-center justify-center">

          {/* ICEMAGE */}
          <div
            className={`
              absolute bottom-0 h-full overflow-hidden z-88 transition-[translate] duration-1200 cursor-pointer left-[5vw]
              ${selectedMier === "icemage" ? "" : "-translate-x-full"}
            `}
          >
            <img 
              src={`/images/ocs/mier-icemage.png`}
              className="h-full w-auto max-w-none nonsel pointer-events-none"
            />
          </div>

          {/* ANGEL */}
          <div
            className={`
              absolute bottom-0 h-full overflow-hidden z-88 transition-[translate] duration-1200 cursor-pointer
              ${selectedMier === "angel" ? "" : "translate-y-full"}
            `}
          >
            <img 
              src={`/images/ocs/mier-angel.png`}
              className="h-full w-auto max-w-none nonsel pointer-events-none"
            />
          </div>

          {/* TYRANT */}
          <div
            className="absolute bottom-0 right-[5vw] h-full z-88"
            ref={mierTyrantRef}
          >
            <div 
              className={`
                relative h-full overflow-hidden transition-[translate] duration-1200 cursor-pointer
                ${selectedMier === "tyrant" ? "" : "translate-x-full"}
              `}
            >
              <img 
                src={`/images/ocs/mier-tyrant.png`}
                className="h-full w-auto max-w-none nonsel pointer-events-none"
              />
              <img 
                src={`/images/ocs/mier-tyrant-flash.png`}
                className="absolute inset-0 h-full w-auto max-w-none nonsel pointer-events-none transition-opacity duration-50 opacity-0"
                ref={flashRef}
              />
            </div>
          </div>

        </div>

        {/* INTROS */}
        <div
          className={`
            grid w-full h-full transition-grid 
            ${selectedMier ? "duration-1200" : "duration-600"}
            ${hoveredMier === "icemage" ? "grid-cols-[1.5fr_1fr_1fr]" :
              hoveredMier === "angel" ? "grid-cols-[1fr_1.5fr_1fr]" :
              hoveredMier === "tyrant" ? "grid-cols-[1fr_1fr_1.5fr]" :
              "grid-cols-[1fr_1fr_1fr]"
            }
          `}
        >

          {/* ICE MAGE */}
          <div
            className={`
              h-full flex justify-center items-end cursor-pointer
            `}
          >
            <img
              className={`
                h-full object-cover absolute z-22 max-w-none transition-transform duration-1200
                nonsel pointer-events-none origin-top
                ${!selectedMier &&
                  hoveredMier === "icemage" ? "z-55" :
                  hoveredMier === "tyrant" && "translate-x-[-25%]"
                }
                ${selectedMier === "icemage" ? "-translate-x-full"
                  : selectedMier === "" ? ""
                  : "-translate-x-full"
                }
              `}
              src="/images/ocs/mierintro-icemage.png"
            />
          </div>

          {/* ANGEL */}
          <div
            className={`
              h-full flex justify-center items-end cursor-pointer
            `}
            ref={mierAngelRef}
          >
            <img
              className={`
                h-full object-cover absolute z-33 max-w-none transition-transform
                nonsel pointer-events-none origin-top duration-1200
                ${!selectedMier &&
                  hoveredMier === "icemage" ? "translate-x-[10%]" :
                  hoveredMier === "angel" ? "scale-110" :
                  hoveredMier === "tyrant" && "translate-x-[-10%]"
                }
                ${selectedMier === "angel" ? "translate-y-full"
                : selectedMier === "icemage" ? "translate-x-[180%]"
                : selectedMier === "tyrant" ? "translate-x-[-180%]"
                : selectedMier === ""
                }
              `}
              src="/images/ocs/mierintro-angel.png"
            />
          </div>

          {/* TYRANT */}
          <div
            className={`
              h-full flex justify-center items-end cursor-pointer
            `}
          >
            <img
              className={`
                h-full object-cover absolute z-11 max-w-none transition-transform duration-1200
                nonsel pointer-events-none origin-top
                ${!selectedMier &&
                  hoveredMier === "tyrant" ? "z-55" :
                  hoveredMier === "icemage" && "translate-x-[25%]"
                }
                ${selectedMier === "tyrant" ? "translate-x-full"
                  : selectedMier === "" ? ""
                  : "translate-x-full"
                }
              `}
              src="/images/ocs/mierintro-tyrant.png"
            />
          </div>

        </div>

        {/* MIER INFO */}
        <div
          className={`
            absolute grid h-full w-screen z-99
            transition-all duration-800 nonsel
            ${selectedMier === "icemage" ? "grid-cols-[1.75fr_1fr_0.25fr]"
            : selectedMier === "angel" ?   "grid-cols-[0.25fr_1fr_1.75fr]"
            : selectedMier === "tyrant" ?  "grid-cols-[0.25fr_1fr_1.75fr]"
            : "grid-cols-[1fr_1fr_1fr]"
            }
          `}
        >
          
          <div
            className="w-full h-full cursor-pointer"
            onMouseEnter={() => {
              if (!selectedMier) setHoveredMier("icemage")
            }}
            onMouseLeave={() => setHoveredMier("")}
            onClick={() => {
              if (!selectedMier) {
                mierSelectHandler("icemage")
              } else {
                mierSelectHandler("")
              }
            }}
          >
          </div>
          
          {/* INFO */}
          <div 
            className={`
              w-full h-full relative transition-colors
              ${selectedMier ? "bg-[#101113]/50 duration-1200" : "bg-[#00000000] duration-200 cursor-pointer"}
            `}
            onMouseEnter={() => {
              if (!selectedMier) setHoveredMier("angel")
              if (selectedMier === "tyrant") bulletHoleRef.current!.style.opacity = "0"
            }}
            onMouseLeave={() => setHoveredMier("")}
            onClick={() => {
              if (!selectedMier) {
                mierSelectHandler("angel")
              } else {
                return
              }
            }}
          >

            {/* DESCRIPTION */}
            <div
              className={`
                w-full h-full px-16 py-[15vh] flex flex-col items-center text-white transition-opacity 
                ${selectedMier ? "opacity-100 duration-1200" : "opacity-0 duration-200"}
              `}
            >
              
              {/* ICEMAGE */}
              {selectedMier === "icemage" && (
                <div
                  className={`
                    flex flex-col items-center transition-opacity duration-1000 text-justify
                    ${selectedMier === "icemage" ? "opacity-100" : "opacity-0"}
                  `}
                >
                  <p className="text-6xl">
                    Mier Colwyn
                  </p>
                  <p>The Ice Mage</p>
                  <br />
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptates reiciendis nulla accusamus ullam repellat, nihil in, ipsa nesciunt sint odio ipsum! Incidunt vel sit facilis tempora error mollitia quisquam?</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptates reiciendis nulla accusamus ullam repellat, nihil in, ipsa nesciunt sint odio ipsum! Incidunt vel sit facilis tempora error mollitia quisquam?</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptates reiciendis nulla accusamus ullam repellat, nihil in, ipsa nesciunt sint odio ipsum! Incidunt vel sit facilis tempora error mollitia quisquam?</p>
                </div>
              )}

              {/* ANGEL */}
              {selectedMier === "angel" && (
                <div
                  className={`
                    flex flex-col items-center transition-opacity duration-1000 text-justify
                    ${selectedMier === "angel" ? "opacity-100" : "opacity-0"}
                  `}
                >
                  <p className="text-6xl">
                    Mier
                  </p>
                  <p>The Guide</p>
                  <br />
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptates reiciendis nulla accusamus ullam repellat, nihil in, ipsa nesciunt sint odio ipsum! Incidunt vel sit facilis tempora error mollitia quisquam?</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptates reiciendis nulla accusamus ullam repellat, nihil in, ipsa nesciunt sint odio ipsum! Incidunt vel sit facilis tempora error mollitia quisquam?</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptates reiciendis nulla accusamus ullam repellat, nihil in, ipsa nesciunt sint odio ipsum! Incidunt vel sit facilis tempora error mollitia quisquam?</p>
                </div>
              )}

              {/* TYRANT */}
              {selectedMier === "tyrant" && (
                <div
                  className={`
                    flex flex-col items-center transition-opacity duration-1000 text-justify
                    ${selectedMier === "tyrant" ? "opacity-100" : "opacity-0"}
                  `}
                >
                  <p className="text-6xl">
                    Mier Morozov
                  </p>
                  <p>The <span className="line-through">Little</span> Tyrant of Pacific Purgatory</p>
                  <br />
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptates reiciendis nulla accusamus ullam repellat, nihil in, ipsa nesciunt sint odio ipsum! Incidunt vel sit facilis tempora error mollitia quisquam?</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptates reiciendis nulla accusamus ullam repellat, nihil in, ipsa nesciunt sint odio ipsum! Incidunt vel sit facilis tempora error mollitia quisquam?</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptates reiciendis nulla accusamus ullam repellat, nihil in, ipsa nesciunt sint odio ipsum! Incidunt vel sit facilis tempora error mollitia quisquam?</p>
                  <br />
                  <p
                    className="cursor-pointer"
                    onClick={() => mierShoot()}
                  >
                    shoot me again!
                  </p>
                </div>
              )}

              {/* WHY?? */}
              {selectedMier && (
                <p
                  className="absolute bottom-8 text-sm text-white/80 text-center underline cursor-pointer"
                  onClick={() => setOpenWhy(true)}
                >
                  this makes no sense, why are there multiple miers?!?
                </p>
              )}

            </div>
            
            {/* PORTRAITS */}
            <div
              className={`
                absolute grid left-1/2 transform h-[14%] w-[62%] min-w-80 max-w-full
                -translate-x-1/2 bottom-16
                border border-black rounded-md overflow-hidden 
                transition-all duration-600
                ${!selectedMier && "nonsel pointer-events-auto"}
                ${selectedMier === "icemage" ? "grid-cols-[38fr_31fr_31fr]"
                : selectedMier === "angel" ?   "grid-cols-[31fr_38fr_31fr]"
                : selectedMier === "tyrant" ?  "grid-cols-[31fr_31fr_38fr]"
                : "grid-cols-[1fr_1fr_1fr]"
                }
              `}
            >

              <div
                className={`
                  transition-all duration-300 shadow-2xl
                  flex flex-col items-center
                  justify-center nonsel cursor-pointer overflow-hidden
                  ${selectedMier === "icemage" ? " saturate-100 opacity-100" : "saturate-20"}
                  ${hoveredMier === "icemage" ? "opacity-100 " : "opacity-40 hover:opacity-100 "}
                `}
                onMouseEnter={() => {
                  if (!selectedMier) setHoveredMier("icemage")
                }}
                onMouseLeave={() => {
                  if (!selectedMier) {
                    setHoveredMier("angel")
                  } else {
                    setHoveredMier("")
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  mierSelectHandler("icemage")
                }}
              >
                <img
                  src="/images/ocs/mier-portrait-icemage.png"
                  className={`
                    nonsel pointer-events-none transition-scale duration-300 min-h-full min-w-full object-cover
                    ${hoveredMier === "icemage" && "scale-110"}
                    ${selectedMier === "icemage" && "scale-110"}
                  `}
                />
              </div>
              <div
                className={`
                  transition-all duration-300 shadow-2xl
                  flex flex-col items-center
                  justify-center nonsel cursor-pointer overflow-hidden
                  ${selectedMier === "angel" ? " saturate-100 opacity-100" : "saturate-20"}
                  ${hoveredMier === "angel" ? "opacity-100 " : "opacity-40 hover:opacity-100 "}
                `}
                onMouseEnter={() => {
                  if (!selectedMier) setHoveredMier("angel")
                }}
                onMouseLeave={() => {
                  if (!selectedMier) {
                    setHoveredMier("angel")
                  } else {
                    setHoveredMier("")
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  mierSelectHandler("angel")
                }}
              >
                <img
                  src="/images/ocs/mier-portrait-angel.png"
                  className={`
                    nonsel pointer-events-none transition-scale duration-300 min-h-full min-w-full object-cover
                    ${hoveredMier === "angel" && "scale-110"}
                    ${selectedMier === "angel" && "scale-110"}
                  `}
                />
              </div>
              <div
                className={`
                  transition-all duration-300 shadow-2xl
                  flex flex-col items-center
                  justify-center nonsel cursor-pointer overflow-hidden
                  ${selectedMier === "tyrant" ? " saturate-100 opacity-100" : "saturate-20"}
                  ${hoveredMier === "tyrant" ? "opacity-100 " : "opacity-40 hover:opacity-100 "}
                `}
                onMouseEnter={() => {
                  if (!selectedMier) setHoveredMier("tyrant")
                }}
                onMouseLeave={() => {
                  if (!selectedMier) {
                    setHoveredMier("angel")
                  } else {
                    setHoveredMier("")
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  mierSelectHandler("tyrant")
                }}
              >
                <img
                  src="/images/ocs/mier-portrait-tyrant.png"
                  className={`
                    nonsel pointer-events-none transition-scale duration-300 min-h-full min-w-full object-cover
                    ${hoveredMier === "tyrant" && "scale-110"}
                    ${selectedMier === "tyrant" && "scale-110"}
                  `}
                />
              </div>
            </div>

          </div>
          
          <div
            className="w-full h-full cursor-pointer"
            onMouseEnter={() => {
              if (!selectedMier) setHoveredMier("tyrant")
            }}
            onMouseLeave={() => setHoveredMier("")}
            onClick={() => {
              if (!selectedMier) {
                mierSelectHandler("tyrant")
              } else {
                mierSelectHandler("")
              }
            }}
          >
          </div>

        </div>

      </div>

      {/* KANIN */}
      <div className="h-[10vh] brightness-40 saturate-70 bg-linear-to-b from-[rgb(25,27,29)] to-[rgb(25,27,29)]" ref={kaninScrollRef} />
      <div
        className={`
          w-screen max-w-screen h-[80vh] max-h-[80vh]
          justify-center align-center items-center
          flex flex-col relative bg-[rgb(25,27,29)]
          overflow-hidden transition-brightness duration-600
          ${currentOc === "kanin" ? "brightness-100" : "brightness-50"}
        `}
      >

        <div className="w-full h-full grid grid-cols-[1.5fr_0.25fr_1fr_0.25fr]">

          <div className="w-full h-full relative col-span-2 flex items-center justify-center">
            <img src="/images/stars.png" className="absolute h-full w-auto object-cover overflow-visible nonsel pointer-events-none scale-400 spin spin-slow" />
            <img src="/images/ocs/kanin-0.png" className="absolute h-full w-auto object-cover overflow-visible nonsel pointer-events-none translate-y-[50%] slowest-spin" />
            <img src="/images/ocs/kanin-1.png" className="absolute h-full w-auto object-cover overflow-visible nonsel pointer-events-none" />
          </div>
          
          <OcInfo name="Kanin" title="The Gatekeeper" info="sfsd" />
          <div />

        </div>

      </div>
      
      {/* CAVARIUS */}
      <div className="h-[10vh] brightness-40 saturate-70 bg-linear-to-b from-[rgb(25,27,29)] to-[rgb(36,45,60)]" ref={calvariusScrollRef} />
      <div 
        className={`
          w-screen max-w-screen h-[80vh] max-h-[80vh]
          justify-center align-center items-center
          flex flex-col relative bg-[rgb(36,45,60)]
          overflow-hidden transition-brightness duration-600
          ${currentOc === "calvarius" ? "brightness-100" : "brightness-50"}
        `}
      >

        {/* IMAGES */}
        <div
          className={`
            w-full h-full relative flex items-center justify-center transition-transform duration-1600
            ${currentBrother === 
              "ignatius" ? "translate-x-[80%] translate-y-[71%] scale-360" :
              currentBrother ===
              "brutus"   ? "translate-x-[-75%] translate-y-[108%] scale-360" :
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
              transition-brightness duration-600 h-full w-auto
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
              onClick={() => setCurrentBrother("")}
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
                  title="The 2nd Son"
                  hidebg={true}
                  list={true}
                  info="
                  Primarily fights with a spear, being able to run around nimbly and effectively poke enemies from afar. (balanced)
                  *The mischief of the group. He likes to playfully tease his younger brothers, angering Rufus and scaring Aurelius. (mostly angering Rufus)
                  *Very active and hates dull moments. He loves making people laugh and is a bit of an adrenaline junkie.
                  *Highly respects Brutus and wishes to be someone like him. Deep inside, he doubts if he is capable of it, masking it with his joker personality.
                  *In the end, he builds his self-worth and now fully believes in himself.
                  "
                />
              )}
              {currentBrother === "aurelius" && (
                <OcInfo 
                  name="Aurelius"
                  title="The 3rd Son"
                  hidebg={true}
                  list={true}
                  info="
                  Primarily fights with a giant hammer that is counter-balanced with the heavy skull on his right shoulder, while being the most effective with using magic attacks (mage / heavy-hitter)
                  *The heart of the group. Despite the overwhelmingly distressing situation they are in (and being the first to cry), he always sees the bright side of things and always relays it to his brothers
                  *He is forgiving of wrongdoers and can be a bit naive, which his brothers have to tell him off from time to time.
                  *In his free time, he is often seen exploring on his own in the woods inspecting insects/creatures.
                  *In the end, he stands up and faces life head on even if he’s crying.
                  "
                />
              )}
              {currentBrother === "rufus" && (
                <OcInfo 
                  name="Rufus"
                  title="The 4th Son"
                  hidebg={true}
                  list={true}
                  info="
                  Primarily fights with a sword, while also using the skull on his head to sprint head on towards enemies to ram them with the point. (glass cannon)
                  *The hothead of the group, he can't control his anger. (lol)
                  *Despite being the youngest, he is very protective over Aurelius as if he were the older brother.
                  *Him and Ignatius are very competitive against each other, frequently getting into petty fights, only to make up 5 minutes later.
                  *In the end, he reigns in his anger and have it no longer dictate his judgement.
                  "
                />
              )}
              {currentBrother === "brutus" && (
                <OcInfo 
                  name="Brutus"
                  title="The 1st Son"
                  hidebg={true}
                  list={true}
                  info="
                  Primarily fights with a giant greatsword, being able to take many hits while dealing heavy damage with his sword and ramming through enemies with the three-pointed skull on his left shoulder. (tank)
                  *The leader and brain of the group, usually scolds Ignatius for misbehaving. (and Rufus for following along)
                  *At nighttime, he stays awake for as long as he can until he falls asleep, watching over his brothers.
                  *Discreetly favors Aurelius over the other two. He tries his best to guide him in everything he knows in his knowledge as the oldest brother, rather than in physical capability.
                  *In the end, he no longer worries and has faith in his brothers capabilities.
                  "
                />
              )}

              {/* PORTRAITS */}
              <div
                className={`
                  absolute grid left-1/2 transform h-25 w-auto
                  -translate-x-1/2 bottom-4 z-40
                  border border-black rounded-md overflow-hidden 
                  transition-all duration-600 grid-cols-4
                `}
              >

                {["ignatius", "aurelius", "rufus", "brutus"].map((brother, index) => (
                <div
                  key={index}
                  className="w-full h-full flex items-center justify-center cursor-pointer overflow-hidden"
                  onClick={() => setCurrentBrother(currentBrother === brother ? "" : brother)}
                >
                  <img 
                    src={`/images/ocs/calvarius-pfp-${brother}.png`} 
                    className={`
                      w-full h-full object-cover nonsel pointer-events-none
                      transition-scale duration-300 scale-120
                    `}
                  />
                </div>
                ))}
                

              </div>

            </div>

            <div 
              className={`${currentBrother ? "cursor-pointer" : "pointer-events-none"}`}
              onClick={() => setCurrentBrother("")}
            />

          </div>

        </div>

      </div>

      {/* QUINCE */}
      <div className="h-[10vh] brightness-40 saturate-70 bg-linear-to-b from-[rgb(36,45,60)] to-[rgb(24,28,25)]" ref={quinceScrollRef} />
      <div 
        className={`
          w-screen max-w-screen h-[80vh] max-h-[80vh]
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
            <img src="/images/ocs/fd-2.png" className="absolute h-full w-auto object-cover translate-x-20 overflow-visible nonsel pointer-events-none figure-breathe-fast" />
            <img src="/images/ocs/fd-3.png" className="absolute h-full w-auto object-cover translate-x-20 overflow-visible nonsel pointer-events-none figure-breathe-fast" />
          </div>
          
          <OcInfo
            name="Quince"
            title="The Flower Deliver Boy" 
            info="Tricked into a false delivery by a demonic deity, he now must find a way out of a kingdom gone horribly mad." 
            bg="rgba(13,16,15,0.6)"
          />
          <div />

        </div>

      </div>

      {/* SIMEON */}
      <div className="h-[10vh] brightness-40 saturate-70 bg-linear-to-b from-[rgb(24,28,25)] to-[rgb(28,37,44)]" ref={simeonScrollRef} />
      <div 
        className={`
          w-screen max-w-screen h-[80vh] max-h-[80vh]
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
            info="In a twist of fate, he embarks on a journey to the depths in search of his brother amongst the crowd of souls in the sea." 
            bg="rgba(12,16,20,0.6)"
          />

          <div className="w-full h-full relative col-span-2 flex items-center justify-center">
            <img src="/images/ocs/simeon.png" className="h-full w-auto max-w-none absolute nonsel pointer-events-none" />
          </div>
          
        </div>

      </div>

      {/* PIO */}
      <div className="h-[10vh] brightness-40 saturate-70 bg-linear-to-b from-[rgb(28,37,44)] to-[rgb(56,54,49)]" ref={pioScrollRef} />
      <div
        className={`
          w-screen max-w-screen h-[80vh] max-h-[80vh]
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
          
          <OcInfo name="Pio" title="The Deaf Hermit" info="Outcasted by everyone, he finds solace and friendship with his metallic friend.*(currently my least worked on story, might fully redesign them in the future)" />
          <div />

        </div>

      </div>

      <div className="h-[10vh] flex flex-col">
        <div className="h-full brightness-40 saturate-70 bg-linear-to-b from-[rgb(56,54,49)] to-[#101113]/50" />
        <Footer />
      </div>


    </div>
  )
}