"use client";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { Session } from "@supabase/supabase-js";
import RequestList from "./requestList";
import RequestInfo from "../../types/requestInfo";


export default function SantaForm({ session }: { session: Session }) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [taskImage, setTaskImage] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<RequestInfo | null>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    const filePath = `${file.name}-${Date.now()}`;
    const { error } = await supabase.storage.from("request-images").upload(filePath, file);
    if (error) {
      console.error("error uploading image:", error);
      return null;
    }
    const { data } = await supabase.storage.from("request-images").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const fetchRequest = async () => {
    const { error, data } = await supabase
      .from("requests")
      .select("*")
      .eq("email", session.user.email)
      .single();

    if (error) {
      console.log("error:", error);
      return;
    }

    if (data) {
      setName(data.name);
      setCurrentRequest(data);
      setNotes(data.notes);
      setUploaded(true);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageURL: string | null = currentRequest?.image_url || null;

    if (taskImage) {
      imageURL = await uploadImage(taskImage);
    }

    if (uploaded && currentRequest) {
      // Update existing entry
      const { data, error } = await supabase
        .from("requests")
        .update({ notes, image_url: imageURL, email: session.user.email, name: name })
        .eq("id", currentRequest.id);

      if (error) {
        console.log("update error:", error);
        return;
      }

      setCurrentRequest(data?.[0] || null);
      console.log("updated:", data);
    } else {
      // Insert new entry
      const { data, error } = await supabase
        .from("requests")
        .insert({ notes, email: session.user.email, image_url: imageURL, name: name });

      if (error) {
        console.log("insert error:", error);
        return;
      }

      setCurrentRequest(data?.[0] || null);
      setUploaded(true);
      console.log("inserted:", data);
    }

    setTaskImage(null);
    setNotes("");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTaskImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-amber-100 min-h-[40vh] min-w-[40vw]">
      <h2 className="font-bold text-xl">
        {uploaded ? "edit santa request" : "submit santa request"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 min-w-[40vw]">
        <input
          type="text"
          placeholder="name (you can be anonymous, pretend to be someone else, etc. :3)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border-2 rounded"
        />

        <input
          type="text"
          placeholder="description/notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="p-2 border-2 rounded"
        />

        <label
          htmlFor="file-upload"
          className="flex items-center bg-indigo-500 text-white px-3 py-2 rounded hover:bg-indigo-600 transition cursor-pointer">
          {taskImage ? taskImage.name : "Choose Image"}
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="submit"
          className="p-2 rounded bg-amber-600 cursor-pointer">
          {uploaded ? "Update" : "Submit"}
        </button>
      </form>
      <div>
        <h1>your current request:</h1>
        <RequestList info={currentRequest ? [currentRequest] : []} /> 
        <p className="text-xl">you will have time until the 1st of December to change your request, be sure of what you want!</p>
        <p>(i dont know how to implement uploading multiple images so just dm me other refs to send them on discord LOL)</p>
      </div>
    </div>
  );
}

