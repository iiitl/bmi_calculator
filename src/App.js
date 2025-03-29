import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // State
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  const calcBmi = (event) => {
    event.preventDefault();

    if (!weight || !height || weight <= 0 || height <= 0) {
      alert('Please enter a valid weight and height');
      return;
    }

    let bmiValue = (weight / (height * height)) * 703;
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
              type="text"
              inputMode="decimal"
              pattern="[0-9]*"
              placeholder="Enter weight in lbs"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*"
              placeholder="Enter height in inches"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Calculate
            </button>
            <button className="btn btn-outline" type="button" onClick={reload}>
              Reset
            </button>
          </div>
        </form>
        {bmi && (
          <div className="center result-container">
            <h3>Your BMI is: {bmi}</h3>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
