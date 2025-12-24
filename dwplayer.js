const video = document.getElementById("dwplayer");

// Example: ?video=episode1.mp4
const params = new URLSearchParams(window.location.search);
const videoFile = params.get("video");

if (videoFile) {
  video.src = videoFile;
}

let lastTap = 0;
const DOUBLE_TAP_DELAY = 300;
const SEEK_TIME = 10; // seconds

video.addEventListener("click", (e) => {
  const now = Date.now();
  const tapGap = now - lastTap;

  const screenWidth = window.innerWidth;
  const tapX = e.clientX;

  if (tapGap < DOUBLE_TAP_DELAY && tapGap > 0) {
    // DOUBLE TAP
    if (tapX < screenWidth / 2) {
      video.currentTime = Math.max(0, video.currentTime - SEEK_TIME);
    } else {
      video.currentTime = Math.min(video.duration, video.currentTime + SEEK_TIME);
    }
  } else {
    // SINGLE TAP
    video.paused ? video.play() : video.pause();
  }

  lastTap = now;
});
