const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
volumeRange.value = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  // playBtn.innerText = video.paused ? "Play" : "Pause";
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

// handlePlayClick 안에 각각 사용해서 글자를 바꿀수 있지만, 함수를 만들어서 video에 eventListener 로 해주자. 근데 그냥 위에 처럼 한줄에 써주는게 더 깰끔
// const handlePause = () => (playBtn.innerText = "Play");
// const handlePlay = () => (playBtn.innerText = "Pause");

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
    video.volume = volumeValue;
  } else {
    video.muted = true;
  }
  // muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeInput = (event) => {
  const {
    target: { value },
  } = event;

  if (video.muted) {
    video.muted = false;
    muteBtn.innerHTML = "Mute";
  }
  if (value === "0") {
    console.log("0000");
    video.muted = true;
    muteBtn.innerHTML = "Unmute";
  }

  video.volume = value;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  volumeValue = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(11, 19);

const handleLoadMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    // fullScreenBtn.innerText = "Enter Full Screen";
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    // fullScreenBtn.innerText = "Exit Full Screen";
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleSpace = (event) => {
  if (event.code === "Space") {
    handlePlayClick();
  }
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", handlePlayClick);
videoContainer.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
// video.addEventListener("pause", handlePause);
// video.addEventListener("play", handlePlay);
volumeRange.addEventListener("input", handleVolumeInput);
volumeRange.addEventListener("change", handleVolumeChange);
video.readyState
  ? handleLoadMetadata()
  : video.addEventListener("loadeddata", handleLoadMetadata);
video.addEventListener("timeupdate", handleTimeUpdate); // video의 타임이 변경될때마다 실행돼
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
document.addEventListener("keydown", handleSpace);
video.addEventListener("ended", handleEnded);
