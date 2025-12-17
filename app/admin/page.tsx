"use client";
import { use, useEffect, useRef, useState } from "react";
import supabase from "@/lib/supabaseClient";
import PostType from "@/types/postType";
import Tiptap from "@/components/tiptap/Tiptap";
export const dynamic = "force-dynamic";
import type { Editor } from "@tiptap/react";


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
      }).format(date).replace("at", " ✦");
    }

    const {error} = await supabase.from("posts").insert({
      title: newPost.title,
      content: newPost.content,
      date: getDate(),
      spec_date: getSpecDate(),
    });

    if (error) {
      console.error("post failed: ", error.message);
      return;
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
  }, []);
  
  const [postContent, setPostContent] = useState("");

  const onChange = (content: string) => {
    setNewPost((prev) => ({ ...prev, content: content }));
    setPostContent(content);
    console.log(content);
  };

  return (
    <div className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col text-white z-50">

    {isLoggedIn ?(

      <div className="z-50 min-h-screen min-w-screen justify-end align-center items-center flex flex-col">
        <div className="grid grid-cols-[1fr_4fr] min-w-screen min-h-[85vh] max-h-[85vh]">
          <div className="bg-gray-400 flex flex-col items-center min-h-[85vh] max-h-[85vh] overflow-y-auto scroll-smooth">

            {posts.map((post) => {
              return (
                <div
                  key={post.id}
                  className="flex items-center justify-between bg-black px-5 min-h-[10vh] w-full"
                >
                  <div className="flex flex-col">
                    <p className="text-xl">- {post.title}</p>
                    <p className="text-xs text-neutral-400/60">{post.date}</p>
                    <p className="text-xs text-neutral-400/60">{post.spec_date}</p>
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
          <div className="bg-gray-300 flex flex-col justify-center items-center">



            <form
              ref={postFormRef}
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

            <Tiptap content={postContent} onChange={onChange} onEditorReady={(editor) => (editorRef.current = editor)} />
            
            <button
              ref={postButtonRef}
              type="submit"
              className="cursor-pointer"
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