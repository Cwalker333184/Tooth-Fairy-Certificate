// Confirm script loading
console.log("script.js loaded.");

// Get DOM elements
const childNameInput = document.getElementById('childNameInput');
const toothLostInput = document.getElementById('toothLostInput');
const dateLostInput = document.getElementById('dateLostInput');
const rewardInput = document.getElementById('rewardInput');
const downloadButton = document.getElementById('downloadButton');

// The clearDrawingButton and signatureCanvas elements are no longer needed
// as the signature drawing feature has been removed.
// const clearDrawingButton = document.getElementById('clearDrawingButton');
// const signatureCanvas = document.getElementById('signatureCanvas');
// const ctx = signatureCanvas ? signatureCanvas.getContext('2d') : null;

const childNameDisplay = document.getElementById('childNameDisplay');
const toothLostDisplay = document.getElementById('toothLostDisplay');
const dateLostDisplay = document.getElementById('dateLostDisplay');
const rewardDisplay = document.getElementById('rewardDisplay');
const certificateDisplay = document.getElementById('certificateDisplay');


// Removed canvas and context status logs as the canvas is no longer for drawing
// if (signatureCanvas) {
//     console.log("Signature canvas element found.");
//     console.log("Canvas dimensions: Width =", signatureCanvas.width, "Height =", signatureCanvas.height);
//     signatureCanvas.style.border = "2px dashed red"; // Temporary: make canvas border visible
//     signatureCanvas.style.zIndex = "10"; // Ensure canvas is on top
// } else {
//     console.error("Signature canvas element NOT found!");
// }

// if (ctx) {
//     console.log("Canvas 2D context obtained successfully.");
// } else {
//     console.error("Failed to get 2D context for canvas! Drawing will not work.");
// }


// let isDrawing = false; // No longer needed as drawing is removed

// --- Input Change Handlers ---
function updateCertificate() {
    console.log("updateCertificate function called.");
    console.log("Child Name Input Value:", childNameInput.value);
    console.log("Tooth Lost Input Value:", toothLostInput.value);
    console.log("Date Lost Input Value:", dateLostInput.value);
    console.log("Reward Input Value:", rewardInput.value);

    childNameDisplay.textContent = childNameInput.value || "[Child's Full Name Here]";
    toothLostDisplay.textContent = toothLostInput.value || "[e.g., First Wobbly Tooth]";
    rewardDisplay.textContent = rewardInput.value || "[e.g., A Shiny Coin / A Magical Surprise]";

    // Date formatting fix: ensure it's displayed correctly regardless of timezone
    if (dateLostInput.value) {
        const selectedDate = new Date(dateLostInput.value + 'T00:00:00'); // Force UTC midnight to avoid timezone shift
        dateLostDisplay.textContent = selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } else {
        dateLostDisplay.textContent = '[Month Day, Year]';
    }
    console.log("Certificate display updated.");
}

// Add event listeners for input changes
childNameInput.addEventListener('input', () => {
    console.log("Child Name input event fired.");
    updateCertificate();
});
toothLostInput.addEventListener('input', () => {
    console.log("Tooth Lost input event fired.");
    updateCertificate();
});
dateLostInput.addEventListener('input', () => {
    console.log("Date Lost input event fired.");
    updateCertificate();
});
rewardInput.addEventListener('input', () => {
    console.log("Reward input event fired.");
    updateCertificate();
});

// Initialize date input with today's date on load
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired.");
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    dateLostInput.value = `${year}-${month}-${day}`;
    updateCertificate(); // Call once to set initial values
});

// --- Canvas Drawing Logic (Removed as canvas is no longer for drawing) ---
// function startDrawing(event) { ... }
// function draw(event) { ... }
// function endDrawing() { ... }
// function clearDrawing() { ... }

// Removed canvas event listeners and clear button listener
// if (signatureCanvas) { ... }
// if (clearDrawingButton) { ... }


// --- Download Functionality ---
downloadButton.addEventListener('click', async () => {
    if (typeof html2canvas === 'undefined') {
        console.error("html2canvas is not loaded. Please ensure the CDN script is included in your HTML.");
        alert("Please wait a moment for the certificate generator to fully load, then try again!");
        return;
    }

    // Capture the content of the certificate display area
    const canvas = await html2canvas(certificateDisplay, {
        scale: 2, // Increase scale for better resolution
        useCORS: true,
        logging: true,
        backgroundColor: null,
    });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `Lost_Tooth_Certificate_${childNameInput.value || 'Child'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
