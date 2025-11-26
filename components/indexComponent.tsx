"use client";
import Image from "next/image";
import Link from 'next/link';
import Stars from "@/components/indexStars";
import Title from "@/components/indexTitle";
import BannerLink from "@/components/indexBannerLink"

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
              <p>i love typescript</p>
            </div>
          </div>
          <div className="text-white bg-[#535961]/50 flex flex-col items-center">
            <div className="bg-[#1d1f22]/40 min-w-full p-5 flex flex-col justify-center items-center">
              <Image className="" src="/images/pfp.png" width={280} height={280} alt="pfp" />
            </div>
            <div className="text-white items-center px-2 min-w-full links grid grid-rows-5 gap-1 p-2">
              <BannerLink name="Characters" link="characters" />
              <BannerLink name="MTWIM Compendium" link="icemage" />
              <BannerLink name="Pacific Purgatory" link="pp" />
              <BannerLink name="Games" link="games" />
              <BannerLink name="About Me" link="about" />
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
