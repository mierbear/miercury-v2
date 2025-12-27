"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { use, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TooltipComponent from "@/components/tooltipComponent";

export default function Home() {
  const moreInfoRef = useRef<HTMLDivElement | null>(null);
  const moreInfoTextRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);

  // this code is such a mess LOL
  const favMusic = [
      {  comment: "", tag: "love", name: "TAK / DORIDORI", img: "tak.jpg",
      comment2: "", tag2: "love", name2: "Chikoi The Maid", img2: "chikoi.jpg" },
    
      {  comment: "", tag: "best", name: "Pink Guy", img: "pinkguy.jpg",
      comment2: "", tag2: "best", name2: "Joji", img2: "joji.jpg" },
    
      {  comment: "", tag: "love", name: "Sasuke Haraguchi", img: "sasukeharaguchi.jpg",
      comment2: "", tag2: "love", name2: "Deco*27", img2: "deco27.jpg" },
      
      {  comment: "", tag: "", name: "Uplift Spice", img: "upliftspice.jpg",
      comment2: "", tag2: "", name2: "Kikuo", img2: "kikuo.jpg" },
    
      {  comment: "", tag: "", name: "Kinoue64", img: "kinoue64.jpg",
      comment2: "", tag2: "", name2: "Dusqk", img2: "dusqk.jpg" },
    
      {  comment: "", tag: "love", name: "Porter Pobinson", img: "porterrobinson.jpg",
      comment2: "", tag2: "love", name2: "Kanye West", img2: "kanye.jpg" },
    
      {  comment: "", tag: "", name: "Kinoko Teikoku", img: "kinokoteikoku.jpg",
      comment2: "", tag2: "", name2: "My Dead Girlfriend", img2: "mydeadgirlfriend.jpg" },
    
      {  comment: "", tag: "", name: "Pacific Purgatory", img: "pacificpurgatory.jpg",
      comment2: "", tag2: "", name2: "Steakfry", img2: "steakfry.jpg" },
    
      {  comment: "", tag: "love", name: "Creepy Nuts", img: "creepynuts.jpg",
      comment2: "", tag2: "", name2: "Vaundy", img2: "vaundy.jpg" },
    
      {  comment: "", tag: "", name: "xi", img: "xi.jpg",
      comment2: "", tag2: "", name2: "ginkiha", img2: "ginkiha.jpg" },
    
      {  comment: "", tag: "", name: "System of a Down", img: "soad.jpg",
      comment2: "", tag2: "love", name2: "Linkin Park", img2: "linkinpark.jpg" },
  ];

  const favGames = [
      {  comment: "everytime i start the game i end up playing for more than 20 hours xd", tag: "best", name: "Rimworld", img: "rimworld.jpg",
      comment2: "", tag2: "", name2: "Risk of Rain 2", img2: "ror2.jpg" },

      {  comment: "7k mania is my crack cocaine...", tag: "best", name: "osu!", img: "osu.jpg",
      comment2: "", tag2: "", name2: "Skyrim", img2: "skyrim.jpg" },
    
      {  comment: "", tag: "love", name: "Starbound", img: "starbound.jpg",
      comment2: "", tag2: "love", name2: "Terraria", img2: "terraria.jpg" },
    
      {  comment: "", tag: "", name: "Undertale", img: "undertale.jpg",
      comment2: "legit actually mid but still holds a really special place in my heart lol", tag2: "", name2: "Omori", img2: "omori.jpg" },
    
      {  comment: "", tag: "", name: "Dead Cells", img: "deadcells.jpg",
      comment2: "", tag2: "", name2: "Escape from Duckov", img2: "duckov.jpg" },
    
      {  comment: "", tag: "", name: "Echo Point Nova", img: "echopointnova.jpg",
      comment2: "", tag2: "", name2: "Elden Ring", img2: "eldenring.jpg" },
    
      {  comment: "", tag: "", name: "Monster Hunter Rise", img: "mhr.jpg",
      comment2: "", tag2: "", name2: "Fear and Hunger", img2: "fah.jpg" },
    
      {  comment: "i love gambling", tag: "", name: "Balatro", img: "balatro.jpg",
      comment2: "", tag2: "", name2: "Slay The Spire", img2: "slaythespire.jpg" },
    
      {  comment: "", tag: "", name: "Cry of Fear", img: "cof.jpg",
      comment2: "", tag2: "", name2: "Metaphor: ReFantazio", img2: "metaphor.jpg" },

      {  comment: "rlcraft is the only thing that makes me wanna play it ngl", tag: "love", name: "Minecraft", img: "minecraft.jpg",
      comment2: "", tag2: "", name2: "Left 4 Dead 2", img2: "l4d2.jpg" },
  ];

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

  const [tooltipText, setTooltipText] = useState("meowmeow");
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const hoverHandle = (comment: string) => {
    if (comment === "") {
      setTooltipVisible(false);
    } else {
      setTooltipVisible(true);
      setTooltipText(comment);
    }
    // console.log(`showing tooltip: ${comment}`);
  }

  const unhoverHandle = () => {
    setTooltipVisible(false);
  }

  const tl = gsap.timeline();

  const [moreInfoVisible, setMoreInfoVisible] = useState(false);
  
  const openMoreInfo = () => {
    tl.set(moreInfoTextRef.current, { pointerEvents: "none" });

    if (moreInfoVisible) {
      tl
      .to(moreInfoRef.current, { yPercent: -100, duration: 1, ease: "power2.out" })
      .to(aboutRef.current, { yPercent: 0, duration: 1, ease: "power2.out" }, "<")
      moreInfoTextRef.current!.textContent = "more about me";
      setMoreInfoVisible(false);
      setHappy(true);
      changeEmoji();
    } else {
      tl
      .to(moreInfoRef.current, { yPercent: 0, duration: 1, ease: "power2.out" })
      .to(aboutRef.current, { yPercent: -10, duration: 1, ease: "power2.out" }, "<")
      moreInfoTextRef.current!.textContent = "less about me..";
      setMoreInfoVisible(true);
      setHappy(false);
      changeEmoji();
    }
    
    tl.set(moreInfoTextRef.current, { pointerEvents: "all"});
  }

  const [happy, setHappy] = useState(true);

  const sadFaces = ["u_u", "T_T", "ヽ(*。>Д<)o゜",];
  const happyFaces = [":3", ":D", "(•ˋ _ ˊ•)", "o(〃◕ ヮ ◕〃)o"];

  const randomizer = (arr: string[]) => {
    return arr[Math.trunc((Math.random() * arr.length))];
  };

  const [emoji, setEmoji] = useState(":3");

  const changeEmoji = () => {
    if (happy) {
      console.log(`meow`);
      setEmoji(randomizer(sadFaces));      
    } else {
      setEmoji(randomizer(happyFaces));
    }
  }

  gsap.set(moreInfoRef.current, { autoAlpha: 1 });

  useEffect(() => {
    if (!moreInfoRef.current) return;

    gsap.set(moreInfoRef.current, { yPercent: -100 });
  }, []);


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
                      className="poster rounded-xl object-cover"
                      onMouseEnter={() => {hoverHandle(anime.comment)}}
                      onMouseLeave={unhoverHandle}
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
                      className="poster rounded-xl object-cover"
                      onMouseEnter={() => {hoverHandle(music.comment)}}
                      onMouseLeave={unhoverHandle}
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
                      className="poster rounded-xl object-cover"
                      onMouseEnter={() => {hoverHandle(music.comment2)}}
                      onMouseLeave={unhoverHandle}
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
                      className="poster rounded-xl object-cover"
                      onMouseEnter={() => {hoverHandle(game.comment)}}
                      onMouseLeave={unhoverHandle}
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
                      className="poster rounded-xl object-cover"
                      onMouseEnter={() => {hoverHandle(game.comment2)}}
                      onMouseLeave={unhoverHandle}
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


      <div className="flex p-8 pb-0 justify-center max-h-screen flex-col z-60 bg-linear-to-r bg-black text-white order-1 md:order-2 md:text-sm text-xs">

        <div className="flex justify-center flex-col mt-10" ref={aboutRef}>

        <div className="bg-black z-55 shadow-below">
          <h1 className="font-bold text-3xl">About me:</h1>
          <p>Kyle | {age} | INTJ | Libra</p>
          <hr className="my-2 border-white/20" />
          <h3 className="font-bold pb-1">things i like:</h3>
          <p>● playing piano/guitar</p>
          <p>● spirituality/mysticism</p>
          <p>● hermeticism/gnosticism/etc.</p>
          <p>● calisthenics/lifting</p>
          <p className="italic text-yellow-200">● <span className="underline cursor-pointer" onClick={openGames}>games</span></p>
          <p className="italic text-yellow-200">● <span className="underline cursor-pointer" onClick={openAnime}>anime</span></p>
          <p className="italic text-yellow-200">● <span className="underline cursor-pointer" onClick={openMusic}>music</span></p>
          <p>● coding</p>
          <p>● drawing</p>
          <hr className="my-2 border-white/20" />
          <h3 className="font-bold pb-1">things i dislike:</h3>
          <p>🞨 nihilism/negativity</p>
          <p>🞨 ants</p>
          <hr className="my-2 border-white/20" />
          <h2 className="italic text-yellow-200"><span className="underline cursor-pointer" onClick={openMoreInfo} ref={moreInfoTextRef} >more about me</span> {emoji}</h2>
        </div>
        
        <div 
          className="z-50 flex flex-col pt-3 opacity-0" 
          ref={moreInfoRef} 
        >
          <p>- im a weeb</p>
          <p>- i like to ragebait my friends</p>
          <p>- i like looking into conspiracies theories for fun</p>
          <p>- dont take everything i say seriously</p>
          <p>- if i've pissed you off before, i love you</p>
          <p>- if you think we can be good friends, dont hesitate to reach out</p>
        </div>

        </div>

      </div>

      <TooltipComponent info={tooltipText} status={tooltipVisible} />

    </div>
  );
}