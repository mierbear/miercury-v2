"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Home() {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // this code is such a mess LOL
  const favMusic = [
      {  tag: "love", name: "TAK / DORIDORI", img: "tak.jpg",
      tag2: "love", name2: "Chikoi The Maid", img2: "chikoi.jpg" },
    
      {  tag: "best", name: "Pink Guy", img: "pinkguy.jpg",
      tag2: "", name2: "Joji", img2: "joji.jpg" },
    
      {  tag: "love", name: "Sasuke Haraguchi", img: "sasukeharaguchi.jpg",
      tag2: "love", name2: "Deco*27", img2: "deco27.jpg" },
      
      {  tag: "", name: "Uplift Spice", img: "upliftspice.jpg",
      tag2: "", name2: "Kikuo", img2: "kikuo.jpg" },
    
      {  tag: "", name: "Kinoue64", img: "kinoue64.jpg",
      tag2: "", name2: "Dusqk", img2: "dusqk.jpg" },
    
      {  tag: "love", name: "Porter Pobinson", img: "porterrobinson.jpg",
      tag2: "love", name2: "Kanye West", img2: "kanye.jpg" },
    
      {  tag: "", name: "Kinoko Teikoku", img: "kinokoteikoku.jpg",
      tag2: "", name2: "My Dead Girlfriend", img2: "mydeadgirlfriend.jpg" },
    
      {  tag: "", name: "Pacific Purgatory", img: "pacificpurgatory.jpg",
      tag2: "", name2: "Steakfry", img2: "steakfry.jpg" },
    
      {  tag: "love", name: "Creepy Nuts", img: "creepynuts.jpg",
      tag2: "", name2: "Vaundy", img2: "vaundy.jpg" },
    
      {  tag: "", name: "xi", img: "xi.jpg",
      tag2: "", name2: "ginkiha", img2: "ginkiha.jpg" },
    
      {  tag: "", name: "System of a Down", img: "soad.jpg",
      tag2: "love", name2: "Linkin Park", img2: "linkinpark.jpg" },
  ];

  const favGames = [
      {  tag: "best", name: "Rimworld", img: "rimworld.jpg",
      tag2: "", name2: "Risk of Rain 2", img2: "ror2.jpg" },

      {  tag: "best", name: "7k osu!mania", img: "osu.jpg",
      tag2: "", name2: "Skyrim", img2: "skyrim.jpg" },
    
      {  tag: "love", name: "Starbound", img: "starbound.jpg",
      tag2: "love", name2: "Terraria", img2: "terraria.jpg" },
    
      {  tag: "", name: "Undertale", img: "undertale.jpg",
      tag2: "", name2: "Omori", img2: "omori.jpg" },
    
      {  tag: "", name: "Dead Cells", img: "deadcells.jpg",
      tag2: "", name2: "Escape from Duckov", img2: "duckov.jpg" },
    
      {  tag: "", name: "Echo Point Nova", img: "echopointnova.jpg",
      tag2: "", name2: "Elden Ring", img2: "eldenring.jpg" },
    
      {  tag: "", name: "Monster Hunter Rise", img: "mhr.jpg",
      tag2: "", name2: "Fear and Hunger", img2: "fah.jpg" },
    
      {  tag: "", name: "Minecraft", img: "minecraft.jpg",
      tag2: "", name2: "Left 4 Dead 2", img2: "l4d2.jpg" },
    
      {  tag: "", name: "Balatro", img: "balatro.jpg",
      tag2: "", name2: "Slay The Spire", img2: "slaythespire.jpg" },
    
      {  tag: "", name: "Cry of Fear", img: "cof.jpg",
      tag2: "", name2: "Metaphor: ReFantazio", img2: "metaphor.jpg" },
  ]

  const favAnime = [
    {  tag: "best", name: "Code Geass", img: "codegeass.jpg" },
    {  tag: "best", name: "Gurren Lagann", img: "gurrenlagann.jpg" },
    {  tag: "best", name: "Gankutsuou: The Mount of Monte Cristo", img: "gankutsuou.jpg" },
    {  tag: "best", name: "Monster", img: "monster.jpg" },
    {  tag: "love", name: "Ranking of Kings", img: "rankingofkings.jpg" },
    {  tag: "love", name: "Vinland Saga", img: "vinlandsaga.jpg" },
    {  tag: "love", name: "Made in Abyss", img: "madeinabyss.jpg" },
    {  tag: "love", name: "Spy x Family", img: "spyxfamily.jpg" },
    {  tag: "", name: "Migi & Dali", img: "migianddali.jpg" },
    {  tag: "", name: "My Happy Marriage", img: "myhappymarriage.jpg" },
    {  tag: "", name: "Assassination Classroom", img: "assassinationclassroom.jpg" },
    {  tag: "", name: "The Apothecary Diaries", img: "apothecarydiaries.jpg" },
    {  tag: "", name: "From Bureaucrat to Villainess: Dad's Been Reincarnated!", img: "villainess.jpg" },
    {  tag: "", name: "Welcome to Demon School! Iruma-kun", img: "iruma.jpg" },
    {  tag: "", name: "To Your Eternity", img: "toyoureternity.jpg" },
    {  tag: "", name: "Detective Conan", img: "detectiveconan.jpg" },
    {  tag: "", name: "Cowboy Bebop", img: "cowboybebop.jpg" },
    {  tag: "", name: "One Piece", img: "onepiece.jpg" },
    {  tag: "", name: "Odd Taxi", img: "oddtaxi.jpg" },
    {  tag: "", name: "Paprika", img: "paprika.jpg" },
    {  tag: "", name: "Frieren: Beyond Journey's End", img: "frieren.jpg" },
  ]

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: true,
  });

  const [activeList, setActiveList] = useState<"anime" | "music" | "games" | null>(null);

  const openGames = () => {
    if (activeList === "games") {
      closeList();
    } else {
      setActiveList("games");
    }
  }

  const openMusic = () => {
    if (activeList === "music") {
      closeList();
    } else {
      setActiveList("music");
    }
  }

  const openAnime = () => {
    if (activeList === "anime") {
      closeList();
    } else {
      setActiveList("anime");
    }
  }

  const closeList = () => {
    setActiveList(null);
  }

  useEffect(() => {
    gsap.fromTo(carouselRef.current, { opacity: 0, }, { opacity: 1, duration: 1, ease: "power2.out" });
  }, [activeList]);

  return (
    <div className="min-w-screen min-h-screen max-h-screen grid grid-rows-[1.5fr_2fr] grid-cols-1 md:grid-rows-1 md:grid-cols-[4fr_2fr] z-50">
      
      <div className="py-8 md:py-0 relative grid grid-rows-[0fr_6fr_0fr] md:grid-rows-[1fr_6fr_1fr] z-50 bg-[#17191a] order-2 md:order-1">

        <div className="flex items-end flex-col z-100">
        </div>
        
        <div className="overflow-hidden flex items-center justify-center" ref={carouselRef}>
          <div className="overflow-hidden flex items-center justify-center" ref={emblaRef}>
            <div className="flex">
            {/* ANIME */}
              {activeList === "anime" && favAnime.map((anime, index) => (
                <div
                  key={index}
                  className="flex-[0_0_7%] flex flex-col items-center py-2 nonsel"
                  draggable="false"
                >
                  <div className="relative w-48 h-72 sm:w-52 sm:h-78 xl:w-64 xl:h-96">
                    <Image
                      src={`/images/about/anime/${anime.img}`}
                      alt={anime.name}
                      fill
                      sizes="
                      (max-width: 640px) 128px,
                      (max-width: 1280px) 160px,
                      192px
                      "
                      className="rounded-xl object-cover"
                    />
                  </div>
                  <p className={`text-white mt-2 text-center ${anime.tag}`}>{anime.name}</p>
                </div>
              ))}

            {/* MUSIC */}
              {activeList === "music" && favMusic.map((music, index) => (
                <div
                  key={index}
                  className="flex-[0_0_12%] flex flex-col items-center py-2 nonsel"
                  draggable="false"
                >
                  <div className="relative w-48 h-48 sm:w-40 sm:h-40 xl:w-64 xl:h-64">
                    <Image
                      src={`/images/about/music/${music.img}`}
                      alt={music.name}
                      fill
                      sizes="
                      (max-width: 640px) 128px,
                      (max-width: 1280px) 160px,
                      192px
                      "
                      className="rounded-xl object-cover"
                    />
                  </div>
                  <p className={`text-white mt-2 text-center ${music.tag}`}>{music.name}</p>
                  <br></br>
                  <div className="relative w-48 h-48 sm:w-40 sm:h-40 xl:w-64 xl:h-64">
                    <Image
                      src={`/images/about/music/${music.img2}`}
                      alt={music.name2}
                      fill
                      sizes="
                      (max-width: 640px) 128px,
                      (max-width: 1280px) 160px,
                      192px
                      "
                      className="rounded-xl object-cover"
                    />
                  </div>
                  <p className={`text-white mt-2 text-center ${music.tag2}`}>{music.name2}</p>
                </div>
              ))}

              {/* GAMES */}
              {activeList === "games" && favGames.map((game, index) => (
                <div
                  key={index}
                  className="flex-[0_0_12%] flex flex-col items-center py-2 nonsel"
                  draggable="false"
                  style={{ pointerEvents: "none" }}
                >
                  <div className="relative w-32 h-48 sm:w-40 sm:h-60 xl:w-48 xl:h-72">
                    <Image
                      src={`/images/about/games/${game.img}`}
                      alt={game.name}
                      fill
                      sizes="
                      (max-width: 640px) 128px,
                      (max-width: 1280px) 160px,
                      192px
                      "
                      className="rounded-xl object-cover"
                    />
                  </div>

                    <p className={`text-white mt-2 text-center ${game.tag}`}>{game.name}</p>
                  <br></br>
                  <div className="relative w-32 h-48 sm:w-40 sm:h-60 xl:w-48 xl:h-72">
                    <Image
                      src={`/images/about/games/${game.img2}`}
                      alt={game.name2}
                      fill
                      sizes="
                      (max-width: 640px) 128px,
                      (max-width: 1280px) 160px,
                      192px
                      "
                      className="rounded-xl object-cover"
                    />
                  </div>
                  <p className={`text-white mt-2 text-center ${game.tag2}`}>{game.name2}</p>
                </div>
              ))}

            </div>
          </div>
        </div>

        <div className="flex items-center justify-end flex-col z-50">
          {activeList === null || (
            <p className="text-xs text-white/70 pb-1 nonsel">© respective creators / I don't own any images used above</p>
          )}
        </div>

        <div className="absolute flex z-60 bg-linear-to-l from-black via-transparent to-transparent pointer-events-none top-0 right-0 h-full w-36 md:visible invisible">
        </div>

      </div>


      <div className="flex p-8 justify-center max-h-screen flex-col z-60 bg-linear-to-r bg-black text-white order-1 md:order-2 md:text-sm text-xs">

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