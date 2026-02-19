"use client";
import { use, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import TooltipComponent from "@/components/tooltipComponent";
import Marquee from "react-fast-marquee";

export default function Home() {
  const carouselContainerRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLParagraphElement | null>(null);
  const animeRef = useRef<HTMLParagraphElement | null>(null);
  const musicRef = useRef<HTMLParagraphElement | null>(null);
  const gamesRef = useRef<HTMLParagraphElement | null>(null);
  const meRef = useRef<HTMLParagraphElement | null>(null);

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
      name: "Code Geass",
      img: "codegeass.jpg",
      comment: "JIBUN WOOO SEKAAIII SAEE MOO",
      tag: "best",
    },
    {  
      name: "Gurren Lagann",
      img: "gurrenlagann.jpg",
      comment: "its my absolute favorite. chokes me up when i think about it vro",
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
      name: "Hunter x Hunter",
      img: "hunter.jpg",
      comment: "",
      tag: "love",
    },
    {  
      name: "Assassination Classroom",
      img: "assassinationclassroom.jpg",
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
      tag: "love",
    },
    {  
      name: "The Unaware Atelier Meister",
      img: "meister.jpg",
      comment: "many dont like it but i found it so stupidly ridiculous that i love it LOL",
      tag: "",
    },
    {  
      name: "Mashle",
      img: "mashle.jpg",
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
      name: "One Piece",
      img: "onepiece.jpg",
      comment: "",
      tag: "",
    },
    {  
      name: "Baki The Grappler",
      img: "baki.jpg",
      comment: "",
      tag: "",
    },
    {  
      name: "Drifting Home",
      img: "drifting.jpg",
      comment: "really endearing movie",
      tag: "love",
    },
    {  
      name: "The Boy and the Beast",
      img: "bakemono.jpg",
      comment: "",
      tag: "",
    },
    {  
      name: "Howl's Moving Castle",
      img: "howls.jpg",
      comment: "i love most ghibli films, but these three i adore the most",
      tag: "",
    },
    {  
      name: "Ponyo",
      img: "ponyo.jpg",
      comment: "i especially love this one. this was my childhood favorite",
      tag: "love",
    },
    {  
      name: "Spirited Away",
      img: "spirited.jpg",
      comment: "i love most ghibli films, but these three i adore the most",
      tag: "",
    },
    {  
      name: "Parasyte: The Maxim",
      img: "parasyte.jpg",
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
      tag: "love",
    },
    {  
      name: "Paprika",
      img: "paprika.jpg",
      comment: "",
      tag: "best",
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
      name: "The Great Pretender",
      img: "pretender.jpg",
      comment: "",
      tag: "best",
    },
    {  
      name: "Gankutsuou: The Count of Monte Cristo",
      img: "gankutsuou.jpg",
      comment: "",
      tag: "best",
    },
    {  
      name: "Monster",
      img: "monster.jpg",
      comment: "",
      tag: "best",
    },
  ];

  const favGames = [
    { name: "Rimworld", img: "rimworld.jpg", comment: "everytime i start the game i end up playing for more than 20 hours xd", tag: "best", },
    { name: "osu!", img: "osu.jpg", comment: "7k mania is my crack cocaine...", tag: "best", },
    { name: "Skyrim", img: "skyrim.jpg", comment: "", tag: "love", },
    { name: "Terraria", img: "terraria.jpg", comment: "", tag: "love", },
    { name: "Starbound", img: "starbound.jpg", comment: "", tag: "love", },
    { name: "Undertale", img: "undertale.jpg", comment: "", tag: "", },
    { name: "Omori", img: "omori.jpg", comment: "legit actually mid but still holds a really special place in my heart lol", tag: "", },
    { name: "Monster Hunter Rise", img: "mhr.jpg", comment: "", tag: "", },
    { name: "Escape from Duckov", img: "duckov.jpg", comment: "", tag: "", },
    { name: "Dead Cells", img: "deadcells.jpg", comment: "", tag: "love", },
    { name: "BlazBlue Entropy Effect", img: "blazblue.jpg", comment: "", tag: "love", },
    { name: "Grand Chase", img: "grandchase.jpg", comment: "", tag: "", },
    { name: "Elsword", img: "elsword.jpg", comment: "", tag: "", },
    { name: "Soul Knight", img: "soulknight.jpg", comment: "legit the only good phone game LOL", tag: "", },
    { name: "Sephiria", img: "sephiria.jpg", comment: "", tag: "", },
    { name: "Metaphor: ReFantazio", img: "metaphor.jpg", comment: "", tag: "", },
    { name: "Fear and Hunger", img: "fah.jpg", comment: "", tag: "", },
    { name: "Balatro", img: "balatro.jpg", comment: "i love gambling", tag: "", },
    { name: "Slay The Spire", img: "slaythespire.jpg", comment: "", tag: "", },
    { name: "Minecraft", img: "minecraft.jpg", comment: "rlcraft is the only thing that makes me wanna play it ngl", tag: "love", },
    { name: "Cry of Fear", img: "cof.jpg", comment: "", tag: "", },
    { name: "Echo Point Nova", img: "echopointnova.jpg", comment: "", tag: "", },
    { name: "Left 4 Dead 2", img: "l4d2.jpg", comment: "", tag: "", },
    { name: "Risk of Rain 2", img: "ror2.jpg", comment: "i know so many op exploits/glitches on mul-t (700 hours lol..)", tag: "love", },
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
      comment: "i mostly prefer his older songs though",
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
      tag: "best",
    },
    {
      name: "Porter Robinson",
      img: "porterrobinson.jpg",
      comment: "",
      tag: "best",
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

  useEffect(() => {
    const animeSrcs = favAnime.map((song) => `/images/about/anime/${song.img}`);
    const gamesSrcs = favGames.map((song) => `/images/about/games/${song.img}`);
    const musicSrcs = favMusic.map((song) => `/images/about/music/${song.img}`);

    const preload = [
      ...animeSrcs,
      ...gamesSrcs,
      ...musicSrcs,
    ];

    preload.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

  }, [])

  const aboutMe = [
    "i have hyperphantasia (1)",
    "you could call me a christian/buddhist",
    "i love cliche tropes and messages",
    "im a sucker for sad/motivational stories/music",
    "im sometimes forgetful lol",
    "i might have dementia",
    "i like ragebaiting my friends",
    "i like gaslighting my friends",
    "i like looking into conspiracy theories for fun",
    "i laugh about almost everything",
    "dont take everything i say seriously",
    "if i've pissed you off before, i love you",
    "i never understood fanbases or being obsessed with something, i value self-expression and individuality highly",
    "i might have dementia",
  ]

  type ListKeys = "anime" | "music" | "games";

  const [activeList, setActiveList] = useState<ListKeys | null>(null);

  const openList = (category: ListKeys) => {
    if (!aboutRef.current || !carouselContainerRef.current) return;


    // carouselContainerRef.current.style.opacity = "0";
    // carouselContainerRef.current.style.display = "block";
    // setTimeout(() => {
    //   if (!carouselContainerRef.current) return;
    //   carouselContainerRef.current.style.opacity = "1";
    // }, 0);

    carouselContainerRef.current.style.display = "block";
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
      console.log(`null detect`)
      setActiveList(category);
    }

    setTimeout(() => {
      if (!aboutRef.current) return;
      aboutRef.current.style.pointerEvents = "auto";
    }, 200);
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
      
    }, 200);
  }

  const [meActive, setMeActive] = useState(false);

  const meHandler = () => {
    if (!carouselContainerRef.current) return;

    // carouselContainerRef.current.style.display = "none";
    setMeActive(!meActive);
    turnOffLists();
  }

  const turnOffLists = () => {
    if (!aboutRef.current || !carouselContainerRef.current) return;

    console.log(`the facts are ${meActive ? "open" : "closed"}`);

    // CLOSE THE FACTS
    if (meActive) {
      carouselContainerRef.current.style.display = "block";
      setActiveList(null);

    // OPEN THE FACTS
    } else {
      carouselContainerRef.current.style.opacity = "0";
      
      setTimeout(() => {
        if (!carouselContainerRef.current) return;
  
        setActiveList(null);
        carouselContainerRef.current.style.display = "none";
        unhoverHandle();
      }, 200);
    }

  }

  const [tooltipText, setTooltipText] = useState("meowmeow");
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const hoverHandle = (comment: string) => {
    if (comment === "") {
      setTooltipVisible(false);
    } else {
      setTooltipVisible(true);
      setTooltipText(comment);
    }
  }

  const unhoverHandle = () => {
    setTooltipText("");
    setTooltipVisible(false);
  }

  const factsRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

  const sadFaces = ["u_u", "T_T", "ヽ(*。>Д<)o゜",];
  const happyFaces = [":3", ":D", "(•ˋ _ ˊ•)", "o(〃◕ ヮ ◕〃)o"];

  const randomizer = (arr: string[]) => {
    return arr[Math.trunc((Math.random() * arr.length))];
  };

  const [face, setFace] = useState<string>(() => 
    meActive ? randomizer(sadFaces) : randomizer(happyFaces)
  ); 

  useEffect(() => {
    setFace(meActive ? randomizer(sadFaces) : randomizer(happyFaces));
  }, [meActive]);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  // OPACITY TRANSITION

  return (
    <div className="min-w-screen min-h-screen max-h-screen flex flex-col items-center justify-center">
      
      {/* ABOUT ME */}
      <div className="
      w-300
      max-w-screen 
      h-screen 
      grid
      grid-cols-[6fr_10fr] 
      sm:grid-cols-[1fr_1fr] 
      lg:grid-cols-[10fr_6fr]
      z-10
      ">

        <div></div>

        <div className="flex flex-col h-screen" ref={aboutRef}>
          
          {/* TOP ROW */}
          <div 
            className={`
          bg-black/80 flex flex-col py-6 text-white justify-between
            transition-all duration-500 min-h-0
            px-2 
            min-[768px]:px-4
            min-[1280px]:px-6
            ${meActive ? "flex-100" : "flex-72 rounded-b-4xl"}
            `}
          >

            {/* MORE ABOUT ME */}
            {meActive && (
              <div className="flex flex-col h-full min-h-0 nonsel mt-18 px-2" ref={factsRef}>
                <h1 className="font-bold text-base sm:text-3xl">more about me:</h1>

                <div className="overflow-y-auto thin-scrollbar text-xs my-4">
                {aboutMe.map((info, index) => (
                  <div
                    key={index}
                    draggable="false"
                    className={`
                      transition-opacity duration-1000 text-xs sm:text-sm pr-1
                    `}
                  >

                  {index === 0 && (<hr className=" border-gray-500/30 w-full" />)}

                  <div className={`grid grid-cols-[16px_1fr] gap-2 my-2`}>
                    <p className="nonsel pointer-events-none flex items-center justify-center">✦</p>
                    <p className="">{info}</p>
                  </div>

                  {index !== info.length - 1 && (<hr className=" border-gray-500/30 w-full" />)}

                  </div>
                ))}
                </div>

                <p className="text-xs sm:text-base text-center italic font-bold">
                  if you think we can be good friends, then reach out brotha
                </p>
              </div>
            )}

            {/* INFO */}
            {!meActive && (
              <div className="flex flex-col h-full min-h-0 nonsel mt-18 px-2 overflow-y-auto thin-scrollbar" ref={infoRef}>
                <p className="font-bold text-2xl sm:text-3xl">about me:</p>
                <p className="text-base sm:text-lg">Kyle | {age} | INTJ | Libra</p>
                <hr className="my-2 border-white/20" />

                <p className="font-bold pb-1 text-base sm:text-lg">likes:</p>

                <div className="flex flex-col text-xs sm:text-sm gap-1">
                  <p>✦ playing piano / guitar</p>
                  <p className="flex hover:cursor-pointer">
                    <span className="mr-2.25">
                      ✦
                    </span>

                    <span
                    className="italic"
                    onMouseEnter={() => {hoverHandle(`mysticism / gnosticism / hermeticism / etc.`)}}
                    onMouseLeave={() => {unhoverHandle()}}
                    >
                      spirituality (?)
                    </span>
                  </p>
                  <p>✦ calisthenics</p>
                  <p>✦ lifting</p>
                  <p className={`text-yellow-200 flex`}>
                    <span className={`text-yellow-200 mr-2.25 transition-mr transition-scale duration-200 ${activeList === "anime" && "scale-150 mr-4 spin"}`}>
                      {activeList === "anime" ? "★" : "✦"}
                    </span>

                    <span
                    className={`${activeList === "anime" && "font-bold white-glow underline scale-125"} transition-scale duration-200 cursor-pointer`}
                    ref={animeRef}
                    onClick={() => {openList("anime")}}>
                      anime
                    </span>
                  </p>
                  <p className={`text-yellow-200 flex`}>
                    <span className={`text-yellow-200 mr-2.25 transition-mr transition-scale duration-200 ${activeList === "music" && "scale-150 mr-4 spin"}`}>
                      {activeList === "music" ? "★" : "✦"}
                    </span>

                    <span
                    className={`${activeList === "music" && "font-bold white-glow underline scale-125"} transition-scale duration-200 cursor-pointer`}
                    ref={musicRef}
                    onClick={() => {openList("music")}}>
                      music
                    </span>
                  </p>
                  <p className={`text-yellow-200 flex`}>
                    <span className={`text-yellow-200 mr-2.25 transition-mr transition-scale duration-200 ${activeList === "games" && "scale-150 mr-4 spin"}`}>
                      {activeList === "games" ? "★" : "✦"}
                    </span>

                    <span
                    className={`${activeList === "games" && "font-bold white-glow underline scale-125"} transition-scale duration-200 cursor-pointer`}
                    ref={gamesRef}
                    onClick={() => {openList("games")}}>
                      games
                    </span>
                  </p>
                  <p>✦ coding</p>
                  <p>✦ drawing</p>
                </div>

                <hr className="my-2 border-white/20" />
              
                <p className="font-bold pb-1 text-base sm:text-lg">dislikes:</p>

                <div className="flex flex-col text-xs sm:text-sm gap-1">
                  <p className="text-xs sm:text-sm">🞨 nihilism / negativity</p>  
                </div>

              </div>
            )}

            {/* EMOJI */}
            <div className={`text-yellow-200 flex flex-col gap-2 pt-6 self-center text-center transition-mb duration-530 nonsel ${meActive && "white-glow mb-32"}`}>
              <p className="flex text-base sm:text-lg lg:text-xl font-bold mx-3">
                <span className={`text-yellow-200 flex items-center justify-center origin-center mr-2.25 duration-500 transition-scale transition-mr ${meActive && "spin scale-150 mr-4"}`}>
                  {meActive ? "★" : "✦"}
                </span>

                <span
                className={`${meActive && "font-bold italic underline"} transition-scale duration-200 cursor-pointer`}
                ref={meRef}
                onClick={() => {meHandler()}}>
                  {meActive ? "less" : "more"} about {meActive ? "me..." : "me?"}
                </span>

                <span className={`text-yellow-200 flex items-center justify-center origin-center ml-2.25 duration-500 transition-scale transition-ml ${meActive && "spin scale-150 ml-4"}`}>
                  {meActive ? "★" : "✦"}
                </span>
              </p>
              <p
              className="text-xs sm:text-sm cursor-pointer -translate-y-1"
              onClick={() => {meHandler()}}
              >
                {face}
              </p>
            </div>
            
          </div>

          {/* BOTTOM ROW */}
          <div
            className={`
            flex flex-col
            transition-all duration-500 min-h-0
            items-center justify-center
            ${meActive ? "flex-0" : "flex-28"}
            `}
          >
            <div className={`w-screen h-[24vh] z-100 self-end bg-black/50 py-4 absolute left-0 right-0 transition-opacity duration-400 ${activeList ? "opacity-100" : "opacity-0"}`}
              ref={carouselContainerRef}
            >
              <div className={`overflow-hidden flex items-center justify-center h-full w-full transition-opacity duration-400 ${activeList ? "opacity-100" : "opacity-0"}`}>
                <div className={`overflow-hidden flex items-center justify-center h-full w-full`} ref={emblaRef}>
                  <div className="flex h-full">

                    {/* anime */}
                    {activeList === "anime" && favAnime.map((anime, index) => (
                      <div
                        key={index}
                        className={`
                        flex-[0_0_28%]
                        min-[640px]:flex-[0_0_22%]
                        min-[768px]:flex-[0_0_18%]
                        min-[1024px]:flex-[0_0_14%]
                        min-[1280px]:flex-[0_0_12%]
                        min-[1600px]:flex-[0_0_10%]
                        px-1
                        min-[1024px]:px-1
                        min-[1280px]:px-4
                        h-full flex flex-col items-center nonsel relative
                        `}
                        draggable="false"
                      >
                        <div
                        className="relative w-full h-full overflow-hidden rounded-xl group cursor-help"
                        onMouseEnter={() => {hoverHandle(anime.comment)}}
                        onMouseLeave={() => {unhoverHandle()}}
                        >
                          <div className="absolute h-full w-full bg-linear-to-t from-black/60 to-transparent z-200 nonsel group-hover:invisible"></div>
                          {/* <div className="absolute h-full w-full bg-[#8f826b] z-200 nonsel group-hover:invisible mix-blend-hue"></div> */}

                          <img
                            src={`/images/about/anime/${anime.img}`}
                            alt={anime.name}
                            className="
                              w-full h-full
                              object-cover
                              saturate-40 hover:saturate-100
                              transition-all duration-200
                              brightness-80 hover:brightness-100
                              z-150
                            "
                          />

                          <p className={`text-center absolute bottom-2 left-2 right-2 text-xs sm:text-sm text-white bg-black/70 p-1 border border-white pointer-events-none nonsel font-bold rounded-md z-250 ${anime.tag}`}>
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
                        flex-[0_0_32%]
                        min-[640px]:flex-[0_0_28%]
                        min-[768px]:flex-[0_0_22%]
                        min-[1024px]:flex-[0_0_17%]
                        min-[1600px]:flex-[0_0_14%]
                        px-1
                        min-[1024px]:px-1
                        min-[1280px]:px-4
                        h-full flex flex-col items-center nonsel relative
                        `}
                        draggable="false"
                      >
                        <div
                        className="relative w-full h-full overflow-hidden rounded-xl group cursor-help"
                        onMouseEnter={() => {hoverHandle(music.comment)}}
                        onMouseLeave={() => {unhoverHandle()}}
                        >
                          <div className="absolute h-full w-full bg-linear-to-t from-black/60 to-transparent z-200 nonsel group-hover:invisible"></div>

                          <img
                            src={`/images/about/music/${music.img}`}
                            alt={music.name}
                            className="
                              w-full h-full
                              object-cover
                              saturate-40 hover:saturate-100
                              transition-all duration-200
                              brightness-80 hover:brightness-100
                              z-150
                            "
                          />

                          <p className={`text-center absolute bottom-2 left-2 right-2 text-xs sm:text-sm text-white bg-black/70 p-1 border border-white pointer-events-none nonsel font-bold rounded-md z-250 ${music.tag}`}>
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
                        min-[640px]:flex-[0_0_22%]
                        min-[768px]:flex-[0_0_18%]
                        min-[1024px]:flex-[0_0_14%]
                        min-[1280px]:flex-[0_0_12%]
                        min-[1600px]:flex-[0_0_10%]
                        px-1
                        min-[1024px]:px-1
                        min-[1280px]:px-4
                        h-full flex flex-col items-center nonsel relative
                        `}
                        draggable="false"
                      >
                        <div
                        className="relative w-full h-full overflow-hidden rounded-xl group cursor-help"
                        onMouseEnter={() => {hoverHandle(games.comment)}}
                        onMouseLeave={() => {unhoverHandle()}}
                        >
                          <div className="absolute h-full w-full bg-linear-to-t from-black/60 to-transparent z-200 nonsel group-hover:invisible"></div>

                          <img
                            src={`/images/about/games/${games.img}`}
                            alt={games.name}
                            className="
                              w-full h-full
                              object-cover
                              saturate-40 hover:saturate-100
                              transition-all duration-200
                              brightness-80 hover:brightness-100
                              z-150
                            "
                          />

                          <p className={`text-center absolute bottom-2 left-2 right-2 text-xs sm:text-sm text-white bg-black/70 p-1 border border-white pointer-events-none nonsel font-bold rounded-md z-250 ${games.tag}`}>
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

        </div>

      </div>
      
      <div className="fixed inset-0 overflow-hidden">
        <Marquee speed={20} gradient={false} className="h-screen -mr-px">
          <img 
            src="/images/aboutbg-0.png"
            alt="" 
            className="h-screen w-auto"
          />
        </Marquee>
      </div>


      {/* <Marquee speed={30} gradient={false} className="h-screen fixed z-1">
        <img 
          src="/images/aboutbg-0.png" 
          alt="" 
          className="h-screen w-auto opacity-20"
        />
      </Marquee> */}

      <TooltipComponent info={tooltipText} status={tooltipVisible} />
      
    </div>
  );
}