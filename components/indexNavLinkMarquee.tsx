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
  active: LinkKey;
  link: LinkKey;
  onHover: (link: LinkItemProps["link"]) => void;
};

export default function LinkItem({ active, link, onHover }: LinkItemProps) {
  return (
    <NextLink
      href={`/${link}`}
      className={`overflow-hidden rounded-t-xl ${active === link ? "bg-[#17191a]" : "bg-[#17191a]/50"}`}
      onMouseEnter={() => onHover(link)}
    >
      <p className={`h-10 flex items-center pl-3 gap-2.5 ${active === link ? "text-yellow-300 white-glow" : "text-white/50"}`}><span className={`${active === link ? "text-xl spin" : ""}`}>★</span><span className={active === link ? "underline" : ""}>{active === link ? `${link}!` : `${link}`}</span></p>
      <Marquee>
        <img src={`/images/${link}.png`} className="h-40 nonsel" />
      </Marquee>
    </NextLink>
  );
}