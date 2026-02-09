// =========================
// CONFIG
// =========================
const AUDIO_SRC = "song.mp3"; // Put your song as song.mp3 in the same folder
const USERNAME_REQUIRED = "tashia";

// Questions before GF ask
const preGFQuestions = [
  "Quick one… do you believe people meet for a reason?",
  "Do you think vibes can speak louder than words?",
  "Do you like surprises… even the small ones?",
  "Have you ever met someone who made ordinary days feel lighter?",
  "If a person consistently makes you smile… does that mean something?",
  "Okay… one more 😅 Do you think love should be chosen on purpose?"
];

// Questions after GF yes (lead to Valentine)
const postGFQuestions = [
  "Be honest… do you prefer cute moments or big romantic moments?",
  "Would you say you’re more ‘planner’ or ‘go with the flow’?",
  "If I planned a sweet day for you… would you let me?",
  "Do you know what date is coming up soon? 👀",
  "Last one… do you think a Valentine should feel personal?"
];

const gfNoMessages = [
  "Wait 😭… don’t run yet. I just need you to know… you’ve been a bright part of my days.",
  "I’m serious, Kimmy… you’ve brought peace to my mind and softness to my heart.",
  "If you’re unsure, I get it… but I’m asking with genuine intentions. No games.",
  "Okay… last time I’ll ask with my full heart… because you truly matter to me."
];

const valNoMessages = [
  "Eii 🙈… don’t break my heart like that. I wanted this day to feel like ‘us’.",
  "Kimmy… you make love feel real — and I just wanted one day to celebrate you properly.",
  "If you’re thinking about it… I respect it. I’m just hoping you’ll say yes… to me, again.",
  "Alright… last one… because you’re my favorite thought, and I wanted that day to hold your name."
];

// =========================
// STATE
// =========================
const app = document.getElementById("app");
const bgm = document.getElementById("bgm");
bgm.src = AUDIO_SRC;

let qIndex = 0;
let gfNoCount = 0;
let valNoCount = 0;

// =========================
// HELPERS
// =========================
function render(html){
  app.classList.remove("fade");
  void app.offsetWidth; // reflow
  app.innerHTML = html;
  app.classList.add("fade");
}

function safePlayMusic(){
  bgm.volume = 0.85;
  const p = bgm.play();
  if (p && typeof p.catch === "function") {
    p.catch(() => {});
  }
}

