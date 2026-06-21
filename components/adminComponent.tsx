"use client";
import { use, useEffect, useRef, useState } from "react";
import supabase from "@/lib/supabaseClient";
import PostType from "@/types/postType";
import Tiptap from "@/components/tiptap/Tiptap";
export const dynamic = "force-dynamic";
import type { Editor } from "@tiptap/react";
import { Boldonse } from "next/font/google";
import LogType from "@/types/logType";
import ArtType from "@/types/artType";

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
        slug: getSlug(getDate(), newPost.title),
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

  const handleBlogPostDelete = async (id: number) => {

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
    fetchArtworks();
  }, []);
  
  const [postContent, setPostContent] = useState("");

  const onChange = (content: string) => {
    setNewPost((prev) => ({ ...prev, content: content }));
    setPostContent(content);
    console.log(content);
  };

  const [editingPost, setEditingPost] = useState<number | null>(null);

  const newPostRef = useRef<HTMLDivElement | null>(null);
  
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

  const [currentTab, setCurrentTab] = useState<"blog" | "log" | "art">("blog")
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

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    const { error } = await supabase.storage
      .from("art")
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("art")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const addArtRef = useRef<HTMLInputElement | null>(null);
  const artTitleRef = useRef<HTMLInputElement | null>(null);
  const artDescRef = useRef<HTMLTextAreaElement | null>(null);
  const artDateRef = useRef<HTMLInputElement | null>(null);
  const [artUrl, setArtUrl] = useState<string | null>(null);
  const [artTitle, setArtTitle] = useState<string | null>(null);
  const [artDescription, setArtDescription] = useState<string | null>(null);
  const [artCreatedAt, setArtCreatedAt] = useState<string | null>(null);
  const [artTags, setArtTags] = useState<string[]>([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  const tags = [
    "rendered",
    "sketch",
    "animated",
    "pixelated",
    "wip/unfinished",
    "original",
    "friends",
    "fanart",
    "favorite",
    "collab",
    "shitpost",
    "mtwim",
    "calvarius",
    "flower delivery",
    "simeons descent",
    "pio",
    "pp",
    "miercury"
  ];

  const artSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const getDate = (date = new Date()) => {
      const yy = String(date.getFullYear()).slice(-2);
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");

      return `${yy}.${mm}.${dd}`;
    }

    const { error } = await supabase.from("art").insert({
      title: artTitle,
      description: artDescription,
      tags: artTags,
      url: artUrl,
      ...(artCreatedAt 
        ? { created_at: artCreatedAt, date: artCreatedAt?.slice(2, 10).replace(/-/g, ".") } 
        : { date: getDate() }),
    })

    if (error) {
      console.error("post failed: ", error.message);
      return;
    }

    console.log(`submitted art`);

    addArtRef.current!.value = "";
    artTitleRef.current!.value = "";
    artDescRef.current!.value = "";
    artDateRef.current!.value = "";
    setArtUrl("");
    setArtTitle("");
    setArtDescription("");
    setArtCreatedAt("");
    setArtTags([]);

    fetchArtworks();
  }

  const [artworks, setArtworks] = useState<ArtType[] | null>(null);

  const fetchArtworks = async () => {
    const { error, data } = await supabase
      .from("art")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }
    
    console.log(data);
    setArtworks(data);
  }

  const handleArtDelete = async (id: number) => {
    const {error} = await supabase.from("art").delete().eq("id", id);

    if (error) {
      console.error("delete failed: ", error.message);
      return;
    }

    fetchArtworks();
  }

  const handleArtFeature = async (id: number) => {
    
    const {error: clearFeaturedErr} = await supabase.from("art").update({
      featured: false
    }).eq("featured", true);

    if (clearFeaturedErr) {
      console.error("clear featured failed: ", clearFeaturedErr.message);
      return;
    }

    const {error: featureErr} = await supabase.from("art").update({
      featured: true
    }).eq("id", id);

    if (featureErr) {
      console.error("feature failed: ", featureErr.message);
      return;
    }

    fetchArtworks();
  }

  const [page, setPage] = useState(1);
  const perPage = 12;
  const totalPages = Math.ceil((artworks?.length ?? 0) / perPage);
  const pagedArt = artworks?.slice((page - 1) * perPage, page * perPage);

  const currentAction = useRef<(() => void) | null>(null);
  const [currentActionDesc, setCurrentActionDesc] = useState<string | null>(null);
  const [currentActionUrl, setCurrentActionUrl] = useState<string | null>(null);
  const confirmAction = (action: () => void, desc: string, url?: string) => {
    currentAction.current = action;
    setCurrentActionDesc(desc);
    url ? setCurrentActionUrl(url) : setCurrentActionUrl(null)
  }
  const closeAction = () => {
    currentAction.current = null;
    setCurrentActionDesc(null);
    setCurrentActionUrl(null);
  }


  return (
    <div className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col text-white z-50 monospace">

    {isLoggedIn ?(

      <div className="min-h-screen w-5xl align-center items-center flex flex-col nonsel">
        
        {/* CONFIRM */}
        <div 
          className={`
          w-screen h-screen fixed bg-black/30 z-100
          flex items-center justify-center
          ${currentActionDesc ? "block" : "hidden"}
          `}
        >
          <div className="w-120 h-80 bg-gray-200 text-black flex flex-col items-center justify-center">
            {currentActionUrl && (
              <img src={currentActionUrl} className="max-h-40 max-w-full object-contain" />
            )}
            <p className="font-bold">{currentActionDesc}</p>
            <p className="pt-4">are you sure you want to do this?</p>
            <div className="flex gap-8 text-xl">
              <p 
                onClick={() => {
                  currentAction.current?.()
                  closeAction();
                }}
                className="cursor-pointer"
                >
                YES
              </p>
              <p 
                onClick={closeAction}
                className="cursor-pointer"
              >
                NO
              </p>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="h-60 flex flex-col justify-end">
          <p className={`${boldonse.className} text-7xl text-[#d8e0e3] nonsel`}>ADMIN PAGE</p>
        </div>

        <div className="text-xs text-black w-full bg-[#d8e0e3] flex justify-center items-center rounded-t-md p-0.5">
          <p>you're not gonna try and hack my website are you ... u_u</p>
        </div>

        {/* OPTIONS */}
        <div className="w-full grid grid-cols-3 h-16">
          
          <p 
            className={`
              flex items-center justify-center text-3xl
              cursor-pointer hover:underline
              ${currentTab === "blog" ? "bg-[#ccd3d6] font-bold text-black" : "bg-[#c3cacc] text-black/50"}
            `}
            onClick={() => {setCurrentTab("blog")}}
          >
            BLOG
          </p>

          <p 
            className={`
              flex items-center justify-center text-3xl
              cursor-pointer hover:underline
              ${currentTab === "log" ? "bg-[#ccd3d6] font-bold text-black" : "bg-[#c3cacc] text-black/50"}
            `}
            onClick={() => {setCurrentTab("log")}}
          >
            LOGS
          </p>

          <p 
            className={`
              flex items-center justify-center text-3xl
              cursor-pointer hover:underline
              ${currentTab === "art" ? "bg-[#ccd3d6] font-bold text-black" : "bg-[#c3cacc] text-black/50"}
            `}
            onClick={() => {setCurrentTab("art")}}
          >
            GALLERY
          </p>

        </div>
        
        {/* BLOG */}
        {currentTab === "blog" && (
          <div className="grid grid-cols-[2fr_6fr] w-full">

            <div className="bg-black flex flex-col items-center overflow-y-auto scroll-smooth">
              <div
                ref={newPostRef}
                className={`
                  flex items-center justify-center px-5 h-20 w-full cursor-pointer
                  ${editingPost ? "bg-black hover:bg-[#17191a]/80" : "bg-[#24303b]"}
                `}
                onClick={handleNewPost}
              >
                new post?
              </div>
              {posts.map((post) =>  (
                  <div
                    key={post.id}
                    className={`
                      flex items-center justify-between px-5 h-20 w-full cursor-pointer
                      ${post.id === editingPost ? "bg-[#24303b]" : "bg-black hover:bg-[#17191a]/80"}
                    `}
                    onClick={() => {handlePostListClick(post.id)}}
                  >
                    <div className="flex flex-col">
                      <p className="text-xl">{post.title.slice(0, 10)}{post.title.length > 10 && "..."}</p>
                      <p className="text-xs text-neutral-400/60">{post.date}</p>
                    </div>

                    <p
                      className="text-2xl text-red-600 cursor-pointer"
                      onClick={() => confirmAction(() => handleBlogPostDelete(post.id), `DELETE "${post.title.slice(0, 10)}..."`)}
                    >
                      🞮
                    </p>
                  </div>
                )
              )}
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
                  className="w-full mb-4 monospace text-2xl bg-[#17191a]"
                  onChange={(e) => {
                    setNewPost((prev) => ({ ...prev, title: e.target.value }))
                  }}
                />
                
                <Tiptap content={postContent} onChange={onChange} onEditorReady={(editor) => (editorRef.current = editor)} />
                
                <button
                  ref={postButtonRef}
                  type="submit"
                  className="cursor-pointer mt-4 px-8 py-4 text-xs monospace border border-white/30 rounded-md"
                >
                  {editingPost ? "edit current post.." : "make new post to blog.."}
                </button>

              </form>

            </div>
          </div>
        )}

        {/* LOG */}
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
                          onClick={() => confirmAction(() => handleLogDelete(log.id), `DELETE "${log.log.slice(0, 10)}..."`)}
                        >
                          🞮
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
                className="bg-[#17191a] p-4 w-full h-86 text-white monospace"
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

        {/* ART */}
        {currentTab === "art" && (
          <div className="w-full bg-black grid grid-cols-[5fr_3fr]">
            
            {/* art list */}
            <div className="bg-[#535961]/20 flex flex-col items-center">

              <div className="p-4 pr-0 overflow-y-auto h-full w-full grid grid-cols-3 gap-3">
                {pagedArt?.map((art) => {
                  return (
                    <div
                      className="flex flex-col relative"
                      key={art.id}
                    >
                      <p
                      className={`text-2xl ${art.featured ? "text-yellow-300" : "text-white"} cursor-pointer absolute top-0.5 right-1`}
                      onClick={() => handleArtFeature(art.id)}
                      >
                        {art.featured ? "★" : "✦"}
                      </p>
                      <img src={art.url} className="w-full h-48 object-cover" />
                      <div className="flex justify-between items-center w-full">
                        <p className="font-bold text-lg truncate">{art.title}</p>
                        <p
                          className="text-xl text-red-600 cursor-pointer"
                          onClick={() => confirmAction(() => handleArtDelete(art.id), `DELETE "${art.title}"`, art.url)}
                        >
                          🞮
                        </p>
                      </div>
                      <p className="text-xs text-white/30">{art.date}</p>
                      <p className="text-xs truncate">{art.description}</p>
                    </div>
                  )
                })}

              </div>

              <div className="flex gap-2 items-center p-4">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`
                      ${page === i + 1 ? "text-yellow-300" : "text-white"}
                      cursor-pointer
                      `}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

            </div>
            
            {/* upload art */}
            <div className="bg-[#535961]/20 flex flex-col items-center p-4">
              
              <div
                className="w-full h-auto aspect-square flex items-center justify-center"
              >
                {artUrl ? (
                  <img
                  src={artUrl}
                  className="h-full w-auto w-max-none object-cover cursor-pointer"
                  onClick={() => addArtRef.current?.click()}
                  />
                ):(
                  <button 
                    onClick={() => addArtRef.current?.click()}
                    className="w-[90%] h-[90%] monospace border border-white rounded-md cursor-pointer"
                  >
                    no artwork selected...
                  </button>
                )}
              </div>

              <form className="flex flex-col items-center w-full gap-2" onSubmit={artSubmitHandler}>

                {/* IMG */}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={addArtRef}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const url = await uploadImage(file);

                    setArtUrl(url);
                  }}
                />

                {/* TITLE */}
                <input 
                  type="text"
                  placeholder="input title.."
                  className="w-full my-2 monospace text-xl bg-[#17191a]"
                  onChange={(e) => {
                    setArtTitle(e.target.value);
                  }}
                  ref={artTitleRef}
                />

                {/* DESCRIPTION */}
                <textarea 
                  placeholder="input description.."
                  className="w-full monospace text-xs h-36 bg-[#17191a]"
                  onChange={(e) => {
                    setArtDescription(e.target.value);
                  }}
                  ref={artDescRef}
                />

                {/* TAGS */}
                <div className="w-full relative">
                  <div className="flex flex-wrap gap-1 items-center">
                    <span className="monospace text-xs text-white/50">tags:</span>
                    {artTags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs monospace border border-white/30 px-2 py-0.5 rounded cursor-pointer hover:border-red-500 hover:text-red-500"
                        onClick={() => setArtTags(prev => prev.filter(t => t !== tag))}
                      >
                        #{tag}
                      </span>
                    ))}
                    <button
                      type="button"
                      className="text-xs monospace border border-white/30 px-2 py-0.5 rounded cursor-pointer hover:border-white"
                      onClick={() => setShowTagDropdown(p => !p)}
                    >
                      +
                    </button>
                  </div>

                  {/* DATE */}
                  <input
                    type="datetime-local"
                    className="w-full p-2 my-2 monospace text-sm bg-gray-400"
                    onChange={(e) => setArtCreatedAt(e.target.value)}
                    ref={artDateRef}
                  />

                  {showTagDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-[#101113] border border-white/20 rounded p-2 flex flex-wrap gap-1 z-10 w-full">
                      {tags.filter(tag => !artTags.includes(tag)).map(tag => (
                        <span
                          key={tag}
                          className="text-xs monospace border border-white/30 px-2 py-0.5 rounded cursor-pointer hover:border-white"
                          onClick={() => {
                            setArtTags(prev => [...prev, tag]);
                            setShowTagDropdown(false);
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* SUBMIT */}
                <button
                type="submit"
                className="cursor-pointer px-8 py-4 text-xs monospace border border-white/30 rounded-md"
                >
                  post artwork to gallery..
                </button>
              </form>
            </div>
            
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