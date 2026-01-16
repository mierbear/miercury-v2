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
    {  
      name: "Gurren Lagann",
      img: "gurrenlagann.jpg",
      comment: "its my absolute favorite. chokes me up when i think about it vro..",
      tag: "best",
    },
    {  
      name: "Code Geass",
      img: "codegeass.jpg",
      comment: "",
      tag: "best",
    },
    {  
      name: "Ranking of Kings",
      img: "rankingofkings.jpg",
      comment: "crazy tearjerker",
      tag: "love",
    },
    {  
      name: "Spy x Family",
      img: "spyxfamily.jpg",
      comment: "",
      tag: "love",
    },
    {  
      name: "The Apothecary Diaries",
      img: "apothecarydiaries.jpg",
      comment: "",
      tag: "",
    },
    {  
      name: "My Happy Marriage",
      img: "myhappymarriage.jpg",
      comment: "",
      tag: "",
    },
    {  
      name: "From Bureaucrat to Villainess: Dad's Been Reincarnated!",
      img: "villainess.jpg",
      comment: "",
      tag: "",
    },
    {  
      name: "Welcome to Demon School! Iruma-kun",
      img: "iruma.jpg",
      comment: "",
      tag: "",
    },
    {  
      name: "Migi & Dali",
      img: "migianddali.jpg",
      comment: "",
      tag: "",
    },
    {  
      name: "Assassination Classroom",
      img: "assassinationclassroom.jpg",
      comment: "",
      tag: "",
    },
    {  
      name: "One Piece",
      img: "onepiece.jpg",
      comment: "",
      tag: "",
    },
    {  
      name: "Odd Taxi",
      img: "oddtaxi.jpg",
      comment: "",
      tag: "",
    },
    {  
      name: "Cowboy Bebop",
      img: "cowboybebop.jpg",
      comment: "",
      tag: "",
    },
    {  
      name: "Paprika",
      img: "paprika.jpg",
      comment: "",
      tag: "",
    },
    {  
      name: "Detective Conan",
      img: "detectiveconan.jpg",
      comment: "",
      tag: "",
    },
    {  
      name: "Frieren: Beyond Journey's End",
      img: "frieren.jpg",
      comment: "",
      tag: "",
    },
    {  
      name: "To Your Eternity",
      img: "toyoureternity.jpg",
      comment: "",
      tag: "love",
    },
    {  
      name: "Made in Abyss",
      img: "madeinabyss.jpg",
      comment: "",
      tag: "love",
    },
    {  
      name: "Vinland Saga",
      img: "vinlandsaga.jpg",
      comment: "",
      tag: "love",
    },
    {  
      name: "Monster",
      img: "monster.jpg",
      comment: "",
      tag: "best",
    },
    {  
      name: "Gankutsuou: The Count of Monte Cristo",
      img: "gankutsuou.jpg",
      comment: "",
      tag: "best",
    },
  ];

  const favGames = [
    {
      name: "Rimworld",
      img: "rimworld.jpg",
      comment: "everytime i start the game i end up playing for more than 20 hours xd",
      tag: "best",
    },
    {
      name: "Risk of Rain 2",
      img: "ror2.jpg",
      comment: "",
      tag: "",
    },

    {
      name: "osu!",
      img: "osu.jpg",
      comment: "7k mania is my crack cocaine...",
      tag: "best",
    },
    {
      name: "Skyrim",
      img: "skyrim.jpg",
      comment: "",
      tag: "",
    },

    {
      name: "Starbound",
      img: "starbound.jpg",
      comment: "",
      tag: "love",
    },
    {
      name: "Terraria",
      img: "terraria.jpg",
      comment: "",
      tag: "love",
    },

    {
      name: "Undertale",
      img: "undertale.jpg",
      comment: "",
      tag: "",
    },
    {
      name: "Omori",
      img: "omori.jpg",
      comment: "legit actually mid but still holds a really special place in my heart lol",
      tag: "",
    },

    {
      name: "Dead Cells",
      img: "deadcells.jpg",
      comment: "",
      tag: "",
    },
    {
      name: "Escape from Duckov",
      img: "duckov.jpg",
      comment: "",
      tag: "",
    },

    {
      name: "Echo Point Nova",
      img: "echopointnova.jpg",
      comment: "",
      tag: "",
    },
    {
      name: "Elden Ring",
      img: "eldenring.jpg",
      comment: "",
      tag: "",
    },

    {
      name: "Monster Hunter Rise",
      img: "mhr.jpg",
      comment: "",
      tag: "",
    },
    {
      name: "Fear and Hunger",
      img: "fah.jpg",
      comment: "",
      tag: "",
    },

    {
      name: "Balatro",
      img: "balatro.jpg",
      comment: "i love gambling",
      tag: "",
    },
    {
      name: "Slay The Spire",
      img: "slaythespire.jpg",
      comment: "",
      tag: "",
    },

    {
      name: "Cry of Fear",
      img: "cof.jpg",
      comment: "",
      tag: "",
    },
    {
      name: "Metaphor: ReFantazio",
      img: "metaphor.jpg",
      comment: "",
      tag: "",
    },

    {
      name: "Minecraft",
      img: "minecraft.jpg",
      comment: "rlcraft is the only thing that makes me wanna play it ngl",
      tag: "love",
    },
    {
      name: "Left 4 Dead 2",
      img: "l4d2.jpg",
      comment: "",
      tag: "",
    },
  ];

  const favMusic = [
    {
      name: "TAK / DORIDORI",
      img: "tak.jpg",
      comment: "",
      tag: "love",
    },
    {
      name: "Chikoi The Maid",
      img: "chikoi.jpg",
      comment: "",
      tag: "love",
    },

    {
      name: "Pink Guy",
      img: "pinkguy.jpg",
      comment: "",
      tag: "best",
    },
    {
      name: "Joji",
      img: "joji.jpg",
      comment: "",
      tag: "best",
    },

    {
      name: "Sasuke Haraguchi",
      img: "sasukeharaguchi.jpg",
      comment: "",
      tag: "love",
    },
    {
      name: "Deco*27",
      img: "deco27.jpg",
      comment: "",
      tag: "love",
    },

    {
      name: "Uplift Spice",
      img: "upliftspice.jpg",
      comment: "",
      tag: "",
    },
    {
      name: "Kikuo",
      img: "kikuo.jpg",
      comment: "",
      tag: "",
    },

    {
      name: "Kinoue64",
      img: "kinoue64.jpg",
      comment: "",
      tag: "",
    },
    {
      name: "Dusqk",
      img: "dusqk.jpg",
      comment: "",
      tag: "",
    },

    {
      name: "Porter Robinson",
      img: "porterrobinson.jpg",
      comment: "",
      tag: "love",
    },
    {
      name: "Kanye West",
      img: "kanye.jpg",
      comment: "",
      tag: "love",
    },

    {
      name: "Kinoko Teikoku",
      img: "kinokoteikoku.jpg",
      comment: "",
      tag: "",
    },
    {
      name: "My Dead Girlfriend",
      img: "mydeadgirlfriend.jpg",
      comment: "",
      tag: "",
    },

    {
      name: "Pacific Purgatory",
      img: "pacificpurgatory.jpg",
      comment: "",
      tag: "",
    },
    {
      name: "Steakfry",
      img: "steakfry.jpg",
      comment: "",
      tag: "",
    },

    {
      name: "Creepy Nuts",
      img: "creepynuts.jpg",
      comment: "",
      tag: "love",
    },
    {
      name: "Vaundy",
      img: "vaundy.jpg",
      comment: "",
      tag: "",
    },

    {
      name: "xi",
      img: "xi.jpg",
      comment: "",
      tag: "",
    },
    {
      name: "ginkiha",
      img: "ginkiha.jpg",
      comment: "",
      tag: "",
    },

    {
      name: "System of a Down",
      img: "soad.jpg",
      comment: "",
      tag: "",
    },
    {
      name: "Linkin Park",
      img: "linkinpark.jpg",
      comment: "",
      tag: "love",
    },
  ];

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

  return (
    <div className="min-w-screen min-h-screen max-h-screen flex flex-col items-center justify-center">
      
    <div className="h-screen xl:w-[60vw] lg:w-[80vw] w-screen grid grid-cols-[2fr_3fr]">
      <div className="bg-white flex flex-col items-center justify-center">
      </div>
      <div className="bg-black flex flex-col items-center ">
        <p className="md:text-8xl lg:text-9xl sm:text-7xl text-6xl text-white font-bold cursor-pointer" onClick={() => {openAnime()}}>anime</p>
        <p className="md:text-8xl lg:text-9xl sm:text-7xl text-6xl text-white font-bold cursor-pointer" onClick={() => {openMusic()}}>music</p>
        <p className="md:text-8xl lg:text-9xl sm:text-7xl text-6xl text-white font-bold cursor-pointer" onClick={() => {openGames()}}>games</p>
      </div>
    </div>

    <div className="w-screen h-[30vh] z-100 self-end bg-yellow-300 py-4 bottom-12 absolute">

      <div className="overflow-hidden flex items-center justify-center h-full w-full"
        ref={carouselRef}
      >
        <div className="overflow-hidden flex items-center justify-center h-full w-full" ref={emblaRef}>
          <div className="flex h-full">
            {activeList === "anime" && favAnime.map((anime, index) => (
              <div
                key={index}
                className="
                flex-[0_0_28%]
                sm:flex-[0_0_24%]
                md:flex-[0_0_18%]
                lg:flex-[0_0_14%]
                xl:flex-[0_0_9%]
                px-1 h-full flex flex-col items-center nonsel relative"
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

            {activeList === "music" && favMusic.map((music, index) => (
              <div
                key={index}
                className="
                flex-[0_0_43%]
                sm:flex-[0_0_36%]
                md:flex-[0_0_27%]
                lg:flex-[0_0_21%]
                xl:flex-[0_0_14%]
                px-1 h-full flex flex-col items-center nonsel relative"
                draggable="false"
              >
                <div className="relative w-auto h-full overflow-hidden rounded-xl">
                  <img
                    src={`/images/about/music/${music.img}`}
                    alt={music.name}
                    className="h-full w-auto object-cover"
                  />

                  <p className={`text-center absolute bottom-2 left-2 right-2 text-xs text-white bg-black/80 p-1 border border-white font-bold rounded-md ${music.tag}`}>
                    {music.name}
                  </p>
                </div>
              </div>
            ))}

            {activeList === "games" && favGames.map((games, index) => (
              <div
                key={index}
                className="
                flex-[0_0_28%]
                sm:flex-[0_0_24%]
                md:flex-[0_0_18%]
                lg:flex-[0_0_14%]
                xl:flex-[0_0_9%]
                px-1 h-full flex flex-col items-center nonsel relative"
                draggable="false"
              >
                <div className="relative w-auto h-full overflow-hidden rounded-xl">
                  <img
                    src={`/images/about/games/${games.img}`}
                    alt={games.name}
                    className="h-full w-auto object-cover"
                  />

                  <p className={`text-center absolute bottom-2 left-2 right-2 text-xs text-white bg-black/80 p-1 border border-white font-bold rounded-md ${games.tag}`}>
                    {games.name}
                  </p>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>
      
    </div>

    </div>
  );
}