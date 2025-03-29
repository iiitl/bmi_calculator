import './App.css';
import './index.css'
import React, { useState } from 'react';

function App() {
  
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [unit, setUnit] = useState('imperial'); 

  const calcBmi = (event) => {
    event.preventDefault();

    if (!weight || !height || height <= 0) {
      alert('Please enter a valid weight and height');
      return;
    }

    let bmiValue;

    if (unit === 'metric') {
    
      let heightInMeters = height / 100;
      bmiValue = weight / (heightInMeters * heightInMeters);
    } else {
      
      bmiValue = (weight / (height * height)) * 703;
    }

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

  
  const resetFields = () => {
    setWeight('');
    setHeight('');
    setBmi('');
    setMessage('');
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>

        <div className="unit-selector">
  <label>Choose Unit:</label>
  <select value={unit} onChange={(e) => setUnit(e.target.value)}>
    <option value="imperial">Imperial (lbs, in)</option>
    <option value="metric">Metric (kg, cm)</option>
  </select>
</div>


        <form onSubmit={calcBmi}>
          <div>
            <label>Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
            <input
              type="number"
              placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Height ({unit === 'metric' ? 'cm' : 'in'})</label>
            <input
              type="number"
              placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'in'}`}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Calculate BMI
            </button>
            <button className="btn btn-outline" onClick={resetFields} type="button">
              Reset
            </button>
          </div>
        </form>

        <div className="center">
          {bmi && (
            <>
              <h3>Your BMI is: {bmi}</h3>
              <p>{message}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
