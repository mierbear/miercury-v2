import NextLink from "next/link";
import Marquee from "react-fast-marquee";
import { Sono } from "next/font/google";

const sono = Sono({
  weight: "400",
  subsets: ["latin"],
})

type LinkKey =
| "characters"
| "mtwim"
| "games"
| "pp"
| "gallery"
| "blog"
| "about";

type LinkItemProps = {
  desc: string;
  active: LinkKey;
  type: string;
  pos: string;
  link: LinkKey;
  onHover: (link: LinkItemProps["link"]) => void;
};

export default function LinkItem({ desc, active, type, pos, link, onHover }: LinkItemProps) {
  return (
    <div
      className={`
        border-[#d8e0e3]/70 relative overflow-hidden 
        ${pos === "top" ? "border-t rounded-t-xl" : 
          pos === "bot" && "border-b rounded-b-xl"}
        border-x 
        ${active === link ? "bg-[#17191a]" : "bg-[#17191a]/50"}
        `}
      onMouseEnter={() => onHover(link)}
      onClick={() => onHover(link)}
    >
      <div>
        
        {/* TITLE */}
        <p className={`
          ${sono.className} nonsel pointer-events-none h-12.5 flex
          items-center pl-3.5 gap-2.5 transition-colors duration-400
          ${active === link ? "text-yellow-300 white-glow text-xl" : "text-white/50"}
          `}
        >
          <span className={`${active === link ? "text-2xl spin" : ""}`}>
            {active === link ? "★" : "✦"}
          </span>
          <span className={active === link ? "underline" : ""}>
            {active === link ? `${link}!` : `${link}`}
          </span>
        </p>

        {/* DESCRIPTION */}
        <p className={`
          nonsel pointer-events-none transition-opacity 
          ${active === link ? "opacity-100 duration-500" : "opacity-0 duration-0"} 
          bg-[#17191a]/80 py-1 px-2 rounded absolute txt-glow text-xs bottom-1 right-1
          `}
        >
          {desc}
        </p>

        {/* MEDIA */}
        <NextLink
        href={`/${link}`}
        >
          {type === "img" ? (
            <img src={`/images/${link}.png`} className="h-47.5 w-full nonsel object-cover" />
          ) : (
            <Marquee>
              <div className="-mr-px">
                <img src={`/images/${link}.png`} className="h-47.5 nonsel" />
              </div>
            </Marquee>
          )}
        </NextLink>

      </div>
    </div>
  );
}