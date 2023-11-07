document.addEventListener("DOMContentLoaded", function () {
    // Variables
    const breakLengthElement = document.getElementById("break-length");
    const sessionLengthElement = document.getElementById("session-length");
    const timerLabelElement = document.getElementById("timer-label");
    const timeLeftElement = document.getElementById("time-left");
    const startStopButton = document.getElementById("start_stop");
    const resetButton = document.getElementById("reset");
    const beep = document.getElementById("beep");
  
    let breakLength = parseInt(breakLengthElement.innerText);
    let sessionLength = parseInt(sessionLengthElement.innerText);
    let isSession = true;
    let isRunning = false;
    let countdown;
  
    // Event listeners for buttons
    document.getElementById("break-decrement").addEventListener("click", function () {
      if (!isRunning && breakLength > 1) {
        breakLength--;
        updateDisplay();
      }
    });
  
    document.getElementById("break-increment").addEventListener("click", function () {
      if (!isRunning && breakLength < 60) {
        breakLength++;
        updateDisplay();
      }
    });
  
    document.getElementById("session-decrement").addEventListener("click", function () {
      if (!isRunning && sessionLength > 1) {
        sessionLength--;
        updateDisplay();
      }
    });
  
    document.getElementById("session-increment").addEventListener("click", function () {
      if (!isRunning && sessionLength < 60) {
        sessionLength++;
        updateDisplay();
      }
    });
  
    startStopButton.addEventListener("click", function () {
      if (isRunning) {
        clearInterval(countdown);
        isRunning = false;
      } else {
        startCountdown();
        isRunning = true;
      }
    });
  
    resetButton.addEventListener("click", function () {
      clearInterval(countdown);
      resetClock();
      updateDisplay();
      beep.pause();
      beep.currentTime = 0;
    });
  
    // Functions
    function updateDisplay() {
      breakLengthElement.innerText = breakLength;
      sessionLengthElement.innerText = sessionLength;
  
      if (isSession) {
        timerLabelElement.innerText = "Session";
        timeLeftElement.innerText = formatTime(sessionLength * 60);
      } else {
        timerLabelElement.innerText = "Break";
        timeLeftElement.innerText = formatTime(breakLength * 60);
      }
    }
  
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
  
    function startCountdown() {
      countdown = setInterval(function () {
        if (sessionLength === 0 && breakLength === 0) {
          clearInterval(countdown);
          beep.play();
          resetClock();
          updateDisplay();
        } else if (isSession && sessionLength > 0) {
          sessionLength--;
          timeLeftElement.innerText = formatTime(sessionLength * 60);
        } else if (!isSession && breakLength > 0) {
          breakLength--;
          timeLeftElement.innerText = formatTime(breakLength * 60);
        } else {
          isSession = !isSession;
          beep.play();
        }
      }, 1000);
    }
  
    function resetClock() {
      sessionLength = 25;
      breakLength = 5;
      isSession = true;
      isRunning = false;
    }
  
    // Initial display update
    updateDisplay();
  });  