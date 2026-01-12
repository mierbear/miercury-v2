import NextLink from "next/link";

type Props = {
  title: string,
  href: string,
  img: string
}

export default function NavMenuLink(props: Props) {
  return (
    <NextLink
      href={props.href}
      className="flex-[0_0_20%] flex items-center justify-center flex-col relative"
    >
      <img src={props.img} />
      <p className="absolute bottom-4">{props.title}</p>
    </NextLink>
  );
}