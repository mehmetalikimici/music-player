const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");

const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const playlistButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

//Sıra
let index;

//Loop

let loop = true;

//json sarki liste yapısı
const songsList = [
  {
    name: "Long Silent",
    link: "assets/Mounika-Long-Silent.mp3",
    artist: "Mounika",
    image: "assets/long-silent.jpg",
  },
  {
    name: "Can't Help Myself",
    link: "assets/Cant-Help-Myself.mp3",
    artist: "Alexandra Savior",
    image: "assets/cant-help-myself.jpg",
  },
  {
    name: "Mockingbird",
    link: "assets/Eminem-Mockingbird .mp3",
    artist: "Eminem",
    image: "assets/eminem-mockingbird.jpg",
  },
  {
    name: "Diamond Heart",
    link: "assets/Alan-Walker-Diamond-Heart.mp3",
    artist: "Alan Walker",
    image: "assets/alan-walker.jpg",
  },
  {
    name: "Bohemian Rhapsody",
    link: "assets/Queen-Bohemian-Rhapsody.mp3",
    artist: "Queen",
    image: "assets/bohemian-rhapsody.jpg",
  },
];

//time formatter
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

const setSong = (arrayIndex) => {
  //console.log(arrayIndex);
  let { name, link, artist, image } = songsList[arrayIndex];
  //   console.log(name);
  //   console.log(link);
  //   console.log(artist);
  //   console.log(image);

  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
  playListContainer.classList.add("hide");
  playAudio();
};

const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

const nextSong = () => {
  if (loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    setSong(index);
    playAudio();
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length);
    console.log(randIndex);
    setSong(randIndex);
  }
};

const previousSong = () => {
  if (index > 0) {
    pauseAudio();
    index -= 1;
  } else {
    index = songsList.length - 1;
  }
  setSong(index);
  playAudio();
};

audio.onended = () => {
  nextSong();
};

progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;

  let coordEnd = event.clientX;
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  currentProgress.style.width = progress * 100 + "%";

  audio.currentTime = progress * audio.duration;

  // console.log(coordStart)
  // console.log(coordEnd)
  // console.log(progress)
  // console.log(audio.currentTime)

  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});

playButton.addEventListener("click", playAudio);
pauseButton.addEventListener("click", pauseAudio);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", previousSong);

shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = true;
    console.log("Karıştırma kapalı");
  } else {
    shuffleButton.classList.add("active");
    loop = false;
    console.log("Karıştırma açık");
  }
});

repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    loop = false;
    console.log("tekrar kapalı");
  } else {
    repeatButton.classList.add("active");
    loop = true;
    console.log("tekrar açık");
  }
});

playlistButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

const initializePlayList = () => {
  for (const i in songsList) {
    playListSongs.innerHTML += `<li class="playlistSong"
    onclick="setSong(${i})">
    <div class="playlist-image-container">
    <img src="${songsList[i].image}"/>
    </div>
    <div class="playlist-song-details">
      <span id="playlist-song-name">
      ${songsList[i].name}
      </span>
      <span id="playlist-song-artist-album">
      ${songsList[i].artist}
     </span>
    </div>
    </li>`;
  }
};

setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initializePlayList();
};
