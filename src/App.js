import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // State for theme toggle
  const [theme, setTheme] = useState('light');
  const [bmi, setBmi] = useState(null);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const calculateBMI = (event) => {
    event.preventDefault();
    const weight = parseFloat(event.target.weight.value);
    const height = parseFloat(event.target.height.value);
    if (weight > 0 && height > 0) {
      const bmiValue = (weight / (height * height)) * 703;
      setBmi(bmiValue.toFixed(2));
    } else {
      setBmi('Invalid input');
    }
  };

  return (
    <div className={`app ${theme}-theme`}>
      <div className='container'>
        <button className='theme-toggle-btn' onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        
        <h2 className={`center bmi-title ${theme}-theme`}>BMI Calculator</h2>
        <form onSubmit={calculateBMI}>
          <div>
            <label className='contrast-text'>Weight (lbs)</label>
            <input className={`input-field ${theme}-theme`} name='weight' type='text' placeholder='Enter Weight in lbs' />
          </div>
          <div>
            <label className='contrast-text'>Height (in)</label>
            <input className={`input-field ${theme}-theme`} name='height' type='text' placeholder='Enter height in inches' />
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
            <button className='reload-btn' onClick={reloadPage}>Reload</button>
          </div>
        </form>
        {bmi && <div className={`result-box ${theme}-theme`}>Your BMI: {bmi}</div>}
      </div>
    </div>
  );
}

export default App;
