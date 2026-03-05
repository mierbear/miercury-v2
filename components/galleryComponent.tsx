"use client";
import { useEffect, useRef, useState } from "react";
import supabase from "@/lib/supabaseClient";
import ArtType from "@/types/artType";
import type { SlideImage } from "yet-another-react-lightbox";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import { Oranienbaum, Gowun_Batang, Sono } from "next/font/google";

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

  useEffect(() => {
    setReady(true);
    fetchFeatArt();
    fetchArtworks();
  }, []);

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

  const [featArtOpen, setFeatArtOpen] = useState(true);

  const toggleFeatArt = () => {
    setFeatArtOpen(!featArtOpen)
    console.log(featArtOpen);
  }

  type TabTypes = "main" | "process" | "comms" | "tools" | "inspos";
  const [currentTab, setCurrentTab] = useState<TabTypes>("main")

  const openTab = (tab:TabTypes) => {
    setCurrentTab(tab);
    if (tab !== "main") {
      setFeatArtOpen(false);
    } else {
      setFeatArtOpen(true);
    }
  }

  const [ready, setReady] = useState(false);

  return (
    <div className="w-screen min-h-screen justify-center align-center items-center flex flex-col relative bg-[#17191a]">

      {/* TITLE */}
      <div className="w-7xl max-w-screen flex flex-col justify-end items-center h-[12vh]">
        {/* <p className="text-white">gallery</p> */}
      </div>

      {/* CONTENT */}
      <div className="w-7xl max-w-screen flex flex-col">

        {/* HEADER */}
        <div className="md:max-h-180 md:min-h-180 flex flex-col md:flex-row items-center justify-center">

          {/* FEATURED ART */}
          <div className={`flex flex-col ${featArtOpen ? "flex-70" : "flex-0"} transition-flex duration-1000 ease-in-out nonsel justify-center items-center relative cursor-pointer overflow-hidden`}
          onClick={() => setFeaturedLightBoxOpen(true)} 
          >
            <img src={featArtwork?.url}
              className={`
                pointer-events-none cursor-pointer
                aspect-video object-cover

                min-h-180
                max-h-[60vh]
                min-w-screen
                max-w-screen
                min-[768px]:max-h-180
                min-[768px]:min-w-1
                `}
            />
            <div className="
              absolute bottom-4 md:left-4 hover:opacity-0 transition-opacity duration-300
              flex flex-col px-4 py-2 text-nowrap
              items-center justify-center nonsel cursor-pointer"
              >
              <p className={`md:text-5xl text-3xl font-bold text-center meow text-white ${oranienbaum.className}`}>"{featArtwork?.title}"</p>
              <p className={`text-xs md:self-start meow ${sono.className} text-white`}>({featArtwork?.date})</p>
            </div>
          </div>

          {/* INFO */}
          <div className={`flex flex-col ${featArtOpen ? "flex-30" : "flex-100"} transition-flex duration-1000 ease-in-out bg-gray-200 w-full md:h-180 self-start p-4`}>
            <p className={`text-4xl text-center ${oranienbaum.className}`}>Welcome to the Gallery!</p>

            <div className={`flex flex-col ${featArtOpen ? "flex-100" : "flex-30"} transition-flex duration-1000 ease-in-out`}>
              <p className="cursor-pointer hover:underline" onClick={() => openTab("main")}>- main</p>
              <p className="cursor-pointer hover:underline" onClick={() => openTab("process")}>- whats my process?</p>
              <p className="cursor-pointer hover:underline" onClick={() => openTab("tools")}>- what do i use?</p>
              <p className="cursor-pointer hover:underline" onClick={() => openTab("comms")}>- commissions?</p>
              <p className="cursor-pointer hover:underline" onClick={() => openTab("inspos")}>- who inspires you??</p>
            </div>

            <div className={`flex flex-col ${featArtOpen ? "flex-0" : "flex-70"} transition-flex duration-1000 ease-in-out`}>
              {currentTab === "main" && (
                <div>
                  <p>main</p>
                </div>
              )}
              
              {currentTab === "process" && (
                <div>
                  <p>process</p>
                </div>
              )}
              
              {currentTab === "comms" && (
                <div>
                  <p>comms</p>
                </div>
              )}

              {currentTab === "tools" && (
                <div>
                  <p>tools</p>
                </div>
              )}

              {currentTab === "inspos" && (
                <div>
                  <p>inspos</p>
                </div>
              )}
            </div>
           
          </div>

        </div>

        {/* MIDDLE */}
        <div className="h-3 bg-black">

        </div>

        {/* TAGS/ARTWORKS */}
        <div className="flex md:flex-row flex-col bg-gray-100">

          {/* LEFT */}
          <div className="flex flex-col flex-15 md:items-center p-2 w-full">

            <p className={`font-bold md:text-2xl text-3xl ml-1 md:ml-0 translate-y-0.5 ${oranienbaum.className}`}>TAGS:</p>

            {/* TAGS */}
            <div className={`grid grid-cols-4 grid-rows-4 md:grid-cols-1 items-center justify-around gap-1 pt-2 ${selectedTags.length > 0 && "pb-2"} md:min-w-42 lg:min-w-50 w-full`}>
              {availableTags.map(tag => (
                <label 
                  key={tag}
                  className="flex items-center gap-2 cursor-pointer px-2 p-1 md:p-2 rounded bg-white h-full w-full hover:bg-gray-50 border transition-colors"
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
                  <p className={`${selectedTags.includes(tag) && 'font-bold'} text-sm md:text-base`}>{tag}</p>
                </label>
              ))}
            </div>
            
            {/* CLEAR / TAG INFO */}
            <div className={`flex flex-col transition-opacity duration-600 ${selectedTags.length > 0 ? "gap-1 md:gap-2 py-2 md:pb-4 px-2 opacity-100" : "opacity-0"} md:px-0 justify-center w-full`}>
              
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
                        <span className="underline">{tag}</span>
                        {index < selectedTags.length - 1 && ', '}
                      </span>
                    ))}
                  </span>
                </p>
              )}

            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col flex-85 items-center justify-center min-h-[30vh] bg-black/10">
            {/* ARTWORK */}
            <div className={`grid gap-0.5 px-0.5 py-1 pl-0.5 ${
              
                  currentArtworks.length === 1 
                ? "grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
                : currentArtworks.length === 2
                ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
                : currentArtworks.length === 3
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                : currentArtworks.length === 4
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-2"
                : currentArtworks.length === 5
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                : currentArtworks.length === 6
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                : currentArtworks.length === 9
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"

                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              }`}
            >
              {currentArtworks.map((artwork, index) => (
                <div key={artwork.id} className="flex flex-col items-center justify-center relative cursor-pointer rounded-sm overflow-hidden" onClick={() => openLightBox(startIndex + index)}>
                  <p className="absolute bottom-0 text-white bg-black/60 backdrop-blur-xs truncate py-1 md:py-2 px-2 md:px-3 w-full text-sm md:text-base">{artwork.title}</p>
                  <img src={artwork.url} className={`nonsel pointer-events-none aspect-square object-cover`} />
                </div>
              ))}
            </div>

            {/* NO ART MSG */}
            {filteredArtworks.length === 0 && (
              <p className={`text-center p-4 text-black md:text-9xl text-7xl nonsel pointer-events-none ${sono.className}`}>
                u_u..
              </p>
            )}
          </div>

        </div>

        {/* PAGE BUTTONS */}
        <div className={`bg-gray-200 flex items-center justify-center gap-2 w-full ${currentArtworks.length > 0 && "py-3"}`}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`
                cursor-pointer
                ${currentPage === pageNum 
                  ? "bg-yellow-200 text-yellow-700"
                  : "bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
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
      <div className="h-40 flex items-center justify-center">
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