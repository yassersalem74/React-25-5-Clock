import "./main.css";
import React, { useState, useEffect } from 'react';

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft === 0) {
            if (timerLabel === 'Session') {
              setTimerLabel('Break');
              setTimeLeft(breakLength * 60);
            } else {
              setTimerLabel('Session');
              setTimeLeft(sessionLength * 60);
            }
          } else {
            return prevTimeLeft - 1;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, sessionLength, breakLength, timerLabel]);

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  const handleStartStop = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const handleReset = () => {
    setSessionLength(25);
    setBreakLength(5);
    setTimeLeft(25 * 60);
    setTimerLabel('Session');
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="App">
      <h1>Pomodoro Clock</h1>
      <div className="clock-container">
        <div className="timer" style={{ backgroundColor: timerLabel === 'Session' ? '#94d5ea' : '#FF5722', borderColor: timerLabel === 'Session' ? 'black' : '#E64A19' }}>
          <div id="timer-label">{timerLabel}</div>
          <div id="time-left">{formatTime(timeLeft)}</div>
        </div>
        <div className="controls">
          <div className="session-control">
            <div id="session-label">Session Length</div>
            <div className="length-control">
              <button onClick={() => setSessionLength(prevLength => Math.max(1, prevLength - 1))}>-</button>
              <span>{sessionLength}</span>
              <button onClick={() => setSessionLength(prevLength => Math.min(60, prevLength + 1))}>+</button>
            </div>
          </div>
          <div className="break-control">
            <div id="break-label">Break Length</div>
            <div className="length-control">
              <button onClick={() => setBreakLength(prevLength => Math.max(1, prevLength - 1))}>-</button>
              <span>{breakLength}</span>
              <button onClick={() => setBreakLength(prevLength => Math.min(60, prevLength + 1))}>+</button>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button id="start_stop" onClick={handleStartStop}>{isRunning ? 'Pause' : 'Start'}</button>
          <button id="reset" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
