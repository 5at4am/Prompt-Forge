import { useState } from "react";
import "./App.css";

// API helper functions
const API_BASE_URL = "http://localhost:3001";

// Get or create a session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = "anonymous-" + Math.random().toString(36).substring(2, 15);
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

// Base API request function
const apiRequest = async (endpoint, method = "GET", data = null) => {
  try {
    const sessionId = getSessionId();

    const options = {
      method,
      headers: {
        Accept: "application/json",
        "X-Session-ID": sessionId,
      },
      mode: "cors",
      credentials: "include",
    };

    if (data) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(
        `Server returned ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Enhance a prompt
const enhancePrompt = async (promptText) => {
  return apiRequest("/api/prompts/enhance", "POST", { original: promptText });
};

// Get all saved prompts
const getSavedPrompts = async () => {
  return apiRequest("/api/prompts/user/my-prompts");
};

// Save a prompt
const savePrompt = async (promptData) => {
  return apiRequest("/api/prompts/save", "POST", promptData);
};

// Delete a prompt by ID
const deletePromptById = async (id) => {
  return apiRequest(`/api/prompts/${id}`, "DELETE");
};

function App() {
  const [prompt, setPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Load saved prompts from the server
  const loadSavedPrompts = async () => {
    setHistoryLoading(true);
    setError("");

    try {
      const prompts = await getSavedPrompts();
      setSavedPrompts(prompts);
    } catch (err) {
      console.error("Error loading saved prompts:", err);
      setError(`Failed to load saved prompts: ${err.message}`);
    } finally {
      setHistoryLoading(false);
    }
  };

  // Load a saved prompt
  const loadSavedPrompt = (savedPrompt) => {
    setEnhancedPrompt(savedPrompt);
    setShowHistory(false);

    // Scroll to results
    setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Delete a saved prompt
  const handleDeletePrompt = async (id, event) => {
    event.stopPropagation(); // Prevent triggering the parent click event

    try {
      await deletePromptById(id);
      // Remove from local state
      setSavedPrompts(savedPrompts.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting prompt:", err);
      setError(`Failed to delete prompt: ${err.message}`);
    }
  };

  // Toggle history view
  const toggleHistory = () => {
    if (!showHistory) {
      loadSavedPrompts();
    }
    setShowHistory(!showHistory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Use our API helper function
      const data = await enhancePrompt(prompt);
      setEnhancedPrompt(data);

      // Add to saved prompts if we're viewing them
      if (showHistory) {
        setSavedPrompts([data, ...savedPrompts]);
      }

      // Scroll to results
      setTimeout(() => {
        document
          .getElementById("results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error("Error:", err);
      setError(`Failed to enhance prompt: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>PromptForge</h1>
        <p>Transform your simple ideas into powerful AI prompts</p>
      </header>

      <main>
        <div className="controls">
          <button
            className={`history-toggle ${showHistory ? "active" : ""}`}
            onClick={toggleHistory}
          >
            {showHistory ? "Hide History" : "Show History"}
          </button>
        </div>

        {showHistory ? (
          <section className="history-section">
            <h2>Saved Prompts</h2>
            {error && <div className="error">{error}</div>}

            {historyLoading ? (
              <div className="loading">Loading saved prompts...</div>
            ) : savedPrompts.length === 0 ? (
              <div className="no-prompts">No saved prompts yet</div>
            ) : (
              <div className="saved-prompts">
                {savedPrompts.map((savedPrompt) => (
                  <div
                    key={savedPrompt.id}
                    className="saved-prompt-card"
                    onClick={() => loadSavedPrompt(savedPrompt)}
                  >
                    <div className="saved-prompt-header">
                      <h3>{savedPrompt.original}</h3>
                      <div className="saved-prompt-actions">
                        <button
                          className="delete-btn"
                          onClick={(e) => handleDeletePrompt(savedPrompt.id, e)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="saved-prompt-timestamp">
                      {new Date(savedPrompt.timestamp).toLocaleString()}
                    </div>
                    <div className="saved-prompt-preview">
                      <strong>Beginner:</strong>{" "}
                      {savedPrompt.beginner.substring(0, 100)}...
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="prompt-form">
              <h2>Enhance Your Prompt</h2>
              {error && <div className="error">{error}</div>}
              <form onSubmit={handleSubmit}>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter a simple idea like 'write about a notebook' or 'create a character description'"
                  rows={4}
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Enhancing..." : "Enhance Prompt"}
                </button>
              </form>
            </section>

            {enhancedPrompt && (
              <section id="results" className="results">
                <div className="save-controls">
                  <button
                    className="save-btn"
                    onClick={async () => {
                      try {
                        const savedPrompt = await savePrompt(enhancedPrompt);
                        setError("");
                        alert("Prompt saved successfully!");
                        // Add to saved prompts if we're viewing them
                        if (showHistory) {
                          setSavedPrompts([savedPrompt, ...savedPrompts]);
                        }
                      } catch (err) {
                        console.error("Error saving prompt:", err);
                        setError(`Failed to save prompt: ${err.message}`);
                      }
                    }}
                  >
                    Save Prompt
                  </button>
                </div>

                <div className="result-card">
                  <h3>Original Prompt</h3>
                  <p>{enhancedPrompt.original}</p>
                </div>

                <div className="result-card">
                  <h3>Beginner Version</h3>
                  <p>{enhancedPrompt.beginner}</p>
                </div>

                <div className="result-card">
                  <h3>Intermediate Version</h3>
                  <p>{enhancedPrompt.intermediate}</p>
                </div>

                <div className="result-card">
                  <h3>Expert Version</h3>
                  <p>{enhancedPrompt.advanced}</p>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <footer>
        <p>© {new Date().getFullYear()} PromptForge. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
