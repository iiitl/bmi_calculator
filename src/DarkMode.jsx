import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    
    localStorage.setItem('darkMode', newDarkMode);
  };

  return (
    <div className="dark-mode-toggle">
      <button 
        onClick={toggleDarkMode} 
        className={`toggle-btn ${isDarkMode ? 'dark' : 'light'}`}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? (
          <Sun size={20} />
        ) : (
          <Moon size={20} />
        )}
      </button>
    </div>
  );
};

export default DarkMode;