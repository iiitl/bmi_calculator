import './index.css';
import React, { useState } from 'react';

function App() {
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('m');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  const convertWeightToKg = (value, unit) => {
    if (unit === 'lbs') return value * 0.453592;
    if (unit === 'stone') return value * 6.35029;
    return value;
  };

  const convertHeightToMeters = (value, unit) => {
    if (unit === 'in') return value * 0.0254;
    if (unit === 'ft') return value * 0.3048;
    if (unit === 'cm') return value / 100;
    return value;
  };

  const calcBmi = (event) => {
    event.preventDefault();

    if (!weight || !height) {
      alert('Please enter a valid weight and height');
      return;
    }

    const weightInKg = convertWeightToKg(parseFloat(weight), weightUnit);
    const heightInMeters = convertHeightToMeters(parseFloat(height), heightUnit);

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
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
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight</label>
            <input
              type="text"
              placeholder='Enter weight'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
              <option value="stone">stone</option>
            </select>
          </div>
          <div>
            <label>Height</label>
            <input
              type="text"
              placeholder='Enter height'
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
            <button className='btn' type='submit'>Calculate</button>
            <button className='btn btn-outline' onClick={reload} type='button'>Reload</button>
          </div>
        </form>
        <div className='center'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
