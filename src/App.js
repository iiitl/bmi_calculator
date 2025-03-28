import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // State for user inputs
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // BMI Calculation Function
  let calcBmi = (event) => {
    event.preventDefault();

    let weightNum = parseFloat(weight);
    let heightNum = parseFloat(height);

    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      alert('Please enter a valid weight and height');
    } else {
      let bmiValue = (weightNum / (heightNum * heightNum)) * 703;
      setBmi(bmiValue.toFixed(1));

      if (bmiValue < 18.5) {
        setMessage('You are underweight');
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setMessage('You have a healthy weight');
      } else {
        setMessage('You are overweight');
      }
    }
  };

  // Reset Function
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
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input 
              type="number" 
              placeholder='Enter height in inches' 
              value={height} 
              onChange={(e) => setHeight(e.target.value)} 
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
    </div>
  );
}

export default App;