function topHeader(title, subtitle){
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

// =========================
// SCREENS
// =========================
function screenLogin(){
  render(`
    ${topHeader("Private little corner", "Only one person in the world is meant to enter this.")}
    <div class="divider"></div>

    <label for="user">Username</label>
    <input id="user" type="text" placeholder="Enter username" autocomplete="off" />
    <span class="hint">Hint: Our baby’s name ❤️</span>

    <label for="pass">Password</label>
    <input id="pass" type="password" placeholder="Anything works 😌" autocomplete="off" />

    <div class="actions">
      <button id="loginBtn">Login (starts music 🎶)</button>
    </div>

    <div class="tiny">
      Soft reminder: this is a safe space — no pressure, just something sweet I made for you.
    </div>

    <div class="footer-note">Made with love.</div>
  `);

  document.getElementById("loginBtn").addEventListener("click", () => {
    const user = (document.getElementById("user").value || "").trim().toLowerCase();
    if (user !== USERNAME_REQUIRED){
      app.classList.remove("shake");
      void app.offsetWidth;
      app.classList.add("shake");

      const u = document.getElementById("user");
      u.focus();
      u.value = "";
      u.placeholder = "Try again… (hint is right there 😅)";
      return;
    }
    safePlayMusic();
    qIndex = 0;
    screenIntro();
  });
}

function screenIntro(){
  render(`
    ${topHeader("Hi Kimmy 👋🏽", "I made this like a tiny quiz… but it’s really just my heart being brave.")}
    <div class="pill">Part 1: Just a few questions</div>

    <div class="type">
Answer in your head, out loud, or just smile — either way… I’ll be happy you’re here.
    </div>

    <div class="actions">
      <button id="startBtn" class="btn-yes">Start</button>
    </div>

    <div class="tiny">
      (If the music didn’t start, tap the button again. Some phones are dramatic 🙃)
    </div>
  `);

  document.getElementById("startBtn").addEventListener("click", () => {
    safePlayMusic();
    screenQuestion(preGFQuestions);
  });
}

function screenQuestion(list){
  const isPre = (list === preGFQuestions);
  const total = list.length;

  render(`
    ${topHeader(isPre ? "Tiny Questions" : "One more small set…", "Just go with the flow 😌")}
    <div class="pill">${isPre ? "Warm up" : "Part 2"} • Question ${qIndex + 1} of ${total}</div>

    <div class="big-question">${list[qIndex]}</div>

    <div class="actions">
      <button id="nextBtn" class="btn-yes">Next</button>
    </div>

    <div class="tiny">
      I know it’s simple… but I wanted you to feel how gently you’ve been sitting in my mind lately.
    </div>
  `);

  document.getElementById("nextBtn").addEventListener("click", () => {
    qIndex++;
    if (qIndex < total){
      screenQuestion(list);
      return;
    }

    if (isPre){
      gfNoCount = 0;
      screenAskGF();
    } else {
      valNoCount = 0;
      screenAskValentine();
    }
  });
}

function screenAskGF(){
  render(`
    ${topHeader("Okay… real moment 😮‍💨", "Somewhere between your laugh and your kindness… I started feeling at home.")}
    <div class="divider"></div>

    <div class="big-question">Will you be my girlfriend? 💍❤️</div>

    <div class="actions">
      <button id="yesGF" class="btn-yes">Yes</button>
      <button id="noGF" class="btn-no">No</button>
    </div>

    <div id="msg" class="tiny"></div>
  `);

  const msg = document.getElementById("msg");

  document.getElementById("yesGF").addEventListener("click", () => {
    screenGFYesPoem();
  });

  document.getElementById("noGF").addEventListener("click", () => {
    if (gfNoCount < 4){
      msg.textContent = gfNoMessages[gfNoCount] || "I hear you…";
      gfNoCount++;
    } else {
      msg.textContent = "I won’t push you. Thank you for being honest. 🌷";
    }
  });
}

function screenGFYesPoem(){
  render(`
    ${topHeader("You just made me breathe easier 😭❤️", "Okay… let me say this properly.")}
    <div class="divider"></div>

    <div class="type">
You didn’t just say yes…
you changed my world in a single heartbeat.

You turned my overthinking into calm,
my ordinary into beautiful,
my days into something I actually look forward to.

If happiness had a name…
it would sound like yours.
    </div>

    <div class="actions">
      <button id="continueAfterGF" class="btn-yes">Continue</button>
    </div>

    <div class="tiny">(You look good as my girlfriend, by the way 😌)</div>
  `);

  document.getElementById("continueAfterGF").addEventListener("click", () => {
    qIndex = 0;
    screenQuestion(postGFQuestions);
  });
}

function screenAskValentine(){
  render(`
    ${topHeader("Now… my heart wants one more thing", "Not because of the date — but because of you.")}
    <div class="divider"></div>

    <div class="big-question">Will you be my Valentine? 💘</div>

    <div class="actions">
      <button id="yesVal" class="btn-yes">Yes</button>
      <button id="noVal" class="btn-no">No</button>
    </div>

    <div id="vmsg" class="tiny"></div>
  `);

  const vmsg = document.getElementById("vmsg");

  document.getElementById("yesVal").addEventListener("click", () => {
    screenValentineYesEnding();
  });

  document.getElementById("noVal").addEventListener("click", () => {
    if (valNoCount < 4){
      vmsg.textContent = valNoMessages[valNoCount] || "I hear you…";
      valNoCount++;
    } else {
      vmsg.textContent = "I won’t pressure you. Still… thank you for being here. 🌷";
    }
  });
}

function screenValentineYesEnding(){
  render(`
    ${topHeader("You’re my favorite yes 💖", "Let me leave you with a little love note…")}
    <div class="divider"></div>

    <div class="type">
Loving you isn’t a date on a calendar.
It’s a feeling stitched into my everyday.

But if I get to call you my Valentine…
then February becomes sacred —
because it holds your name.

So… tell me, baby…
what would you prefer? 😌
    </div>

    <div class="choice-grid">
      <button class="btn-yes" data-choice="A planned date">A planned date 🕯️</button>
      <button class="btn-yes" data-choice="A surprise">A surprise 🎁</button>
      <button class="btn-yes wide" data-choice="Something simple & meaningful">Something simple & meaningful 🌹</button>
    </div>

    <div class="tiny" id="choiceOut"></div>
    <div class="footer-note">This page is cute. But you… you’re the real masterpiece.</div>
  `);

  const out = document.getElementById("choiceOut");
  document.querySelectorAll("[data-choice]").forEach(btn => {
    btn.addEventListener("click", () => {
      out.textContent = `Noted 😌 → “${btn.getAttribute("data-choice")}”. Now come here and let me spoil you properly.`;
    });
  });
}

// =========================
// HEARTS BACKGROUND
// =========================
function spawnHearts(){
  const container = document.getElementById("hearts");
  const count = 18;

  for(let i=0;i<count;i++){
    const h = document.createElement("div");
    h.className = "heart";

    const left = Math.random()*100;
    const size = 10 + Math.random()*16;
    const duration = 10 + Math.random()*14;
    const delay = Math.random()*8;

    h.style.left = left + "vw";
    h.style.width = size + "px";
    h.style.height = size + "px";
    h.style.animationDuration = duration + "s";
    h.style.animationDelay = delay + "s";
    h.style.opacity = (0.20 + Math.random()*0.35).toFixed(2);

    container.appendChild(h);
  }
}

// Boot
spawnHearts();
screenLogin();
