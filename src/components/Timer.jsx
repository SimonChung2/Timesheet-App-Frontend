import React, { useState, useEffect } from "react";

export default function Timer({ onActivityEnd }) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    let currentSeconds = seconds;
    let currentMinutes = minutes;

    if (timerRunning) {
      interval = setInterval(() => {
        if (currentSeconds < 59) {
          currentSeconds += 1;
        } else {
          currentSeconds = 0;
          if (currentMinutes < 59) {
            currentMinutes += 1;
          } else {
            currentMinutes = 0;
            setHours((prevHours) => prevHours + 1);
          }
        }
        setMinutes(currentMinutes);
        setSeconds(currentSeconds);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerRunning, seconds, minutes]);

  function startTimer() {
    setTimerRunning(true);
  }

  function stopTimer() {
    setTimerRunning(false);
  }

  function endActivity() {
    const totalTime = { hours, minutes, seconds };
    resetTimer();
    onActivityEnd(totalTime); // Call the callback to pass activity details
  }

  function resetTimer() {
    setTimerRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }

  return (
    <div className="timer-display">
      <h2>Timer</h2>
      <div className="timer">
        <span>{hours} : {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
      <div>
        <button onClick={startTimer}>Start Activity</button>
        <button onClick={stopTimer}>Pause Activity</button>
        <button onClick={endActivity}>End Activity</button>
      </div>
    </div>
  );
}
