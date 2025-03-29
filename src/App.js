import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // state
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [unitSystem, setUnitSystem] = useState('imperial'); // Default to imperial

  // Function to toggle between imperial and metric systems
  const toggleUnitSystem = (event) => {
    setUnitSystem(event.target.value);
  };

  // BMI calculation function
  const calcBmi = (event) => {
    event.preventDefault();

    if (weight === 0 || height === 0 || weight<0 || height<0) {
      alert('Please enter a valid weight and height');
      return;
    }

    let calculatedBmi;

    if (unitSystem === 'imperial') {
      // BMI formula for imperial: (weight in lbs) / (height in inches ^ 2) * 703
      calculatedBmi = (weight / (height * height)) * 703;
    } else {
      // BMI formula for metric: (weight in kg) / (height in meters ^ 2)
      const heightInMeters = height / 100;
      calculatedBmi = weight / (heightInMeters * heightInMeters);
    }

    setBmi(calculatedBmi.toFixed(1));

    if (calculatedBmi < 18.5) {
      setMessage('You are underweight');
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      setMessage('You have a healthy weight');
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  };

  // Function to reload the page
  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Select Measurement System:</label>
            <select value={unitSystem} onChange={toggleUnitSystem}>
              <option value="imperial">Imperial (lbs/inches)</option>
              <option value="metric">Metric (kg/cm)</option>
            </select>
          </div>
          <div>
            <label>{unitSystem === 'imperial' ? 'Weight (lbs)' : 'Weight (kg)'}</label>
            <input
              type="number"
              placeholder={unitSystem === 'imperial' ? 'Enter Weight in lbs' : 'Enter Weight in kg'}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>{unitSystem === 'imperial' ? 'Height (inches)' : 'Height (cm)'}</label>
            <input
              type="number"
              placeholder={unitSystem === 'imperial' ? 'Enter Height in inches' : 'Enter Height in cm'}
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
