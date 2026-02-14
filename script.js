// CONFIGURATION
const correctName = "Tashia"; 

// THE CONTENT (Image Number pairs with Message)
// Ensure your images are named image1.jpg, image2.jpg, etc.
const contentData = [
    { img: "image1.jpg", text: "It started with a hello, but it ended up being my forever. ❤️" },
    { img: "image2.jpg", text: "Your smile is literally the most beautiful thing I've ever seen." },
    { img: "image3.jpg", text: "Every time I look at this picture, I remember how lucky I am." },
    { img: "image4.jpg", text: "To the adventures we've had, and the millions more to come." },
    { img: "image5.jpg", text: "You aren't just my girlfriend, you're my peace." },
    { img: "image6.jpg", text: "No matter how hard the day is, you make it worth it." },
    { img: "image7.jpg", text: "I love who I am when I am with you." },
    { img: "image8.jpg", text: "Even in a room full of art, I'd still stare at you." },
    { img: "image9.jpg", text: "Thank you for choosing me, every single day." },
    { img: "image10.jpg", text: "Happy Valentine's Day, my love. You are my everything. 🌹" }
];

// --- LOGIN FUNCTION ---
function attemptLogin() {
    const input = document.getElementById("username").value;
    const error = document.getElementById("error-msg");
    const loginScreen = document.getElementById("login-screen");
    const mainContent = document.getElementById("main-content");
    const music = document.getElementById("bg-music");

    if (input.toLowerCase().includes(correctName.toLowerCase())) {
        // Success
        loginScreen.style.display = "none";
        mainContent.classList.remove("hidden");
        music.play();
        generateGrid(); // Create the envelopes
    } else {
        error.classList.remove("hidden");
    }
}

// --- GENERATE ENVELOPES ---
function generateGrid() {
    const grid = document.getElementById("grid");
    
    contentData.forEach((item, index) => {
        const envelope = document.createElement("div");
        envelope.classList.add("envelope");
        envelope.innerHTML = `<span class="envelope-number">#${index + 1}</span>`;
        
        // Add click event to open specific letter
        envelope.onclick = () => openLetter(index);
        
        grid.appendChild(envelope);
    });
}

// --- OPEN LETTER MODAL ---
function openLetter(index) {
    const modal = document.getElementById("letter-modal");
    const img = document.getElementById("modal-img");
    const text = document.getElementById("modal-text");
    
    // Set content
    img.src = contentData[index].img;
    text.innerText = contentData[index].text;
    
    // Show modal
    modal.classList.remove("hidden");
}

// --- CLOSE LETTER MODAL ---
function closeLetter() {
    document.getElementById("letter-modal").classList.add("hidden");
}

// Allow Enter key for login
document.getElementById("username").addEventListener("keypress", function(e) {
    if (e.key === "Enter") attemptLogin();
});
