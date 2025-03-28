import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  // Check localStorage for theme preference
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="app">
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <div className="container">
        <h2 className="center">Welcome!</h2>
        <input type="text" placeholder="Enter something..." />
        <button className="btn">Submit</button>
      </div>
    </div>
  );
}

export default App;
