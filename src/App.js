import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // state
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [unit, setUnit] = useState('lbs/in'); // Default unit

  // BMI calculation
  let calcBmi = (event) => {
    event.preventDefault();

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
    } else {
      let bmi;
      if (unit === 'lbs/in') {
        bmi = (weight / (height * height)) * 703; // BMI in lbs/in
      } else {
        bmi = weight / (height * height); // BMI in kg/m
      }

      setBmi(bmi.toFixed(1));

      // BMI message
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

  // Reset button
  let reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          {/* Unit Selection */}
          <div>
            <label>Select Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="unit-select"
            >
              <option value="lbs/in">lbs / inches</option>
              <option value="kg/m">kg / meters</option>
            </select>
          </div>

          {/* Weight Input */}
          <div>
            <label>
              Weight ({unit === 'lbs/in' ? 'lbs' : 'kg'})
            </label>
            <input
              type="text"
              placeholder={`Enter weight in ${unit === 'lbs/in' ? 'lbs' : 'kg'}`}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {/* Height Input */}
          <div>
            <label>
              Height ({unit === 'lbs/in' ? 'in' : 'm'})
            </label>
            <input
              type="text"
              placeholder={`Enter height in ${unit === 'lbs/in' ? 'inches' : 'meters'}`}
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
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
