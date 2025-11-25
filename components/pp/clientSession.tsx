"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import SantaForm from "@/components/pp/santaForm";
import Auth from "@/components/pp/auth";

const ClientSession = () => {
  const [session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession);
    setSession(currentSession.data.session);
  }

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })

    return () => {
      authListener.subscription.unsubscribe();
    }
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  }

  return (
    <div className="min-w-screen min-h-screen align-center justify-center items-center flex flex-col relative text-center bg-gray-600">
      {session ? (
        <div>
          <button onClick={logout}>logout</button>
          <SantaForm session={session}/>
        </div>
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default ClientSession;