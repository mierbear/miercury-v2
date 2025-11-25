"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import ArtistList from "./artistList";
import ArtistType from "../types/artist";


export default function SantaForm() {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("artists")
      .insert({ name: name })
      
    if (error) {
      console.log("error:", error);
      return;
    }

    console.log("data:", data);

    fetchArtists();
    setName("");
  };

  const [currentArtists, setCurrentArtists] = useState<ArtistType[]>([]);

  const fetchArtists = async () => {
    const { error, data } = await supabase
    .from("artists")
    .select("*")
    .order("created_at", {ascending: true});
    
    if (error) {
      console.log("error:", error);
      return;
    }
    
    console.log("data:", data);
    setCurrentArtists(data);
    
  };

  useEffect(() => {
    fetchArtists();
  }, []);


  return (
    <div>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="name!!"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">submit</button>
      </form>
        <button onClick={fetchArtists}>log artists</button>

        <ul>
          <ArtistList artists={currentArtists}/>
        </ul>
    </div>
  );
}
