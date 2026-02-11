"use client";
import quotes from "@/components/quotes";

export default function QuotesComponent() {
  return (
    <div className="text-white w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">quotes...</h1>
      <div className="h-[60vh] w-240 p-8 overflow-y-auto thin-scrollbar flex flex-col mt-8">

        {quotes.map((quote, index) => (
          <div key={index}>
            <div className={`grid grid-cols-[16px_1fr] gap-2`}>
              <p className="nonsel pointer-events-none flex items-center justify-center">✦</p>
              <p className="">{quote}</p>
            </div>
          {index !== quotes.length - 1 && (<hr className=" border-gray-500/30 w-full my-2" />)}
          </div>
        ))}
      </div>
    </div>
  );
}