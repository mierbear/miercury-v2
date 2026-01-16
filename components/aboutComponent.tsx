"use client";
import { use, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function Home() {
  const carouselContainerRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLParagraphElement | null>(null);
  const animeRef = useRef<HTMLParagraphElement | null>(null);
  const musicRef = useRef<HTMLParagraphElement | null>(null);
  const gamesRef = useRef<HTMLParagraphElement | null>(null);

  // const listRefs: Record<ListKeys, React.RefObject<HTMLParagraphElement | null>> = {
  //   anime: animeRef,
  //   music: musicRef,
  //   games: gamesRef,
  // };
  // ended up not using this.. good learning experience tho lol

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: true,
  });

  const birthYear = 2002;
  const birthMonth = 10;
  const birthDay = 11;

  const today = new Date();
  const currentYear = today.getFullYear();

  const birthdayThisYear = new Date(currentYear, birthMonth - 1, birthDay);

  let age = currentYear - birthYear;
  if (today < birthdayThisYear) {
    age--;
  }

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

  type ListKeys = "anime" | "music" | "games";

  const [activeList, setActiveList] = useState<ListKeys | null>(null);

  const openList = (category: ListKeys) => {
    if (!aboutRef.current || !carouselContainerRef.current) return;

    carouselContainerRef.current.style.opacity = "1";
    aboutRef.current.style.pointerEvents = "none";

    // not the same
    if (activeList !== category && activeList !== null) {
      closeList(category);
    }

    // the same
    else if (activeList === category) {
      closeList(category);
    }

    // nothing
    else {
      setActiveList(category);
    }

    setTimeout(() => {
      if (!aboutRef.current) return;
      aboutRef.current.style.pointerEvents = "auto";
    }, 400);
  }

  const closeList = (category: ListKeys | null) => {
    if (!aboutRef.current || !carouselContainerRef.current) return;

    carouselContainerRef.current.style.opacity = "0";
    aboutRef.current.style.pointerEvents = "none";
    
    setTimeout(() => {

      // not the same
      if (activeList !== category && activeList !== null) {
        if (!carouselContainerRef.current) return;
        console.log("NOT THE SAME:", activeList);
        carouselContainerRef.current.style.opacity = "1";
        setActiveList(category);
        
        // the same
      } else if (activeList === category) {
        setActiveList(null);
        console.log("THE SAME:", activeList);
        
        // nothing
      } else {
        setActiveList(category);
        console.log("NOTHING:", activeList);
      }
      
    }, 400);
  }

  return (
    <div className="min-w-screen min-h-screen max-h-screen flex flex-col items-center justify-center">
      
    <div className="h-screen xl:w-[60vw] lg:w-[80vw] w-screen grid grid-cols-[5fr_3fr]">
      <div className="bg-white flex flex-col items-center justify-center">
      </div>
      <div className="bg-black flex flex-col px-12 pt-36 text-white nonsel" ref={aboutRef}>
        <h1 className="font-bold text-3xl">About me:</h1>
        <p>Kyle | {age} | INTJ | Libra</p>
        <hr className="my-2 border-white/20" />
        <h3 className="font-bold pb-1">things i like:</h3>
        <p>✦ playing piano/guitar</p>
        <p>✦ spirituality/mysticism</p>
        <p>✦ hermeticism/gnosticism/etc.</p>
        <p>✦ calisthenics/lifting</p>

        <p className={`text-yellow-200 flex`}>
          <span className={`text-yellow-200 mr-2.25 transition-mr transition-scale duration-300 ${activeList === "anime" && "scale-150 mr-4 spin"}`}>
            {activeList === "anime" ? "★" : "✦"}
          </span>

          <span
          className={`${activeList === "anime" && "font-bold white-glow italic underline scale-125"} transition-scale duration-300 cursor-pointer`}
          ref={animeRef}
          onClick={() => {openList("anime")}}>
            anime
          </span>
        </p>

        <p className={`text-yellow-200 flex`}>
          <span className={`text-yellow-200 mr-2.25 transition-mr transition-scale duration-300 ${activeList === "music" && "scale-150 mr-4 spin"}`}>
            {activeList === "music" ? "★" : "✦"}
          </span>

          <span
          className={`${activeList === "music" && "font-bold white-glow italic underline scale-125"} transition-scale duration-300 cursor-pointer`}
          ref={musicRef}
          onClick={() => {openList("music")}}>
            music
          </span>
        </p>
        
        <p className={`text-yellow-200 flex`}>
          <span className={`text-yellow-200 mr-2.25 transition-mr transition-scale duration-300 ${activeList === "games" && "scale-150 mr-4 spin"}`}>
            {activeList === "games" ? "★" : "✦"}
          </span>

          <span
          className={`${activeList === "games" && "font-bold white-glow italic underline scale-125"} transition-scale duration-300 cursor-pointer`}
          ref={gamesRef}
          onClick={() => {openList("games")}}>
            games
          </span>
        </p>
        
        <p>✦ coding</p>
        <p>✦ drawing</p>
        <hr className="my-2 border-white/20" />
        <h3 className="font-bold pb-1">things i dislike:</h3>
        <p>🞨 nihilism</p>
        <p>🞨 ants</p>
        <hr className="my-2 border-white/20" />

      </div>
    </div>

    <div className={`w-screen h-[30vh] z-100 self-end bg-yellow-300 py-4 bottom-12 absolute transition-opacity duration-400 ${activeList || "opacity-0"}`}
      ref={carouselContainerRef}
    >

      <div className={`overflow-hidden flex items-center justify-center h-full w-full transition-opacity duration-400 ${activeList ? "opacity-100" : "opacity-0"}`}>

        <div className="overflow-hidden flex items-center justify-center h-full w-full" ref={emblaRef}>
          <div className="flex h-full">

            {/* anime */}
            {activeList === "anime" && favAnime.map((anime, index) => (
              <div
                key={index}
                className={`
                flex-[0_0_28%]
                sm:flex-[0_0_24%]
                md:flex-[0_0_18%]
                lg:flex-[0_0_14%]
                xl:flex-[0_0_9%]
                px-1 h-full flex flex-col items-center nonsel relative
                `}
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

            {/* music */}
            {activeList === "music" && favMusic.map((music, index) => (
              <div
                key={index}
                className={`
                flex-[0_0_43%]
                sm:flex-[0_0_36%]
                md:flex-[0_0_27%]
                lg:flex-[0_0_21%]
                xl:flex-[0_0_14%]
                px-1 h-full flex flex-col items-center nonsel relative
                `}
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

            {/* games */}
            {activeList === "games" && favGames.map((games, index) => (
              <div
                key={index}
                className={`
                flex-[0_0_28%]
                sm:flex-[0_0_24%]
                md:flex-[0_0_18%]
                lg:flex-[0_0_14%]
                xl:flex-[0_0_9%]
                px-1 h-full flex flex-col items-center nonsel relative
                `}
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