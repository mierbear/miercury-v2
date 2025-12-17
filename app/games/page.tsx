import Image from "next/image";
import React from "react";
import GamesList from "@/components/gamesList";
import { Boldonse } from "next/font/google"

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
})

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-w-screen min-h-screen grid grid-rows-[0.5fr_3fr] xl:grid-rows-[0.5fr_3fr_0.5fr] text-white z-50">
      
      <div className="flex justify-center items-end z-50 xl:justify-start xl:pb-0 xl:items-center xl:pl-3 pb-5 nonsel">
        <h1 className={`${boldonse.className} text-7xl md:text-8xl xl:text-6xl`}>GAMES</h1>
      </div>

      <GamesList />

      <div className="justify-center items-center z-50 xl:visible invisible hidden xl:flex">
        <h1>games</h1>
      </div>

      <footer className="z-50">
        <div className="bg-[#17191a] min-w-screen flex justify-end align-center items-center bottom-0 flex-col text-white">
          <p>Copyright © {currentYear} Miercury. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}