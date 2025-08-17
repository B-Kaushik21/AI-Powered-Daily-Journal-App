import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.body.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDarkTheme = savedTheme === "dark";
    setIsDark(isDarkTheme);
    document.body.classList.toggle("dark", isDarkTheme);
  }, []);

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle-btn btn btn-ghost"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="theme-icon">
        {isDark ? "☀️" : "🌙"}
      </span>
      <span className="theme-text">
        {isDark ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}