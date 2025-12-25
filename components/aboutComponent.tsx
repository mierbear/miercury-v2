"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {

  const favMusic = [
    { name: "TAK / DORIDORI", img: "tak.jpg", name2: "Chikoi The Maid", img2: "chikoi.jpg" },
    { name: "Pink Guy", img: "pinkguy.jpg", name2: "Joji", img2: "joji.jpg" },
    { name: "Uplift Spice", img: "upliftspice.jpg", name2: "Kikuo", img2: "kikuo.jpg" },
    { name: "Sasuke Haraguchi", img: "sasukeharaguchi.jpg", name2: "Deco*27", img2: "deco27.jpg" },
    { name: "Kinoue64", img: "kinoue64.jpg", name2: "Dusqk", img2: "dusqk.jpg" },
    { name: "Porter Pobinson", img: "porterrobinson.jpg", name2: "Kanye West", img2: "kanye.jpg" },
    { name: "Kinoko Teikoku", img: "kinokoteikoku.jpg", name2: "My Dead Girlfriend", img2: "mydeadgirlfriend.jpg" },
    { name: "Pacific Purgatory", img: "pacificpurgatory.jpg", name2: "Steakfry", img2: "steakfry.jpg" },
    { name: "Creepy Nuts", img: "creepynuts.jpg", name2: "Vaundy", img2: "vaundy.jpg" },
    { name: "xi", img: "xi.jpg", name2: "ginkiha", img2: "ginkiha.jpg" },
    { name: "System Of A Down", img: "soad.jpg", name2: "Linkin Park", img2: "linkinpark.jpg" },
  ];

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: true,
    });

  return (
    <div className="min-w-screen min-h-screen grid grid-cols-[3.5fr_1fr] z-50">
      <div className="grid grid-rows-[1fr_6fr_1fr] z-50 bg-[#17191a]">
        <div className="flex items-center justify-center flex-col z-50 bg-[#17191a]">
        </div>
        <div className="overflow-hidden flex items-center justify-center" ref={emblaRef}>
          {/* <div className="flex">
            {favMusic.map((music, index) => (
              <div
                key={index}
                className="flex-[0_0_80%] sm:flex-[0_0_25%] flex flex-col items-center justify-center py-2 nonsel"
                draggable="false"
              >
                <Image
                  src={`/images/about/music/${music.img}`}
                  alt={music.name}
                  width={300}
                  height={300}
                  className="rounded-xl"
                />
                <p className="text-white mt-2">{music.name}</p>
                <br></br>
                <Image
                  src={`/images/about/music/${music.img2}`}
                  alt={music.name2}
                  width={300}
                  height={300}
                  className="rounded-xl"
                />
                <p className="text-white mt-2">{music.name2}</p>
              </div>
            ))}
          </div> */}
          <div className="flex">
            {favMusic.map((music, index) => (
              <div
                key={index}
                className="flex-[0_0_80%] sm:flex-[0_0_25%] flex flex-col items-center justify-center py-2 nonsel"
                draggable="false"
              >
                <Image
                  src={`/images/about/music/${music.img}`}
                  alt={music.name}
                  width={300}
                  height={300}
                  className="rounded-xl"
                />
                <p className="text-white mt-2">{music.name}</p>
                <br></br>
                <Image
                  src={`/images/about/music/${music.img2}`}
                  alt={music.name2}
                  width={300}
                  height={300}
                  className="rounded-xl"
                />
                <p className="text-white mt-2">{music.name2}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center flex-col z-50 bg-[#17191a]">
        </div>
      </div>
      <div className="flex px-5 justify-center flex-col z-50 bg-[#535961]/50 text-white">

        <h1 className="font-bold">about me</h1>
        <h4>KYLE | 23 | INTJ | LIBRA</h4>
        <br></br>
        <p className="font-bold">things i like:</p>
        <p>● playing piano/guitar</p>
        <p>● spirituality/mysticism</p>
        <p>● hermeticism/gnosticism/etc.</p>
        <p>● calisthenics/lifting</p>
        <p className="italic">? <span className="underline cursor-pointer">games</span></p>
        <p className="italic">? <span className="underline cursor-pointer">anime</span></p>
        <p className="italic">? <span className="underline cursor-pointer">music</span></p>
        <p>● coding</p>
        <p>● drawing</p>
        <br></br>
        <p className="font-bold">things i dislike:</p>
        <p>● nihilism/negativity</p>
        <p>● ants</p>
          
      </div>
    </div>
  );
}