// Get elements from the page
const voiceButton = document.getElementById('voiceButton');
const stethoscopeContainer = document.getElementById('stethoscope-container');

// Show stethoscope animation when recording starts
voiceButton.addEventListener('click', () => {
    stethoscopeContainer.style.display = 'block'; // Show the stethoscope
    console.log('Voice recording started...');

    // Simulate recording time (e.g., 5 seconds)
    setTimeout(() => {
        stethoscopeContainer.style.display = 'none'; // Hide the stethoscope
        console.log('Voice recording ended.');
    }, 5000); // Adjust timing as needed
});
// Handle Sign-In
document.getElementById('signInForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic Validation (You can improve this later)
    if (email && password) {
        alert('Sign-in successful! Welcome to Dr.Helper.');
        console.log(`Signed in with Email: ${email}, Password: ${password}`);
        // Perform additional actions here, like showing the chatbot section
        document.getElementById('chatbot').style.display = 'block';
    } else {
        alert('Please enter both email and password.');
    }
});
const chatResponse = await fetch("https://dify-api-endpoint.com/chat", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
        query: `The analysis result is: ${data.analysis}. What should the user do next?`
    })
});
const chatData = await chatResponse.json();
console.log(chatData.reply);
const cameraPreview = document.getElementById('cameraPreview');
const captureButton = document.getElementById('captureButton');
const imageCanvas = document.getElementById('imageCanvas');
const analyzeButton = document.getElementById('analyzeButton');
const analysisResult = document.getElementById('analysisResult');

// Access the user’s camera
navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    cameraPreview.srcObject = stream;
}).catch((error) => {
    console.error("Camera access error:", error);
    alert("Unable to access the camera. Please check your device settings.");
});

// Capture the image
captureButton.addEventListener('click', () => {
    const context = imageCanvas.getContext('2d');
    imageCanvas.width = cameraPreview.videoWidth;
    imageCanvas.height = cameraPreview.videoHeight;
    context.drawImage(cameraPreview, 0, 0, imageCanvas.width, imageCanvas.height);
    alert("Image captured successfully! Click 'Analyze Picture' to proceed.");
});

// Analyze the image
analyzeButton.addEventListener('click', async () => {
    const imageData = imageCanvas.toDataURL('image/png'); // Convert canvas image to data URL
    analysisResult.textContent = "Analyzing image...";

    try {
        const response = await fetch("https://your-image-analysis-api-endpoint.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer your-api-key-here`
            },
            body: JSON.stringify({ image: imageData })
        });
        const data = await response.json();

        if (data.analysis) {
            analysisResult.textContent = `Analysis Result: ${data.analysis}`;
        } else {
            analysisResult.textContent = "Could not analyze the image. Please try again.";
        }
    } catch (error) {
        console.error("Error analyzing image:", error);
        analysisResult.textContent = "An error occurred while analyzing the image.";
    }
});
