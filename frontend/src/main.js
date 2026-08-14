import './style.css';

const API_BASE_URL = "http://127.0.0.1:8000";

document.querySelector('#app').innerHTML = `
  <div class="card-container">
    <div class="card">
      <h1 class="title">Ask My Notes</h1>
      <p class="subtitle">Enter a question and send it to the FastAPI backend.</p>

      <form id="ask-form">
        <label for="user-question" class="input-label">Your question</label>
        <textarea 
          id="user-question" 
          placeholder="For example: What is Docker?"
          rows="5"
          required
        ></textarea>

        <button type="submit" id="ask-btn">Ask Question</button>
      </form>

      <div id="response-box" class="response-box hidden">
        <strong>Answer:</strong>
        <p id="response-text"></p>
      </div>
    </div>
  </div>
`;

// Handle form submission
document.getElementById("ask-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const questionInput = document.getElementById("user-question");
  const responseBox = document.getElementById("response-box");
  const responseText = document.getElementById("response-text");
  const askBtn = document.getElementById("ask-btn");

  const question = questionInput.value.trim();
  if (!question) return;

  askBtn.innerText = "Asking...";
  askBtn.disabled = true;

  try {
    const response = await fetch(`${API_BASE_URL}/api/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    responseBox.classList.remove("hidden");
    responseText.innerText = data.answer || "No response received.";
  } catch (error) {
    console.error("Error asking question:", error);
    responseBox.classList.remove("hidden");
    responseText.innerText = "Failed to connect to backend.";
  } finally {
    askBtn.innerText = "Ask Question";
    askBtn.disabled = false;
  }
});