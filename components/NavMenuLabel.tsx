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
    <div className={`z-850 absolute bottom-0 h-18 xl:h-24 pb-1 w-full flex flex-col items-center justify-center transition-all duration-400 ${activeLink === link ? "text-yellow-200 bg-[#17191a]/90 white-glow nonsel pointer-events-none" : "text-white bg-[#17191a]/30"}`}>

      <div className={`text-2xl xl:text-3xl transition-transform duration-400 ${activeLink === link ? "translate-y-0 scale-100" : "translate-y-2.5 scale-80"} flex items-center gap-4`}>
        <span className={`flex items-center justify-center origin-center transition-scale duration-400 ease-in-out ${activeLink === link ? "spin scale-100" : "scale-80"}`}>
        {activeLink === link ? "★" : "✦"}
        </span>

        <span className={`flex items-center justify-center origin-center transition-scale duration-400 ease-in-out ${activeLink === link ? "scale-100 font-bold" : "scale-80"}`}>
        {title}
        </span>

        <span className={`flex items-center justify-center origin-center transition-scale duration-400 ease-in-out ${activeLink === link ? "spin scale-100" : "scale-80"}`}>
        {activeLink === link ? "★" : "✦"}
        </span>
      </div>

      <p className={`text-[10px] sm:text-sm transition-opacity duration-400 ${activeLink === link ? "opacity-100" : "opacity-0"} text-nowrap`}>{desc}</p>

    </div>
  )
}