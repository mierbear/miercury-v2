"use client";
import { useEffect, useRef, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginRef = useRef<HTMLFormElement | null>(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    if (currentSession.data.session) {
      setIsLoggedIn(true);
    }
  }

  useEffect(() => {
    fetchSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <div className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col text-white">

    {
    !isLoggedIn ?(
      <form 
        ref={loginRef}
        className="absolute min-h-[10vh] min-w-[20vh] bg-[#535961]/20 flex flex-col justify-center items-center gap-2 p-3.5 nonsel"
        onSubmit={handleSubmit}
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
    ): 
    null
    }

    {isLoggedIn ? (
      <div className="">
        <h1>ur logged in vro</h1>
      </div>
    ):
    null
    }

    </div>
  );
}