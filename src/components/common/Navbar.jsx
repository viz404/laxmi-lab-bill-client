import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");

    setIsDarkMode(localTheme == "dark");

    if (localTheme == "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleDarkModeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  return (
    <nav className="flex justify-between p-2 items-center text-text">
      <p className="text-2xl font-bold">Shree Laxmi Dental Lab</p>
      <div className="flex gap-4 text-lg">
        <Link to="/">Jobs</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/account">Account</Link>
        <Link to="/bills">Bill</Link>
        <button onClick={handleDarkModeToggle} className="text-lg">
          {isDarkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
