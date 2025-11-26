import Image from "next/image";
import Link from 'next/link';
import { Boldonse } from "next/font/google"
import Stars from "@/components/indexStars";

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
})

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen align-center items-center flex flex-col relative">
      <div className="bg-black min-w-screen min-h-[40vh] flex justify-end align-center items-center top-0 flex-col">
        <h1 className={`${boldonse.className} header text-amber-200 text-9xl z-10`}>MIERCURY</h1>
        <Stars />
      </div>
      <div className="content min-w-screen min-h-[60vh] flex align-center flex-col items-center bg-amber-200 text-black z-10">
        <h2 className="text-black">enjoy the stay, keep it mirthful</h2>

        <div className="flex flex-col justify-center align-bottom items-center h-[50vh]">
          <p>i have nothing to show off here right now hehe just go back</p>
          <a href="/pp">pp</a>
        </div>
      </div>
    </div>
  );
}
