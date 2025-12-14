"use client";
import Image from "next/image";
import Link from 'next/link';
import Stars from "@/components/indexStars";
import Title from "@/components/indexTitle";
import TitleBot from "@/components/indexTitleBot";
import BannerLink from "@/components/indexBannerLink"
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const loginRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    gsap.set(loginRef.current, { autoAlpha: 1, xPercent: 100 });
  }, []);

  const openLogin = () => {
    if (!loginRef.current) return;

    if (!open) {
      gsap.to(loginRef.current, {xPercent: 0, duration: 0.5 });
      setOpen(true);
    } else {
      gsap.to(loginRef.current, {xPercent: 100, duration: 0.5 });
      setOpen(false);
    }
  }

  return (
    <div className="bg-[#17191a] min-w-screen min-h-screen align-center items-center flex flex-col relative">
      <div className="bg-[#17191a] min-w-screen min-h-[40vh] flex justify-end align-center items-center top-0 flex-col">
        <Title />
      </div>
      <div className="content min-w-[40vw] min-h-[60vh] bg-[#00000000] text-black z-10 grid grid-rows-[1.2em_1fr]">

        <TitleBot />  

        <div className="grid grid-cols-1 sm:grid-cols-[7fr_3fr]">

          <div className="post-list text-white bg-[#535961]/60 flex flex-col items-center order-2 sm:order-1 px-2 pt-2">

            <div className="post p-5 rounded-md mb-2 max-w-[85ch] w-full">
              <h1 className="font-bold text-2xl">Lorem ipsum</h1>
              <p className="text-xs pb-5 text-neutral-400">12/13/25</p>
              <p className="text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, eum vero! Iusto ipsum rem laborum alias ipsa impedit ipsam velit facilis, corrupti inventore animi aperiam sit quae unde amet blanditiis.</p>
            </div>

            {/* <div className="h-px bg-neutral-500/30 my-6 max-w-[85ch] w-full" /> */}
            <hr className="my-6 border-neutral-500/40 max-w-[80ch] w-full" />
            
            <div className="post p-5 rounded-md mb-2 max-w-[85ch] w-full">
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
              <p className="text-sm">- add mier widget. (potentially make it persist across all routes)</p>
              <p className="text-sm">- add more to the space background </p>
              <p className="text-sm">- </p>
            </div>
            
            <hr className="my-6 border-neutral-500/40 max-w-[80ch] w-full" />
            

          </div>

          <div className="text-white bg-[#535961]/50 flex flex-col items-center order-1 sm:order-2">

            <div className="bg-[#1d1f22]/40 min-w-full p-5 flex flex-col justify-center items-center">
              <Image className="" src="/images/pfp.png" width={280} height={280} alt="pfp" />
            </div>
            <div className="text-black items-center min-w-full links grid grid-rows-5 gap-1 p-3 nonsel">
              <BannerLink name="Characters" link="characters" />
              <BannerLink name="MTWIM" link="mtwim" />
              <BannerLink name="Pacific Purgatory" link="pp" />
              <BannerLink name="Games" link="games" />
              <BannerLink name="Gallery" link="gallery" />
              <BannerLink name="About Me" link="about" />
            </div>

          </div>

        </div>

      </div>  
      <footer className="z-50">
        <div className="bg-[#101113]/90 min-h-[5vh] min-w-screen flex flex-col justify-center align-center items-center bottom-0 text-white">
          <p>Copyright © {currentYear} Miercury. All Rights Reserved.</p>
          <p className="text-gray-300/40 text-xs">Sound effects obtained from <a className="underline" href="https://www.zapsplat.com/" target="_blank" rel="noreferrer">zapsplat.com</a></p>
          <p className="absolute right-5 cursor-pointer nonsel" onClick={openLogin} >log in</p>

          <div 
          ref={loginRef}
          className="absolute right-0 bottom-[7vh] min-h-[10vh] min-w-[20vh] bg-[#535961]/20 flex flex-col justify-center items-center rounded-l-md gap-2 p-3.5 nonsel"
          style={{ visibility: "hidden" }}
          >
            <p className="absolute left-0.5 top-0 nonsel cursor-pointer" draggable="false" onClick={openLogin}>🞮</p>
            <div className="flex flex-col gap-0.5">
              <input className="bg-[#101113]/90 p-2 rounded-md" type="text" placeholder="username" />
              <input className="bg-[#101113]/90 p-2 rounded-md" type="text" placeholder="password" />
            </div>
            <button className="bg-[#101113]/90 p-2 rounded-md cursor-pointer">log in</button>
          </div>

        </div>
      </footer>
      <Stars />
    </div>
  );
}
