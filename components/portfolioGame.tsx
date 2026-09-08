"use client"
import { Jua } from "next/font/google"
import Link from "next/link";

const jua = Jua({
  weight: "400",
  subsets: ["latin"],
})

type ProjectProps = {
  title: string,
  info: string,
  src: string,
  link: string,
}

export default function Project({ title, info, src, link }: ProjectProps) {

  return (
    <div>
      <div className="flex flex-col group gap-2">
        <Link href={link} target="_blank">
          <video className="rounded-sm sm:rounded-xl md:rounded-2xl nonsel" loop muted autoPlay src={`${src}`} />
        </Link>

        <div className="self-center md:self-start">
          <Link 
            href={link}
            className={`
              text-lg sm:text-xl md:text-2xl ${jua.className}
              text-gray-500 group-hover:text-blue-500 transition-colors duration-500
            `}
          >
            {title}
          </Link>
        </div>
      </div>
      <p className="text-sm text-center md:text-justify">{info}</p>
    </div>
  )
}