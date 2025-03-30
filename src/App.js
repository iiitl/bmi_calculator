import './App.css';
import './index.css';
import React, { useState } from 'react';

const UNIT_CONVERSIONS = {
  weight: {
    lbs: 0.453592,
    grams: 0.001,
    stones: 6.35029,
    kg: 1,
  },
  height: {
    cm: 0.01,
    inches: 0.0254,
    feet: 0.3048,
    m: 1,
  }
};

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('m');

  const convertToStandard = (value, unitType, unit) => value * UNIT_CONVERSIONS[unitType][unit];

  let calcBmi = (event) => {
    event.preventDefault();

    if (!weight || !height || isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      alert('Please enter valid positive numbers for weight and height.');
      return;
    }

    const weightInKg = convertToStandard(parseFloat(weight), 'weight', weightUnit);
    const heightInMeters = convertToStandard(parseFloat(height), 'height', heightUnit);

    let calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi.toFixed(1));

    setMessage(
      calculatedBmi < 18.5 ? 'You are underweight' :
      calculatedBmi < 25 ? 'You have a healthy weight' :
      calculatedBmi < 30 ? 'You are overweight' : 'You are obese'
    );
  };

  let reload = () => {
    window.location.reload();
  };

  return (
    <div className='app'>
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div className='input-group'>
            <label>Weight</label>
            <input
              type='number'
              placeholder='Enter weight'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <select className='dropdown' value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
              {Object.keys(UNIT_CONVERSIONS.weight).map(unit => <option key={unit} value={unit}>{unit}</option>)}
            </select>
          </div>
          <div className='input-group'>
            <label>Height</label>
            <input
              type='number'
              placeholder='Enter height'
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
            <select className='dropdown' value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
              {Object.keys(UNIT_CONVERSIONS.height).map(unit => <option key={unit} value={unit}>{unit}</option>)}
            </select>
          </div>
          <div className='button-group'>
            <button className='btn' type='submit'>Submit</button>
            <button className='btn btn-outline' onClick={reload} type='button'>Reload</button>
          </div>
        </form>
        <div className='result center'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
