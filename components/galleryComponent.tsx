"use client";
import { useEffect, useRef, useState } from "react";
import supabase from "@/lib/supabaseClient";
import ArtType from "@/types/artType";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

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
  const [currentArt, setCurrentArt] = useState<string>("/images/pfp.png");

  const openLightBox = (url: string) => {
    setCurrentArt(url);
    setLightBoxOpen(true);
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
            <img src={featArtwork?.url} style={{ pointerEvents: "none" }} className={`nonsel max-h-152`} />
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
            {artworks.map((artwork) => (
              <div key={artwork.id} className="flex flex-col items-center justify-center relative cursor-pointer" onClick={() => openLightBox(artwork.url)}>
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
        slides={[{ src: currentArt }]}
        plugins={[Zoom]}
        zoom={{
          scrollToZoom: true,
          maxZoomPixelRatio: 5,
          zoomInMultiplier: 1.5,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
        }}
      />

    </main>
  )};