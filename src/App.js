import './App.css';
import React, { useState } from 'react';
import logo from './logo.png'; // Ensure 'logo.png' is in 'src' folder

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const calcBmi = (event) => {
    event.preventDefault();

    let weightNum = parseFloat(weight);
    let heightNum = parseFloat(height);

    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      setError('Please enter valid positive numbers for weight and height.');
      setShowDialog(true);
      return;
    }

    let bmiValue = (weightNum / (heightNum * heightNum)) * 703;
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setMessage('You are underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage('You have a healthy weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  };

  const getMessageColor = () => {
    if (message.includes('healthy')) return 'green';
    if (message.includes('overweight')) return 'yellow';
    return 'red';
  };

  let resetForm = () => {
    setWeight('');
    setHeight('');
    setBmi('');
    setMessage('');
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className='container'>

        {/* Logo */}
        <img src={logo} alt="BMI Logo" className="logo" />

        <h2 className='center'>BMI Calculator</h2>

        {/* Floating Dark Mode Toggle */}
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        <form onSubmit={calcBmi}>
          <div className='input-group'>
            <label>Weight (lbs)</label>
            <input 
              type="number" 
              placeholder='Enter weight in lbs' 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
              min="1"
            />
          </div>
          <div className='input-group'>
            <label>Height (inches)</label>
            <input 
              type="number" 
              placeholder='Enter height in inches' 
              value={height} 
              onChange={(e) => setHeight(e.target.value)} 
              min="1"
            />
          </div>
          <div className='button-group'>
            <button className='btn primary' type='submit'>Calculate BMI</button>
            <button className='btn secondary' type='button' onClick={resetForm}>Reset</button>
          </div>
        </form>

        {bmi && (
          <div className='result'>
            <h3>Your BMI is: {bmi}</h3>
            <p style={{ color: getMessageColor() }}>{message}</p>
          </div>
        )}
      </div>

      {/* Dialog Box */}
      {showDialog && (
        <div className="dialog-box">
          <p>{error}</p>
          <button className="dialog-btn" onClick={() => setShowDialog(false)}>OK</button>
        </div>
      )}
    </div>
  );
}

export default App;
