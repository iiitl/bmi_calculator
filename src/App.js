import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // Constants for Units
  const POUNDS_IN_A_KG = 2.20462;
  const INCHES_IN_A_METER = 39.3701;

  // state
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  // Helper function for validating inputs
  const isValidInput = (weight, height) => {
    return weight > 0 && height > 0;
  };

  // BMI Calculation
  const calcBmi = (event) => {
    event.preventDefault();

    if (!isValidInput(weight, height)) {
      alert('Please enter a valid weight and height');
      return;
    }

    const weightInKg = weight / POUNDS_IN_A_KG; // Convert lbs to kg
    const heightInMeters = height / INCHES_IN_A_METER; // Convert inches to meters

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
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

  // Reload function to reset the form
  const reload = () => {
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
              placeholder="Enter Weight in lbs"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input
              type="number"
              placeholder="Enter Height in inches"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
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
