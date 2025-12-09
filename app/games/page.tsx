import Image from "next/image";
import NextLink from "next/link";
import BannerLink from "@/components/indexBannerLink"

export default function Home() {

  const currentYear = new Date().getFullYear();

  return (
    <main className="min-w-screen min-h-screen grid grid-rows-[3fr_1fr] text-white z-50">
      
      <div className="flex justify-center items-center bg-[#535961] z-50">
        <a href="/games/mierfishing/index.html" target="_blank" rel="noopener noreferrer">My Game</a>
      </div>

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