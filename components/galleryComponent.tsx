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

  const [ready, setReady] = useState(false);

  return (
    <main className="w-screen min-h-screen justify-center align-center items-center flex flex-col relative">

      {/* HEADER */}
      <div className="w-7xl max-w-screen flex flex-col justify-end items-center h-[12vh]">
        <p className="text-white">gallery</p>  
      </div>

      {/* CONTENT */}
      <div className="bg-white/50 w-7xl max-w-screen min-h-screen flex flex-col border-2 border-black border-b-0">

        {/* TOP */}
        <div className="bg-black/30 w-full max-h-160 grid grid-cols-[1.618fr_1fr] gap-4 p-4">

          {/* FEATURED ART */}
          <div className="flex flex-col items-center bg-black/20 ">
            <img src={featArtwork?.url}
              className={`nonsel max-h-152 cursor-pointer`} 
              onClick={() => setFeaturedLightBoxOpen(true)}
            />
          </div>

          {/* INFO */}
          <div className="p-4 flex flex-col items-center justify-center bg-black/20">
            <p>welcome to the gallery!</p>
            <p>- whats my process?</p>
            <p>- thing here</p>
            <p>- sdfdsfsdf</p>
            <p>- sdfdsfsdf</p>
            <p>- sdfdsfsdf</p>
            <p>- sdfdsfsdf</p>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="flex-col">

          {/* TAGS */}
          <div className="flex flex-wrap items-center justify-around gap-2 p-4 bg-gray-100">
            <div>
            {renderTags.map(tag => (
              <label 
                key={tag}
                className="flex items-center gap-2 cursor-pointer px-2 rounded bg-white hover:bg-gray-50 border-2 transition-colors"
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
                <span className="">{tag}</span>
              </label>
            ))}
            </div>

            <div>
            {characterTags.map(tag => (
              <label 
                key={tag}
                className="flex items-center gap-2 cursor-pointer px-2 rounded bg-white hover:bg-gray-50 border-2 transition-colors"
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
                <span className="">{tag}</span>
              </label>
            ))}
            </div>

            <div>
            {typeTags.map(tag => (
              <label 
                key={tag}
                className="flex items-center gap-2 cursor-pointer px-2 rounded bg-white hover:bg-gray-50 border-2 transition-colors"
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
                <span className="">{tag}</span>
              </label>
            ))}
            </div>

            <div>
            {originalTags.map(tag => (
              <label 
                key={tag}
                className="flex items-center gap-2 cursor-pointer px-2 rounded bg-white hover:bg-gray-50 border-2 transition-colors"
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
                <span className="">{tag}</span>
              </label>
            ))}
            </div>

            <label 
              className="flex items-center gap-2 cursor-pointer px-2 rounded bg-white hover:bg-gray-50 border-2 transition-colors"
              style={{
                borderColor: selectedTags.includes("mier") ? '#000' : '#e5e7eb'
              }}
            >
              <input
                type="checkbox"
                checked={selectedTags.includes("mier")}
                onChange={() => toggleTag("mier")}
                className="cursor-pointer"
              />
              <span className="">mier</span>
            </label>
            
          </div>

          {selectedTags.length > 0 && (
            <button
              onClick={() => {
                setSelectedTags([]);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded bg-red-100 hover:bg-red-200 text-red-700"
            >
              clear
            </button>
          )}

          {/* ARTWORK COUNT */}
          {selectedTags.length > 0 && (
            <p className="text-sm text-gray-600 px-4">
              {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''} with tags: {selectedTags.join(', ')}
            </p>
          )}

          {/* ARTWORK */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:p-4">
            {currentArtworks.map((artwork, index) => (
              <div key={artwork.id} className="flex flex-col items-center justify-center relative cursor-pointer" onClick={() => openLightBox(startIndex + index)}>
                <p className="absolute bottom-0 text-white bg-black/60 backdrop-blur-xs truncate py-1 md:py-2 px-2 md:px-3 w-full text-sm md:text-base">{artwork.title}</p>
                <img src={artwork.url} className={`nonsel pointer-events-none aspect-square object-cover`} />
              </div>
            ))}
          </div>

          {/* NO ART MSG */}
          {filteredArtworks.length === 0 && (
            <p className="text-center p-8 text-gray-500">u_u</p>
          )}

          {/* PAGE BUTTONS */}
          <div className="flex items-center justify-center gap-2 w-full p-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded ${
                  currentPage === pageNum 
                    ? 'bg-black text-white' 
                    : 'bg-white hover:bg-gray-200'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

        </div>

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

    </main>
  )};