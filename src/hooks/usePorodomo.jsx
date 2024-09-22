import { useEffect, useRef, useState } from "react";
import { TIMER_STATE } from "../libs";

const useAudio = () => {
  const url = "sound.mp3";
  const audio = new Audio(url);
  const audioRef = useRef(audio);
  const play = () => {
    audioRef.current.loop = true;
    audioRef.current.play();
  };
  const pause = () => {
    audioRef.current.loop = false;
    audioRef.current.pause();
  };
  return { play, pause };
};

export default function usePorodomo() {
  const { play, pause } = useAudio();

  const [timer, setTimer] = useState(1);
  const [timerB, setTimerB] = useState(1);
  const [session, setSession] = useState(TIMER_STATE.stop);
  const [count, setCount] = useState(1 * 60);
  const [snooze, setSnooze] = useState(TIMER_STATE.breakSession); // next session state

  const increment = (getter, setter) => {
    const cur = getter + 1;
    setter(cur);
    setCount(cur * 60);
  };
  const decrement = (getter, setter) => {
    const cur = getter === 0 ? 0 : getter - 1;
    setter(cur);
    setCount(cur * 60);
  };
  const lowerSessionDisable =
    session === TIMER_STATE.breakSession || session === TIMER_STATE.workSession;
  const minusDisable = (s) => s === 0;
  const toSnooze = () => {
    setSession(TIMER_STATE.snooze);
    play();
  };
  const isNextSessionWork = () => snooze === TIMER_STATE.workSession;
  const snoozeTo = () => {
    pause();
    if (snooze === TIMER_STATE.breakSession) {
      setSession(TIMER_STATE.workSession);
      return;
    }
    setSnooze(TIMER_STATE.breakSession);
  };

  const timerHandler = (timerRef) => {
    setCount(timerRef * 60);
    setSession(TIMER_STATE.snooze);
  };
  /////////////////////////////////////////////////////
  useEffect(() => {
    // pass if no toggle start
    if (!lowerSessionDisable) return;
    //counter down
    if (count < 0) {
      if (session === TIMER_STATE.stop) return;
      if (session === TIMER_STATE.breakSession) {
        timerHandler(timer);
        return;
      }
      if (session === TIMER_STATE.workSession) {
        toSnooze();
        timerHandler(timerB);
        return;
      }
    }
    const id = setInterval(() => {
      //decrement time
      setCount((prev) => prev - 1);
    }, 10);
    return () => clearInterval(id);
  }, [session, count]);

  return {
    count,
    setCount,
    session,
    setSession,
    lowerSessionDisable,
    increment,
    decrement,
    isNextSessionWork,
    timer,
    setTimer,
    timerB,
    setTimerB,
    minusDisable,
    snoozeTo,
  };
}
