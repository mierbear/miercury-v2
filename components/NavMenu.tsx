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

  const moonRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const moonClickHandler = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  const routes = [
    { desc: "home", href: "/" },
    { desc: "with everyone", href: "/characters" },
    { desc: "somewhere cold", href: "/mtwim" },
    { desc: "looking for something to play", href: "/games" },
    { desc: "in Pacific Purgatory", href: "/pp" },
    { desc: "in the gallery", href: "/gallery" },
    { desc: "inside my mind", href: "/blog" },
    { desc: "learning about me", href: "/about" },
  ]

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center", 
      dragFree: true,
    },
  );

  return (
    <div className="fixed w-screen h-screen flex flex-col justify-center items-center text-white z-5555 pointer-events-none">

      <div className={`bg-black h-[50vh] w-screen lg:w-[80%] flex flex-col justify-center items-center p-4 z-777 ${open ? "visible" : "invisible"} pointer-events-auto`}>
        
        <p>you're currently {routes.find((route) => route.href === pathname)?.desc}</p>
        <div className="text-white border border-white p-4 w-full h-full">

           <div className="overflow-hidden h-full w-full" ref={emblaRef}>
            <div className="flex h-full"
            onClick={moonClickHandler}
            >
              <NavMenuLink title="characters" href="/characters" img="/images/pfp.png" />
              <NavMenuLink title="mtwim" href="/mtwim" img="/images/pfp.png" />
              <NavMenuLink title="games" href="/games" img="/images/pfp.png" />
              <NavMenuLink title="pp" href="/pp" img="/images/pfp.png" />
              <NavMenuLink title="gallery" href="/gallery" img="/images/pfp.png" />
              <NavMenuLink title="blog" href="/blog" img="/images/pfp.png" />
              <NavMenuLink title="home" href="/" img="/images/pfp.png" />
            </div>
          </div>
        
        </div>
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
          cursor-grab
          pointer-events-auto
          nonsel
          ${open ? "-translate-y-[25vh]" : "-translate-y-[50vh]"}
        `}
        onClick={moonClickHandler}
        ref={moonRef}
      >
        <img 
        className={`slow-spin ${open ? "h-60" : "h-40"} transition-height origin-center duration-500 ease-in-out`}
        src="/images/moon.png" 
        />
      </div>
      
      <div 
      className={`${open ? "opacity-100 backdrop-blur-[2px] pointer-events-auto" : "opacity-0 backdrop-blur-0 pointer-events-none"} fixed transition-opacity duration-500 ease-in-out w-screen h-screen nonsel`}
      onClick={() => {moonRef.current?.click()}}
      ></div>

    </div>
  );
};

export default NavMenu;
