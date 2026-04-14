"use client";
import Marquee from "react-fast-marquee";
import { Gloock } from "next/font/google";

const rozha = Gloock({
  weight: "400",
  subsets: ["latin"],
})

export default function Mtwim() {

  return (
    <div className="min-w-screen min-h-screen max-w-screen flex flex-col items-center">

      {/* TOP */}
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <div className="bg-[#9eadb9] h-[16%] w-full"></div>
        <div className="bg-[#90b5d3] h-[68%] w-full relative items-center justify-center flex">

          {/* MARQUEE */}
          <Marquee speed={30} className="absolute" >
            <div className="flex items-center nonsel pointer-events-none">
              <p className={`text-[80vh] ${rozha.className} opacity-5`}>MIER THE ICE MAGE</p>
              <div className="h-[60vh] w-[60vh] flex slow-backwards-spin items-center justify-center">
                <p className="text-[60vh] text-white monospace opacity-30">❆</p>
              </div>
            </div>
          </Marquee>

          {/* IMAGES */}
          <img src="/images/mtwim/frank.png" className="z-50 scale-70 origin-bottom-right nonsel pointer-events-none absolute  right-60 bottom-0 figure-breathe-slow" />
          <img src="/images/mtwim/mier.png"  className="z-50 scale-70 origin-bottom-right nonsel pointer-events-none absolute -right-20 bottom-0 figure-breathe-medium" />
          
          {/* CTA */}
          <div className="absolute h-full w-160 left-20 bg-black/30 z-70 flex gap-6 items-center justify-center flex-col">
            <p className="text-6xl font-bold text-center px-10  ">Mier: The Weakest Ice Mage</p>
            <p className="">sdfdsfdsfsdf</p>
            <p className="px-12 py-8 text-xl bg-white rounded-2xl cursor-pointer">READ PROLOGUE</p>
          </div>
          
        </div>

        <div className="bg-[#000000] h-[16%] w-full z-60"></div>
      </div>

      <div className="h-screen w-7xl bg-white flex flex-col items-center">
        CONTENT
      </div>

    </div>
  )
}