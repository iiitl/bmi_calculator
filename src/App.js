import './App.css';
import './index.css';
import React, { useState } from 'react';


const WEIGHT_PLACEHOLDER = 'Enter Weight in lbs';
const HEIGHT_PLACEHOLDER = 'Enter height in inches';
const MESSAGES = {
  UNDERWEIGHT: 'You are underweight',
  HEALTHY: 'You have a healthy weight',
  OVERWEIGHT: 'You are overweight',
  OBESE: 'You are obese',
  INVALID_INPUT: 'Please enter a valid weight and height',
};

const BMI_RANGES = {
  UNDERWEIGHT: 18.5,
  HEALTHY: 25,
  OVERWEIGHT: 30,
};

function App() {
  // State
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  
  const calcBmi = (event) => {
    event.preventDefault();

    if (weight === 0 || height === 0) {
      alert(MESSAGES.INVALID_INPUT);
    } else {
      const bmi = (weight / (height * height)) * 703;
      setBmi(bmi.toFixed(1));

      
      if (bmi < BMI_RANGES.UNDERWEIGHT) {
        setMessage(MESSAGES.UNDERWEIGHT);
      } else if (bmi >= BMI_RANGES.UNDERWEIGHT && bmi < BMI_RANGES.HEALTHY) {
        setMessage(MESSAGES.HEALTHY);
      } else if (bmi >= BMI_RANGES.HEALTHY && bmi < BMI_RANGES.OVERWEIGHT) {
        setMessage(MESSAGES.OVERWEIGHT);
      } else {
        setMessage(MESSAGES.OBESE);
      }
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
              placeholder={WEIGHT_PLACEHOLDER}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input
              type="text"
              placeholder={HEIGHT_PLACEHOLDER}
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
