"use client";

export default function QuotesComponent() {
  return (
    <div className="text-white bg-[#17191a] w-screen min-h-screen flex flex-col items-center justify-center relative">

      {/* INTRO */}
      <div
        className="flex items-center justify-center w-screen h-screen bg-amber-300"
      >
        <div
          className="flex items-center justify-center w-[40%] flex-col"
        >
          <p className="text-6xl">HELLO, IM</p>
          <p className="text-9xl">KYLE!</p>
        </div>
        <div
          className="flex items-center justify-center w-[40%]"
        >

          <img 
            src="/images/index/pfp.png"
            className={`
              w-[60vh] h-[60vh] rounded-full
            `}
          />
          
        </div>
      </div>
      
      {/* ABOUT */}
      <div
        className="flex items-center justify-center w-screen h-screen bg-amber-400"
      >
        ABOUT
      </div>

      {/* PROJECTS */}
      <div
        className="flex items-center justify-center w-screen h-screen bg-amber-500"
      >
        PROJECTS
      </div>

      {/* EXPERIENCE */}
      <div
        className="flex items-center justify-center w-screen h-screen bg-amber-600"
      >
        EXPERIENCE
      </div>

      {/* NAVIGATION */}
      <div
        className={`
          fixed bottom-4 text-xl px-4 py-2 bg-amber-900/50 rounded-3xl
          flex gap-4 nonsel
        `}
      >
        <p className="cursor-pointer">Intro</p>
        <p>✦</p>
        <p className="cursor-pointer">About</p>
        <p>✦</p>
        <p className="cursor-pointer">Projects</p>
        <p>✦</p>
        <p className="cursor-pointer">Experience</p>
      </div>

    </div>
  );
}