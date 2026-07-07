'use client';
import { useState, useRef, useEffect } from "react";
import { Roboto_Mono, Inconsolata, VT323 } from "next/font/google";
import YouTube, { YouTubeEvent } from "react-youtube";
import Marquee from "react-fast-marquee";
import advice from "@/components/advice";

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

const vt = VT323({
  weight: "400",
  subsets: ["latin"],
})

const roboto = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
})

const inconsolata = Inconsolata({
  weight: ["200", "300"],
  subsets: ["latin"],
});

const MierOS = () => {
  const [passwordContent, setPasswordContent] = useState("");
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
    blockHandler(login ? 5000 : 4000);

    if (!login) {
      setMierAmpOpen(false);
      setNotesOpen(false);
      setOpenMenu(false);
      setMierAside(false);
      stop();
      changeMier("aloha", true);
      resetTalk();
      mierTalk("see you next time !!", typeSpeed);
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

      if (login) {
        const now = new Date();
        const hours = now.getHours();
        let greeting;

        if (hours < 6) {
            greeting = `greetings ${userName.toLocaleLowerCase()}! shouldn't you be asleep?`
        } else if (hours >= 6 && hours < 12) {
            greeting = `good morning ${userName.toLocaleLowerCase()}! did you sleep well?`
        } else if (hours >= 12 && hours < 18) {
            greeting = `hello ${userName.toLocaleLowerCase()}! how's your afternoon?`
        } else {
            greeting = `good evening ${userName.toLocaleLowerCase()}! have you done your work today?`
        }

        resetTalk();
        changeMier("aloha");
        mierTalk(greeting, typeSpeed);
        setTimeout(() => {
          changeMier("laugh", true);
          setTimeout(() => {
            changeMier("neutral", true)
          }, 2200);
        }, 1600);
      }
    }, login ? 1600 : 3500);
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
  const [playlist, setPlaylist] = useState<Song[]>(
    [
      {"id": "imoEMmZP7UE", "title": "Dusqk - Angelware_v1.11"},
      {"id": "7Nl7nFY0ceg", "title": "Station Earth - Cold Green Eyes"},
      {"id": "6P3MF_nYoFg", "title": "Ginkiha - EOS"},
      {"id": "PWPgYXqMfBY", "title": "FCJ - All Night"},
      {"id": "l0Jo-9aqhYc", "title": "Porter Robinson - Mirror"},
      {"id": "HQnC1UHBvWA", "title": "Porter Robinson & Madeon - Shelter"},
      {"id": "MUHgTcuCBOk", "title": "Porter Robinson - Musician (33 RPM)"},
      {"id": "GSWc180az58", "title": "六時のざわめき"}
    ]
  );
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
  const [reminderNotes, setReminderNotes] = useState<Note[]>([{"id":"6969698008135","note":"hi :3","date":"(4:56 AM - 26/07/05)","finished":null}])

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
  const [visibleNotesDate, setVisibleNotesDate] = useState(true);

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

  const emoji = [`:3`, `:D`, `:]`, `o(〃＾▽＾〃)o`,];
  const praise = [`good job!`, `good work!`, `im proud of you!`, `keep it up!`, `you did it!`];
  const randomizer = (arr: string[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const finishCurrentNote = (id: string) => {
    const specData = currentNotes.find(note => note.id === id);
    if (!specData) return;

    const updated = { ...specData, finished: getNoteDate() };

    setCurrentNotes(currentNotes.filter(note => note.id !== id));
    setFinishedNotes(prev => [...prev, updated]);

    resetTalk()
    mierTalk(`${randomizer(praise)} ${randomizer(emoji)}`, typeSpeed);
    changeMier("laugh");
    blockHandler(1500);
    setTimeout(() => {
      changeMier("neutral");
    }, 1500);
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

  // MIER

  const chatboxRef = useRef<HTMLDivElement | null>(null);
  const chatboxTextRef = useRef<HTMLParagraphElement | null>(null);
  const tap = () => {
    const sound = new Audio(`/audio/tap${Math.floor(Math.random() * 5)}.mp3`);
    sound.play();
  }

  const talkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typeSpeed = 60;

  const mierTalk = (text: string, speed: number, i: number = 0) => {
    if (!chatboxTextRef.current) return;
    if (i >= text.length) return;
    tap();
    chatboxTextRef.current.textContent += text.charAt(i);
    talkTimeoutRef.current = setTimeout(() => mierTalk(text, speed, i + 1), speed);
  }

  const resetTalk = () => {
    if (!chatboxTextRef.current) return;
    if (talkTimeoutRef.current) {
      clearTimeout(talkTimeoutRef.current);
      talkTimeoutRef.current = null;
    }
    chatboxTextRef.current.textContent = "";
  } 
  
  type mierMoods =
  | "aloha"
  | "laugh" 
  | "neutral" 
  | "respondhappy" 
  | "respondneutral" 
  | "sad" 
  | "talk" 
  | "think";
  
  const [mierAside, setMierAside] = useState<boolean>(false);
  const [mierMood, setMierMood] = useState<mierMoods>("aloha");
  const mierRef = useRef<HTMLImageElement | null>(null);
  
  const changeMier = (mood: mierMoods, fade?: boolean) => {
    if (fade) {
      mierRef.current!.style.opacity = `0`
      setTimeout(() => {
        setMierMood(mood);
      }, 300);
      setTimeout(() => {
        mierRef.current!.style.opacity = `1`
      }, 400);
    } else {
      setMierMood(mood);
    }
  }

  const handleMier = () => {
    setShowAdvice(false);
    blockHandler(1500);
    resetTalk();

    if (mierAside) {
      changeMier("neutral")
      mierTalk("...", 400);
    } else {
      changeMier("talk")
      mierTalk("what can i do for you?", typeSpeed);
      setTimeout(() => {
        changeMier("neutral")
      }, 1500);
    }

    setMierAside(!mierAside);
  }

  // MIER GREET

  const hiMier = () => {
    blockHandler(1200);
    resetTalk();

    changeMier("laugh");
    mierTalk("hello!", typeSpeed);
    setTimeout(() => {
      changeMier("neutral");
    }, 1200);
  }

  // MIER ADVICE

  const [showAdvice, setShowAdvice] = useState(false);
  const adviceIndex = useRef<Partial<Record<keyof typeof advice, number>>>({});

  const getAdvice = (option: keyof typeof advice) => {
    if (userReligion === "atheist") return atheistAdvice();

    const arr = advice[option];
    const current = adviceIndex.current[option] ?? 0;

    changeMier("talk");
    resetTalk();
    mierTalk(arr[current], 40);

    adviceIndex.current[option] = (current + 1) % arr.length;

    setTimeout(() => {
      changeMier("neutral");
    }, 2000);
  };

  const atheistAdvice = () => {
    changeMier("laugh");
    resetTalk();
    mierTalk(`what's the point? nothing matters anyway so you might as well just have fun!`, 40);
  }

  // MIER JOKE

  const getJoke = () => {
    resetTalk();
    mierTalk(`hmmm...`, typeSpeed);
    changeMier("think");
    setTimeout(async () => {
      try {
      const result = await fetch("https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,sexist,explicit");
      const data = await result.json();
      if (data.joke && !data.setup) {
        resetTalk();
        changeMier("respondhappy");
        mierTalk(data.joke, typeSpeed);
      } else {
        resetTalk();
        changeMier("respondhappy");
        mierTalk(`${data.setup}\n${data.delivery}`, typeSpeed);
      }
      
      } catch (err) {
        resetTalk();
        changeMier("sad");
        mierTalk(`i cant think of one right now ${userName.toLocaleLowerCase()}, im sorry.. u_u`, typeSpeed);
        console.error("Fetch failed:", err);
      }
    }, 1000);
  }

  // MIER FUN FACT

  const getFact = () => {
    resetTalk();
    mierTalk(`hmmm...`, typeSpeed);
    changeMier("think");
    setTimeout(async () => {
      try {
        const result = await fetch("/api/facts");
        const data = await result.json();
        resetTalk();
        changeMier("respondneutral");
        mierTalk(data[0].fact, typeSpeed);
      } catch (err) {
        resetTalk();
        changeMier("sad");
        mierTalk(`i cant think of one right now ${userName.toLocaleLowerCase()}, im sorry.. u_u`, typeSpeed);
        console.error("Fetch failed:", err);
      }
    }, 1000);
  }

  // MIER HOROSCOPE

  const getHoroscope = () => {
    resetTalk();
    mierTalk(`hmmm...`, typeSpeed); 
    changeMier("think");
    setTimeout(async () => {
      try {
        const result = await fetch(`/api/horoscope?zodiac=${userZodiac}`);
        const data = await result.json();
        resetTalk();
        changeMier("respondneutral");
        mierTalk(data.horoscope, 40);
        console.log(data);
      } catch (err) {
        resetTalk();
        changeMier("sad");
        mierTalk(`im sorry ${userName.toLocaleLowerCase()} but i cant seem to communicate with the stars right now.. u_u`, typeSpeed);
        console.error("Fetch failed:", err);
      }
    }, 1000);
  }

  // SET UP

  const [setup, setSetup] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [userHeight, setUserHeight] = useState<string>("");
  const [userWeight, setUserWeight] = useState<string>("");
  const [userColor, setUserColor] = useState<string>("");
  const [userZodiac, setUserZodiac] = useState<string>("");
  const [userCountry, setUserCountry] = useState<string>("");
  const [userPolitics, setUserPolitics] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userFear, setUserFear] = useState<string>("");
  const [userCrush, setUserCrush] = useState<string>("");
  const [userReligion, setUserReligion] = useState<string>("");
  
  useEffect(() => {
    const state = localStorage.getItem("mierOSsetup");
    if (state) setSetup(true);
  }, []);

  const setupMierOS = (setup: boolean) => {
    if (setup) {
      localStorage.setItem("mierOSsetup", "true");
      setSetup(true);
    } else {
      blockHandler(4000);
      setMierAmpOpen(false);
      setNotesOpen(false);
      setOpenMenu(false);
      setMierAside(false);
      stop();
      changeMier("aloha", true);
      resetTalk();
      mierTalk("see you another time !!", typeSpeed);
      blackScreenRef.current!.style.display = `flex`;

      setTimeout(() => {
        blackScreenRef.current!.style.opacity = "100";
      }, 2000);

      setTimeout(() => {
        localStorage.removeItem("mierOSsetup");
        localStorage.removeItem("mierOSUserInfo");
        // localStorage.removeItem("mierAmpPlaylist");
        // localStorage.removeItem("mierAmpVolume");
        // localStorage.removeItem("notesCurrent");
        // localStorage.removeItem("notesFinished");
        // localStorage.removeItem("notesReminder");
        setSetup(false);
        window.location.reload()
      }, 4000);
    }
  }

  const getZodiac = (mmdd: string) => {
    const [month, day] = mmdd.split("-").map(Number);

    if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
      return "capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
      return "aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
      return "pisces";
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
      return "aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
      return "taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
      return "gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
      return "cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
      return "leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
      return "virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
      return "libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
      return "scorpio";

    return "sagittarius";
  };

  type UserInfo = {
    name: string;
    height: string;
    weight: string;
    color: string;
    zodiac: string;
    country: string;
    politics: string;
    password: string;
    fear: string;
    crush: string;
    religion: string;
  }

  const userInfoInitialized = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("mierOSUserInfo");
    if (saved) {
      const info: UserInfo = JSON.parse(saved);
      setUserName(info.name ?? "");
      setUserHeight(info.height ?? "");
      setUserWeight(info.weight ?? "");
      setUserColor(info.color ?? "");
      setUserZodiac(info.zodiac ?? "");
      setUserCountry(info.country ?? "");
      setUserPolitics(info.politics ?? "");
      setUserPassword(info.password ?? "");
      setUserFear(info.fear ?? "");
      setUserCrush(info.crush ?? "");
      setUserReligion(info.religion ?? "");
    }
    userInfoInitialized.current = true;
  }, []);

  useEffect(() => {
    if (!userInfoInitialized.current) return;
    localStorage.setItem("mierOSUserInfo", JSON.stringify({
      name: userName,
      height: userHeight,
      weight: userWeight,
      color: userColor,
      zodiac: userZodiac,
      country: userCountry,
      politics: userPolitics,
      password: userPassword,
      fear: userFear,
      crush: userCrush,
      religion: userReligion,
    }));
  }, [userName, userHeight, userWeight, userColor, userZodiac, userCountry, userPolitics, userPassword, userFear, userCrush, userReligion]);

  // GET WHAT TO DO

  const getWhatToDo = () => {
    resetTalk();
    mierTalk(`hmmm...`, typeSpeed);
    changeMier("think");
    
    setTimeout(() => {
      whatToDo();
    }, 2000);
  }

  const whatToDo = () => {

    // NOTES
    type Notes = {
      date: string;
      finished: string | null;
      id: string;
      note: string;
    }
    const noteRandomizer = (arr: Notes[]) => {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    const notesComment = () => {
      const data = JSON.parse(localStorage.getItem("notesCurrent") ?? "[]");
      const specData = noteRandomizer(data);

      const responses = [
        `maybe you should do your task of "${specData.note}"..`,
        `have you done your task of "${specData.note}" yet?`,
        `when will you do your task of "${specData.note}"?`,
        `don't forget about "${specData.note}"!`,
      ]

      resetTalk();
      changeMier("respondneutral");
      mierTalk(randomizer(responses), typeSpeed);
    }

    // WEIGHT
    const weightComment = () => {
      const weight = Number(userWeight);

      const responses =
      weight <= 60 ? [
        `i was gonna suggest going outside but the wind might take you..`,
        `you are ${weight} lbs.. maybe go eat something, anything. a crumb. please!`,
        `at ${weight} lbs you could go float in a pool with very little effort.. just saying!`,
        `maybe eat a sandwich, a big one. maybe 2.. actually maybe 4!`,
      ] : [
        `at ${weight} lbs you are entering elephant territory. you should go find a river to bathe in.`,
        `maybe don't do cannonballs in any body of water.. you might cause a tsunami..`,
        `try taking a nap outside. the earth is your mattress now at ${weight} lbs.`,
        `go eat the moon as a snack, you've earned it!`,
        `go cause a small geological event. it's basically cardio at your size of ${weight} lbs!`,
        `at ${weight} lbs, you should go become a mountain. the view up there is probably great!`,
      ];

      resetTalk();
      changeMier("laugh");
      mierTalk(randomizer(responses), typeSpeed);
    }

    // HEIGHT
    const heightComment = () => {
      const height = Number(userHeight);

      const responses =
      height <= 1 ? [
        `you should probably just.. stay still. and hope nobody accidentally steps on you.`,
        `i think you could.. hold on... where are you? i can't see you..`,
        `i.. can't hear you.. i think you need a micro-microphone so i can hear you.`,
        `i'd suggest finding a grain of rice to use as a bed and calling it a day.`,
      ] :
      height <= 15 ? [
        `i'd be careful if i were you, you'd probably lose against a hamster..`,
        `you could live inside a shoe and call it a mansion since you're ${height}cm!`,
        `you could sneak into a mouse hole and see what's going on in there..`,
        `go explore under the couch. nobody has mapped that territory yet!`,
      ] :
      height <= 30 ? [
        `you could invest in a ladder just to climb onto a chair!`,
        `you should go on a walk! a really long one. like, to the end of the hallway.`,
      ] :
      height <= 60 ? [
        `since you're like ${height}cm, you could go play hide-and-seek with your friends and win all the time!`,
      ] :
      height <= 100 ? [
        `try finding a rollercoaster you're actually allowed on, it's a fun challenge!`,
        `you should go take a nap. at your height (${height}cm) you've been looking up at people all day and that's exhausting!`,
      ] :
      height <= 140 ? [
        `at ${height}cm, you could audition to be the world's tallest midget!`,
      ] :
      height <= 160 ? [
        `go drink some milk and then drink more milk. maybe you'll gain a centimeter.`,
      ] :
      height <= 180 ? [
      ] :
      height <= 210 ? [
        `go grab something off the top shelf for someone. it's basically your calling at ${height}cm.`,
      ] :
      height <= 600 ? [
        `you should go stand outside and let birds land on you. you're basically a tree!`,
        `why don't you go eat some tree leaves like a giraffe? you're like ${height}cm tall!`,
        `you could walk to another city in like three steps. maybe go do that!`,
      ] :
      height <= 30000 ? [
        `you could apply as an air traffic controller, all you have to do is to just use your head!`,
        `have you decided which mountain you're gonna sleep on tonight?`,
        `which of the 7 seas do you use for your baths??`,
      ] : 
      height <= 1200000 ? [
        `try leaning over and see what's happening in the country next door!`,
        `you could say hi to the airplanes around your head at ${Math.floor(height * 0.0328084).toLocaleString()} feet above water!`,
      ] : [
        `can you clean the firmament around us?? you're like ${Math.floor(height * 0.0328084).toLocaleString()} feet tall!`,
      ];

      resetTalk();
      changeMier("laugh");
      mierTalk(randomizer(responses), typeSpeed);
    }

    // COLOR
    const colorComment = () => {
      const responses = [
        `you could try painting something in ${userColor}!`,
        `have you tried painting something with minimal ${userColor} to none?`,
      ]

      resetTalk();
      changeMier("respondhappy");
      mierTalk(randomizer(responses), typeSpeed);
    }

    // COUNTRY
    const countryComment = () => {
      const responses = [
        `have you explored everything you wanted to in ${userCountry}?`,
        `what other sights have you not seen in ${userCountry}? you could explore them`,
        `have you ever thought of traveling outside of ${userCountry}?`,
      ]

      resetTalk();
      changeMier("respondneutral");
      mierTalk(randomizer(responses), typeSpeed);
    }

    // POLITICS
    const politicsComment = () => {
      resetTalk();
      changeMier("laugh");
      mierTalk(`dont you have to go argue pointlessly about politics with strangers online?`, typeSpeed);
    }

    // FEAR
    const fearComment = () => {
      const responses = [
        `have you gotten over your fear of ${userFear} yet?`,
        `you could try facing your fear of ${userFear} right now!`,
        `does your fear of ${userFear} still affect you?`,
        `you could attempt exposure therapy for your fear of ${userFear}!`,
      ]

      resetTalk();
      changeMier("laugh");
      mierTalk(randomizer(responses), typeSpeed);
    }

    // CRUSH
    const crushComment = () => {
      const responses = [
        `when will you muster up the courage to ask ${userCrush.toLocaleLowerCase()} out?`,
        `you could think of ways to get ${userCrush.toLocaleLowerCase()}'s attention!`,
        `ask them out! ${userCrush.toLocaleLowerCase()} isn't a 2D character right?`,
        `you could try thinking of something else other than ${userCrush.toLocaleLowerCase()}!`,
      ]

      resetTalk();
      changeMier("laugh");
      mierTalk(randomizer(responses), typeSpeed);
    }

    // RELIGION
    const religionComment = () => {
      const responses = [
        `have you been fasting lately? it's important to clear your gut and mind!`,
        `have you meditated today? i hope your attention span isn't that of a zoomer's`,
        `have you prayed today? a communion with the creator is crucial!`,
      ]

      resetTalk();
      changeMier("respondneutral");
      mierTalk(randomizer(responses), typeSpeed);
    }

    const possibleComments: (() => void)[] = [];
    if (currentNotes?.length) possibleComments.push(notesComment);
    if (userCountry) possibleComments.push(countryComment);
    if (userColor) possibleComments.push(colorComment);
    if (userFear) possibleComments.push(fearComment);
    if (userCrush) possibleComments.push(crushComment);
    if (userHeight && (Number(userHeight) <= 160 || Number(userHeight) >= 180)) possibleComments.push(heightComment);
    if (userWeight && (Number(userWeight) <= 60 || Number(userWeight) >= 5000)) possibleComments.push(weightComment);
    if (userPolitics && (userPolitics === "fashy" || userPolitics === "tankie")) possibleComments.push(politicsComment);
    if (userReligion && (userReligion !== "agnostic" && userReligion !== "other" && userReligion !== "atheist")) possibleComments.push(religionComment);

    if (!possibleComments.length) {
      resetTalk();
      changeMier("sad");
      mierTalk(`sorry${userName && ` ${userName}`}, i don't know anything about you at all..`, typeSpeed);
      return;
    }

    const func = possibleComments[Math.floor(Math.random() * possibleComments.length)];
    func();
  }
  
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [biosVisible, setBiosVisible] = useState(true);
  const biosRef = useRef<HTMLDivElement | null>(null);
  const currentYear = new Date().getFullYear();

  const preload = [
    "/os/note.png",
    "/os/mieramp.png",
    "/os/mier-aloha.png",
    "/os/mier-laugh.png",
    "/os/mier-neutral.png",
    "/os/mier-respondneutral.png",
    "/os/mier-respondhappy.png",
    "/os/mier-sad.png",
    "/os/mier-talk.png",
    "/os/mier-think.png",
    "/os/0.png",
    "/os/1.png",
    "/os/2.png",
    "/os/3.png",
    "/os/4.png",
    "/os/5.png",
    "/os/bear.png",
  ];

  useEffect(() => {
    const promises = preload.map(src => new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        setProgress(prev => prev + 1);
        resolve();
      };
      img.onerror = () => {
        setProgress(prev => prev + 1);
        resolve();
      };
      img.src = src;
    }));

    Promise.all(promises).then(() => setReady(true));
  }, []);

  const bootLines = [
    "MierOS v2.0 — BIOS initialization..",
    "checking memory integrity..",
    "loading system assets..",
    "mounting filesystem..",
    "building terrain..",
    "initializing display driver..",
    "loading character sprites..",
    "calibrating audio subsystem..",
    "you feel an evil presence watching you..",
    "restoring user environment..",
    "applying user preferences..",
    "leaving with everything but your humanity..",
    "starting desktop shell..",
    "verifying system integrity..",
    "eating without a table..",
    "loading the most unoptimized OS..",
    "MierOS ready !! click anywhere to continue !!",
  ];

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center">

      {/* SET UP SCREEN */}
      <div 
        className={`
          w-screen h-screen bg-[rgb(200,218,220)]
          items-center justify-center transition-all
          duration-1200 ease-[ease] fixed z-2000 nonsel
          ${setup ? "hidden" : "flex"}
        `}
      >
        <div
          className={`
            flex flex-col items-center justify-between relative p-4
            h-auto w-[40vw] bg-amber-50 gap-4 mb-4
          `}
        >
          {/* TOP */}
          <div className="flex flex-col items-center justify-center">
            <p>looks like this is your first time setting up MierOS!</p>
            <p>please enter your info below!</p>
          </div>

          {/* INFO */}
          <div
            className="w-[90%] h-[50%] bg-amber-200 p-4 grid grid-cols-[1.5fr_3fr] gap-1"
          >
            <p>full name:</p>
            <div className="w-full grid grid-cols-3 gap-1">
              <input 
                type="text"
                className="pl-1 bg-white"
                placeholder="first name"
                autoComplete="off"
                onChange={(e) => setUserName(e.currentTarget.value)}
              />
              <input 
                type="text"
                className="pl-1 bg-white"
                placeholder="middle name"
                autoComplete="off"
              />
              <input 
                type="text"
                className="pl-1 bg-white"
                placeholder="last name"
                autoComplete="off"
              />
            </div>
            <p>date of birth:</p>
            <input 
              type="date"
              className="w-full pl-1 bg-white"
              onChange={(e) => setUserZodiac(getZodiac(e.currentTarget.value.slice(5, 10)))}
            />
            <p>sex:</p>
            <select
              defaultValue=""
              className="w-full pl-0.5 bg-white"
            >
              <option value="" disabled hidden>sex</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="">prefer not to say</option>
            </select>
            <p>height in cm:</p>
            <input 
              type="number"
              className="w-full pl-1 bg-white"
              placeholder="180cm"
              autoComplete="off"
              onChange={(e) => setUserHeight(e.currentTarget.value)}
            />
            <p>weight in pounds:</p>
            <input 
              type="number"
              className="w-full pl-1 bg-white"
              placeholder="160lbs"
              autoComplete="off"
              onChange={(e) => setUserWeight(e.currentTarget.value)}
            />
            <p>email address:</p>
            <input 
              type="text"
              className="w-full pl-1 bg-white"
              placeholder="user@email.com"
              autoComplete="off"
            />
            <p>country:</p>
            <select
              defaultValue=""
              className="w-full pl-0.5 bg-white"
              
              onChange={(e) => setUserCountry(e.currentTarget.value)}
            >
              <option value="" disabled hidden>country</option>
              <option value="Afghanistan">Afghanistan</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Antigua&Deps">Antigua & Deps</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Bahamas">Bahamas</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Barbados">Barbados</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Belize">Belize</option>
              <option value="Benin">Benin</option>
              <option value="Bermuda">Bermuda</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Bolivia">Bolivia</option>
              <option value="BosniaHerzegovina">Bosnia & Herzegovina</option>
              <option value="Botswana">Botswana</option>
              <option value="Brazil">Brazil</option>
              <option value="Brunei">Brunei</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Burkina">Burkina</option>
              <option value="Burundi">Burundi</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Canada">Canada</option>
              <option value="CapeVerde">Cape Verde</option>
              <option value="CentralAfricanRep">Central African Rep</option>
              <option value="Chad">Chad</option>
              <option value="Chile">Chile</option>
              <option value="China">China</option>
              <option value="Colombia">Colombia</option>
              <option value="Comoros">Comoros</option>
              <option value="Congo">Congo</option>
              <option value="Congo(DemocraticRep)">Congo (Democratic Rep)</option>
              <option value="CostaRica">Costa Rica</option>
              <option value="Croatia">Croatia</option>
              <option value="Cuba">Cuba</option>
              <option value="Cyprus">Cyprus</option>
              <option value="CzechRepublic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Djibouti">Djibouti</option>
              <option value="Dominica">Dominica</option>
              <option value="DominicanRepublic">Dominican Republic</option>
              <option value="EastTimor">East Timor</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Egypt">Egypt</option>
              <option value="ElSalvador">El Salvador</option>
              <option value="EquatorialGuinea">Equatorial Guinea</option>
              <option value="Eritrea">Eritrea</option>
              <option value="Estonia">Estonia</option>
              <option value="Eswatini">Eswatini</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Fiji">Fiji</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="Gabon">Gabon</option>
              <option value="Gambia">Gambia</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Ghana">Ghana</option>
              <option value="Greece">Greece</option>
              <option value="Grenada">Grenada</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Guinea">Guinea</option>
              <option value="Guinea-Bissau">Guinea-Bissau</option>
              <option value="Guyana">Guyana</option>
              <option value="Haiti">Haiti</option>
              <option value="Honduras">Honduras</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="India">India</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Iran">Iran</option>
              <option value="Iraq">Iraq</option>
              <option value="Ireland(Republic)">Ireland (Republic)</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="IvoryCoast">Ivory Coast</option>
              <option value="Jamaica">Jamaica</option>
              <option value="Japan">Japan</option>
              <option value="Jordan">Jordan</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kenya">Kenya</option>
              <option value="Kiribati">Kiribati</option>
              <option value="KoreaNorth">Korea North</option>
              <option value="KoreaSouth">Korea South</option>
              <option value="Kosovo">Kosovo</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Laos">Laos</option>
              <option value="Latvia">Latvia</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liberia">Liberia</option>
              <option value="Libya">Libya</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Macedonia">Macedonia</option>
              <option value="Madagascar">Madagascar</option>
              <option value="Malawi">Malawi</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Maldives">Maldives</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value="MarshallIslands">Marshall Islands</option>
              <option value="Mauritania">Mauritania</option>
              <option value="Mauritius">Mauritius</option>
              <option value="Mexico">Mexico</option>
              <option value="Micronesia">Micronesia</option>
              <option value="Moldova">Moldova</option>
              <option value="Monaco">Monaco</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montenegro">Montenegro</option>
              <option value="Morocco">Morocco</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Namibia">Namibia</option>
              <option value="Nauru">Nauru</option>
              <option value="Nepal">Nepal</option>
              <option value="Netherlands">Netherlands</option>
              <option value="NewZealand">New Zealand</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Niger">Niger</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Norway">Norway</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Palau">Palau</option>
              <option value="Palestine">Palestine</option>
              <option value="Panama">Panama</option>
              <option value="PapuaNewGuinea">Papua New Guinea</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Philippines">Philippines</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Qatar">Qatar</option>
              <option value="Romania">Romania</option>
              <option value="RussianFederation">Russian Federation</option>
              <option value="Rwanda">Rwanda</option>
              <option value="StKitts&Nevis">St Kitts & Nevis</option>
              <option value="StLucia">St Lucia</option>
              <option value="SaintVincent&theGrenadines">Saint Vincent & the Grenadines</option>
              <option value="Samoa">Samoa</option>
              <option value="SanMarino">San Marino</option>
              <option value="SaoTome&Principe">Sao Tome & Principe</option>
              <option value="SaudiArabia">Saudi Arabia</option>
              <option value="Senegal">Senegal</option>
              <option value="Serbia">Serbia</option>
              <option value="Seychelles">Seychelles</option>
              <option value="SierraLeone">Sierra Leone</option>
              <option value="Singapore">Singapore</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="SolomonIslands">Solomon Islands</option>
              <option value="Somalia">Somalia</option>
              <option value="SouthAfrica">South Africa</option>
              <option value="SouthSudan">South Sudan</option>
              <option value="Spain">Spain</option>
              <option value="SriLanka">Sri Lanka</option>
              <option value="Sudan">Sudan</option>
              <option value="Suriname">Suriname</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Syria">Syria</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Thailand">Thailand</option>
              <option value="Togo">Togo</option>
              <option value="Tonga">Tonga</option>
              <option value="Trinidad&Tobago">Trinidad & Tobago</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Tuvalu">Tuvalu</option>
              <option value="Uganda">Uganda</option>
              <option value="Ukraine">Ukraine</option>
              <option value="UnitedArabEmirates">United Arab Emirates</option>
              <option value="UnitedKingdom">United Kingdom</option>
              <option value="UnitedStates">United States</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Vanuatu">Vanuatu</option>
              <option value="VaticanCity">Vatican City</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Yemen">Yemen</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
            </select>
            <p>phone number:</p>
            <input 
              type="text"
              className="w-full pl-1 bg-white"
              placeholder="+1 234 567-8910"
              autoComplete="off"
            />
            <p>city:</p>
            <input 
              type="text"
              className="w-full pl-1 bg-white"
              placeholder="city"
              autoComplete="off"
            />
            <p>street:</p>
            <input 
              type="text"
              className="w-full pl-1 bg-white"
              placeholder="street"
              autoComplete="off"
            />
            <p>zip code:</p>
            <input 
              type="text"
              className="w-full pl-1 bg-white"
              placeholder="1230"
              autoComplete="off"
            />
            <p>credit card:</p>
            <div className="w-full grid grid-cols-4 gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <input
                  key={i}
                  type="text"
                  className="pl-1 bg-white text-center"
                  autoComplete="off"
                  maxLength={4}
                  placeholder="0000"
                />
              ))}
            </div>
            <p>CVV:</p>
            <input
              type="text"
              className="pl-1 bg-white text-center"
              autoComplete="CVV"
              maxLength={3}
              placeholder="000"
            />
            <p>SSN:</p>
            <div className="w-full grid grid-cols-3 gap-1">
              {[3, 2, 4].map((i) => (
                <input
                  key={i}
                  type="text"
                  className={`
                    pl-1 text-center
                    ${userCountry === "UnitedStates" 
                      ? "bg-white" 
                      : "bg-gray-400 pointer-events-none"
                    }
                  `}
                  autoComplete="off"
                  maxLength={i}
                  placeholder={"0".repeat(i)}
                />
              ))}
            </div>

            <p>deepest fear:</p>
            <input 
              type="text"
              className="w-full pl-1 bg-white"
              placeholder="skeletons"
              autoComplete="off"
              onChange={(e) => setUserFear(e.currentTarget.value)}
            />
            <p>current crush:</p>
            <input 
              type="text"
              className="w-full pl-1 bg-white"
              placeholder="abri"
              autoComplete="off"
              onChange={(e) => setUserCrush(e.currentTarget.value)}
            />
            <p>favorite color:</p>
            <input 
              type="text"
              className="w-full pl-1 bg-white"
              placeholder="blue"
              autoComplete="off"
              onChange={(e) => setUserColor(e.currentTarget.value)}
            />
            <p>religious beliefs:</p>
            <select
              defaultValue=""
              className="w-full pl-0.5 bg-white"
              onChange={(e) => setUserReligion(e.currentTarget.value)}
            >
              <option value="" disabled hidden>religion</option>
              <option value="christian">christianity</option>
              <option value="muslim">islam</option>
              <option value="buddhist">buddhism</option>
              <option value="hindu">hinduism</option>
              <option value="shinto">shintoism</option>
              <option value="taoism">taoism</option>
              <option value="judaism">judaism</option>
              <option value="other">other</option>
              <option value="agnostic">agnostic</option>
              <option value="atheist">materialist hedonist determinist atheist</option>
            </select>
            <p>political views:</p>
            <select
              defaultValue=""
              className="w-full pl-0.5 bg-white"
              onChange={(e) => setUserPolitics(e.currentTarget.value)}
            >
              <option value="" disabled hidden>views</option>
              <option value="socialist">socialist</option>
              <option value="democrat">democrat</option>
              <option value="liberal">liberal</option>
              <option value="centrist">boomer centrist</option>
              <option value="libertarian">libertarian</option>
              <option value="conservative">conservative</option>
              <option value="capitalist">capitalist</option>
              <option value="fashy">chud fashy (none of these words are in the bible)</option>
              <option value="tankie">cringe tankie (none of these words are in the bible)</option>
              <option value="none">enlightened non-participant</option>
            </select>
            <p>MierOS password:</p>
            <input 
              type="password"
              className="w-full pl-1 bg-white"
              placeholder="password"
              autoComplete="off"
              onChange={(e) => setUserPassword(e.currentTarget.value)}
            />
          </div>

          {/* SUBMIT */}
          <p
            onClick={() => setupMierOS(true)}
            className="cursor-pointer py-2 px-4 bg-amber-100 rounded-sm"
          >
            Finish Setup
          </p>

          
        </div>
        <p className="text-center absolute bottom-4 font-bold breathe">
          THESE ARE JOKES AND ARE NOT RECORDED. ALL NECESSARY (ALL NON-SENSITIVE) INFO FOR UX ARE KEPT PURELY IN YOUR BROWSER'S LOCALSTORAGE<br/>
          <span className="text-black/50">
          (just write down gibberish or leave fields blank if you want, some are used for personalized user experience lol)
          </span>
        </p>
        
      </div>

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
                <p>{userName ? userName : "Admin"}</p>
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
              onKeyDown={(e) => e.key === "Enter" && checkLogin()}
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
                name="password-remember"
              />
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
              nonsel pointer-events-none
            `}
            src="os/snow.mov"
          />

        </div>

      </div>

      {/* BLACK SCREEN */}
      <div 
        className={`
          w-screen h-screen bg-[#0f0f10] hidden
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
                  className="icon nonsel notes-icon"
                  onClick={() => setNotesOpen(!notesOpen)}
                />
                <p>notes/reminders</p>
            </div>
            <div className="item">
                <img 
                  draggable="false"
                  src="/os/mieramp.png"
                  className="icon nonsel mieramp-icon"
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
            <p className="notesDate" onClick={() => setVisibleNotesDate(!visibleNotesDate)}>🗓</p>
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
                  <p className="note">{note.note} <span className={`date ${visibleNotesDate ? "flex" : "hidden"}`}>{note.date}</span></p>
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
                  <p className="note">{note.note} <span className={`date ${visibleNotesDate ? "flex" : "hidden"}`}>{note.date}</span><span className={`date date-done ${visibleNotesDate ? "flex" : "hidden"}`}>{note.finished}</span></p>
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
                  <p className="note">{note.note} <span className={`date ${visibleNotesDate ? "flex" : "hidden"}`}>{note.date}</span></p>
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
              onKeyDown={(e) => e.key === "Enter" && submitNote()}
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
              className="logo nonsel"
              src="/os/logo.png"
              onClick={() => setOpenMenu(!openMenu)}
            />  
            <div className="tab-wrapper">
              <img draggable="false" className="tab-icon nonsel pointer-events-none" src="/os/icon0.png" />
              <p className="tab">Pacific Purgatory</p>
            </div>
            <div className="tab-wrapper">
              <img draggable="false" className="tab-icon nonsel pointer-events-none" src="/os/icon1.png" />
              <p className="tab">MLC Media Mlayer</p>
            </div>
            <div className="tab-wrapper">
              <img draggable="false" className="tab-icon nonsel pointer-events-none" src="/os/icon2.png" />
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
            <p>shut down</p>
            <h1 
              className="shutdown"
              onClick={() => login(false)}
            >
              ⏻
            </h1>
            <p
              className="cursor-pointer absolute left-4 bottom-2 text-white/50 hover:text-white transition-color duration-100"
              onClick={() => setupMierOS(false)}
            >
              Reformat MierOS
            </p>
        </div>
        
        {/* MIERTALK */}
        <div className="mier-dialogue">
          <h1 
            className={`x ${mierAside && showAdvice ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={() => setShowAdvice(false)}
          >
            ⮈
          </h1>

          {/* ADVICE */}
          <div 
            className={`
              ${mierAside && showAdvice ? "opacity-100" : "opacity-0 pointer-events-none"}
              advices
            `}
          >
            <p className="option" onClick={() => getAdvice("faith")}>faith</p>
            <p className="option" onClick={() => getAdvice("purity")}>purity</p>
            <p className="option" onClick={() => getAdvice("creation")}>creation</p>
            <p className="option" onClick={() => getAdvice("wisdom")}>wisdom</p>
            <p className="option" onClick={() => getAdvice("sadness")}>sadness</p>
            <p className="option" onClick={() => getAdvice("sloth")}>sloth</p>
            <p className="option" onClick={() => getAdvice("fear")}>fear</p>
            <p className="option" onClick={() => getAdvice("shame")}>shame</p>
            <p className="option" onClick={() => getAdvice("despair")}>despair</p>
          </div>

          {/* OPTIONS */}
          <div 
            className={`
              ${mierAside && !showAdvice ? "opacity-100" : "opacity-0 pointer-events-none"}
              options  
            `}
          >
            <p className="option" onClick={() => hiMier()}>hi!</p>
            <p className="option" onClick={() => getWhatToDo()}>what should i do?</p>
            <p className="option" onClick={() => setShowAdvice(true)}>i need advice..</p>
            <p className="option" onClick={() => getJoke()}>tell me a joke!</p>
            <p className="option" onClick={() => getFact()}>tell me a fun fact!</p>
            <p className="option" onClick={() => getHoroscope()}>daily horoscope!</p>

          </div>
          
          {/* DIALOGUE */}
          <p 
            className="mier-talk"
            ref={chatboxTextRef}
          >
          </p>

        </div>
        
        {/* MIER */}
        <div className="mier-div">
          <img 
            draggable="false"
            src={`/os/mier-${mierMood}.png`}
            className={`
              ${mierAside ? "ml-[50vw]" : "ml-0"}
              mier nonsel
              `}
            onClick={() => handleMier()}
            ref={mierRef}
          />
        </div>
        
        {/* BG CLOCK */}
        <h1 className="clock huge-clock">{bgClock}</h1>
        
        {/* BGS */}
        <div className="bgs">
          {Array.from({ length: 6 }, (_, i) => (
            <img 
              draggable="false"
              key={i} 
              src={`/os/${i}.png`}
              style={{ animationDelay: `${i * 1.5}s` }}
              className={`
                bg bg${i} nonsel pointer-events-none
              `}
            />
          ))}
        </div>

      </div>
      
      {/* CRT FILTER */}
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

      {/* LOADING SCREEN */}
      <div 
        ref={biosRef}
        className={`
          fixed w-full h-full z-9000 py-8 px-12 nonsel
          transition-opacity duration-500 nonsel ease-in
          flex flex-col text-xl text-[rgb(183,244,255)] bg-[#0f0f10]
          ${ready ? "pointer-events-auto cursor-pointer" : "pointer-events-none"}
          ${biosVisible ? "opacity-100" : "opacity-0"}
        `}
        onTransitionEnd={() => {
          if (ready && !biosVisible) biosRef.current!.style.display = "none";
        }}
        onClick={() => {setBiosVisible(false)}}
      >
        {/* HEADER */}
        <div className="text-white mb-6">
          <p className="font-bold">MierOS BIOS v7.7.7</p>
          <p className="text-gray-500 text-base">Copyright © 2025 - {currentYear} Miercury. All Rights Reserved.</p>
          <hr className="my-3 border-gray-500/50 block" />
        </div>

        {/* LINES */}
        <div className="flex flex-col gap-1">
          {bootLines.slice(0, progress).map((line, i) => (
            <div key={i} className="flex gap-3">

              <span className="text-gray-600 select-none">
                [{String(i + 1).padStart(2, "0")}/{preload.length}]
              </span>

              <span
                className={`
                ${i === progress - 1 && "font-bold"}  
                `}
              >
                {line}
              </span>
              
              {i === progress - 1 && (
                <span className="blinking">█</span>
              )}

            </div>
          ))}
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-auto">
          <div className="flex justify-between text-gray-500 text-base mb-1">
            <span>{progress === preload.length ? "system assets loaded" : "loading system assets"}</span>
            <span>{Math.round((progress / preload.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-900 border border-gray-700 h-2">
            <div
              className="h-full bg-[rgb(183,244,255)] transition-all duration-1000"
              style={{ width: `${(progress / preload.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default MierOS;