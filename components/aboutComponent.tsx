"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Home() {
  const carouselRef = useRef<HTMLDivElement | null>(null);

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
    { name: "System of a Down", img: "soad.jpg", name2: "Linkin Park", img2: "linkinpark.jpg" },
  ];

  const favGames = [
    { name: "osu!", img: "osu.jpg", name2: "Skyrim", img2: "skyrim.jpg" },
    { name: "Starbound", img: "starbound.jpg", name2: "Terraria", img2: "terraria.jpg" },
    { name: "Rimworld", img: "rimworld.jpg", name2: "Risk of Rain 2", img2: "ror2.jpg" },
    { name: "Undertale", img: "undertale.jpg", name2: "Omori", img2: "omori.jpg" },
    { name: "Dead Cells", img: "deadcells.jpg", name2: "Escape from Duckov", img2: "duckov.jpg" },
    { name: "Echo Point Nova", img: "echopointnova.jpg", name2: "Elden Ring", img2: "eldenring.jpg" },
    { name: "Monster Hunter Rise", img: "mhr.jpg", name2: "Fear and Hunger", img2: "fah.jpg" },
    { name: "Minecraft", img: "minecraft.jpg", name2: "Left 4 Dead 2", img2: "l4d2.jpg" },
    { name: "Balatro", img: "balatro.jpg", name2: "Slay The Spire", img2: "slaythespire.jpg" },
    { name: "Cry of Fear", img: "cof.jpg", name2: "Metaphor: ReFantazio", img2: "metaphor.jpg" },
  ]

  const favAnime = [
    { name: "Migi & Dali", img: "migianddali.jpg" },
    { name: "My Happy Marriage", img: "myhappymarriage.jpg" },
    { name: "Assassination Classroom", img: "assassinationclassroom.jpg" },
    { name: "The Apothecary Diaries", img: "apothecarydiaries.jpg" },
    { name: "From Bureaucrat to Villainess: Dad's Been Reincarnated!", img: "villainess.jpg" },
    { name: "Welcome to Demon School! Iruma-kun", img: "iruma.jpg" },
    { name: "To Your Eternity", img: "toyoureternity.jpg" },
    { name: "Detective Conan", img: "detectiveconan.jpg" },
    { name: "Cowboy Bebop", img: "cowboybebop.jpg" },
    { name: "One Piece", img: "onepiece.jpg" },
    { name: "Odd Taxi", img: "oddtaxi.jpg" },
    { name: "Paprika", img: "paprika.jpg" },
    { name: "Monster", img: "monster.jpg" },
    { name: "Frieren: Beyond Journey's End", img: "frieren.jpg" },
    { name: "Gankutsuou: The Mount of Monte Cristo", img: "gankutsuou.jpg" },
    { name: "Vinland Saga", img: "vinlandsaga.jpg" },
    { name: "Ranking of Kings", img: "rankingofkings.jpg" },
    { name: "Made in Abyss", img: "madeinabyss.jpg" },
    { name: "Spy x Family", img: "spyxfamily.jpg" },
    { name: "Gurren Lagann", img: "gurrenlagann.jpg" },
    { name: "Code Geass", img: "codegeass.jpg" },
  ]

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: true,
  });

  const [activeList, setActiveList] = useState<"anime" | "music" | "games" | null>(null);

  const openGames = () => {
    setActiveList("games");
  }

  const openMusic = () => {
    setActiveList("music");
  }

  const openAnime = () => {
    setActiveList("anime");
  }

  const closeList = () => {
    setActiveList(null);
  }

  useEffect(() => {
    gsap.fromTo(carouselRef.current, { opacity: 0, }, { opacity: 1, duration: 1, ease: "power2.out" });
  }, [activeList]);

  return (
    <div className="min-w-screen min-h-screen grid grid-cols-[3.5fr_1fr] z-50">
      <div className="grid grid-rows-[1fr_6fr_1fr] z-50 bg-[#17191a]">
        <div className="flex items-end flex-col z-50 bg-[#17191a]">
          {activeList === null || (
            <h1 className="text-white pt-2 pr-4 text-4xl cursor-pointer x nonsel" onClick={closeList}>✖</h1>
          )}
        </div>
        
        <div className="overflow-hidden flex items-center justify-center" ref={carouselRef}>
          <div className="overflow-hidden flex items-center justify-center" ref={emblaRef}>
          <div className="flex">
          {/* ANIME */}
            {activeList === "anime" && favAnime.map((anime, index) => (
              <div
                key={index}
                className="flex-[0_0_80%] sm:flex-[0_0_25%] flex flex-col items-center py-2 nonsel"
                draggable="false"
              >
                <Image
                  src={`/images/about/anime/${anime.img}`}
                  alt={anime.name}
                  width={300}
                  height={300}
                  className="rounded-xl"style={{ pointerEvents: "none" }}
                />
                <p className="text-white mt-2 text-center">{anime.name}</p>
              </div>
            ))}

          {/* MUSIC */}
            {activeList === "music" && favMusic.map((music, index) => (
              <div
                key={index}
                className="sm:flex-[0_0_40%] md:flex-[0_0_30%] xl:flex-[0_0_20%] flex flex-col items-center py-2 nonsel"
                draggable="false"
              >
                <Image
                  src={`/images/about/music/${music.img}`}
                  alt={music.name}
                  width={300}
                  height={300}
                  className="rounded-xl"
                  style={{ pointerEvents: "none" }}
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

            {/* GAMES */}
            {activeList === "games" && favGames.map((game, index) => (
              <div
                key={index}
                className="sm:flex-[0_0_40%] md:flex-[0_0_30%] xl:flex-[0_0_15%] flex flex-col items-center py-2 nonsel"
                draggable="false"
              >
                <Image
                  src={`/images/about/games/${game.img}`}
                  alt={game.name}
                  width={200}
                  height={200}
                  className="rounded-xl"
                  style={{ pointerEvents: "none" }}
                />
                <p className="text-white mt-2">{game.name}</p>
                <br></br>
                <Image
                  src={`/images/about/games/${game.img2}`}
                  alt={game.name2}
                  width={200}
                  height={200}
                  className="rounded-xl"
                />
                <p className="text-white mt-2">{game.name2}</p>
              </div>
            ))}

          </div>

          </div>
        </div>
        <div className="flex items-center justify-end flex-col z-50 bg-[#17191a]">
          {activeList === null || (
            <p className="text-xs text-white/70 pb-1 nonsel">© respective creators / I don't own any images used above</p>
          )}
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
        <p className="italic">? <span className="underline cursor-pointer" onClick={openGames}>games</span></p>
        <p className="italic">? <span className="underline cursor-pointer" onClick={openAnime}>anime</span></p>
        <p className="italic">? <span className="underline cursor-pointer" onClick={openMusic}>music</span></p>
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