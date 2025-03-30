import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('m');

  const convertToKg = (value, unit) => {
    switch (unit) {
      case 'lbs': return value * 0.453592;
      case 'grams': return value / 1000;
      case 'stones': return value * 6.35029;
      default: return value;
    }
  };

  const convertToMeters = (value, unit) => {
    switch (unit) {
      case 'cm': return value / 100;
      case 'inches': return value * 0.0254;
      case 'feet': return value * 0.3048;
      default: return value;
    }
  };

  let calcBmi = (event) => {
    event.preventDefault();

    if (!weight || !height || isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      alert('Please enter valid positive numbers for weight and height.');
      return;
    }

    const weightInKg = convertToKg(parseFloat(weight), weightUnit);
    const heightInMeters = convertToMeters(parseFloat(height), heightUnit);

    let calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi.toFixed(1));

    if (calculatedBmi < 18.5) {
      setMessage('You are underweight');
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      setMessage('You have a healthy weight');
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
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
              <option value='kg'>kg</option>
              <option value='lbs'>lbs</option>
              <option value='grams'>grams</option>
              <option value='stones'>stones</option>
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
              <option value='m'>meters</option>
              <option value='cm'>centimeters</option>
              <option value='inches'>inches</option>
              <option value='feet'>feet</option>
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
