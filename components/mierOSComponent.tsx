'use client';
import { useState, useRef, useEffect } from "react";

const MierOS = () => {
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [passwordContent, setPasswordContent] = useState("");
  const [userPassword, setUserPassword] = useState<string>("meow");
  const errorRef = useRef<HTMLDivElement | null>(null);

  const checkLogin = () => {
    if (passwordContent === userPassword) {
      console.log(`yeah!!`)
    } else {
      errorRef.current!.style.opacity = `1`;
      setTimeout(() => {
          errorRef.current!.style.opacity = `0`;
        }, 3000); 
      console.log(`NOOOO`);
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center">
      <div 
        className={`
          w-screen h-screen bg-[rgb(167,196,216)]
          flex items-center justify-center transition-all
          duration-1200 ease-[ease] fixed z-1000 nonsel
        `}
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
              ${openLogin ? "translate-y-[-1vh]" : "translate-y-0"}
            `}
          >
            <div className="login-logo">
              <h1 
                className={`text-[8vh] text-black text-shadow-md`}
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
                  cursor-pointer hover:rounded-[5px]
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
          
          {/* BOTTOM / LOGIN */}
          <div 
            className={`
              flex justify-center items-center
              flex-col gap-[0.5vh] transition-all
              ease-[ease] translate-y-[1vh]
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
              className="mt-[1vh] cursor-pointer" 
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
    </div>
  )
}

export default MierOS;