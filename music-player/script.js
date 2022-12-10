const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const wave = document.getElementById('wave');
const track_art = document.querySelector('.img-container');
const volume_slider = document.querySelector('.volume_slider');
const repeat = document.querySelector('.repeat')
let randomIcon = document.querySelector('.fa-random');





// Music
const songs = [
  {
    name: 'Nwababy Jyte ft Ras-cornie',
    displayName: 'Nwababy',
    artist: 'Jyte ft Ras-cornie',
  },
  {
    name: 'Omo-refix Jyte',
    displayName: 'Omo-refix',
    artist: 'Jyte',
  },
  {
    name: 'T2G obudu-boi',
    displayName: 'T2G',
    artist: 'Obuduboi',
  },
  {
    name: 'Tension Obuduboi',
    displayName: 'Tension',
    artist: 'Obuduboi',
  },
  {
    name: 'Controlla Obuduboi',
    displayName: 'Controlla',
    artist: 'Obuduboi',
  },
];


function randomSong() {
  let songLength = songs.length

  for (let i = 0; i < songLength; i++) {

    Math.floor(Math.random() * songLength) + 1;
    playSong()
  }
}

function repeatTrack() {
  loadSong(songs[songIndex]);
  playSong();
}

function setVolume() {
  music.volume = volume_slider.value / 100;
}

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  track_art.classList.add('rotate');
  wave.classList.add('loader');
  music.play();
}


// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  track_art.classList.remove('rotate');
  wave.classList.remove('loader');
  music.pause();
}


// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;



// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
repeat.addEventListener('click', repeatTrack);
randomIcon.addEventListener('click', randomSong);

