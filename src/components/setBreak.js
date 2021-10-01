import { TIMER_SET_INTERVAL } from "../ClockApp";

export default function SetBreak({
  darkTheme,
  breakTime,
  breakControl,
  active
}) {
  const minutes = Math.floor(breakTime / 60);
  const seconds = Math.floor(breakTime - minutes * 60);
  const isActive = active === 1 || active === 2;
  return (
    <div>
      <p id="break-label" className={darkTheme ? "label dark-label" : "label"}>
        Break Length:
      </p>
      <button
        id="break-decrement"
        className={
          darkTheme ? "button dark-button small" : "button light-button small"
        }
        onClick={breakControl}
        value="decrease"
        disabled={
          isActive
            ? "disabled"
            : active === -2
            ? "disabled"
            : breakTime / TIMER_SET_INTERVAL <= 1 && "disabled"
        }
      >
        -
      </button>
      <span
        className={
          darkTheme ? "label time-label dark-label" : "label time-label"
        }
      >
        <span id="break-length">{minutes}</span>:
        {seconds < 10 ? "0" + seconds : seconds}
      </span>
      <button
        id="break-increment"
        className={
          darkTheme ? "button dark-button small" : "button light-button small"
        }
        onClick={breakControl}
        value="increase"
        disabled={
          isActive
            ? "disabled"
            : active === -2
            ? "disabled"
            : breakTime / TIMER_SET_INTERVAL >= 60 && "disabled"
        }
      >
        +
      </button>
    </div>
  );
}
