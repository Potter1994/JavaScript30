const video = document.querySelector(".player__video");
const [playButton, rewinderButton, forwardButton] =
  document.querySelectorAll(".player__button");
const [volumeInput, speedRateInput] =
  document.querySelectorAll(".player__slider");
console.dir(video);
const progressBar = document.querySelector(".progress__filled");
const progress = document.querySelector(".progress");
const progressWidth = progress.clientWidth;
let isMouseDown = false;

video.volume = volumeInput.value;
const { duration } = video;

// function handleVideoPlay() {
//   if (video.paused) {
//     video.play();
//   } else {
//     video.pause();
//   }
// }

// 1. adjust namespace & use string to method call
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

// 2. lose pause icon
function updateIcon() {
  const currentIcon = video.paused ? "►" : "||";
  playButton.textContent = currentIcon;
}

// function handleVolume() {
//   video.volume = this.value;
// }

// function handleSpeedRate() {
//   video.playbackRate = this.value;
// }

// 3. use string to method call
function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleDragProgress(e) {
  if (!isMouseDown) return;
  const percent = e.offsetX / progressWidth;
  const dragTime = duration * percent;
  video.currentTime = dragTime;
}

function handleClickRewindOrForward() {
  const skip = this.dataset.skip;
  if (skip) {
    video.currentTime += parseInt(skip);
  }
}

function calculateProgress() {
  const { currentTime } = video;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.flexBasis = `${progressPercent}%`;
}

playButton.addEventListener("click", togglePlay);

video.addEventListener("pause", updateIcon);
video.addEventListener("play", updateIcon);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", calculateProgress);

volumeInput.addEventListener("input", handleRangeUpdate);
speedRateInput.addEventListener("input", handleRangeUpdate);

progress.addEventListener("mousedown", () => {
  isMouseDown = true;
});
progress.addEventListener("mouseup", () => {
  isMouseDown = false;
});
progress.addEventListener("mousemove", handleDragProgress);

rewinderButton.addEventListener("click", handleClickRewindOrForward);
forwardButton.addEventListener("click", handleClickRewindOrForward);
