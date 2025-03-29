import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [heightUnit, setHeightUnit] = useState('in');
  const convertUnits = (weight, height) => {
    let convertedWeight = weight;
    let convertedHeight = height;

    if (weightUnit === 'kg') {
      convertedWeight = weight * 2.20462;
    }

    if (heightUnit === 'm') {
      convertedHeight = height * 39.3701;
    } else if (heightUnit === 'cm') {
      convertedHeight = height * 0.393701;
    }

    return { convertedWeight, convertedHeight };
  };

  let calcBmi = (event) => {
    event.preventDefault();

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
    } else {
      const { convertedWeight, convertedHeight } = convertUnits(weight, height);
      let bmi = (convertedWeight / (convertedHeight * convertedHeight) * 703);
      setBmi(bmi.toFixed(1));
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
  let reload = () => {
    window.location.reload();
  };
  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator📱</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight</label>
            <input
              type="text"
              placeholder="Enter Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
          </div>
          <div>
            <label>Height</label>
            <input
              type="text"
              placeholder="Enter Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
              <option value="in">inches</option>
              <option value="cm">cm</option>
              <option value="m">meters</option>
            </select>
          </div>
          <div>
            <button className="btn" type="submit">Submit</button>
            <button className="btn btn-outline" onClick={reload} type="button">Reload</button>
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
