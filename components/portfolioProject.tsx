"use client"
import { Kosugi_Maru } from "next/font/google"
import Link from "next/link";

const kosugi = Kosugi_Maru({
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
    <div className="flex flex-col w-[80%]">
      
      <div className="flex flex-col group gap-4">
        <Link href={link} target="_blank">
          <img className="rounded-2xl" src={src} />
        </Link>

        <div>
          <Link 
            href={link}
            className={`text-7xl ${kosugi.className} text-gray-500 group-hover:text-blue-500 transition-colors duration-500`}
          >
            {title}
          </Link>
        </div>
      </div>

      <p className="text-sm">{info}</p>
    </div>
  )
}