import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // State
  const bmi_factor = 703; // Used for Imperial units
  const underweight_condition = 18.5;
  const healthy_condition = 24.9;
  const overweight_condition = 29.9;

  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [unit, setUnit] = useState('imperial'); // Default to Imperial

  // Toggle between Imperial and Metric
  const toggleUnit = () => {
    setUnit(unit === 'imperial' ? 'metric' : 'imperial');
    setWeight(0);
    setHeight(0);
    setBmi('');
    setMessage('');
  };

  // BMI Calculation
  const calcBmi = (event) => {
    event.preventDefault();

    if (weight === 0 || height === 0) {
      alert('Please enter valid weight and height');
      return;
    }

    let bmiValue;
    if (unit === 'imperial') {
      bmiValue = (weight / (height * height)) * bmi_factor;
    } else {
      // Metric formula: BMI = weight (kg) / (height (m)^2)
      bmiValue = weight / (height * height);
    }

    setBmi(bmiValue.toFixed(1));

    if (bmiValue < underweight_condition) {
      setMessage('You are underweight');
    } else if (bmiValue >= underweight_condition && bmiValue < healthy_condition) {
      setMessage('You have a healthy weight');
    } else if (bmiValue >= healthy_condition && bmiValue < overweight_condition) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  };

  // Reload Function
  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <button className="btn toggle-btn" onClick={toggleUnit}>
          Switch to {unit === 'imperial' ? 'Metric' : 'Imperial'}
        </button>
        <form onSubmit={calcBmi}>
          <div>
            <label>{unit === 'imperial' ? 'Weight (lbs)' : 'Weight (kg)'}</label>
            <input
              type="number"
              placeholder={unit === 'imperial' ? 'Enter Weight in lbs' : 'Enter Weight in kg'}
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              required
            />
          </div>
          <div>
            <label>{unit === 'imperial' ? 'Height (in)' : 'Height (m)'}</label>
            <input
              type="number"
              placeholder={unit === 'imperial' ? 'Enter Height in inches' : 'Enter Height in meters'}
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
              required
            />
          </div>
          <div>
            <button className="btn" type="submit">Submit</button>
            <button className="btn btn-outline" onClick={reload} type="button">Reload</button>
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
