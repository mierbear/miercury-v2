"use client";
import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/lib/supabase-client";

export default function SantaForm() {
  const [name, setName] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("artists")
      .insert({ name: name })
      
    console.log("data:", data);
    console.log("error:", error);

    setName("");
  };

  return (
    <div className="min-w-screen min-h-screen align-center items-center flex flex-col relative">
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="name!!"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">submit</button>
      </form>
    </div>
  );
}
