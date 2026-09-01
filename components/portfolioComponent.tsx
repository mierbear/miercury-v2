"use client";
import { useState, useRef, useEffect } from "react";
import { Kosugi_Maru, Gaegu } from "next/font/google"
import Link from "next/link";

const kosugi = Kosugi_Maru({
  weight: "400",
  subsets: ["latin"],
})

const gaegu = Gaegu({
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

          <hr className="border-gray-500/30 my-4 w-full" />
          
          <div className="flex flex-col w-[80%] gap-4">
            <Link href={`/gallery`} target="_blank">
              <img className="rounded-2xl" src="/images/gallery.png"/>
            </Link>
            <div>
              <Link 
                href={`/gallery`} 
                target="_blank" 
                className={`text-7xl ${kosugi.className} text-gray-500 hover:text-blue-500 transition-colors duration-200`}
              >
                GALLERY
              </Link>
              <p className={`text-sm`}>
                a responsive artwork gallery with tag filtering, lightbox viewing, and Supabase content storage integration.
              </p>
            </div>
          </div>

          <hr className="border-gray-500/30 my-4 w-full" />
          
          <div className="flex flex-col w-[80%] gap-4">
                
            <Link href={`/blog/page/1`} target="_blank">
              <img className="rounded-2xl" src="/images/blog.png"/>
            </Link>
            <div>
              <Link 
                href={`/blog/page/1`} 
                className={`text-7xl ${kosugi.className} text-gray-500 hover:text-blue-500 transition-colors duration-200`}
              >
                BLOG
              </Link>
              <p className={`text-sm`}>
                a blog
              </p>
            </div>
          </div>
          
          <hr className="border-gray-500/30 my-4 w-full" />

          <div className="flex flex-col w-[80%] gap-4">
            <Link href={`/characters`} target="_blank">
              <img className="rounded-2xl" src="/images/ocs.png"/>
            </Link>
            <div>
              <Link 
                href={`/characters`} 
                className={`text-7xl ${kosugi.className} text-gray-500 hover:text-blue-500 transition-colors duration-200`}
              >
                CHARACTER SHOWCASE
              </Link>
              <p className={`text-sm`}>
                a character showcase page
              </p>
            </div>
          </div>

          <hr className="border-gray-500/30 my-4 w-full" />

          <p className="text-xl">GAMES</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              MierOS
            </div>
            <div>
              Mier Fishing
            </div>
            <div>
              Match Game
            </div>
          </div>

        </div>

        {/* CONTACT */}
        <div
          className="flex items-center justify-center h-screen w-full flex-col"
          ref={contactRef} 
        >
          <div className="h-[80%] bg-black/20 w-full flex flex-col items-center justify-center">
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
            flex gap-4 nonsel ${kosugi.className}
          `}
        >
          <p className={`cursor-pointer ${currentSection === "intro"    && "underline"}`} onClick={() => scrollToHandler(introRef)}>INTRO</p>
          <span className="opacity-40">✦</span>
          <p className={`cursor-pointer ${currentSection === "info"     && "underline"}`} onClick={() => scrollToHandler(infoRef)}>INFO</p>
          <span className="opacity-40">✦</span>
          <p className={`cursor-pointer ${currentSection === "projects" && "underline"}`} onClick={() => scrollToHandler(projectsRef)}>PROJECTS</p>
          <span className="opacity-40">✦</span>
          <p className={`cursor-pointer ${currentSection === "contact"  && "underline"}`} onClick={() => scrollToHandler(contactRef)}>CONTACT</p>
        </div>

      </div>

    </div>
  );
}