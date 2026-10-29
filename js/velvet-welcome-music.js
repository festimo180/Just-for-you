(() => {
  if (window.__velvetWelcomeMusicLoaded) return;
  window.__velvetWelcomeMusicLoaded = true;

  const musicPath = 'audio/velvet-background.mp3';
  let audio = document.getElementById('vh-welcome-audio');

  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'vh-welcome-audio';
    audio.src = musicPath;
    audio.loop = true;
    audio.preload = 'auto';
    document.body.appendChild(audio);
  }

  const style = document.createElement('style');
  style.textContent = `
    #vh-welcome-overlay {
      position: fixed; inset: 0; z-index: 99999;
      display: flex; align-items: center; justify-content: center;
      padding: 22px; background: rgba(25, 12, 22, .48);
      backdrop-filter: blur(9px);
    }
    #vh-welcome-card {
      width: min(100%, 360px); box-sizing: border-box;
      padding: 30px 24px; text-align: center;
      color: #fff4df; border: 1px solid rgba(235,197,125,.75);
      border-radius: 24px;
      background: linear-gradient(145deg,rgba(93,42,66,.94),rgba(46,25,43,.96));
      box-shadow: 0 20px 65px rgba(0,0,0,.3);
      font-family: Georgia,serif;
    }
    #vh-welcome-card .vh-heart { font-size: 29px; color: #f0cc87; }
    #vh-welcome-card h2 { margin: 12px 0; font-size: 25px; font-weight: 500; }
    #vh-welcome-card p { line-height: 1.65; font-size: 15px; }
    #vh-welcome-card button {
      width: 100%; padding: 12px 15px; margin-top: 10px;
      border-radius: 30px; cursor: pointer; font-size: 14px;
    }
    #vh-music-yes {
      color: #422539; background: linear-gradient(120deg,#f8e5b6,#d5ad65);
      border: 0; font-weight: bold;
    }
    #vh-music-no {
      color: #fff4df; background: transparent;
      border: 1px solid rgba(248,229,182,.65);
    }
    #vh-music-toggle {
      position: fixed; right: 14px; bottom: 14px; z-index: 9998;
      border: 1px solid #d9b875; border-radius: 24px;
      background: rgba(61,32,51,.88); color: #ffedc9;
      padding: 10px 15px; font-size: 13px; cursor: pointer;
      box-shadow: 0 4px 20px rgba(0,0,0,.15);
    }
    video[controls], iframe[src*="youtube.com/embed"],
    iframe[src*="youtube-nocookie.com/embed"] {
      display: none !important;
    }
  `;
  document.head.appendChild(style);

  function addMusicToggle() {
    let toggle = document.getElementById('vh-music-toggle');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.id = 'vh-music-toggle';
      toggle.type = 'button';
      document.body.appendChild(toggle);
    }
    const refresh = () => {
      toggle.textContent = audio.paused ? '♫ Music: Off' : '♫ Music: On';
    };
    toggle.onclick = async () => {
      if (audio.paused) {
        try {
          await audio.play();
          sessionStorage.setItem('vh-music-choice', 'yes');
        } catch (_) {
          alert('Tap Music: On again to allow playback, or check that the music file exists.');
        }
      } else {
        audio.pause();
        sessionStorage.setItem('vh-music-choice', 'no');
      }
      refresh();
    };
    audio.addEventListener('play', refresh);
    audio.addEventListener('pause', refresh);
    refresh();
  }

  function showWelcome() {
    if (sessionStorage.getItem('vh-music-choice')) {
      addMusicToggle();
      if (sessionStorage.getItem('vh-music-choice') === 'yes') {
        audio.play().catch(() => {});
      }
      return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'vh-welcome-overlay';
    overlay.innerHTML = `
      <div id="vh-welcome-card" role="dialog" aria-modal="true"
           aria-labelledby="vh-welcome-title">
        <div class="vh-heart">♡</div>
        <h2 id="vh-welcome-title">A Little Moment for You</h2>
        <p>Welcome to Velvet Hearts. Would you like some music with this moment?</p>
        <button id="vh-music-yes" type="button">♫ Yes, play music</button>
        <button id="vh-music-no" type="button">No, thank you</button>
      </div>`;
    document.body.appendChild(overlay);

    overlay.querySelector('#vh-music-yes').onclick = async () => {
      sessionStorage.setItem('vh-music-choice', 'yes');
      try {
        await audio.play();
      } catch (_) {
        alert('Music could not start. Check that audio/velvet-background.mp3 exists.');
      }
      overlay.remove();
      addMusicToggle();
    };

    overlay.querySelector('#vh-music-no').onclick = () => {
      sessionStorage.setItem('vh-music-choice', 'no');
      audio.pause();
      overlay.remove();
      addMusicToggle();
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showWelcome, { once: true });
  } else {
    showWelcome();
  }
})();
