'use client';
import { useEffect, useState } from "react";

export default function DailyModal() {
  const [open, setOpen] = useState(false);

  const getTodayKey = () => {
    return new Date().toISOString().split("T")[0];
  };

  useEffect(() => {
    const lastVisit = localStorage.getItem("last-visited");
    const today = getTodayKey();
    
    if (lastVisit !== today) {
      setOpen(true);
    }
  }, []);

  const closeModal = () => {
    localStorage.setItem("last-visited", getTodayKey());
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className={`fixed left-0 right-0 bottom-12 flex items-center justify-center z-555 transition-opacity duration-3000`}>
      <div className="bg-white py-4 px-6 rounded-lg flex flex-col relative">
        <img src="/images/construction.gif" className="fixed -translate-x-[140%]"/>
        <img src="/images/construction.gif" className="fixed self-end translate-x-[140%]"/>
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold text-xl">Welcome</p>
          <p onClick={closeModal} className="scale-200 text-red-600 cursor-pointer">🞨</p>
        </div>
        <div className="flex flex-col">
          <p className="text-red-500 font-bold">This site is still in development and many routes are still unfinished.</p>
          <p>Expect changes for the next month or two, there's still a lot of work to be done.</p>
          <p>Check back once in a while, thanks for visiting. &lt;3</p>
        </div>
      </div>
    </div>
  );
}
