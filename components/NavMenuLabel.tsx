"use client";

type LinkKey =
  | "characters"
  | "gallery"
  | "mtwim"
  | "games"
  | null

type LabelProps = {
  activeLink: LinkKey;
  title: string;
  desc: string;
  link: string;
}

export default function Label ({activeLink, title, desc, link}: LabelProps) {
  return (
    <div className={`absolute bottom-0 h-18 xl:h-24 pb-1 w-full bg-[#17191a]/80 flex flex-col items-center justify-center transition-all duration-400 ${activeLink === link ? "text-yellow-200 opacity-100" : "text-white opacity-30"}`}>

      <p className={`text-xl md:text-2xl lg:text-3xl transition-transform duration-500 ${activeLink === link ? "translate-y-0 scale-100" : "translate-y-2.5 scale-80"} flex items-center gap-4`}>
        <span className={`flex items-center justify-center origin-center text-3xl transition-scale duration-300 ease-in-out ${activeLink === link ? "spin scale-100" : "scale-80"}`}>
        {activeLink === link ? "★" : "✦"}
        </span>

        {title}

        <span className={`flex items-center justify-center origin-center text-3xl transition-scale duration-300 ease-in-out ${activeLink === link ? "spin scale-100" : "scale-80"}`}>
        {activeLink === link ? "★" : "✦"}
        </span>
      </p>

      <p className={`text-sm transition-opacity duration-300 ${activeLink === link ? "opacity-100" : "opacity-0"} text-nowrap`}>{desc}</p>

    </div>
  )
}