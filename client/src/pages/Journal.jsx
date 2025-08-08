import React, { useState } from "react";

export default function Journal({ onLogout }) {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");

  const addEntry = () => {
    if (text.trim()) {
      setEntries([{ text, date: new Date().toLocaleString() }, ...entries]);
      setText("");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-pink-600">My Journal</h1>
          <button
            onClick={onLogout}
            className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>
        <textarea
          placeholder="Write your thoughts..."
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          onClick={addEntry}
          className="mt-3 w-full bg-pink-400 hover:bg-pink-500 text-white p-2 rounded-lg transition"
        >
          Add Entry
        </button>
        <div className="mt-6 space-y-4">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="p-3 border rounded-lg bg-pink-50 shadow-sm"
            >
              <p className="text-sm text-gray-500">{entry.date}</p>
              <p className="mt-1">{entry.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
