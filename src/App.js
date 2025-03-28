import './App.css';
import './index.css';
import React, { useState } from 'react';
import logo from './logo.png'; // Ensure this file exists in /src

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
    setError(''); // Clear previous errors
    setShowDialog(false); // Hide dialog initially

    let weightNum = parseFloat(weight);
    let heightNum = parseFloat(height);

    // Validation: Only positive numbers allowed
    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      setError('Please enter valid **positive numbers** for weight and height.');
      setShowDialog(true);
      return;
    }

    let bmiValue = (weightNum / (heightNum * heightNum)) * 703;
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setMessage('You are underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage('You have a healthy weight');
    } else {
      setMessage('You are overweight');
    }
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setBmi('');
    setMessage('');
    setError('');
    setShowDialog(false);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className='container'>
        <img src={logo} alt="BMI Logo" className="logo" />
        <h2 className='center'>BMI Calculator</h2>

        {/* Dark Mode Toggle Button */}
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
        </button>

        <form onSubmit={calcBmi}>
          <div className="input-group">
            <label>Weight (lbs)</label>
            <input
              type="number"
              placeholder="Enter Weight in lbs"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="input-group">
            <label>Height (in)</label>
            <input
              type="number"
              placeholder="Enter Height in inches"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="button-group">
            <button className="btn primary" type="submit">Submit</button>
            <button className="btn secondary" type="button" onClick={resetForm}>Reset</button>
          </div>
        </form>

        <div className='result'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>

      {/* Dialog Box for Errors */}
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
