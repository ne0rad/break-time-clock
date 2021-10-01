export default function Controls({ darkTheme, controls, active }) {
  return (
    <div>
      <button
        id="start_stop"
        className={darkTheme ? "button dark-button" : "button light-button"}
        onClick={controls}
        value={active > 0 ? "pause" : "start"}
        disabled={active === -2 && "disabled"}
      >
        {active > 0
          ? "PAUSE"
          : active === -1
          ? "RESUME"
          : active === -2
          ? "PAUSE"
          : "START"}
      </button>
      <button
        id="reset"
        className={darkTheme ? "button dark-button" : "button light-button"}
        onClick={controls}
        value="reset"
        disabled={active === 0 && "disabled"}
      >
        STOP
      </button>
    </div>
  );
}
