import './App.css';
import './index.css';
import React, { useState, useEffect } from 'react';

// Constants for conversion
const CONVERSION_FACTORS = {
  lbsToKg: 0.453592,
  inToM: 0.0254,
};

const UNITS = {
  weight: ['kg', 'lbs'],
  height: ['m', 'in'],
};

function App() {
  // State
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('m');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Load theme from localStorage

  // Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = theme; // Apply theme to body class
  }, [theme]);

  // Conversion functions
  const convertToKg = (weight, unit) => {
    return unit === 'lbs' ? weight * CONVERSION_FACTORS.lbsToKg : parseFloat(weight);
  };

  const convertToMeters = (height, unit) => {
    return unit === 'in' ? height * CONVERSION_FACTORS.inToM : parseFloat(height);
  };

  // BMI Calculation
  let calcBmi = (event) => {
    event.preventDefault();

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
    } else {
      // Convert to standard units (kg & meters)
      let weightInKg = convertToKg(weight, weightUnit);
      let heightInMeters = convertToMeters(height, heightUnit);

      // BMI Formula
      let bmi = weightInKg / (heightInMeters * heightInMeters);
      setBmi(bmi.toFixed(1));

      // BMI Message
      if (bmi < 18.5) {
        setMessage('You are underweight');
      } else if (bmi >= 18.5 && bmi < 25) {
        setMessage('You have a healthy weight');
      } else if (bmi >= 25 && bmi < 30) {
        setMessage('You are overweight');
      } else {
        setMessage('You are obese');
      }
    }
  };

  // Reload Button
  let reload = () => {
    window.location.reload();
  };

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        {/* Theme Toggle Button */}
        <button className="theme-btn" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>

        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          {/* Weight Input */}
          <div>
            <label>Weight</label>
            <input
              type="text"
              placeholder={`Enter weight in ${weightUnit}`}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className="unit-select"
            >
              {UNITS.weight.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          {/* Height Input */}
          <div>
            <label>Height</label>
            <input
              type="text"
              placeholder={`Enter height in ${heightUnit}`}
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
              className="unit-select"
            >
              {UNITS.height.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn btn-outline" onClick={reload} type="button">
              Reload
            </button>
          </div>
        </form>

        {/* BMI Result */}
        <div className="center">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
