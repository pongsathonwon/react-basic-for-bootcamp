import { useEffect, useRef, useState } from "react";
import { TIMER_LABEL, TIMER_STATE } from "../libs";

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

  const increment = (timerLabel) => {
    if (timerLabel === TIMER_LABEL.workSession) {
      const cur = timer + 1;
      setTimer(cur);
      setCount(cur * 60);
      return;
    }
    const curB = timerB + 1;
    setTimerB(curB);
  };
  const decrement = (timerLabel) => {
    if (timerLabel === TIMER_LABEL.workSession) {
      const cur = timer === 0 ? 0 : timer - 1;
      setTimer(cur);
      setCount(cur);
      return;
    }
    const curB = timerB === 0 ? 0 : timerB - 1;
    setTimerB(curB);
  };
  const lowerSessionDisable =
    session === TIMER_STATE.breakSession || session === TIMER_STATE.workSession;
  const minusDisable = (s) => s === 0;
  const toSnooze = () => {
    setSession(TIMER_STATE.snooze);
    play();
  };
  const isNextSessionWork = () => {
    console.log(snooze);
    return snooze === TIMER_STATE.workSession;
  };
  const snoozeTo = () => {
    pause();
    if (snooze === TIMER_STATE.breakSession) {
      setSession(TIMER_STATE.workSession);
      setSnooze(TIMER_STATE.workSession);
      return;
    } else if (snooze === TIMER_STATE.workSession) {
      setSession(TIMER_STATE.breakSession);
      setSnooze(TIMER_STATE.breakSession);
    }
    return;
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
    if (count <= 0) {
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
    }, 1000);
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
    timerB,
    minusDisable,
    snoozeTo,
    setSnooze,
  };
}
