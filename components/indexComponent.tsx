"use client";
import Image from "next/image";
import Link from 'next/link';
import Stars from "@/components/indexStars";
import Title from "@/components/indexTitle";
import TitleBot from "@/components/indexTitleBot";
import BannerLink from "@/components/indexBannerLink"

export default function Home() {

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#17191a] min-w-screen min-h-screen align-center items-center flex flex-col relative">
      <div className="bg-[#17191a] min-w-screen min-h-[40vh] flex justify-end align-center items-center top-0 flex-col">
        <Title />
      </div>
      <div className="content min-w-[60vw] min-h-[60vh] bg-[#00000000] text-black z-10 grid grid-rows-[1.2em_1fr]">

        <TitleBot />

        <div className="grid grid-cols-1 sm:grid-cols-[7fr_3fr]">

          <div className="text-white bg-[#535961] flex flex-col items-center px-2 order-2 sm:order-1">
            <div className="post p-5 border rounded-2xl w-full m-2">
              <h1 className="font-bold text-2xl">to do list</h1>
              <p className="text-xs pb-5 text-neutral-400">11/16/25</p>
              <p className="text-sm">- finish the scrollTrigger course</p>
              <p className="text-sm">- finish the gsap course</p>
              <p className="text-sm">- make the moon an svg to make it look good on phone..</p>
              <p className="text-sm">- connect this to supabase so you can add blog posts</p>
              <p className="text-sm">- make a dashboard for blog crud operations</p>
              <p className="text-sm">- add all old posts from the old miercury websites here</p>
              <p className="text-sm">- add vercel web analytics functionality</p>
              <p className="text-sm">- set subdomains for characters/icemage/pp/etc.</p>
              <p className="text-sm">- </p>
            </div>
          </div>

          <div className="text-white bg-[#535961]/50 flex flex-col items-center order-1 sm:order-2">

            <div className="bg-[#1d1f22]/40 min-w-full p-5 flex flex-col justify-center items-center">
              <Image className="" src="/images/pfp.png" width={280} height={280} alt="pfp" />
            </div>
            <div className="text-white items-center px-2 min-w-full links grid grid-rows-5 gap-1 p-2">
              <BannerLink name="Characters" link="characters" />
              <BannerLink name="MTWIM Compendium" link="mtwim" />
              <BannerLink name="Pacific Purgatory" link="pp" />
              <BannerLink name="Games" link="games" />
              <BannerLink name="About Me" link="about" />
            </div>

          </div>

        </div>

      </div>  
      <footer className="z-50">
        <div className="bg-[#17191a] min-w-screen flex justify-end align-center items-center bottom-0 flex-col text-white">
          <p>Copyright © {currentYear} Miercury</p>
        </div>
      </footer>
      <Stars />
    </div>
  );
}
