"use client";

export default function Mtwim() {

  return (
    <div className="min-w-screen min-h-screen max-w-screen flex flex-col items-center">

      {/* TOP */}
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <div className="bg-[#9eadb9] h-[16%] w-full"></div>
        <div className="bg-[#90b5d3] h-[68%] w-full  relative">
          <img src="/images/mtwim/frank.png" className="scale-70 origin-bottom-right nonsel pointer-events-none absolute  right-70 bottom-0" />
          <img src="/images/mtwim/mier.png"  className="scale-70 origin-bottom-right nonsel pointer-events-none absolute -right-10 bottom-0" />
        </div>
        <div className="bg-[#e48519] h-[16%] w-full"></div>
      </div>

      <div className="h-50 w-7xl bg-white">
        CONTENT
      </div>

    </div>
  )
}