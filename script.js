const screenName = document.getElementById("screenName");
const screenAsk  = document.getElementById("screenAsk");
const screenYay  = document.getElementById("screenYay");

const nameInput = document.getElementById("nameInput");
const startBtn  = document.getElementById("startBtn");

const askTitle = document.getElementById("askTitle");
const yayTitle = document.getElementById("yayTitle");

const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");
const hint   = document.getElementById("hint");

const chips = document.querySelectorAll(".chip");
const customWish = document.getElementById("customWish");
const saveWishBtn = document.getElementById("saveWishBtn");
const finalWish = document.getElementById("finalWish");
const restartBtn = document.getElementById("restartBtn");

const heartsLayer = document.querySelector(".hearts");
const confettiLayer = document.querySelector(".confetti");

let personName = "";

// ---------- helpers ----------
function showScreen(which){
  [screenName, screenAsk, screenYay].forEach(s => s.classList.remove("active"));
  which.classList.add("active");
}

function cleanName(str){
  return (str || "").trim().replace(/\s+/g, " ").slice(0, 20);
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

// ---------- start ----------
function begin(){
  personName = cleanName(nameInput.value);
  if(!personName){
    nameInput.focus();
    nameInput.placeholder = "Please type your name 😭💗";
    return;
  }
  askTitle.textContent = `${personName}, will you be my Valentine? 💘`;
  hint.textContent = `Be honest ${personName}… but also choose wisely 😌`;
  showScreen(screenAsk);
}

startBtn.addEventListener("click", begin);
nameInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter") begin();
});

// ---------- NO button dodges ----------
function dodgeNo(){
  const padding = 20;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top  = `${y}px`;
}

noBtn.addEventListener("mouseover", dodgeNo);
noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); dodgeNo(); });

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
restartBtn.addEventListener("click", () => {
  personName = "";
  nameInput.value = "";
  customWish.value = "";
  finalWish.textContent = "—";
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
  showScreen(screenName);
  nameInput.focus();
});

// Start on name screen
showScreen(screenName);
nameInput.focus();
