"use client";
import { useState, useRef, useEffect } from "react";
import { Kosugi_Maru, Gaegu, Jua } from "next/font/google"
import Link from "next/link";
import Project from "@/components/portfolioProject";

const kosugi = Kosugi_Maru({
  weight: "400",
  subsets: ["latin"],
})

const gaegu = Gaegu({
  weight: "400",
  subsets: ["latin"],
})

const jua = Jua({
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
      <div className="text-black w-7xl max-w-screen min-h-screen flex flex-col items-center justify-center relative z-20 bg-[#dadfe1] gap-4">
      
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

        {/* PROJECTS */}
        <div
          className="flex p-4 items-center min-h-screen w-full flex-col"
          ref={projectsRef}
        >
          <p className="text-5xl">Projects</p>
          
          <div className="p-4 bg-amber-100 rounded-lg h-60 w-140 flex flex-col items-center">
            <div className="bg-amber-200 w-60 h-30" />
            <p>Miercury</p>
            <p>the website you're on right now!</p>
          </div>

          <p className="text-3xl">Inside Miercury...</p>

          <hr className="border-gray-500/40 my-4 w-full" />

          {/* GALLERY */}
          <Project 
            title="GALLERY"
            info="A responsive art gallery built for browsing, filtering, and viewing my artworks, with Supabase-powered image storage and dynamic content management." 
            src="/images/gallery.png"
            link="/gallery"
          />
          <hr className="border-gray-500/40 my-4 w-full" />

          {/* BLOG */}
          <Project 
            title="BLOG"
            info="A personal blog for documenting projects, ideas, and things I've learned along the way. Of course, with full CRUD operations powered by Supabase." 
            src="/images/blog.png"
            link="/blog/page/1"
          />
          <hr className="border-gray-500/40 my-4 w-full" />

          {/* CHARACTERS */}
           <Project 
            title="CHARACTER SHOWCASE"
            info="An interactive character showcase for my original characters, combining artwork, lore, and playful interface interactions." 
            src="/images/ocs.png"
            link="/characters"
          />
          <hr className="border-gray-500/40 my-4 w-full" />
          
          {/* GAMES */}
          <p className={`text-4xl text-gray-400 ${kosugi.className}`}>GAMES</p>
          
          <div className="w-[80%] flex flex-col pt-4">
            <div className="grid grid-cols-3 gap-8">

              <div>
                <video className="rounded-lg" loop muted autoPlay src="/videos/games/mieros.mov" />
                <p className={`text-3xl pt-2 text-gray-500 ${jua.className}`}>MierOS</p>
                <p className="text-sm text-justify">A notes app and YouTube player disguised as a personalized operating system. Originally built with EJS to explore PostgreSQL, public APIs, and local file handling, later rebuilt and ported to Miercury.</p>
              </div>

              <div>
                <video className="rounded-lg" loop muted autoPlay src="/videos/games/fish.mov" />
                <p className={`text-3xl pt-2 text-gray-500 ${jua.className}`}>Mier Fishing</p>
                <p className="text-sm text-justify">A fishing-themed typing game I made purely for fun, built entirely with vanilla HTML, CSS, and JavaScript.</p>
              </div>
              
              <div>
                <video className="rounded-lg" loop muted autoPlay src="/videos/games/match.mov" />
                <p className={`text-3xl pt-2 text-gray-500 ${jua.className}`}>Match Game</p>
                <p className="text-sm text-justify">My first attempt at making a game, built around 3–4 months into learning web development.</p>
              </div>
              
            </div>

          </div>


        </div>

        {/* CONTACT */}
        <div
          className="flex items-center justify-center h-screen w-full flex-col"
          ref={contactRef} 
        >
          <div className="h-[80%] bg-white w-full flex flex-col items-center justify-center">
            <p>
              Reach out!
            </p>
            <p>
              kylemarshall.dev@protonmail.com
            </p>
          </div>
        </div>


        {/* NAVIGATION */}
        <div
          className={`
            fixed bottom-[2.5vh] px-6 py-2 bg-white rounded-3xl
            flex gap-4 nonsel ${gaegu.className} text-lg
          `}
        >
          <p className={`cursor-pointer transition-opacity duration-500 ${currentSection === "intro"    ? "opacity-100 font-bold" : "opacity-50 hover:opacity-80"}`} onClick={() => scrollToHandler(introRef)}>INTRO</p>
          <span className="opacity-40">✦</span>
          <p className={`cursor-pointer transition-opacity duration-500 ${currentSection === "info"     ? "opacity-100 font-bold" : "opacity-50 hover:opacity-80"}`} onClick={() => scrollToHandler(infoRef)}>INFO</p>
          <span className="opacity-40">✦</span>
          <p className={`cursor-pointer transition-opacity duration-500 ${currentSection === "projects" ? "opacity-100 font-bold" : "opacity-50 hover:opacity-80"}`} onClick={() => scrollToHandler(projectsRef)}>PROJECTS</p>
          <span className="opacity-40">✦</span>
          <p className={`cursor-pointer transition-opacity duration-500 ${currentSection === "contact"  ? "opacity-100 font-bold" : "opacity-50 hover:opacity-80"}`} onClick={() => scrollToHandler(contactRef)}>CONTACT</p>
        </div>

      </div>

    </div>
  );
}