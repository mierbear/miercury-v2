'use client';
import { useState, useRef, useEffect } from "react";

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

      {/* DESKTOP */}
      <div
        className={`
          w-screen h-screen flex items-center justify-center fixed
          text-white
        `}
        ref={desktopRef}
      >
       <div className="items">
          <div className="item">
            <img draggable="false" src="assets/note.png" className="icon notes-icon" />
            <p>notes/reminders</p>
          </div>
          <div className="item">
            <img draggable="false" src="assets/mieramp.png" className="icon mieramp-icon" />
            <p>MierAmp</p>
          </div>
          <div className="item">
            <img draggable="false" src="assets/bear.png" className="icon" />
            <p>bear</p>
          </div>
          <div className="item">
            <img draggable="false" src="assets/bear.png" className="icon" />
            <p>bear</p>
          </div>
        </div>  

        <div className="mieramp program draggable">
            <div className="amp-top">
              <div className="wrapper2">
                <p>―――――― MierAmp ――――――</p>
                <p className="ampX">🞮</p>
              </div>
              <div className="amp-player">
              <p className="current-song-name">now playing: ...</p>
              <div className="wrapper2">
                <p className="current-song-time"></p>
                <p className="time-seperate"> | </p>
                <p className="current-song-duration"></p>
              </div>
              <input type="range" id="progressBar" />
              <div className="wrapper2">
                <p className="player-button mb-0.75" data-action="prev">⏮</p>
                <p className="player-button" data-action="play">▶</p>
                <p className="player-button" data-action="pause">❚❚</p>
                <p className="player-button" data-action="stop">⏹</p>
                <p className="player-button mb-0.75" data-action="next">⏭</p>
              </div>
            </div>
            </div>  
            <div className="amp-bot">
              <ul className="amp-list" id="trackList"></ul>
            </div>
        </div>

        <div className="notes program draggable">
          <div className="wrapper3">
            <p className="note-category note-current">current</p>
            <p className="note-category note-finished">finished</p>
            <p className="note-category note-reminders">reminders</p>
            <p className="notesDate">🗓</p>
            <p className="notesX">🞮</p>
          </div>
          <div className="note-inside">
            <div className="wrapper">
              <p className="note" id="<%= note.id %>">NOTE <span className="date">NOTE DATE</span></p>
              <p className="noteFinish note-action">੦</p>
              <p className="noteDelete note-action">🞩</p>
            </div>
          </div>
          <div className="wrapper2 input-wrapper">
            <input className="add add-input" type="text" placeholder="add to list..." autoFocus={true} autoComplete="off" />
            <button className="add add-button">!!</button>
        </div>
        </div>

        <div className="taskbar">
          <div className="taskbar-wrapper-left">
            <img draggable="false" className="logo" src="assets/logo.png" />
            <div className="tab-wrapper">
              <img draggable="false" className="tab-icon" src="assets/icon0.png" />
              <p className="tab">Pacific Purgatory</p>
            </div>
            <div className="tab-wrapper">
              <img draggable="false" className="tab-icon" src="assets/icon1.png" />
              <p className="tab">MLC Media Mlayer</p>
            </div>
            <div className="tab-wrapper">
              <img draggable="false" className="tab-icon" src="assets/icon2.png" />
              <p className="tab">M:\MierOS\system32...</p>
            </div>
          </div>
          <div className="taskbar-mini-icons">
            <p>🖂</p>
            <p>🛜</p>
            <p>🔊</p>
            <p>🔌</p>
          </div>
          <div className="taskbar-wrapper-right">
            <p className="clock tiny-clock"></p>
            <p className="taskbar-date"></p>
          </div>
        </div>

        <div className="menu">
          <p>mrow</p>
          <h1 className="shutdown">⏻</h1>
        </div>

        <div className="mier-dialogue">
          <h1 className="x">⮈</h1>
          <div className="opinions">
            <p className="option oc">OC NAMES</p>
          </div>
          <div className="advices">
            <p className="option advice-option" data-advicetype="faith">faith</p>
            <p className="option advice-option" data-advicetype="love">love</p>
            <p className="option advice-option" data-advicetype="purity">purity</p>
            <p className="option advice-option" data-advicetype="determination">determination</p>
            <p className="option advice-option" data-advicetype="wisdom">wisdom</p>
            <p className="option advice-option" data-advicetype="comfort">comfort</p>
            <p className="option advice-option" data-advicetype="sadness">sadness</p>
            <p className="option advice-option" data-advicetype="anger">anger</p>
            <p className="option advice-option" data-advicetype="sloth">sloth</p>
            <p className="option advice-option" data-advicetype="fear">fear</p>
            <p className="option advice-option" data-advicetype="shame">shame</p>
            <p className="option advice-option" data-advicetype="despair">despair</p>
            <p className="option hug">hug</p>
            <p className="option advice-now">what should i do right now?</p>
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

        <div className="mier-div">
          <img draggable="false" src="assets/mier0.png" className="mier" />
        </div>

        <h1 className="clock huge-clock"></h1>

        <div className="bgs">
          <img draggable="false" src="assets/5.png" className="bg bg5" />
          <img draggable="false" src="assets/4.png" className="bg bg4" />
          <img draggable="false" src="assets/3.png" className="bg bg3" />
          <img draggable="false" src="assets/2.png" className="bg bg2" />
          <img draggable="false" src="assets/1.png" className="bg bg1" />
          <img draggable="false" src="assets/0.png" className="bg bgFilter" />
          <img draggable="false" src="assets/0.png" className="bg bg0" />
        </div>

        <audio id="audioPlayer" controls></audio>
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