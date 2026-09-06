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
} from "react-icons/si";
import { MdFormatColorText } from "react-icons/md";


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
    ref.current?.scrollIntoView({ behavior: "smooth" });
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
      "/images/index/pfp.png",
      "/images/miercury.png",
      "/images/blog.png",
      "/images/ocs.png",
      "/images/gallery.png",
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
    ],

    Tools: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Vercel", icon: SiVercel },
      { name: "GSAP", icon: SiGsap },
      { name: "Tiptap", icon: MdFormatColorText },
    ],
  };

  return (
    <div className="flex items-center justify-center min-w-screen min-h-screen">
      
      {/* CONTENT */}
      <div className="text-[#17191a] w-7xl max-w-screen min-h-screen flex flex-col items-center justify-center relative z-20 bg-[#dadfe1]">
      
        {/* INTRO */}
        <div
          className="flex items-center justify-center h-screen w-5xl"
          ref={introRef}
        >

          {/* TEXT */}
          <div
            className="flex items-center justify-center w-full flex-col text-center"
          >
            <div className="nonsel pointer-events-none">
              <p className={`text-4xl opacity-50 ${gaegu.className}`}>HELLO, I'M</p>
              <p className={`text-9xl ${kosugi.className} translate-x-6`}>KYLE<span className="text-blue-500">.</span></p>
              <p className="text-sm">Coding since September 2024 <span className="opacity-40">✦</span> <span className="underline">{getTime()}</span></p>
              <p className="text-sm">I love solving problems and making creative ideas come to life.</p>
            </div>

            <div className="pt-4 gap-4 flex">
              <button
                onClick={() => scrollToHandler(projectsRef)}
                className="rounded-full nonsel bg-[#17191a] px-5 py-3 text-sm text-white cursor-pointer transition-transform duration-300 hover:-translate-y-0.5"
              >
                See my work →
              </button>

              <button
                onClick={() => scrollToHandler(contactRef)}
                className="rounded-full nonsel border-2 border-[#17191a]/20 px-5 py-3 text-sm cursor-pointer transition-transform duration-300 hover:-translate-y-0.5"
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
              className="w-120 h-120 rounded-full bg-blue-500 flex items-center justify-center"
            >
              <img 
                src="/images/index/pfp.png"
                className={`
                  w-[96%] h-[96%] rounded-full
                `}
                />
            </div>
          </div>

        </div>

        <hr className="border border-gray-500/40 w-full" ref={projectsRef} />

        {/* INFO */}
        <div
          className={`
            flex w-full flex-col overflow-hidden
            transition-[height] duration-1000
            ${currentSection === "intro" ? "h-0" : "h-42"}
          `}
          
        >

          <div className="flex pl-20 gap-2">

            {Object.entries(stack).map(([category, technologies]) => (
              <div
                key={category}
                className="bg-gray-500/40 pt-4 px-4 flex flex-col w-auto h-42"
              >
                <p className={`text-2xl ${kosugi.className} self-center`}>{category.toLocaleUpperCase()}</p>

                {technologies.map(({ name, icon: Icon }) => (
                  <div key={name} className="flex items-center gap-2">
                    <Icon size={16} />
                    <span className="text-[8px] nonsel">●</span>
                    <span key={name} className="text-sm">{name}</span>
                  </div>
                ))}
              </div>
              
            ))}
              
          </div>

        </div>

        <hr className="border border-gray-500/40 w-full" />

        {/* PROJECTS */}
        <div
          className="flex items-center min-h-screen w-full pt-4 flex-col"
        >
          <p className={`text-3xl text-gray-400 pb-4 flex gap-4 items-center nonsel tracking-widest`}>
            <span className="text-xl">✦</span> 
            PROJECTS
            <span className="text-xl">✦</span> 
          </p>
          
          <div className="rounded-lg h-auto w-140 flex flex-col max-w-[80%]">
            <div className="group flex flex-col">
              <Link href="/" target="_blank">
                <img className="rounded-lg mb-2 nonsel" src="/images/miercury.png" />
              </Link>
              <div>
                <Link 
                  href="/"
                  className={`text-4xl ${kosugi.className} text-gray-500 group-hover:text-blue-500 transition-colors duration-500`}
                  >
                  MIERCURY
                </Link>
                </div>
              </div>
            <p className="text-sm text-justify">Miercury is my personal website and portfolio, built with Next.js, React, TypeScript, and Supabase. It showcases my artwork, projects, and web development skills while serving as a full-stack application with an interactive user experience and a custom admin dashboard for managing site content.</p>
          </div>

          <p className={`pt-12 translate-y-2 nonsel text-gray-500 tracking-[0.2em]`}>INSIDE MIERCURY...</p>
          <p className={`nonsel text-gray-400 panic pb-0.5`}>▼</p>

          <hr className="border-gray-500/40 mb-8 mt-0.5 w-[96%]" />

          {/* GALLERY */}
          <Project 
            title="GALLERY"
            info="A responsive art gallery built for browsing, filtering, and viewing my artworks, with Supabase-powered image storage and dynamic content management." 
            src="/images/gallery.png"
            link="/gallery"
          />

          <hr className="border-gray-500/40 my-8 w-[96%]" />

          {/* BLOG */}
          <Project 
            title="BLOG"
            info="A personal blog for documenting my own thoughts, projects and things I've learned along the way, with full CRUD operations powered by Supabase." 
            src="/images/blog.png"
            link="/blog/page/1"
          />

          <hr className="border-gray-500/40 my-8 w-[96%]" />

          {/* CHARACTERS */}
           <Project 
            title="CHARACTERS"
            info="An interactive character showcase for my original characters, combining artwork, lore, and playful interface interactions." 
            src="/images/ocs.png"
            link="/characters"
          />

          <hr className="border-gray-500/40 mt-8 w-[96%]" />
          
          {/* GAMES */}
          <p className={`text-3xl flex gap-4 pt-4 text-gray-400 items-center nonsel tracking-widest`}>
            <span className="text-xl">✦</span> 
            GAMES
            <span className="text-xl">✦</span> 
          </p>
          
          <div className="w-[80%] flex flex-col pt-4">
            <div className="grid grid-cols-3 gap-8">
              
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
        
        <p className="my-8 nonsel pointer-events-none loading-spin flex items-center justify-center monospace text-center text-9xl text-gray-400/50">✦</p>

        {/* CONTACT */}
        <div
          className="flex items-center justify-center h-screen w-full flex-col"
          ref={contactRef} 
        >
          <Marquee
            className="h-[10%] text-5xl nonsel pointer-events-none top-0 tracking-[0.2em]"
            autoFill
            speed={20}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;CONTACT
          </Marquee>

          <div className="h-[80%] w-full bg-white/40 flex flex-col items-center justify-center">
            <p>
              Let's create something gaze-worthy together ^_^
            </p>
            <p>
              kylemarshall.dev@protonmail.com
            </p>
          </div>

          <Marquee
            className="h-[10%] text-5xl nonsel pointer-events-none bottom-0 tracking-[0.2em]"
            autoFill
            speed={20}
            direction="right"
          >
            &nbsp;&nbsp;&nbsp;&nbsp;CONTACT
          </Marquee>
        </div>

        {/* NAVIGATION */}
        <div
          className={`
            fixed bottom-[2.5vh] px-6 py-2 bg-white rounded-3xl shadow-2xl
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

      </div>
      
      {/* LOADING SCREEN */}
      <Loading ready={ready} loadingRef={loadingScreenRef} />

    </div>
  );
}