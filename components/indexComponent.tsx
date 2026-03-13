"use client";
import Stars from "@/components/indexStars";
import Title from "@/components/indexTitle";
import TitleBot from "@/components/indexTitleBot";
import PostType from "@/types/postType";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import NextLink from "next/link";
import supabase from "@/lib/supabaseClient";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Micro_5, Righteous, Coral_Pixels, Sono, Bodoni_Moda, Gowun_Batang, Noto_Serif_JP, Kosugi_Maru } from "next/font/google"
import NavLinkMarq from "@/components/indexNavLinkMarquee";
import NavLinkImg from "@/components/indexNavLinkImg";
import NavLinkBot from "@/components/indexNavLinkBot";
import LogType from "@/types/logType";
import ArtType from "@/types/artType";
import Tooltip from "@/components/tooltipComponent";
import Marquee from "react-fast-marquee";
import { useRouter } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import type { SlideImage } from "yet-another-react-lightbox";
import quotes from "@/components/quotes";
import Footer from "@/components/footerComponent";

gsap.registerPlugin(TextPlugin);

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

const bodoni = Bodoni_Moda({
  weight: "400",
  subsets: ["latin"],
})

const noto = Noto_Serif_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
})

const kosugi = Kosugi_Maru({
  weight: "400",
  subsets: ["latin"],
})

const gowun = Gowun_Batang({
  weight: "400",
  subsets: ["latin"],
})

const sono = Sono({
  weight: ["400", "600"],
  subsets: ["latin"],
})

