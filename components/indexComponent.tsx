"use client";
import Image from "next/image";
import Stars from "@/components/indexStars";
import Title from "@/components/indexTitle";
import TitleBot from "@/components/indexTitleBot";
import BannerLink from "@/components/indexBannerLink"
import PostType from "@/types/postType";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import NextLink from "next/link";
import supabase from "@/lib/supabaseClient";
import { log } from "console";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const discordUsernameRef = useRef<HTMLHeadingElement | null>(null);
  const loginTextRef = useRef<HTMLParagraphElement | null>(null);
  const mierTakethRef = useRef<HTMLImageElement | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  
  const handleDiscordLink = () => {
  navigator.clipboard.writeText("miermiermiermier");

  gsap.killTweensOf(discordUsernameRef.current);

  gsap.set(discordUsernameRef.current, {
    visibility: "visible",
    opacity: 1,
    yPercent: 0,
  });

  gsap.timeline()
    .from(discordUsernameRef.current, {
      opacity: 0,
      yPercent: 150,
      duration: 1,
      ease: "power4.out",
    })
    .to(discordUsernameRef.current, {
      opacity: 0,
      yPercent: -50,
      duration: 1,
      ease: "power4.out",
    })
    .set(discordUsernameRef.current, {
      visibility: "hidden",
      clearProps: "transform,opacity",
    });
  };

  const loginTexts = ["log in", "are you sure?", "ur not even admin go away", ">:p"]
  let currentText = 0;

  const handleLoginClick = () => {
    if (currentText < 6) {

      currentText++;
      loginTextRef.current!.textContent = loginTexts[currentText % loginTexts.length];

    } else {

      const tl = gsap.timeline();

      tl
      .set(loginTextRef.current, {
        pointerEvents: "none",
      })
      .set(mierTakethRef.current, {
        visibility: "visible",
      })
      .to(mierTakethRef.current, {
        xPercent: -75,
        duration: 1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1
      })
      .to(loginTextRef.current, {
        xPercent: 125,
        duration: 1,
        ease: "power2.inOut",
      }, "<1")
      .set(mierTakethRef.current, {
        visibility: "hidden",
      })
      .set(loginTextRef.current, {
        visibility: "hidden",
      })
    }
  }

  const fetchPosts = async () => {
    const { error, data } = await supabase
      .from("posts")
      .select("*")
      .order("date_created", { ascending: false });

    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }
    
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const [properDate, setProperDate] = useState(false);

  const clickDate = () => {
    setProperDate(!properDate);
  }

  return (
    <div className="bg-[#17191a] min-w-screen min-h-screen align-center items-center flex flex-col relative">
      <div className="min-w-screen min-h-[40vh] flex justify-end align-center items-center top-0 flex-col">
        <Title />
      </div>
      <div className="content min-w-[40vw] min-h-[60vh] bg-[#00000000] text-black z-10 grid grid-rows-[1.2em_1fr]">

        <TitleBot />  

        <div className="grid grid-cols-1 sm:grid-cols-[7fr_3fr]">

          <div className="post-list text-white bg-[#535961]/60 flex flex-col items-center order-2 sm:order-1 px-2 pt-2">

            <div className="post p-5 rounded-md mb-2 max-w-[85ch] w-full">
              <h1 className="font-bold text-2xl">to do list</h1>
              <p className="text-xs pb-5 text-neutral-400">11/16/25</p>
              <p className="text-xl font-bold">TO-DO: </p>
              <p className="text-sm">● finish secret santa</p>
              <p className="text-sm">● make the pp page</p>
              <p className="text-sm">● make the about me page</p>
              <p className="text-sm">● make the ocs page</p>
              <p className="text-sm">● make the gallery page</p>
              <p className="text-sm">● make the mtwim page</p>
              <p className="text-sm">● perhaps have the blog be its own page instead</p>
              <p className="text-sm">● finish the scrollTrigger course</p>
              <p className="text-sm">● add more ppl to stars bg</p>
              <p className="text-sm">● finish the gsap course</p>
              <p className="text-sm">● make the moon an svg to make it look good on phone..</p>
              <p className="text-sm">● add all old posts from the old miercury websites here</p>
              <p className="text-sm">● set subdomains for characters/icemage/pp/etc.</p>
              <p className="text-sm">● make assets (a lot of it...)</p>
              <p className="text-sm">● make assets for mtwim</p>
              <p className="text-sm">● make assets for characters</p>
              <p className="text-sm">● add mier widget. (potentially make it persist across all routes)</p>
              <br></br>
              <p className="text-xl font-bold">DONE: </p>
              <p className="text-sm">✔ add more to the space background </p>
              <p className="text-sm">✔ implement editing posts with tiptap</p>
              <p className="text-sm">✔ implement tiptap on post dashboard</p>
              <p className="text-sm">✔ make a dashboard for blog crud operations</p>
              <p className="text-sm">✔ connect this to supabase so you can add blog posts</p>
              <p className="text-sm">✔ add vercel web analytics functionality</p>
              <hr className="my-6 border-neutral-500/40 max-w-[80ch] w-full translate-y-6.5" />
            </div>
            
            
            {posts.map((post) => {
              return (
                <div key={post.id} className="post p-5 rounded-md mb-2 max-w-[85ch] w-full">
                  <h1 className="font-bold text-2xl">{post.title}</h1>
                  <div className="text-xs pt-0.5 text-gray-400 nonsel flex" onClick={clickDate}>
                    <p className="underline">{properDate ? (post.spec_date) : post.date}</p>
                    {post.updated_date === null ? null : (<p className="pl-5">last updated at:</p>)}
                    {post.updated_spec_date && properDate ? (<p className="pl-2 underline">{post.updated_spec_date}</p>) : (<p className="pl-2 underline">{post.updated_date}</p>)}
                  </div>
                  <div
                    className="prose prose-invert pt-5 max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  <hr className="my-6 border-neutral-500/40 max-w-[80ch] w-full translate-y-6.5" />
                </div>
              );
            })}

          </div>

          <div className="text-white bg-[#535961]/50 flex flex-col items-center order-1 sm:order-2">

            <div className="bg-[#1d1f22]/40 min-w-full p-5 flex flex-col justify-center items-center">
              <img src="images/santahat.png" className="absolute z-1000 rotate-20 scale-30 -translate-y-44 translate-x-30 nonsel" draggable="false" style={{ userSelect: "none" }}/>
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

            <div className="flex flex-row justify-center items-center gap-3 pb-3">
              <NextLink href="https://x.com/miermirth  " target="_blank" rel="noopener noreferrer">
                <img src="/images/x.svg" className="max-h-[2.1em] nonsel linkButton transition-all duration-300" draggable="false" />
              </NextLink>
                <img onClick={handleDiscordLink} src="/images/discord.svg" className="max-h-[3em] nonsel linkButton transition-all duration-300" draggable="false" />
              <NextLink href="https://www.youtube.com/@miermiermiermier" target="_blank" rel="noopener noreferrer">
                <img src="/images/youtube.svg" className="max-h-[3em] nonsel linkButton transition-all duration-300" draggable="false" />
              </NextLink>
              <p
                ref={discordUsernameRef} 
                style={{ visibility: "hidden" }}
                className="absolute -translate-y-10 bg-[#535961]/90 py-1 px-1.5 rounded text-white"
              >
                copied! (miermiermiermier)
              </p>
            </div>

          </div>

        </div>

      </div>  
      <footer className="z-50">
        <div className="bg-[#101113]/90 py-2 min-w-screen flex flex-col justify-center align-center items-center bottom-0 text-white text-xs">

          <p>Copyright © {currentYear} Miercury. All Rights Reserved.</p>
          <p>
            <a href="mailto:admin@miercury.com">admin@miercury.com</a>
          </p>
          <p className="text-gray-300/40">Sound effects obtained from <a className="underline" href="https://www.zapsplat.com/" target="_blank" rel="noreferrer">zapsplat.com</a></p>

          <div className="right-1 absolute">
            <p ref={loginTextRef} onClick={handleLoginClick} className="pr-5 text-gray-100/90 text-xs hover:underline login cursor-pointer nonsel">log in</p>
          </div>

        </div>
      </footer>
      <img src="/images/mierwalk.gif" className="fixed z-1 bottom-0 right-0 nonsel" draggable="false" style={{ pointerEvents: "none" }} />
      <img ref={mierTakethRef} src="/images/miertaketh.png" className="absolute z-100 nonsel -right-80 bottom-4 invisible" draggable="false" style={{ pointerEvents: "none" }} />
      <Stars />
    </div>
  );
}
