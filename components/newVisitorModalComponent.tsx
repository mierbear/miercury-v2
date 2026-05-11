'use client';
import { useEffect, useState } from "react";

export default function DailyModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const visitedStatus = localStorage.getItem("visited");
    
    if (!visitedStatus) {
      setOpen(true);
    }
  }, []);

  const closeModal = () => {
    localStorage.setItem("visited", "yuh");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className={`fixed flex items-center justify-center z-555 transition-opacity duration-3000`}>
      <div className="bg-white py-4 px-6 rounded-lg flex flex-col relative">
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold text-xl">New visitor detected!</p>
          <p onClick={closeModal} className="scale-200 text-red-600 cursor-pointer">🞨</p>
        </div>
        <div className="flex flex-col">
          
        </div>
      </div>
    </div>
  );
}
