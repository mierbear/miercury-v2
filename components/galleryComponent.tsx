"use client";
import { useEffect, useRef, useState } from "react";
import supabase from "@/lib/supabaseClient";
import ArtType from "@/types/artType";
import type { SlideImage } from "yet-another-react-lightbox";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import { Bodoni_Moda, Sono, Noto_Serif_JP, Kosugi_Maru } from "next/font/google";
import Marquee from "react-fast-marquee";
import Footer from "@/components/footerComponent";
import NextLink from "next/link";

const bodoni = Bodoni_Moda({
  weight: "400",
  subsets: ["latin"],
})

const sono = Sono({
  weight: ["400", "700"],
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

export default function GalleryComponent() {

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const [styleOpen, setStyleOpen] = useState(true)
  const [characterOpen, setCharacterOpen] = useState(true)
  const [categoryOpen, setCategoryOpen] = useState(true)
  const [worldOpen, setWorldOpen] = useState(true)

  const tagStates = [styleOpen, characterOpen, categoryOpen, worldOpen];
  const setTagStates = [setStyleOpen, setCharacterOpen, setCategoryOpen, setWorldOpen]

  const expandTagsHandler = () => {
    tagStates.some(Boolean) 
    ? setTagStates.forEach(func => func(false))
    : setTagStates.forEach(func => func(true))
  }

  const styleTags = {
    name: "STYLE",
    state: styleOpen,
    setState: () => setStyleOpen(prev => !prev),
    tags:
    [
      "rendered", 
      "wip", 
      "sketch", 
    ],
  }

  const characterTags = {
    name: "CHARACTER",
    state: characterOpen,
    setState: () => setCharacterOpen(prev => !prev),
    tags:
    [
      "original", 
      "friends", 
      "fanart", 
    ],
  }
    

  const categoryTags = {
    name: "CATEGORY",
    state: categoryOpen,
    setState: () => setCategoryOpen(prev => !prev),
    tags:
    [
      "favorite", 
      "collab", 
      "shitpost",
    ],
  }
    
  const worldTags = {
    name: "WORLD",
    state: worldOpen,
    setState: () => setWorldOpen(prev => !prev),
    tags:
    [
      "mtwim",
      "skullbound",
      "flower delivery",
      "simeons descent",
      "pio",
      "pp",
      "mier",
    ],
  }

  const tags = [
    styleTags, 
    characterTags, 
    categoryTags, 
    worldTags,
  ];

  const [artworks, setArtworks] = useState<ArtType[]>([]);
  const [featArtwork, setFeatArtwork] = useState<ArtType | null>(null);

  const fetchFeatArt = async () => {
    const { error, data } = await supabase
      .from("art")
      .select("*")
      .eq("featured", true)
    
    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }
    
    // console.log(data);
    setFeatArtwork(data[0]);
  }

  const fetchArtworks = async () => {
    const { error, data } = await supabase
      .from("art")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }
    
    // console.log(data);
    setArtworks(data);
  }

  const filteredArtworks = selectedTags.length === 0 
    ? artworks 
    : artworks.filter(artwork => 
      selectedTags.every(tag => artwork.tags?.includes(tag))
    );
  
  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArtworks = filteredArtworks.slice(startIndex, endIndex);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      if (styleTags.tags.includes(tag)) {
        const filtered = prev.filter(t => !styleTags.tags.includes(t))
        return prev.includes(tag) ? filtered : [...filtered, tag]
      }
      
      return prev.includes(tag)
      ? prev.filter(t => t !== tag)
      : [...prev, tag]
    });

    setCurrentPage(1);
  };

  const [lightBoxOpen, setLightBoxOpen] = useState(false);
  const [featuredLightBoxOpen, setFeaturedLightBoxOpen] = useState(false);
  const [bgLightBoxOpen, setBgLightBoxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightBox = (index: number) => {
    setCurrentIndex(index);
    setLightBoxOpen(true);
  }

  const slides = filteredArtworks.map((art) => ({
    src: art.url,
    description: (
      <div className="hover:opacity-0 transition-opacity duration-300 flex flex-col px-8 py-2 md:py-4 border-gray-400 border bg-black/80 max-w-[85ch] backdrop-blur-[3px] rounded-sm items-center justify-center">
        <p className={`text-xl sm:text-2xl md:text-4xl font-bold ${bodoni.className}`}>{art.title}</p>
        <p className={`${noto.className} text-xs sm:text-sm md:text-base text-gray-300 font-bold`}>({art.date})</p>
        <div className="flex flex-wrap gap-2">
          {art.tags.map((tag, index) => 
            <p key={index} className={`text-xs sm:text-sm md:text-base ${kosugi.className} text-gray-400`}>#{tag}</p>
          )}
        </div>
        <p className={`${noto.className} text-xs sm:text-sm md:text-base mt-3 text-center`}>{art.description}</p>
      </div>
    ),
  }));
  
  const featuredArtworkRefs: SlideImage[] = featArtwork?.url
    ? [
        {
          src: featArtwork.url,
          description: (
            <div className="hover:opacity-0 transition-opacity duration-300 flex flex-col px-8 py-2 md:py-4 border-gray-400 border bg-black/80 max-w-[85ch] backdrop-blur-[3px] rounded-sm items-center justify-center">
              <p className={`text-xl sm:text-2xl md:text-4xl font-bold ${bodoni.className}`}>{featArtwork.title}</p>
              <p className={`${noto.className} text-xs sm:text-sm md:text-base text-gray-300 font-bold`}>({featArtwork.date})</p>
              <div className="flex flex-wrap gap-2">
                {featArtwork.tags.map((tag, index) => 
                  <p key={index} className={`text-xs sm:text-sm md:text-base ${kosugi.className} text-gray-400`}>#{tag}</p>
                )}
              </div>
              <p className={`${noto.className} text-xs sm:text-sm md:text-base mt-3 text-center`}>{featArtwork.description}</p>
            </div>
          ),
        },
      ]
    : [];

  const BgArtworkRefs: SlideImage[] = [
    {
      src: "/images/gallery-bg-full.jpg",
      description: (
        <div className="hover:opacity-0 transition-opacity duration-300 flex flex-col px-8 py-2 md:py-4 border-gray-400 border bg-black/80 max-w-[85ch] backdrop-blur-[3px] rounded-sm items-center justify-center">
          <p className={`text-xl sm:text-2xl md:text-4xl font-bold ${bodoni.className}`}>Gallery Background</p>
          <p className={`${noto.className} text-xs sm:text-sm md:text-base mt-3 text-center`}>a bunch of sketches i gathered from 2025-2026, took a while to do</p>
        </div>
      ),
    },
  ]

  const [featArtFocus, setFeatArtFocus] = useState(true);

  type TabTypes = "enter" | null | typeof inquiry[number]["key"];
  const [currentTab, setCurrentTab] = useState<TabTypes>(null)
  const [answer, setAnswer] = useState("");
  const questionsRef = useRef<HTMLDivElement>(null);
  const chatboxTextRef = useRef<HTMLDivElement>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [guideState, setGuideState] = useState<null | "annoyed" | "fine">(null);
  const [currentShow, setCurrentShow] = useState<string | null>(null);

  const openTab = (tab: TabTypes) => {
    if (!infoRef.current || !questionsRef.current || !chatboxRef.current) return;
    infoRef.current.style.pointerEvents = "none";
    resetTalk();

    // LEAVE
    if (tab === null) {
      setCurrentTab(tab);
      setCurrentShow(null);
      setOpenQuestions(false);

      if (guideState === "annoyed") {
        const dotdotdot = "...";
        setAnswer(dotdotdot);
        mierTalk(dotdotdot, 400);
      } else if (guideState === "fine") {
        const text = "ok take care!";
        setAnswer(text);
        mierTalk(text, 80);
      }

      questionsRef.current.style.opacity = "0";
      setTimeout(() => {
        infoRef.current!.style.pointerEvents = "auto";
      }, 2000);

    // ENTER
    } else {
      setCurrentTab(tab);
      setOpenQuestions(true);
      chatboxRef.current.style.opacity = "100";
      setTimeout(() => {
        questionsRef.current!.style.opacity = "100";
      }, 500);

      // BEGINNING
      if (tab === "enter") {
        if (guideState !== "fine") {
          setGuideState("annoyed");
        }
        const text = "what would you like to know?";
        setAnswer(text);
        mierTalk(text, 80);

      // INQUIRE
      } else {
        setGuideState("fine")

        const inquire = inquiry.find(item => item.key === tab);
        if (inquire?.show) {
          setCurrentShow(tab);
        } else {
          setCurrentShow(null);
        }

        const data = inquiry.find(item => item.key === tab);
        if (data) {
          setAnswer(data.answer);
          mierTalk(data.answer, 40);
        }
      }

      setTimeout(() => {
        infoRef.current!.style.pointerEvents = "auto";
      }, 1000);
    }
  }

  const openQuestionHandler = () => {
    setOpenQuestions(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const receptionExitHandler = () => {
    setReceptionFullscreen(false);
    
    // ABOUT TO EXIT
    if (openQuestions) {
      openTab(null)
    
    // EXIT
    } else {
      setOpenQuestions("closed")
      setGuideState(null)

      if (guideState === "annoyed") {
        resetTalk();
        const text = "you didnt even-";
        setAnswer(text);
        mierTalk(text, 40);
      }

      setTimeout(() => {
        chatboxRef.current!.style.opacity = "0";
      }, 500);
    }
  }

  const tap = () => {
    const sound = new Audio(`/audio/tap${Math.floor(Math.random() * 5)}.mp3`);
    sound.play();
  }

  const talkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mierTalk = (text: string, speed: number, i: number = 0) => {
    if (!chatboxTextRef.current) return;
    if (i >= text.length) return;
    if (!isPhone) {
      tap();
    }
    chatboxTextRef.current.textContent += text.charAt(i);
    talkTimeoutRef.current = setTimeout(() => mierTalk(text, speed, i + 1), speed);
  }

  const resetTalk = () => {
    if (!chatboxTextRef.current) return;
    if (talkTimeoutRef.current) {
      clearTimeout(talkTimeoutRef.current);
      talkTimeoutRef.current = null;
    }
    chatboxTextRef.current.textContent = "";
  }

  const [openQuestions, setOpenQuestions] = useState<boolean | "closed">("closed");

  const inquiry = [
    { 
      key: "process",
      question: "what's your process?",
      answer: "here ya go",
      show: false,
    },
    { 
      key: "tools",
      question: "what do you use?",
      answer: "an almost decade old wacom tablet with occasional sensitivity and touch issues thats clinging on for dear life",
      show: false,
    },
    { 
      key: "comms",
      question: "commissions?",
      answer: "no, generally im too busy. unless you can pay me really well maybe ill consider it",
      show: false,
    },
    { 
      key: "beauty",
      question: "'controversial' art takes?",
      answer: "i think art is objective.. more specifically beauty is objective. we all intrinsically know and can discern when something is beautiful or not",
      show: false,
    },
    { 
      key: "colors",
      question: "favorite colors?",
      answer: "if you couldn't tell already, its blue and yellow :D specifically these colors",
      show: false,
    },
    { 
      key: "proud",
      question: "favorite fundamental?",
      answer: "i love/hate color theory. its the best/worst",
      show: false,
    },
    { 
      key: "advice",
      question: "any advice?",
      answer: "never give up!!!!",
      show: false,
    },
    { 
      key: "resource",
      question: "any resources?",
      answer: "use these.",
      show: false,
    },
    { 
      key: "meow",
      question: "meow?",
      answer: "mrow",
      show: false,
    },
    { 
      key: "test",
      question: "test?",
      answer: "test",
      show: true,
    },
  ]

  const sadFaces = ["u_u", "T_T", "ヽ(*。>Д<)o゜",];

  const randomizer = (arr: string[]) => {
    return arr[Math.trunc((Math.random() * arr.length))];
  };

  const [face, setFace] = useState<string>(sadFaces[0]); 

  useEffect(() => {
    setFace(randomizer(sadFaces));
  }, []);

  useEffect(() => {
    setFace(randomizer(sadFaces));
  }, [currentArtworks.length === 0]);

  const [orientation, setOrientation] = useState<"portrait" | "landscape" | null>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setOrientation(img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait');
    const orient = img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait';

    // console.log("orientation: ", orient);
  };

  const [tagHide, setTagHide] = useState(false);

  const showTagsHandler = () => {
    setTagHide(!tagHide)
    if (currentArtworks.length === 0) {
      setSelectedTags([]);
      setCurrentPage(1);
    }
  }

  const isPhone = typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

  const [contentVisible, setContentVisible] = useState(true);
  const [receptionFullscreen, setReceptionFullscreen] = useState(false);

  const showRandomArt = () => {
    setSelectedTags([]);
    setCurrentPage(1);
    const randomIndex = Math.floor(Math.random() * artworks.length);
    openLightBox(randomIndex)
  }

  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    fetchFeatArt();
    fetchArtworks();
    if (isPhone) {
      setTagHide(true);
      setStyleOpen(false);
      setCharacterOpen(false);
      setCategoryOpen(false);
      setWorldOpen(false);
    }
  }, []);

  return (
    <div className="min-w-screen min-h-screen align-center items-center flex flex-col relative bg-[#17191a] nonsel">

      {/* SPACE */}
      <div className="w-6xl max-w-screen flex flex-col justify-end items-center h-32">
        {/* <p className="text-white">gallery</p> */}
      </div>

      {/* CONTENT */}
      <div className={`w-6xl max-w-screen flex flex-col transition-opacity duration-500 z-50 ${contentVisible ? "opacity-100" : "opacity-0 pointer-events-none nonsel"}`}>

        {/* MAIN */}
        <div 
          className={`
          max-h-160 min-h-160 flex flex-row
          items-center justify-center overflow-hidden
          border-y
          min-[1152px]:rounded-xl
          min-[1152px]:border-x
          shadow-2xl border-[#17191a] bg-[#17191a]
          `}
        >

          {/* FEATURED ART */}
          <div
            className={`
            flex flex-col 
            ${receptionFullscreen === true ? "flex-0" :
              openQuestions === true ? "flex-0 md:flex-38" :
              openQuestions === false ? "flex-0 md:flex-62" :
              "flex-100"}
            transition-flex duration-1000 nonsel 
            justify-center items-center relative 
            cursor-pointer overflow-hidden
            `}
            onClick={() => setFeaturedLightBoxOpen(true)}
          >
            
            <div 
              className={`
              ${openQuestions === false ? "hidden" : "flex"}
              md:flex items-center overflow-hidden
              absolute top-0 w-full min-h-12 max-h-12
              `}
            >
              <Marquee
                speed={30}
                autoFill={true}
                direction="right"
                className={`
                  text-xs flex py-4
                  text-white bg-black/20 nonsel
                  ${kosugi.className}
                `}
              >
                <span className="spin flex">✦</span>&nbsp;&nbsp;FEATURED ARTWORK&nbsp;&nbsp;
              </Marquee>
            </div>

            <img src={featArtwork?.url}
              onLoad={handleImageLoad}
              className={`
                pointer-events-none cursor-pointer
                object-cover

                min-h-160
                max-h-[60vh]
                min-w-screen
                max-w-screen
                min-[768px]:max-h-160
                min-[768px]:min-w-full
                `}
            />

            <div className={`
              absolute bottom-18 md:left-8 hover:opacity-0 transition-all duration-500
              flex flex-col text-nowrap md:origin-bottom-left
              items-center justify-center nonsel cursor-pointer
              ${openQuestions === true ? "scale-80 opacity-60" : "scale-100 opacity-100"}
              `}
              >
              <p className={`md:text-5xl sm:text-4xl text-3xl font-bold text-center meow text-white ${bodoni.className}`}>"{featArtwork?.title}"</p>
              <p className={`text-sm md:self-start meow ${noto.className} text-white`}>({featArtwork?.date})</p>
            </div>
            
            <div 
              className={`
              ${openQuestions === false ? "hidden" : "flex"}
              md:flex items-center overflow-hidden
              absolute bottom-0 w-full min-h-12 max-h-12
              `}
            >
              <Marquee
                speed={30}
                autoFill={true}
                className={`
                  text-xs flex py-4
                  text-white bg-black/20 nonsel
                  ${kosugi.className}
                `}
              >
                <span className="backwards-spin flex">✦</span>&nbsp;&nbsp;FEATURED ARTWORK&nbsp;&nbsp;
              </Marquee>
            </div>

          </div>

          {/* INFO */}
          <div
            className={`
              flex flex-col items-center
              ${receptionFullscreen === true ? "flex-100" :
                openQuestions === true ? "flex-100 md:flex-62" :
                openQuestions === false ? "flex-100 md:flex-38" :
                "flex-0"}
              transition-flex duration-1000 bg-gray-200
              w-full h-160 self-start overflow-hidden
            `}
            ref={infoRef}
            >

            {/* TOP / ILLUSTRATION */}
            <div className={`flex flex-col items-center h-full w-full transition-flex duration-500 ${openQuestions ? "flex-72" : "flex-84"}`}>

              {/* TITLE */}
              <div className={`flex flex-col items-center justify-center min-h-12 max-h-12 w-full relative`}>
                <p className={`text-2xl text-center text-nowrap ${bodoni.className}`}>
                  {openQuestions === true ? "ask and you shall recieve.." :
                  openQuestions === false ? "welcome to the gallery!" :
                  "..."}
                </p>
                <div
                  className={`
                    right-2 cursor-pointer h-8 min-h-8 scale-90 transition-opacity duration-500 absolute
                    ${openQuestions === true ? "opacity-0 pointer-events-none md:pointer-events-auto md:opacity-100" : "opacity-0 pointer-events-none nonsel"}
                  `}
                  onClick={() => setReceptionFullscreen(!receptionFullscreen)}
                >
                  <img className="h-8 min-h-8 nonsel pointer-events-none" src={`/images/${receptionFullscreen ? "minscreen" : "fullscreen"}.svg`} />
                </div>
              </div>

              {/* BOOTH */}
              <div className={`w-full transition-w duration-1000 h-full bg-black/20 flex items-center justify-center relative`}>
                
                {/* SHOW SOMETHING */}
                <div 
                  className={`
                  absolute flex justify-center w-full
                  h-[70%] bg-black/50 transition-opacity
                  duration-1000 nonsel pointer-events-none
                  ${currentShow ? "opacity-100" : "opacity-0"}
                  `}
                >
                  {currentShow ? (
                    <img src={`/images/gallery-show-${currentShow}.png`} className="object-cover w-auto h-full" />
                  ) : ""}
                </div>

                {/* CHATBOX */}
                <div
                  className="max-w-[90%] max-h-[28%] rounded-sm p-2 bg-yellow-200/70 absolute bottom-2 flex items-center justify-center text-justify opacity-0 transition-opacity duration-500"
                  ref={chatboxRef}
                >
                  <p className={`text-sm md:text-base px-4 text-center ${kosugi.className}`} ref={chatboxTextRef}>
                  </p>
                </div>
                
              </div>

            </div>

            {/* BOTTOM / QUESTIONS */}
            <div className={`flex flex-col items-center pt-4 h-full w-full transition-flex duration-500 ${openQuestions ? "flex-28" : "flex-16"} md:px-4 lg:px-12 py-0 relative`}>

              {/* OPEN QUESTIONS */}
              <p
                className={`absolute top-4 text-2xl flex items-center gap-2 cursor-pointer transition-opacity duration-500 text-nowrap ${openQuestions ? "opacity-0" : "opacity-100"}`}
                onClick={() => openTab("enter")}
              >
                <span className="text-base">●</span>
                <span className="hover:underline -translate-y-px">question!</span>
              </p>
              
              {/* QUESTIONS */}
              <div 
                className={`
                  grid md:grid-cols-3 grid-cols-2 gap-0.5 gap-x-8 lg:gap-x-12
                  transition-opacity duration-200 opacity-0
                  whitespace-nowrap
                  ${!openQuestions && "nonsel pointer-events-none"}
                `}
                ref={questionsRef}
                >
                {inquiry.map(inquiry => (
                  <p key={inquiry.key} className="cursor-pointer text-sm lg:text-base flex items-center gap-2" onClick={() => openTab(inquiry.key)}>
                    <span className="text-[8px]">●</span>
                    <span className="hover:underline -translate-y-px flex w-full">{inquiry.question}</span>
                  </p>
                ))}
              </div>

              {/* EXIT */}
              <p className={`
                cursor-pointer text-sm transition-opacity duration-800 absolute bottom-4 left-4.5 text-nowrap
                `} 
                onClick={() => receptionExitHandler()}
                >
                ○&nbsp;
                <span className="hover:underline">
                  {openQuestions === true ? "nevermind!" :
                  openQuestions === false ? "goodbye!" :
                  "..."}
                </span>
              </p>

            </div>
          </div>

        </div>

        {/* MIDDLE */}
        <div 
          className={`
            flex 
            pl-4 py-2 pr-2 my-16 gap-4
            w-100
            min-[640px]:w-140
            h-auto
            max-w-screen
            text-sm
            self-center relative
            text-[#17191a] rounded-xs bg-gray-50/90
          `}
        >

          {/* WELCOME */}
          <div className="flex flex-col min-w-[50%]">

            <p className={`pr-2 sm:pr-0 self-center text-lg flex gap-4 text-center text-nowrap font-bold ${kosugi.className}`}>
              <span className="slight-slow-spin text-yellow-300">★</span>
              WELCOME TO THE GALLERY
              <span className="slight-slow-spin text-yellow-300">★</span>
            </p>

            <p className="pr-2 sm:pr-0 text-justify">This is where I'll be posting some of my artwork, everything from worlds I'm building, to fragments of ideas, to fanart and to nonsensical drawings.</p>
            &nbsp;
            <p className="pr-2 sm:pr-0">Have fun looking around!</p>
            
            <hr className="my-2 border-black/50 w-full block" />

            {/* BOTTOM */}
            <div className={`flex justify-between w-full h-full gap-2`}>

              {/* INTERACTABLES */}
              <div className="flex flex-col text-nowrap pb-2">
                <p 
                  className={`
                  flex items-center gap-2 rounded-sm
                  cursor-not-allowed
                `}
                  onClick={() => alert(`not yet..`)}
                  // onClick={openQuestions === "closed" ? () => openQuestionHandler() : undefined}
                >
                  <span className="text-[8px]">●</span>
                  <span className="decoration-[#17191a]/25 transition-colors duration-100 hover:decoration-[#17191a] underline underline-offset-2 -translate-y-px flex w-full text-center">i have questions (a lot)</span>
                </p>
                
                <p 
                  className={`
                  cursor-pointer flex items-center gap-2 rounded-sm`}
                  onClick={() => setContentVisible(false)}
                >
                  <span className="text-[8px]">●</span>
                  <span className="decoration-[#17191a]/25 transition-colors duration-100 hover:decoration-[#17191a] underline underline-offset-2 -translate-y-px flex w-full text-center">i wanna see the background</span>
                </p>

                <NextLink 
                  href="/characters"
                  className={`
                  cursor-pointer flex items-center gap-2 rounded-sm`}
                  onClick={() => console.log(`mrow`)}
                >
                  <span className="text-[8px]">●</span>
                  <span className="decoration-[#17191a]/25 transition-colors duration-100 hover:decoration-[#17191a] underline underline-offset-2 -translate-y-px flex w-full text-center">learn about my characters</span>
                </NextLink>

                <p 
                  className={`
                  cursor-pointer flex items-center gap-2 rounded-sm`}
                  onClick={() => showRandomArt()}
                >
                  <span className="text-[8px]">●</span>
                  <span className="decoration-[#17191a]/25 transition-colors duration-100 hover:decoration-[#17191a] underline underline-offset-2 -translate-y-px flex w-full text-center">surprise me</span>
                </p>
              </div>
              
              {/* MOBILE ME DRAWING */}
              {/* <div className="block sm:hidden border border-black self-end h-30 aspect-square relative nonsel pointer-events-none"> */}
              <div className="block min-[640px]:hidden border border-black self-end h-25 min-[340px]:h-30 aspect-square relative nonsel pointer-events-none">
                <img src="/images/gallery-me.png" className="absolute bottom-0 right-0" />
              </div>
            
            </div>
            
          </div>
            
          {/* DESKTOP ME DRAWING */}
          <div className="hidden sm:block border border-black self-end h-50 z-200 aspect-square relative nonsel pointer-events-none">
            <img src="/images/gallery-me.png" className="absolute bottom-0 right-0" />
          </div>
            
        </div>

        {/* TAGS INFO SECTION */}
        <div 
          className={`
          flex w-full bg-[#7a8896] 
          bg-no-repeat bg-cover
          border-[#17191a] border-t
          min-[1152px]:rounded-t-xl
          min-[1152px]:border-x 
          bg-[url("/images/gallery-banner-mobile.png")]
          min-[768px]:bg-[url("/images/gallery-banner.png")]
          `}
        >
          
          {/* TAGS INFO */}
          <div
            className={`
            flex flex-col items-center justify-center 
            gap-2 p-2 md:p-4 transition-all ease-in-out duration-500 
            self-start w-full
            max-w-full
            min-[768px]:max-w-50 
            min-[1024px]:max-w-58
          `}>

            {/* SHOW/HIDE */}
            <p
              className={`
              py-2 px-4
              font-bold text-xl text-nowrap
              hover:cursor-pointer bg-white/60 hover:bg-white transition-all duration-300 shadow-xl
              rounded-md border-[#17191a]/40 border text-[#17191a]/70 hover:text-[#17191a]
              ${kosugi.className}
              `}
              onClick={() => showTagsHandler()}
            >
              {tagHide ? "SHOW TAGS" : "HIDE TAGS"}
            </p>

            {/* ARTWORK COUNT */}
            <div className="text-sm text-white text-center">
              {selectedTags.length > 0 ? (
                <p>
                  <span className={`${filteredArtworks.length === 0 || kosugi.className} align-top`}>{filteredArtworks.length === 0 ? "NO" : filteredArtworks.length}</span>&nbsp;
                  <span className="">artwork{filteredArtworks.length !== 1 && "s"} with tag{selectedTags.length > 1 && "s"}:</span><br />
                  <span className="italic">
                    {selectedTags.map((tag, index) => (
                      <span key={tag}>
                        <span
                        className="underline hover:cursor-pointer hover:text-yellow-400 hover:font-bold"
                        onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </span>
                        {index < selectedTags.length - 1 && ', '}
                      </span>
                    ))}
                  </span>
                </p>
              ) : (
                <p>
                  showing all&nbsp;
                  <span className={`${kosugi.className} align-top`}>{filteredArtworks.length}</span>
                  &nbsp;artworks!<br />
                  <span>:3</span>
                </p>
              )}
            </div>

          </div>
            
          {/* BANNER */}
          <div className="hidden md:flex items-center justify-center md:w-full transition-all ease-in-out duration-500">
          </div>
        </div>

        {/* TAGS / GALLERY */}
        <div 
          className={`
          flex 
          flex-col 
          min-[768px]:flex-row 
          min-[1152px]:border-x 
          bg-gray-100 
          border-[#17191a]
          `}
        >

          {/* LEFT / TAGS */}
          <div className={`
            flex flex-col justify-center md:justify-start md:items-center
            transition-all duration-500 overflow-hidden md:mt-4 mx-2
            ${tagHide 
              ? "max-h-0 mt-0 md:h-auto md:mx-0 md:w-0" 
              : `${tagStates.some(Boolean) ? "max-h-129.5" : "max-h-35"} py-2 md:py-0 md:w-42 lg:w-50 md:h-full md:max-h-full md:mt-0 md:mx-4 md:mb-4`}
            `}
          >

            {/* TAGS */}
            <div className={`
              grid grid-cols-2 md:grid-cols-1
              justify-around w-full overflow-hidden
              items-start md:gap-0 gap-2
              transition-opacity
              ${tagHide ? "pointer-events-none opacity-0 duration-400" : "opacity-100 duration-600"}
              `}
            >
              
              {/* FIRST COL */}
              <div className="gap-0.5 md:gap-0 flex flex-col flex-1">
                {tags.slice(0, 3).map(tag => (
                  <div 
                    className={`w-full ${tag.name === tags[tags.length - 1].name && "col-start-2 row-start-1 row-span-3 md:col-start-auto md:row-start-auto md:row-span-1"}`}
                    key={tag.name}  
                  >

                    {tag.name === tags[0].name && (
                      <hr className="border-gray-400/60 w-full mx-auto hidden md:block" />
                    )}

                    {/* BUTTON */}
                    <button
                      onClick={tag.setState}
                      className={`
                        flex items-center w-full
                        pl-2 py-2 h-10
                        cursor-pointer select-none 
                        transition-gap duration-500
                        ${kosugi.className}
                        ${tag.state ? "text-gray-800 mb-0.5 md:mb-0 gap-2.5" : "text-gray-600 gap-2"}
                      `}
                    >

                      <span className={`
                        ${tag.state ? "scale-100" : "scale-70 -rotate-90 -translate-y-px"} 
                        text-2xl w-3 h-3 ml-px flex items-center justify-center
                        transition-all duration-500
                        ${sono.className}
                        `}
                      >
                        {tag.state ? "★" : "✦"}
                      </span>

                      <span 
                        className={`
                          text-base md:text-lg
                          w-full h-full text-start flex items-center
                          origin-left transition-[scale] duration-500
                          ${tag.state ? "scale-100" : "scale-90"}
                        `}
                      >
                        {tag.name}
                      </span>

                    </button>

                    {/* DROPDOWN */}
                    <div 
                      className={`
                      overflow-hidden transition-all gap-0.5 duration-300 
                      items-center justify-around flex flex-col 
                      ${tag.state ? "max-h-auto opacity-100" : "max-h-0 opacity-0"}
                      `}
                    >
                      {tag.tags.map(eachTag => (
                        <div
                          key={eachTag}
                          className={`
                            flex items-center gap-2 cursor-pointer px-2 py-1 md:py-2 rounded 
                            min-h-10 md:min-h-12 h-full w-full
                            border transition-colors duration-300
                            ${selectedTags.includes(eachTag) ? "border-yellow-700/40 border bg-yellow-100 hover:bg-yellow-200" : "border-gray-300 bg-white hover:bg-gray-50"}
                            ${eachTag === tag.tags[tag.tags.length - 1] && "md:mb-3 mb-0"}
                          `}
                          onClick={() => toggleTag(eachTag)}
                        >

                          {/* CHECK */}
                          <div className="cursor-pointer relative h-3 w-3 shrink-0 scale-70">
                            <div className={`w-full h-full rounded-full transition-bg duration-100 ${selectedTags.includes(eachTag) ? "bg-yellow-500 scale-130" : "bg-gray-500 scale-100"} absolute`}></div>
                            <div className={`w-full h-full rounded-full bg-white absolute transition-scale duration-500 ${selectedTags.includes(eachTag) ? "scale-0" : "scale-80"}`}></div>
                          </div>

                          {/* TEXT */}
                          <p className="text-sm md:text-base truncate flex">
                            <span className={`self-center ${selectedTags.includes(eachTag) ? "font-bold text-yellow-700" : "text-gray-600"} flex`}>{eachTag}</span>
                            &nbsp;
                            <span className={`text-xs md:text-sm self-center translate-y-px flex ${kosugi.className} ${selectedTags.includes(eachTag) ? "text-yellow-700/60" : "text-gray-500/60"}`}>
                              ({artworks.filter(artwork => artwork.tags?.includes(eachTag)).length})
                            </span>
                          </p>

                        </div>
                      ))}
                    </div>

                    <hr className="border-gray-400/60 w-full mx-auto hidden md:block" />
                  </div>
                ))}
              </div>
              
              {/* 2ND COL */}
              <div className="gap-0.5 md:gap-0 flex flex-col flex-1">
                {tags.slice(3).map(tag => (
                  <div 
                    className={`w-full ${tag.name === tags[tags.length - 1].name && "col-start-2 row-start-1 row-span-3 md:col-start-auto md:row-start-auto md:row-span-1"}`}
                    key={tag.name}  
                  >

                    {tag.name === tags[0].name && (
                      <hr className="border-gray-400/60 w-full mx-auto hidden md:block" />
                    )}

                    {/* BUTTON */}
                    <button
                      onClick={tag.setState}
                      className={`
                        flex items-center w-full
                        pl-2 py-2 h-10
                        cursor-pointer select-none 
                        transition-gap duration-500
                        ${kosugi.className}
                        ${tag.state ? "text-gray-800 mb-0.5 md:mb-0 gap-2.5" : "text-gray-600 gap-2"}
                      `}
                    >

                      <span className={`
                        ${tag.state ? "scale-100" : "scale-70 -rotate-90 -translate-y-px"} 
                        text-2xl w-3 h-3 ml-px flex items-center justify-center
                        transition-all duration-500
                        ${sono.className}
                        `}
                      >
                        {tag.state ? "★" : "✦"}
                      </span>

                      <span 
                        className={`
                          text-base md:text-lg
                          w-full h-full text-start flex items-center
                          origin-left transition-[scale] duration-500
                          ${tag.state ? "scale-100" : "scale-90"}
                        `}
                      >
                        {tag.name}
                      </span>

                    </button>

                    {/* DROPDOWN */}
                    <div 
                      className={`
                      overflow-hidden transition-all gap-0.5 duration-300 
                      items-center justify-around flex flex-col 
                      ${tag.state ? "max-h-auto opacity-100" : "max-h-0 opacity-0"}
                      `}
                    >
                      {tag.tags.map(eachTag => (
                        <div
                          key={eachTag}
                          className={`
                            flex items-center gap-2 cursor-pointer px-2 py-1 md:py-2 rounded 
                            min-h-10 md:min-h-12 h-full w-full
                            border transition-colors duration-300
                            ${selectedTags.includes(eachTag) ? "border-yellow-700/40 border bg-yellow-100 hover:bg-yellow-200" : "border-gray-300 bg-white hover:bg-gray-50"}
                            ${eachTag === tag.tags[tag.tags.length - 1] && "md:mb-3 mb-0"}
                          `}
                          onClick={() => toggleTag(eachTag)}
                        >

                          {/* CHECK */}
                          <div className="cursor-pointer relative h-3 w-3 shrink-0 scale-70">
                            <div className={`w-full h-full rounded-full transition-bg duration-100 ${selectedTags.includes(eachTag) ? "bg-yellow-500 scale-130" : "bg-gray-500 scale-100"} absolute`}></div>
                            <div className={`w-full h-full rounded-full bg-white absolute transition-scale duration-500 ${selectedTags.includes(eachTag) ? "scale-0" : "scale-80"}`}></div>
                          </div>

                          {/* TEXT */}
                          <p className="text-sm md:text-base truncate flex">
                            <span className={`self-center ${selectedTags.includes(eachTag) ? "font-bold text-yellow-700" : "text-gray-600"} flex`}>{eachTag}</span>
                            &nbsp;
                            <span className={`text-xs md:text-sm self-center translate-y-px flex ${kosugi.className} ${selectedTags.includes(eachTag) ? "text-yellow-700/60" : "text-gray-500/60"}`}>
                              ({artworks.filter(artwork => artwork.tags?.includes(eachTag)).length})
                            </span>
                          </p>

                        </div>
                      ))}
                    </div>

                    <hr className="border-gray-400/60 w-full mx-auto hidden md:block" />
                  </div>
                ))}

                <p 
                  className={`
                    ${tagStates.some(Boolean) ? "rotate-180" : "pt-1.5"}
                    ${sono.className} 
                    text-[10px] text-center hidden md:flex 
                    cursor-pointer text-gray-400 self-center
                  `}  
                  onClick={expandTagsHandler}
                >
                  ▼
                </p>
                
              </div>
              
            </div>
            
          </div>

          {/* RIGHT / ART */}
          <div className="flex flex-col flex-85 items-center min-h-100 md:min-h-153 bg-gray-600/10 relative">
            {/* ARTWORK */}
            <div 
              className={`
                grid 
                ${currentArtworks.length === 0 || "gap-0.5 py-0.5 md:gap-1 md:p-1"}
                ${currentArtworks.length === 1 
                ? "grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
                : currentArtworks.length === 2
                ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
                : "grid-cols-3 md:grid-cols-3 lg:grid-cols-3"
                }
                transition-padding duration-500 ease-in-out
                ${tagHide ? "px-0.5 md:px-12" : "px-0.5"}
              `}
            >
              {currentArtworks.map((artwork, index) => (
                <div
                  key={artwork.id}
                  className="
                  flex flex-col items-center justify-center
                  relative cursor-pointer rounded-sm
                  overflow-hidden transition-scale duration-400
                  hover:scale-98
                  "
                  onClick={() => openLightBox(startIndex + index)}
                >
                  <p 
                    className={`
                    absolute bottom-0 text-white bg-black/60 w-full text-xs md:text-sm
                    backdrop-blur-xs truncate py-1.5 md:py-2 pl-2 md:pl-3 pr-[20%]
                    ${kosugi.className}
                    `}
                  >
                    {artwork.title}
                  </p>

                  <img src={artwork.url} className={`nonsel pointer-events-none aspect-3/4 md:aspect-square object-cover`} />

                </div>
              ))}
            </div>

            {/* NO ART MSG */}
            {filteredArtworks.length === 0 && (
              <div className="text-center flex flex-col gap-2 inset-0 items-center justify-center p-4 text-nowrap absolute nonsel pointer-events-none">

                <p className={`
                  md:text-9xl text-7xl text-[#17191a]/20
                  ${face === sadFaces[2] && "translate-x-6"}
                  ${noto.className}
                `}>
                  {face}
                </p>

                <p className={`text-[#17191a] text-xs md:text-sm ${sono.className}`}>
                  nothing to see here...
                </p>

                <button
                  onClick={() => {
                    setSelectedTags([]);
                    setCurrentPage(1);
                  }}
                  className={`
                    self-center justify-center p-4 px-8 rounded-md 
                    flex pointer-events-auto cursor-pointer
                    transition-all duration-300 text-xl mt-6 border-red-900/50 border-2
                    bg-red-200 hover:bg-red-500 text-red-900 hover:text-white font-bold
                    ${kosugi.className}
                  `}
                >
                  CLEAR ALL SELECTED TAGS
                </button>

              </div>
            )}
          </div>

        </div>

        {/* PAGE BUTTONS */}
        <div 
          className={`
          bg-[rgb(44,47,48)] flex items-center 
          justify-center gap-2 w-full 
          border-[#17191a]
          min-[1152px]:border-x py-6
          `}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`
                cursor-pointer border
                ${currentPage === pageNum
                  ? "bg-yellow-200 text-yellow-900 border-yellow-700/50 font-semibold"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-yellow-100 hover:text-yellow-800 hover:border-yellow-500/40"
                }
                ${kosugi.className}
                transition-bg duration-300
                rounded-full aspect-square
                h-8 w-8
              `}
            >
              {pageNum}
            </button>
          ))}

          {currentArtworks.length > 0 || (
            <p className="h-8 text-white">
              ...
            </p>
          )}
          
        </div>
      </div>

      {/* FOOTER */}
      <Footer />

      {/* OPEN CONTENT */}
      <div
        className={`
          ${contentVisible ? "opacity-0 nonsel pointer-events-none" : "opacity-100"} 
          ${bodoni.className}
          z-50 fixed bottom-4 left-4 md:bottom-8 md:left-8
          text-5xl md:text-7xl lg:text-8xl text-yellow-300 md:text-white hover:text-yellow-300
          font-bold transition-all duration-300
        `}
        onClick={() => setContentVisible(true)}
      >
        <p className="cursor-pointer">take me back!</p>
        <p className="block md:hidden text-xs">(tap the bg to view the full image)</p>
      </div>

      {/* BACKGROUND */}
      <div 
        className={`fixed inset-0 overflow-hidden z-10 scale-250 cursor-pointer origin-top-left ${contentVisible && "nonsel pointer-events-none"}`}
        onClick={() => setBgLightBoxOpen(true)}
      >
        <Marquee speed={5} gradient={false} className="h-screen -mr-px" direction="left" autoFill={true}>
          <img 
            src={`/images/${contentVisible ? "gallery-bg-blurred" : "gallery-bg"}.png`}
            alt="" 
            className="h-screen w-auto"
          />
        </Marquee>
      </div>

      {/* LIGHTBOX */}
      <Lightbox
        open={lightBoxOpen}
        close={() => setLightBoxOpen(false)}
        slides={slides}
        index={currentIndex}
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
            backgroundColor: "rgba(0, 0, 0, 0.80)",
            backdropFilter: "blur(4px)",
          },
        }}
        captions={{
          showToggle: true,
          descriptionTextAlign: "center",
          descriptionMaxLines: 10,
        }}
      />

      {/* FEATURED ART LIGHTBOX */}
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
            backgroundColor: "rgba(0, 0, 0, 0.80)",
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

      {/* BG LIGHTBOX */}
      <Lightbox
        open={bgLightBoxOpen}
        close={() => setBgLightBoxOpen(false)}
        slides={BgArtworkRefs}
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
            backgroundColor: "rgba(0, 0, 0, 0.80)",
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
  )};