"use client";
import { use, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function Home() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [emblaRef] = useEmblaCarousel({
      loop: true,
      align: "center",
      dragFree: true,
    });

  const favAnime = [
    {  comment: "its my absolute favorite. chokes me up when i think about it vro..", tag: "best", name: "Gurren Lagann", img: "gurrenlagann.jpg" },
    {  comment: "", tag: "best", name: "Code Geass", img: "codegeass.jpg" },
    {  comment: "crazy tearjerker", tag: "love", name: "Ranking of Kings", img: "rankingofkings.jpg" },
    {  comment: "", tag: "love", name: "Spy x Family", img: "spyxfamily.jpg" },
    {  comment: "", tag: "", name: "The Apothecary Diaries", img: "apothecarydiaries.jpg" },
    {  comment: "", tag: "", name: "My Happy Marriage", img: "myhappymarriage.jpg" },
    {  comment: "", tag: "", name: "From Bureaucrat to Villainess: Dad's Been Reincarnated!", img: "villainess.jpg" },
    {  comment: "", tag: "", name: "Welcome to Demon School! Iruma-kun", img: "iruma.jpg" },
    {  comment: "", tag: "", name: "Migi & Dali", img: "migianddali.jpg" },
    {  comment: "", tag: "", name: "Assassination Classroom", img: "assassinationclassroom.jpg" },
    {  comment: "", tag: "", name: "One Piece", img: "onepiece.jpg" },
    {  comment: "", tag: "", name: "Odd Taxi", img: "oddtaxi.jpg" },
    {  comment: "", tag: "", name: "Cowboy Bebop", img: "cowboybebop.jpg" },
    {  comment: "", tag: "", name: "Paprika", img: "paprika.jpg" },
    {  comment: "", tag: "", name: "Detective Conan", img: "detectiveconan.jpg" },
    {  comment: "", tag: "", name: "Frieren: Beyond Journey's End", img: "frieren.jpg" },
    {  comment: "", tag: "love", name: "To Your Eternity", img: "toyoureternity.jpg" },
    {  comment: "", tag: "love", name: "Made in Abyss", img: "madeinabyss.jpg" },
    {  comment: "", tag: "love", name: "Vinland Saga", img: "vinlandsaga.jpg" },
    {  comment: "", tag: "best", name: "Monster", img: "monster.jpg" },
    {  comment: "", tag: "best", name: "Gankutsuou: The Count of Monte Cristo", img: "gankutsuou.jpg" },
  ];

  return (
    <div className="min-w-screen min-h-screen max-h-screen flex flex-col items-center justify-center">
      
    <div className="h-screen md:w-[60vw] grid grid-cols-[2fr_3fr]">
      <div className="bg-white flex flex-col items-center justify-center">
      </div>
      <div className="bg-black flex flex-col items-center justify-center">
        <p className="md:text-8xl lg:text-9xl sm:text-7xl text-6xl text-white font-bold">TEXTX</p>
      </div>
    </div>

    <div className="w-screen h-[30vh] z-100 self-end bg-yellow-300 py-4 bottom-12 absolute">

      <div className="overflow-hidden flex items-center justify-center h-full w-full"
        ref={carouselRef}
      >
        <div className="overflow-hidden flex items-center justify-center h-full w-full" ref={emblaRef}>
          <div className="flex h-full">
            {favAnime.map((anime, index) => (
              <div
                key={index}
                className="flex-[0_0_32%] sm:flex-[0_0_26%] md:flex-[0_0_20%] lg:flex-[0_0_10%] px-1 h-full flex flex-col items-center nonsel relative"
                draggable="false"
              >
                <div className="relative w-auto h-full overflow-hidden rounded-xl">
                  <img
                    src={`/images/about/anime/${anime.img}`}
                    alt={anime.name}
                    className="h-full w-auto object-cover"
                  />

                  <p className={`text-center absolute bottom-2 left-2 right-2 text-xs text-white bg-black/80 p-1 border border-white font-bold rounded-md ${anime.tag}`}>
                    {anime.name}
                  </p>
                </div>
              </div>
            ))}
            {/* {activeList === "music" && favMusic.map((music, index) => (
              <div
                key={index}
                className="flex-[0_0_12%] flex flex-col items-center py-2 nonsel"
                draggable="false"
              >
                <div className="relative w-48 h-48 sm:w-40 sm:h-40 xl:w-64 xl:h-64">
                  <img
                    src={`/images/about/music/${music.img}`}
                    alt={music.name}
                    sizes="
                    (max-width: 640px) 128px,
                    (max-width: 1280px) 160px,
                    192px
                    "
                    className="poster rounded-xl object-cover"
                    onMouseEnter={() => {hoverHandle(music.comment)}}
                    onMouseLeave={unhoverHandle}
                  />
                </div>
                <p className={`text-white mt-2 text-center ${music.tag}`}>{music.name}</p>
                <br></br>
                <div className="relative w-48 h-48 sm:w-40 sm:h-40 xl:w-64 xl:h-64">
                  <img
                    src={`/images/about/music/${music.img2}`}
                    alt={music.name2}
                    sizes="
                    (max-width: 640px) 128px,
                    (max-width: 1280px) 160px,
                    192px
                    "
                    className="poster rounded-xl object-cover"
                    onMouseEnter={() => {hoverHandle(music.comment2)}}
                    onMouseLeave={unhoverHandle}
                  />
                </div>
                <p className={`text-white mt-2 text-center ${music.tag2}`}>{music.name2}</p>
              </div>
            ))} */}

            {/* {activeList === "games" && favGames.map((game, index) => (
              <div
                key={index}
                className="flex-[0_0_12%] flex flex-col items-center py-2 nonsel"
                draggable="false"
              >
                <div className="relative w-32 h-48 sm:w-40 sm:h-60 xl:w-48 xl:h-72">
                  <img
                    src={`/images/about/games/${game.img}`}
                    alt={game.name}
                    sizes="
                    (max-width: 640px) 128px,
                    (max-width: 1280px) 160px,
                    192px
                    "
                    className="poster rounded-xl object-cover"
                    onMouseEnter={() => {hoverHandle(game.comment)}}
                    onMouseLeave={unhoverHandle}
                  />
                </div>

                  <p className={`text-white mt-2 text-center ${game.tag}`}>{game.name}</p>
                <br></br>
                <div className="relative w-32 h-48 sm:w-40 sm:h-60 xl:w-48 xl:h-72">
                  <img
                    src={`/images/about/games/${game.img2}`}
                    alt={game.name2}
                    sizes="
                    (max-width: 640px) 128px,
                    (max-width: 1280px) 160px,
                    192px
                    "
                    className="poster rounded-xl object-cover"
                    onMouseEnter={() => {hoverHandle(game.comment2)}}
                    onMouseLeave={unhoverHandle}
                  />
                </div>
                <p className={`text-white mt-2 text-center ${game.tag2}`}>{game.name2}</p>
              </div>
            ))} */}

          </div>
        </div>
      </div>
      
    </div>

    </div>
  );
}