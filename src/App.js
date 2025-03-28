import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // Constants for readability
  const BMI_CONVERSION_FACTOR = 703;
  const BMI_UNDERWEIGHT = 18.5;
  const BMI_HEALTHY = 25;
  const BMI_OVERWEIGHT = 30;

  // State
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  const calcBmi = (event) => {
    event.preventDefault();

    if (!weight || !height) {
      alert('Please enter a valid weight and height');
      return;
    }

    const calculatedBmi = (weight / (height * height)) * BMI_CONVERSION_FACTOR;
    const roundedBmi = calculatedBmi.toFixed(1);
    setBmi(roundedBmi);

    if (calculatedBmi < BMI_UNDERWEIGHT) {
      setMessage('You are underweight');
    } else if (calculatedBmi < BMI_HEALTHY) {
      setMessage('You have a healthy weight');
    } else if (calculatedBmi < BMI_OVERWEIGHT) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  };

  const resetForm = () => {
    setWeight(0);
    setHeight(0);
    setBmi('');
    setMessage('');
  };

  return (
    <div className="bmi-app">
      <div className='bmi-container'>
        <h2 className='bmi-title'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div className='bmi-input-group'>
            <label>Weight (lbs)</label>
            <input 
              type="text" 
              placeholder='Enter weight in lbs' 
              value={weight} 
              onChange={(e) => setWeight(Number(e.target.value))} 
            />
          </div>
          <div className='bmi-input-group'>
            <label>Height (in)</label>
            <input 
              type="text" 
              placeholder='Enter height in inches' 
              value={height} 
              onChange={(e) => setHeight(Number(e.target.value))} 
            />
          </div>
          <div className='bmi-button-group'>
            <button className='bmi-btn' type='submit'>Submit</button>
            <button className='bmi-btn bmi-btn-outline' type='button' onClick={resetForm}>Reset</button>
          </div>
        </form>
        <div className='bmi-result'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
