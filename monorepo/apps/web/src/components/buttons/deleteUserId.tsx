import { useEffect, useRef, useState } from "react";
import FireSound from "../../assets/fire.mp3";
import { MdLocalFireDepartment } from "react-icons/md";
import { useStore } from "../../store";

export default function DeleteUserID() {
  const showFireButton = useStore((state) => state.showFireButton);
  const [isPressed, setIsPressed] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const [showButton, setShowButton] = useState(false);

  const handlePointerDown = () => {
    setIsPressed(true);
    timeoutIdRef.current = setTimeout(() => {
      localStorage.removeItem("userId");
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setShowToast(true);
        playFireSound();
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    }, 1000) as unknown as NodeJS.Timeout;
  };

  const handlePointerUp = () => {
    setIsPressed(false);
    clearTimeout(timeoutIdRef.current as unknown as number);
    const userId = localStorage.getItem("userId");
    if (userId) {
      setShowButton(true);
    }
  };

  const playFireSound = () => {
    if (audioRef.current) {
      setIsPressed(false);
      audioRef.current.play();
    }
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setShowButton(true);
    } else {
      setTimeout(() => {
        setShowButton(false);
        if (audioRef.current) audioRef.current.pause();
      }, 3500);
    }
  }, [isPressed, showFireButton]);

  useEffect(() => {
    audioRef.current = new Audio(FireSound);
    audioRef.current.volume = 0.1;
    return () => {
      clearTimeout(timeoutIdRef.current as unknown as number);
      setShowToast(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);
  return (
    <>
      {showToast && (
        <div
          className={` ${
            showButton && showToast
              ? "-translate-x-4 sm:-translate-x-8 visible"
              : "invisible translate-x-full"
          } rounded z-50  cursor-pointer duration-300 fixed top-4 right-4 py-2 px-4  bg-blue-600 text-slate-100`}
        >
          Session Cleared !!!
        </div>
      )}

      <div
        className={`${
          showToast ? "visible" : "invisible"
        } absolute  sm:bottom-12 bottom-[1.4rem] z-40 -right-[22.8rem] sm:-right-[19.7rem]`}
      >
        <img
          src="/gif/giphy.gif"
          style={{ WebkitUserDrag: "none" } as React.CSSProperties}
          className="h-[30%] w-[30%] select-none user"
        />
      </div>

      <div
        style={{ WebkitUserDrag: "none" } as React.CSSProperties}
        className={`absolute appearance-none outline-none select-none  bottom-4 sm:bottom-10 z-40 right-4 sm:right-16`}
      >
        <div
          style={{ WebkitUserDrag: "none" } as React.CSSProperties}
          title="Click to clear session"
          onClick={handlePointerDown}
          onPointerUp={handlePointerUp}
          className={`${
            showToast ? "bg-red-400/70" : "active:bg-slate-500/60 bg-slate-500"
          } ${isPressed ? "animate" : "animate-none"} ${
            showButton ? "visible" : "invisible scale-0"
          } duration-100 select-none hover:scale-110  cursor-pointer after:animate-ping rounded-full  p-4`}
        >
          <MdLocalFireDepartment
            style={{ WebkitUserDrag: "none" } as React.CSSProperties}
            className="select-none text-red-400 text-2xl z-50 "
          />
        </div>
      </div>
    </>
  );
}
