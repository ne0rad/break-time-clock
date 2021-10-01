export default function Session({ darkTheme, session, active }) {
  const minutes = Math.floor(session / 60);
  const seconds = Math.floor(session - minutes * 60);
  return (
    <div className={darkTheme ? "display display-dark" : "display"}>
      <span
        id="time-left"
        className={darkTheme ? "session-timer dark-label" : "session-timer"}
      >
        {minutes}:{seconds < 10 ? "0" + seconds : seconds}
      </span>
      <br />
      <span
        id="timer-label"
        className={
          darkTheme ? "label dark-label time-label" : "label time-label"
        }
      >
        {active === 0
          ? "Stopped"
          : active === 1
          ? "Session"
          : active === 2
          ? "Break"
          : active === -1
          ? "Paused"
          : "Alert"}
      </span>
    </div>
  );
}
