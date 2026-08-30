"use client";
import { adviceArray } from "@/components/advice";

export default function QuotesComponent() {
  return (
    <div className="text-white bg-black w-screen h-screen flex flex-col items-center justify-center">

      {/* CONTENT */}
      <div className="w-240 max-w-screen h-screen flex items-center justify-center flex-col pb-16">

        <p className="text-4xl font-bold">quotes</p>
        <p className="text-sm">quotes / passages i live by.</p>
        <div className="h-[60vh] p-8 overflow-y-auto thin-scrollbar flex flex-col mt-8">

          {adviceArray.map((quote, index) => (
            <div key={index}>
              <div className={`grid grid-cols-[16px_1fr] gap-2`}>
                <p className="nonsel pointer-events-none flex items-center justify-center">✦</p>
                <p className="">{quote}</p>
              </div>
            {index !== adviceArray.length - 1 && (<hr className=" border-gray-500/30 w-full my-2" />)}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}