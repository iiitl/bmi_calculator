import './App.css';
import React, { useState } from 'react';

function App() {

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [systemMode, setSystemMode] = useState('imperial');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  // Toggle the entire system mode.
  
  const toggleSystem = () => {
    if (systemMode === 'imperial') {
      // Convert from imperial to metric:
      // lbs to kg and inches to meters.
      const weightInKg = weight ? (parseFloat(weight) / 2.20462).toFixed(2) : '';
      const heightInM = height ? (parseFloat(height) / 39.3701).toFixed(2) : '';
      setWeight(weightInKg);
      setHeight(heightInM);
      setSystemMode('metric');
    } else {
      // Convert from metric to imperial:
      // kg to lbs and meters to inches.
      const weightInLbs = weight ? (parseFloat(weight) * 2.20462).toFixed(2) : '';
      const heightInIn = height ? (parseFloat(height) * 39.3701).toFixed(2) : '';
      setWeight(weightInLbs);
      setHeight(heightInIn);
      setSystemMode('imperial');
    }
  };

  const calcBmi = (event) => {
    event.preventDefault();

    if (!weight || !height) {
      alert('Please enter a valid weight and height');
      return;
    }

    let weightInLbs;
    let heightInInches;

    if (systemMode === 'imperial') {
      weightInLbs = parseFloat(weight);
      heightInInches = parseFloat(height);
    } else {
      
      weightInLbs = parseFloat(weight) * 2.20462;
      heightInInches = parseFloat(height) * 39.3701;
    }

    
    const bmiValue = (weightInLbs / (heightInInches * heightInInches)) * 703;
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setMessage('You are underweight');
    } else if (bmiValue < 25) {
      setMessage('You have a healthy weight');
    } else if (bmiValue < 30) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  };

  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        {/* Toggle button to convert entire system */}
        <button className="toggle-btn" onClick={toggleSystem} type="button">
          Switch to {systemMode === 'imperial' ? 'Metric' : 'Imperial'}
        </button>
        <form onSubmit={calcBmi}>
          <div className="input-field">
            <label>
              Weight ({systemMode === 'imperial' ? 'lbs' : 'kg'})
            </label>
            <input
              type="number"
              placeholder={`Enter weight in ${
                systemMode === 'imperial' ? 'lbs' : 'kg'
              }`}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label>
              Height ({systemMode === 'imperial' ? 'inches' : 'meters'})
            </label>
            <input
              type="number"
              placeholder={`Enter height in ${
                systemMode === 'imperial' ? 'inches' : 'meters'
              }`}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button className="btn" type="submit">
              Calculate
            </button>
            <button className="btn btn-outline" onClick={reload} type="button">
              Reload
            </button>
          </div>
        </form>
        <div className="result center">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
