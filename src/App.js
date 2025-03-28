import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showDialog, setShowDialog] = useState(false); 

  const [darkMode, setDarkMode] = useState(false);

  let calcBmi = (event) => {
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
    } else {
      setMessage('You are overweight');
    }
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
        <h2 className='center'>BMI Calculator</h2>

        {/* Dark Mode Toggle Button */}
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
        </button>

        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input 
              type="number" 
              placeholder='Enter Weight in lbs' 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
              min="1"
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input 
              type="number" 
              placeholder='Enter height in inches' 
              value={height} 
              onChange={(e) => setHeight(e.target.value)} 
              min="1"
            />
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
            <button className='btn btn-outline' type='button' onClick={resetForm}>Reset</button>
          </div>
        </form>

        <div className='center'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>

      {/* dialog box  */}
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
