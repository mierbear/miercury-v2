"use client";
import gsap from "gsap";
import Image from "next/image";
import supabase from "@/lib/supabaseClient";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import PostType from "@/types/postType";
import NextLink from "next/link";

export default function Blog() {
  
  const [posts, setPosts] = useState<PostType[]>([]);
  
  const fetchPosts = async () => {
    const { error, data } = await supabase
      .from("posts")
      .select("*")
      .order("date_created", { ascending: false })
      .limit(4);

    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }
    
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <main className="min-w-screen min-h-screen align-center items-center flex flex-col z-50 text-white">
      <div className="min-h-80 w-240 flex flex-col justify-center items-center z-50">
        <h1>blog</h1>
      </div>
      <div className="grid grid-cols-[1fr_2fr] w-240 min-h-screen z-50">

        <div className="bg-[#adb7be]/20 z-50 flex flex-col items-center">
          <h1 className="py-4 font-bold">archive</h1>
          {posts.map((post) => {
            return (
              <div key={post.id} className="post rounded-md max-w-[85ch] w-full flex flex-row items-center justify-between pl-4 pr-4 z-50">

                <NextLink href={`/blog/post/${post.slug}`}>
                  <p className="hover:underline blue">{post.title}</p>
                </NextLink>
                
                <div className="text-xs text-gray-400 nonsel flex">
                  <p className="">— {post.date}</p>
                </div>

              </div>
            );
          })}
        </div>

        <div className="bg-[#c9d3d6]/20">
          
        </div>

      </div>
    </main>
  )
}