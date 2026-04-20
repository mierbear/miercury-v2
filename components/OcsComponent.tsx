"use client";
import { useEffect, useState, useRef } from "react";

export default function Ocs() {
  return (
    <div className="w-screen max-w-screen justify-center align-center items-center flex flex-col">

      {/* MIERS */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col bg-[#d1f8ff]">
        
        <div className="grid grid-cols-3 w-full">
          <div className="w-full h-full">
            <img src="/images/ocs/mierintro-icemage.png" />
          </div>
          <div className="w-full h-full">
            <img src="/images/ocs/mierintro-angel.png" />
          </div>
          <div className="w-full h-full">
            <img src="/images/ocs/mierintro-tyrant.png" />
          </div>
        </div>


      </div>

      {/* KANIN */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col bg-[#e0f8b9]">
        KANIN
      </div>

      {/* SKULLBOUND */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col bg-[#acaaa9]">
        SKULLBOUND
      </div>

      {/* QUINCE */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col bg-[#9e937a]">
        QUINCE
      </div>

      {/* SIMEON */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col bg-[#303a8d]">
        SIMEON
      </div>

      {/* PIO */}
      <div className="w-screen max-w-screen h-screen max-h-screen justify-center align-center items-center flex flex-col bg-[#413f3d]">
        PIO
      </div>


    </div>
  )
}