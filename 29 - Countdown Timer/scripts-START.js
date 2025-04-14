const timerButtons = document.querySelectorAll(".timer__button");
const timeBar = document.querySelector(".display__time-left");
const endBar = document.querySelector(".display__end-time");
const minutesInput = document.querySelector("input[name=minutes]");
const customForm = document.querySelector("#custom");
let timer;

/*
  我這個寫法相較不準確
  應該像解答一樣使用 Date.now() 就是 new Date().getTime() 去拿到準確 timestamp
  再將秒數 *1000 + timestamp (timestamp 是以毫秒為單位)
  再用加上後的時間減去當初的時間來做倒數計時，這樣才是最準確的

  這邊要遵守 單一職責原則，才能更好且清晰的去調用 function
*/

/** 看完簡答後，再次重寫 */
// 1. render 負責 render (這邊 2 個 render, 倒數、最後時間)
// 2. 計算秒數，拿到秒數再丟參數給 render

function displayCountTimer(seconds = 0) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  const displayContext = `${minutes}:${
    secondsLeft > 9 ? "" : "0"
  }${secondsLeft}`;
  timeBar.textContent = displayContext;
}

function displayEndTime(timestamp = 0) {
  const endDate = new Date(timestamp);
  const hours = endDate.getHours();
  const minutes = endDate.getMinutes();
  const adjustHours = hours > 12 ? hours % 12 : hours;
  const displayContext = `Be Back At ${adjustHours}:${minutes}`;
  endBar.textContent = displayContext;
}

function timerCount(seconds = 0) {
  clearInterval(timer);

  // 1. 處理完 render
  const now = Date.now();
  const then = now + seconds * 1000;
  displayCountTimer(seconds);
  displayEndTime(then);

  // 2. 使用 setInterval 處理計時
  timer = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    console.log(secondsLeft);
    if (secondsLeft < 0) {
      clearInterval(timer);
      return;
    }

    displayCountTimer(secondsLeft);
  }, 1000);
}

function clickTimerButton() {
  const seconds = parseInt(this.dataset.time);
  timerCount(seconds);
}

function submitInput(e) {
  e.preventDefault();
  const seconds = minutesInput.value * 60;
  timerCount(seconds);
}

timerButtons.forEach((i) => i.addEventListener("click", clickTimerButton));
customForm.addEventListener("submit", submitInput);

/* 我的第一次答案
function clickButton() {
  const countSeconds = parseInt(this.dataset.time);
  timerCount(countSeconds);
}

function timerCount(countSeconds = 0) {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  clearTimeout(timer);

  // 我這邊直接用 timestamp 去做就好了
  let secondsLeft = hours * 3600 + minutes * 60 + seconds + countSeconds;

  let backHours = Math.floor(secondsLeft / 3600);
  backHours = backHours > 12 ? backHours % 12 : backHours;
  secondsLeft %= 3600;

  const backMinutes = Math.floor(secondsLeft / 60);
  secondsLeft %= 60;

  endBar.textContent = `Be Back At ${
    backHours > 9 ? backHours : `0${backHours}`
  }:${backMinutes > 9 ? backMinutes : `0${backMinutes}`}`;
  calculateTimer(countSeconds);
}

function calculateTimer(seconds = 0) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;

  timeBar.textContent = `${minutes > 9 ? minutes : `0${minutes}`}:${
    secondsLeft > 9 ? secondsLeft : `0${secondsLeft}`
  }`;

  timer = setTimeout(() => {
    seconds--;
    if (seconds >= 0) {
      calculateTimer(seconds);
    }
  }, 1000);
}

function submitInput(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const countMinutes = parseFloat(this.value);
    const countSeconds = countMinutes * 60;
    timerCount(countSeconds);
    this.value = "";
  }
}

timerButtons.forEach((button) => {
  button.addEventListener("click", clickButton);
});

minutesInput.addEventListener("keydown", submitInput);
*/
