import Image from "next/image";
import React from "react";
import GamesList from "@/components/gamesList";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-w-screen min-h-screen grid grid-rows-[0.5fr_3fr_0.5fr] text-white z-50">
      
      <div className="flex justify-center items-center z-50">
        <h1>games</h1>
      </div>

      <GamesList />

      <div className="flex justify-center items-center z-50">
        <h1>games</h1>
      </div>

      <footer className="z-50">
        <div className="bg-[#17191a] min-w-screen flex justify-end align-center items-center bottom-0 flex-col text-white">
          <p>Copyright © {currentYear} Miercury</p>
        </div>
      </footer>
    </main>
  );
}