"use client"

export default function Info({ name, title, info, bg, hidebg, list }: { name: string, title: string, info: string, bg?: string, hidebg?: boolean, list?: boolean }) {

  return (
    <div className="w-full h-full z-20">
      
      <div
        className={`
          flex relative flex-col items-center text-center
          text-sm w-full h-full text-white
          px-16 py-[15vh] nonsel pointer-events-none
        `}
        style={{ backgroundColor: hidebg ? "transparent" : bg ? bg : "rgba(16,17,19,0.7)" }}
      >
        
        {/* NAME */}
        <p className="text-6xl text-nowrap">
        {name}
        </p>

        {/* TITLE */}
        <p className="text-nowrap">
        {title}
        </p>
        <br />

        {/* INFO */}
        <div> 
          {list ?
          (
            <ul className="list-disc list-inside">
              {info.split("*").map((item, i, arr) => (
                <li 
                  key={i} 
                  className={`${i === arr.length - 1 ? "font-bold text-xl pt-4" : "py-1"}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            info.split("*").map((item, i) => (
              <p 
                key={i} 
                className="pb-2"
              >
                {item}
              </p>
            )))
          }
        </div>
        <br />

        <img 
          className="absolute bottom-0 opacity-30"
          src={`/images/ocs/${name.toLowerCase()}-alt.png`}
        />

      </div>

    </div>
  )
}