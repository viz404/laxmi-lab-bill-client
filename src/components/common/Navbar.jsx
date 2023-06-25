import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  const handleDarkModeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="flex justify-between p-2 items-center text-text">
      <p className="text-2xl font-bold">Shree Laxmi Dental Lab</p>
      <div className="flex gap-4 text-lg">
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        <button onClick={handleDarkModeToggle} className="text-lg">
          {isDarkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
