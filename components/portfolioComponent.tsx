"use client";
import { useState, useRef, useEffect } from "react";
import { Kosugi_Maru, Gaegu, Sono } from "next/font/google"
import Marquee from "react-fast-marquee";
import Project from "@/components/portfolioProject";
import Game from "@/components/portfolioGame";

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
  const infoRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const [currentSection, setCurrentSection] = useState<string>("intro");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      if (contactRef.current && scrollY >= contactRef.current.offsetTop) {
        setCurrentSection("contact");
      } else if (projectsRef.current && scrollY >= projectsRef.current.offsetTop) {
        setCurrentSection("projects");
      } else if (infoRef.current && scrollY >= infoRef.current.offsetTop) {
        setCurrentSection("info");
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

  return (
    <div className="flex items-center justify-center">

      {/* CONTENT */}
      <div className="text-black w-7xl max-w-screen min-h-screen flex flex-col items-center justify-center relative z-20 bg-[#dadfe1]">
      
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
                className="rounded-full nonsel bg-black px-5 py-3 text-sm text-white cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                See my work →
              </button>

              <button
                onClick={() => scrollToHandler(contactRef)}
                className="rounded-full nonsel border-2 border-black/20 px-5 py-3 text-sm cursor-pointer transition-transform hover:-translate-y-0.5"
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
              className="w-[60vh] h-[60vh] rounded-full bg-blue-500 flex items-center justify-center"
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

        <hr className="border-2 border-gray-500/60 mt-4 w-full" />

        {/* INFO */}
        <div
          className="flex items-center justify-center h-screen flex-col"
          ref={infoRef}
        >
          <p className="text-xl">A little bit about me:</p>
          Languages:
          TypeScript 
          JavaScript 
          HTML5 
          CSS3 
          SQL
          Frontend:
          React 
          Next.js 
          Tailwind CSS
          Backend:
          Supabase 
          PostgreSQL
          Tools:
          Git 
          GitHub 
          Vercel
          Libraries
          GSAP 
          Tiptap 
          YARL

        </div>

        <hr className="border-2 border-gray-500/60 mt-4 w-full" />

        {/* PROJECTS */}
        <div
          className="flex py-4 items-center min-h-screen w-full flex-col"
          ref={projectsRef}
        >
          <p className={`text-4xl pb-4 text-gray-400 flex gap-4 items-center nonsel ${kosugi.className}`}>
            <span className="text-xl">★</span> 
            PROJECTS
            <span className="text-xl">★</span> 
          </p>
          
          <div className="rounded-lg h-auto w-140 flex flex-col max-w-[80%]">
            <img src="/images/miercury.png" className="rounded-lg mb-2" />
            <p className={`text-3xl ${kosugi.className}`}>MIERCURY</p>
            <p className="text-sm text-justify">Miercury is my personal website and portfolio, built with Next.js, React, TypeScript, and Supabase. It showcases my artwork, projects, and web development skills while serving as a full-stack application with an interactive user experience and a custom admin dashboard for managing site content.</p>
          </div>

          <p className={`text-xl pt-8 translate-y-2 nonsel text-gray-500`}>Inside Miercury...</p>
          <p className={`nonsel text-gray-500 panic`}>▼</p>

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
            info="A personal blog for documenting projects, ideas, and things I've learned along the way. Of course, with full CRUD operations powered by Supabase." 
            src="/images/blog.png"
            link="/blog/page/1"
          />

          <hr className="border-gray-500/40 my-8 w-[96%]" />

          {/* CHARACTERS */}
           <Project 
            title="CHARACTER SHOWCASE"
            info="An interactive character showcase for my original characters, combining artwork, lore, and playful interface interactions." 
            src="/images/ocs.png"
            link="/characters"
          />

          <hr className="border-gray-500/40 mt-8 w-[96%]" />
          
          {/* GAMES */}
          <p className={`text-4xl text-gray-400 flex gap-4 pt-4 items-center nonsel ${kosugi.className}`}>
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
        
        {/* <hr className="border-8 border-gray-500/60 my-20 w-full" /> */}
        <p className="my-8 nonsel pointer-events-none loading-spin flex items-center justify-center monospace text-center text-9xl text-gray-400/50">✦</p>

        {/* CONTACT */}
        <div
          className="flex items-center justify-center h-screen w-full flex-col"
          ref={contactRef} 
        >
          <Marquee
            className="h-[10%] text-5xl nonsel pointer-events-none top-0"
            autoFill
            speed={20}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CONTACT
          </Marquee>

          <div className="h-[80%] bg-white w-full flex flex-col items-center justify-center">
            <p>
              Reach out!
            </p>
            <p>
              kylemarshall.dev@protonmail.com
            </p>
          </div>

          <Marquee
            className="h-[10%] text-5xl nonsel pointer-events-none bottom-0"
            autoFill
            speed={20}
            direction="right"
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CONTACT
          </Marquee>
        </div>

        {/* NAVIGATION */}
        <div
          className={`
            fixed bottom-[2.5vh] px-6 py-2 bg-white rounded-3xl
            flex gap-4 nonsel ${gaegu.className} text-lg z-50 transition-opacity duration-300
            ${currentSection === "contact" ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
        >
          <p className={`cursor-pointer transition-opacity duration-500 ${currentSection === "intro"    ? "opacity-100 font-bold pointer-events-none" : "opacity-50 hover:opacity-80"}`} onClick={() => scrollToHandler(introRef)}>INTRO</p>
          <span className="opacity-40">✦</span>
          <p className={`cursor-pointer transition-opacity duration-500 ${currentSection === "info"     ? "opacity-100 font-bold pointer-events-none" : "opacity-50 hover:opacity-80"}`} onClick={() => scrollToHandler(infoRef)}>INFO</p>
          <span className="opacity-40">✦</span>
          <p className={`cursor-pointer transition-opacity duration-500 ${currentSection === "projects" ? "opacity-100 font-bold pointer-events-none" : "opacity-50 hover:opacity-80"}`} onClick={() => scrollToHandler(projectsRef)}>PROJECTS</p>
          <span className="opacity-40">✦</span>
          <p className={`cursor-pointer transition-opacity duration-500 ${currentSection === "contact"  ? "opacity-100 font-bold pointer-events-none" : "opacity-50 hover:opacity-80"}`} onClick={() => scrollToHandler(contactRef)}>CONTACT</p>
        </div>

      </div>

    </div>
  );
}