import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // state
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);  // To manage showing error dialog

  let calcBmi = (event) => {
    event.preventDefault();

    // Check if weight and height are valid positive integers
    if (!weight || !height || weight <= 0 || height <= 0 || isNaN(weight) || isNaN(height)) {
      setError('Please enter valid positive numbers for weight and height.');
      setShowError(true);  // Show error dialog
      return;
    }

    // Reset error if inputs are valid
    setError('');
    setShowError(false);

    // Calculate BMI
    let bmiValue = (weight / (height * height)) * 703;
    setBmi(bmiValue.toFixed(1));

    // BMI message
    if (bmiValue < 18.5) {
      setMessage('You are underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage('You have healthy weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  };

  let reload = () => {
    setWeight(0);
    setHeight(0);
    setBmi('');
    setMessage('');
    setError('');
    setShowError(false);  // Hide error when reloading
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        
        {/* Error Dialog Box */}
        {showError && (
          <div className="error-dialog">
            <p>{error}</p>
            <button onClick={() => setShowError(false)} className="btn">Close</button>
          </div>
        )}
        
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
