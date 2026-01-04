"use client";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PostType from "@/types/postType";
import NextLink from "next/link";

interface BlogComponentProps {
  p: PostType[];
  cp: PostType[];
  pg: number;
  ppp: number;
}

export default function Blog({
  p,
  cp,
  pg,
  ppp
  } : BlogComponentProps
  ){

  const [properDate, setProperDate] = useState(false);
  
  const clickDate = () => {
    setProperDate(!properDate);
  }

  const posts = p;
  const currentPosts = cp;
  const currentPage = pg;
  const PPP = ppp;

  const totalPages = Math.ceil(posts.length / PPP);

  return (
    <main className="min-w-screen min-h-screen align-center items-center flex flex-col z-50 text-white">
      <div className="min-h-80 w-240 flex flex-col justify-center items-center z-50">
        <h1>blog</h1>
      </div>

      <div className="grid grid-cols-[1fr_2fr] w-240 min-h-screen z-50">

        <div className="bg-[#adb7be]/20 z-50 flex flex-col items-center">
          <h1 className="py-4 font-bold">archive</h1>

          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-md max-w-[85ch] w-full flex flex-row items-center justify-between pl-4 pr-4 z-50"
            >
              <NextLink href={`/blog/post/${post.slug}`}>
                <p className="hover:underline text-blue-600">{post.title}</p>
              </NextLink>

              <div className="text-xs text-gray-400 select-none flex">
                <p>— {post.date}</p>
              </div>
            </div>
          ))}
        </div>


        <div className="bg-[#c9d3d6]/20">
          {currentPosts === null ? null : currentPosts.map((post) => {
            return (
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
            )
          })}
        </div>
          
      </div>

      <div>
        <div className="flex justify-between pt-6">
          {currentPage > 1 ? (
            <NextLink href={`/blog/page/${currentPage - 1}`}>
              ← Previous
            </NextLink>
          ) : <span />}

          {currentPage < totalPages && (
            <NextLink href={`/blog/page/${currentPage + 1}`}>
              Next →
            </NextLink>
          )}
        </div>
      </div>
    </main>
  )
}