'use client';
import { useState } from "react";

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
      transition-opacity duration-1000 fixed
      pointer-events-none nonsel
      ${ready ? "opacity-0" : "opacity-100"}
      ${visible ? "" : "hidden"}
      `} 
      ref={loadingRef}
      onTransitionEnd={() => {
        if (ready) setVisible(false);
      }}
    >
      <div className="bottom-20 right-20 h-[10vw] w-[10vw] absolute text-black text-6xl loading-spin">
        <p className="bg-white rounded-full w-[5vw] h-[5vw] flex items-center justify-center loading-spin-counter absolute top-0 left-0">M</p>
        <p className="bg-white rounded-full w-[5vw] h-[5vw] flex items-center justify-center loading-spin-counter absolute top-0 right-0">I</p>
        <p className="bg-white rounded-full w-[5vw] h-[5vw] flex items-center justify-center loading-spin-counter absolute bottom-0 left-0">R</p>
        <p className="bg-white rounded-full w-[5vw] h-[5vw] flex items-center justify-center loading-spin-counter absolute bottom-0 right-0">E</p>
      </div>
    </div>
  )
}

export default Loading