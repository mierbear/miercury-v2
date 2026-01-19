import NextLink from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  title: string,
  href: string,
  img: string
}

export default function NavMenuLink(props: Props) {

  const pathname = usePathname();

  const isActive =
  props.href === "/"
  ? pathname === "/"
  : pathname.startsWith(props.href);

  return (
    <NextLink
      href={props.href}
      className={`
        flex items-center justify-center flex-col relative px-4 nonsel 
        flex-[0_0_56%] 
        min-[768px]:flex-[0_0_50%] 
        min-[1024px]:flex-[0_0_42%] 
        min-[1280px]:flex-[0_0_36%]
        min-[1600px]:flex-[0_0_28%]
        ${isActive && "pointer-events-none"}
      `}
    >
      {isActive && (
        <p className="absolute z-100 -top-20 text-9xl rounded text-yellow-300 white-glow breathe">⯁</p>
      )}
      <img src={props.img} className={`w-full h-full object-cover rounded-xl saturate-50 hover:saturate-100 transition-saturate duration-200 brightness-80 hover:brightness-100 ${isActive && "brightness-100 saturate-100"}`} />
      <p className="absolute bottom-2 text-base bg-black/70 rounded px-2 py-0.5 font-bold">{props.title}</p>
    </NextLink>
  );
}