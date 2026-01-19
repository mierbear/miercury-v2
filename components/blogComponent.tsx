"use client";
import { useState } from "react";
import PostType from "@/types/postType";
import NextLink from "next/link";
import BlogPostListComponent from "@/components/blogPostListComponent";

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
  const [properDate, setProperDate] = useState(false);

  const clickDate = () => {
    setProperDate(!properDate);
  }

  if (props.type === "slug") {
    const { post, allPosts } = props;
    return (
      <div className="min-w-screen min-h-screen align-center items-center flex flex-col z-50 text-white">
        <div className="min-h-80 w-240 flex flex-col justify-center items-center z-50">
          <h1>blog</h1>
        </div>

        <div className="grid grid-cols-[1fr_2fr] w-240 min-h-screen z-50">

          <BlogPostListComponent allPosts={allPosts} />

          <div className="bg-[#c9d3d6]/20">
            <div key={post.id} className="p-5 rounded-md mb-2 max-w-[85ch] w-full">
                <h1 className="font-bold text-2xl">{post.title}</h1>
                <div className="text-xs pt-0.5 text-gray-400 nonsel flex" onClick={clickDate}>
                  <p className="underline">{properDate ? (post.spec_date) : post.date}</p>
                  {post.updated_date === null ? null : (<p className="pl-5">last updated at:</p>)}
                  {post.updated_spec_date && properDate ? (<p className="pl-2 underline">{post.updated_spec_date}</p>) : (<p className="pl-2 underline">{post.updated_date}</p>)}
                </div>
                <div
                  className="post prose prose-invert pt-5 max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <hr className="my-6 border-neutral-500/40 max-w-[80ch] w-full translate-y-6.5" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (props.type ==="index") {
    const { posts, allPosts, currentPage, postsPerPage } = props;
    const totalPages = Math.ceil(allPosts.length / postsPerPage);
    return (
      <div className="min-w-screen min-h-screen align-center items-center flex flex-col z-50 text-white">
        <div className="min-h-80 w-240 flex flex-col justify-center items-center z-50">
          <h1>blog</h1>
        </div>

        <div className="grid grid-cols-[1fr_2fr] w-240 min-h-screen z-50">

          <BlogPostListComponent allPosts={allPosts} />

          <div className="bg-[#c9d3d6]/20">
            {posts.map((post) => (
              <div key={post.id} className="p-5 rounded-md mb-2 max-w-[85ch] w-full">
                <h1 className="font-bold text-2xl">{post.title}</h1>
                <div className="text-xs pt-0.5 text-gray-400 nonsel flex" onClick={clickDate}>
                  <p className="underline">{properDate ? (post.spec_date) : post.date}</p>
                  {post.updated_date === null ? null : (<p className="pl-5">last updated at:</p>)}
                  {post.updated_spec_date && properDate ? (<p className="pl-2 underline">{post.updated_spec_date}</p>) : (<p className="pl-2 underline">{post.updated_date}</p>)}
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
      </div>
    )
  }
}