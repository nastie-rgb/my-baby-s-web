const screenLogin = document.getElementById("screenLogin");
const screenAsk   = document.getElementById("screenAsk");
const screenYay   = document.getElementById("screenYay");
const screenSad   = document.getElementById("screenSad");

const userInput = document.getElementById("userInput");
const passInput = document.getElementById("passInput");
const loginBtn  = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");

const askTitle = document.getElementById("askTitle");
const askSubtitle = document.getElementById("askSubtitle");
const yayTitle = document.getElementById("yayTitle");

const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");
const hint   = document.getElementById("hint");

const chips = document.querySelectorAll(".chip");
const customWish = document.getElementById("customWish");
const saveWishBtn = document.getElementById("saveWishBtn");
const finalWish = document.getElementById("finalWish");
const restartBtn = document.getElementById("restartBtn");

const sadMsg = document.getElementById("sadMsg");
const sadRestartBtn = document.getElementById("sadRestartBtn");

const heartsLayer = document.querySelector(".hearts");
const confettiLayer = document.querySelector(".confetti");

const music = document.getElementById("bgMusic");

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

// ---------- hearts ----------
function spawnHeart(){
  const heart = document.createElement("div");
  heart.textContent = Math.random() > 0.15 ? "💖" : "💕";
  heart.style.position = "absolute";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-40px";
  heart.style.fontSize = (18 + Math.random() * 18) + "px";
  heart.style.opacity = (0.55 + Math.random() * 0.45).toFixed(2);
  heart.style.transform = `translateX(${(Math.random()*40-20).toFixed(0)}px)`;
  heart.style.transition = "transform 6s linear, bottom 6s linear, opacity 6s linear";
  heartsLayer.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.bottom = "110vh";
    heart.style.transform += ` translateX(${(Math.random()*80-40).toFixed(0)}px)`;
    heart.style.opacity = "0";
  });

  setTimeout(() => heart.remove(), 6200);
}
setInterval(spawnHeart, 420);

// ---------- music ----------
function startMusic(){
  music.play().catch(() => {});
}

// ---------- LOGIN ----------
function login(){
  const u = normalize(userInput.value);
  // password can be anything; hint is in placeholder
  if(u !== "naima"){
    loginError.textContent = "Access denied 😭 This page is for Naima only 💗";
    // tiny playful shake
    screenLogin.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "translateX(0)" }],
      { duration: 260 }
    );
    return;
  }

  loginError.textContent = "";
  personName = "Naima";
  noCount = 0;
  resetNoButton();

  askTitle.textContent = `${personName}, will you be my Valentine? 💘`;
  askSubtitle.textContent = `No pressure… but also yes pressure 😭👉👈`;
  hint.textContent = `Be honest ${personName}… but please be gentle 😌`;

  showScreen(screenAsk);
  startMusic();
}

loginBtn.addEventListener("click", login);
passInput.addEventListener("keydown", (e) => { if(e.key === "Enter") login(); });
userInput.addEventListener("keydown", (e) => { if(e.key === "Enter") login(); });

// ---------- NO button logic (4 tries) ----------
function resetNoButton(){
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
}

function dodgeNo(){
  const padding = 16;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top  = `${y}px`;
}

const noMessages = [
  "Eii 😭 first No? Are you sure?",
  "Second No?? my heart is shaking 🥺",
  "Third No… okay you’re testing me fr 😔",
];

function goHeartbreak(){
  showScreen(screenSad);
  sadMsg.textContent = `${personName}… I get it. But wow… that actually hurt. 💔`;
}

noBtn.addEventListener("click", () => {
  noCount += 1;

  if(noCount <= 3){
    hint.textContent = noMessages[noCount - 1];
    dodgeNo();
    popConfetti(12);
    return;
  }

  hint.textContent = "";
  goHeartbreak();
});

// make it slippery while hovering only before 4th click
noBtn.addEventListener("mouseover", () => {
  if(noCount < 3) dodgeNo();
});
noBtn.addEventListener("touchstart", (e) => {
  if(noCount < 3){
    e.preventDefault();
    dodgeNo();
  }
});

// ---------- YES celebration ----------
function popConfetti(amount = 70){
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

chips.forEach(btn => {
  btn.addEventListener("click", () => setWish(btn.dataset.choice));
});

saveWishBtn.addEventListener("click", () => setWish(customWish.value));
customWish.addEventListener("keydown", (e) => {
  if(e.key === "Enter") setWish(customWish.value);
});

// ---------- restart ----------
function fullReset(){
  personName = "Naima";
  noCount = 0;

  userInput.value = "";
  passInput.value = "";
  customWish.value = "";
  finalWish.textContent = "—";
  hint.textContent = "";
  loginError.textContent = "";

  resetNoButton();
  showScreen(screenLogin);
  userInput.focus();
}

restartBtn.addEventListener("click", fullReset);
sadRestartBtn.addEventListener("click", fullReset);

// Start on login screen
showScreen(screenLogin);
userInput.focus();
