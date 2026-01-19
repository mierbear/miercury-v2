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
import { Micro_5, Righteous, Coral_Pixels } from "next/font/google"
import NavLinkMarq from "@/components/indexNavLinkMarquee";
import NavLinkImg from "@/components/indexNavLinkImg";
import NavLinkBot from "@/components/indexNavLinkBot";
import LogType from "@/types/logType";
import ArtType from "@/types/artType";
import Tooltip from "@/components/tooltipComponent";
import Marquee from "react-fast-marquee";
import { Quote } from "lucide-react";

const micro = Micro_5({
  weight: "400",
  subsets: ["latin"],
})

const coral = Coral_Pixels({
  weight: "400",
  subsets: ["latin"],
})

const righteous = Righteous({
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
  const currentText = useRef(0);


  const handleLoginClick = () => {
    
    if (currentText.current < 6) {
      currentText.current++;
      loginTextRef.current!.textContent = loginTexts[currentText.current % loginTexts.length];

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
    fetchArt();
  }, []);

  const [properDate, setProperDate] = useState(false);

  const clickDate = () => {
    setProperDate(!properDate);
  }

  const contentRef = useRef<HTMLDivElement | null>(null)

  const [ready, setReady] = useState(false);
  useEffect(() => {
    
    setReady(true),
    
    setTimeout(() => {
      if (!contentRef.current) return;
      contentRef.current.style.opacity = "100%"
    }, 1600);
    
  }, []);
  
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
    "Be lucid. Live with intent.",
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
      if (!leftPupilRef.current ) return;

      movePupil(leftPupilRef.current, e.clientX, e.clientY);
      // movePupil(rightPupilRef.current, e.clientX, e.clientY);
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
      characters: "240px 50px 50px 50px 50px 50px 50px",
      mtwim:       "50px 240px 50px 50px 50px 50px 50px",
      games:       "50px 50px 240px 50px 50px 50px 50px",
      pp:          "50px 50px 50px 240px 50px 50px 50px",
      gallery:     "50px 50px 50px 50px 240px 50px 50px",
      blog:        "50px 50px 50px 50px 50px 240px 50px",
      about:       "50px 50px 50px 50px 50px 50px 240px",
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

  const pfpRef = useRef<HTMLImageElement | null>(null);
  const [artHover, setArtHover] = useState(false);

  const boing = () => {
    pfpRef.current?.classList.remove("jelly");
    void pfpRef.current?.offsetWidth;
    pfpRef.current?.classList.add("jelly");
  }

  const featArtRef = useRef<HTMLImageElement | null>(null);
  const featArtMiniRef = useRef<HTMLImageElement | null>(null);

  // const featuredArtwork = []

  // const artPreviewHandler = (src: string) => {
  //   if (!featArtRef.current || !featArtMiniRef.current) return;
  //   featArtRef.current.src = `/images/${src}`;
  //   featArtMiniRef.current.src = `/images/${src}`;
  // }

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
  
  const [artwork, setArtwork] = useState<ArtType | null>(null);
  
  const fetchArt = async () => {
    const { error, data } = await supabase
      .from("art")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);
    
    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }
    
    console.log(data);
    setArtwork(data[0]);
  }

  return (
    <div className="bg-[#17191a] min-w-screen min-h-screen align-center items-center flex flex-col relative">
      
      {/* LOADING SCREEN */}
      <div className={`bg-black z-55555 min-w-screen min-h-screen transition-opacity duration-1000 fixed pointer-events-none nonsel ${ready ? "opacity-0" : "opacity-100"}`} ref={loadingScreenRef}>
        <h1 className="bottom-20 right-20 text-white absolute">loading</h1>
      </div>

      {/* TITLE */}
      <div className="min-w-screen min-h-[40vh] flex justify-end align-center items-center top-0 flex-col">
        <Title />
      </div>

      {/* MAIN CONTENT */}
      <div className="content w-270 max-w-screen bg-transparent text-black z-10 grid grid-rows-[1.2em_1fr] relative">

        <TitleBot />  

        <div className={`${ready ? "bg-[#586474]/50" : "bg-[#17191a] pointer-events-none"} backdrop-blur-[2px] w-full flex flex-col items-center transition-colors duration-4000`}>

          <div
          className={`w-full grid lg:grid-cols-[2fr_1fr] lg:grid-rows-none opacity-0 transition-opacity duration-2000`}
          ref={contentRef}
          >

            {/* LEFT COL */}
            <div className="m-4 lg:mr-2 flex items-center flex-col lg:order-1 order-2">

              {/* CAROUSEL */}
              <div className="flex flex-col justify-center items-center relative w-full aspect-25/9 mx-auto text-white border-[#d8e0e3]/70 border">

                <div className="w-full h-full absolute bg-[#17191a] mix-blend-lighten z-100 pointer-events-none">

                </div>

                <div
                  className="overflow-hidden flex items-center justify-center h-full"
                  onMouseEnter={() => autoplay.current.stop()}
                  onMouseLeave={() => autoplay.current.play()}
                  ref={emblaRef}
                >
                  <div className={`flex ${ready ? "opacity-100" : "opacity-0"}`}>
                    
                    <div className="aspect-25/9 flex-[0_0_100%] overflow-hidden relative">
                      <NextLink
                      href="https://vertuously.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block w-full h-full"
                      onMouseEnter={() => {setAdVertHover(true)}}
                      onMouseLeave={() => {setAdVertHover(false)}}
                      >
                        <div className="absolute text-white z-100 w-full h-full items-center justify-center flex flex-col nonsel pointer-events-none">
                          <p className={`${adVertHover ? `${micro.className} text-7xl translate-y-1` : `${coral.className} text-5xl`} text-center px-8`} ref={vertAdRef}>Take a dive?</p>
                          <p className={`${adVertHover ? `${micro.className} text-2xl -translate-y-3` : `${coral.className} text-base`} text-center px-8`} ref={vertAdRef2}>project your thoughts and feelings as you delve deeper in the abyss</p>
                        </div>

                        <video autoPlay muted loop className="object-cover h-full w-full nonsel pointer-events-none">
                          <source src="/videos/vert.webm" type="video/webm" />
                        </video>
                      </NextLink>
                    </div>

                    <div className="aspect-25/9 flex-[0_0_100%]">
                      <NextLink href="/mierfishing/index.html" target="_blank" rel="noopener noreferrer">
                        <img src="/images/indexbanner.png" className="w-full h-full bg-[#17191a]/40 nonsel pointer-events-none object-cover" />
                      </NextLink>
                    </div>

                    <div className="relative aspect-25/9 flex-[0_0_100%] flex flex-col items-center justify-center bg-[#17191a] nonsel pointer-events-none overflow-x-hidden">
                      <img className=" absolute nonsel pointer-events-none pupil z-25" src="/images/pupil.png" ref={leftPupilRef} />
                      <img className=" absolute nonsel pointer-events-none bg-white z-20" src="/images/lid.png" />
                      <div className="absolute bottom-0 left-0 w-full h-15 z-30 flex items-center overflow-hidden">
                        <Marquee
                          className="w-full"
                          speed={20}
                          autoFill={true}
                        >
                          <p className="text-white text-sm tracking-wide">
                            i know what you're up to.
                          </p>
                        </Marquee>
                      </div>
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
                
              <hr className="my-4 border-gray-500/30 w-full block lg:hidden" />
              
              {/* ART */}
              <div className="flex flex-col items-center justify-center w-full md:px-12 relative pb-12 mt-none lg:mt-4 mb-4"
              onMouseEnter={() => setArtHover(true)}
              onMouseLeave={() => setArtHover(false)}
              >
                <p
                className={`text-2xl font-bold self-start pl-2 h-12 flex items-center justify-center nonsel transition-colors duration-400 ${artHover ? "text-yellow-300 white-glow" : "text-white"}`}>
                  <span className={`${artHover && "spin"} mr-3`}>{artHover ? "★" : "✦"}</span> latest artwork
                </p>
                
                {/* IMAGES */}
                <div className="relative flex items-center justify-center flex-col bg-[#17191a] mb-4">
                  <img ref={featArtRef} src={artwork?.url} style={{ pointerEvents: "none" }} className={`nonsel`} />
                  <img ref={featArtMiniRef} src={artwork?.url} style={{ pointerEvents: "none" }} className={`nonsel border-3 border-[#d8e0e3] absolute right-0 bottom-0 scale-25 origin-bottom-right skew-x-16 -skew-y-10 -translate-x-25 translate-y-25`}/>
                  <NextLink href="/gallery">
                    <img ref={mierDrawingRef} src={mierDrawing ? "/images/miersit.png" : "/images/mierhover.png"} className="nonsel absolute bottom-0 right-0 h-60 origin-bottom-right translate-x-10 translate-y-40" onMouseEnter={() => mierDrawingHoverHandler()} onMouseLeave={() => mierDrawingUnhoverHandler()} />
                  </NextLink>
                </div>

                {/* ART INFO */}
                <div className="flex flex-col p-2 pt-1 self-start w-[50%] border-white border-2 h-24 text-white">
                  <p className="text-xl font-bold">{artwork?.title}</p>
                  <p className="text-xs text-gray-400 pb-2">{artwork?.date}</p>
                  <p className="text-xs">{artwork?.description}</p>
                </div>
                
                {/* FRAME */}
                <img src="images/top.png" className="invisible hidden md:flex md:visible nonsel pointer-events-none absolute top-0 right-0 h-40"></img>
                <img src="images/bot.png" className="invisible hidden md:flex md:visible nonsel pointer-events-none absolute bottom-0 left-0 h-40"></img>
              </div>

              {/* MISC */}
              <div className="grid md:grid-cols-[1.618fr_1fr] md:grid-rows-none grid-cols-none text-white w-full gap-4">
                
                {/* 1.) LATEST BLOGS */}
                <div className="flex flex-col items-center justify-between border-[#d8e0e3]/70 border border-dashed pb-4 h-75 w-full scrollbar-visible overflow-y-auto">

                  {latestPost === null ? null : (
                    <div key={latestPost.id} className="p-4 rounded-md mb-2 w-full relative flex-1 flex-col flex">
                      <NextLink href={`/blog/post/${latestPost.slug}`}>
                        <p className="font-bold text-base xs:text-xl sm:text-2xl hover:underline blue">{latestPost.title}</p>
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

                  <div className="w-full">
                  <hr className="mb-4 border-gray-500/60 w-full" />
                    {posts.map((post) => {
                      return (
                        <div key={post.id} className="rounded-md w-full flex flex-row items-center justify-between pl-4 pr-4">

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

                </div>

                {/* 2ND CONTAINER */}
                <div className="grid grid-cols-[1fr_1.618fr] md:grid-cols-none md:grid-rows-[1fr_1.618fr] gap-4 md:h-75">

                  {/* 3RD CONTAINER */}
                  <div className="md:grid md:grid-cols-[1fr_1.618fr] md:gap-4 h-full">

                    {/* 4.) ? */}
                    <div className="md:flex flex-col justify-center items-center border-[#d8e0e3]/70 border hidden">
                      ?
                    </div>

                    {/* 3.) GUESTBOOK */}
                    <NextLink
                      href="https://mier.atabook.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                      h-full w-full
                      flex flex-col 
                      justify-center items-center
                      border-[#d8e0e3]/70 border
                      p-4 text-xs
                      "
                    >
                      <p className="text-center">sign my guestbook</p>
                    </NextLink>

                  </div>
                  
                  {/* 2.) CHANGELOGS */}
                  <div className="flex flex-col bg-[#17191a]/50 border-[#d8e0e3]/40 border h-44 text-xs relative">
                    <p className="sticky top-0 z-10 bg-[#17191a] p-2 w-full">CHANGELOGS</p>
                    <div className="scrollbar-visible h-full overflow-y-auto">
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

              </div>
            </div> 

            {/* RIGHT COL */}
            <div className="m-4 lg:ml-2 lg:order-2 order-1 flex flex-col mb-0 lg:mb-4">

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
                      ${righteous.className}
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
                  <NextLink href="https://x.com/mierursa" target="_blank" rel="noopener noreferrer">
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
              
              <hr className="my-4 border-gray-500/30 w-full" />

              {/* NAV */}
              <div className="text-white grid grid-rows-[240px_50px_50px_50px_50px_50px_50px] transition-[grid_template-rows] duration-200 relative" ref={linksDivRef}>
                
                <NavLinkMarq desc="learn about my characters" active={activeLink} link="characters" onHover={handleHover} />
                <NavLinkImg desc="learn about a story i want to tell" active={activeLink} link="mtwim" onHover={handleHover} />
                <NavLinkImg desc="play my own games here" active={activeLink} link="games" onHover={handleHover} />
                <NavLinkImg desc="learn about my own art community" active={activeLink} link="pp" onHover={handleHover} />
                <NavLinkImg desc="look at my art" active={activeLink} link="gallery" onHover={handleHover} />
                <NavLinkImg desc="read my ramblings" active={activeLink} link="blog" onHover={handleHover} />
                <NavLinkBot desc="learn more about me" active={activeLink} link="about" onHover={handleHover} />

              </div> 

              <hr className="hidden lg:block my-4 border-gray-500/30 w-full" />

              {/* ?? */}
              <div className="hidden lg:flex flex-1 flex-col items-center justify-center w-full h-full border-[#d8e0e3]/40 relative border-dotted border">
              </div>

            </div> 
          
          </div>

          {/* QUOTE OF THE DAY */}
          <hr className="border-gray-500/30 w-full mb-4" />
          
          <Marquee
            gradient={false}
            speed={30}
            autoFill={true}
            className="text-xs sm:text-sm md:text-md flex text-white nonsel"
          >
            <p className=""><span className="inline-flex backwards-spin items-center justify-center">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getQuote(quotes)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          </Marquee>

          <hr className="border-gray-500/30 w-full mt-4" />

        </div>
       
        {/* TO DO LIST */}
        <div className="bg-[#586474]/50 backdrop-blur-[2px] w-full flex flex-col p-4">

          <div className="text-white p-4 border-[#d8e0e3]/70 border flex flex-col ">
            <h1 className="font-bold text-2xl self-center">to do list</h1>
            <p className="pb-5 text-xs self-center">(will be gone eventually)</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col p-4 border-[#d8e0e3]/70 border overflow-y-auto h-100 scrollbar-visible">
                <p className="text-xl font-bold self-center">TO-DO: </p>
                {/* <p className="text-xs">● </p> */}
                <p className="text-xs">● make daily popup modal</p>
                <p className="text-xs">● DRAW ASSETS (A LOT OF IT! LOCK IN! WE'RE LIKE 80% THERE)</p>
                <p className="text-xs">● learn how to draw again LOL</p>
                <p className="text-xs">● set up wanted posters for pp</p>
                <p className="text-xs">● set up images for navmenu</p>
                <p className="text-xs">● set up supabase for pp gallery</p>
                <p className="text-xs">● set up favicons for each route</p>
                <p className="text-xs">● set up different 'moons' for each route</p>
                <p className="text-xs">● make the ocs page</p>
                <p className="text-xs">● make the gallery page</p>
                <p className="text-xs">● make the mtwim page</p>
                <p className="text-xs">● finish the scrollTrigger course</p>
                <p className="text-xs">● add more ppl to stars bg (revise it even)</p>
                <p className="text-xs">● make assets for mtwim</p>
                <p className="text-xs">● make assets for characters</p>
                <p className="text-xs">● add shooting stars</p>
                <p className="text-xs">● add lots of easter eggs</p>
                <p className="text-xs">● make scary easter egg?</p>
                <p className="text-xs">● add mier widget. (potentially make it persist across all routes) ((use local storage for it))</p>
                <p className="text-xs">● optimize navmenu open/close timeline animations with ctx</p>
                <p className="text-xs">● make another game</p>
              </div>

              <div className="flex flex-col p-4 border-[#d8e0e3]/70 border overflow-y-auto h-100 scrollbar-visible">
                <p className="text-xl font-bold self-center">DONE: </p>
                {/* <p className="text-xs">✔ </p> */}
                <p className="text-xs">✔ fix the fcked up font management</p>
                <p className="text-xs">✔ add qotd in index (what u see above rn)</p>
                <p className="text-xs">✔ revise about me page (its so ass bruh..)</p>
                <p className="text-xs">✔ show latest drawing in index</p>
                <p className="text-xs">✔ set up supabase for gallery</p>
                <p className="text-xs">✔ optimize stars background when unfocused</p>
                <p className="text-xs">✔ learn how to make svgs</p>
                <p className="text-xs">✔ make navmenu look good</p>
                <p className="text-xs">✔ revise navmenu</p>
                <p className="text-xs">✔ make index page responsive</p>
                <p className="text-xs">✔ turn most gsap animations into plain css</p>
                <p className="text-xs">✔ make adVERT impressive</p>
                <p className="text-xs">✔ set up navmenu revision skeleton</p>
                <p className="text-xs">✔ add loading screen for index</p>
                <p className="text-xs">✔ improve art section in index</p>
                <p className="text-xs">✔ add changelog to index</p>
                <p className="text-xs">✔ make the admin page actually legible LOL</p>
                <p className="text-xs">✔ add more to the about me page</p>
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

        </div>
                
      </div>  
      
      {/* FOOTER */}
      <footer className="z-50">
        <div className="bg-[#101113]/90 py-2 min-w-screen flex flex-col justify-center align-center items-center bottom-0 text-white text-xs">

          <p className="text-center">
            Copyright © {currentYear} Miercury. All Rights Reserved.
            <br />
            <a
            href="mailto:admin@miercury.com"
            className="hover:underline blue"
            >admin@miercury.com</a>
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
