// CONFIGURATION
// Change this to the exact name you want her to type to unlock it
const correctName = "Kimmy"; 

// THE CONTENT 
// I updated the filenames to match "image 1.jpeg", "image 2.jpeg", etc.
const contentData = [
    { img: "image 1.jpeg", text: "It started with a hello, but it ended up being my forever. ❤️" },
    { img: "image 2.jpeg", text: "Your smile is literally the most beautiful thing I've ever seen." },
    { img: "image 3.jpeg", text: "Every time I look at this picture, I remember how lucky I am." },
    { img: "image 4.jpeg", text: "To the adventures we've had, and the millions more to come." },
    { img: "image 5.jpeg", text: "You aren't just my girlfriend, you're my peace." },
    { img: "image 6.jpeg", text: "No matter how hard the day is, you make it worth it." },
    { img: "image 7.jpeg", text: "I love who I am when I am with you." },
    { img: "image 8.jpeg", text: "Even in a room full of art, I'd still stare at you." },
    { img: "image 9.jpeg", text: "Thank you for choosing me, every single day." },
    { img: "image 10.jpeg", text: "Happy valentine's baby" }
];

// --- LOGIN & PLAY FUNCTION ---
function attemptLogin() {
    const input = document.getElementById("username").value;
    const error = document.getElementById("error-msg");
    const loginScreen = document.getElementById("login-screen");
    const mainContent = document.getElementById("main-content");
    const music = document.getElementById("bg-music");

    // Check if the name matches (Case Insensitive)
    if (input.toLowerCase().trim() === correctName.toLowerCase()) {
        
        // 1. TRY TO PLAY MUSIC
        music.volume = 0.5; 
        music.play().catch(e => console.log("Audio play failed:", e));

        // 2. HIDE LOGIN / SHOW CONTENT
        loginScreen.style.transition = "opacity 1s ease";
        loginScreen.style.opacity = "0";
        
        setTimeout(() => {
            loginScreen.style.display = "none";
            mainContent.classList.remove("hidden");
            generateGrid(); 
        }, 1000); 

    } else {
        // WRONG NAME ANIMATION
        error.classList.remove("hidden");
        const box = loginScreen.querySelector('.login-box');
        box.style.animation = "shake 0.5s";
        setTimeout(() => box.style.animation = "", 500);
    }
}

// --- GENERATE ENVELOPES ---
function generateGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = ""; 
    
    contentData.forEach((item, index) => {
        const envelope = document.createElement("div");
        envelope.classList.add("envelope");
        envelope.style.animationDelay = `${index * 0.1}s`; 
        envelope.innerHTML = `
            <div class="flap"></div>
            <div class="body"></div>
            <span class="envelope-number">#${index + 1}</span>
        `;
        
        envelope.onclick = () => openLetter(index);
        grid.appendChild(envelope);
    });
}

// --- OPEN LETTER MODAL ---
function openLetter(index) {
    const modal = document.getElementById("letter-modal");
    const img = document.getElementById("modal-img");
    const text = document.getElementById("modal-text");
    
    img.src = contentData[index].img;
    text.innerText = contentData[index].text;
    
    modal.classList.remove("hidden");
}

// --- CLOSE LETTER MODAL ---
function closeLetter() {
    document.getElementById("letter-modal").classList.add("hidden");
}

// Allow Enter key to trigger the button click
document.getElementById("username").addEventListener("keypress", function(e) {
    if (e.key === "Enter") attemptLogin();
});

// SHAKE ANIMATION CSS INJECTION (Just in case style.css misses it)
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
}`;
document.head.appendChild(style);
