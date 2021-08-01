import React from "react";
import "./App.css";
import PomodoroTwo from "./pomodoro/PomodoroTwo";

function App() {
  return (
    <div className="App">
      <header className="App-header container">
        <h1>Pomodoro Timer</h1>
      </header>
      <div className="container">
        <PomodoroTwo />
      </div>
    </div>
  );
}

export default App;
