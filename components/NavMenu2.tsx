"use client";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Boldonse } from "next/font/google"
import { useEffect, useRef } from "react";
import NextLink from "next/link";

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
})

const NavMenu = (props: { open: boolean }) => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const landingRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const homeRef = useRef<HTMLDivElement | null>(null);
  const homeLinkRef = useRef<HTMLAnchorElement | null>(null);

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
        delay: .5,
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
      closeTl
      .set(buttonRef.current, {
        pointerEvents: "none"
      })
      .to(landingRef.current, {
        xPercent: 200,
        duration: .7,
        ease: "power1.inOut",
      })
      .set(listRef.current, {
        pointerEvents: "none",
        visibility: "hidden"
      })
      .set(homeRef.current, {
        pointerEvents: "none",
        visibility: "hidden"
      })
      .set(buttonRef.current, {
        pointerEvents: "all"
      });
    } else {
      // OPEN ANIMATION
      menuAppear();

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
        xPercent: 0,
        duration: .5,
        ease: "power1.inOut",
      })
      .set(buttonRef.current, {
        pointerEvents: "all"
      });
    }

    isOpen.current = !isOpen.current;
  };

  useEffect(() => {
      if (!landingRef.current) return;
      gsap.set(landingRef.current, { autoAlpha: 1 });
    }, []);

  useEffect(() => {
  if (!landingRef.current || !buttonRef.current || !listRef.current || !homeRef.current) return;

  const height = landingRef.current.offsetHeight;
  const width = landingRef.current.offsetWidth;

  if (isOpen.current) {
    // OPEN
    gsap.set(homeRef.current, {
      pointerEvents: "auto",
      visibility: "visible"
    })

    gsap.from(landingRef.current, {
      xPercent: 200,
      duration: 4,
      ease: "power3.out",
      delay: 0.8,
    });
    
  } else {
    // CLOSE
    gsap.set(landingRef.current, {
      xPercent: 200,
      duration: 0.7,
      ease: "power1.inOut",
    });

    gsap.set(listRef.current, {
      pointerEvents: "none",
      visibility: "hidden",
    });

    gsap.set(homeRef.current, {
      pointerEvents: "none",
      visibility: "hidden",
    });
  }
  
  }, [isOpen.current]);

  const handleLinkClick = () => {
  if (isOpen.current) toggleLanding();
  };

  const listReset = () => {
    (listRef.current as HTMLDivElement).style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
  }
  const listCharSel = () => {
    (listRef.current as HTMLDivElement).style.gridTemplateColumns = "1.2fr 1.125fr 1.025fr .95fr";
  }
  const listIceSel = () => {
    (listRef.current as HTMLDivElement).style.gridTemplateColumns = "1.05fr 1.2fr 1.05fr 1fr";
  }
  const listPpSel = () => {
    (listRef.current as HTMLDivElement).style.gridTemplateColumns = "1fr 1.05fr 1.2fr 1.05fr";
  }
  const listGameSel = () => {
    (listRef.current as HTMLDivElement).style.gridTemplateColumns = ".95fr 1.025fr 1.125fr 1.2fr";
  }

  return (
    <div>

      <div
        ref={landingRef}
        className="fixed min-w-screen min-h-[90vh] grid grid-rows-[5fr_1fr] z-500 shadow-2xl"
        style={{ visibility: "hidden" }}
      >

        <div ref={listRef} className="grid list">
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
        </div>

        <div className="flex flex-row justify-center items-center bg-gray-200 relative" ref={homeRef}>
          <NextLink href="/" ref={homeLinkRef} onClick={handleLinkClick} className={`${boldonse.className} absolute left-5 text-6xl`}>HOME</NextLink>
          <h1>no thanks, take me back !</h1>
        </div>

      </div>

      <div
          ref={buttonRef}
          className="z-500 relative"
        >
        <img src="images/moon.png" onClick={toggleLanding} className="cursor-pointer absolute" style={{userSelect: "none"}} draggable="false" />
      </div>

    </div>
  );
};

export default NavMenu;
