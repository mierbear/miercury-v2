"use client";
import { useEffect, useRef, useState } from "react";
import supabase from "@/lib/supabaseClient";
import ArtType from "@/types/artType";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

export default function GalleryComponent() {

  const [artworks, setArtworks] = useState<ArtType[]>([]);
  const [featArtwork, setFeatArtwork] = useState<ArtType | null>(null);
    
  const fetchArt = async () => {
    const { error, data } = await supabase
      .from("art")
      .select("*")
      .eq("featured", true)
    
    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }
    
    console.log(data);
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
    
    console.log(data);
    setArtworks(data);
  }

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    fetchArt();
    fetchArtworks();
  }, []);

  const [lightBoxOpen, setLightBoxOpen] = useState(false);
  const [featuredLightBoxOpen, setFeaturedLightBoxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightBox = (index: number) => {
    setCurrentIndex(index);
    setLightBoxOpen(true);
  }

  const slides = artworks.map((art) => ({
    src: art.url,
    title: (
      <p className="flex items-center text-xl">{art.title} ✦ <span className="text-xs ml-2.75">({art.date})</span></p>
    ),
    description: (
      <div className="flex flex-col">
        <p className="text-2xl font-bold">{art.title}</p>
        <p className="text-xs">({art.date})</p>
        <p className="text-sm mt-2">{art.description}</p>
      </div>
    ),
  }));

  if (!featArtwork?.url) return null;

  const featuredArtworkRefs = {
    src: featArtwork?.url,
    title: (
      <p className="flex items-center text-xl">{featArtwork.title} ✦ <span className="text-xs ml-2.75">({featArtwork.date})</span></p>
    ),
    description: (
      <div className="flex flex-col">
        <p className="text-2xl font-bold">{featArtwork?.title}</p>
        <p className="text-xs">({featArtwork?.date})</p>
        <p className="text-sm mt-2">{featArtwork?.description}</p>
      </div>
    ),
  }


  return (
    <main className="w-screen min-h-screen justify-center align-center items-center flex flex-col relative">

      {/* HEADER */}
      <div className="w-300 max-w-screen flex flex-col justify-end items-center h-[12vh]">
        <p className="text-white">gallery</p>  
      </div>

      {/* CONTENT */}
      <div className="bg-white/50 w-300 max-w-screen min-h-screen flex flex-col border-2 border-black border-b-0">

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

          <div className="flex flex-col items-center w-full bg-amber-50">
            <p className="w-full">gallery</p>
            <p>gallery</p>
            <p>im still thinking about how to make the gallery lol</p>
            <p>i need to focus on drawing stuff for my website first..</p>
          </div>

          <div className="grid grid-cols-4 gap-2 p-4">
            {artworks.map((artwork, index) => (
              <div key={artwork.id} className="flex flex-col items-center justify-center relative cursor-pointer" onClick={() => openLightBox(index)}>
                <p className="absolute bottom-0 text-white pt-1 pb-4 px-2 w-full bg-black/60">{artwork.title}</p>
                <img src={artwork.url} className={`nonsel pointer-events-none aspect-square object-cover`} />
              </div>
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
          pinchZoomDistanceFactor: 600,
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
        }}
      />

      {/* FEATURED ART LIGHTBOX */}
      <Lightbox
        open={featuredLightBoxOpen}
        close={() => setFeaturedLightBoxOpen(false)}
        slides={[featuredArtworkRefs]}
        plugins={[Zoom, Captions, Fullscreen]}
        zoom={{
          scrollToZoom: true,
          maxZoomPixelRatio: 10,
          zoomInMultiplier: 1.5,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          wheelZoomDistanceFactor: 600,
          pinchZoomDistanceFactor: 600,
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
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />

    </main>
  )};