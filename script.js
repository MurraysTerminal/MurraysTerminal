const outputElement = document.getElementById('output');
const userInputElement = document.getElementById('userInput');

// Matrix Animation Variables
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const fontSize = 10;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize drops for each column
for (let x = 0; x < columns; x++) {
    drops[x] = 1; // Start at 1 for each column
}

// Draw the Matrix animation
function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Fade effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff00"; // Green text color
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to the top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0; // Reset the drop
        }
        drops[i]++;
    }
}

// Start Matrix Animation
setInterval(draw, 35);

// Function to display messages in the terminal
function displayMessage(message) {
    outputElement.innerHTML += message + '<br>'; // Add message to output
    outputElement.scrollTop = outputElement.scrollHeight; // Scroll to the bottom
}

// Mock function to simulate AI responses
async function getAIResponse(userInput) {
    // Simulate an API call (replace this with an actual API call if needed)
    return new Promise((resolve) => {
        setTimeout(() => {
            const responses = [
                "That's an interesting question! Let's explore that further.",
                "AI has vast implications on society, and it's crucial we understand it.",
                "Technology continues to evolve at an unprecedented rate.",
                "Sustainability in tech is essential for our future.",
                "Collaboration drives innovation, making it vital for success."
            ];
            resolve(responses[Math.floor(Math.random() * responses.length)]);
        }, 1000); // Simulate network delay
    });
}

// User input event handling
userInputElement.addEventListener('keypress', async function (e) {
    if (e.key === 'Enter') {
        const userInput = userInputElement.value;
        displayMessage(`> ${userInput}`); // Display user input
        userInputElement.value = ''; // Clear input

        // Get AI response
        const aiResponse = await getAIResponse(userInput);
        displayMessage(`Murray: ${aiResponse}`); // Display AI response
    }
});
