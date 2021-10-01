import { TIMER_SET_INTERVAL } from "../ClockApp";

export default function SetTimer({ darkTheme, timer, timerControl, active }) {
  const minutes = Math.floor(timer / 60);
  const seconds = Math.floor(timer - minutes * 60);
  const isActive = active === 1 || active === 2;
  return (
    <div>
      <p
        id="session-label"
        className={darkTheme ? "label dark-label" : "label"}
      >
        Session Length:
      </p>
      <button
        id="session-decrement"
        className={
          darkTheme ? "button dark-button small" : "button light-button small"
        }
        onClick={timerControl}
        value="decrease"
        disabled={
          isActive
            ? "disabled"
            : active === -2
            ? "disabled"
            : timer / TIMER_SET_INTERVAL <= 1 && "disabled"
        }
      >
        -
      </button>
      <span
        className={
          darkTheme ? "label time-label dark-label" : "label time-label"
        }
      >
        <span id="session-length">{minutes}</span>:
        {seconds < 10 ? "0" + seconds : seconds}
      </span>
      <button
        id="session-increment"
        className={
          darkTheme ? "button dark-button small" : "button light-button small"
        }
        onClick={timerControl}
        value="increase"
        disabled={
          isActive
            ? "disabled"
            : active === -2
            ? "disabled"
            : timer / TIMER_SET_INTERVAL >= 60 && "disabled"
        }
      >
        +
      </button>
    </div>
  );
}
