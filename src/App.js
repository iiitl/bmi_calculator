import './App.css';
import './index.css';
import React, { useState } from 'react';

// Standardized constants
const CONVERSION_FACTOR = 703;
const UNDERWEIGHT_THRESHOLD = 18.5;
const HEALTHY_THRESHOLD = 25;
const OVERWEIGHT_THRESHOLD = 30;

const MESSAGES = {
  underweight: 'You are underweight',
  healthy: 'You have healthy weight',
  overweight: 'You are overweight',
  obese: 'You are obese',
};

function App() {
  // state
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  const calcBmi = (event) => {
    event.preventDefault();
    console.log(event);

    if (weight <= 0 || height <= 0) {
      alert('Please enter a valid weight and height');
      return;
    }

    // Calculate BMI using the standardized conversion factor.
    const bmiValue = (weight / (height * height)) * CONVERSION_FACTOR;
    const fixedBmi = bmiValue.toFixed(1);
    setBmi(fixedBmi);

    // Determine message based on BMI thresholds.
    const numericBmi = parseFloat(fixedBmi);
    if (numericBmi < UNDERWEIGHT_THRESHOLD) {
      setMessage(MESSAGES.underweight);
    } else if (numericBmi < HEALTHY_THRESHOLD) {
      setMessage(MESSAGES.healthy);
    } else if (numericBmi < OVERWEIGHT_THRESHOLD) {
      setMessage(MESSAGES.overweight);
    } else {
      setMessage(MESSAGES.obese);
    }
  };

  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input
              type="text"
              placeholder="Enter Weight in lbs"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input
              type="text"
              placeholder="Enter height in inches"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn btn-outline" onClick={reload} type="button">
              Reload
            </button>
          </div>
        </form>
        <div className="center">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
