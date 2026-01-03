"use client";
import Image from "next/image";
import supabase from "@/lib/supabaseClient";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import PostType from "@/types/postType";

export default function PostPage() {

  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [properDate, setProperDate] = useState(false);

  const clickDate = () => {
    setProperDate(!properDate);
  }

  useEffect(() => {
    
    if (!slug) return;

    const fetchPosts = async () => {
      const { error, data } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("fetch failed: ", error.message);
        return;
      }

      setPost(data);
    }

    fetchPosts();

  }, [slug]);
  

  if (!post) return null;
  

  return (
    <div className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col">
      <div key={post.id} className="post p-5 rounded-md mb-2 max-w-[85ch] w-full">
        <h1 className="font-bold text-2xl">{post.title}</h1>
        <div className="text-xs pt-0.5 text-gray-400 nonsel flex" onClick={clickDate}>
          <p className="underline">{properDate ? (post.spec_date) : post.date}</p>
          {post.updated_date === null ? null : (<p className="pl-5">last updated at:</p>)}
          {post.updated_spec_date && properDate ? (<p className="pl-2 underline">{post.updated_spec_date}</p>) : (<p className="pl-2 underline">{post.updated_date}</p>)}
        </div>
        <div
          className="prose prose-invert pt-5 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <hr className="my-6 border-neutral-500/40 max-w-[80ch] w-full translate-y-6.5" />
      </div>
    </div>
  );
}
