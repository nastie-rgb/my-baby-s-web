// =========================
// CONFIG
// =========================
const AUDIO_SRC = "song.mp3";         // MUST match exactly (case-sensitive)
const USERNAME_REQUIRED = "tashia";   // username required

// Q sets (options included)
const preGF = [
  { q: "Quick one… do you believe people meet for a reason?", o: ["Yes 😌", "Sometimes", "Not really"] },
  { q: "Do you think vibes can speak louder than words?", o: ["Definitely", "A little", "Nope"] },
  { q: "Do you like surprises… even the small ones?", o: ["I love them", "Depends", "Not really"] },
  { q: "Have you ever met someone who made ordinary days feel lighter?", o: ["Yes", "Maybe", "Not yet"] },
  { q: "If a person consistently makes you smile… does that mean something?", o: ["Yes", "Could be", "No"] },
  { q: "Okay… last warm-up 😅 Love should be chosen on purpose?", o: ["Yes", "Maybe", "No"] }
];

const postGF = [
  { q: "Be honest… cute moments or big romantic moments?", o: ["Cute 😭", "Big romantic", "Both"] },
  { q: "Are you more ‘planner’ or ‘go with the flow’?", o: ["Planner", "Flow", "Both"] },
  { q: "If I planned a sweet day… would you allow me?", o: ["Yes", "Maybe", "Stop 😭 (but yes)"] },
  { q: "Do you know what date is coming up soon? 👀", o: ["Yes", "Not sure", "Tell me"] },
  { q: "Valentine should feel personal, right?", o: ["Yes", "Somewhat", "Not important"] }
];

// Romantic reactions after an option click
const reacts = [
  "Noted 😌… I like how your mind works.",
  "That answer? Cute. I’m smiling fr.",
  "Okay okay… I hear you. And I like you.",
  "You’re making this hard to act normal 😭❤️",
  "Mmh… that’s why I mess with you."
];

// No-click lines (up to 4)
const gfNo = [
  "Wait 😭… don’t run yet. I just need you to know you’ve been a bright part of my days.",
  "Kimmy… you’ve brought peace to my mind and softness to my heart.",
  "If you’re unsure, I get it… but I’m asking with genuine intentions. No games.",
  "Last time… with my full heart… because you truly matter to me."
];

const valNo = [
  "Eii 🙈… don’t break my heart like that. I wanted that day to feel like ‘us’.",
  "You make love feel real — I just wanted one day to celebrate you properly.",
  "If you’re thinking about it… I respect it. I’m just hoping you’ll say yes… to me again.",
  "Last time… because you’re my favorite thought, and I wanted that day to hold your name."
];

// =========================
// STATE / ELEMENTS
// =========================
const app = document.getElementById("app");
const bgm = document.getElementById("bgm");
const musicChip = document.getElementById("musicChip");
const musicChipText = document.getElementById("musicChipText");
const sparkles = document.getElementById("sparkles");

bgm.src = AUDIO_SRC;

let stage = "login"; // login | preGF | askGF | postGF | askVal | end
let idx = 0;
let gfNoCount = 0;
let valNoCount = 0;

// =========================
// HELPERS
// =========================
function render(html){
  app.classList.add("fade");
  app.innerHTML = html;
}

function header(title, subtitle){
  return `
    <div class="brand">
      <div class="badge"><span>💗</span></div>
      <div>
        <h1>${title}</h1>
        <div class="sub">${subtitle}</div>
      </div>
    </div>
  `;
}

