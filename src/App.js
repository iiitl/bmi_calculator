import './App.css';
import React, { useState } from 'react';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ weight: '', height: '' });

  const calcBmi = (event) => {
    event.preventDefault();

    setErrors({ weight: '', height: '' });

    let isValid = true;

    if (!weight || isNaN(weight) || weight <= 0) {
      setErrors((prevErrors) => ({ ...prevErrors, weight: 'Please enter a valid positive number for weight.' }));
      isValid = false;
    }

    if (!height || isNaN(height) || height <= 0) {
      setErrors((prevErrors) => ({ ...prevErrors, height: 'Please enter a valid positive number for height.' }));
      isValid = false;
    }

    if (!isValid) return;

    const bmiValue = (weight / (height * height)) * 703;
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setMessage('You are underweight.');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage('You have a healthy weight.');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage('You are overweight.');
    } else {
      setMessage('You are obese.');
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
          <div className="input-group">
            <label>Weight (lbs)</label>
            <input
              type="text"
              placeholder="Enter weight in lbs"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            {errors.weight && <p className="error">{errors.weight}</p>}
          </div>
          <div className="input-group">
            <label>Height (inches)</label>
            <input
              type="text"
              placeholder="Enter height in inches"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            {errors.height && <p className="error">{errors.height}</p>}
          </div>
          <div className="button-group">
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn btn-outline" onClick={reload} type="button">
              Reload
            </button>
          </div>
        </form>

        {bmi && (
          <div className="center">
            <h3>Your BMI is: {bmi}</h3>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;