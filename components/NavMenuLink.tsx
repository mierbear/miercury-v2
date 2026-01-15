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
      className="flex-[0_0_55%] sm:flex-[0_0_50%] md:flex-[0_0_40%] lg:flex-[0_0_25%] flex items-center justify-center flex-col relative px-2"
    >
      {isActive && (
        <p className="absolute -top-20 text-9xl rounded text-yellow-300 white-glow breathe">⯁</p>
      )}
      <img src={props.img} className="w-full h-full object-cover rounded-xl" />
      <p className="absolute bottom-1 text-md bg-black/70 rounded px-2 py-0.5 font-bold">{props.title}</p>
    </NextLink>
  );
}