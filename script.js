
// List of songs
const songs = [
  { id: 1, title: "Apna Bana Le", artist: "Arjit Singh", file: "songs/1.mp3", cover: "images/song1.jpeg" },
  { id: 2, title: "Mehrama", artist: "Pritam", file: "songs/2.mp3", cover: "images/song2.jpeg" },
  { id: 3, title: "Jaan Nisaar", artist: "Arjit Singh", file: "songs/3.mp3", cover: "images/song3.jpeg" },
  { id: 4, title: "Tere Hawale", artist: "Pritam", file: "songs/4.mp3", cover: "images/song4.jpeg" },
  { id: 5, title: "Aise Kyu", artist: "Anurag Saikia", file: "songs/5.mp3", cover: "images/song5.jpeg" },
  { id: 6, title: "Isqh Hai", artist: "Anurag Saikia", file: "songs/6.mp3", cover: "images/song6.jpeg" },
  { id: 7, title: "Teri Ada", artist: "Mohit Chauhan", file: "songs/7.mp3", cover: "images/song7.jpeg" },
  { id: 8, title: "Rang Lageya", artist: "Mohit Chauhan", file: "songs/8.mp3", cover: "images/song8.jpeg" },
  { id: 9, title: "Kahaan Ho Tum", artist: "Prateek Kuhad", file: "songs/9.mp3", cover: "images/song9.jpg" },
  { id: 10, title: "Sahiba", artist: "Jasleen Royal", file: "songs/10.mp3", cover: "images/song10.jpeg" },
  { id: 11, title: "Lover", artist: "Taylor Swift", file: "songs/11.mp3", cover: "images/song11.jpeg" },
  { id: 12, title: "Shiddat", artist: "Manan Bhardwaj", file: "songs/12.mp3", cover: "images/song12.jpeg" },
  { id: 13, title: "Saudebazi", artist: "Javed Ali", file: "songs/13.mp3", cover: "images/song13.jpeg" },
  { id: 14, title: "Malang Sajna", artist: "Sachet Tandon", file: "songs/14.mp3", cover: "images/song14.jpeg" },
  { id: 15, title: "Teri Ore", artist: "Pritam", file: "songs/15.mp3", cover: "images/song15.jpeg" },
];

// Variables for current song and controls
let currentSong = new Audio();
const play = document.querySelector("#play");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

// Add event listeners to each song item
document.addEventListener("DOMContentLoaded", () => {
  const songItems = document.querySelectorAll(".menu_side li");
  songItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      playMusicByIndex(index); // Play music by song index
    });
  });
});

// Play selected music by index
const playMusicByIndex = (index, pause = false) => {
  const song = songs[index]; // Get song by index
  if (!song) {
    console.error("Song not found at index:", index);
    return;
  }

  currentSong.src = song.file;
  if (!pause) {
    currentSong.play();
    play.src = "images/pause.svg";
  } else {
    play.src = "images/play.svg";
  }
  document.querySelector(".song-cover").src = song.cover; 
  document.querySelector(".songinfo").innerHTML = `${song.title}<br>${song.artist}`;
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

// Play/Pause button functionality
play.addEventListener("click", () => {
  if (currentSong.paused) {
    currentSong.play();
    play.src = "images/pause.svg";
  } else {
    currentSong.pause();
    play.src = "images/play.svg";
  }
 });
// Format time helper function
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

// Update UI with song duration
currentSong.addEventListener("loadedmetadata", () => {
  const totalDuration = formatTime(currentSong.duration);
  document.querySelector(".songtime").innerHTML = `00:00 / ${totalDuration}`;
});

// Update seekbar and current time during playback
currentSong.addEventListener("timeupdate", () => {
  if (!currentSong.duration) return;

  const currentTime = formatTime(currentSong.currentTime);
  const totalDuration = formatTime(currentSong.duration);
  document.querySelector(".songtime").innerHTML = `${currentTime} / ${totalDuration}`;

  // Update seekbar progress
  const progress = (currentSong.currentTime / currentSong.duration) * 100;
  document.querySelector(".circle").style.left = `${progress}%`;
});

// Seekbar click to change current time
document.querySelector(".seekbar").addEventListener("click", (e) => {
  if (!currentSong.duration) return;

  const seekbarWidth = e.target.getBoundingClientRect().width;
  const clickPosition = e.offsetX;
  const seekTime = (clickPosition / seekbarWidth) * currentSong.duration;

  currentSong.currentTime = seekTime;


  // Update circle position
  document.querySelector(".circle").style.left = `${(seekTime / currentSong.duration) * 100}%`;
});


// Previous button functionality
previous.addEventListener("click", () => {
  let index = songs.findIndex((s) => currentSong.src.endsWith(s.file));
  if (index > 0) {
    playMusicByIndex(index - 1);
  }
});

// Next button functionality
next.addEventListener("click", () => {
  let index = songs.findIndex((s) => currentSong.src.endsWith(s.file));
  if (index < songs.length - 1) {
    playMusicByIndex(index + 1);
  }
});

