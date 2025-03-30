import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // Constants for BMI classification
  const UNDERWEIGHT = 18.5;
  const NORMAL_WEIGHT = 25;
  const OVERWEIGHT = 30;

  // State variables
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  // BMI Calculation function
  const calcBmi = (event) => {
    event.preventDefault();

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum) {
      alert('Please enter a valid weight and height');
      return;
    }

    const bmiValue = (weightNum / (heightNum * heightNum)) * 703;
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < UNDERWEIGHT) {
      setMessage('You are underweight');
    } else if (bmiValue < NORMAL_WEIGHT) {
      setMessage('You have a healthy weight');
    } else if (bmiValue < OVERWEIGHT) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  };

  // Reset function
  const resetForm = () => {
    setWeight('');
    setHeight('');
    setBmi('');
    setMessage('');
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input
              type="number"
              placeholder="Enter weight in lbs"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input
              type="number"
              placeholder="Enter height in inches"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn btn-outline" type="button" onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>
        <div className="center">
          {bmi && <h3>Your BMI is: {bmi}</h3>}
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
