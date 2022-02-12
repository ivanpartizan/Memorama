const playBtn = document.querySelector(".intro button");
const restartBtn = document.querySelector(".restartBtn");

const introScreen = document.querySelector(".intro");
const game = document.querySelector(".game");

const timer = document.querySelector(".timer span");
const moves = document.querySelector(".moves span");
let time,
  minutes = 0,
  seconds = 0;

function startGame() {
  runTimer();
}

function runTimer() {
  time = setInterval(() => {
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
    timer.innerHTML = `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  }, 1000);
}

function stopTimer() {
  timer.innerHTML = `00:00`;
  seconds = 0;
  minutes = 0;
  clearInterval(time);
}

playBtn.addEventListener("click", () => {
  introScreen.classList.remove("fadeIn");
  introScreen.classList.add("fadeOut");
  game.classList.add("fadeIn");
  startGame();
});

restartBtn.addEventListener("click", () => {
  game.classList.remove("fadeIn");
  introScreen.classList.add("fadeIn");
  stopTimer();
});
