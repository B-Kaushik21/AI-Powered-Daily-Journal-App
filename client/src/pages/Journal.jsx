import React, { useEffect, useState } from "react";
import "../styles/Journal.css";

export default function Journal({ onLogout, token }) {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/entries", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEntries(data.entries || []));

    fetch("http://localhost:5000/api/auth/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json());
  }, [token]);

  const handleAddEntry = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

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
      setEntries([...entries, data.entry]);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="journal-container">
      <div className="journal-header">
        <h2>Hello Cutie!</h2>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>

      <h3>Add a New Journal Entry</h3>
      <form className="entry-form" onSubmit={handleAddEntry}>
        <input
          type="text"
          placeholder="Entry Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="add-button">
          Add Entry
        </button>
      </form>

      <div className="entry-list">
        {entries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry._id} className="entry-card">
              <h4>{entry.title}</h4>
              <p>{entry.content}</p>
              <small>{new Date(entry.date).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
