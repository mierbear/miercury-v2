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
      
      <div className="flex flex-col group gap-2">
        <Link href={link} target="_blank" className="group-hover:scale-100 scale-99 transition-scale duration-1000">
          <img className="rounded-2xl nonsel" src={src} />
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
      
      <div className="text-sm flex justify-between relative">
        <p className="w-[50%] text-justify">{info}</p>
        <img className="self-end absolute right-8 h-90 nonsel pointer-events-none" src={`/images/gallery/gallery-me.png`} />
      </div>
    </div>
  )
}