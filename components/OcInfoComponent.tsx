"use client"

export default function Info({ name, title, info, hidebg }: { name: string, title: string, info: string, hidebg?: boolean }) {

  return (
    <div className="w-full h-full z-20">
      
      <div className={`flex flex-col items-center text-center w-full h-full ${hidebg || "bg-black/30"} text-white px-16 py-[15vh] nonsel pointer-events-none`}>
        
        {/* NAME */}
        <p className="text-6xl">
        {name}
        </p>

        {/* TITLE */}
        <p>
        {title}
        </p>
        <br />

        {/* INFO */}
        <p className=""> 
        {info}
        </p>
        <br />

      </div>

    </div>
  )
}