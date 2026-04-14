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
          <Marquee speed={20} >
            <p className={`text-[80vh] ${rozha.className} nonsel pointer-events-none opacity-5`}>MIER THE ICE MAGE ❆&nbsp;</p>
          </Marquee>
          <img src="/images/mtwim/frank.png" className="z-50 scale-70 origin-bottom-right nonsel pointer-events-none absolute  right-60 bottom-0" />
          <img src="/images/mtwim/mier.png"  className="z-50 scale-70 origin-bottom-right nonsel pointer-events-none absolute -right-20 bottom-0" />
        </div>
        <div className="bg-[#000000] h-[16%] w-full"></div>
      </div>

      <div className="h-screen w-7xl bg-white">
        CONTENT
      </div>

    </div>
  )
}