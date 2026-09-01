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
      <div className="flex flex-col group gap-4">
        <Link href={link} target="_blank">
          <video className="rounded-lg nonsel" loop muted autoPlay src={`${src}`} />
        </Link>

        <div>
          <Link 
            href={link}
            className={`text-3xl pt-2 ${jua.className} text-gray-500 group-hover:text-blue-500 transition-colors duration-500`}
          >
            {title}
          </Link>
        </div>
      </div>
      <p className="text-sm text-justify">{info}</p>
    </div>
  )
}