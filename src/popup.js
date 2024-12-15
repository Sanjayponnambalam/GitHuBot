document.getElementById("sendBtn").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value;
  const responseBox = document.getElementById("responseBox");

  if (!userInput) {
    responseBox.innerHTML = "<p>Please enter a prompt.</p>";
    return;
  }

  responseBox.innerHTML = "<p>Loading...</p>";

  try {
    // Send message to background.js to call Gemini API
    const response = await chrome.runtime.sendMessage({ prompt: userInput });

    // Safely check if response exists and contains data
    if (response && response.data) {
      responseBox.innerHTML = `<p>${response.data}</p>`;
    } else {
      responseBox.innerHTML = "<p>Received an empty or invalid response.</p>";
      console.error("Empty response:", response);
    }
  } catch (error) {
    responseBox.innerHTML = "<p>Something went wrong. Please try again.</p>";
    console.error("Error:", error);
  }
});
