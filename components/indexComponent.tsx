import Image from "next/image";
import Link from 'next/link';
import Stars from "@/components/indexStars";
import Title from "@/components/indexTitle";

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen align-center items-center flex flex-col relative">
      <div className="bg-black min-w-screen min-h-[40vh] flex justify-end align-center items-center top-0 flex-col">
        <Stars />
        <Title />
      </div>
      <div className="bg-gray-300 min-w-full flex flex-col justify-center items-center z-11">
        <h2 className="text-black">enjoy the stay, keep it mirthful</h2>
      </div>
      <div className="content min-w-screen min-h-[60vh] bg-gray-200 text-black z-10 grid grid-cols-[0.8fr_3fr_1fr_0.8fr]">
        <div className="bg-gray-400"></div>
        <div className="flex flex-col justify-center align-bottom items-center h-[50vh]">
          <p>i have nothing to show off here right now hehe just go back</p>
          <a href="/pp">pp</a>
        </div>
        <div className="bg-gray-500"></div>
        <div className="bg-gray-400"></div>
      </div>
    </div>
  );
}
