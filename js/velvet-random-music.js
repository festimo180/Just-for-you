(() => {
  'use strict';
  if (window.__velvetElegantMusic) return;
  window.__velvetElegantMusic = true;

  const tracks = [
    { title: 'Ordinary', artist: 'Alex Warren', file: 'audio/velvet-background.mp3' },
    { title: 'Someone You Loved', artist: 'Lewis Capaldi', file: 'audio/someone-you-loved.mp3' },
    { title: 'Dandelions', artist: 'Ruth B.', file: 'audio/dandelions.mp3' }
  ];

  const style = document.createElement('style');
  style.textContent = `
    #vrm-widget {
      --gold:#e4c58a; --cream:#fff8ec;
      position:fixed;right:15px;bottom:18px;z-index:999999;
      width:min(330px,calc(100vw - 30px));
      color:var(--cream);font-family:"DM Sans",system-ui,sans-serif;
      font-size:13px;line-height:1.45;
    }
    #vrm-widget * {box-sizing:border-box}
    #vrm-widget button,#vrm-widget select,#vrm-widget input {font:inherit}
    #vrm-widget button {cursor:pointer;touch-action:manipulation}
    #vrm-widget button:focus-visible,#vrm-widget select:focus-visible,
    #vrm-widget input:focus-visible {outline:2px solid var(--gold);outline-offset:3px}
    #vrm-toggle {
      display:flex;align-items:center;justify-content:center;gap:9px;
      margin-left:auto;min-height:45px;padding:0 18px;
      color:#fff8ec;background:linear-gradient(135deg,#76532b,#bd9654);
      border:1px solid #f0d7a1;border-radius:28px;
      box-shadow:0 8px 28px #10070d55, inset 0 1px #ffffff55;
      letter-spacing:.3px;transition:transform .2s,filter .2s;
    }
    #vrm-toggle:hover {transform:translateY(-2px);filter:brightness(1.08)}
    #vrm-toggle .vrm-dot {
      width:7px;height:7px;border-radius:50%;background:#fff0c6;
      box-shadow:0 0 10px #ffe4a0;
    }
    #vrm-toggle.is-playing .vrm-dot {animation:vrm-pulse 1.5s infinite}
    #vrm-panel {
      display:none;margin-bottom:10px;padding:18px;
      border:1px solid #dfc18a99;border-radius:22px;
      background:linear-gradient(145deg,#4b2536ee,#24131fee 75%);
      box-shadow:0 18px 55px #08040a80,inset 0 1px #ffffff17;
      backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);
      animation:vrm-in .24s ease-out;
    }
    #vrm-panel.open {display:block}
    .vrm-top {display:flex;align-items:center;justify-content:space-between;gap:10px}
    .vrm-kicker {font-size:9px;letter-spacing:2.2px;text-transform:uppercase;color:var(--gold)}
    #vrm-collapse {
      border:1px solid #ffffff28;border-radius:50%;width:31px;height:31px;
      color:#f8e7c9;background:#ffffff0a;font-size:17px;
    }
    .vrm-art-row {display:flex;align-items:center;gap:13px;margin:17px 0 15px}
    .vrm-art {
      width:72px;height:72px;flex:0 0 72px;border-radius:16px;
      display:grid;place-items:center;font-size:30px;
      color:#f6dba6;border:1px solid #e5c98b88;
      background:radial-gradient(circle at 30% 25%,#9c6a66,#4e293b 58%,#21131f);
      box-shadow:inset 0 1px #ffffff35,0 7px 20px #0003;
    }
    #vrm-title {font-family:"Cormorant Garamond",Georgia,serif;font-size:25px;
      line-height:1.05;font-weight:600;color:#fff6e7}
    #vrm-artist {margin-top:6px;color:#e5d2d4;font-size:12px}
    .vrm-wave {display:flex;align-items:center;justify-content:center;gap:4px;
      height:22px;margin:2px 0 10px;opacity:.8}
    .vrm-wave i {display:block;width:3px;height:5px;border-radius:4px;background:var(--gold)}
    #vrm-widget.is-playing .vrm-wave i {animation:vrm-wave .75s ease-in-out infinite alternate}
    #vrm-widget.is-playing .vrm-wave i:nth-child(3n) {animation-delay:-.4s}
    #vrm-widget.is-playing .vrm-wave i:nth-child(2n) {animation-delay:-.2s}
    .vrm-progress {display:flex;align-items:center;gap:10px}
    #vrm-seek {flex:1;min-width:0}
    #vrm-times {display:flex;justify-content:space-between;color:#d9c7c9;
      font-size:10px;margin-top:5px;font-variant-numeric:tabular-nums}
    #vrm-widget input[type=range] {
      display:block;width:100%;height:4px;margin:0;accent-color:var(--gold);
      cursor:pointer;
    }
    #vrm-controls {display:flex;align-items:center;justify-content:center;gap:20px;margin:18px 0}
    #vrm-controls button {
      display:grid;place-items:center;border:0;background:transparent;
      color:#f7e7cf;font-size:20px;min-width:35px;min-height:40px;
    }
    #vrm-controls #vrm-play {
      width:52px;height:52px;border-radius:50%;font-size:20px;color:#392334;
      background:linear-gradient(145deg,#f5dfad,#c99b53);
      box-shadow:0 5px 20px #0003,inset 0 1px #fff8;
    }
    #vrm-controls button:hover {filter:brightness(1.2)}
    #vrm-select {
      width:100%;padding:11px 12px;border-radius:12px;
      color:#fff4e4;background:#ffffff0b;border:1px solid #e0c18a55;
      outline:none;
    }
    #vrm-select option {background:#38202f;color:#fff}
    .vrm-volume {display:flex;align-items:center;gap:10px;margin-top:15px;color:#e9d6d5}
    .vrm-volume span {font-size:16px}
    #vrm-volume {flex:1}
    #vrm-status {min-height:16px;margin-top:13px;text-align:center;
      color:#dfc99e;font-size:11px}
    @keyframes vrm-in {from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes vrm-pulse {50%{box-shadow:0 0 0 5px #ffe4a022,0 0 12px #ffe4a0}}
    @keyframes vrm-wave {to{height:19px}}
    @media(max-width:480px) {
      #vrm-widget {right:10px;bottom:12px;width:min(310px,calc(100vw - 20px))}
      #vrm-panel {padding:15px}
      .vrm-art {width:62px;height:62px;flex-basis:62px}
      #vrm-title {font-size:23px}
    }
    @media(prefers-reduced-motion:reduce) {
      #vrm-widget *,#vrm-widget *::before {animation:none!important;transition:none!important}
    }
  `;
  document.head.appendChild(style);

  const widget = document.createElement('div');
  widget.id = 'vrm-widget';
  widget.innerHTML = `
    <section id="vrm-panel" aria-label="Velvet Hearts music player">
      <div class="vrm-top">
        <div class="vrm-kicker">♡ The Velvet soundtrack</div>
        <button id="vrm-collapse" type="button" aria-label="Collapse music player">⌄</button>
      </div>
      <div class="vrm-art-row">
        <div class="vrm-art" aria-hidden="true">♡</div>
        <div><div id="vrm-title">Velvet Hearts</div>
          <div id="vrm-artist">A little music for the heart</div></div>
      </div>
      <div class="vrm-wave" aria-hidden="true">
        ${Array.from({length:19},()=>'<i></i>').join('')}
      </div>
      <div class="vrm-progress">
        <input id="vrm-seek" type="range" min="0" max="100" value="0" aria-label="Song progress">
      </div>
      <div id="vrm-times"><span id="vrm-now">0:00</span><span id="vrm-end">0:00</span></div>
      <div id="vrm-controls">
        <button id="vrm-prev" type="button" aria-label="Previous song">⏮</button>
        <button id="vrm-play" type="button" aria-label="Play music">▶</button>
        <button id="vrm-next" type="button" aria-label="Next song">⏭</button>
      </div>
      <select id="vrm-select" aria-label="Choose a song"></select>
      <div class="vrm-volume"><span aria-hidden="true">♫</span>
        <input id="vrm-volume" type="range" min="0" max="1" step="0.05" value="0.7" aria-label="Music volume">
        <span id="vrm-volume-label">70%</span>
      </div>
      <div id="vrm-status" role="status" aria-live="polite">Choose a song and press play ♡</div>
    </section>
    <button id="vrm-toggle" type="button" aria-expanded="false">
      <span class="vrm-dot"></span><span id="vrm-toggle-label">♫ Music</span>
    </button>
    <audio id="vrm-audio" preload="metadata" playsinline></audio>
  `;
  document.body.appendChild(widget);

  const $ = id => document.getElementById(id);
  const audio = $('vrm-audio');
  const panel = $('vrm-panel');
  const toggle = $('vrm-toggle');
  const playBtn = $('vrm-play');
  const select = $('vrm-select');
  const status = $('vrm-status');
  let current = 0;
  let playing = false;
  let busy = false;

  audio.volume = 0.7;
  const say = message => { status.textContent = message; };
  const fmt = value => Number.isFinite(value) && value >= 0
    ? `${Math.floor(value/60)}:${String(Math.floor(value%60)).padStart(2,'0')}`
    : '0:00';

  tracks.forEach((track, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = `${track.title} — ${track.artist}`;
    select.appendChild(option);
  });

  function updateTrack() {
    const track = tracks[current];
    $('vrm-title').textContent = track.title;
    $('vrm-artist').textContent = track.artist;
    select.value = String(current);
    $('vrm-now').textContent = '0:00';
    $('vrm-end').textContent = '0:00';
    $('vrm-seek').value = '0';
  }

  function updatePlaying(isPlaying) {
    playing = isPlaying;
    widget.classList.toggle('is-playing', isPlaying);
    toggle.classList.toggle('is-playing', isPlaying);
    playBtn.textContent = isPlaying ? 'Ⅱ' : '▶';
    playBtn.setAttribute('aria-label', isPlaying ? 'Pause music' : 'Play music');
    $('vrm-toggle-label').textContent = isPlaying ? '♫ Playing' : '♫ Music';
  }

  async function playCurrent() {
    if (busy) return;
    busy = true;
    try {
      const track = tracks[current];
      if (audio.getAttribute('src') !== track.file) {
        audio.src = track.file;
        audio.load();
      }
      await audio.play();
      updatePlaying(true);
      say('Now playing, just for this moment ♡');
    } catch (_) {
      updatePlaying(false);
      say('Could not play this file. Check that the MP3 exists in audio/.');
    } finally {
      busy = false;
    }
  }

  async function chooseTrack(index, autoplay = false) {
    current = (index + tracks.length) % tracks.length;
    updateTrack();
    audio.pause();
    audio.src = tracks[current].file;
    audio.load();
    updatePlaying(false);
    if (autoplay) await playCurrent();
    else say('Ready when you are ♡');
  }

  function openPanel() {
    panel.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closePanel() {
    panel.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', async () => {
    if (panel.classList.contains('open')) {
      closePanel();
    } else {
      openPanel();
      if (!audio.src) await chooseTrack(current, false);
    }
  });

  $('vrm-collapse').addEventListener('click', closePanel);
  playBtn.addEventListener('click', async () => {
    if (audio.paused) await playCurrent();
    else {
      audio.pause();
      updatePlaying(false);
      say('Paused. Your music will be here when you return ♡');
    }
  });
  $('vrm-next').addEventListener('click', () => chooseTrack(current + 1, true));
  $('vrm-prev').addEventListener('click', () => chooseTrack(current - 1, true));
  select.addEventListener('change', () => chooseTrack(Number(select.value), true));

  $('vrm-seek').addEventListener('input', () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = Number($('vrm-seek').value) / 100 * audio.duration;
    }
  });

  $('vrm-volume').addEventListener('input', () => {
    audio.volume = Number($('vrm-volume').value);
    $('vrm-volume-label').textContent = `${Math.round(audio.volume * 100)}%`;
  });

  audio.addEventListener('loadedmetadata', () => {
    $('vrm-end').textContent = fmt(audio.duration);
  });
  audio.addEventListener('timeupdate', () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      $('vrm-seek').value = String(audio.currentTime / audio.duration * 100);
      $('vrm-now').textContent = fmt(audio.currentTime);
    }
  });
  audio.addEventListener('play', () => updatePlaying(true));
  audio.addEventListener('pause', () => updatePlaying(false));
  audio.addEventListener('ended', () => chooseTrack(current + 1, true));
  audio.addEventListener('error', () => {
    updatePlaying(false);
    say('This song could not load. Check the audio file path.');
  });

  updateTrack();
})();
