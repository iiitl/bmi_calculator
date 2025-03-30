import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [heightUnit, setHeightUnit] = useState('in');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const calcBmi = (event) => {
    event.preventDefault();
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      alert('Please enter a valid numeric weight and height');
      return;
    }
    let weightInKg = weightUnit === 'lbs' ? weightNum * 0.453592 : weightNum;
    let heightInMeters = heightUnit === 'in' ? heightNum * 0.0254 : heightNum;
    let bmiValue = weightInKg / (heightInMeters * heightInMeters);
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
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div className="input-group">
            <div className="input-container">
              <label>Weight</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
            <select className="unit-dropdown" value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
          </div>

          <div className="input-group">
            <div className="input-container">
              <label>Height</label>
              <input
                type="number"
                step="0.01"
                min="0.1"
                placeholder="Enter height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </div>
            <select className="unit-dropdown" value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
              <option value="in">in</option>
              <option value="m">m</option>
            </select>
          </div>

          <div className="button-group">
            <button className="btn" type="submit">Calculate</button>
            <button className="btn btn-outline" type="button" onClick={reload}>Reset</button>
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
