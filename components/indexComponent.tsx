"use client";
import NextImage from "next/image";
import Stars from "@/components/indexStars";
import Title from "@/components/indexTitle";
import TitleBot from "@/components/indexTitleBot";
import PostType from "@/types/postType";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import NextLink from "next/link";
import supabase from "@/lib/supabaseClient";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Micro_5, Boldonse, Coral_Pixels } from "next/font/google"
import NavLinkMarq from "@/components/indexNavLinkMarquee";
import NavLinkImg from "@/components/indexNavLinkImg";
import NavLinkBot from "@/components/indexNavLinkBot";
import LogType from "@/types/logType";
import Tooltip from "@/components/tooltipComponent";
import Marquee from "react-fast-marquee";

const micro = Micro_5({
  weight: "400",
  subsets: ["latin"],
})

const coral = Coral_Pixels({
  weight: "400",
  subsets: ["latin"],
})

const boldonse = Boldonse({
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

    const snippet = data[0].content.replace(/<[^>]+>/g, "").slice(0, 200);
    setLatestPostSnippet(snippet);
  }

  useEffect(() => {
    fetchPosts();
    fetchLogs();
  }, []);

  const [properDate, setProperDate] = useState(false);

  const clickDate = () => {
    setProperDate(!properDate);
  }

  const [ready, setReady] = useState(false);
  useEffect(() =>
    setReady(true),
  []);
  
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
    "Those who unravel the cube are nailed to the cross.",
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

      if (json.data.activities.find((activity: any) => activity.type === 4)?.emoji) {
        setBio(`${json.data.activities.find((activity: any) => activity.type === 4).emoji.name} ${json.data.activities.find((activity: any) => activity.type === 4).state}`);
      } else {
        setBio(`${json.data.activities.find((activity: any) => activity.type === 4).state}`);
      }

      if (json.data.activities.find((activity: any) => activity.type === 0)) {
        setCurrentGame(json.data.activities.find((activity: any) => activity.type === 0).name);
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


  useEffect(() => {
    if (typeof window === 'undefined') return;

    const preload = [
      '/images/mierhover.png',
    ];

    preload.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

  }, [])

  const randomizer = (arr: string[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const leftPupilRef = useRef<HTMLImageElement | null>(null);
  const rightPupilRef = useRef<HTMLImageElement | null>(null);

  const movePupil = (
    pupil: HTMLImageElement,
    mouseX: number,
    mouseY: number,
    maxDistance = 30,
    radius = 600
  ) => {
    const rect = pupil.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = mouseX - centerX;
    const dy = mouseY - centerY;

    const distance = Math.hypot(dx, dy);
    if (distance === 0) return;

    const normalized = Math.min(distance / radius, 1);
    const scaled = normalized * maxDistance;

    const nx = dx / distance;
    const ny = dy / distance;

    pupil.style.transform = `translate(${nx * scaled}px, ${ny * scaled}px)`;
  }


  useEffect(() => {
    if (!ready) return;

    const move = (e: MouseEvent) => {
      if (!leftPupilRef.current || !rightPupilRef.current) return;

      movePupil(leftPupilRef.current, e.clientX, e.clientY);
      movePupil(rightPupilRef.current, e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [ready]);

  const linksDivRef = useRef<HTMLDivElement | null>(null);

  type LinkKey =
  | "characters"
  | "mtwim"
  | "games"
  | "pp"
  | "gallery"
  | "blog"
  | "about";

  const [activeLink, setActiveLink] = useState<LinkKey>("characters");

  const handleHover = (link: LinkKey) => {
    if (!linksDivRef.current) return;
    setActiveLink(link);

    const rows = {
      characters: "200px 40px 40px 40px 40px 40px 40px",
      mtwim:       "40px 200px 40px 40px 40px 40px 40px",
      games:       "40px 40px 200px 40px 40px 40px 40px",
      pp:          "40px 40px 40px 200px 40px 40px 40px",
      gallery:     "40px 40px 40px 40px 200px 40px 40px",
      blog:        "40px 40px 40px 40px 40px 200px 40px",
      about:       "40px 40px 40px 40px 40px 40px 200px",
    };

    linksDivRef.current.style.gridTemplateRows = rows[link];
  };

  const [logs, setLogs] = useState<LogType[] | null>(null);
  
  const fetchLogs = async () => {
    const { error, data } = await supabase
      .from("logs")
      .select("*")
      .order("created_at", { ascending: false });


    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }
    
    console.log(data);
    setLogs(data);
  }

  const featArtRef = useRef<HTMLImageElement | null>(null);
  const featArtMiniRef = useRef<HTMLImageElement | null>(null);

  // const featuredArtwork = []

  const artPreviewHandler = (src: string) => {
    if (!featArtRef.current || !featArtMiniRef.current) return;
    featArtRef.current.src = `/images/${src}`;
    featArtMiniRef.current.src = `/images/${src}`;
  }

  const pfpRef = useRef<HTMLImageElement | null>(null);
  const [artHover, setArtHover] = useState(false);

  const boing = () => {
    pfpRef.current?.classList.remove("jelly");
    void pfpRef.current?.offsetWidth;
    pfpRef.current?.classList.add("jelly");
  }

  const mierDrawingRef = useRef<HTMLImageElement | null>(null);
  const [mierDrawing, setMierDrawing] = useState(true);
  const [toolTipStatus, setToolTipStatus] = useState(false);

  const mierDrawingHoverHandler = () => {
    setMierDrawing(false);
    setToolTipStatus(true);
  }
  
  const mierDrawingUnhoverHandler = () => {
    setMierDrawing(true);
    setToolTipStatus(false);
  }

  const loadingScreenRef = useRef<HTMLDivElement | null>(null);

  const vertAdRef = useRef<HTMLParagraphElement | null>(null);
  const vertAdRef2 = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const refs = [vertAdRef, vertAdRef2];
    const splits: SplitText[] = [];

    refs.forEach(ref => {
      if (!ref.current) return;

      const split = new SplitText(ref.current, { type: "chars" });
      splits.push(split);

      gsap.to(split.chars, {
        yPercent: -12,
        duration: 1.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.08,
          repeat: -1,
          yoyo: true,
        }
      });
    });

    return () => {
      splits.forEach(split => split.revert());
      gsap.killTweensOf("*");
    };
  }, []);

  const [adVertHover, setAdVertHover] = useState(false);
  

  return (
    <div className="bg-[#17191a] min-w-screen min-h-screen align-center items-center flex flex-col relative">
      
      <div className={`bg-black z-5000 min-w-screen min-h-screen transition-opacity duration-1000 fixed pointer-events-none nonsel ${ready ? "opacity-0" : "opacity-100"}`} ref={loadingScreenRef}>
        <h1 className="bottom-20 right-20 text-white absolute">loading</h1>
      </div>

      <div className="min-w-screen min-h-[40vh] flex justify-end align-center items-center top-0 flex-col">
        <Title />
      </div>
      <div className="content w-270 max-w-screen min-h-[60vh] bg-[#00000000] text-black z-10 grid grid-rows-[1.2em_1fr] relative">

        <TitleBot />  

        <div className="bg-[#586474]/50 backdrop-blur-[2px] w-full flex flex-col items-center">

          <div className="w-full grid grid-cols-[2fr_1fr]">

            {/* LEFT COL */}
            <div className="m-4 mr-2 flex items-center flex-col">

              {/* CAROUSEL */}
              <div className="flex flex-col justify-center items-center relative max-h-60 text-white border-[#d8e0e3]/70 border">

                <div className="w-full h-full absolute bg-[#17191a] mix-blend-lighten z-100 pointer-events-none">

                </div>

                <div
                  className="overflow-hidden flex items-center justify-center h-full"
                  onMouseEnter={() => autoplay.current.stop()}
                  onMouseLeave={() => autoplay.current.play()}
                  ref={emblaRef}
                >
                  <div className={`flex ${ready ? "opacity-100" : "opacity-0"}`}>

                    <div className="flex-[0_0_100%]">
                      <div className="flex flex-row w-full justify-between items-center text-center px-10 h-full nonsel pointer-events-none bg-[#17191a]/40 overflow-x-hidden">
                        <img src="/images/construction.gif" />
                        <h1 className="text-red-600 font-bold">THIS SITE IS STILL VERY UNFINISHED!! <br /> THX FOR VISITING XOXO</h1>
                        <img src="/images/construction.gif" />
                      </div>
                    </div>
                    
                    <div className="flex-[0_0_100%] overflow-hidden relative h-full">
                      <NextLink
                      href="https://vertuously.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block w-full h-full"
                      onMouseEnter={() => {setAdVertHover(true)}}
                      onMouseLeave={() => {setAdVertHover(false)}}
                      >
                        <div className="absolute text-white z-100 w-full h-full items-center justify-center flex flex-col nonsel pointer-events-none">
                          <p className={`${adVertHover ? `${micro.className} text-7xl translate-y-1` : `${coral.className} text-5xl`}`} ref={vertAdRef}>Take a dive?</p>
                          <p className={`${adVertHover ? `${micro.className} text-2xl -translate-y-3` : `${coral.className} text-md`}`} ref={vertAdRef2}>project your thoughts and feelings as you delve deeper in the abyss</p>
                        </div>

                        <video autoPlay muted loop className="object-cover w-full nonsel pointer-events-none">
                          <source src="/videos/vert.webm" type="video/webm" />
                        </video>
                      </NextLink>
                    </div>

                    <div className="flex-[0_0_100%]">
                      <NextLink href="/mierfishing/index.html" target="_blank" rel="noopener noreferrer">
                        <img src="/images/indexbanner.png" className="w-full bg-[#17191a]/40 nonsel pointer-events-none" />
                      </NextLink>
                    </div>

                    <div className="flex-[0_0_100%] flex flex-col items-center justify-center bg-[#17191a] nonsel pointer-events-none">
                      <img className="-translate-x-full absolute nonsel pointer-events-none pupil z-25" src="/images/pupil.png" ref={leftPupilRef} />
                      <img className="-translate-x-full absolute nonsel pointer-events-none bg-white z-20" src="/images/lid.png" />
                      <img className="translate-x-full absolute nonsel pointer-events-none pupil z-25" src="/images/pupil.png" ref={rightPupilRef} />
                      <img className="translate-x-full absolute nonsel pointer-events-none bg-white z-20" src="/images/lid.png" />
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
                
              <hr className="my-4 border-gray-500/30 w-full" />
              
              {/* ART */}
              <div
              className="flex flex-col items-center justify-center w-full px-12 relative pb-12"
              onMouseEnter={() => setArtHover(true)}
              onMouseLeave={() => setArtHover(false)}
              >
                
                <p
                className={`text-2xl font-bold self-start pl-2 h-12 flex items-center justify-center nonsel transition-colors duration-400 ${artHover ? "text-yellow-300 white-glow" : "text-white"}`}>
                  <span className={`${artHover && "spin"} mr-3`}>{artHover ? "★" : "✦"}</span> latest artwork
                </p>

                <div className="relative flex items-center justify-center flex-col bg-[#17191a] mb-4">
                  <img ref={featArtRef} src="images/featart1.png" style={{ pointerEvents: "none" }} className={`nonsel`} />
                  <img ref={featArtMiniRef} src="images/featart1.png" style={{ pointerEvents: "none" }} className={`nonsel border-3 border-[#d8e0e3] absolute right-0 bottom-0 scale-25 origin-bottom-right skew-x-16 -skew-y-10 -translate-x-25 translate-y-25`}/>
                  <NextLink href="/gallery">
                    <img ref={mierDrawingRef} src={mierDrawing ? "/images/miersit.png" : "/images/mierhover.png"} className="nonsel absolute bottom-0 right-0 h-60 origin-bottom-right translate-x-10 translate-y-40" onMouseEnter={() => mierDrawingHoverHandler()} onMouseLeave={() => mierDrawingUnhoverHandler()} />
                  </NextLink>
                </div>
                <div className="flex flex-col p-2 self-start w-[50%] border-white border-2 h-24 text-white">
                  <p className="text-md">title</p>
                  <p className="text-xs">meow meow meow</p>
                </div>

                <img src="images/top.png" className="nonsel pointer-events-none absolute top-0 right-0 h-40"></img>
                <img src="images/bot.png" className="nonsel pointer-events-none absolute bottom-0 left-0 h-40"></img>
              </div>

              <hr className="my-4 border-gray-500/30 w-full" />

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
                    <div className="prose prose-invert pt-5 mb-4 text-xs">
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
                  <div className="flex flex-col bg-[#17191a]/50 border-[#d8e0e3]/40 border overflow-y-auto text-xs max-h-50 relative">
                    <p className="sticky top-0 z-10 bg-[#17191a] p-2 w-full">CHANGELOGS</p>
                    {logs?.map((log) => {
                      return (
                        <div key={log.id} className="p-2">
                          <p className="text-gray-400">{log.date}</p>
                          <p className="">{log.log}</p>
                        </div>
                      )
                    })}
                  </div>

                </div>

              </div>

              <hr className="mb-4 mt-4 border-gray-500/30 w-full" />

            </div> 

            {/* RIGHT COL */}
            <div className="m-4 ml-2">

              {/* INTRO */}
              <div className="text-white border-[#d8e0e3]/40 relative border-dotted border flex flex-col items-center pb-14">

                <div className="p-4 flex items-center flex-col">
                  <img
                    src="/images/pfp.png"
                    className="mb-4 max-w-[50%]"
                    onMouseEnter={() => boing()}
                    ref={pfpRef}
                  />

                  <p className="text-xs text-justify">
                    Hello, welcome to Miercury! This is a place for me to share my thoughts, projects and artworks. You can read more about me <a href="/about" className="underline blue text-">here.</a>
                    <br />
                    <br />
                    I hope you enjoy your stay.
                  </p>
                </div>

                <div className="border-t border-b border-[#d8e0e3]/40 border-dotted w-full mb-2 p-2 text-center flex flex-col items-center justify-center bg-[#17191a]/80 nonsel">
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
              <div className="text-white grid grid-rows-[200px_40px_40px_40px_40px_40px_40px] transition-[grid_template-rows] duration-200 relative" ref={linksDivRef}>
                
                <NavLinkMarq desc="learn about my characters" active={activeLink} link="characters" onHover={handleHover} />
                <NavLinkImg desc="learn about a story i want to tell" active={activeLink} link="mtwim" onHover={handleHover} />
                <NavLinkImg desc="play my own games here" active={activeLink} link="games" onHover={handleHover} />
                <NavLinkImg desc="learn about my own art community" active={activeLink} link="pp" onHover={handleHover} />
                <NavLinkImg desc="look at my art" active={activeLink} link="gallery" onHover={handleHover} />
                <NavLinkImg desc="read my ramblings" active={activeLink} link="blog" onHover={handleHover} />
                <NavLinkBot desc="learn more about me" active={activeLink} link="about" onHover={handleHover} />

              </div> 

            </div> 
          
          </div>

          <hr className="border-gray-500/30 w-full mx-4" />
          
        </div>
       
      <div className="bg-[#586474]/50 backdrop-blur-[2px] w-full flex flex-col p-4">


        {/* TO DO LIST */}
        <div className="text-white p-4 border-[#d8e0e3]/70 border flex flex-col">
          <h1 className="font-bold pb-5 text-2xl self-center">to do list</h1>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col p-4 border-[#d8e0e3]/70 border">
              <p className="text-xl font-bold self-center">TO-DO: </p>
              <p className="text-xs">● revise about me page (its so ass bruh..)</p>
              <p className="text-xs">● set up wanted posters for pp</p>
              <p className="text-xs">● set up images for navmenu</p>
              <p className="text-xs">● set up supabase for pp gallery</p>
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
              <p className="text-xs">● add shooting stars</p>
              <p className="text-xs">● add lots of easter eggs</p>
              <p className="text-xs">● add mier widget. (potentially make it persist across all routes) ((use local storage for it))</p>
              <p className="text-xs">● optimize navmenu open/close timeline animations with ctx</p>
            </div>

            <div className="flex flex-col p-4 border-[#d8e0e3]/70 border">
              <p className="text-xl font-bold self-center">DONE: </p>
              <p className="text-xs">✔ </p>
              <p className="text-xs">✔ add loading screen for index</p>
              <p className="text-xs">✔ improve art section in index</p>
              <p className="text-xs">✔ add changelog to index</p>
              <p className="text-xs">✔ make the admin page actually legible LOL</p>
              <p className="text-xs">✔ improve navbar for index</p>
              <p className="text-xs">✔ implement index and slug pages for blog </p>
              <p className="text-xs">✔ make blog page</p>
              <p className="text-xs">✔ make the pp page</p>
              <p className="text-xs">✔ add all old posts from the old miercury websites here</p>
              <p className="text-xs">✔ fix bg low opacity bug</p>
              <p className="text-xs">✔ set up carousel for pp</p>
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
      <Tooltip info="check out gallery?" status={toolTipStatus} />
    </div>
  );
}
