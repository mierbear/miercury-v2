"use client";
import { useEffect, useRef, useState } from "react";


export default function page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginRef = useRef<HTMLFormElement | null>(null);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col text-white">

      <form 
        ref={loginRef}
        className="absolute min-h-[10vh] min-w-[20vh] bg-[#535961]/20 flex flex-col justify-center items-center rounded-l-md gap-2 p-3.5 nonsel"
        onSubmit={handleSubmit}
      >
        {
        !isLoggedIn ?(
        <div className="flex flex-col gap-0.5">
          <input className="bg-[#101113]/90 p-2 rounded-md" type="text" placeholder="email" />
          <input className="bg-[#101113]/90 p-2 rounded-md" type="text" placeholder="password" />
          <button className="bg-[#101113]/90 p-2 rounded-md cursor-pointer">log in</button>
        </div>
        ): 
        null
        }

      </form>
      {/* <h1>admin</h1>
      <div className="flex flex-col z-50">
      <input
        type="text"
        placeholder="post.."
      />
      <button className="cursor-pointer" onClick={() => {console.log(`press`)}}>submit</button>
      </div> */}
    </div>
  );
}