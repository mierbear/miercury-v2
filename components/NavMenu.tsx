"use client";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { Boldonse } from "next/font/google"
import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";

gsap.registerPlugin(CustomEase);

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
})

const NavMenu = (props: { open: boolean }) => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const buttonImgRef = useRef<HTMLImageElement | null>(null);
  const landingRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const homeRef = useRef<HTMLDivElement | null>(null);
  const homeLinkRef = useRef<HTMLAnchorElement | null>(null);
  const clickOverlayRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const openTl = gsap.timeline();
  const closeTl = gsap.timeline();
  
  const isOpen = useRef(props.open ? true : false);

  const menuAppear = () => {
    const split = new SplitText(homeLinkRef.current, { type: "chars" });
    const tl = gsap.timeline();

    tl.from(split.chars, {
        duration: 1,
        opacity: 0,
        xPercent: 200,
        stagger: 0.15,
        ease: "back.inOut",
        // delay: .5,
      })

      return () => {
        tl.kill();
        split.revert();
      };
  }

  const toggleLanding = () => {
    if (!landingRef.current) return;

    const height = landingRef.current.offsetHeight;
    const width = landingRef.current.offsetWidth;
  

    if (isOpen.current) {
      // CLOSE ANIMATION
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: .5,
      })

      gsap.set(overlayRef.current, {
        display: "none",
        delay: .5
      })

      gsap.set(clickOverlayRef.current, {
        display: "block",
        visibility: "visible",
        pointerEvents: "auto",
      })

      closeTl
      .set(buttonRef.current, {
        pointerEvents: "none"
      })
      .to(buttonRef.current, {
        duration: .3,
        scale: 1,
        ease: "power1.out",
        yPercent: 50,
      })
      .to(landingRef.current, {
        yPercent: -100,
        duration: .5,
        ease: "power1.inOut",
      }, "<.15")
      .set(listRef.current, {
        pointerEvents: "none",
        visibility: "hidden"
      })
      .set(buttonRef.current, {
        pointerEvents: "all"
      })
      .set(clickOverlayRef.current, {
        display: "none",
        visibility: "hidden",
        pointerEvents: "none",
      });

    } else {
      // OPEN ANIMATION
      menuAppear();

      gsap.set(overlayRef.current, {
        display: "block",
      })

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: .5,
      })

      gsap.set(clickOverlayRef.current, {
        display: "block",
        visibility: "visible",
        pointerEvents: "auto",
      })

      openTl
      .set(buttonRef.current, {
        pointerEvents: "none"
      })
      .set(listRef.current, {
        pointerEvents: "auto",
        visibility: "visible"
      })
      .set(homeRef.current, {
        pointerEvents: "auto",
        visibility: "visible"
      })
      .to(landingRef.current, {
        yPercent: 0,
        duration: .5,
        ease: "power1.inOut",
      })
      .to(buttonRef.current, {
        scale: 9,
        yPercent: 400,
        ease: "power1.out",
      }, "<.3")
      .set(buttonRef.current, {
        pointerEvents: "all"
      })
      .set(clickOverlayRef.current, {
        display: "none",
        visibility: "hidden",
        pointerEvents: "none",
      });
    }

    isOpen.current = !isOpen.current;
  };

  useEffect(() => {
    if (!landingRef.current || !overlayRef.current) return;
    gsap.set(landingRef.current, { autoAlpha: 1 });
    gsap.set(overlayRef.current, { autoAlpha: 1 });
    }, []);

  useEffect(() => {
    if (!buttonImgRef.current) return;
    gsap.to(buttonImgRef.current, {rotation:360, duration: 120, repeat: -1, ease: "linear", transformOrigin: "center center"});
  })

  useEffect(() => {
  if (!landingRef.current || !buttonRef.current || !listRef.current || !homeRef.current || !overlayRef.current) return;

  const height = landingRef.current.offsetHeight;
  const width = landingRef.current.offsetWidth;

  if (isOpen.current) {
    // OPEN
    gsap.set(buttonRef.current, {
      pointerEvents: "none"
    })

    gsap.set(homeRef.current, {
      pointerEvents: "auto",
      visibility: "visible"
    })

    gsap.from(landingRef.current, {
      yPercent: -120,
      duration: 2,
      ease: "power4.Out",
      delay: 1.5
    });

    gsap.set(buttonRef.current, {
      scale: 9,
      yPercent: 2000,
    })

    gsap.set(overlayRef.current, {
      display: "none"
    })

    gsap.set(overlayRef.current, {
      display: "block",
      delay: 1.5
    })

    gsap.from(overlayRef.current, {
      opacity: 0,
      duration: 1.5,
      delay: 1.5
    })

    gsap.to(buttonRef.current, {
      yPercent: 400,
      duration: 2,
      ease: "power4.out",
      delay: 1.6
    });

    gsap.set(buttonRef.current, {
      pointerEvents: "all",
      delay: 3.5
    });

    gsap.set(landingRef.current, {
      pointerEvents: "all",
      delay: 3.5
    });

    gsap.set(homeLinkRef.current, {
      pointerEvents: "all",
      delay: 3.5
    });

    
  } else {
    // CLOSE
    gsap.set(landingRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: "power1.inOut",
    });

    gsap.set(listRef.current, {
      pointerEvents: "none",
      visibility: "hidden",
    });

    gsap.set(overlayRef.current, {
      display: "none",
    })
  }
  
  }, [isOpen.current]);

  const handleLinkClick = () => {
  if (isOpen.current) toggleLanding();
  };

  const isDesktop = () => window.innerWidth >= 1280;

  const resetInlineStyles = () => {
    listRef.current!.style.removeProperty("grid-template-columns");
    listRef.current!.style.removeProperty("grid-template-rows");
  };

  const listReset = () => {
    if (!isDesktop()) {
      resetInlineStyles();
      return;
    }

    listRef.current!.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
    listRef.current!.style.removeProperty("grid-template-rows");
  };

  const listCharSel = () => {
    if (!isDesktop()) return resetInlineStyles();
    listRef.current!.style.gridTemplateColumns = "1.2fr 1.125fr 1.025fr .95fr";
  };

  const listIceSel = () => {
    if (!isDesktop()) return resetInlineStyles();
    listRef.current!.style.gridTemplateColumns = "1.05fr 1.2fr 1.05fr 1fr";
  };

  const listPpSel = () => {
    if (!isDesktop()) return resetInlineStyles();
    listRef.current!.style.gridTemplateColumns = "1fr 1.05fr 1.2fr 1.05fr";
  };

  const listGameSel = () => {
    if (!isDesktop()) return resetInlineStyles();
    listRef.current!.style.gridTemplateColumns = ".95fr 1.025fr 1.125fr 1.2fr";
  };


  useEffect(() => {
    const handleResize = () => {
      if (isDesktop()) {
        listRef.current!.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
        listRef.current!.style.removeProperty("grid-template-rows");
        console.log(`is desktop :3`)
      } else {
        listRef.current!.style.removeProperty("grid-template-columns");
        listRef.current!.style.removeProperty("grid-template-rows");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <div>
      
      <div className="flex justify-center min-h-screen min-w-screen absolute">
        <div
          ref={landingRef}
          className="fixed min-w-[95vw] min-h-[90vh] grid grid-rows-[5fr_1fr] z-500 shadow-sm pointer-events-none"
          style={{ visibility: "hidden" }}
        >

          <div 
            ref={listRef} 
            className="
            bg-[#0f0f0f]
              grid
              grid-cols-1
              grid-rows-[2fr_2fr_2fr_2fr_1.5fr]
              xl:grid-cols-4
              xl:grid-rows-1
              list
            "
          >

            <NextLink onClick={handleLinkClick} href="/characters" className="landing-tile flex justify-center items-center bg-[#838177]" onMouseEnter={listCharSel} onMouseLeave={listReset}>
              <span>Characters</span>
            </NextLink>
            <NextLink onClick={handleLinkClick} href="/mtwim" className="landing-tile flex justify-center items-center bg-[#8b979b]" onMouseEnter={listIceSel} onMouseLeave={listReset}>
              <span>MTWIM Compendium</span>
            </NextLink>
            <NextLink onClick={handleLinkClick} href="/pp" className="landing-tile flex justify-center items-center bg-[#616d7a]" onMouseEnter={listPpSel} onMouseLeave={listReset}>
              <span>Pacific Purgatory</span>
            </NextLink>
            <NextLink onClick={handleLinkClick} href="/games" className="landing-tile flex justify-center items-center bg-[#8a8b7d]" onMouseEnter={listGameSel} onMouseLeave={listReset}>
              <span>Games</span>
            </NextLink>
            <NextLink style={{ display: ready ? "flex" : "none" }} onClick={handleLinkClick} href="/" className={`${boldonse.className} bg-[#0f0f0f] landing-tile text-6xl flex justify-center items-center text-white visible xl:invisible xl:h-0 z-500 translate-y-6`}>
              <span>HOME</span>
            </NextLink>
          </div>

          <div className="flex flex-row justify-center items-center bg-[#0f0f0f] relative rounded-b-4xl" ref={homeRef}>
            <NextLink style={{ display: ready ? "flex" : "none" }} href="/" ref={homeLinkRef} onClick={handleLinkClick} className={`${boldonse.className} absolute left-5 text-6xl text-white invisible xl:visible pointer-events-none`}>HOME</NextLink>

            <div
              ref={buttonRef}
              className="z-550 fixed origin-center rounded-full overflow-hidden flex justify-center items-center cursor-pointer"
              onClick={toggleLanding}
            >
              <img
                ref={buttonImgRef}
                src="images/moon.png"
                className="cursor-pointer max-h-[14vh] max-w-[14vh] select-none"
                style={{ userSelect: "none" }}
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={overlayRef}
        className="fixed min-w-screen min-h-screen bg-[#17191a]/10 z-400 backdrop-blur-xs"
        style={{ visibility: "hidden" }}
      >
      </div>

      <div
        ref={clickOverlayRef}
        className="fixed min-w-screen min-h-screen bg-[#00000000] z-1000"
        style={{ visibility: "hidden", pointerEvents: "none" }}
      >
      </div>

    </div>
  );
};

export default NavMenu;
