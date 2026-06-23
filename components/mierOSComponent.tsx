'use client';
import { useState, useRef, useEffect } from "react";
import { Roboto_Mono } from "next/font/google";

const roboto = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
})

const MierOS = () => {
  const [passwordContent, setPasswordContent] = useState("");
  const [userPassword, setUserPassword] = useState<string>("meow");
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const errorRef = useRef<HTMLDivElement | null>(null);
  const loginScreenRef = useRef<HTMLDivElement | null>(null);
  const blackScreenRef = useRef<HTMLDivElement | null>(null);
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const passwordContentRef = useRef<HTMLInputElement | null>(null);
  const [logging, setLogging] = useState<boolean>(false);

  const checkLogin = () => {
    if (passwordContent === userPassword) {
      setOpenLogin(false);
      console.log(`yeah!!`)
      passwordContentRef.current!.value = "";
      setPasswordContent("");
      login(true);
    } else {
      errorRef.current!.style.opacity = `1`;
      setTimeout(() => {
          errorRef.current!.style.opacity = `0`;
        }, 3000); 
      console.log(`NOOOO`);
    }
  };

  const login = (login: boolean) => {
    blackScreenRef.current!.style.display = `flex`;

    setTimeout(() => {
      setLogging(true);
    }, login ? 0 : 2000);

    setTimeout(() => {
      loginScreenRef.current!.style.display = `${login ? "none" : "flex"}`;
      desktopRef.current!.style.display = `${login ? "flex" : "none"}`;
    }, login ? 1000 : 3000);

    setTimeout(() => {
      setLogging(false);
      setTimeout(() => {
        blackScreenRef.current!.style.display = `none`;
      }, 1000);
    }, login ? 1500 : 3500);
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < canvas.height; y += 3) {
        ctx.fillStyle = "rgba(186,225,255,0.4)";
        ctx.fillRect(0, y, canvas.width, 1);
      }

      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  const adviceList = [
    "faith",
    "love",
    "purity",
    "determination",
    "wisdom",
    "comfort",
    "sadness",
    "anger",
    "sloth",
    "fear",
    "shame",
    "despair",
    "what should i do now?",
  ]

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center">

      {/* LOG IN SCREEN */}
      <div 
        className={`
          w-screen h-screen bg-[rgb(167,196,216)]
          flex items-center justify-center transition-all
          duration-1200 ease-[ease] fixed z-1000 nonsel
        `}
        ref={loginScreenRef}
      >

        {/* WRONG PASSWORD */}
        <div 
          className={`
            absolute flex items-center justify-center
            h-[4vw] w-[20vw] text-[#ffffff] bg-[rgba(255,0,0,0.604)]
            text-[1vw] bottom-[10vh] transition-opacity
            duration-50 opacity-0 error
          `}
          ref={errorRef}
        >
          <p>{`wrong password!! ヽ(*。>Д<)o゜`}</p>
        </div>
        
        {/* BAR */}
        <div 
          className={`
            w-screen h-[36vh] bg-white/41 flex items-center justify-center
            flex-col transition-all duration-2000
          `}
        >

          {/* TOP */}
          <div 
            className={`
              grid grid-col grid-cols-[auto_1fr] text-center
              items-center gap-[10vh] padding-2vh transition-all
              duration-100 ease-[ease]
            `}
          >
            <div className="login-logo">
              <h1 
                className={`text-[8vh] text-black font-thin text-shadow-white/50 text-shadow-lg`}
              >
                MierOS
              </h1>
            </div>
            <div className="login-logins">
              <div 
                className={`
                  p-[1vh] rounded-[1px] transition-all
                  duration-500 ease-[ease] border
                  bg-white/50 border-white/50 
                  shadow-[0_0_10px_rgba(255,255,255,0.5)]
                  cursor-pointer hover:rounded-xl
                  hover:border-white
                  hover:bg-white
                  hover:shadow-[0_0_10px_rgba(255,255,255)]
                `}
                onClick={() => setOpenLogin(!openLogin)}
              >
                <img 
                  draggable="false" 
                  className="w-[10vh] h-[10vh] rounded-full" 
                  src="/os/bear.png" 
                />
                <p>Admin</p>
              </div>
            </div>
          </div>
          
          {/* BOTTOM */}
          <div 
            className={`
              flex justify-center items-center
              flex-col gap-[0.5vh] transition-all
              ease-[ease] translate-y-[1vh] text-sm
              ${openLogin ? "h-[10vh] opacity-100 duration-800" : "h-0 opacity-0 pointer-events-none duration-500"}
            `}
          >

            <input 
              type="password"
              className="w-[25vh]"
              placeholder="enter password here..."
              name="password" 
              autoFocus={true}
              autoComplete="off"
              onChange={(e) => setPasswordContent(e.currentTarget.value)}
              ref={passwordContentRef}
            />

            <div
              className={`
                flex items-center gap-[0.5vh] flex-row
              `}
            >
              <input 
                type="checkbox"
                className="password-remember"
                name="password-remember" />
              <p>remember password?</p>
            </div>

            <button 
              className="mt-[0.5vh] cursor-pointer py-1 px-2 border border-black/50 rounded-[1px]" 
              type="button"
              onClick={() => checkLogin()}
            >
              log in!!
            </button>
          </div>

          <video
            autoPlay={true} muted loop
            className={`
              absolute w-[120vw] h-[120vh] 
              object-cover z-[-1] blur-[10px]
            `}
            src="os/snow.mov"
          />

        </div>

      </div>

      {/* BLACK SCREEN */}
      <div 
        className={`
          w-screen h-screen bg-black hidden
          transition-opacity duration-1000
          ease-in-out z-2000 fixed nonsel pointer-events-none
          ${logging ? "opacity-100" : "opacity-0"}
        `}
        ref={blackScreenRef}
      />

      {/* MIEROS */}
      <div
        className={`
          w-screen h-screen fixed transition-all duration-2000
          ease-[ease] bg-white z-500 hidden
        `}
        ref={desktopRef}
      >

        {/* DESKTOP */}
        <div 
          className={`
            top-[5vh] left-[5vh] h-[90vh] w-auto
            z-1 fixed pointer-events-auto grid
            grid-rows-[1fr_1fr_1fr_1fr_1fr_1fr]
            grid-cols-[1fr_1fr] grid-flow-col gap-2.5
          `}
        >
          <div className="items-center text-center justify-center text-lg">
            <img
              draggable="false"
              src="/os/note.png"
              className="h-[8vw] w-[8vw] transition-all duration-500 ease-[ease]"
            />
            <p>notes/reminders</p>
          </div>
          <div className="items-center text-center justify-center text-lg">
            <img
              draggable="false"
              src="/os/mieramp.png"
              className="h-[8vw] w-[8vw] transition-all duration-500 ease-[ease]"
            />
            <p>MierAmp</p>
          </div>
          <div className="items-center text-center justify-center text-lg">
            <img
              draggable="false"
              src="/os/bear.png"
              className="h-[8vw] w-[8vw] transition-all duration-500 ease-[ease]"
            />
            <p>bear</p>
          </div>
          <div className="items-center text-center justify-center text-lg">
            <img
              draggable="false"
              src="/os/bear.png"
              className="h-[8vw] w-[8vw] transition-all duration-500 ease-[ease]"
            />
            <p>bear</p>
          </div>
        </div>  
        
        {/* MIERAMP */}
        <div
          className={`
            z-40 rounded-[5px] text-[1vw] mix-blend-normal
            bg-[rgba(38,47,54,0.595)] shadow-[0_0_10px_rgba(230,250,255,0.304)]
            grid grid-rows-[8vw_1fr] absolute
            right-0 top-0 h-[94vh] w-[18vw]
            left-auto gap-2 text-[rgb(180,250,255)]
            draggable
          `}
        >
          <div className="p-8">
            <div className="transition-all duration-100 ease-[ease] justify-center gap-8 w-full flex">
              <p>―――――― MierAmp ――――――</p>
              <p className="absolute right-2.5 transition-all duration-200 ease-in-out cursor-pointer hover:text-[#ff0000] hover:scale-105">🞮</p>
            </div>
            <div className="bg-[#0000007b] text-[1vw] mt-1 justify-center items-center text-center w-full h-full place-content-around">
            <p className="">now playing: ...</p>
            <div className="transition-all duration-100 ease-[ease] justify-center gap-8 w-full flex">
              <p className="current-song-time">time</p>
              <p className="time-seperate"> | </p>
              <p className="current-song-duration">duration</p>
            </div>
            <input type="range" id="progressBar" />
            <div className="transition-all duration-100 ease-[ease] justify-center gap-8 w-full flex">
              <p className="w-[10%] justify-around justify-self-center cursor-pointer hover:scale-105 mb-0.75">⏮</p>
              <p className="w-[10%] justify-around justify-self-center cursor-pointer hover:scale-105">▶</p>
              <p className="w-[10%] justify-around justify-self-center cursor-pointer hover:scale-105">❚❚</p>
              <p className="w-[10%] justify-around justify-self-center cursor-pointer hover:scale-105">⏹</p>
              <p className="w-[10%] justify-around justify-self-center cursor-pointer hover:scale-105 mb-0.75">⏭</p>
            </div>
          </div>
          </div>  
          <div className="p-8 pt-0 w-full flex-col overflow-y-auto h-auto">
            <ul className="bg-[#0000007b] p-1 h-auto min-h-full" id="trackList"></ul>
          </div>
        </div>
        
        {/* NOTES */}
        <div 
          className={`
            flex-col justify-evenly items-center h-[65vh] program draggable
          `}
        >
          <div className="w-full flex gap-2">
            <p 
              className={`
                flex gap-2 justify-between bg-[#003cff00] ml-[1vw]
              `}
            >
              current
            </p>
            <p 
              className={`
                flex gap-2 justify-between bg-[#003cff00]
              `}
            >
              finished
            </p>
            <p 
              className={`
                flex gap-2 justify-between bg-[#003cff00]
              `}
            >
              reminders
            </p>
            <p 
              className={`
                relative text-[2vw] ml-auto mr-[0.5vw]
                transition-all duration-200 ease-in-out
                text-white
              `}
            >
              🗓
            </p>
            <p 
              className={`
                relative text-[2vw] ml-0 mr-[0.5vw]
                transition-all duration-200 ease-in-out
                text-white hover:text-[#ff0000] hover:scale-110
              `}
            >
              🞮
            </p>
          </div>

          <div 
            className={`
              bg-[rgb(251,255,255)] w-[24vw] max-h-[50vh] overflow-y-auto
              pr-2.5 transition-all duration-2000 ease-[ease] flex flex-col
              border-[1vw] border-[#003cff00] min-h-[50vh]
            `}
          >
            <div 
              className={`
                w-full flex gap-2 justify-between bg-[#003cff00]
                py-1 px-2 transition-all duration-100 ease-in-out
                hover:text-[rgba(146,219,255,0.266)] hover:scale-102
              `}
            >
              <p className="note" id="<%= note.id %>">NOTE <span className="date">NOTE DATE</span></p>
              <p className="noteFinish note-action">੦</p>
              <p className="noteDelete note-action">🞩</p>
            </div>
          </div>
          <div className="transition-all duration-100 ease-[ease] justify-center gap-8 w-full flex input-wrapper">
            <input className="add add-input" type="text" placeholder="add to list..." autoFocus={true} autoComplete="off" />
            <button className="add add-button">!!</button>
        </div>
        </div>
        
        {/* TASKBAR */}
        <div
          className={`
            h-[4.5vh] w-screen flex justify-between items-center
            gap-[2vh] bottom-0 absolute transition-none z-100 text-sm
            text-white mix-blend-normal taskbar
          `}
        >
          <div className="my-0 mx-[1vw] flex justify-center items-center">
            <img draggable="false" className="h-[6vh] z-1001 mb-[2vh] mr-[1vh] ml-[-.5vh] transition-scale duration-500 ease-[ease] cursor-pointer hover:scale-110" src="/os/logo.png" />
            <div className="min-w-[10vw] flex justify-center items-center pr-[1vw] pl=[0.25vw] hover:bg-white/15 transition-all duration-200 ease-in-out">
              <img draggable="false" className="h-[4vh] my-0 mx-[0.5vw]" src="/os/icon0.png" />
              <p className="tab">Pacific Purgatory</p>
            </div>
            <div className="min-w-[10vw] flex justify-center items-center pr-[1vw] pl=[0.25vw] hover:bg-white/15 transition-all duration-200 ease-in-out">
              <img draggable="false" className="h-[4vh] my-0 mx-[0.5vw]" src="/os/icon1.png" />
              <p className="tab">MLC Media Mlayer</p>
            </div>
            <div className="min-w-[10vw] flex justify-center items-center pr-[1vw] pl=[0.25vw] hover:bg-white/15 transition-all duration-200 ease-in-out">
              <img draggable="false" className="h-[4vh] my-0 mx-[0.5vw]" src="/os/icon2.png" />
              <p className="tab">M:\MierOS\system32...</p>
            </div>
          </div>
          <div className="flex ml-auto gap-2.5 text-[0.9vw]">
            <p>🖂</p>
            <p>🛜</p>
            <p>🔊</p>
            <p>🔌</p>
          </div>
          <div className="my-0 mx-[1vw] flex justify-center items-center flex-col">
            <p className="clock tiny-clock">6:30 PM</p>
            <p className="taskbar-date">02/10/11</p>
          </div>
        </div>
        
        {/* MIERDOWS */}
        <div
          className={`
            absolute h-[80vh] w-[30vw] z-50 flex-col bg-[rgba(38,47,54)]/82
            shadow-[0_0_10px_rgba(230,250,255,0.304)] bottom-[5vh] left-[0.5vh]
            transition-all duration-100 ease-in-out text-white justify-center
            items-center flex
          `}
        >
          <p>mrow</p>
          <h1
            className={`
              text-[4vh] transition-all duration-200 ease-in-out shutdown cursor-pointer
              text-white hover:text-[#ff0000] hover:scale-130 nonsel
            `}
            onClick={() => login(false)}
          >
            ⏻
          </h1>
        </div>
        
        {/* MIER DIALOGUE */}
        <div 
          className={`
            absolute flex items-center justify-center
            w-screen h-screen max-w-screen wrap-break-word
          `}
        >
          <h1 
            className={`
              text-[10vh] absolute transition-all duration-1000
              ease-[ease] mr-[25vw] p-1.25 z-20 text-[rgb(181,159,106)]/61  
              mix-blend-plus-lighter
            `}
          >
            ⮈
          </h1>
          <div className="opinions">
            <p className="option oc">OC NAMES</p>
          </div>
          <div className="advices">
            {adviceList.map((i, advice) => (
              <p 
                className={`
                  bg-[rgb(246,254,255)]/48 rounded-[5px]
                  px-3.75 bottom-[10vh] py-2.5 text-[1.75vh]
                  text-center items-center flex justify-center
                  min-w-[16vw] transition-all duration-500
                  ease-[ease]
                `}
                key={i}
              >
                {advice}
              </p>
            ))}
          </div>
          <div className="options">
            <p className="option greet">hi!</p>
            <p className="option joke">tell me a joke!</p>
            <p className="option fact">tell me a fun fact!</p>
            <p className="option horoscope">daily horoscope!</p>
            <p className="option opinion">what do you think about..</p>
            <p className="option advice">i need advice..</p>
          </div>
          <p className="mier-talk"></p>
        </div>
        
        {/* MIER */}
        <div className="z-80 h-screen w-screen absolute pointer-events-none">
          <img 
            draggable="false"
            src="/os/mier0.png"
            className={`
              absolute pointer-events-auto bottom-0 self-center justify-self-center flex
              transition-[all_3s_ease-in-out,opacity_.5s_ease,transform_4s_ease-in-out,margin-left_1.6s_ease-in-out]
              drop-shadow-[0px_0px_4.5px_#e9faff] mier-breathe
            `}
          />
        </div>
        
        {/* BG CLOCK */}
        <h1 
          className={`
            absolute text-[40vh] flex h-[60vh] w-screen
            justify-center items-center text-center z-[-8]
            mix-blend-difference ${roboto.className} opacity-20
            text-[rgba(237,201,42,0.42)]
            text-shadow-[0_0_5px_#ff642a,0_0_12px_#ffffff]
            blur-[7px]
          `}
        >
          06:30
        </h1>
        
        {/* BACKGROUND */}
        <div className="absolute w-screen h-screen overflow-hidden origin-center flex items-center justify-center">
          <img
            draggable="false"
            src="/os/0.png"
            className="absolute scale-120 object-cover nonsel pointer-events-none transition-transform bg0" />
          {/* <img
            draggable="false"
            src="/os/0.png"
            className="absolute scale-120 object-cover nonsel pointer-events-none transition-transform mix-blend-overlay bgFilter" /> */}
          <img
            draggable="false"
            src="/os/1.png"
            className="absolute scale-120 object-cover nonsel pointer-events-none transition-transform mix-blend-color-dodge bg1" />
          <img
            draggable="false"
            src="/os/2.png"
            className="absolute scale-120 object-cover nonsel pointer-events-none transition-transform mix-blend-color-dodge bg2" />
          <img
            draggable="false"
            src="/os/3.png"
            className="absolute scale-120 object-cover nonsel pointer-events-none transition-transform mix-blend-color-dodge bg3" />
          <img
            draggable="false"
            src="/os/4.png"
            className="absolute scale-120 object-cover nonsel pointer-events-none transition-transform mix-blend-color-dodge bg4" />
          <img
            draggable="false"
            src="/os/5.png"
            className="absolute scale-120 object-cover nonsel pointer-events-none transition-transform bg5" />
        </div>

        <audio className="hidden opacity-0" controls></audio>
      </div>

      <canvas 
        ref={canvasRef}
        className={`
          fixed top-0 left-0 w-screen h-screen nonsel pointer-events-none
          z-9999 opacity-70 mix-blend-overlay backdrop-blur-[0.2px]
        `} 
      />

    </div>
  )
}

export default MierOS;