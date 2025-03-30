import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app ${theme}-theme`}>
      <div className='container'>
        <button className='theme-toggle-btn' onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <h2 className='center'>BMI Calculator</h2>
        <form>
          <div>
            <label>Weight (lbs)</label>
            <input className={`input-field ${theme}-theme`} type='text' placeholder='Enter Weight in lbs' />
          </div>
          <div>
            <label>Height (in)</label>
            <input className={`input-field ${theme}-theme`} type='text' placeholder='Enter height in inches' />
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
