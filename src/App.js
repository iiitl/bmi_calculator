import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  // State
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const calcBmi = (event) => {
    event.preventDefault();
    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
    } else {
      let bmi = (weight / (height * height)) * 703;
      setBmi(bmi.toFixed(1));
      
      if (bmi < 18.5) {
        setMessage('You are underweight');
      } else if (bmi >= 18.5 && bmi < 25) {
        setMessage('You have a healthy weight');
      } else if (bmi >= 25 && bmi < 30) {
        setMessage('You are overweight');
      } else {
        setMessage('You are obese');
      }
    }
  };

  const reload = () => {
    setWeight(0);
    setHeight(0);
    setBmi('');
    setMessage('');
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className='toggle-container'>
        <button className='google-btn' onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input
              type='number'
              placeholder='Enter Weight in lbs'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input
              type='number'
              placeholder='Enter height in inches'
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className='button-group'>
            <button className='btn primary' type='submit'>Calculate</button>
            <button className='btn secondary' onClick={reload} type='button'>Reset</button>
          </div>
        </form>
        <div className='center'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
