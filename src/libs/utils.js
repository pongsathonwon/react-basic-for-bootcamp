export const convertTime = (time) => {
  const min = Math.floor(time / 60);
  const sec = time - min * 60;
  if (sec < 10) {
    return `${min}:0${sec}`;
  }
  return `${min}:${sec}`;
};

export const TIMER_STATE = {
  stop: "STOP",
  workSession: "SESSION",
  breakSession: "BREAK",
  snooze: "SNOOZE",
};

export const TIMER_LABEL = {
  workSession: "SESSION",
  breakSession: "BREAK",
};
