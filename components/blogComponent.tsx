"use client";
import { useState, useEffect } from "react";
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

  const years = [...new Set(allPosts.map(post => post.date.slice(0, 2)))];
  const [activeYears, setActiveYears] = useState<string[]>([])

  const yearClickHandler = (year: string) => {
    activeYears.includes(year) ? setActiveYears(activeYears.filter((currentyear) => currentyear !== year))
    : setActiveYears(prev => [...prev, year])
  }

  return (
    <div className="min-w-screen min-h-screen align-center items-center flex flex-col text-white">

      {/* SPACE */}
      <div className="h-42 w-5xl flex flex-col justify-center items-center max-w-screen">
        <h1>blog</h1>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,3fr)] w-5xl min-h-screen max-w-screen">

        {/* ARCHIVE */}
        <div className="bg-[#adb7be]/20 flex flex-col items-center w-full">
          <h1 className="py-4 font-bold">archive</h1>

          {years.map((year) => (
            <div key={year} className="w-full px-4 py-2">
              <div className="flex items-center gap-3">
                <p className="text-xl cursor-pointer" onClick={() => yearClickHandler(year)}>20{year}</p>
                <hr className="border-gray-600 w-full block" />
              </div>
              {allPosts.map((post) => (
                post.date.slice(0,2) === year && (
                  <div
                    key={post.id}
                    className={`justify-between ${activeYears.includes(year) ? "flex" : "hidden"}`}
                  >

                    <NextLink href={`/blog/post/${post.slug}`}>
                      <p className="hover:underline blue truncate">{post.title.length < 20 ? post.title : `${post.title.slice(0, 20)}...`}</p>
                    </NextLink>

                    <div className="text-xs text-gray-400 select-none flex">
                      <p>— {post.date.slice(3)}</p>
                    </div>

                  </div>
                )
              ))}
            </div>
          ))}
        </div>
        
        {/* BLOG */}
        <div className="bg-[#c9d3d6]/20">
          {posts.map((post) => (
            <div key={post.id} className="p-8 rounded-md mb-2 w-full">
              <NextLink href={`/blog/post/${post.slug}`} className="font-bold text-2xl hover:underline blue">{post.title}</NextLink>
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