"use client"
import { Bodoni_Moda, Noto_Serif_JP } from "next/font/google"
import { useEffect, useState } from "react"

const bodoni = Bodoni_Moda({
  weight: "400",
  subsets : ["latin"]
})

const noto = Noto_Serif_JP({
  weight: "400",
  subsets : ["latin"]
})

type InfoProps = {
  name: string,
  title: string,
  info: string,
  bg?: string,
  hidebg?: boolean
}

export default function Info({ name, title, info, bg, hidebg }: InfoProps) {

  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const check = () => setDesktop(window.innerWidth >= 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="w-full h-full z-20">
      
      <div
        className={`
          flex relative flex-col text-center items-center justify-center
          w-full h-full text-white px-8 min-[640px]:px-16 py-4 overflow-hidden gap-4 text-xs min-[640px]:text-sm min-[1600px]:text-base
          nonsel pointer-events-none ${noto.className}
        `}
        style={{ backgroundColor: !desktop ? "rgb(16,17,19)" : hidebg ? "transparent" : bg ? bg : "rgba(16,17,19,0.7)" }}
      >
        
        <div className="flex flex-col items-center justify-center w-full">
          {/* NAME */}
          <p className={`text-5xl xl:text-6xl text-nowrap ${bodoni.className}`}>
          {name}
          </p>

          {/* TITLE */}
          <p className="text-nowrap text-xl pb-2">
          {title}
          </p>

          <hr className="w-full mx-auto border-white/30" />
        </div>

        {/* INFO */}
        <div className="flex flex-col items-center justify-center w-full gap-0 xl:gap-4"> 
          {info.split("*").map((item, i) => 
            <p 
              key={i} 
            >
              {item}
            </p>
            )
          }
        </div>
        {!desktop || (<br />)}

        <img 
          className="absolute opacity-20 min-h-full min-w-full w-auto max-w-none bg-cover"
          src={name.slice(-2) === "us" ? "/images/ocs/calvarius-alt.png" : `/images/ocs/${name.toLowerCase()}-alt.png`}
          // LOL
        />

      </div>

    </div>
  )
}