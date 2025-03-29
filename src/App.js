import './index.css';
import React, { useState } from 'react';

// Constants for fixed values
const BMI_MULTIPLIER = 703;
const INITIAL_WEIGHT = 0;
const INITIAL_HEIGHT = 0;
const UNDERWEIGHT_THRESHOLD = 18.5;
const HEALTHY_THRESHOLD = 25;
const OVERWEIGHT_THRESHOLD = 30;

function App() {
  // State management
  const [weight, setWeight] = useState(INITIAL_WEIGHT);
  const [height, setHeight] = useState(INITIAL_HEIGHT);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  const calculateBmi = (event) => {
    event.preventDefault();

    if (weight === INITIAL_WEIGHT || height === INITIAL_HEIGHT) {
      alert('Please enter a valid weight and height');
    } else {
      let bmiValue = (weight / (height * height)) * BMI_MULTIPLIER;
      setBmi(bmiValue.toFixed(1));

      if (bmiValue < UNDERWEIGHT_THRESHOLD) {
        setMessage('You are underweight');
      } else if (bmiValue >= UNDERWEIGHT_THRESHOLD && bmiValue < HEALTHY_THRESHOLD) {
        setMessage('You have a healthy weight');
      } else if (bmiValue >= HEALTHY_THRESHOLD && bmiValue < OVERWEIGHT_THRESHOLD) {
        setMessage('You are overweight');
      } else {
        setMessage('You are obese');
      }
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="app-wrapper">
      <div className='bmi-card'>
        <h2 className='title-text'>BMI Calculator</h2>
        <form onSubmit={calculateBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input type="text" className='input-weight' placeholder='Enter weight in lbs' value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height (in)</label>
            <input type="text" className='input-height' placeholder='Enter height in inches' value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          <div>
            <button className='submit-btn' type='submit'>Submit</button>
            <button className='reload-btn' onClick={reloadPage} type='button'>Reload</button>
          </div>
        </form>
        <div className='result-text'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;