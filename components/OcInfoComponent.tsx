"use client"

export default function Info({ name, title, info }: { name: string, title: string, info: string }) {

  return (
    <div className="w-full h-full grid grid-cols-[0.25fr_1fr_0.25fr] z-20">
      <div />
      
      <div className={`flex flex-col items-center text-center w-full h-full bg-black/30 text-white px-16 py-[30%]`}>
        
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

      <div />
    </div>
  )
}