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
    
      {  tag: "", name: "Porter Pobinson", img: "porterrobinson.jpg",
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

      {  tag: "best", name: "osu!", img: "osu.jpg",
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
                  className="rounded-xl"
                  style={{ pointerEvents: "none" }}
                />
                <p className={`text-white mt-2 text-center ${anime.tag}`}>{anime.name}</p>
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
                <p className={`text-white mt-2 text-center ${music.tag}`}>{music.name}</p>
                <br></br>
                <Image
                  src={`/images/about/music/${music.img2}`}
                  alt={music.name2}
                  width={300}
                  height={300}
                  className="rounded-xl"
                />
                <p className={`text-white mt-2 text-center ${music.tag2}`}>{music.name2}</p>
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
                  <p className={`text-white mt-2 text-center ${game.tag}`}>{game.name}</p>
                <br></br>
                <Image
                  src={`/images/about/games/${game.img2}`}
                  alt={game.name2}
                  width={200}
                  height={200}
                  className="rounded-xl"
                />
                <p className={`text-white mt-2 text-center ${game.tag2}`}>{game.name2}</p>
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