function pick(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

async function startMusic(){
  try{
    // Re-assert (helps on some phones / GitHub Pages)
    if (!bgm.src.includes(AUDIO_SRC)) bgm.src = AUDIO_SRC;
    bgm.muted = false;
    bgm.volume = 0.9;
    bgm.loop = true;
    bgm.load();
    await bgm.play();
    musicChipText.textContent = "Pause";
  }catch(e){
    // If autoplay fails, user can tap the music chip.
    musicChipText.textContent = "Play";
  }
}

function toggleMusic(){
  if (bgm.paused){
    startMusic();
  } else {
    bgm.pause();
    musicChipText.textContent = "Play";
  }
}

function setProgress(current, total){
  const pct = Math.round((current / total) * 100);
  const el = document.getElementById("progFill");
  if (el) el.style.width = pct + "%";
}

function confettiBurst(){
  const pieces = 38;
  for (let i=0;i<pieces;i++){
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random()*100 + "vw";
    c.style.background = `hsla(${Math.random()*360}, 90%, 70%, .95)`;
    c.style.transform = `translateY(0) rotate(${Math.random()*180}deg)`;
    c.style.animationDuration = (0.9 + Math.random()*0.8) + "s";
    document.body.appendChild(c);
    setTimeout(()=>c.remove(), 1600);
  }
}

function spawnSparkles(){
  // just once
  for(let i=0;i<28;i++){
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.left = Math.random()*100 + "vw";
    s.style.top = Math.random()*100 + "vh";
    s.style.animationDelay = (Math.random()*2.6) + "s";
    s.style.opacity = (0.35 + Math.random()*0.55).toFixed(2);
    sparkles.appendChild(s);
  }
}

// =========================
// SCREENS
// =========================
function screenLogin(){
  stage = "login";
  render(`
    ${header("Private little corner", "Only one person is meant to unlock this 😌")}
    <div class="divider"></div>

    <label for="u">Username</label>
    <input id="u" placeholder="Enter username" autocomplete="off" />
    <span class="hint">Hint: Our baby’s name ❤️</span>

    <label for="p">Password</label>
    <input id="p" type="password" placeholder="Anything works 😌" autocomplete="off" />

    <div class="actions">
      <button id="login" class="btn-yes">Login (starts music 🎶)</button>
    </div>

    <div class="tiny">
      If music doesn’t start immediately, tap the 🎶 button on the bottom right.
      (Phones be strict sometimes.)
    </div>
  `);

  document.getElementById("login").addEventListener("click", async () => {
    const u = (document.getElementById("u").value || "").trim().toLowerCase();

    if (u !== USERNAME_REQUIRED){
      app.classList.remove("shake");
      void app.offsetWidth;
      app.classList.add("shake");
      document.getElementById("u").value = "";
      document.getElementById("u").placeholder = "Try again… the hint is right there 😭";
      return;
    }

    // Start music in the same click event
    await startMusic();
    idx = 0;
    screenIntro();
  });
}

function screenIntro(){
  render(`
    ${header("Hi Kimmy 👋🏽", "It starts like a tiny quiz… then it gets a little real.")}
    <div class="pill">✨ Part 1 • Questions</div>

    <div class="type">
Tap answers. No pressure.
I just want you to feel how softly you live in my mind.
    </div>

    <div class="actions">
      <button id="go" class="btn-yes">Start</button>
      <button id="play" class="btn-no">Tap to play music</button>
    </div>
  `);

  document.getElementById("go").addEventListener("click", () => {
    stage = "preGF";
    idx = 0;
    screenQuestion(preGF);
  });

  document.getElementById("play").addEventListener("click", () => startMusic());
}

function screenQuestion(list){
  const total = list.length;
  const item = list[idx];

  render(`
    ${header("Quick Questions", "Just pick what feels true 😌")}
    <div class="pill">💞 Question ${idx + 1} of ${total}</div>

    <div class="progress"><div id="progFill"></div></div>

    <div class="big-question">${item.q}</div>

    <div class="options">
      ${item.o.map((x)=>`<button class="option-btn">${x}</button>`).join("")}
    </div>

    <div class="reply" id="reply" style="display:none;"></div>

    <div class="tiny">Your answers are cute, by the way.</div>
  `);

  setProgress(idx, total);

  const reply = document.getElementById("reply");
  const btns = [...document.querySelectorAll(".option-btn")];

  btns.forEach(b => {
    b.addEventListener("click", () => {
      reply.style.display = "block";
      reply.textContent = pick(reacts);

      setTimeout(() => {
        idx++;
        if (idx < total){
          screenQuestion(list);
          return;
        }

        // Move to next stage
        if (list === preGF){
          gfNoCount = 0;
          screenAskGF();
        } else {
          valNoCount = 0;
          screenAskValentine();
        }
      }, 650);
    });
  });
}

function screenAskGF(){
  stage = "askGF";
  render(`
    ${header("Okay… real moment 😮‍💨", "Somewhere between your laugh and your kindness… I felt at home.")}
    <div class="divider"></div>

    <div class="big-question">Will you be my girlfriend? 💍❤️</div>

    <div class="actions">
      <button id="yes" class="btn-yes">Yes</button>
      <button id="no" class="btn-no">No</button>
    </div>

    <div class="tiny" id="msg"></div>
  `);

  const msg = document.getElementById("msg");

  document.getElementById("yes").addEventListener("click", () => {
    confettiBurst();
    screenGFYesPoem();
  });

  document.getElementById("no").addEventListener("click", () => {
    if (gfNoCount < 4){
      msg.textContent = gfNo[gfNoCount];
      gfNoCount++;
    } else {
      msg.textContent = "I won’t pressure you. Thank you for being honest. 🌷";
    }
  });
}

function screenGFYesPoem(){
  render(`
    ${header("You just made me breathe easier 😭❤️", "Let me say this properly…")}
    <div class="divider"></div>

    <div class="type">
You didn’t just say yes…
you changed my world in a single heartbeat.

You turned my overthinking into calm,
my ordinary into beautiful,
my days into something I look forward to.

If happiness had a name…
it would sound like yours.
    </div>

    <div class="actions">
      <button id="cont" class="btn-yes">Continue</button>
      <button id="play2" class="btn-no">Tap to play music</button>
    </div>

    <div class="tiny">
      Okay girlfriend 😌… round two is coming.
    </div>
  `);

  document.getElementById("cont").addEventListener("click", () => {
    stage = "postGF";
    idx = 0;
    screenQuestion(postGF);
  });

  document.getElementById("play2").addEventListener("click", () => startMusic());
}

function screenAskValentine(){
  stage = "askVal";
  render(`
    ${header("One more thing…", "Not because of the date — but because of you.")}
    <div class="divider"></div>

    <div class="big-question">Will you be my Valentine? 💘</div>

    <div class="actions">
      <button id="yesV" class="btn-yes">Yes</button>
      <button id="noV" class="btn-no">No</button>
    </div>

    <div class="tiny" id="vmsg"></div>
  `);

  const vmsg = document.getElementById("vmsg");

  document.getElementById("yesV").addEventListener("click", () => {
    confettiBurst();
    screenValentineEnding();
  });

  document.getElementById("noV").addEventListener("click", () => {
    if (valNoCount < 4){
      vmsg.textContent = valNo[valNoCount];
      valNoCount++;
    } else {
      vmsg.textContent = "I won’t pressure you. Still… thank you for being here. 🌷";
    }
  });
}

function screenValentineEnding(){
  stage = "end";
  render(`
    ${header("You’re my favorite yes 💖", "A little love note, then you choose…")}
    <div class="divider"></div>

    <div class="type">
Loving you isn’t a date on a calendar.
It’s a feeling stitched into my everyday.

But if I get to call you my Valentine…
then February becomes sacred —
because it holds your name.

So tell me, baby…
what would you prefer? 😌
    </div>

    <div class="choice-grid">
      <button class="btn-yes" data-choice="A planned date">A planned date 🕯️</button>
      <button class="btn-yes" data-choice="A surprise">A surprise 🎁</button>
      <button class="btn-yes wide" data-choice="Something simple & meaningful">Something simple & meaningful 🌹</button>
    </div>

    <div class="reply" id="out" style="display:none;"></div>

    <div class="tiny">
      (You can screenshot this and send it back to me 😭❤️)
    </div>
  `);

  const out = document.getElementById("out");
  document.querySelectorAll("[data-choice]").forEach(btn => {
    btn.addEventListener("click", () => {
      out.style.display = "block";
      out.textContent = `Noted 😌 → “${btn.getAttribute("data-choice")}”. Now come here and let me spoil you properly.`;
    });
  });
}

// =========================
// MUSIC CHIP
// =========================
musicChip.addEventListener("click", () => toggleMusic());
bgm.addEventListener("play", () => (musicChipText.textContent = "Pause"));
bgm.addEventListener("pause", () => (musicChipText.textContent = "Play"));

// =========================
// BOOT
// =========================
spawnSparkles();
screenLogin();
