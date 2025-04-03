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

function handleVideoPlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function handleVolume() {
  video.volume = this.value;
}

function handleSpeedRate() {
  video.playbackRate = this.value;
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

playButton.addEventListener("click", handleVideoPlay);
video.addEventListener("click", handleVideoPlay);
video.addEventListener("timeupdate", calculateProgress);

volumeInput.addEventListener("input", handleVolume);
speedRateInput.addEventListener("input", handleSpeedRate);

progress.addEventListener("mousedown", () => {
  isMouseDown = true;
});
progress.addEventListener("mouseup", () => {
  isMouseDown = false;
});
progress.addEventListener("mousemove", handleDragProgress);

rewinderButton.addEventListener("click", handleClickRewindOrForward);
forwardButton.addEventListener("click", handleClickRewindOrForward);
