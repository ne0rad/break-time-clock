import { StrictMode } from "react";
import ReactDOM from "react-dom";

import ClockApp from "./ClockApp.js";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ClockApp />
  </StrictMode>,
  rootElement
);