export default function Home() {
  const discordUsernameRef = useRef<HTMLHeadingElement | null>(null);
  
  const [posts, setPosts] = useState<PostType[]>([]);
  const [latestPost, setLatestPost] = useState<PostType | null>(null);
  const [latestPostSnippet, setLatestPostSnippet] = useState<string | null>(null);
  
  const isPhone = typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;
  
  const router = useRouter();

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

    const snippet = data[0].content.replace(/<[^>]+>/g, " ").slice(0, 200);
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

  const topContentRef = useRef<HTMLDivElement | null>(null)
  const bottomContentRef = useRef<HTMLDivElement | null>(null)

  const [ready, setReady] = useState(false);
  useEffect(() => {
    
    setReady(true),
    
    setTimeout(() => {
      if (!topContentRef.current || !bottomContentRef.current) return;
      topContentRef.current.style.opacity = "100%"
      bottomContentRef.current.style.opacity = "100%"
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
      "/images/mierhover.png",
      "/images/mierhover-leftwing.png",
      "/images/mierhover-rightwing.png",
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
    maxDistance = 20,
    radius = 1000
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
      characters:  "240px 50px 50px 50px 50px 50px 50px",
      gallery:     "50px 240px 50px 50px 50px 50px 50px",
      mtwim:       "50px 50px 240px 50px 50px 50px 50px",
      games:       "50px 50px 50px 240px 50px 50px 50px",
      pp:          "50px 50px 50px 50px 240px 50px 50px",
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
    
    // console.log(data);
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
      .eq("featured", true)
    
    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }
    
    // console.log(data);
    setArtwork(data[0]);
  }

  const quoteBackdropRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!quoteBackdropRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
      defaults: { duration: 1 },
    });

    tl
    .set(quoteBackdropRef.current, { text: "LIVE BY THESE WORDS" })
    .to(quoteBackdropRef.current, { text: "NEVER DESPAIR", delay: 4, duration: 2 })
    .to(quoteBackdropRef.current, { text: "NEVER FEAR", })
    .to(quoteBackdropRef.current, { text: "NEVER WORRY" })
    .to(quoteBackdropRef.current, { text: "NEVER GIVE UP" })
    .to(quoteBackdropRef.current, { text: "NEVER BE SCARED" })
    .to(quoteBackdropRef.current, { text: "NEVER BE AFRAID" })
    .to(quoteBackdropRef.current, { text: "NEVER LOSE HOPE" })
    .to(quoteBackdropRef.current, { text: "NEVER LOSE HEART" })
    .to(quoteBackdropRef.current, { text: "NEVER LOSE FAITH" })
    .to(quoteBackdropRef.current, { text: "LIVE BY THESE WORDS", duration: 4 })

    return () => {
      tl.kill();
    };
  }, []);

  const mierDrawingRef = useRef<HTMLImageElement | null>(null);
  const [mierDrawing, setMierDrawing] = useState(true);
  const [toolTipStatus, setToolTipStatus] = useState(false);
  const mierTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mierDrawingHoverHandler = () => {
    setMierDrawing(false);
    setToolTipStatus(true);
  }
  
  const mierDrawingUnhoverHandler = () => {
    setMierDrawing(true);
    setToolTipStatus(false);
  }

  const mierDrawingClickHandler = () => {
    if (mierDrawing) {
      setMierDrawing(false);

      if (mierTimerRef.current) {
        clearTimeout(mierTimerRef.current);
      }

      mierTimerRef.current = setTimeout(() => {
        setMierDrawing(true);
        mierTimerRef.current = null;
      }, 2000);

    } else {
      router.push("/gallery");
    }
  };

  const [featuredLightBoxOpen, setFeaturedLightBoxOpen] = useState(false);
  const featuredArtworkRefs: SlideImage[] = artwork?.url
    ? [
        {
          src: artwork.url,
          description: (
            <div className="hover:opacity-0 transition-opacity duration-300 flex flex-col px-8 py-4 border-gray-400 border bg-black/80 max-w-[85ch] backdrop-blur-[3px] rounded-sm items-center justify-center">
              <p className={`text-4xl font-bold ${bodoni.className}`}>{artwork.title}</p>
              <p className={`${noto.className} text-gray-300 font-bold`}>({artwork.date})</p>
              <div className="flex gap-2">
                {artwork.tags.map((tag, index) => 
                  <p key={index} className={`text-xs ${noto.className} text-gray-400`}>#{tag}</p>
                )}
              </div>
              <p className={`${noto.className} mt-3 text-center`}>{artwork.description}</p>
            </div>
          ),
        },
      ]
    : [];

  const [orientation, setOrientation] = useState<"portrait" | "landscape" | null>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setOrientation(img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait');
  };

  return (
    <div className="bg-[#17191a] min-w-screen min-h-screen align-center items-center flex flex-col relative">

      {/* LOADING SCREEN */}
      <div className={`bg-black z-55555 min-w-screen min-h-screen transition-opacity duration-1000 fixed pointer-events-none nonsel ${ready ? "opacity-0" : "opacity-100"}`} ref={loadingScreenRef}>
        <h1 className="bottom-20 right-20 text-white absolute">loading</h1>
      </div>

      {/* TITLE */}
      <div className="w-5xl max-w-screen h-auto flex justify-end align-center items-center top-0 flex-col relative">
        <Title />

        <p className="absolute text-white/4 nonsel left-0 z-50">meow</p>
      </div>

      {/* MAIN CONTENT */}
      <div className="content w-5xl max-w-screen bg-transparent text-black z-10 grid grid-rows-[1.2em_1fr] relative">

        <TitleBot />  

        <div className={`${ready ? "bg-[#586474]/50" : "bg-[#17191a] pointer-events-none"} backdrop-blur-[2px] w-full flex flex-col items-center transition-colors duration-4000`}>

          {/* TOP COLUMNS */}
          <div
            className={`w-full grid md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:grid-rows-none opacity-0 transition-opacity duration-2000`}
            ref={topContentRef}
          >

            {/* LEFT COL */}
            <div className="flex items-center flex-col md:order-1 order-2 md:pt-4 md:pl-4">
                
              {/* FEATURED ART TEXT */}
              <p
                className={`
                text-2xl sm:text-4xl font-semibold self-start my-2 md:ml-4 w-full md:w-auto flex gap-3
                ${bodoni.className} items-center text-nowrap text-white
                justify-center nonsel transition-colors duration-400 order-1 md:order-3
                ${artHover ? "text-yellow-300 white-glow" : "text-white"}
                `}
              >
                <span className={`${sono.className} ${artHover && "spin"}`}>{artHover ? "★" : "✦"}</span> FEATURED ARTWORK
              </p>

              {/* FEATURED ART */}
              <div
                className={`
                flex flex-col flex-100
                transition-flex duration-1000 nonsel 
                justify-center items-center relative 
                cursor-pointer w-full lg:px-4 overflow-hidden
                max-h-160 min-h-160 order-2 md:order-4
                `}
                onMouseEnter={() => setArtHover(true)}
                onMouseLeave={() => setArtHover(false)}
              >
                
                {/* ART */}
                <img src={artwork?.url}
                  onLoad={handleImageLoad}
                  className={`
                    cursor-pointer
                    object-cover
    
                    min-h-160
                    max-h-[60vh]
                    w-full
                    max-w-screen
                    min-[768px]:max-h-160
                    min-[768px]:min-w-full
                    `}
                    onClick={() => setFeaturedLightBoxOpen(true)}
                />

                {/* ART DESCRIPTION */}
                <div className={`
                  absolute bottom-12 left-6 lg:left-10 hover:opacity-0 transition-all duration-500
                  flex flex-col text-nowrap md:origin-bottom-left
                  nonsel cursor-pointer
                  `}
                  >
                  <p className={`md:text-4xl sm:text-3xl text-2xl font-bold meow text-white ${bodoni.className}`}>"{artwork?.title}"</p>
                  <p className={`text-xs md:text-sm md:self-start meow ${noto.className} text-white`}>({artwork?.date})</p>
                </div>
                
                {/* MARQUEES */}
                <div 
                  className={`
                  flex items-center overflow-hidden
                  absolute top-0 w-full lg:px-4
                  `}
                >
                  <Marquee
                    speed={10}
                    autoFill={true}
                    direction="right"
                    className={`
                      text-xs flex py-2
                      text-white bg-black/20 nonsel
                      ${kosugi.className}
                    `}
                  >
                    <span className="spin flex">✦</span>&nbsp;&nbsp;FEATURED ARTWORK&nbsp;&nbsp;
                  </Marquee>
                </div>

                {/* MARQUEES */}
                <div 
                  className={`
                  flex items-center overflow-hidden
                  absolute bottom-0 w-full lg:px-4
                  `}
                >
                  <Marquee
                    speed={10}
                    autoFill={true}
                    className={`
                      text-xs flex py-2
                      text-white bg-black/20 nonsel
                      ${kosugi.className}
                    `}
                  >
                    <span className="backwards-spin flex">✦</span>&nbsp;&nbsp;FEATURED ARTWORK&nbsp;&nbsp;
                  </Marquee>
                </div>

              </div>
              
              {/* MIER DRAWING */}
              <div className="relative w-full h-0 z-100 overflow-visible order-3 md:order-4">
                <img 
                  ref={featArtMiniRef} 
                  src={artwork?.url} 
                  className={`
                  z-10 nonsel pointer-events-none border border-[#d8e0e3]
                  absolute right-0 bottom-0 w-32 origin-bottom-right
                  skew-x-16 -skew-y-10 -translate-x-25 -translate-y-2
                  `}
                />
                <img 
                  ref={mierDrawingRef} 
                  src={mierDrawing ? "/images/miersit.png" : "/images/mierhover.png"} 
                  onClick={() => mierDrawingClickHandler()}
                  onMouseEnter={!isPhone ? () => mierDrawingHoverHandler() : undefined} 
                  onMouseLeave={() => mierDrawingUnhoverHandler()}
                  className="
                  nonsel absolute bottom-0 right-0 h-60
                  origin-bottom-right cursor-pointer
                  translate-x-8 translate-y-11 z-12
                  " 
                />
                <img 
                  src={mierDrawing ? "/images/miersit-leftwing.png" : "/images/mierhover-leftwing.png"} 
                  className={`
                    nonsel pointer-events-none absolute 
                    bottom-0 right-0 h-60 wings origin-bottom-right
                    translate-x-8 translate-y-10 z-13
                  `} 
                />
                <img 
                  src={mierDrawing ? "/images/miersit-rightwing.png" : "/images/mierhover-rightwing.png"} 
                  className={`
                    nonsel pointer-events-none absolute 
                    bottom-0 right-0 h-60 wings origin-bottom-right
                    translate-x-8 translate-y-10 z-11
                  `} 
                />
              </div>

              <hr className="mt-4 mb-4 md:mb-0 border-gray-500/30 w-[90%] block order-4 md:order-5" />

              {/* REST */}
              <div className="grid grid-cols-1 md:grid-cols-[62fr_38fr] mt-0 md:mt-4 mb-4 items-center text-white w-full gap-4 order-6">

                {/* BLOG */}
                <div className="flex flex-col">
                  <p className={`pl-5 md:pl-1 pb-1 ${sono.className} text-xs`}>✦ recent blog posts:</p>
                  <div className="flex mx-4 md:mx-0 md:h-60 flex-col items-center justify-between border-[#d8e0e3]/80 border border-dashed pb-4 thin-scrollbar overflow-y-auto">

                    {latestPost === null ? null : (
                      <div key={latestPost.id} className="p-4 rounded-md mb-2 w-full relative flex-1 flex-col flex">
                        <NextLink href={`/blog/post/${latestPost.slug}`}>
                          <p className={`${sono.className} font-bold text-base xs:text-xl sm:text-2xl hover:underline blue`}>{latestPost.title}</p>
                        </NextLink>
                        <div className={`${sono.className} text-xs text-gray-400 nonsel flex`} onClick={clickDate}>
                          <p className="underline">{properDate ? (latestPost.spec_date) : latestPost.date}</p>
                        </div>
                        <div className="prose prose-invert text-justify pt-5 mb-4 text-xs">
                          <p>{latestPostSnippet}...</p>
                        </div>
                        
                        <p className="absolute bottom-0 text-xs hover:underline right-4 blue"><a href={`/blog/post/${latestPost.slug}`}>continue reading?</a></p>
                      </div>
                    )}

                    <div className={`${sono.className} w-full`}>
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
                </div>

                {/* MISC */}
                <div className="flex flex-col">
                  <p className={`pl-5 md:pl-1 pb-1 ${sono.className} text-xs`}>✦ misc.</p>
                  <div className="flex flex-col sm:flex-row md:flex-col justify-between md:h-60 gap-4">
                    
                    <NextLink 
                      className="
                      bg-[#17191a] hover:bg-yellow-300 text-white hover:text-black hover:border-black border-3 px-8 py-4 md:py-0 border-[#d8e0e3] 
                      rounded-2xl border-dotted flex-auto flex items-center nonsel transition-colors duration-100
                      justify-center ml-4 sm:ml-0 md:ml-0 mr-4 md:mr-0 w-[60%] md:w-full sm:h-50 md:h-auto sm:w-auto self-center
                      order-2
                      "
                      href="https://mier.atabook.org/"
                      target="_blank" rel="noopener noreferrer"
                    >

                      <p className="text-center">sign my guestbook!</p>

                    </NextLink>

                    <div 
                      className="
                      flex mx-4 ml-4 md:m-0 mt-0 sm:mr-0 flex-col bg-[#17191a]/50
                      border-[#17191a] border-2 h-50 md:h-40 text-xs relative
                      rounded-l-xl rounded-t-xl
                      order-1
                      "
                    >

                      <p className={`${sono.className} sticky top-0 z-10 bg-[#17191a] p-2 pl-3 w-full rounded-t-xl`}>CHANGELOGS</p>
                      <div className="super-thin-scrollbar h-full overflow-y-auto">
                        {logs?.map((log, index) => {
                          return (
                            <div key={log.id} className={`pl-4 pr-4.75 py-2 ${index === logs.length - 1 && "pb-4"}`}>
                              <p className={`${sono.className} text-gray-400`}><span className="text-orange-400 text-[9px]">●</span> {log.date}</p>
                              <p className="text-justify">{log.log}</p>
                            </div>
                          )
                        })}
                      </div>

                    </div>

                  </div>
                </div>

              </div>

              {/* CAROUSEL */}
              <div className="order-8 md:order-1 flex flex-col relative">
                <p className="text-white absolute top-0 left-0 py-1 px-2 z-100 text-xs bg-black/30 rounded-br-md ml-px mt-px nonsel">brought to you by...</p>
                <div className="flex flex-col justify-center items-center relative w-full aspect-25/9 mx-auto border-x-0 md:border-x text-white border-[#d8e0e3]/70 border">

                  <div className="w-full h-full absolute bg-[#17191a] mix-blend-lighten z-100 pointer-events-none">

                  </div>

                  <div
                    className="overflow-hidden flex items-center justify-center h-full"
                    onMouseEnter={() => autoplay.current.stop()}
                    onMouseLeave={() => autoplay.current.play()}
                    ref={emblaRef}
                  >
                    <div className={`flex ${ready ? "opacity-100" : "opacity-0"}`}>
                      
                      {/* VERT */}
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
                            <p className={`${adVertHover ? `${micro.className} text-7xl translate-y-1` : `${coral.className} text-5xl`} text-center px-8 text-nowrap`} ref={vertAdRef}>Take a dive?</p>
                            <p className={`${adVertHover ? `${micro.className} text-2xl -translate-y-3` : `${coral.className} text-base`} text-center px-8`} ref={vertAdRef2}>project your thoughts and feelings as you delve deeper in the abyss</p>
                          </div>

                          <video autoPlay muted loop className="object-cover h-full w-full nonsel pointer-events-none">
                            <source src="/videos/vert.webm" type="video/webm" />
                          </video>
                        </NextLink>
                      </div>

                      {/* FISHING */}
                      <div className="aspect-25/9 flex-[0_0_100%]">
                        <NextLink href="/mierfishing/index.html" target="_blank" rel="noopener noreferrer">
                          <img src="/images/indexbanner.png" className="w-full h-full bg-[#17191a]/40 nonsel pointer-events-none object-cover" />
                        </NextLink>
                      </div>

                      {/* EYE */}
                      <div className="relative aspect-25/9 flex-[0_0_100%] flex flex-col items-center justify-center bg-[#17191a] nonsel pointer-events-none overflow-x-hidden">
                        <img className="-translate-x-full absolute nonsel pointer-events-none pupil z-25" src="/images/pupil.png" ref={leftPupilRef} />
                        <img className="-translate-x-full scale-x-[-1] absolute nonsel pointer-events-none bg-white border-4 border-black z-20" src="/images/lid.png" />
                        <img className="translate-x-full absolute nonsel pointer-events-none pupil z-25" src="/images/pupil.png" ref={rightPupilRef} />
                        <img className="translate-x-full absolute nonsel pointer-events-none bg-white border-4 border-black z-20" src="/images/lid.png" />
                        <div className="absolute bottom-2 left-0 w-full h-15 z-30 flex items-center overflow-hidden">
                          <p className={`text-white text-sm text-center w-full ${gowun.className}`}>
                            I know what you're up to.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                  
                  <img 
                    src="/images/arrow-left.svg"  
                    onClick={scrollPrev} 
                    className="absolute cursor-pointer nonsel text-xl h-10 w-10 mx-2 p-2 rounded-full transition-bg duration-400 hover:bg-black/20 left-0" 
                  />
                  
                  <img 
                    src="/images/arrow-right.svg" 
                    onClick={scrollNext} 
                    className="absolute cursor-pointer nonsel text-xl h-10 w-10 mx-2 p-2 rounded-full transition-bg duration-400 hover:bg-black/20 right-0" 
                  />

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
              </div>

              <hr className="mb-4 md:mt-4 md:mb-0 border-gray-500/30 w-[90%] block order-7 md:order-2" />

            </div> 

            {/* RIGHT COL */}
            <div className="md:order-2 order-1 flex flex-col">

              {/* INTRO */}
              <div className="m-4 mb-0 text-white border-[#d8e0e3]/40 relative border-dotted border flex flex-col items-center pb-14">

                <div className="p-4 flex items-center flex-col">
                  <img
                    src="/images/pfp.png"
                    className="mb-4 max-w-[50%]"
                    onMouseEnter={() => boing()}
                    ref={pfpRef}
                  />

                  <p className="text-sm text-justify">
                    Hello, welcome to <span className={`${sono.className} font-bold`}>Miercury!</span> This is a place for me to share my thoughts, projects and artworks. You can read more about me <a href="/about" className="underline blue text-">here.</a>
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
                      ${sono.className}
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
              
              <hr className="my-4 border-gray-500/30 w-[90%] md:w-[80%] mx-auto" />

              {/* NAV */}
              <div className={`mx-4 mb-4 text-white grid grid-rows-[240px_50px_50px_50px_50px_50px_50px] transition-[grid_template-rows] duration-200 relative`} ref={linksDivRef}>
                
                <NavLinkMarq desc="learn about my characters" active={activeLink} link="characters" onHover={handleHover} />
                <NavLinkImg desc="look at my art" active={activeLink} link="gallery" onHover={handleHover} />
                <NavLinkImg desc="learn about a story i want to tell" active={activeLink} link="mtwim" onHover={handleHover} />
                <NavLinkImg desc="play my own games here" active={activeLink} link="games" onHover={handleHover} />
                <NavLinkImg desc="learn about my own art community" active={activeLink} link="pp" onHover={handleHover} />
                <NavLinkImg desc="read my ramblings" active={activeLink} link="blog" onHover={handleHover} />
                <NavLinkBot desc="learn more about me" active={activeLink} link="about" onHover={handleHover} />

              </div> 

              <hr className="border-gray-500/30 w-[90%] mx-auto md:hidden" />

              {/* ?? */}
              <div className="hidden flex-1 flex-col items-center justify-center w-full h-full border-[#d8e0e3]/40 relative border-dotted border">
              </div>

            </div> 
          
          </div>
          
          {/* BOTTOM ROW */}
          <div
            className="w-full flex flex-col justify-center opacity-0 transition-opacity duration-2000"
            ref={bottomContentRef}
          >

            <hr className="border-gray-500/30 w-full mb-4" />

            {/* QUOTE OF THE DAY */}
            <div className="relative flex flex-col justify-center">
              <p ref={quoteBackdropRef}
                className={`
                  absolute text-[#b2c6ce18] 
                  nonsel pointer-events-none -translate-y-px
                  ${righteous.className}
                  text-2xl
                  min-[360px]:text-3xl
                  min-[480px]:text-4xl
                  min-[600px]:text-5xl
                  min-[768px]:text-6xl
                `}
              >
              </p>
              <Marquee
                gradient={false}
                speed={getQuote(quotes).length}
                autoFill={true}
                className="text-xs sm:text-sm md:text-md flex text-white nonsel"
              >
                <NextLink href="/quotes" className={`${sono.className}`}>
                  <span className="inline-flex backwards-spin items-center justify-center">✦</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getQuote(quotes)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </NextLink>
              </Marquee>
            </div>

            <hr className="border-gray-500/30 w-full mt-4" />
            
            {/* TO DO LIST */}
            <div className="w-full flex flex-col p-4">
              <div className="text-white p-4 border-[#d8e0e3]/70 border flex flex-col ">
                <h1 className="font-bold text-2xl self-center">to do list</h1>
                <p className="pb-5 text-xs self-center">(will be gone eventually)</p>

                <div className="grid md:grid-cols-2 gap-4">
                  
                  {/* TO DO */}
                  <div className="flex flex-col p-4 border-[#d8e0e3]/70 border overflow-y-auto h-100 scrollbar">
                    <p className="text-xl font-bold self-center">TO-DO: </p>
                    {/* <p className="text-xs">○ </p> */}
                    <p className="text-xs font-bold underline">○ DRAW ASSETS (A LOT OF IT! LOCK IN! WE'RE LIKE 80% THERE)</p>
                    <p className="text-xs font-bold underline">○ finish the ocs page</p>
                    <p className="text-xs font-bold underline">○ finish the mtwim page</p>
                    <p className="text-xs font-bold underline">○ finish the games page</p>
                    <p className="text-xs font-bold underline">○ finish the pp page</p>
                    <p className="text-xs font-bold underline">○ finish the blog page</p>
                    <p className="text-xs">○ make illustration for top right section</p>
                    <p className="text-xs">○ style each section in index</p>
                    <p className="text-xs">○ set up wanted posters for pp</p>
                    <p className="text-xs">○ set up images for navmenu</p>
                    <p className="text-xs">○ set up supabase for pp gallery</p>
                    <p className="text-xs">○ set up favicons for each route</p>
                    <p className="text-xs">○ set up different 'moons' for each route</p>
                    <p className="text-xs">○ finish the scrollTrigger course</p>
                    <p className="text-xs">○ add more ppl to stars bg (revise it even)</p>
                    <p className="text-xs">○ make assets for mtwim</p>
                    <p className="text-xs">○ make assets for characters</p>
                    <p className="text-xs">○ add shooting stars</p>
                    <p className="text-xs">○ add lots of easter eggs</p>
                    <p className="text-xs">○ make scary easter egg?</p>
                    <p className="text-xs">○ add mier widget. (potentially make it persist across all routes) ((use local storage for it))</p>
                    <p className="text-xs">○ make another game</p>
                  </div>

                  {/* DONE */}
                  <div className="flex flex-col p-4 border-[#d8e0e3]/70 border overflow-y-auto h-100 scrollbar">
                    <p className="text-xl font-bold self-center">DONE: </p>
                    {/* <p className="text-xs">● </p> */}
                    <p className="text-xs">● make featured art frame properly</p>
                    <p className="text-xs font-bold underline">● finish the gallery page</p>
                    <p className="text-xs">● a LOT of things for the gallery i cant list down lol</p>
                    <p className="text-xs font-bold underline">● finish the about me page</p>
                    <p className="text-xs">● implement lightbox for artworks </p>
                    <p className="text-xs">● learn how to draw again LOL</p>
                    <p className="text-xs">● bring back old drawer navmenu style</p>
                    <p className="text-xs">● show featured art in index</p>
                    <p className="text-xs">● make daily popup modal persist across routes</p>
                    <p className="text-xs">● make daily popup modal</p>
                    <p className="text-xs">● fix the fcked up font management</p>
                    <p className="text-xs">● add qotd in index (what u see above rn)</p>
                    <p className="text-xs">● revise about me page (its so ass bruh..)</p>
                    <p className="text-xs">● show latest drawing in index</p>
                    <p className="text-xs">● set up supabase for gallery</p>
                    <p className="text-xs">● optimize stars background when unfocused</p>
                    <p className="text-xs">● learn how to make svgs</p>
                    <p className="text-xs">● make navmenu look good</p>
                    <p className="text-xs">● revise navmenu</p>
                    <p className="text-xs">● make index page responsive</p>
                    <p className="text-xs">● turn most gsap animations into plain css</p>
                    <p className="text-xs">● make adVERT impressive</p>
                    <p className="text-xs">● set up navmenu revision skeleton</p>
                    <p className="text-xs">● add loading screen for index</p>
                    <p className="text-xs">● improve art section in index</p>
                    <p className="text-xs">● add changelog to index</p>
                    <p className="text-xs">● make the admin page actually legible LOL</p>
                    <p className="text-xs">● add more to the about me page</p>
                    <p className="text-xs">● improve navbar for index</p>
                    <p className="text-xs">● implement index and slug pages for blog </p>
                    <p className="text-xs">● make blog page</p>
                    <p className="text-xs">● make the pp page</p>
                    <p className="text-xs">● add all old posts from the old miercury websites here</p>
                    <p className="text-xs">● fix bg low opacity bug</p>
                    <p className="text-xs">● set up carousel for pp</p>
                    <p className="text-xs">● add image uploading function for tiptap</p>
                    <p className="text-xs">● set up atabook</p>
                    <p className="text-xs">● perhaps have the blog be its own page instead</p>
                    <p className="text-xs">● make the about me page</p>
                    <p className="text-xs">● finish secret santa</p>
                    <p className="text-xs">● add more to the space background </p>
                    <p className="text-xs">● implement editing posts with tiptap</p>
                    <p className="text-xs">● implement tiptap on post dashboard</p>
                    <p className="text-xs">● make a dashboard for blog crud operations</p>
                    <p className="text-xs">● connect this to supabase so you can add blog posts</p>
                    <p className="text-xs">● add vercel web analytics functionality</p>
                  </div>
                  
                </div>
              </div>
            </div>

          </div>

        </div>
       
        
                
      </div>  
      
      {/* FOOTER */}
      <Footer />

      <img src="/images/mierwalk.gif" className="fixed z-1 bottom-0 right-0 nonsel scale-80 origin-bottom-right" draggable="false" style={{ pointerEvents: "none" }} />

      <Stars />

      <Tooltip info="check out gallery?" status={toolTipStatus} />

      <Lightbox
        open={featuredLightBoxOpen}
        close={() => setFeaturedLightBoxOpen(false)}
        slides={featuredArtworkRefs}
        plugins={[Zoom, Captions, Fullscreen]}
        zoom={{
          scrollToZoom: true,
          maxZoomPixelRatio: 10,
          zoomInMultiplier: 1.5,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          wheelZoomDistanceFactor: 600,
          pinchZoomDistanceFactor: 200,
        }}
        styles={{
          container: {
            backgroundColor: "rgba(23, 25, 26, 0.60)",
            backdropFilter: "blur(4px)",
          },
        }}
        captions={{
          showToggle: true,
          descriptionTextAlign: "center",
          descriptionMaxLines: 10,
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </div>
  );
}
