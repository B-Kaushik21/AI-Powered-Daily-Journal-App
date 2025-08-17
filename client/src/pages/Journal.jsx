import React, { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import AIChatbot from "../components/AIChatbot";
import "../styles/Journal.css";

export default function Journal({ onLogout, token }) {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/entries", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEntries(data.entries || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch entries:", err);
        setIsLoading(false);
      });
  }, [token]);

  const handleAddEntry = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const response = await fetch("http://localhost:5000/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (response.ok) {
        setEntries([data.entry, ...entries]);
        setTitle("");
        setContent("");
        setError("");
      } else {
        setError(data.message || "Failed to add entry");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong");
    }
  };

  const getRandomEmoji = () => {
    const emojis = ["✨", "🌸", "💫", "🎀", "💖", "🌟", "🍀", "🎈", "💕", "🎪"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div className="journal-page">
      <ThemeToggle />
      <div className="journal-container fade-in">
        <div className="journal-header">
          <div className="header-content">
            <h1 className="welcome-title">
              Hello Cutie! {getRandomEmoji()}
            </h1>
            <p className="welcome-subtitle">Ready to capture your beautiful thoughts?</p>
          </div>
          <button onClick={onLogout} className="btn btn-danger logout-btn">
            <span>👋</span> Logout
          </button>
        </div>

        <div className="entry-form-section card slide-up">
          <h3 className="section-title">
            <span>✍️</span> New Journal Entry
          </h3>
          <form className="entry-form" onSubmit={handleAddEntry}>
            <div className="input-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                className="input"
                placeholder="Give your entry a beautiful title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="content">Your Thoughts</label>
              <textarea
                id="content"
                className="textarea"
                placeholder="What's on your mind today? Share your thoughts, dreams, or anything that makes you smile... 💭"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary submit-btn">
              <span>💫</span> Add Entry
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>

        <div className="entries-section">
          <h3 className="section-title">
            <span>📖</span> Your Journal Entries
          </h3>
          
          {isLoading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading your beautiful memories...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="empty-state card">
              <div className="empty-icon">📝</div>
              <h4>No entries yet</h4>
              <p>Start your journaling journey by adding your first entry above!</p>
            </div>
          ) : (
            <div className="entries-grid">
              {entries.map((entry, index) => (
                <div 
                  key={entry._id} 
                  className="entry-card card bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="entry-header">
                    <h4 className="entry-title">{entry.title}</h4>
                    <span className="entry-date">{formatDate(entry.date)}</span>
                  </div>
                  <p className="entry-content">{entry.content}</p>
                  <div className="entry-footer">
                    <span className="entry-emoji">{getRandomEmoji()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <AIChatbot token={token} />
    </div>
  );
}
