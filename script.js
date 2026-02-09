// =========================
// IMPORTANT: AUDIO FILE NAME
// =========================
// Best: rename your audio in GitHub to "song.mp3" and keep this:
const AUDIO_FILE_NAME = "song.mp3";

/*
// If you want to use your current WhatsApp file instead, set it EXACTLY like this:
const AUDIO_FILE_NAME = "WhatsApp Audio 2026-02-06 at 09.08.40.mpeg";
*/

// Username requirement
const USERNAME_REQUIRED = "tashia";

// Questions with options (she can answer)
const preGF = [
  { q: "Do you believe people meet for a reason?", o: ["Yes 💗", "Sometimes", "Not really"] },
  { q: "Do you like soft love… the calm kind?", o: ["Yes", "A little", "I like chaos 😂"] },
  { q: "Would you say I’ve made you smile before?", o: ["Yes", "Maybe", "You try 😭"] },
  { q: "Do you think feelings can grow quietly?", o: ["Yes", "Maybe", "Nope"] },
  { q: "If someone chose you intentionally… would that matter?", o: ["A lot", "Somewhat", "Not sure"] }
];

const postGF = [
  { q: "Do you like cute moments or big romantic gestures?", o: ["Cute 😭", "Big romantic", "Both"] },
  { q: "If I planned something sweet… would you trust me?", o: ["Yes", "Maybe", "I’m listening 👀"] },
  { q: "Do you want our love to feel like peace?", o: ["Yes", "Sometimes", "I like drama 😂"] },
  { q: "Do you know what date is coming soon? 👀", o: ["Yes", "Not sure", "Tell me"] }
];

const reacts = [
  "Noted 😌… you’re actually adorable.",
  "That answer made me smile fr 😭💗",
  "Okay okay… I hear you. And I like you.",
  "Mmh… you’re making this hard to stay calm.",
  "You + me = a dangerous combo 😂💗"
];

const gfNoLines = [
  "Wait 😭… don’t run yet. You’ve been a bright part of my days.",
  "Kimmy… you’ve brought peace to my mind and softness to my heart.",
  "If you’re unsure, I get it… but my intentions are pure.",
  "Last time… I’m asking with my whole heart… because you matter."
];

const valNoLines = [
  "Eii 🙈… don’t break my heart like that. I wanted that day to feel like ‘us’.",
  "You make love feel real — I just wanted one day to celebrate you properly.",
  "If you’re thinking… I respect it. I’m hoping you’ll say yes again.",
  "Last time… because you’re my favorite thought, and I wanted that day to hold your name."
];

// =========================
// ELEMENTS / STATE
// =========================
const app = document.getElementById("app");
const bgm = document.getElementById("bgm");
const musicChip = document.getElementById("musicChip");
const musicChipText = document.getElementById("musicChipText");
const sparkles = document.getElementById("sparkles");

let idx = 0;
let gfNoCount = 0;
let valNoCount = 0;

// =========================
// UTIL
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

function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function encodeFileName(name){
  // Encodes spaces etc for GitHub Pages URL
  return name.split("/").map(encodeURIComponent).join("/");
}

function setAudioSrc(){
  const src = encodeFileName(AUDIO_FILE_NAME);
  bgm.src = src;
  return src;
}

function confetti(){
  for (let i=0; i<36; i++){
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random()*100 + "vw";
    c.style.background = `hsla(${Math.random()*360}, 90%, 75%, .95)`;
    c.style.animationDuration = (0.9 + Math.random()*0.9) + "s";
    document.body.appendChild(c);
    setTimeout(()=>c.remove(), 1600);
  }
}

function spawnSparkles(){
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

function setProgress(current, total){
  const el = document.getElementById("progFill");
  if (!el) return;
  const pct = Math.round((current/total)*100);
  el.style.width = pct + "%";
}

// =========================
// MUSIC (robust + debug)
// =========================
async function startMusic(){
  const attempted = setAudioSrc();
  try{
    bgm.muted = false;
    bgm.volume = 0.9;
    bgm.loop = true;
    bgm.load();
    await bgm.play();
    musicChipText.textContent = "Pause";
    return { ok:true, attempted };
  }catch(e){
    musicChipText.textContent = "Play";
    return { ok:false, attempted, err: (e && e.name) ? e.name : "play_failed" };
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

musicChip.addEventListener("click", toggleMusic);
bgm.addEventListener("play", ()=> musicChipText.textContent="Pause");
bgm.addEventListener("pause", ()=> musicChipText.textContent="Play");

// =========================
// FLOW SCREENS
// =========================
function screenLogin(){
  render(`
    ${header("Private Pink Portal", "Only one person should pass this door 😌")}
    <div class="divider"></div>

    <label>Username</label>
    <input id="u" placeholder="Enter username" autocomplete="off" />
    <span class="hint">Hint: Our baby’s name 💗</span>

    <label>Password</label>
    <input id="p" type="password" placeholder="Anything works 😌" autocomplete="off" />

    <div class="actions">
      <button id="login" class="btn-yes">Login (starts music 🎶)</button>
    </div>

    <div class="reply" id="audioDebug" style="display:none;"></div>
  `);

  document.getElementById("login").addEventListener("click", async () => {
    const u = (document.getElementById("u").value || "").trim().toLowerCase();
    if (u !== USERNAME_REQUIRED){
      app.classList.remove("shake");
      void app.offsetWidth;
      app.classList.add("shake");
      const inp = document.getElementById("u");
      inp.value = "";
      inp.placeholder = "Try again… (hint is right there 😭)";
      return;
    }

    // Start music on the SAME click event (important for browsers)
    const r = await startMusic();
    const box = document.getElementById("audioDebug");
    box.style.display = "block";
    box.textContent = r.ok
      ? `Music started ✅ (File: ${AUDIO_FILE_NAME})`
      : `Music didn’t start ❌ (Tried: ${r.attempted}) → Fix: rename audio to "song.mp3" or set AUDIO_FILE_NAME to your exact filename. Error: ${r.err}`;

    // Continue even if music fails (she can tap 🎶)
    setTimeout(()=> screenIntro(), 700);
  });
}

function screenIntro(){
  render(`
    ${header("Hi Kimmy 👋🏽", "It’s a cute quiz… then it gets real.")}
    <div class="pill">💗 Soft questions first</div>
    <div class="type">
Tap answers. No pressure.
I just wanted to say some things… the sweet way.
    </div>

    <div class="actions">
      <button id="start" class="btn-yes">Start</button>
      <button id="play" class="btn-no">Tap to play music</button>
    </div>

    <div class="tiny">
If music didn’t start, tap the 🎶 button bottom-right too.
    </div>
  `);

  document.getElementById("start").addEventListener("click", ()=> {
    idx = 0;
    screenQuestions(preGF, "Part 1");
  });
  document.getElementById("play").addEventListener("click", ()=> startMusic());
}

function screenQuestions(list, label){
  const total = list.length;
  const item = list[idx];

  render(`
    ${header("Pink Questions", "Choose what feels true 😌")}
    <div class="pill">${label} • Question ${idx+1} of ${total}</div>
    <div class="progress"><div id="progFill"></div></div>

    <div class="big-question">${item.q}</div>
    <div class="options">
      ${item.o.map(x => `<button class="option-btn">${x}</button>`).join("")}
    </div>

    <div class="reply" id="reply" style="display:none;"></div>
  `);

  setProgress(idx, total);

  const reply = document.getElementById("reply");
  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", ()=> {
      reply.style.display = "block";
      reply.textContent = pick(reacts);

      setTimeout(()=> {
        idx++;
        if (idx < total) return screenQuestions(list, label);

        if (list === preGF) return askGF();
        return askValentine();
      }, 650);
    });
  });
}

