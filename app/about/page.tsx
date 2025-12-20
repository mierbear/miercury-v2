import Image from "next/image";

export default function Home() {
  return (
    <main className="min-w-screen min-h-screen grid grid-cols-[1fr_2fr] z-50">
      <div className="flex items-center justify-center flex-col z-50 bg-[#17191a]">

      </div>
      <div className="flex items-center justify-center flex-col z-50 bg-[#535961]/50 text-white">

        <h1>about me</h1>
        <h4>KYLE | 23 | INTJ | LIBRA</h4>
        <br></br>
        <p>things i like:</p>
        <p>● playing piano/guitar</p>
        <p>● spirituality/mysticism/gnosticism/hermeticism/etc.</p>
        <p>● calisthenics</p>
        <p>● games</p>
        <p>● anime</p>
        <p>● music</p>
        <p>● coding</p>
        <p>● drawing</p>
        <br></br>
        <p>things i dislike:</p>
        <p>● nihilism/negativity</p>
        <p>● ants</p>
          
      </div>
    </main>
  );
}