import React, { useState, useEffect } from "react"

export default function Timer(){

    const [ seconds, setSeconds ] = useState(0);
    const [ minutes, setMinutes ] = useState(0);
    const [ hours, setHours ] = useState(0);
    const [ timerRunning, setTimerRunning ] = useState(false);

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

    function resetTimer(){
        setTimerRunning(false);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
    }

    let secondsFirstDigit;
    if(seconds>9){
        secondsFirstDigit="";
    } else{
        secondsFirstDigit=0;
    }

    let minutesFirstDigit
    if(minutes>9){
        minutesFirstDigit="";
    } else{
        minutesFirstDigit=0;
    }

    return (
        <>
            <h2>Timer</h2>
            <div><span>{hours} : {minutesFirstDigit}{minutes} : {secondsFirstDigit}{seconds}</span></div>
            <button onClick={startTimer}>Start Timer</button>
            <button onClick={stopTimer}>Stop Timer</button>
            <button onClick={resetTimer}>Reset</button>
        </>
    );
}