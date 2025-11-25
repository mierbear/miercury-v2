"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { supabase } from "@/lib/supabase-client";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSignUp) {
      const {error: signUpError} = await supabase.auth.signUp({email, password})

      if (signUpError) {
        console.error("error signing up:", signUpError.message)
        return
      }

    } else {
      const {error: signInError} = await supabase.auth.signInWithPassword({email, password})

      if (signInError) {
        console.error("error signing in:", signInError.message)
        return
      }
    }
  }

  return (
    <div className="bg-amber-200">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-2 border-4">
      <button
        onClick={() => {
          setIsSignUp(!isSignUp);
        }}
      >
        {isSignUp ? "switch to sign in" : "switch to sign up"}
      </button>

        <input 
        type="email"
        placeholder="email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
        />

        <input 
        type="password"
        placeholder="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
        />

      <button type="submit" className="p-3">
        {isSignUp ? "sign up" : "sign in"}
      </button>

      </form>
    </div>
  )
};

export default Auth;