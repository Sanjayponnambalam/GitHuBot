chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.prompt) {
    const apiKey = "YOUR_GEMINI_API_KEY";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    (async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message.prompt }] }],
          }),
        });

        const data = await response.json();
        console.log("API Response:", data);

        // Extract reply safely
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No valid response.";

        sendResponse({ data: reply }); // Send response back to popup.js
      } catch (error) {
        console.error("Error fetching from Gemini API:", error);
        sendResponse({ data: "Error: Unable to fetch response from the API." });
      }
    })();

    return true; // REQUIRED for async `sendResponse`
  }
});
