import LinkType from "@/types/linkType";

const Link = (prop: LinkType) => {
  return (
    <div className="relative w-full bg-[#535961] rounded h-18 flex items-center overflow-hidden linkButton group">
      <img src={`/images/${prop.link}.png`} className="absolute inset-0 w-full h-full object-cover" />
      <a href={`/${prop.link}`} className="z-10 px-5">{prop.name}</a>
      <span className="absolute inset-0 bg-linear-to-r from-[#ffffff]/30 to-transparent -translate-x-full transition-transform duration-300 pointer-events-none group-hover:translate-x-0"></span>
    </div>
  )
}

export default Link;