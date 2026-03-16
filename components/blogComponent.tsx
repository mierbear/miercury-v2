"use client";
import { useState } from "react";
import PostType from "@/types/postType";
import NextLink from "next/link";

type BlogComponentProps =
  | {
      type: "index";
      posts: PostType[];
      allPosts: PostType[];
      currentPage: number;
      postsPerPage: number;
    }
  | {
      type: "slug";
      post: PostType;
      allPosts: PostType[];
    };


export default function Blog(props: BlogComponentProps) {
  const isSlug = props.type === "slug";
  const { allPosts } = props;
  const posts = isSlug ? [props.post] : props.posts;
  const totalPages = isSlug ? null : Math.ceil(allPosts.length / props.postsPerPage);
  const currentPage = isSlug ? null : props.currentPage;
  const [properDate, setProperDate] = useState(false);

  const clickDate = () => {
    setProperDate(!properDate);
  }

  return (
    <div className="min-w-screen min-h-screen align-center items-center flex flex-col text-white">

      {/* SPACE */}
      <div className="h-42 w-240 flex flex-col justify-center items-center">
        <h1>blog</h1>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-[1fr_2fr] w-5xl min-h-screen">

        {/* ARCHIVE */}
        <div className="bg-[#adb7be]/20 flex flex-col items-center">
          <h1 className="py-4 font-bold">archive</h1>

          {allPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-md max-w-[85ch] w-full flex flex-row items-center justify-between pl-4 pr-4 z-50"
            >
              <NextLink href={`/blog/post/${post.slug}`}>
                <p className="hover:underline blue text-sm">{post.title}</p>
              </NextLink>

              <div className="text-xs text-gray-400 select-none flex">
                <p>— {post.date}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* BLOG */}
        <div className="bg-[#c9d3d6]/20">
          {posts.map((post) => (
            <div key={post.id} className="p-5 rounded-md mb-2 max-w-[85ch] w-full">
              <h1 className="font-bold text-2xl">{post.title}</h1>
              <div className="text-xs pt-0.5 text-gray-400 nonsel flex" onClick={clickDate}>
                <p className="underline">{properDate ? post.spec_date : post.date}</p>
                {post.updated_date && <p className="pl-5">last updated at:</p>}
                {post.updated_date && (
                  <p className="pl-2 underline">
                    {properDate && post.updated_spec_date ? post.updated_spec_date : post.updated_date}
                  </p>
                )}
              </div>
              <div
                className="post prose prose-invert pt-5 max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <hr className="my-6 border-neutral-500/40 max-w-[80ch] w-full translate-y-6.5" />
            </div>
          ))}
        </div>

      </div>

      {/* PAGES */}
      {!isSlug && totalPages && currentPage && (
        <div className="flex gap-2 bg-[#c9d3d6]/40 w-5xl items-center justify-center h-20">
          {currentPage > 1 && (
            <NextLink href={`/blog/page/${currentPage - 1}`}>←</NextLink>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <NextLink key={page} href={`/blog/page/${page}`} className={`${page === currentPage && "underline"}`}>{page}</NextLink>
          ))}

          {currentPage < totalPages && (
            <NextLink href={`/blog/page/${currentPage + 1}`}>→</NextLink>
          )}
        </div>
      )}

    </div>
  );
}