function askGF(){
  gfNoCount = 0;
  render(`
    ${header("Okay… real moment 😮‍💨", "Somewhere between your vibe and your kindness… I felt at home.")}
    <div class="divider"></div>
    <div class="big-question">Will you be my girlfriend? 💍💗</div>

    <div class="actions">
      <button id="yes" class="btn-yes">Yes</button>
      <button id="no" class="btn-no">No</button>
    </div>
    <div class="tiny" id="msg"></div>
  `);

  const msg = document.getElementById("msg");

  document.getElementById("yes").addEventListener("click", ()=> {
    confetti();
    gfPoem();
  });

  document.getElementById("no").addEventListener("click", ()=> {
    if (gfNoCount < 4){
      msg.textContent = gfNoLines[gfNoCount];
      gfNoCount++;
    } else {
      msg.textContent = "I won’t pressure you. Thank you for being honest. 🌷";
    }
  });
}

function gfPoem(){
  render(`
    ${header("You just made me so happy 😭💗", "Let me say it properly…")}
    <div class="divider"></div>

    <div class="type">
You didn’t just say yes…
you made my whole chest feel warm.

You’ve been a soft place in my mind,
a calm in my noise,
a sweet part of my days.

If happiness had a sound…
it would be your name.
    </div>

    <div class="actions">
      <button id="cont" class="btn-yes">Continue</button>
      <button id="play" class="btn-no">Tap to play music</button>
    </div>
  `);

  document.getElementById("cont").addEventListener("click", ()=> {
    idx = 0;
    screenQuestions(postGF, "Part 2");
  });
  document.getElementById("play").addEventListener("click", ()=> startMusic());
}

function askValentine(){
  valNoCount = 0;
  render(`
    ${header("One more thing…", "Not because of the date — because of you.")}
    <div class="divider"></div>
    <div class="big-question">Will you be my Valentine? 💘💗</div>

    <div class="actions">
      <button id="yesV" class="btn-yes">Yes</button>
      <button id="noV" class="btn-no">No</button>
    </div>
    <div class="tiny" id="vmsg"></div>
  `);

  const vmsg = document.getElementById("vmsg");

  document.getElementById("yesV").addEventListener("click", ()=> {
    confetti();
    ending();
  });

  document.getElementById("noV").addEventListener("click", ()=> {
    if (valNoCount < 4){
      vmsg.textContent = valNoLines[valNoCount];
      valNoCount++;
    } else {
      vmsg.textContent = "I won’t pressure you. Still… thank you for being here. 🌷";
    }
  });
}

function ending(){
  render(`
    ${header("You’re my favorite yes 💗", "Okay… last part. Choose 😌")}
    <div class="divider"></div>

    <div class="type">
Loving you isn’t a date on a calendar.
It’s a feeling stitched into my everyday.

But if I get to call you my Valentine…
then February becomes sacred,
because it holds your name.
    </div>

    <div class="pill">Pick what you’d prefer</div>
    <div class="choice-grid">
      <button class="btn-yes" data-c="A planned date">A planned date 🕯️</button>
      <button class="btn-yes" data-c="A surprise">A surprise 🎁</button>
      <button class="btn-yes wide" data-c="Something simple & meaningful">Something simple & meaningful 🌹</button>
    </div>

    <div class="reply" id="out" style="display:none;"></div>
    <div class="tiny">If music is silent, tap 🎶 bottom-right.</div>
  `);

  const out = document.getElementById("out");
  document.querySelectorAll("[data-c]").forEach(b=>{
    b.addEventListener("click", ()=>{
      out.style.display = "block";
      out.textContent = `Noted 😌 → “${b.getAttribute("data-c")}”. Now come here… let me spoil you properly.`;
    });
  });
}

// Boot
spawnSparkles();
screenLogin();
