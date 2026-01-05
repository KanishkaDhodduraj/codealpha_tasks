const songs = [
  { name: "song1.mp3", title: "Dream Flow", artist: "CodeAlpha Music" },
  { name: "song2.mp3", title: "Night Drive", artist: "CodeAlpha Beats" }
];

let songIndex = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const playBtn = document.getElementById("playBtn");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volumeSlider");

loadSong(songs[songIndex]);

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.name;  // Assumes songs in root; use "assets/" + song.name if in folder
  playBtn.textContent = "▶️";
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

progressContainer.addEventListener("click", (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const pos = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pos * audio.duration;
});

volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

// Auto-next on end
audio.addEventListener("ended", nextSong);

// Keyboard support (bonus)
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    togglePlay();
  } else if (e.code === "ArrowRight") {
    nextSong();
  } else if (e.code === "ArrowLeft") {
    prevSong();
  }
});