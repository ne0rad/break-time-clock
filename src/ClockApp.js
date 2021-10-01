import { useState } from "react";
import { useSound } from "use-sound";
import Session from "./components/session";
import Controls from "./components/controls";
import SetBreak from "./components/setBreak";
import SetTimer from "./components/setTimer";
import alertSound from "./audio/beep.wav";
import "./styles/styles.css";

export const TIMER_SET_INTERVAL = 60;

export default function Clock() {
  const [session, setSession] = useState(10 * 60);
  const [timer, setTimer] = useState(10 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [active, setActive] = useState(0);
  const [breakActive, setBreakActive] = useState(false);
  const [intervalId, setIntervalId] = useState();
  const [timeoutId, setTimeoutId] = useState();
  const [darkTheme, setDarkTheme] = useState(false);

  const [play, { stop }] = useSound(alertSound);

  function theme() {
    if (darkTheme) {
      document.body.style = "background: white;";
      setDarkTheme(false);
    } else {
      document.body.style = "background: black;";
      setDarkTheme(true);
    }
  }

  function sessionControl(onBreak, repeat) {
    let num;
    if (onBreak && repeat) {
      num = breakTime;
      setSession(breakTime);
    } else if (!onBreak && repeat) {
      num = timer;
      setSession(timer);
    } else {
      num = session;
      onBreak = breakActive;
    }
    let intId = setInterval(() => {
      num--;
      setSession(num);
      if (num < 1) {
        const ALERT_LENGTH = 4500;
        clearInterval(intId);
        setActive(-2);
        setSession(0);
        playAlert();
        if (!onBreak) {
          setBreakActive(true);
          let timId = setTimeout(() => {
            sessionControl(true, true);
            setActive(2);
          }, ALERT_LENGTH);
          setTimeoutId(timId);
        } else {
          setBreakActive(false);
          let timId = setTimeout(() => {
            sessionControl(false, true);
            setActive(1);
          }, ALERT_LENGTH);
          setTimeoutId(timId);
        }
      }
    }, 1000);
    setIntervalId(intId);
  }

  function controls(e) {
    switch (e.target.value) {
      case "start":
        if (breakActive) setActive(2);
        else setActive(1);
        sessionControl();
        break;
      case "pause":
        if (active !== -2) {
          setActive(-1);
          clearInterval(intervalId);
        }
        break;
      case "reset":
        setActive(0);
        setBreakActive(false);
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        // let sound = document.getElementById("beep");
        // sound.pause();
        // sound.currentTime = 0;
        stop();
        setSession(timer);
        break;
      default:
        return;
    }
  }

  function playAlert() {
    // let sound = document.getElementById("beep");
    // sound.play();
    play();
  }

  function timerControl(e) {
    if (active === 0 || active === -1) {
      switch (e.target.value) {
        case "increase":
          if (timer / TIMER_SET_INTERVAL < 60) {
            setTimer(timer + TIMER_SET_INTERVAL);
            if (active === 0) setSession(timer + TIMER_SET_INTERVAL);
          }
          break;
        case "decrease":
          if (timer / TIMER_SET_INTERVAL > 1) {
            setTimer(timer - TIMER_SET_INTERVAL);
            if (active === 0) setSession(timer - TIMER_SET_INTERVAL);
          }
          break;
        default:
          return;
      }
    }
  }

  function breakControl(e) {
    if (active === 0 || active === -1) {
      switch (e.target.value) {
        case "increase":
          if (breakTime / TIMER_SET_INTERVAL < 60)
            setBreakTime(breakTime + TIMER_SET_INTERVAL);
          break;
        case "decrease":
          if (breakTime / TIMER_SET_INTERVAL > 1)
            setBreakTime(breakTime - TIMER_SET_INTERVAL);
          break;
        default:
          return;
      }
    }
  }
  return (
    <div className={darkTheme ? "Clock dark-bg" : "Clock"}>
      <Session darkTheme={darkTheme} session={session} active={active} />
      <br />
      <div className={darkTheme ? "controls controls-dark" : "controls"}>
        <SetBreak
          darkTheme={darkTheme}
          breakTime={breakTime}
          breakControl={breakControl}
          active={active}
        />
        <br />
        <SetTimer
          darkTheme={darkTheme}
          timer={timer}
          timerControl={timerControl}
          active={active}
        />
        <br />
        <Controls darkTheme={darkTheme} controls={controls} active={active} />
        <br />
        <button
          className={
            darkTheme ? "button dark-button small" : "button light-button small"
          }
          onClick={theme}
        >
          {darkTheme ? "Light" : "Dark"}
        </button>
        {
          // <audio id="beep" preload="auto" src={alertSound} />}
        }
      </div>
    </div>
  );
}
