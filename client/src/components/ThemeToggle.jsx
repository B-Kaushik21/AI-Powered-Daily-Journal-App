import React, { useEffect } from "react";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.className = savedTheme;
  }, []);

  return <button onClick={toggleTheme}>🌗 Toggle Theme</button>;
}