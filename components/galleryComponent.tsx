"use client";

export default function GalleryComponent() {
  return (
    <main className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col">

      <div className="w-300 max-w-screen flex flex-col justify-end items-center h-[12vh]">
        <p className="text-white">gallery</p>  
      </div>

      {/* CONTENT */}
      {/* DONT FORGET TO REMOVE MIN H SCREEN */}
      <div className="bg-white/50 w-300 max-w-screen min-h-screen flex flex-col border-2 border-black border-b-0">

        {/* TOP */}
        <div className="bg-black/30 w-full h-160 grid grid-cols-[1.618fr_1fr] gap-4 p-4">

          {/* FEATURED ART */}
          <div className="p-4 flex flex-col items-center bg-black/20 ">
            <p>featured art</p>
          </div>

          {/* INFO */}
          <div className="p-4 flex flex-col items-center justify-center bg-black/20">
            <p>welcome to the gallery!</p>
            <p>- whats my process?</p>
            <p>- thing here</p>
            <p>- sdfdsfsdf</p>
            <p>- sdfdsfsdf</p>
            <p>- sdfdsfsdf</p>
            <p>- sdfdsfsdf</p>
          </div>

        </div>

        {/* BOTTOM */}
        <div>

        </div>
        
      </div>
    </main>
  )};