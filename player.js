const track = {
  title: 'Numb',
  artist: 'LINKIN PARK',
  status: 'Прослушать отрывок',
  previewUrl:
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/0a/1d/980a1d91-d0c7-7ea3-74a2-e4c581527a6a/mzaf_7085551663222213756.plus.aac.p.m4a',
  storeUrl: 'https://music.apple.com/us/album/numb/591534774?i=591534921&uo=4',
  artworkUrl:
    'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/22/a4/8d/22a48d8d-0e71-44f7-5f88-84e0289550ba/093624949091.jpg/600x600bb.jpg'
};

const state = {
  isPlaying: false
};

const player = document.getElementById('player');
const audio = document.getElementById('audio');
const playToggle = document.getElementById('playToggle');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playlistBtn = document.getElementById('playlistBtn');
const trackStatus = document.getElementById('trackStatus');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');

function setSvgText(node, value) {
  node.textContent = value;
}

function setArtwork(url) {
  player.style.setProperty('--cover-image', `url("${url}")`);
}

function renderTrack() {
  setSvgText(trackStatus, track.status);
  setSvgText(trackTitle, track.title);
  setSvgText(trackArtist, track.artist);
  setArtwork(track.artworkUrl);
  audio.src = track.previewUrl;
  audio.load();
}

function setPlaying(nextValue) {
  state.isPlaying = nextValue;
  player.classList.toggle('is-playing', state.isPlaying);
  playToggle.setAttribute('aria-pressed', String(state.isPlaying));
}

function playOrPause() {
  if (state.isPlaying) {
    audio.pause();
    setPlaying(false);
    return;
  }

  const playPromise = audio.play();
  setPlaying(true);

  if (playPromise) {
    playPromise.catch(() => {
      setPlaying(false);
    });
  }
}

function restartTrack() {
  audio.currentTime = 0;

  if (state.isPlaying) {
    const playPromise = audio.play();
    if (playPromise) {
      playPromise.catch(() => {
        setPlaying(false);
      });
    }
  }
}

function openAppleMusic(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

playToggle.addEventListener('click', playOrPause);

prevBtn.addEventListener('click', restartTrack);

nextBtn.addEventListener('click', restartTrack);

playlistBtn.addEventListener('click', () => {
  openAppleMusic(track.storeUrl);
});

audio.addEventListener('ended', () => {
  setPlaying(false);
});

audio.addEventListener('pause', () => {
  if (audio.currentTime !== 0) {
    setPlaying(false);
  }
});

audio.addEventListener('play', () => {
  setPlaying(true);
});

renderTrack();
