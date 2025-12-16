"use client";
import { use, useEffect, useRef, useState } from "react";
import supabase from "@/lib/supabaseClient";
import PostType from "@/types/postType";

export default function page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginRef = useRef<HTMLFormElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const date = new Date().toLocaleString().replaceAll('/', '-');
    
    const {error} = await supabase.from("posts").insert({
      title: newPost.title,
      content: newPost.content,
      date: date,
    });

    if (error) {
      console.error("post failed: ", error.message);
    }

    setNewPost({
      title: "",
      content: "",
    })

    titleRef.current!.value = "";
    contentRef.current!.value = "";
  }

  const fetchPosts = async () => {
    const { error, data } = await supabase.from("posts").select("*");
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
    <div className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col text-white z-50">

    {
    isLoggedIn ?(
      <div className="z-50 min-h-screen min-w-screen justify-end align-center items-center flex flex-col">
        <div className="grid grid-cols-[1fr_3fr] min-w-screen min-h-[85vh]">
          <div className="bg-gray-400 flex flex-col justify-center items-center">
            {posts.map((post) => {
              return (
                <div key={post.id}>
                  <p>{post.title}</p>
                  <p>{post.date}</p>
                  <p>{post.content}</p>
                </div>
              );
            })}
          </div>
          <div className="bg-gray-300 flex flex-col justify-center items-center">
            <form
              className="flex flex-col justify-center items-center bg-neutral-800 p-5 min-h-[50vh] min-w-[50vh] rounded text-white"
              onSubmit={handleSubmit}
            >

            <input
              ref={titleRef}
              type="text"
              placeholder="title"
              onChange={(e) => {
                setNewPost((prev) => ({ ...prev, title: e.target.value }))
              }}
            />
            <textarea
              ref={contentRef}
              placeholder="enter text here..."
              onChange={(e) => {
                setNewPost((prev) => ({ ...prev, content: e.target.value }))
              }}
            />
            <button
              type="submit"
            >
              post..
            </button>

            </form>
          </div>
        </div>
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