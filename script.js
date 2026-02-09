// ====== SETTINGS ======
const USERNAME_REQUIRED = "naima";
const AUDIO_FILE = "song.mp3"; // rename your audio to song.mp3 for best results

// Question prompts (simple, like the older Naima flow)
const questions = [
  { q: "Before we start… do you trust me a little? 😅", o: ["Yes", "Maybe", "No"] },
  { q: "Do you like surprises?", o: ["Yes", "Sometimes", "No"] },
  { q: "Do you believe in love that grows quietly?", o: ["Yes", "Maybe", "No"] },
];

const reacts = [
  "Noted 😌",
  "Okay okay… I hear you 💗",
  "That’s cute 😭",
  "You’re making me smile fr."
];

// GF ask NO messages (up to 4)
const noLines = [
  "Wait 😭… just hear me out for a second.",
  "I’m serious… you’ve been a bright part of my days.",
  "No pressure, but my intentions are pure.",
  "Last time… I’m asking with my whole heart."
];

const heartbreak = "If loving you silently is my only option… I’ll still choose you.";

const app = document.getElementById("app");
const bgm = document.getElementById("bgm");
const musicChip = document.getElementById("musicChip");
const musicState = document.getElementById("musicState");

let qIndex = 0;
let noCount = 0;

// ====== HELPERS ======
function render(html){
  app.classList.remove("fade");
  void app.offsetWidth;
  app.classList.add("fade");
  app.innerHTML = html;
}

function header(title, subtitle){
  return `
    <div class="brand">
      <div class="badge"><span>❤️</span></div>
      <div>
        <h1>${title}</h1>
        <div class="sub">${subtitle}</div>
      </div>
    </div>
  `;
}

function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

async function startMusic(){
  try{
    bgm.src = AUDIO_FILE;
    bgm.loop = true;
    bgm.volume = 0.9;
    bgm.load();
    await bgm.play();
    musicState.textContent = "Pause";
  }catch(e){
    musicState.textContent = "Play";
  }
}

function toggleMusic(){
  if (bgm.paused) startMusic();
  else { bgm.pause(); musicState.textContent = "Play"; }
}

musicChip.addEventListener("click", toggleMusic);

// ====== SCREENS ======
function screenLogin(){
  render(`
    ${header("Login", "Only one person can unlock this 😌")}
    <div class="divider"></div>

    <label>Username</label>
    <input id="u" placeholder="Username" autocomplete="off" />
    <span class="hint">Username hint: her name 😉</span>

    <label>Password</label>
    <input id="p" type="password" placeholder="Password" autocomplete="off" />
    <span class="hint">Password hint: our anniversary</span>

    <div class="actions">
      <button id="loginBtn">Login (starts music 🎶)</button>
    </div>

    <div class="reply" id="note" style="display:none;"></div>
  `);

  document.getElementById("loginBtn").addEventListener("click", async () => {
    const u = (document.getElementById("u").value || "").trim().toLowerCase();
    if (u !== USERNAME_REQUIRED){
      app.classList.remove("shake");
      void app.offsetWidth;
      app.classList.add("shake");
      const inp = document.getElementById("u");
      inp.value = "";
      inp.placeholder = "Try again…";
      return;
    }

    // Start music on the click (browser requirement)
    await startMusic();
    qIndex = 0;
    screenQuestion();
  });
}

function screenQuestion(){
  const item = questions[qIndex];

  render(`
    ${header("Quick questions", "Just tap what feels true 😌")}
    <div class="divider"></div>

    <div class="big">${item.q}</div>

    <div class="options">
      ${item.o.map(x => `<button class="option-btn">${x}</button>`).join("")}
    </div>

    <div class="reply" id="r" style="display:none;"></div>
  `);

  const r = document.getElementById("r");
  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      r.style.display = "block";
      r.textContent = pick(reacts);

      setTimeout(() => {
        qIndex++;
        if (qIndex < questions.length) screenQuestion();
        else screenAskGF();
      }, 600);
    });
  });
}

function screenAskGF(){
  noCount = 0;

  render(`
    ${header("Okay… real moment 😮‍💨", "I’ve been wanting to ask you this…")}
    <div class="divider"></div>

    <div class="big">Will you be my girlfriend? 💍❤️</div>

    <div class="actions">
      <button id="yesBtn">Yes</button>
      <button id="noBtn" class="btn-no">No</button>
    </div>

    <div class="reply" id="msg"></div>
  `);

  const msg = document.getElementById("msg");

  document.getElementById("yesBtn").addEventListener("click", () => {
    screenYesPoem();
  });

  document.getElementById("noBtn").addEventListener("click", () => {
    if (noCount < 4){
      msg.textContent = noLines[noCount];
      noCount++;
    } else {
      msg.textContent = heartbreak;
    }
  });
}

function screenYesPoem(){
  render(`
    ${header("You said yes… 😭❤️", "You just made my whole day.")}
    <div class="divider"></div>

    <div class="big">
      You turned my ordinary into something I look forward to.<br/>
      You made my heart feel… safe.<br/><br/>
      Thank you for choosing me.
    </div>

    <div class="actions">
      <button id="endBtn">Continue</button>
      <button id="playBtn" class="btn-no">Tap to play music</button>
    </div>

    <div class="small">If the music is silent, tap 🎶 bottom-right.</div>
  `);

  document.getElementById("endBtn").addEventListener("click", () => {
    render(`
      ${header("One last thing…", "You + Me 💗")}
      <div class="divider"></div>
      <div class="big">Now come here and let me spoil you properly 😌</div>
      <div class="small">Screenshot this and send it to me 😂❤️</div>
    `);
  });

  document.getElementById("playBtn").addEventListener("click", () => startMusic());
}

// Boot
screenLogin();
