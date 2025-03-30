import React, { useState } from 'react';
import './App.css';
import './index.css';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('');

  const calcBmi = (event) => {
    event.preventDefault();

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      alert('Please enter a valid weight and height');
      return;
    }

    let bmiValue = (weightNum / (heightNum * heightNum)) * 703;
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setMessage('You are underweight');
      setBgColor('underweight');
    } else if (bmiValue < 25) {
      setMessage('You have a healthy weight');
      setBgColor('healthy');
    } else if (bmiValue < 30) {
      setMessage('You are overweight');
      setBgColor('overweight');
    } else {
      setMessage('You are obese');
      setBgColor('obese');
    }
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setBmi('');
    setMessage('');
    setBgColor('');
  };

  return (
    <div className="app">
    <div className={`container ${bgColor}`}>
<h2 className="center title">BMI Calculator</h2>
        <form onSubmit={calcBmi} className="form-group">
          <div className="input-group">
            <label>Weight (lbs)</label>
            <input
              type="number"
              className="input-field"
              placeholder="Enter Weight in lbs"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="1"
            />
          </div>
          <div className="input-group">
            <label>Height (in)</label>
            <input
              type="number"
              className="input-field"
              placeholder="Enter height in inches"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="1"
            />
          </div>
          <div className="button-group">
            <button className="btn primary-btn" type="submit">
              Calculate
            </button>
            <button className="btn secondary-btn" onClick={resetForm} type="button">
              Reset
            </button>
          </div>
        </form>
        <div className={`{result-section ${bgColor}`}>
          <h3 className="result-title">Your BMI Result</h3>
          <h3>Your BMI is: <span className="bmi-value">{bmi}</span></h3>
          <p className="bmi-message">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
