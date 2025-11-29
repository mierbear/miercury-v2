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
  const homeLinkRef = useRef<HTMLAnchorElement | null>(null);

  const openTl = gsap.timeline();
  const closeTl = gsap.timeline();
  
  const isOpen = useRef(props.open ? true : false);

  const toggleLanding = () => {
    if (!landingRef.current) return;

    const height = landingRef.current.offsetHeight;
    const width = landingRef.current.offsetWidth;

    if (isOpen.current) {
      // CLOSE ANIMATION
      closeTl
      .to(landingRef.current, {
        y: -height,
        duration: .7,
        ease: "power1.inOut",
      })
      .to(buttonRef.current, {
        x: width / 2.2,
        duration: .7,
        ease: "power2.out",
      })
      .set(listRef.current, {
        pointerEvents: "none",
        visibility: "hidden"
      });
    } else {
      // OPEN ANIMATION
      openTl
      .set(listRef.current, {
        pointerEvents: "auto",
        visibility: "visible"
      })
      .to(buttonRef.current, {
        x: 0,
        duration: .4,
        ease: "power1.out",
      })
      .to(landingRef.current, {
        y: 0,
        duration: .5,
        ease: "power1.inOut",
      });
    }

    isOpen.current = !isOpen.current;
  };

  useEffect(() => {
      if (!landingRef.current) return;
      gsap.set(landingRef.current, { autoAlpha: 1 });
    }, []);

  useEffect(() => {
  if (!landingRef.current || !buttonRef.current || !listRef.current) return;

  const height = landingRef.current.offsetHeight;
  const width = landingRef.current.offsetWidth;

  if (isOpen.current) {
    // OPEN
    gsap.from(landingRef.current, {
      yPercent: -200,
      duration: 4,
      ease: "power3.out",
      delay: 0.8,
    });
  } else {
    // CLOSE
    gsap.set(landingRef.current, {
      y: -height,
      duration: 0.7,
      ease: "power1.inOut",
    });

    gsap.set(buttonRef.current, {
      x: width / 2.2,
      duration: 0.7,
      ease: "power2.out",
    });

    gsap.set(listRef.current, {
      pointerEvents: "none",
      visibility: "hidden",
    });
  }
  
  }, [isOpen.current]);

  useEffect(() => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {rotation:360, duration: 120, repeat: -1, ease: "linear", transformOrigin: "center center"});
  })

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
    <div
      ref={landingRef}
      className="fixed min-w-screen min-h-[90vh] grid grid-rows-[5fr_1fr] z-500 bg-white/80 shadow-2xl"
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

      <div className="flex flex-row justify-center items-center bg-gray-600/50 relative">
        <NextLink href="/" ref={homeLinkRef} onClick={handleLinkClick} className={`${boldonse.className} absolute left-5 text-6xl`}>HOME</NextLink>
        <h1>no thanks, take me back !</h1>

        <div
          ref={buttonRef}
          className="absolute bottom-0 translate-y-[50%]"
        >
          <img src="images/moon.png" onClick={toggleLanding} className="scale-15 cursor-pointer" style={{userSelect: "none"}} draggable="false" />
        </div>
        {/* <div
          ref={buttonRef}
          onClick={toggleLanding}
          className="absolute bottom-0 bg-white rounded-full min-w-[2em] min-h-[2em] text-3xl translate-y-[50%] text-center cursor-pointer"
        /> */}
      </div>
    </div>
  );
};

export default NavMenu;
