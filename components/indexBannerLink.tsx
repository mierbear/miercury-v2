import LinkType from "@/types/linkType";
import NextLink from "next/link";

const Link = (prop: LinkType) => {
  return (
    <NextLink
      href={`/${prop.link}`}
      className="relative w-full bg-[#535961] rounded h-20 flex items-center overflow-hidden linkButton group"
    >
      <img
        src={`/images/${prop.link}.png`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <span className="z-10 px-5">{prop.name}</span>

      <span className="absolute inset-0 bg-linear-to-r from-[#ffffff]/30 to-transparent -translate-x-full transition-transform duration-300 pointer-events-none group-hover:translate-x-0"></span>
    </NextLink>
  );
};

export default Link;
