const video = document.querySelector(".player__video");
const [playButton, ...skipButtons] =
  document.querySelectorAll(".player__button");
const rangeInputs = document.querySelectorAll('input[type="range"]');
const progressFilled = document.querySelector(".progress__filled");
const progress = document.querySelector(".progress");

let isMouseDown = false;

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  playButton.textContent = video.paused ? "||" : "►";
  video[method]();
}

function changeProgressFilledWidth(e) {
  const progressPercent = `${(video.currentTime / video.duration) * 100}%`;
  progressFilled.style.setProperty("flex-basis", progressPercent);
}

function changeRangeProperty() {
  video[this.name] = this.value;
}

function handleSkip() {
  video.currentTime += parseInt(this.dataset.skip);
  console.log(this);
}

function slideProgress(e) {
  if (!isMouseDown) return;
  const totalWidth = progress.offsetWidth;
  const progressPercent = e.offsetX / totalWidth;
  video.currentTime = video.duration * progressPercent;
}

video.addEventListener("click", togglePlay);
playButton.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", changeProgressFilledWidth);
rangeInputs.forEach((i) => i.addEventListener("input", changeRangeProperty));
skipButtons.forEach((i) => i.addEventListener("click", handleSkip));

progress.addEventListener("mousedown", () => {
  isMouseDown = true;
});
progress.addEventListener("mouseup", () => {
  isMouseDown = false;
});
progress.addEventListener("mousemove", slideProgress);
