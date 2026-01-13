import NextLink from "next/link";
import Marquee from "react-fast-marquee";

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
  link: LinkKey;
  onHover: (link: LinkItemProps["link"]) => void;
};

export default function LinkItem({ desc, active, link, onHover }: LinkItemProps) {
  return (
    <div
      className={`border-t border-x border-[#d8e0e3]/70 relative overflow-hidden rounded-t-xl ${active === link ? "bg-[#17191a]" : "bg-[#17191a]/50"}`}
      onMouseEnter={() => onHover(link)}
      onClick={() => onHover(link)}
    >
      <p className={`nonsel pointer-events-none h-12.5 flex items-center pl-3 gap-2.5 transition-colors duration-400 ${active === link ? "text-yellow-300 white-glow text-xl" : "text-white/50"}`}><span className={`${active === link ? "text-xl spin" : ""}`}>{active === link ? "★" : "✦"}</span><span className={active === link ? "underline" : ""}>{active === link ? `${link}!` : `${link}`}</span></p>
      <p className={`nonsel pointer-events-none transition-opacity ${active === link ? "opacity-100 duration-500" : "opacity-0 duration-0"} bg-[#17191a]/80 py-1 px-2 rounded absolute txt-glow text-xs bottom-1 right-1 z-50`}>{desc}</p>
      <NextLink
      href={`/${link}`}
      >
        <Marquee>
          <div className="-mr-px">
            <img src={`/images/${link}.png`} className="h-47.5 nonsel" />
          </div>
        </Marquee>
      </NextLink>
    </div>
  );
}