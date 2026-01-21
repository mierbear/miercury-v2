"use client";

export default function GalleryComponent() {
  return (
    <main className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col">

      <div className="w-270 max-w-screen flex flex-col justify-end items-center h-[40vh]">
        <p className="text-white">gallery</p>  
      </div>
      {/* CONTENT */}
      {/* DONT FORGET TO REMOVE MIN H SCREEN */}
      <div className="bg-white w-270 max-w-screen min-h-screen flex flex-col">
        <p>gallery</p>
      </div>
    </main>
  )};