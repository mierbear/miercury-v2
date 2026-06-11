"use client"
import { Bodoni_Moda, Noto_Serif_JP } from "next/font/google"

const bodoni = Bodoni_Moda({
  weight: "400",
  subsets : ["latin"]
})

const noto = Noto_Serif_JP({
  weight: "400",
  subsets : ["latin"]
})

export default function Info({ name, title, info, bg, hidebg }: { name: string, title: string, info: string, bg?: string, hidebg?: boolean }) {

  return (
    <div className="w-full h-full z-20">
      
      <div
        className={`
          flex relative flex-col text-center items-center justify-center
          w-full h-full text-white px-16 overflow-hidden gap-4
          nonsel pointer-events-none ${noto.className}
        `}
        style={{ backgroundColor: hidebg ? "transparent" : bg ? bg : "rgba(16,17,19,0.7)" }}
      >
        
        <div className="flex flex-col items-center justify-center w-full">
          {/* NAME */}
          <p className={`text-6xl text-nowrap ${bodoni.className}`}>
          {name}
          </p>

          {/* TITLE */}
          <p className="text-nowrap text-xl pb-2">
          {title}
          </p>

          <hr className="w-full mx-auto border-white/30" />
        </div>

        {/* INFO */}
        <div className="flex flex-col items-center justify-center w-full gap-4"> 
          {info.split("*").map((item, i) => 
            <p 
              key={i} 
            >
              {item}
            </p>
            )
          }
        </div>
        <br />

        <img 
          className="absolute opacity-20 min-h-full min-w-full w-auto max-w-none bg-cover"
          src={name.slice(-2) === "us" ? "/images/ocs/calvarius-alt.png" : `/images/ocs/${name.toLowerCase()}-alt.png`}
          // LOL
        />

      </div>

    </div>
  )
}