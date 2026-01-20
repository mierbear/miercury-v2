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
    <div className={`fixed bottom-12 flex items-center justify-center z-555 transition-opacity duration-3000`}>
      <p onClick={closeModal} className="text-4xl text-red-600 cursor-pointer absolute top-1 right-1">🞨</p>
      <div className="bg-white p-6 rounded-lg">
        <p className="font-bold text-xl">Welcome</p>
        <p className="text-red-500">This site is still in development and many routes are still unfinished.</p>
        <p>Expect frequent changes for the next month or two.</p>
        <p>Thank you for visiting. &lt;3</p>
      </div>
    </div>
  );
}
