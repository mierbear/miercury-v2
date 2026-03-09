"use client";
import { useEffect, useRef, useState } from "react";
import supabase from "@/lib/supabaseClient";
import ArtType from "@/types/artType";
import type { SlideImage } from "yet-another-react-lightbox";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import { Oranienbaum, Gowun_Batang, Sono, Kosugi_Maru } from "next/font/google";
import Marquee from "react-fast-marquee";

const oranienbaum = Oranienbaum({
  weight: "400",
  subsets: ["latin"],
})

const gowun = Gowun_Batang({
  weight: "400",
  subsets: ["latin"],
})

const sono = Sono({
  weight: "400",
  subsets: ["latin"],
})

const kosugi = Kosugi_Maru({
  weight: "400",
  subsets: ["latin"],
})

export default function GalleryComponent() {

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const renderTags = 
    [
      "sketch", 
      "rendered", 
    ]

  const characterTags = 
    [
      "oc", 
      "fanart", 
    ]

  const typeTags = 
    [
      "favorite", 
      "shitpost", 
    ]
  const originalTags = 
    [
      "pp",
      "mtwim",
      "flower delivery",
      "skulls",
      "cave hermit",
      "simeons descent",
      "mier",
    ]

  const availableTags = [
    ...renderTags, 
    ...characterTags, 
    ...typeTags, 
    ...originalTags
  ];

  const [artworks, setArtworks] = useState<ArtType[]>([]);
  const [featArtwork, setFeatArtwork] = useState<ArtType | null>(null);

  // const isPhone = typeof window !== "undefined" &&
  // window.matchMedia("(pointer: coarse)").matches;
    
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
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
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
      <div className="hover:opacity-0 transition-opacity duration-300 flex flex-col px-8 py-4 border-gray-400 border bg-black/80 max-w-[85ch] backdrop-blur-[3px] rounded-sm items-center justify-center">
        <p className={`text-4xl font-bold ${oranienbaum.className}`}>{art.title}</p>
        <p className={`text-xs ${sono.className} text-gray-300`}>({art.date})</p>
        <div className="flex gap-2">
          {art.tags.map((tag, index) => 
            <p key={index} className={`text-xs ${sono.className} text-gray-400`}>#{tag}</p>
          )}
        </div>
        <p className={`text-lg ${gowun.className} mt-3 text-center`}>{art.description}</p>
      </div>
    ),
  }));
  
  const featuredArtworkRefs: SlideImage[] = featArtwork?.url
    ? [
        {
          src: featArtwork.url,
          description: (
            <div className="hover:opacity-0 transition-opacity duration-300 flex flex-col px-8 py-4 border-gray-400 border bg-black/80 max-w-[85ch] backdrop-blur-[3px] rounded-sm items-center justify-center">
              <p className={`text-4xl font-bold ${oranienbaum.className}`}>{featArtwork.title}</p>
              <p className={`text-xs ${sono.className} text-gray-300`}>({featArtwork.date})</p>
              <div className="flex gap-2">
                {featArtwork.tags.map((tag, index) => 
                  <p key={index} className={`text-xs ${sono.className} text-gray-400`}>#{tag}</p>
                )}
              </div>
              <p className={`text-lg ${gowun.className} mt-3 text-center`}>{featArtwork.description}</p>
            </div>
          ),
        },
      ]
    : [];

  const BgArtworkRefs: SlideImage[] = [
    {
      src: "/images/gallery-bg-full.jpg",
      description: (
        <div className="hover:opacity-0 transition-opacity duration-300 flex flex-col px-8 py-4 border-gray-400 border bg-black/80 max-w-[85ch] backdrop-blur-[3px] rounded-sm items-center justify-center">
          <p className={`text-4xl font-bold ${oranienbaum.className}`}>Gallery Background</p>
          <p className={`text-lg ${gowun.className} mt-3 text-center`}>just a bunch of sketches i gathered from 2025-2026, took a while to do</p>
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

  const openTab = (tab: TabTypes) => {
    if (!infoRef.current || !questionsRef.current || !chatboxRef.current) return;
    infoRef.current.style.pointerEvents = "none";
    resetTalk();

    // LEAVE
    if (tab === null) {
      setCurrentTab(tab);
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
        const data = inquiry.find(item => item.key === tab);
        if (data) {
          setAnswer(data.answer);
          mierTalk(data.answer, 80);
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
      answer: "process",
    },
    { 
      key: "tools",
      question: "what do you use?",
      answer: "tools",
    },
    { 
      key: "comms",
      question: "commissions?",
      answer: "comms",
    },
    { 
      key: "inspos",
      question: "who do you look up to?",
      answer: "inspos",
    },
    { 
      key: "beauty",
      question: "controversial art takes?",
      answer: "beauty",
    },
    
    { 
      key: "colors",
      question: "favorite colors?",
      answer: "colors",
    },
    { 
      key: "consistency",
      question: "are you consistent?",
      answer: "consistency",
    },
    { 
      key: "critique",
      question: "worst fundamental?",
      answer: "critique",
    },
    { 
      key: "proud",
      question: "favorite fundamental?",
      answer: "proud",
    },
    { 
      key: "advice",
      question: "any advice?",
      answer: "advice",
    },
    { 
      key: "resource",
      question: "any resources?",
      answer: "resource",
    },
    { 
      key: "meow",
      question: "mrow?",
      answer: "meow",
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

    console.log("orientation: ", orient);
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
  const [bgOrigin, setBgOrigin] = useState<string>("origin-center");

  const [ready, setReady] = useState(false);
  useEffect(() => {
    setBgOrigin(randomizer(["origin-top-left", "origin-center"]));
    setReady(true);
    fetchFeatArt();
    fetchArtworks();
    if (isPhone) {
      setTagHide(true);
    }
  }, []);

  return (
    <div className="w-screen min-h-screen justify-center align-center items-center flex flex-col relative bg-[#17191a] nonsel">

      {/* SPACE */}
      <div className="w-6xl max-w-screen flex flex-col justify-end items-center h-32">
        {/* <p className="text-white">gallery</p> */}
      </div>

      {/* CONTENT */}
      <div className={`w-6xl max-w-screen flex flex-col transition-opacity duration-500 z-50 ${contentVisible ? "opacity-100" : "opacity-0 pointer-events-none nonsel"}`}>

        {/* HEADER */}
        <div className="w-full h-8 bg-white text-black rounded-t-xl flex items-center">
          <p 
            className={`cursor-pointer text-xs flex items-center gap-2 ml-auto mr-3 ${sono.className}`}
            onClick={() => setContentVisible(false)}
          >
            <span className="">●</span>
            <span className="hover:underline -translate-y-px flex w-full">see background?</span>
          </p>
        </div>

        {/* MAIN */}
        <div className="max-h-160 min-h-160 flex flex-row items-center justify-center bg-[#17191a]">

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
              <p className={`md:text-5xl text-4xl font-bold text-center meow text-white ${oranienbaum.className}`}>"{featArtwork?.title}"</p>
              <p className={`text-xs md:self-start meow ${sono.className} text-white`}>({featArtwork?.date})</p>
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
                <p className={`text-2xl text-center text-nowrap ${oranienbaum.className}`}>
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

              {/* ILLUST */}
              <div className={`w-full transition-w duration-1000 h-full bg-black/20 flex items-center justify-center relative`}>
                

                {/* CHATBOX */}
                <div
                  className="max-w-[90%] max-h-[28%] rounded-sm p-2 bg-yellow-200/70 absolute bottom-2 flex items-center justify-center text-justify opacity-0 transition-opacity duration-500"
                  ref={chatboxRef}
                >
                  <p className={`text-sm md:text-base px-4 ${kosugi.className}`} ref={chatboxTextRef}>
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
        <div className="h-auto flex flex-col items-center w-full bg-[#b6c2c5]/50">

          {/* INTERACT / WELCOME */}
          <div className={`h-40 flex flex-col items-center w-full ${sono.className} relative text-white`}>

            <p className=" md:text-2xl text-center p-4 self-center flex gap-2">
              <span className="spin flex self-center text-yellow-300 white-glow">★</span>
                welcome to the gallery!
              <span className="spin flex self-center text-yellow-300 white-glow">★</span>
            </p>

            <hr className="border-white/50 w-full block mx-4" />

            <div className="flex h-full w-full">

              <div className="flex flex-col p-4 h-full w-[62%] text-xs lg:text-sm">
                <p>MROW intro hello</p>
                <p>make this mid section transparent with floating divs? maybe drawing around here too</p>
              </div>


              {/* INTERACTABLES */}
              <div className="flex flex-col p-4 h-full bg-white/20 w-[38%] text-xs lg:text-sm">
                <p 
                  className={`
                  cursor-pointer flex items-center gap-2`}
                  onClick={openQuestions === "closed" ? () => openQuestionHandler() : undefined}
                >
                  <span className="-translate-y-px text-[12px]">●</span>
                  <span className="hover:underline -translate-y-px flex w-full">i have questions (a lot)</span>
                </p>
              </div>

            </div>

          </div>

          {/* TAGS SECTION */}
          <div 
            className={`
            flex w-full rounded bg-[#7a8896] bg-[url("/images/gallery-banner-mobile.png")] md:bg-[url("/images/gallery-banner.png")]
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
                rounded-md border-black/40 border text-black/70 hover:text-black
                ${kosugi.className}
                `}
                onClick={() => showTagsHandler()}
              >
                {tagHide ? "SHOW TAGS" : "HIDE TAGS"}
              </p>

              {/* ARTWORK COUNT */}
              <div className="text-xs lg:text-sm text-white text-center">
                {selectedTags.length > 0 ? (
                  <p>
                    <span className="font-bold">{filteredArtworks.length === 0 ? "NO" : filteredArtworks.length}</span>&nbsp;
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
                    <span className="font-bold">{filteredArtworks.length}</span>
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

        </div>

        {/* GALLERY */}
        <div className={`flex md:flex-row flex-col bg-gray-100`}>

          {/* LEFT / TAGS */}
          <div className={`
            flex flex-col justify-center md:justify-start md:items-center
            transition-all duration-500 overflow-hidden md:mt-4 mx-2
            ${tagHide 
              ? "max-h-0 mt-0 md:h-auto md:mx-0 md:w-0" 
              : "max-h-58 my-2 md:w-42 lg:w-50 md:h-full md:max-h-full md:mt-0 md:mx-4 md:mb-4"}
          `}>

            {/* TAGS */}
            <div className={`
              grid grid-cols-3 md:grid-cols-1
              items-center justify-around gap-1 w-full overflow-hidden
              transition-opacity
              ${tagHide ? "pointer-events-none opacity-0 duration-400" : "opacity-100 duration-600"}
              `}
            >

              {availableTags.map(tag => (
                <label 
                  key={tag}
                  className={`
                    flex items-center gap-2 cursor-pointer px-2 p-1 md:p-2
                    rounded bg-white min-h-10 md:min-h-12 h-full w-full
                    hover:bg-gray-50 border transition-colors
                    ${selectedTags.includes(tag) ? "border-black/40" : "border-black/10"}
                  `}
                >
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                    className="cursor-pointer"
                  />
                  <p className={`text-xs sm:text-sm lg:text-base`}>
                    <span className={`${selectedTags.includes(tag) && 'font-bold'} truncate`}>
                    {tag}
                    </span>
                    &nbsp;
                    <span className={`text-xs sm:text-sm text-black/80`}>
                    ({artworks.filter(artwork => artwork.tags?.includes(tag)).length})
                    </span>
                  </p>
                </label>
              ))}
              
            </div>
            
          </div>

          {/* RIGHT / ART */}
          <div className="flex flex-col flex-85 items-center min-h-[30vh] bg-black/10 relative">
            {/* ARTWORK */}
            <div 
              className={`
                grid gap-0.5 py-0.5 md:gap-1 md:p-1
                ${currentArtworks.length === 1 
                ? "grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
                : currentArtworks.length === 2
                ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
                : "grid-cols-3 md:grid-cols-3 lg:grid-cols-3"
                }
                transition-px duration-500 ease-in-out
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
                    ${sono.className}
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
              <div className="text-center flex flex-col gap-2 inset-0 items-center justify-center p-4  text-nowrap absolute nonsel pointer-events-none">

                <p className={`
                  md:text-9xl text-7xl text-black/20
                  ${face === sadFaces[2] && "translate-x-6"}
                  ${oranienbaum.className}
                `}>
                  {face}
                </p>

                <p className={`text-black text-xs md:text-sm font-bold ${sono.className}`}>
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
                    transition-all duration-300 text-xl mt-6 border-yellow-700/40 border
                    bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-bold
                    ${kosugi.className}
                  `}
                >
                  clear all selected tags?
                </button>

              </div>
            )}
          </div>

        </div>

        {/* PAGE BUTTONS */}
        <div className={`bg-gray-200 flex items-center justify-center gap-2 w-full ${currentArtworks.length > 0 && "py-6"}`}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`
                cursor-pointer
                ${currentPage === pageNum 
                  ? "bg-black text-white"
                  : "bg-black/60 hover:bg-black/80 text-white"
                }
                ${sono.className}
                transition-bg duration-300
                text-xs rounded-full aspect-square
                h-8 w-8
              `}
            >
              {pageNum}
            </button>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className={`${contentVisible ? "h-40 flex items-center justify-center w-screen bg-black z-50" : "hidden"}`}>
        <p className="text-white">footer</p>
      </div>

      {/* OPEN CONTENT */}
      <div
        className={`
          ${contentVisible ? "opacity-0 nonsel pointer-events-none" : "opacity-100"} 
          ${sono.className}
          z-50 fixed bottom-4 left-4 md:bottom-8 md:left-8
          text-2xl md:text-6xl text-yellow-300 md:text-white hover:text-yellow-300
          font-bold meow transition-all duration-300
        `}
        onClick={() => setContentVisible(true)}
      >
        <p className="cursor-pointer">take me back!</p>
        <p className="block md:hidden text-xs">(tap on the bg to view the full image)</p>
      </div>

      {/* BACKGROUND */}
      <div 
        className={`fixed inset-0 overflow-hidden z-10 scale-250 cursor-pointer ${bgOrigin} ${contentVisible && "nonsel pointer-events-none"}`}
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