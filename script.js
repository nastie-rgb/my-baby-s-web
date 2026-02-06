// ====== Screens ======
const screenLogin = document.getElementById("screenLogin");
const screenAsk   = document.getElementById("screenAsk");
const screenYay   = document.getElementById("screenYay");
const screenSad   = document.getElementById("screenSad");

// ====== Login fields ======
const userInput   = document.getElementById("userInput");
const passInput   = document.getElementById("passInput");
const loginBtn    = document.getElementById("loginBtn");
const loginError  = document.getElementById("loginError");

// ====== Ask screen ======
const askTitle    = document.getElementById("askTitle");
const askSubtitle = document.getElementById("askSubtitle");
const yesBtn      = document.getElementById("yesBtn");
const noBtn       = document.getElementById("noBtn");
const hint        = document.getElementById("hint");

// ====== Yay screen ======
const yayTitle     = document.getElementById("yayTitle");
const chips        = document.querySelectorAll(".chip");
const customWish   = document.getElementById("customWish");
const saveWishBtn  = document.getElementById("saveWishBtn");
const finalWish    = document.getElementById("finalWish");
const restartBtn   = document.getElementById("restartBtn");

// ====== Sad screen ======
const sadMsg        = document.getElementById("sadMsg");
const sadRestartBtn = document.getElementById("sadRestartBtn");

// ====== Effects ======
const confettiLayer = document.querySelector(".confetti");
const music         = document.getElementById("bgMusic");

let personName = "Naima";
let noCount = 0;

// ---------- helpers ----------
function showScreen(which){
  [screenLogin, screenAsk, screenYay, screenSad].forEach(s => s.classList.remove("active"));
  which.classList.add("active");
}

function normalize(str){
  return (str || "").trim().toLowerCase();
}

function startMusic(){
  // Starts after user gesture (Login), so browsers usually allow it
  music.play().catch(() => {});
}

// ---------- confetti (optional, cute) ----------
function popConfetti(amount = 60){
  for(let i=0; i<amount; i++){
    const p = document.createElement("div");
    p.style.position = "absolute";
    p.style.left = Math.random()*100 + "%";
    p.style.top  = "-10px";
    p.style.width = "8px";
    p.style.height = "12px";
    p.style.borderRadius = "4px";
    p.style.background = `hsl(${Math.random()*360}, 90%, 75%)`;
    p.style.opacity = "0.95";
    p.style.transform = `rotate(${Math.random()*360}deg)`;
    p.style.transition = "transform 2.8s ease, top 2.8s ease, opacity 2.8s ease";
    confettiLayer.appendChild(p);

    requestAnimationFrame(() => {
      p.style.top = "110%";
      p.style.transform += ` translateY(${400 + Math.random()*400}px) rotate(${Math.random()*720}deg)`;
      p.style.opacity = "0";
    });

    setTimeout(() => p.remove(), 3000);
  }
}

// ---------- LOGIN ----------
function login(){
  const u = normalize(userInput.value);

  // Username must be Naima (case-insensitive). Password can be anything.
  if(u !== "naima"){
    loginError.textContent = "Access denied 😭 This page is for Naima only 💗";
    // small shake
    screenLogin.animate(
      [{ transform:"translateX(0)" },{ transform:"translateX(-8px)" },{ transform:"translateX(8px)" },{ transform:"translateX(0)" }],
      { duration: 260 }
    );
    return;
  }

  loginError.textContent = "";
  personName = "Naima";
  noCount = 0;

  // IMPORTANT: keep NO button fixed and clickable (no moving, no position hacks)
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";

  askTitle.textContent = `${personName}, will you be my Valentine? 💘`;
  askSubtitle.textContent = `No pressure… but also yes pressure 😭👉👈`;
  hint.textContent = "";

  showScreen(screenAsk);
  startMusic();
}

loginBtn.addEventListener("click", login);
userInput.addEventListener("keydown", (e) => { if(e.key === "Enter") login(); });
passInput.addEventListener("keydown", (e) => { if(e.key === "Enter") login(); });

// ---------- NO (stays in one position, functional) ----------
const noMessages = [
  "First no? 🥺 okay…",
  "Second no?? my heart is shaking 💔",
  "Third no… you’re really doing this to me 😭"
];

noBtn.addEventListener("click", () => {
  noCount += 1;

  // Keep the button where it is (do NOT move it)
  // Just show escalating messages
  if(noCount <= 3){
    hint.textContent = noMessages[noCount - 1];
    return;
  }

  // 4th click → heartbreak
  hint.textContent = "";
  sadMsg.textContent = `${personName}… I’ll respect it. But wow… that actually hurt. 💔`;
  showScreen(screenSad);
});

// ---------- YES ----------
yesBtn.addEventListener("click", () => {
  yayTitle.textContent = `YAAAY ${personName}!! 💖`;
  showScreen(screenYay);
  popConfetti(90);
});

// ---------- wishes ----------
function setWish(text){
  const t = (text || "").trim();
  finalWish.textContent = t ? `“${t}”` : "—";
  if(t) popConfetti(35);
}

chips.forEach(btn => btn.addEventListener("click", () => setWish(btn.dataset.choice)));
saveWishBtn.addEventListener("click", () => setWish(customWish.value));
customWish.addEventListener("keydown", (e) => { if(e.key === "Enter") setWish(customWish.value); });

// ---------- restart ----------
function fullReset(){
  noCount = 0;
  userInput.value = "";
  passInput.value = "";
  customWish.value = "";
  finalWish.textContent = "—";
  hint.textContent = "";
  loginError.textContent = "";
  showScreen(screenLogin);
  userInput.focus();
}

restartBtn.addEventListener("click", fullReset);
sadRestartBtn.addEventListener("click", fullReset);

// Start on login screen
showScreen(screenLogin);
userInput.focus();
