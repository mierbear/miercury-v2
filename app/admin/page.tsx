"use client";
import { use, useEffect, useRef, useState } from "react";
import supabase from "@/lib/supabaseClient";
import PostType from "@/types/postType";
import Tiptap from "@/components/tiptap/Tiptap";
export const dynamic = "force-dynamic";
import type { Editor } from "@tiptap/react";
import { Boldonse } from "next/font/google";
import { log } from "console";

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
})

export default function page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginRef = useRef<HTMLFormElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const postButtonRef = useRef<HTMLButtonElement | null>(null);
  const postFormRef = useRef<HTMLFormElement | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const editorRef = useRef<Editor | null>(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    if (currentSession.data.session) {
      setIsLoggedIn(true);
    }
  }

  useEffect(() => {
    fetchSession();
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      const {error} = await supabase.auth.signInWithPassword({email, password})
      if (error) {
        console.error("login failed: ", error.message);
        return;
      }
      setIsLoggedIn(true);
    }

  };

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });

  const getSlug = (date: string, title: string) => {

    const n = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();

    const d = date
      .replaceAll(".", "-");

    return `${n}-${d}`;
  }

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const getDate = (date = new Date()) => {
    const yy = String(date.getFullYear()).slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yy}.${mm}.${dd}`;
    }

    const getSpecDate = (date = new Date()) => {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(date).replace("at", "✦");
    }

    if (!editingPost) {
      const {error} = await supabase.from("posts").insert({
        title: newPost.title,
        content: newPost.content,
        date: getDate(),
        spec_date: getSpecDate(),
        slug: getSlug(getDate(), newPost.title),
      });

      if (error) {
        console.error("post failed: ", error.message);
        return;
      }

    } else {
      const {error} = await supabase.from("posts").update({
        title: newPost.title,
        content: newPost.content,
        updated_date: getDate(),
        updated_spec_date: getSpecDate(),
      }).eq("id", editingPost);

      if (error) {
        console.error("update failed: ", error.message);
        return;
      }
    }

    

    setNewPost({
      title: "",
      content: "",
    })

    fetchPosts();
    titleRef.current!.value = "";
    editorRef.current!.commands.clearContent();
  }

  const handleDelete = async (id: number) => {

    const {error} = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error("delete failed: ", error.message);
      return;
    }
    
    fetchPosts();
  }

  const fetchPosts = async () => {
    const { error, data } = await supabase
      .from("posts")
      .select("*")
      .order("date_created", { ascending: false });
    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }
    
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
    fetchLogs();
  }, []);
  
  const [postContent, setPostContent] = useState("");

  const onChange = (content: string) => {
    setNewPost((prev) => ({ ...prev, content: content }));
    setPostContent(content);
    console.log(content);
  };

  const [editingPost, setEditingPost] = useState<number | null>(null);

  const newPostRef = useRef<HTMLButtonElement | null>(null);
  
  const handleNewPost = () => {
    setEditingPost(null);
    console.log(editingPost);
    setNewPost({
      title: "",
      content: "",
    })

    fetchPosts();
    titleRef.current!.value = "";
    editorRef.current!.commands.clearContent();
  }

  const handlePostListClick = (id: number) => {
    console.log(id)
    setEditingPost(id);
    const post = posts.find((post) => post.id === id);
    if (post) {
      setNewPost({
        title: post.title,
        content: post.content,
      })
      titleRef.current!.value = post.title;
      editorRef.current!.commands.setContent(post.content);
    }
  }

  type LogType = {
    id: number;
    date: string;
    log: string;
  }

  const [currentTab, setCurrentTab] = useState<"blog" | "log" | "art" | "meow">("blog")
  const [logContent, setLogContent] = useState("");
  const logInputRef = useRef<HTMLInputElement | null>(null);
  const [logs, setLogs] = useState<LogType[] | null>(null);

  const fetchLogs = async () => {
    const { error, data } = await supabase
      .from("logs")
      .select("*")
      .order("created_at", { ascending: false });


    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }
    
    console.log(data);
    setLogs(data);
  }

  const logSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const getDate = (date = new Date()) => {
      const yy = String(date.getFullYear()).slice(-2);
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");

      return `${yy}.${mm}.${dd}`;
    }

    if (logInputRef.current === null) return;
    
    const {error} = await supabase.from("logs").insert({
      log: logContent,
      date: getDate(),
    });

    if (error) {
      console.error("post failed: ", error.message);
      return;
    }

    console.log(`submitted log`);
    fetchLogs();

    setLogContent("");
    logInputRef.current.value = "";
  }

  const handleLogDelete = async (id: number) => {

    const {error} = await supabase.from("logs").delete().eq("id", id);

    if (error) {
      console.error("delete failed: ", error.message);
      return;
    }
    
    fetchLogs();
  }

  const handleTabClick = (tab: "blog" | "log" | "art" | "meow") => {
    setCurrentTab(tab);
  }

  return (
    <div className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col text-white z-50">

    {isLoggedIn ?(

      <div className="min-h-screen w-260 align-center items-center flex flex-col nonsel">

        {/* HEADER */}
        <div className="h-60 flex flex-col justify-end">
          <p className={`${boldonse.className} text-7xl text-[#d8e0e3] nonsel`}>ADMIN PAGE</p>
        </div>

        <div className="text-xs text-black w-full bg-[#d8e0e3] flex justify-center items-center rounded-t-md p-0.5">
          <p>you're not gonna try and hack my website are u ... u_u</p>
        </div>

        <div className="w-full grid grid-cols-4 h-16">
          
          <p 
          className="flex items-center justify-center font-bold bg-[#d8e0e3] text-black cursor-pointer hover:underline"
          onClick={() => {handleTabClick("blog")}}
          >
            post on your blog
          </p>

          <p 
          className="flex items-center justify-center font-bold bg-[#d8e0e3] text-black cursor-pointer hover:underline"
          onClick={() => {handleTabClick("log")}}
          >
            post new log
          </p>

          <p 
          className="flex items-center justify-center font-bold bg-[#d8e0e3] text-black cursor-pointer hover:underline"
          onClick={() => {handleTabClick("art")}}
          >
            post new drawing
          </p>

          <p 
          className="flex items-center justify-center font-bold bg-[#d8e0e3] text-black cursor-pointer hover:underline"
          onClick={() => {handleTabClick("meow")}}
          >
            meow
          </p>

        </div>
        
        {/* BLOG */}
        {currentTab === "blog" && (
          <div className="grid grid-cols-[2fr_6fr] w-full">

            <div className="bg-black flex flex-col items-center overflow-y-auto scroll-smooth">
              {posts.map((post) => {
                return (
                  <div
                    key={post.id}
                    className="flex items-center justify-between bg-black px-5 h-20 w-full cursor-pointer adminPost"
                    onClick={() => {handlePostListClick(post.id)}}
                  >
                    <div className="flex flex-col">
                      <p className="text-xl">{post.title.slice(0, 10)}{post.title.length > 10 && "..."}</p>
                      <p className="text-xs text-neutral-400/60">{post.date}</p>
                    </div>

                    <img
                      src="/images/trash.svg"
                      alt="Delete"
                      className="cursor-pointer max-h-5 linkButton"
                      onClick={() => {handleDelete(post.id)}}
                    />
                  </div>
                );
              })}
            </div>
            <div className="bg-black flex flex-col">
            
              <form
                ref={postFormRef}
                className="flex flex-col items-center bg-black p-5 text-white"
                onSubmit={handleSubmit}
              >

                <input
                  ref={titleRef}
                  type="text"
                  placeholder="input title.."
                  className="w-full mb-4 monospace text-2xl"
                  onChange={(e) => {
                    setNewPost((prev) => ({ ...prev, title: e.target.value }))
                  }}
                />

                <Tiptap content={postContent} onChange={onChange} onEditorReady={(editor) => (editorRef.current = editor)} />
                
                <button
                  ref={postButtonRef}
                  type="submit"
                  className="cursor-pointer"
                >
                  post..
                </button>

              </form>
              
              <div>
                <button
                  ref={newPostRef}
                  className="bg-[#101113]/90 p-2 rounded-md cursor-pointer"
                  onClick={handleNewPost}
                >
                  new post?
                </button>
              </div>

            </div>
          </div>
        )}

        {currentTab === "log" && (
          <div className="w-full bg-black grid grid-cols-[1fr_2fr] h-100">
            <div className="bg-[#535961]/20 p-4 overflow-y-auto h-full">
              <hr className="my-2 border-gray-500/30 w-full" />
              {logs?.map((log) => {
                return (
                  <div key={log.id}>
                    <div className="grid grid-cols-[5fr_1fr]" >
                      <div className="flex justify-center flex-col">
                        <p className="text-xs text-white/50">{log.date}</p>
                        <p className="text-md">{log.log}</p>
                      </div>
                      <div className="flex justify-center items-center">
                        <p
                        className="text-2xl text-red-600 cursor-pointer"
                        onClick={() => handleLogDelete(log.id)}
                        >
                          🞨
                        </p>
                      </div>
                    </div>
                  <hr className="my-2 border-gray-500/30 w-full" />
                  </div>
                )
              })}
            </div>
              <form className="flex flex-col justify-center m-4" onSubmit={logSubmitHandler}>
                <input
                type="text"
                placeholder="input log"
                className="bg-[#101113]/90 p-4 w-full h-86 text-white monospace"
                onChange={(e) => {
                  setLogContent(e.target.value);
                }}
                ref={logInputRef}
                >
                </input>
                <button
                type="submit"
                className="cursor-pointer h-6 p-2 text-xs monospace">
                  post..
                </button>
              </form>
            <div>

            </div>
          </div>
        )}


        {currentTab === "art" && (
          <div className="w-full bg-black flex flex-col justify-center items-center">
            <p>art</p>
          </div>
        )}

        {currentTab === "meow" && (
          <div className="w-full bg-black flex flex-col justify-center items-center">
            <p>meow</p>
          </div>
        )}
        
      </div>
      
    ): 

      <form 
        ref={loginRef}
        className="absolute min-h-[10vh] min-w-[20vh] bg-[#535961]/20 flex flex-col justify-center items-center gap-2 p-3.5 nonsel"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col gap-0.5">
          <input 
            className="bg-[#101113]/90 p-2 rounded-md" 
            type="text" 
            placeholder="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <input 
            className="bg-[#101113]/90 p-2 rounded-md" 
            type="password" 
            placeholder="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-[#101113]/90 p-2 rounded-md cursor-pointer">log in</button>
        </div>
      </form>
    }

    </div>
  );
}