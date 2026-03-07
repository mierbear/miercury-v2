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
        <p className={`text-lg ${gowun.className} mt-3 text-justify`}>{art.description}</p>
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
              <p className={`text-lg ${gowun.className} mt-3 text-justify`}>{featArtwork.description}</p>
            </div>
          ),
        },
      ]
    : [];

  const [featArtFocus, setFeatArtFocus] = useState(true);

  type TabTypes = "enter" | null | typeof inquiry[number]["key"];
  const [currentTab, setCurrentTab] = useState<TabTypes>(null)
  const [answer, setAnswer] = useState("");
  const questionsRef = useRef<HTMLDivElement>(null);
  const chatboxTextRef = useRef<HTMLDivElement>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const openTab = (tab: TabTypes) => {
    if (!infoRef.current || !questionsRef.current || !chatboxRef.current) return;
    infoRef.current.style.pointerEvents = "none";
    resetTalk();

    if (tab === null) {
      setCurrentTab(tab);
      setOpenQuestions(false);
      const dotdotdot = "...";
      setAnswer(dotdotdot);
      mierTalk(dotdotdot, 400);
      questionsRef.current.style.opacity = "0";
      setTimeout(() => {
        chatboxRef.current!.style.opacity = "0";
        infoRef.current!.style.pointerEvents = "auto";
      }, 2000);

    } else {
      setCurrentTab(tab);
      setOpenQuestions(true);
      chatboxRef.current.style.opacity = "100";
      setTimeout(() => {
        questionsRef.current!.style.opacity = "100";
      }, 500);

      if (tab === "enter") {
        const text = "what would you like to know?";
        setAnswer(text);
        mierTalk(text, 80);
      } else {
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

  const tap = () => {
    const sound = new Audio(`/audio/tap${Math.floor(Math.random() * 5)}.mp3`);
    sound.play();
  }

  const talkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mierTalk = (text: string, speed: number, i: number = 0) => {
    if (!chatboxTextRef.current) return;
    if (i >= text.length) return;
    tap();
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

  const [openQuestions, setOpenQuestions] = useState(false);

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
  
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    fetchFeatArt();
    fetchArtworks();
  }, []);

  return (
    <div className="w-screen min-h-screen justify-center align-center items-center flex flex-col relative bg-[#17191a] nonsel">

      {/* SPACE */}
      <div className="w-6xl max-w-screen flex flex-col justify-end items-center h-[12vh]">
        {/* <p className="text-white">gallery</p> */}
      </div>

      {/* CONTENT */}
      <div className="w-6xl max-w-screen flex flex-col">

        {/* HEADER */}
        <div className="w-full h-12 bg-white rounded-t-2xl">

        </div>

        {/* MAIN */}
        <div className="md:max-h-180 md:min-h-180 flex flex-col md:flex-row items-center justify-center">

          {/* FEATURED ART */}
          <div className={`flex flex-col ${openQuestions ? "flex-38" : "flex-62"} transition-flex duration-1000 nonsel justify-center items-center relative cursor-pointer overflow-hidden`}
          onClick={() => setFeaturedLightBoxOpen(true)} 
          >
            <img src={featArtwork?.url}
              onLoad={handleImageLoad}
              className={`
                pointer-events-none cursor-pointer
                object-cover

                min-h-180
                max-h-[60vh]
                min-w-[95vw]
                max-w-[95vw]
                min-[768px]:max-h-180
                min-[768px]:min-w-full
                `}
            />
            <div className={`
              absolute bottom-4 md:left-4 hover:opacity-0 transition-all duration-500
              flex flex-col px-4 py-2 text-nowrap md:origin-bottom-left
              items-center justify-center nonsel cursor-pointer
              ${openQuestions ? "scale-80 opacity-60" : "scale-100 opacity-100"}
              `}
              >
              <p className={`md:text-5xl text-4xl font-bold text-center meow text-white ${oranienbaum.className}`}>"{featArtwork?.title}"</p>
              <p className={`text-xs md:self-start meow ${sono.className} text-white`}>({featArtwork?.date})</p>
            </div>
          </div>

          {/* INFO */}
          <div
            className={`
              flex flex-col items-center
              ${openQuestions ? "flex-62" : "flex-38"}
              transition-flex duration-1000 bg-gray-200
              w-full md:h-180 self-start overflow-hidden
            `}
            ref={infoRef}
            >

            {/* TOP / ILLUSTRATION */}
            <div className={`flex flex-col items-center h-full w-full transition-flex duration-500 ${openQuestions ? "flex-72" : "flex-84"} py-3 pb-0 gap-2`}>

              {/* TITLE */}
              <p className={`lg:text-3xl md:text-2xl text-center ${oranienbaum.className}`}>{openQuestions ? "ask and you shall recieve..." : "welcome to the gallery!"}</p>

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

              {/* BACK */}
              <p className={`
                cursor-pointer text-sm transition-opacity duration-800 absolute bottom-3 left-4
                ${openQuestions ? "opacity-100" : "opacity-0 pointer-events-none nonsel"}`} 
                onClick={() => openTab(null)}
                >
                ○ <span className="hover:underline">take me back!</span>
              </p>

              {/* OPEN QUESTIONS */}
              <p
                className={`absolute top-2 text-2xl cursor-pointer transition-opacity duration-500 ${openQuestions ? "opacity-0" : "opacity-100"}`}
                onClick={() => openTab("enter")}
              >
                have a question?
              </p>
              
              {/* QUESTIONS */}
              <div 
                className={`
                  grid grid-cols-3 gap-0.5 gap-x-8 lg:gap-x-12
                  transition-opacity duration-200 opacity-0
                  whitespace-nowrap
                  ${!openQuestions && "nonsel pointer-events-none"}
                `}
                ref={questionsRef}
                >
                {inquiry.map(inquiry => (
                  <p key={inquiry.key} className="cursor-pointer text-sm lg:text-base flex items-center gap-2" onClick={() => openTab(inquiry.key)}>
                    <span className="-translate-y-px text-[8px]">●</span>
                    <span className="hover:underline -translate-y-px flex w-full">{inquiry.question}</span>
                  </p>
                ))}
              </div>

            </div>
           
          </div>

        </div>

        {/* MIDDLE */}
        <div className="h-20 flex items-center w-full bg-blue-300 p-2">

          {/* TAG INFO */}
          <div className="flex items-center w-full">

            <p
              className={`
              font-bold text-3xl
              hover:cursor-pointer
              ${oranienbaum.className}
              `}
              onClick={() => showTagsHandler()}
            >
              {tagHide ? "SHOW TAGS" : "HIDE TAGS"}
            </p>
            
            {/* CLEAR / TAG INFO */}
            <div className={`flex flex-col transition-opacity duration-600 justify-center`}>
              
              {/* CLEAR BUTTON */}
              {selectedTags.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedTags([]);
                    setCurrentPage(1);
                  }}
                  className={`
                    self-center justify-center px-3 py-2 
                    flex rounded cursor-pointer
                    transition-all duration-300
                    ${sono.className}
                    ${filteredArtworks.length === 0 ? "bg-red-200 hover:bg-red-300 text-red-700 w-[80%] font-bold" : "bg-yellow-100 hover:bg-yellow-200 text-yellow-700 w-[50%]"}
                  `}
                >
                  clear
                </button>
              )}

              {/* ARTWORK COUNT */}
              {selectedTags.length > 0 && (
                <p className="text-sm text-gray-600 text-center">
                  <span className="font-bold">{filteredArtworks.length === 0 ? "NO" : filteredArtworks.length}</span>&nbsp;
                  <span className="">artwork{filteredArtworks.length !== 1 && "s"} with tag{selectedTags.length > 1 && "s"}:</span><br />
                  <span className="italic">
                    {selectedTags.map((tag, index) => (
                      <span key={tag}>
                        <span
                        className="underline hover:cursor-pointer hover:text-red-500"
                        onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </span>
                        {index < selectedTags.length - 1 && ', '}
                      </span>
                    ))}
                  </span>
                </p>
              )}

            </div>

          </div>

        </div>

        {/* GALLERY */}
        <div className="flex md:flex-row flex-col bg-gray-100">

          {/* LEFT / TAGS */}
          <div className={`
            flex flex-col justify-center md:justify-start md:items-center
            transition-all duration-500 overflow-hidden md:mt-4 mx-2
            ${tagHide 
              ? "max-h-0 mt-0 md:h-auto md:mx-0 md:w-0" 
              : "max-h-45 my-2 md:w-42 lg:w-50 md:h-full md:max-h-full md:mt-0 md:mx-4 md:mb-4"}
          `}>

            {/* TAGS */}
            <div className={`
              grid grid-cols-4 grid-rows-4 md:grid-cols-1
              items-center justify-around gap-1 w-full overflow-hidden
              ${tagHide && "pointer-events-none"}
            `}>

              {availableTags.map(tag => (
                <label 
                  key={tag}
                  className="flex items-center gap-2 cursor-pointer px-2 p-1 md:p-2 rounded bg-white min-h-10 md:min-h-12 h-full w-full hover:bg-gray-50 border transition-colors"
                  style={{
                    borderColor: selectedTags.includes(tag) ? '#000' : '#e5e7eb'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                    className="cursor-pointer"
                  />
                  <p className={`${selectedTags.includes(tag) && 'font-bold'} text-xs sm:text-sm lg:text-base truncate`}>{tag}</p>
                </label>
              ))}
              
            </div>
            
          </div>

          {/* RIGHT / ART */}
          <div className="flex flex-col flex-85 items-center justify-center min-h-[30vh] bg-black/10 relative">
            {/* ARTWORK */}
            <div className={`grid gap-0.5 p-0.5 md:gap-1 md:p-2 ${
              
                  currentArtworks.length === 1 
                ? "grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
                : currentArtworks.length === 2
                ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
                : currentArtworks.length === 3
                ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
                : currentArtworks.length === 4
                ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
                : currentArtworks.length === 5
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                : currentArtworks.length === 6
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                : currentArtworks.length === 9
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"

                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
              }`}
            >
              {currentArtworks.map((artwork, index) => (
                <div
                  key={artwork.id}
                  className="
                  flex flex-col items-center justify-center
                  relative cursor-pointer rounded-sm
                  overflow-hidden transition-scale duration-400
                  hover:scale-97
                  "
                  onClick={() => openLightBox(startIndex + index)}
                >
                  <p className={`
                    absolute bottom-0 text-white bg-black/60
                    backdrop-blur-xs truncate py-1.5 md:py-2 pl-2 md:pl-3 pr-[20%]
                    w-full text-sm ${sono.className}`}>
                      {artwork.title}
                  </p>
                  <img src={artwork.url} className={`nonsel pointer-events-none aspect-square object-cover`} />
                </div>
              ))}
            </div>

            {/* NO ART MSG */}
            {filteredArtworks.length === 0 && (
              <div className="text-center flex flex-col inset-0 items-center justify-center p-4  text-nowrap absolute nonsel pointer-events-none">
                <p className={`
                  md:text-9xl text-7xl text-black/20
                  ${face === sadFaces[2] && "translate-x-6"}
                  ${oranienbaum.className}
                `}>
                  {face}
                </p>
                <p className={`text-black font-bold ${sono.className}`}>
                  nothing to see here...
                </p>
              </div>
            )}
          </div>

        </div>

        {/* PAGE BUTTONS */}
        <div className={`bg-gray-200 flex items-center justify-center gap-2 w-full ${currentArtworks.length > 0 && "py-4"}`}>
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
                text-xl rounded-full aspect-square
                h-10 w-10
              `}
            >
              {pageNum}
            </button>
          ))}
        </div>

      </div>

      {/* FOOTER */}
      <div className="h-40 flex items-center justify-center w-screen bg-black">
        <p className="text-white">footer</p>
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

    </div>
  )};