import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // State for values and units (default to lbs and inches)
  const [weightValue, setWeightValue] = useState('0');
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [heightValue, setHeightValue] = useState('0');
  const [heightUnit, setHeightUnit] = useState('in');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  const weightUnits = [
    { value: 'lbs', label: '(lbs)' },
    { value: 'kg', label: '(kg)' },
    { value: 'g', label: '(g)' },
    { value: 'oz', label: '(oz)' },
    { value: 'st', label: '(st)' }
  ];

  const heightUnits = [
    { value: 'in', label: '(in)' },
    { value: 'ft', label: '(ft)' },
    { value: 'cm', label: '(cm)' },
    { value: 'm', label: '(m)' },
    { value: 'dm', label: '(dm)' }
  ];

  const convertToKg = (value, unit) => {
    switch(unit) {
      case 'lbs': return value * 0.453592;
      case 'g': return value / 1000;
      case 'oz': return value * 0.0283495;
      case 'st': return value * 6.35029;
      default: return value; // kg
    }
  };

  const convertToMeters = (value, unit) => {
    switch(unit) {
      case 'in': return value * 0.0254;
      case 'ft': return value * 0.3048;
      case 'cm': return value / 100;
      case 'dm': return value / 10;
      default: return value; // meters
    }
  };

  const calcBmi = (event) => {
    event.preventDefault();
    
    const weight = parseFloat(weightValue);
    const height = parseFloat(heightValue);

    if (isNaN(weight) || weight <= 0) {
      alert('Please enter a valid weight');
      return;
    }
    if (isNaN(height) || height <= 0) {
      alert('Please enter a valid height');
      return;
    }

    // Convert to standard units (kg and meters)
    const weightKg = convertToKg(weight, weightUnit);
    const heightMeters = convertToMeters(height, heightUnit);

    const calculatedBmi = weightKg / (heightMeters * heightMeters);
    setBmi(calculatedBmi.toFixed(1));

    if (calculatedBmi < 18.5) {
      setMessage('You are underweight');
    } else if (calculatedBmi < 25) {
      setMessage('You have a healthy weight');
    } else if (calculatedBmi < 30) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  };

  const reload = () => {
    setWeightValue('');
    setHeightValue('');
    setBmi('');
    setMessage('');
  };

  return (
    <div className="app">
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        
        <form onSubmit={calcBmi}>
          <div className="input-group">
            <label>Weight</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={weightValue}
                onChange={(e) => setWeightValue(e.target.value)}
                step="any"
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
              >
                {weightUnits.map(unit => (
                  <option key={unit.value} value={unit.value}>{unit.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="input-group">
            <label>Height</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={heightValue}
                onChange={(e) => setHeightValue(e.target.value)}
                step="any"
              />
              <select
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value)}
              >
                {heightUnits.map(unit => (
                  <option key={unit.value} value={unit.value}>{unit.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="button-group">
            <button className='btn' type='submit'>Calculate BMI</button>
            <button className='btn btn-outline' onClick={reload} type='button'>Reload</button>
          </div>
        </form>
        
        {bmi && (
          <div className='center'>
            <h3>Your BMI is: {bmi}</h3>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;