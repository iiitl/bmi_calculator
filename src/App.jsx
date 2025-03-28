import './App.css';
import './index.css'
import React, { useState } from 'react';

function App() {
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('m');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  const convertToKg = (weight, unit) => {
    switch (unit) {
      case 'lbs': return weight * 0.453592; 
      default: return weight; 
    }
  };

  const convertToMeters = (height, unit) => {
    switch (unit) {
      case 'cm': return height / 100; 
      case 'in': return height * 0.0254; 
      case 'ft': return height * 0.3048; 
      default: return height; 
    }
  };

  const calcBmi = (event) => {
    event.preventDefault();

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      alert('Please enter valid positive numbers for weight and height.');
      return;
    }

    const weightInKg = convertToKg(weightNum, weightUnit);
    const heightInMeters = convertToMeters(heightNum, heightUnit);

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
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

  const resetValues = () => {
    setWeight('');
    setWeightUnit('kg');
    setHeight('');
    setHeightUnit('m');
    setBmi('');
    setMessage('');
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight</label>
            <input
              type="number"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
          <div>
            <label>Height</label>
            <input
              type="number"
              placeholder="Enter height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
              <option value="m">meters</option>
              <option value="cm">centimeters</option>
              <option value="in">inches</option>
              <option value="ft">feet</option>
            </select>
          </div>
          <div>
            <button className="btn" type="submit">Calculate</button>
            <button className="btn btn-outline" type="button" onClick={resetValues}>Reset</button>
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

