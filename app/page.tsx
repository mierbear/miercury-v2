import Image from "next/image";
import { Boldonse } from "next/font/google"

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
})

export default function Home() {
  return (
    <main className="min-w-screen min-h-screen align-center items-center flex flex-col relative">
      <div className="header bg-white min-w-screen min-h-[40vh] flex justify-end align-center items-center top-0 flex-col">
        <h1 className={`${boldonse.className} text-black text-9xl`}>MIERCURY</h1>
      </div>
      <div className="content min-w-screen min-h-[60vh] flex align-center flex-col items-center">
        <h2 className="text-white">enjoy the stay, keep it mirthful</h2>
        <p>i have nothing to show off here right now hehe just go back</p>
      </div>

    </main>
  );
}
