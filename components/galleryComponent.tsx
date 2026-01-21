"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import ArtType from "@/types/artType";

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

  return (
    <main className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col">

      <div className="w-300 max-w-screen flex flex-col justify-end items-center h-[12vh]">
        <p className="text-white">gallery</p>  
      </div>

      {/* CONTENT */}
      {/* DONT FORGET TO REMOVE MIN H SCREEN */}
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
        <div className="grid grid-cols-4 gap-2 p-2">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="flex flex-col items-center justify-center relative">
              <p className="absolute bottom-0 text-white px-2 py-0.5 w-full bg-black/60">{artwork.title}</p>
              <img src={artwork.url} className={`nonsel pointer-events-none aspect-square object-cover`} />
            </div>
          ))}
        </div>

      </div>
    </main>
  )};