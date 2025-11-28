"use client";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Boldonse } from "next/font/google"
import { useEffect, useRef } from "react";

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
})

const landing = () => {


  return (
    <div className="fixed min-w-screen min-h-[90vh] grid grid-rows-[5fr_1fr] z-500 bg-white/80  shadow-2xl">
      <div className="bg-white-400/50 grid grid-cols-4">
        <div className="flex flex-col justify-center items-center">Characters</div>
        <div className="flex flex-col justify-center items-center">MTWIM Compendium</div>
        <div className="flex flex-col justify-center items-center">Pacific Purgatory</div>
        <div className="flex flex-col justify-center items-center">Games</div>
      </div>
      <div className="flex flex-col justify-center items-center bg-gray-600/50">
        <h1>no thanks, take me back to the blog!</h1>

      </div>
    </div>
  );
};

export default landing;
