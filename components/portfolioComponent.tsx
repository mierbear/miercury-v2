"use client";
import { useState, useRef, useEffect } from "react";
import { Kosugi_Maru, Gaegu, Sono } from "next/font/google"
import Marquee from "react-fast-marquee";
import Project from "@/components/portfolioProject";
import Game from "@/components/portfolioGame";
import Link from "next/link";
import Loading from "@/components/LoadingScreenComponent";
import {
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiPostgresql,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiSupabase,
  SiGit,
  SiGithub,
  SiVercel,
  SiGsap,
  SiSocketdotio,
} from "react-icons/si";
import { MdFormatColorText } from "react-icons/md";
import { IoImagesSharp, IoMail } from "react-icons/io5";


const kosugi = Kosugi_Maru({
  weight: "400",
  subsets: ["latin"],
})

const gaegu = Gaegu({
  weight: "400",
  subsets: ["latin"],
})

const sono = Sono({
  weight: "400",
  subsets: ["latin"],
})

export default function QuotesComponent() {
  
  const introRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLHRElement  | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const [currentSection, setCurrentSection] = useState<string>("intro");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      if (contactRef.current && scrollY >= contactRef.current.offsetTop) {
        setCurrentSection("contact");
      } else if (projectsRef.current && scrollY >= projectsRef.current.offsetTop) {
        setCurrentSection("projects");
      } else {
        setCurrentSection("intro");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHandler = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (currentSection === "intro" && ref === contactRef) {
      ref.current?.scrollIntoView({ behavior: "instant" });
    } else {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const getTime = () => {
    const start = new Date(2024, 8, 12);
    const today = new Date();

    let years = today.getFullYear() - start.getFullYear();
    let months = today.getMonth() - start.getMonth();

    if (today.getDate() < start.getDate()) {
      months--;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    if (months === 0) {
      return  `${years} years!`
    } else {
      return `${years}y ${months}m!`;
    }
  };

  const loadingScreenRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  
  // PRELOAD
  useEffect(() => {
    const preload = [
      "/images/index/pfp.jpg",
      "/images/miercury.jpg",
      "/images/blog.jpg",
      "/images/ocs.jpg",
      "/images/gallery.jpg",
    ];

    const promises = preload.map(src => new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    }));

    Promise.all(promises).then(() => setReady(true));
  }, []);

  const stack = {
    Languages: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
      { name: "SQL", icon: SiPostgresql },
    ],

    Frontend: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],

    Backend: [
      { name: "Supabase", icon: SiSupabase },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Socket.IO", icon: SiSocketdotio },
    ],

    Tools: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Vercel", icon: SiVercel },
      { name: "GSAP", icon: SiGsap },
      { name: "Tiptap", icon: MdFormatColorText },
      { name: "YARL", icon: IoImagesSharp },
    ],
  };

  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    setIsPhone(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("kylemarshall.dev@protonmail.com");
    clickEmail();
  }

  const emailRef = useRef<HTMLParagraphElement | null>(null);
  const clickEmail = () => {
    emailRef.current?.classList.remove("clickEmail");
    void emailRef.current?.offsetWidth;
    emailRef.current?.classList.add("clickEmail");
  }

  const top = useRef<HTMLDivElement | null>(null);

  return (
    <div className={`flex flex-col items-center justify-center min-w-screen min-h-screen ${currentSection === "contact" ? "bg-[#000000] duration-1500" : "bg-[#00000000] duration-500"} transition-colors `}>
      
      {/* CONTENT */}
      <div ref={top} className="text-[#17191a] w-7xl max-w-screen min-h-screen flex flex-col items-center justify-center relative z-20 bg-[#e3ebed]">
      
        {/* INTRO */}
        <div
          className="items-center justify-center h-screen w-5xl flex flex-col-reverse lg:flex-row -translate-y-4 lg:translate-y-0"
          ref={introRef}
        >

          {/* TEXT */}
          <div
            className="flex items-center justify-center w-full flex-col text-center"
          >
            <div className="nonsel pointer-events-none">
              <p className={`text-2xl sm:text-4xl opacity-50 ${gaegu.className} translate-y-2 lg:translate-y-0`}>HELLO, I'M</p>
              <p className={`text-8xl sm:text-9xl ${kosugi.className} translate-x-6`}>KYLE<span className="text-yellow-500">.</span></p>
              <p className="text-xs sm:text-sm">Coding since September 2024 <span className="opacity-40">✦</span> <span className="underline">{getTime()}</span></p>
              <p className="text-xs sm:text-sm">I love solving problems and making creative ideas come to life.</p>
            </div>

            <div className="pt-4 gap-4 flex text-xs sm:text-sm">
              <button
                onClick={() => scrollToHandler(projectsRef)}
                className="rounded-full nonsel bg-[#17191a] px-5 py-3 text-white cursor-pointer transition-transform duration-300 hover:-translate-y-0.5"
              >
                See my work &nbsp;&nbsp;►
              </button>

              <button
                onClick={() => scrollToHandler(contactRef)}
                className="rounded-full nonsel border-2 border-[#17191a]/20 px-5 py-3 cursor-pointer transition-transform duration-300 hover:-translate-y-0.5"
              >
                Get in touch
              </button>
            </div>

          </div>

          {/* PFP */}
          <div
            className="flex items-center justify-center w-full nonsel pointer-events-none"
          >
            <div
              className="w-120 h-120 max-w-[80vw] max-h-[80vw] rounded-full flex items-center justify-center relative overflow-hidden"
            >

              <img alt="bg" className="absolute w-full h-auto" src="/images/bg2.png" />

              <img 
                alt="pfp"
                src="/images/pfp.png"
                className={`
                  w-full h-full rounded-full absolute
                  transition-[translate]
                  ${currentSection === "intro" ? "translate-y-0 duration-1000" : "lg:translate-y-full translate-y-0 duration-800"}
                `}
              />

            </div>
          </div>

        </div>

        <hr 
          className={`
            border-0 border-b border-gray-500/40 w-full pt-6
            ${currentSection === "intro" ? "opacity-0 duration-1000" : "opacity-100 duration-300"} 
            transition-opacity
          `} 
          ref={projectsRef}
        />

        {/* INFO */}
        <div
          className={`
            flex w-full flex-col overflow-hidden
            transition-all duration-1000 relative
            ${currentSection === "intro" ? "h-0 opacity-0" : "h-88 sm:h-50 opacity-100"}
          `}
        >

          <img alt="bg" className="absolute nonsel pointer-events-none w-full h-88 sm:h-50 object-cover" src="/images/bg3.png" />
          <img
            alt="mier falling"
            className={`
              absolute nonsel pointer-events-none w-[30%] h-auto right-12 transition-[bottom]
              ${currentSection === "intro" ? "bottom-30 duration-500" : "bottom-8 xl:bottom-3 duration-1000"}
              lg:block hidden
            `} 
            src="/images/mier2.png" 
          />

          <div 
            className={`
              absolute pl-0 lg:pl-20 sm:gap-2 text-white
              w-full lg:justify-normal items-center justify-center
              sm:flex grid grid-rows-2 grid-cols-2
            `}
          >

            {Object.entries(stack).map(([category, technologies]) => (
              <div
                key={category}
                className="bg-gray-600 sm:bg-yellow-950/80 sm:pt-4 pt-4 px-4 flex flex-col w-auto h-44 sm:h-50"
              >
                <p className={`text-2xl ${kosugi.className} self-center text-white sm:text-yellow-50`}>{category.toLocaleUpperCase()}</p>
                <hr className="border-white/40 sm:border-orange-200/40 pt-2 w-[96%]" />

                {technologies.map(({ name, icon: Icon }) => (
                  <div key={name} className={`flex items-center gap-2 ${name === "Socket.IO" && "text-yellow-200 sm:text-yellow-500"}`}>
                    <Icon size={16} />
                    <span className="text-[4px] sm:text-[8px] nonsel">●</span>
                    <span key={name} className="text-xs sm:text-sm">{name}</span>
                  </div>
                ))}
              </div>
            ))}
            <p className={`text-sm ${kosugi.className} text-yellow-950 p-2 self-end justify-between lg:flex hidden`}>Currently I'm learning: Socket.IO</p>
              
          </div>

        </div>

        <hr className="border-0 border-t border-gray-500/40 w-full" />

        {/* PROJECTS */}
        <div
          className="flex items-center min-h-screen w-full pt-4 pb-20 flex-col"
        >
          <p className={`text-3xl text-gray-400 pb-4 flex gap-4 items-center nonsel tracking-widest`}>
            <span className="text-xl">✦</span> 
            PROJECTS
            <span className="text-xl">✦</span> 
          </p>
          
          <div className="rounded-lg h-auto w-[80%] md:w-140 flex flex-col md:max-w-[80%]">
            <div className="group flex flex-col">
              <Link href="/" target="_blank">
                <img alt="miercury" className="rounded-lg mb-2 nonsel" src="/images/miercury.jpg" />
              </Link>
              <div className="self-center md:self-start">
                <Link 
                  href="/"
                  className={`
                    ${kosugi.className} text-gray-500 group-hover:text-blue-500 transition-colors duration-500
                    xl:text-7xl lg:text-6xl md:text-[54px] text-5xl
                    `}
                  >
                  MIERCURY
                </Link>
              </div>
            </div>
            <p className="md:w-full sm:w-[90%] w-full text-xs sm:text-sm self-center text-center md:text-justify">Miercury is my personal website and portfolio, built with Next.js, React, TypeScript, and Supabase. It showcases my artwork, projects, and web development skills while serving as a full-stack application with an interactive user experience and a custom admin dashboard for managing site content.</p>
          </div>

          <p className={`pt-12 translate-y-2 nonsel text-gray-500 tracking-[0.2em]`}>INSIDE MIERCURY...</p>
          <p className={`nonsel text-gray-400 panic pb-0.5`}>▼</p>

          <hr className="border-gray-500/40 mb-8 mt-0.5 w-[96%]" />

          {/* GALLERY */}
          <Project 
            title="GALLERY"
            info="A responsive art gallery built for browsing, filtering, and viewing my artworks, with Supabase-powered image storage and dynamic content management." 
            src="/images/gallery.jpg"
            link="/gallery"
          />

          <hr className="border-gray-500/40 my-8 w-[96%]" />

          {/* BLOG */}
          <Project 
            title="BLOG"
            info="A personal blog for documenting my own thoughts, projects and things I've learned along the way, with full CRUD operations powered by Supabase." 
            src="/images/blog.jpg"
            link="/blog/page/1"
          />

          <hr className="border-gray-500/40 my-8 w-[96%]" />

          {/* CHARACTERS */}
           <Project 
            title="CHARACTERS"
            info="An interactive character showcase for my original characters, combining artwork, lore, and playful interface interactions." 
            src="/images/ocs.jpg"
            link="/characters"
          />

          <hr className="border-gray-500/40 mt-8 w-[96%]" />
          
          {/* GAMES */}
          <p className={`text-3xl flex gap-4 pt-4 text-gray-400 items-center nonsel tracking-widest`}>
            <span className="text-xl">✦</span> 
            GAMES
            <span className="text-xl">✦</span> 
          </p>
          
          <div className={`w-[90%] md:w-[80%] flex flex-col pt-4 ${isPhone && "nonsel pointer-events-none"}`}>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
              
              <Game 
                title="MierOS"
                info="A notes app and YouTube player disguised as a personalized operating system. Originally built with EJS to explore PostgreSQL, public APIs, and local file handling, later rebuilt and ported to Miercury." 
                src="/videos/games/mieros.mov"
                link="/mieros"
              />

              <Game 
                title="Mier Fishing"
                info="A fishing-themed typing game I made purely for fun, built entirely with vanilla HTML, CSS, and JavaScript." 
                src="/videos/games/fish.mov"
                link="/mierfishing/index.html"
              />

              <Game 
                title="Match Game"
                info="My first attempt at making a game, made around 3–4 months into learning web development." 
                src="/videos/games/match.mov"
                link="/match/index.html"
              />
              
            </div>
          </div>
        </div>
        
        <hr className={`border-2 border-t w-full duration-1500 transition-colors ${currentSection === "contact" ? "border-yellow-950" : "border-gray-500/40"}`} />

        {/* CONTACT */}
        <div 
          ref={contactRef} 
          className={`
            w-full h-screen text-5xl flex items-center justify-center transition-[height] duration-1000 relative
            ${currentSection === "contact" ? "" : ""} overflow-hidden
          `}
        >

          {/* bg */}
          <img 
            alt="bg"
            className={`
              absolute nonsel pointer-events-none w-full h-full object-cover
              transition-scale duration-6000 
              ${currentSection === "contact" ? "scale-100" : "scale-105"}
            `} 
            src="/images/bg4.png"
          />
          
          {/* cover */}
          <div 
            className={`
            z-60 absolute w-full transition-[height] bg-[#e3ebed] self-end
            ${currentSection === "contact" ? "h-0 duration-1200" : "h-full duration-800"}
            `} 
          />

          {/* contact text */}
          <div 
            className={`
            z-80 h-[10%] w-full text-5xl nonsel pointer-events-none
            ${currentSection === "contact" ? "text-yellow-950 opacity-30" : "opacity-100"} 
            duration-1500 absolute top-0 flex items-center
            `}
          >
            <Marquee
              className="tracking-[0.2em]"
              autoFill
              speed={20}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;CONTACT
            </Marquee>
          </div>
          
          {/* text */}
          <div className="relative z-40 w-full flex flex-col items-center justify-center px-8 py-8 text-center backdrop-blur-[2px] bg-linear-to-b from-black/40 via-black/60 to-black/40 text-yellow-50">

            <p className={`${sono.className} mb-1 text-xs sm:text-sm tracking-[0.3em] nonsel pointer-events-none opacity-90`}>
              WANT TO MAKE SOMETHING?
            </p>

            <h2 className={`${kosugi.className} text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl nonsel pointer-events-none`}>
              LET'S CREATE <br className="block md:hidden" />SOMETHING
              <br />
              GAZE-WORTHY <br className="block md:hidden" />TOGETHER.
            </h2>

            <Link
              href="mailto:kylemarshall.dev@protonmail.com"
              className="group mt-6 md:mt-10 text-base sm:text-2xl xl:text-3xl text-yellow-300 flex items-center justify-center"
            >
              <IoMail />
              <p className="pl-px nonsel">:</p>
              <span className="mx-2 transition-colors decoration-yellow-300/25 duration-600 group-hover:decoration-yellow-300/70 underline underline-offset-4">
                kylemarshall.dev@protonmail.com
              </span>

              <span className="text-sm inline-block transition-transform duration-500 group-hover:translate-x-1 nonsel">
              ►
              </span>
            </Link>

            <div className={`${sono.className} mt-1 flex gap-6 text-sm nonsel`}>
              <Link className="opacity-80 hover:opacity-100 transition-opacity duration-300" href="https://github.com/mierbear" target="_blank" rel="noopener noreferrer">
                GitHub
              </Link>

              <span>✦</span>

              <p ref={emailRef} className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300" onClick={copyEmail}>
                Copy Email
              </p>
            </div>

          </div>

          {/* illustration */}
          <img
            alt="mier flying"
            className={`
              ${currentSection === "contact" ? "right-[-30%] md:right-[-20%] lg:right-[-14%] bottom-[4%]" : "-right-full bottom-[20%]"}  
              absolute nonsel pointer-events-none duration-3000 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl hidden sm:block
            `}
            src="/images/mier3.png" 
          />

        </div>

        

      </div>

      {/* NAVIGATION */}
      <div
        className={`
          fixed bottom-4 px-6 py-2 bg-[#eef3f4] rounded-3xl shadow-2xl
          flex gap-4 nonsel ${gaegu.className} text-lg z-50 transition-opacity duration-300
          ${currentSection === "contact" ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        <p className={`cursor-pointer transition-opacity duration-500 ${currentSection === "intro"    ? "opacity-100 font-bold pointer-events-none" : "opacity-50 hover:opacity-80"}`} onClick={() => scrollToHandler(introRef)}>INTRO</p>
        <span className="opacity-40">✦</span>
        <p className={`cursor-pointer transition-opacity duration-500 ${currentSection === "projects" ? "opacity-100 font-bold pointer-events-none" : "opacity-50 hover:opacity-80"}`} onClick={() => scrollToHandler(projectsRef)}>PROJECTS</p>
        <span className="opacity-40">✦</span>
        <p className={`cursor-pointer transition-opacity duration-500 ${currentSection === "contact"  ? "opacity-100 font-bold pointer-events-none" : "opacity-50 hover:opacity-80"}`} onClick={() => scrollToHandler(contactRef)}>CONTACT</p>
      </div>
      
      {/* BACK TO TOP */}
      <div
        className={`
          fixed bottom-4 text-4xl
          nonsel z-50 transition-opacity duration-300
          ${currentSection === "contact" ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <p 
          className={`
            hover:opacity-100 opacity-60 duration-1000 cursor-pointer
            ${currentSection === "contact" ? "text-yellow-950" : "text-black"}
          `}
          onClick={() => {scrollToHandler(top)}}
        >
          ▲
        </p>
      </div>
      
      {/* LOADING SCREEN */}
      <Loading ready={ready} loadingRef={loadingScreenRef} />

    </div>
  );
}