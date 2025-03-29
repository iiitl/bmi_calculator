import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // state variables
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('lbs'); // 'lbs' or 'kg'
  const [heightUnit, setHeightUnit] = useState('in'); // 'in' or 'm'
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  const calcBmi = (event) => {
    event.preventDefault();

    if (!weight || !height) {
      alert('Please enter a valid weight and height');
      return;
    }

    // Convert weight to lbs if necessary
    let weightInLbs = weight;
    if (weightUnit === 'kg') {
      weightInLbs = weight * 2.20462;
    }

    // Convert height to inches if necessary
    let heightInInches = height;
    if (heightUnit === 'm') {
      heightInInches = height * 39.3701;
    }

    // BMI calculation using the imperial formula: (lbs / inches²) * 703
    const bmiValue = (weightInLbs / (heightInInches * heightInInches)) * 703;
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
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div className="unit-selector">
            <div className="unit-group">
              <p>Weight Unit:</p>
              <button
                type="button"
                className={weightUnit === 'lbs' ? 'active' : ''}
                onClick={() => setWeightUnit('lbs')}
              >
                lbs
              </button>
              <button
                type="button"
                className={weightUnit === 'kg' ? 'active' : ''}
                onClick={() => setWeightUnit('kg')}
              >
                kg
              </button>
            </div>
            <div className="unit-group">
              <p>Height Unit:</p>
              <button
                type="button"
                className={heightUnit === 'in' ? 'active' : ''}
                onClick={() => setHeightUnit('in')}
              >
                Inches
              </button>
              <button
                type="button"
                className={heightUnit === 'm' ? 'active' : ''}
                onClick={() => setHeightUnit('m')}
              >
                Meters
              </button>
            </div>
          </div>
          <div className="input-field">
            <label>Weight ({weightUnit})</label>
            <input
              type="number"
              placeholder={`Enter weight in ${weightUnit}`}
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
          </div>
          <div className="input-field">
            <label>
              Height ({heightUnit === 'in' ? 'Inches' : 'Meters'})
            </label>
            <input
              type="number"
              placeholder={`Enter height in ${
                heightUnit === 'in' ? 'inches' : 'meters'
              }`}
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
            />
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
        <div className="result center">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
