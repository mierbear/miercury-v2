"use client";
import Image from "next/image";
import Stars from "@/components/indexStars";
import Title from "@/components/indexTitle";
import TitleBot from "@/components/indexTitleBot";
import PostType from "@/types/postType";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import NextLink from "next/link";
import supabase from "@/lib/supabaseClient";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Xanh_Mono } from "next/font/google"
import Marquee from "react-fast-marquee";

const xanh = Xanh_Mono({
  weight: "400",
  subsets: ["latin"],
})


export default function Home() {
  const currentYear = new Date().getFullYear();
  const discordUsernameRef = useRef<HTMLHeadingElement | null>(null);
  const loginTextRef = useRef<HTMLParagraphElement | null>(null);
  const mierTakethRef = useRef<HTMLImageElement | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [latestPost, setLatestPost] = useState<PostType | null>(null);
  const [latestPostSnippet, setLatestPostSnippet] = useState<string | null>(null);
  
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
        display: "none",
      })
      .set(loginTextRef.current, {
        display: "none",
      })
    }
  }

  const fetchPosts = async () => {
    const { error, data } = await supabase
      .from("posts")
      .select("*")
      .order("date_created", { ascending: false })
      .limit(4);

    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }
    
    setPosts(data.slice(1));
    setLatestPost(data[0]);

    const snippet = data[0].content.replace(/<[^>]+>/g, "").slice(0, 100);
    setLatestPostSnippet(snippet);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const [properDate, setProperDate] = useState(false);

  const clickDate = () => {
    setProperDate(!properDate);
  }

  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center", 
      duration: 20,
    },
    [autoplay.current]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [slides, setSlides] = useState<number[]>([])

  useEffect(() => {
    if (!emblaApi) return

    setSlides(emblaApi.scrollSnapList())

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi])


  const quotes = [
    "How can you put forth your best fruit if you are not put forth within yourself first?",
    "You can only be in hell with your own permission.",
    "There's not enough room in your mind for some other entity's thoughts.",
    "Men are second only to God, which is something that the forgetting of is the end of your life prematurely. Which is usually at the beginning.",
    "The devil makes work of idle hands.",
    "Become who you are, become who you want to be and who you should be, before you never do.",
    "The only thing you're in control of are your own thoughts.",
    "The only thing the devil wants is for you to suffer like it is.",
    "There is no free will in the world, unless you get less of the world.",
    "The only thing there is in this life is to purify your soul, so that you're not afraid of death.",
    "The angels weep for men and women failing to accept the challenge of integrity.",
    "Truly I tell you, unless you turn and become like children, you will never enter the kingdom of heaven. - Matthew 18:3",
    "When we experience tears, our souls become like babies.",
    "There are no coincidences. Nothing is random.",
    "Fear is not a natural state of man.",
    "Forgive them for they know not what they do. - Luke 23:34",
    "The fear of death distresses a man with a guilty conscience, but the man with a good witness within himself longs for death as for life.",
	  "Your thoughts determine your life.",
    "Strict adherence to one’s own free will, is the fall.",
    "Each and every action are equally drastic, therefore no action is drastic. So you don't have to look at something as hard to do.",
    "It takes control to be addicted. It takes more control to keep it in you than to push it all out.",
    "Restoration of faith is the knowledge of real free will, which is obedience. Free will is actually obedience, but you are only willing to and enthusiastic of obedience when you have faith to back it up",
    "You're better off fishing in your own mind",
    "Lucky is the lion that the human will eat, so that the lion becomes human. And foul is the human that the lion will eat, and the lion still will become human.",
    "No prophet is welcome on his home turf. Doctors don't cure those who know him.",
    "Unrealized creativity is one of the most destructive things in the human psyche.",
    "For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places. - Ephesians 6:12",
    "Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours. - Mark 11:24",
  ]

  const getQuote = (quotes: string[]): string => {
    const today = new Date();
    const day = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const index = day % quotes.length;
    return quotes[index];
  };

  const [status, setStatus] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch("https://api.lanyard.rest/v1/users/1161647595526045766");

      if (!res.ok) {
        throw new Error("Failed to fetch status");
      }

      const json = await res.json();
      setStatus(json.data.discord_status);

      if (json.data.activities[0].emoji) {
        setBio(`${json.data.activities[0].emoji.name} ${json.data.activities[0].state}`);
      } else {
        setBio(`${json.data.activities[0].state}`);
      }

      if (json.data.activities[1]) {
        setCurrentGame(json.data.activities[1].name);
      }

      return json.data;

    } catch (error) {
      console.error("fetch failed: ", error);
      return null;
    }
  }

  useEffect(() => {
    fetchStatus();
  }, [])

  const blogBookRef = useRef<HTMLImageElement | null>(null);
  const blogOpenTl = gsap.timeline();
  const blogCloseTl = gsap.timeline();

  const blogSketches = [
    "mier",
    "abri",
    "vert",
    "12s",
    "genki",
    "feline",
    "jelly",
    "jett",
    "kags",
    "lance",
    "partack",
    "truilt",
  ];

  const randomizer = (arr: string[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const blogHoverOn = () => {
    if (!blogBookRef.current) return;
    blogOpenTl.clear();
    blogCloseTl.clear();

    blogOpenTl
      .to(blogBookRef.current, {
        xPercent: 35,
        duration: 0.3,
        ease: "power2.out",
      })
      .set(blogBookRef.current, {
        attr: { src: `/images/blogopen-${randomizer(blogSketches)}.png` },
      }, "<0.15");
  };

  const blogHoverOff = () => {
    if (!blogBookRef.current) return;
    blogOpenTl.clear();
    blogCloseTl.clear();

    blogCloseTl
      .set(blogBookRef.current, {
        attr: { src: "/images/blogclose.png" },
      })
      .to(blogBookRef.current, {
        xPercent: 0,
        duration: 0.3,
        ease: "power2.out",
      });
  };


  return (
    <div className="bg-[#17191a] min-w-screen min-h-screen align-center items-center flex flex-col relative">
      <div className="min-w-screen min-h-[40vh] flex justify-end align-center items-center top-0 flex-col">
        <Title />
      </div>
      <div className="content w-270 max-w-screen min-h-[60vh] bg-[#00000000] text-black z-10 grid grid-rows-[1.2em_1fr] relative">

        <TitleBot />  

        {/* DONT FORGET TO REMOVE MIN-H-SCREEN FOR THIS DIV AND BOTH COLUMNS */}
        <div className="bg-[#535961]/60 w-full min-h-screen flex flex-col items-center">

          <div className="w-full grid grid-cols-[2fr_1fr]">

            {/* LEFT COL */}
            <div className="m-4 mr-2 min-h-screen flex items-center flex-col">

              {/* CAROUSEL */}
              <div className="flex flex-col justify-center items-center relative max-h-60 text-white border-[#d8e0e3]/70 border ">
                <div
                  className="overflow-hidden flex items-center justify-center"
                  onMouseEnter={() => autoplay.current.stop()}
                  onMouseLeave={() => autoplay.current.play()}
                  ref={emblaRef}
                >
                  <div className={`flex ${ready ? "opacity-100" : "opacity-0"}`}>

                    <div className="flex-[0_0_100%]">
                      <div className="flex flex-row w-full justify-between items-center text-center px-10 h-full nonsel bg-[#17191a]/40 overflow-x-hidden">
                        <img src="/images/construction.gif" />
                        <h1 className="text-red-600 font-bold">THIS SITE IS STILL VERY UNFINISHED!! <br /> THX FOR VISITING XOXO</h1>
                        <img src="/images/construction.gif" />
                      </div>
                    </div>

                    <div className="flex-[0_0_100%]">
                      <NextLink href="/mierfishing/index.html" target="_blank" rel="noopener noreferrer">
                        <img src="/images/indexbanner.png" className="w-full bg-[#17191a]/40" />
                      </NextLink>
                    </div>
                    
                    <div className="flex-[0_0_100%]">
                      <NextLink href="https://vertuously.com/" target="_blank" rel="noopener noreferrer">
                        <img src="/images/indexbanner2.png" className="w-full bg-[#17191a]/40" />
                      </NextLink>
                    </div>
                    
                  </div>
                </div>
                
                <button onClick={scrollPrev} className="absolute cursor-pointer left-4">←</button>
                <button onClick={scrollNext} className="absolute cursor-pointer right-4">→</button>
                <div className="flex gap-2 justify-center absolute bottom-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => emblaApi?.scrollTo(i)}
                      className={`w-2 h-2 rounded-full transition cursor-pointer
                        ${i === selectedIndex ? 'bg-white' : 'bg-white/30'}`}
                    />
                  ))}
                </div>

              </div>
                
              <hr className="mt-4 border-gray-500/30 w-full" />
              
              {/* ART */}
              <div className="flex flex-col justify-center items-center relative text-white w-[90%]">
                <h1 className={`${xanh.className} text-white font-bold py-8`}>Latest Artwork</h1>
                <img src="images/featart.png" style={{ pointerEvents: "none" }} className="nonsel border-3 border-[#d8e0e3]" />
                <img src="images/featart.png" style={{ pointerEvents: "none" }} className="nonsel border-3 border-[#d8e0e3] absolute right-0 bottom-0 scale-25 origin-bottom-right skew-x-16 -skew-y-6 -translate-x-10 translate-y-5"/>
              </div>

              <hr className="mb-4 mt-20 border-gray-500/30 w-full" />

              {/* MISC */}
              <div className="grid grid-cols-[1.618fr_1fr] text-white w-full gap-4">
                
                {/* 1 */}
                <div className="flex flex-col items-center border-[#d8e0e3]/70 border border-dashed pb-4">

                {latestPost === null ? null : (
                  <div key={latestPost.id} className="p-4 rounded-md mb-2 max-w-[85ch] w-full relative">
                    <NextLink href={`/blog/post/${latestPost.slug}`}>
                      <h1 className="font-bold text-2xl hover:underline blue">{latestPost.title}</h1>
                    </NextLink>
                    <div className="text-xs text-gray-400 nonsel flex" onClick={clickDate}>
                      <p className="underline">{properDate ? (latestPost.spec_date) : latestPost.date}</p>
                    </div>
                    <div className="prose prose-invert pt-5 mb-4">
                      <p>{latestPostSnippet}...</p>
                    </div>
                    
                    <p className="absolute bottom-0 text-xs hover:underline right-4 blue"><a href={`/blog/post/${latestPost.slug}`}>continue reading?</a></p>
                  </div>
                )}
                  <hr className="mb-4 border-gray-500/60 max-w-[80ch] w-full" />
                {posts.map((post) => {
                  return (
                    <div key={post.id} className="rounded-md max-w-[85ch] w-full flex flex-row items-center justify-between pl-4 pr-4">

                      <NextLink href={`/blog/post/${post.slug}`}>
                        <p className="font-bold hover:underline blue">{post.title}</p>
                      </NextLink>
                      
                      <div className="text-xs text-gray-400 nonsel flex">
                        <p className="">— {post.date}</p>
                      </div>

                    </div>
                  );
                })}

                </div>

                <div className="grid grid-rows-[1fr_1.618fr] gap-4">

                  <div className="grid grid-cols-[1fr_1.618fr] gap-4">

                    {/* 4 */}
                    <div className="flex flex-col justify-center items-center border-[#d8e0e3]/70 border">
                      ?
                    </div>

                    {/* 3 */}
                    <NextLink href="https://mier.atabook.org/" target="_blank" rel="noopener noreferrer" className="flex flex-col justify-center w-full items-center border-[#d8e0e3]/70 border">
                      <p className="text-center">sign my guestbook</p>
                    </NextLink>

                  </div>
                  
                  {/* 2 */}
                  <div className="flex flex-col justify-center items-center border-[#d8e0e3]/70 border">
                    changelog
                  </div>

                </div>

              </div>

              <hr className="mb-4 mt-4 border-gray-500/30 w-full" />

            </div> 

            {/* RIGHT COL */}
            <div className="m-4 ml-2 min-h-screen">

              {/* INTRO */}
              <div className="text-white border-[#d8e0e3]/70 relative border-dotted border flex flex-col items-center pb-14">

                <div className="p-4 flex items-center flex-col">
                  <img
                    src="/images/pfp.png"
                    className="mb-4 max-w-[50%]"
                  />

                  <p className="text-xs text-justify">
                    Hello, welcome to Miercury! This is a place for me to share my thoughts, projects and artworks. You can read more about me <a href="/about" className="underline blue text-">here.</a>
                    <br />
                    <br />
                    I hope you enjoy your stay.
                  </p>
                </div>

                <div className="border-t border-b border-[#d8e0e3]/70 w-full mb-2 p-2 text-center flex flex-col items-center justify-center bg-[#17191a]/80 nonsel">
                    <p className={`
                      ${status === "online" ? "text-[#8fffff] online-glow" : ""}
                      ${status === "idle" ? "text-[#fff671] idle-glow" : ""}
                      ${status === "dnd" ? "text-red-600 dnd-glow" : ""}
                      ${status === "offline" ? "text-gray-400" : ""}
                      font-extrabold
                      text-5xl
                      `}>
                      {status === "online" ? "ONLINE" : ""}
                      {status === "idle" ? "AWAY" : ""}
                      {status === "dnd" ? "BUSY" : ""}
                      {status === "offline" ? "OFFLINE" : ""}
                    </p>
                  
                  {currentGame !== null && (
                    <p className={`
                      ${status === "online" ? "text-[#8fffff] online-glow" : ""}
                      ${status === "idle" ? "text-[#fff671] idle-glow" : ""}
                      ${status === "dnd" ? "text-red-600 dnd-glow" : ""}
                      ${status === "offline" ? "text-gray-400" : ""}
                      text-xs
                      pb-1
                    `}>
                      (currently on {currentGame})
                    </p>
                  )}

                  {status !== "offline" && (
                    <p className="italic text-xs">"{bio}"</p>
                  )}
                </div>

                <div className="flex flex-row justify-center items-center gap-3 absolute bottom-0 right-0 pb-2 px-4">
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
                    className="absolute -translate-y-10 bg-[#535961]/90 py-1 px-1.5 rounded text-white text-center"
                  >
                    copied! (miermiermiermier)
                  </p>
                </div>
              </div> 

              {/* <hr className="my-4 border-gray-500/30 w-full" /> */}
              
              {/* QOTD */}
              {/* <div className="text-justify p-4 flex flex-col items-center relative text-white border-[#d8e0e3]/70 border">
                <h1>quote of the day</h1>
                <p className="text-xs">{getQuote(quotes)}</p>
              </div>  */}
              
              <hr className="my-4 border-gray-500/30 w-full" />

              {/* NAV */}
              <div className="p-4 flex flex-col items-center relative border-[#d8e0e3]/70 border gap-4">
                {/* <BannerLink name="Characters" link="characters" />
                <BannerLink name="MTWIM" link="mtwim" />
                <BannerLink name="Pacific Purgatory" link="pp" />
                <BannerLink name="Games" link="games" />
                <BannerLink name="Gallery" link="gallery" />
                <BannerLink name="About Me" link="about" />
                <BannerLink name="Blog" link="blog" /> */}
                <div className="flex flex-col gap-4">
                  <NextLink href="/characters">
                    (characters)
                    <Marquee pauseOnHover speed={80} >
                      <img src="/images/marquee.png" className="max-h-40" />
                    </Marquee>
                  </NextLink>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-start gap-4">
                      <NextLink href="/mtwim" className="relative w-full aspect-square border-[#d8e0e3]/70 z-60 border">
                      mtwim
                        {/* <img src="/images/pfp.png" className="opacity-70 absolute bottom-0 scale-120 origin-bottom"/> */}
                      </NextLink>
                      <NextLink href="pp" className="relative w-full aspect-square border-[#d8e0e3]/70 z-60 border">
                      pacific purgatory
                        {/* <img src="/images/pfp.png" className="opacity-70 absolute bottom-0 scale-120 origin-bottom"/> */}
                      </NextLink>
                      <NextLink href="about" className="relative w-full aspect-square border-[#d8e0e3]/70 z-60 border">
                      about
                        {/* <img src="/images/pfp.png" className="opacity-70 absolute bottom-0 scale-120 origin-bottom"/> */}
                      </NextLink>
                      {/* <img src="/images/pfp.png"/>
                      <img src="/images/pfp.png"/> */}
                    </div>
                    <div className="flex flex-col items-center gap-4 justify-center pt-16">
                      <NextLink href="/games" className="relative w-full aspect-square border-[#d8e0e3]/70 z-70 border">
                        <img src="/images/morozovfishing.png" className="nonsel absolute bottom-0 z-80 scale-200 origin-[10%_50%] pointer-events-none"/>
                      </NextLink>
                      <NextLink href="/gallery" className="relative w-full aspect-square border-[#d8e0e3]/70 z-60 border">
                        <Marquee speed={20} className="z-70">
                          <img src="/images/gallery.png" className="nonsel pointer-events-none" />
                        </Marquee>
                      </NextLink>
                      <NextLink href="/blog" className="relative w-full aspect-square border-[#d8e0e3]/70 z-60 border flex items-center justify-center" onMouseOver={blogHoverOn} onMouseOut={blogHoverOff}>
                        <img src="/images/blogclose.png" className="absolute scale-150 translate-x-[-35%] pointer-events-none nonsel" ref={blogBookRef} />
                      </NextLink>
                    </div>
                  </div>
                </div>
              </div> 

            </div> 
          
          </div>

        </div>
       
      <div className="bg-[#535961]/60 w-full flex flex-col p-4">

      <hr className="my-4 border-gray-500/30 w-full" />

        {/* TO DO LIST */}
        <div className="text-white p-4 border-[#d8e0e3]/70 border flex flex-col">
          <h1 className="font-bold pb-5 text-2xl self-center">to do list</h1>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col p-4 border-[#d8e0e3]/70 border">
              <p className="text-xl font-bold self-center">TO-DO: </p>
              <p className="text-xs">● revise about me page (its so ass bruh..)</p>
              <p className="text-xs">● make the admin page actually legible LOL</p>
              <p className="text-xs">● set up wanted posters for pp</p>
              <p className="text-xs">● set up images for navmenu</p>
              <p className="text-xs">● set up supabase for pp gallery</p>
              <p className="text-xs">● set up carousel for pp</p>
              <p className="text-xs">● make the moon an svg to make it look good on phone..</p>
              <p className="text-xs">● set up different 'moons' for each route</p>
              <p className="text-xs">● make the ocs page</p>
              <p className="text-xs">● set up supabase for gallery</p>
              <p className="text-xs">● make the gallery page</p>
              <p className="text-xs">● make the mtwim page</p>
              <p className="text-xs">● finish the scrollTrigger course</p>
              <p className="text-xs">● add more ppl to stars bg (revise it even)</p>
              <p className="text-xs">● finish the gsap course</p>
              <p className="text-xs">● set subdomains for characters/icemage/pp/etc.</p>
              <p className="text-xs">● make assets (a lot of it...)</p>
              <p className="text-xs">● make assets for mtwim</p>
              <p className="text-xs">● make assets for characters</p>
              <p className="text-xs">● add more to the about me page</p>
              <p className="text-xs">● set up pp newspaper submissions</p>
              <p className="text-xs">● add mier widget. (potentially make it persist across all routes) ((use local storage for it))</p>
              <p className="text-xs">● optimize navmenu open/close timeline animations with ctx</p>
            </div>

            <div className="flex flex-col p-4 border-[#d8e0e3]/70 border">
              <p className="text-xl font-bold self-center">DONE: </p>
              <p className="text-xs">✔ </p>
              <p className="text-xs">✔ implement index and slug pages for blog </p>
              <p className="text-xs">✔ make blog page</p>
              <p className="text-xs">✔ make the pp page</p>
              <p className="text-xs">✔ add all old posts from the old miercury websites here</p>
              <p className="text-xs">✔ fix bg low opacity bug</p>
              <p className="text-xs">✔ add image uploading function for tiptap</p>
              <p className="text-xs">✔ set up atabook</p>
              <p className="text-xs">✔ perhaps have the blog be its own page instead</p>
              <p className="text-xs">✔ make the about me page</p>
              <p className="text-xs">✔ finish secret santa</p>
              <p className="text-xs">✔ add more to the space background </p>
              <p className="text-xs">✔ implement editing posts with tiptap</p>
              <p className="text-xs">✔ implement tiptap on post dashboard</p>
              <p className="text-xs">✔ make a dashboard for blog crud operations</p>
              <p className="text-xs">✔ connect this to supabase so you can add blog posts</p>
              <p className="text-xs">✔ add vercel web analytics functionality</p>
            </div>
          </div>

        </div>

        <hr className="my-4 border-gray-500/30 w-full" />

      </div>
                
      </div>  
      <footer className="z-50">
        <div className="bg-[#101113]/90 py-2 min-w-screen flex flex-col justify-center align-center items-center bottom-0 text-white text-xs">

          <p className="text-center">
            Copyright © {currentYear} Miercury. All Rights Reserved.
            <br />
            <a href="mailto:admin@miercury.com">admin@miercury.com</a>
          </p>

          <div className="right-1 absolute">
            <p ref={loginTextRef} onClick={handleLoginClick} className="pr-5 text-gray-100/90 text-xs hover:underline blue cursor-pointer nonsel">log in</p>
          </div>

        </div>
      </footer>
      <img src="/images/mierwalk.gif" className="fixed z-1 bottom-0 right-0 nonsel scale-80 origin-bottom-right" draggable="false" style={{ pointerEvents: "none" }} />
      <img ref={mierTakethRef} src="/images/miertaketh.png" className="absolute z-100 nonsel -right-80 bottom-4 invisible" draggable="false" style={{ pointerEvents: "none" }} />
      <Stars />
    </div>
  );
}
