"use client";
import Image from "next/image";
import Link from 'next/link';
import Stars from "@/components/indexStars";
import Title from "@/components/indexTitle";

export default function Home() {

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#17171a] min-w-screen min-h-screen align-center items-center flex flex-col relative">
      <div className="bg-[#17171a] min-w-screen min-h-[40vh] flex justify-end align-center items-center top-0 flex-col">
        <Title />
      </div>
      <div className="content min-w-[60vw] min-h-[60vh] bg-[#00000000] text-black z-10 grid grid-rows-[1.2em_1fr]">

        <div className="bg-gray-300 rounded-t-lg flex flex-col justify-center items-center z-11">
          <p>enjoy the stay, keep it mirthful</p>
        </div>

        <div className="grid grid-cols-[7fr_3fr]">
          <div className="text-white bg-[#535961] flex flex-col items-center px-2">
            <div className="post p-5 border rounded-2xl w-full m-2">
              <h1>complaint</h1>
              <p>11/16/25</p>
              <p>i hate typescript</p>
              <p>i hate typescript</p>
              <p>i hate typescript</p>
              <p>i hate typescript</p>
              <p>i hate typescript</p>
              <p>i hate typescript</p>
              <p>i hate typescript</p>
              <p>i hate typescript</p>
              <p>i hate typescript</p>
              <p>i hate typescript</p>
              <p>i hate typescript</p>
            </div>
          </div>
          <div className="text-white bg-[#535961]/50 flex flex-col items-center">
            <div className="bg-[#1d1f22]/40 min-w-full p-5 flex flex-col justify-center items-center">
              <Image className="" src="/images/pfp.png" width={280} height={280} alt="pfp" />
            </div>
            <div className="text-white items-center px-2 min-w-full links grid grid-rows-5 gap-1 p-2">
              <div className="relative w-full bg-[#535961] rounded h-18 flex items-center overflow-hidden linkButton group">
                <img src="/images/characters.png" className="absolute inset-0 w-full h-full object-cover" />
                <p className="z-10 px-5">Characters</p>
                <span className="absolute inset-0 bg-linear-to-r from-[#ffffff]/30 to-transparent -translate-x-full transition-transform duration-300 pointer-events-none group-hover:translate-x-0"></span>
              </div>
              <div className="relative w-full bg-[#535961] rounded h-18 flex items-center overflow-hidden linkButton group">
                <img src="/images/icemage.png" className="absolute inset-0 w-full h-full object-cover" />
                <p className="z-10 px-5">MTWIM Compendium</p>
                <span className="absolute inset-0 bg-linear-to-r from-[#ffffff]/30 to-transparent -translate-x-full transition-transform duration-300 pointer-events-none group-hover:translate-x-0"></span>
              </div>
              <div className="relative w-full bg-[#535961] rounded h-18 flex items-center overflow-hidden linkButton group">
                <img src="/images/pp.png" className="absolute inset-0 w-full h-full object-cover" />
                <p className="z-10 px-5">PP</p>
                <span className="absolute inset-0 bg-linear-to-r from-[#ffffff]/30 to-transparent -translate-x-full transition-transform duration-300 pointer-events-none group-hover:translate-x-0"></span>
              </div>
              <div className="relative w-full bg-[#535961] rounded h-18 flex items-center overflow-hidden linkButton group">
                <img src="/images/games.png" className="absolute inset-0 w-full h-full object-cover" />
                <p className="z-10 px-5">Games</p>
                <span className="absolute inset-0 bg-linear-to-r from-[#ffffff]/30 to-transparent -translate-x-full transition-transform duration-300 pointer-events-none group-hover:translate-x-0"></span>
              </div>
              <div className="relative w-full bg-[#535961] rounded h-18 flex items-center overflow-hidden linkButton group">
                <img src="/images/aboutme.png" className="absolute inset-0 w-full h-full object-cover" />
                <p className="z-10 px-5">About me</p>
                <span className="absolute inset-0 bg-linear-to-r from-[#ffffff]/30 to-transparent -translate-x-full transition-transform duration-300 pointer-events-none group-hover:translate-x-0"></span>
              </div>

            </div>
          </div>
        </div>

      </div>  
      <footer className="z-50">
        <div className="bg-[#17171a] min-w-screen flex justify-end align-center items-center bottom-0 flex-col text-white">
          <p>Copyright © {currentYear} Miercury</p>
        </div>
      </footer>
      <Stars />
    </div>
  );
}
