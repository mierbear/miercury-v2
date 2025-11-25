"use client";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { Session } from "@supabase/supabase-js";
import RequestList from "./requestList";
import RequestInfo from "../../types/requestInfo";


export default function SantaForm({session}: {session: Session}) {
  const [notes, setNotes] = useState("");
  const [taskImage, setTaskImage] = useState<File | null>(null)

  const uploadImage = async (file: File): Promise<string | null> => {

    const filePath = `${file.name}-${Date.now()}`;

    const { error } = await supabase.storage.from("request-images").upload(filePath, file);

    if (error) {
      console.error("error uploading image:", error);
      return null;
    }

    const { data } = await supabase.storage.from("request-images").getPublicUrl(filePath);

    return data.publicUrl;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageURL: string | null = null;
    if (taskImage) {
      imageURL = await uploadImage(taskImage);
    }

    const { data, error } = await supabase
      .from("requests")
      .insert({ notes: notes, email: session.user.email, image_url: imageURL })
      
    if (error) {
      console.log("error:", error);
      return;
    }

    console.log("data:", data);

    fetchRequest();
    setNotes("");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTaskImage(e.target.files[0]);
    }
  }

  const [currentRequest, setCurrentRequest] = useState<RequestInfo[]>([]);

  const fetchRequest = async () => {
    const { error, data } = await supabase
    .from("requests")
    .select("*")
    .order("created_at", {ascending: true});
    
    if (error) {
      console.log("error:", error);
      return;
    }
    
    console.log("data:", data);
    setCurrentRequest(data);
  };


  useEffect(() => {
    fetchRequest();
  }, []);


  return (
    <div>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="description/notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleFileChange}/>

        <button type="submit">submit</button>
      </form>
        <button onClick={fetchRequest}>log request</button>

      <RequestList info={currentRequest}/>
    </div>
  );
}
