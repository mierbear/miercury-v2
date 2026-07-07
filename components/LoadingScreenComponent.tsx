'use client';
import { useState } from "react";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  weight: "400",
  subsets: ["latin"],
})

type props = {
  loadingRef: React.Ref<HTMLDivElement>;
  ready: boolean;
};

const Loading = ({ loadingRef, ready }: props) => {
  const [visible, setVisible] = useState(true);

  return (
    <div 
      className={`
      bg-black z-55555 min-w-screen min-h-screen
      transition-opacity duration-1000 fixed nonsel
      ${ready ? "opacity-0" : "opacity-100"}
      ${visible ? "" : "hidden"}
      ${kanit.className}
      `} 
      ref={loadingRef}
      onTransitionEnd={() => {
        if (ready) setVisible(false);
      }}
    >
      <div className="md:bottom-20 bottom-10 md:right-20 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 h-40 w-40 absolute text-black text-6xl loading-spin rotate-45">
        <p className="bg-white rounded-full w-20 h-20 flex items-center justify-center -rotate-45 loading-spin-counter absolute top-0 left-0">M</p>
        <p className="bg-white rounded-full w-20 h-20 flex items-center justify-center -rotate-45 loading-spin-counter absolute top-0 right-0">I</p>
        <p className="bg-white rounded-full w-20 h-20 flex items-center justify-center -rotate-45 loading-spin-counter absolute bottom-0 left-0">R</p>
        <p className="bg-white rounded-full w-20 h-20 flex items-center justify-center -rotate-45 loading-spin-counter absolute bottom-0 right-0">E</p>
      </div>
    </div>
  )
}

export default Loading