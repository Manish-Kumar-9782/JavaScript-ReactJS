import "./App.css";

import Clock from "./Components/Clock";
import { useState } from "react";

function tick(setState) {
  setState(new Date().toLocaleTimeString());
}

function App() {
  let [cTime, changeTime] = useState(new Date().toLocaleTimeString());
  // Now here cTime is the variable in which our time is stored.
  // changeTime is the function which will be used to change the cTime.

  setInterval(() => tick(changeTime), 1000);

  return (
    <div>
      <Clock time={cTime} />

      <button
        style={{
          backgroundColor: "dodgerblue",
          color: "white",
          height: "40px",
          width: "fit-content",
          padding: "3px 10px",
        }}
        onClick={() => {
          changeTime(new Date().toLocaleTimeString());
          console.log("Time Changed", cTime);
        }}
      >
        Change Time
      </button>
    </div>
  );
}

export default App;
