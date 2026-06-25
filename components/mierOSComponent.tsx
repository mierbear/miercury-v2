'use client';
import { useState, useRef, useEffect } from "react";
import { Roboto_Mono, Inconsolata } from "next/font/google";
import YouTube, { YouTubeEvent } from "react-youtube";
import Marquee from "react-fast-marquee";
import { Type } from "lucide-react";
import { finished } from "stream";

const roboto = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
})

interface Song {
  id: string;
  title?: string;
}

interface Note {
  id: string;
  note: string;
  date: string;
  finished: string | null;
}

const inconsolata = Inconsolata({
  weight: ["200", "300"],
  subsets: ["latin"],
});

const MierOS = () => {
  const [passwordContent, setPasswordContent] = useState("");
  const [userPassword, setUserPassword] = useState<string>("");
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
      blockHandler(1500)
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

    if (!login) {
      setMierAmpOpen(false);
      setNotesOpen(false);
    }

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

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [mierAmpOpen, setMierAmpOpen] = useState<boolean>(false);
  const [notesOpen, setNotesOpen] = useState<boolean>(false);
  const blockerRef = useRef<HTMLDivElement | null>(null);

  const blockHandler = (duration: number) => {
    if (!blockerRef.current) return;

    blockerRef.current.style.display = "block";
    setTimeout(() => {
      blockerRef.current!.style.display = "none";
    }, duration);
  }

  // MIERAMP
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [autoplay, setAutoplay] = useState<1 | 0>(0);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    mierAmpOpen ? setAutoplay(1) : setAutoplay(0)
  }, [mierAmpOpen])

  // VOLUME
  const volumeInitialized = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("mierAmpVolume");
    if (saved) setVolume(Number(saved));
    volumeInitialized.current = true;
  }, []);

  useEffect(() => {
    if (!volumeInitialized.current) return;
    localStorage.setItem("mierAmpVolume", volume.toString());
  }, [volume]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("mierAmpVolume", volume.toString());
    }, 500);
    return () => clearTimeout(timeout);
  }, [volume]);

  const handleVolume = (value: number) => {
    setVolume(value);
    playerRef.current?.setVolume(value);
  };

  // PLAYLIST
  const playlistInitialized = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("mierAmpPlaylist");
    if (saved) setPlaylist(JSON.parse(saved));
    playlistInitialized.current = true;
  }, []);

  useEffect(() => {
    if (!playlistInitialized.current) return;
    localStorage.setItem("mierAmpPlaylist", JSON.stringify(playlist));
  }, [playlist]);

  // ADD MIERAMP SONGS
  const [mierAmpInput, setMierAmpInput] = useState<string>("")

  const getYoutubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
    );

    return match?.[1] || null;
  };

  const addSong = async (url: string) => {
    const id = getYoutubeId(url);

    if (!id || playlist.find((song) => song.id === id)) {
      setMierAmpInput("");
      return;      
    }

    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
      );

      const data = await response.json();

      setPlaylist(prev => [
        ...prev,
        {
          id,
          title: data.title
        }
      ]);

    } catch {
      setPlaylist(prev => [
        ...prev,
        {
          id,
          title: "Unknown title"
        }
      ]);
    }

    setMierAmpInput("");
  };

  // DELETE MIERAMP SONGS
  const deleteSong = (trashed: string) => {
    setPlaylist(playlist.filter((song) => song.id !== trashed))
  }

  // MIERAMP CONTROLS
  const resetTime = () => {
    setCurrentTime(0);
    setDuration(0);
  }

  const play = () => {
    if (currentSong === null || !playerReady || !playerRef.current) return;
    playerRef.current?.playVideo();
    setIsPlaying(true);
  };

  const pause = () => {
    if (isBuffering || !isPlaying || !playerReady || !playerRef.current) return;
    playerRef.current?.pauseVideo();
    setIsPlaying(false);
  };

  const stop = () => {
    if (isBuffering || !isPlaying || !playerReady || !playerRef.current) return;
    playerRef.current.stopVideo();
    setIsPlaying(false);
    setCurrentSong(null);
  };

  const next = () => {
    if (currentSong === null || !playlist.length) return;

    setIsBuffering(true);
    setCurrentSong(prev =>
      ((prev ?? 0) + 1) % playlist.length
    );
  };

  const prev = () => {
    if (currentSong === null || !playlist.length) return;

    setIsBuffering(true);
    setCurrentSong(prev =>
      prev === 0
        ? playlist.length - 1
        : (prev ?? 0) - 1
    );
  };

  useEffect(() => {
    if (isPlaying) {
      playerRef.current?.playVideo();
    }
  }, [currentSong]);

  // MIERAMP UI
  useEffect(() => {
    if (currentSong === null) {
      resetTime();
      return;
    }

    const interval = setInterval(() => {
      if (!playerRef.current) return;
      const current = playerRef.current.getCurrentTime();
      const total = playerRef.current.getDuration();

      setCurrentTime(
        Number.isFinite(current)
          ? current
          : currentTime
      );
      setDuration(
        Number.isFinite(total)
          ? total
          : duration
      );
    }, 250);

    return () => clearInterval(interval);
  }, [currentSong]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // TIMES AND DATES

  const [bgClock, setBgClock] = useState("");
  const [taskbarClock, setTaskbarClock] = useState("");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBgClock(new Date().toLocaleTimeString([], { hour12: false }));
      setTaskbarClock(new Date().toLocaleTimeString([], {hour: "numeric", minute: "2-digit",}));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getDate = (date = new Date()) => {
    const yy = String(date.getFullYear()).slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yy}/${mm}/${dd}`;
  }

  const [taskbarDate, setTaskbarDate] = useState(getDate);

  useEffect(() => {
    const scheduleMidnightUpdate = () => {
      const now = new Date();
      const next = new Date(now);

      next.setHours(24, 0, 0, 0);
      const msUntilMidnight = next.getTime() - now.getTime();

      const timeout = setTimeout(() => {
        setTaskbarDate(getDate());
        scheduleMidnightUpdate();
      }, msUntilMidnight);

      return timeout;
    };

    const timeout = scheduleMidnightUpdate();
    return () => clearTimeout(timeout);
  }, []);

  // DRAGGABLES

  useEffect(() => {
    const draggables = document.querySelectorAll<HTMLElement>('.draggable');

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let activeElement: HTMLElement | null = null;

    const edgeThreshold = 40;

    draggables.forEach((draggable) => {
      draggable.addEventListener('mousedown', (e: MouseEvent) => {
        const rect = draggable.getBoundingClientRect();
        const y = e.clientY - rect.top;

        const nearEdge = y < edgeThreshold;

        if (nearEdge) {
          isDragging = true;
          activeElement = draggable;
          offsetX = e.clientX - rect.left;
          offsetY = e.clientY - rect.top;
        }
      });
    });

    const onMove = (e: MouseEvent) => {
      if (isDragging && activeElement) {
        activeElement.style.left = `${e.clientX - offsetX}px`;
        activeElement.style.top = `${e.clientY - offsetY}px`;
      }
    };
    const onUp = () => {
      isDragging = false;
      activeElement = null;
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  // NOTES

  const currentNotesInitialized = useRef(false);
  const finishedNotesInitialized = useRef(false);
  const reminderNotesInitialized = useRef(false);
  const [currentNotes, setCurrentNotes] = useState<Note[]>([])
  const [finishedNotes, setFinishedNotes] = useState<Note[]>([])
  const [reminderNotes, setReminderNotes] = useState<Note[]>([])

  const notes = {
    current: {
      notes: currentNotes,
      set: setCurrentNotes,
      init: currentNotesInitialized,
      local: "notesCurrent"
    },
    finished: {
      notes: finishedNotes,
      set: setFinishedNotes,
      init: finishedNotesInitialized,
      local: "notesFinished"
    },
    reminder: {
      notes: reminderNotes,
      set: setReminderNotes,
      init: reminderNotesInitialized,
      local: "notesReminder"
    },
  }

  useEffect(() => {
    Object.entries(notes).forEach(([key, type]) => {
      const saved = localStorage.getItem(type.local);
      if (saved) type.set(JSON.parse(saved))
      type.init.current = true;
    })
  }, [])

  const notesUseEffect = (type: {
    notes: Note[], init: React.RefObject<boolean>, local: string,
  }) => {
    useEffect(() => {
      if (!type.init.current) return;
      localStorage.setItem(type.local, JSON.stringify(type.notes))
    }, [type.notes])
  }

  notesUseEffect(notes.current);
  notesUseEffect(notes.finished);
  notesUseEffect(notes.reminder);

  const [noteTab, setNoteTab] = useState("current");
  const [notesInput, setNotesInput] = useState("");

  const getNoteDate = (date = new Date()) => {
    const time = new Date().toLocaleTimeString([], {hour: "numeric", minute: "2-digit",});
    const yy = String(date.getFullYear()).slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `(${time} - ${yy}/${mm}/${dd})`;
  }

  // SUBMIT NOTES

  const submitNote = () => {
    const note = notesInput;
    const date = getNoteDate();

    if (noteTab === "current") {
      setCurrentNotes(prev => [...prev, {
        id: crypto.randomUUID(),
        note: note,
        date: date,
        finished: null
      }])
    } else if (noteTab === "reminders") {
      setReminderNotes(prev => [...prev, {
        id: crypto.randomUUID(),
        note: note,
        date: date,
        finished: null
      }])
    } else {
      undefined;
    }
      
    setNotesInput("");
  }

  // FINISH/DELETE NOTES

  const finishCurrentNote = (id: string) => {
    const raw = localStorage.getItem("notesCurrent");
    if (!raw) return;

    const data: Note[] = JSON.parse(raw);
    const specData = data.find(note => note.id === id);
    if (!specData) return;

    setCurrentNotes(currentNotes.filter(note => note.id !== id));
    setFinishedNotes(prev => [...prev, specData]);
  };

  const deleteCurrentNote = (id: string) => {
    setCurrentNotes(currentNotes.filter(note => note.id !== id));
  }

  const deleteFinishedNote = (id: string) => {
    setFinishedNotes(finishedNotes.filter(note => note.id !== id));
  }

  const deleteReminderNote = (id: string) => {
    setReminderNotes(reminderNotes.filter(note => note.id !== id));
  }

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
              className="w-[25vh] bg-white"
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
          ease-[ease] bg-white z-500 hidden nonsel
        `}
        ref={desktopRef}
      >

        {/* DESKTOP */}
        <div className="items">
            <div className="item">
                <img 
                  draggable="false"
                  src="/os/note.png"
                  className="icon notes-icon"
                  onClick={() => setNotesOpen(!notesOpen)}
                />
                <p>notes/reminders</p>
            </div>
            <div className="item">
                <img 
                  draggable="false"
                  src="/os/mieramp.png"
                  className="icon mieramp-icon"
                  onClick={() => setMierAmpOpen(!mierAmpOpen)}
                />
                <p>MierAmp</p>
            </div>
        </div>  
        
        {/* MIERAMP */}
        <div 
          className={`
            mieramp program draggable
            ${mierAmpOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
            ${inconsolata.className}
          `}
        >
          <div className="amp-top">
            <div className="wrapper2">
              <p>―――――― MierAmp ――――――</p>
              <p 
                className="ampX"
                onClick={() => setMierAmpOpen(false)}
              >
                🞮
              </p>
            </div>
            <div className="amp-player">
            <Marquee
              speed={30}
            > 
              <p
                className="current-song-name"
              >
                {currentSong || currentSong === 0
                ? `\u00A0currently playing: ${playlist[currentSong!]?.title + " !!"}`
                : "currently playing nothing..."
                }
              </p>
            </Marquee>
            <div className="wrapper2">
              <p className="current-song-time">
                {formatTime(currentTime)}
              </p>

              <p className="time-seperate"> | </p>

              <p className="current-song-duration">
                {formatTime(duration)}
              </p>
            </div>
            <input
              type="range"
              min={0}
              max={duration || 1}
              value={currentTime || 0}
              id="progressBar"
              onChange={(e) => {
                const time = Number(e.target.value);

                setCurrentTime(time);

                playerRef.current?.seekTo(
                  time,
                  true
                );
              }}
            />
            <div className="wrapper2">
              <div className="flex items-center justify-center w-[30%] pr-3">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  id="audioBar"
                  onInput={(e) => {handleVolume(Number(e.currentTarget.value))}}
                />
              </div>
              <p className={`${isBuffering && "pointer-events-none opacity-50"} player-button`} onClick={prev}>⏮</p>
              <p className={`${isBuffering && "pointer-events-none opacity-50"} player-button`} onClick={play}>▶</p>
              <p className={`${isBuffering && "pointer-events-none opacity-50"} player-button`} onClick={pause}>❚❚</p>
              <p className={`${isBuffering && "pointer-events-none opacity-50"} player-button`} onClick={stop}>⏹</p>
              <p className={`${isBuffering && "pointer-events-none opacity-50"} player-button`} onClick={next}>⏭</p>
            </div>
          </div>
          </div>  
          <div className="amp-bot">
            <div className="amp-list" id="trackList">
              {playlist.map((song, i) => (
                <div 
                  className="flex w-full"
                  key={song.id}
                >
                  <p
                    onClick={() => {
                      setCurrentSong(i);
                      currentSong === i || setIsBuffering(true);
                      setIsPlaying(true);
                    }}
                    className={`
                      ${currentSong === i ? "song current-song" : "song"}
                      ${isBuffering && "pointer-events-none opacity-50"}
                      truncate w-full
                    `}
                  >
                    {song.title || "..."}
                  </p>
                  <span
                    className="cursor-pointer scale-80 origin-center pr-1 pl-3 ml-auto"
                    onClick={() => deleteSong(song.id)}
                  >
                    ✖
                  </span>
                </div>
              ))}
              <div className="flex w-full gap-1.5">
                <input 
                  type="text"
                  className="w-full"
                  placeholder="enter youtube link.."
                  autoComplete="off"
                  value={mierAmpInput}
                  onChange={(e) => setMierAmpInput(e.currentTarget.value)}
                />
                <p
                  className="cursor-pointer hover:scale-150 origin-center px-2"
                  onClick={() => addSong(mierAmpInput)}
                >
                  +
                </p>
              </div>
            </div>
          </div>
        </div>

        <YouTube
          videoId={currentSong !== null ? playlist[currentSong]?.id : undefined}
          className="hidden"
          opts={{
            height: "0",
            width: "0",
            playerVars: { autoplay: autoplay },
          }}
          onReady={(e: YouTubeEvent) => {
            playerRef.current = e.target;
            playerRef.current.setVolume(volume);
            setPlayerReady(true);
          }}
          onStateChange={(e: YouTubeEvent<number>) => {
            setIsPlaying(e.data === 1);
            setIsBuffering(e.data === 3);
          }}
          onEnd={next}
        />
        
        {/* NOTES */}
        <div 
          className={`
            notes program draggable
            ${notesOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <div className="wrapper3">
            {["current", "finished", "reminders"].map((type) => (
              <p
                className="note-category note-current"
                onClick={() => setNoteTab(type)}
                key={type}
              >
                {type}
              </p>
            ))}
            <p className="notesDate">🗓</p>
            <p 
              className="notesX"
              onClick={() => setNotesOpen(false)}
            >
              🞮
            </p>
          </div>
          <div className="note-inside self-center">
            {noteTab === "current" && (
              currentNotes.map((note) => (
                <div 
                  className="wrapper"
                  key={note.id}
                >
                  <p className="note">{note.note} <span className="date">{note.date}</span></p>
                  <p className="noteFinish note-action" onClick={() => finishCurrentNote(note.id)}>੦</p>
                  <p className="noteDelete note-action" onClick={() => deleteCurrentNote(note.id)}>🞩</p>
                </div>
              )
            ))}
            {noteTab === "finished" && (
              finishedNotes.map((note) => (
                <div 
                  className="wrapper"
                  key={note.id}
                >
                  <p className="note">{note.note} <span className="date">{note.date}</span></p>
                  <p className="noteDelete note-action" onClick={() => deleteFinishedNote(note.id)}>🞩</p>
                </div>
              )
            ))}
            {noteTab === "reminders" && (
              reminderNotes.map((note) => (
                <div 
                  className="wrapper"
                  key={note.id}
                >
                  <p className="note">{note.note} <span className="date">{note.date}</span></p>
                  <p className="noteDelete note-action" onClick={() => deleteReminderNote(note.id)}>🞩</p>
                </div>
              )
            ))}
          </div>
          <div 
            className={`
              wrapper2 input-wrapper
              ${noteTab === "finished" && "opacity-0 pointer-events-none"}
            `}
          >
            <input 
              className="add add-input bg-white text-sm"
              type="text"
              placeholder="add to list..."
              autoFocus={true}
              autoComplete="off"
              value={notesInput}
              onChange={(e) => setNotesInput(e.currentTarget.value)}
            />
            
            <button 
              className="add add-button bg-white"
              onClick={submitNote}
            >
              !!
            </button>
          </div>
        </div>

        {/* TASKBAR */}
        <div className="taskbar">
          <div className="taskbar-wrapper-left">
            <img 
              draggable="false" 
              className="logo"
              src="/os/logo.png"
              onClick={() => setOpenMenu(!openMenu)}
            />
            <div className="tab-wrapper">
              <img draggable="false" className="tab-icon" src="/os/icon0.png" />
              <p className="tab">Pacific Purgatory</p>
            </div>
            <div className="tab-wrapper">
              <img draggable="false" className="tab-icon" src="/os/icon1.png" />
              <p className="tab">MLC Media Mlayer</p>
            </div>
            <div className="tab-wrapper">
              <img draggable="false" className="tab-icon" src="/os/icon2.png" />
              <p className="tab">M:\MierOS\system32...</p>
            </div>
          </div>
          <div className="flex ml-auto gap-2.5 text-[0.9vw]">
            <p>🖂</p>
            <p>🛜</p>
            <p>🔊</p>
            <p>🔌</p>
          </div>
          <div className="taskbar-wrapper-right">
            <p className="translate-y-0.5 clock tiny-clock">{taskbarClock}</p>
            <p className="-translate-y-0.5 taskbar-date">{taskbarDate}</p>
          </div>
        </div>
        
        {/* MIERDOWS */}
        <div 
          className={`
            menu
            ${openMenu ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
            <p>mrow</p>
            <h1 
              className="shutdown"
              onClick={() => {
                login(false);
                setOpenMenu(false);
                blockHandler(4500);
              }}
            >
              ⏻
            </h1>
        </div>

        <div className="mier-dialogue">
            <h1 className="x">⮈</h1>
            <div className="opinions">
              <p className="option oc" id="<%= oc.id %>">oc.name</p>
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
            <img draggable="false" src="/os/mier0.png" className="mier" />
        </div>

        <h1 className="clock huge-clock">{bgClock}</h1>
        
        {/* BGS */}
        <div className="bgs">
          {Array.from({ length: 6 }, (_, i) => (
            <img 
              draggable="false"
              key={i} 
              src={`/os/${i}.png`}
              style={{ animationDelay: `${i * 1}s` }}
              className={`
                bg bg${i}
              `}
            />
          ))}
          <img draggable="false" src="/os/0.png" className="bg bgFilter" />
        </div>

      </div>

      <canvas 
        ref={canvasRef}
        className={`
          fixed top-0 left-0 w-screen h-screen nonsel pointer-events-none
          z-9999 opacity-70 mix-blend-overlay backdrop-blur-[0.2px]
        `} 
      />

      {/* BLOCKER */}
      <div
        className="fixed w-full h-full bg-[#00000000] z-9999 hidden"
        ref={blockerRef}
      />

    </div>
  )
}

export default MierOS;