import { convertTime, TIMER_LABEL } from "./libs";
import usePorodomo from "./hooks/usePorodomo";
import BoxLayout from "./components/BoxLayout";
import Toast from "./components/Toast";

const TIMER_STATE = {
  stop: "STOP",
  workSession: "SESSION",
  breakSession: "BREAK",
  snooze: "SNOOZE",
};

function App() {
  const {
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
  } = usePorodomo();
  return (
    <>
      {session === TIMER_STATE.snooze && <Toast onClick={() => snoozeTo()} />}
      <div className="bg-redwood flex flex-col items-center p-8 gap-8 ">
        <div className="w-full">
          <BoxLayout
            frameLabel={isNextSessionWork() ? "break" : "session"}
            clock={convertTime(count)}
            btnRounded={false}
            leftBtnProps={{
              disabled: false,
              onClick: () =>
                setSession(
                  lowerSessionDisable
                    ? TIMER_STATE.stop
                    : TIMER_STATE.workSession
                ),
              btnLabel: lowerSessionDisable ? "pause" : "start",
            }}
            rightBtnProps={{
              disabled: false,
              btnLabel: "reset",
              onClick: () => {
                setSession(TIMER_STATE.stop);
                setSnooze(TIMER_STATE.breakSession);
                setCount(timer * 60);
              },
            }}
          />
        </div>
        <div className="flex justify-around w-screen">
          <BoxLayout
            frameLabel="session"
            clock={timer}
            btnRounded={true}
            leftBtnProps={{
              disabled: minusDisable(timer) || lowerSessionDisable,
              onClick: () => decrement(TIMER_LABEL.workSession),
              btnLabel: "-",
            }}
            rightBtnProps={{
              disabled: lowerSessionDisable,
              onClick: () => increment(TIMER_LABEL.workSession),
              btnLabel: "+",
            }}
          />
          <BoxLayout
            frameLabel="break"
            clock={timerB}
            btnRounded={true}
            leftBtnProps={{
              disabled: minusDisable(timerB) || lowerSessionDisable,
              onClick: () => decrement(TIMER_LABEL.breakSession),
              btnLabel: "-",
            }}
            rightBtnProps={{
              disabled: lowerSessionDisable,
              onClick: () => increment(TIMER_LABEL.breakSession),
              btnLabel: "+",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
