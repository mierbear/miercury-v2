"use client";
import { useState, useEffect } from "react";
import PostType from "@/types/postType";
import NextLink from "next/link";
import { Sono } from "next/font/google";
import Footer from "@/components/footerComponent";
import quotes from "./quotes";

const sono = Sono({
  weight: "400",
  subsets: ["latin"],
})

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
  const [activeYears, setActiveYears] = useState<string[]>([new Date().getFullYear().toString().slice(2, 4)])

  const yearClickHandler = (year: string) => {
    activeYears.includes(year) ? setActiveYears(activeYears.filter((currentyear) => currentyear !== year))
    : setActiveYears(prev => [...prev, year])
  }

  useEffect(() => {
    const layers = [
      { selector: ".layer1", speed: -0.1 },
      { selector: ".layer2", speed: -0.2 },
      { selector: ".layer3", speed: -0.3 },
      { selector: ".layer4", speed: -0.4 },
      { selector: ".layer5", speed: -0.5 },
    ];

    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      layers.forEach(({ selector, speed }) => {
        const el = document.querySelector<HTMLDivElement>(selector);
        if (el) el.style.transform = `translateY(${scrollPosition * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getQuote = (quotes: string[]): string => {
    const today = new Date();
    const day = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const index = day % quotes.length;
    return quotes[index];
  };

  return (
    <div className="min-w-screen min-h-screen align-center items-center flex flex-col text-white monospace">

      {/* SPACE */}
      <div className="h-42 w-5xl flex flex-col justify-center items-center max-w-screen">
      </div>

      <div className="h-60 bg-[#adb7be]/20 w-5xl mb-4">
        <p>test header</p>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,3fr)] w-5xl min-h-screen max-w-screen">

        {/* ARCHIVE */}
        <div className="bg-black/50 flex flex-col items-center w-full pl-8">
          <h1 className="py-4 font-bold">archive</h1>

          {years.map((year) => (
            
            <div key={year} className={`w-full ${activeYears.includes(year) ? "pb-6" : "pb-2"}`}>
              <div 
                className={`flex items-center cursor-pointer transition-gap duration-500 nonsel ${activeYears.includes(year) ? "gap-3" : "gap-2"}`}
                onClick={() => yearClickHandler(year)}
                >
                <span 
                  className={`
                  ${activeYears.includes(year) ? "scale-100 -translate-x-px" : "scale-70 -rotate-90 -translate-y-px"} 
                  text-2xl w-3 h-3 ml-px flex items-center justify-center
                  transition-all duration-500
                  ${sono.className}
                  `}
                >
                  {activeYears.includes(year) ? "★" : "✦"}
                </span>

                <span 
                  className={`
                    text-xl
                    h-full text-start flex items-center
                    origin-left transition-[scale] duration-500
                    ${activeYears.includes(year) ? "scale-100" : "scale-80"}
                  `}
                >
                  20{year}
                </span>

                <hr className="border-gray-600 w-full block" />

              </div>

              {allPosts.map((post) => (
                post.date.slice(0,2) === year && (
                  <div
                    key={post.id}
                    className={`justify-between nonsel ${activeYears.includes(year) ? "flex" : "hidden"}`}
                  >

                    <NextLink href={`/blog/post/${post.slug}`}>
                      <p className="hover:underline blue truncate">{post.title.length < 18 ? post.title : `${post.title.slice(0, 18)}...`}</p>
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
        <div className="bg-black/50">
          {posts.map((post) => (
            <div key={post.id} className={`p-8 pb-0 w-full`}>
              <NextLink href={`/blog/post/${post.slug}`} className="font-bold text-2xl hover:underline blue">{post.title}</NextLink>
              <div className="text-xs pt-0.5 text-gray-400 nonsel flex w-max cursor-pointer" onClick={clickDate}>
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
              
              {post === posts[posts.length - 1] || (
                <hr className="mt-8 border-gray-500/30" />
              )}
            </div>
          ))}

          {/* PAGES */}
          {!isSlug && totalPages && currentPage && (
            <div className="flex gap-2 w-full items-center justify-center h-20">
              {currentPage > 1 && (
                <NextLink className={`blue`} href={`/blog/page/${currentPage - 1}`}>←</NextLink>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <NextLink className={`${page === currentPage ? "underline full-blue pointer-events-none" : "blue"}`} key={page} href={`/blog/page/${page}`}>{page}</NextLink>
              ))}

              {currentPage < totalPages && (
                <NextLink className={`blue`} href={`/blog/page/${currentPage + 1}`}>→</NextLink>
              )}
            </div>
          )}

        </div>

      </div>

      <div className="text-[12px] pb-4 w-5xl bg-black/50 flex justify-center">
        <p>{getQuote(quotes)}</p>
      </div>

      <Footer />

      <div className='parallax-container'>
        <div className='parallax-layer layer1'/>
        <div className='parallax-layer layer2'/>
        <div className='parallax-layer layer3'/>
        <div className='parallax-layer layer4'/>
        <div className='parallax-layer layer5'/>
      </div>

    </div>
  );
}