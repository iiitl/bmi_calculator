import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // state
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [unitSystem, setUnitSystem] = useState('imperial'); // 'imperial' or 'metric'

  let calcBmi = (event) => {
    event.preventDefault();
    
    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
      return;
    }

    let calculatedBmi;
    
    if (unitSystem === 'metric') {
      // Metric calculation (kg and m)
      const heightInMeters = height / 100; // convert cm to m
      calculatedBmi = weight / (heightInMeters * heightInMeters);
    } else {
      // Original imperial calculation
      calculatedBmi = (weight / (height * height)) * 703;
    }

    setBmi(calculatedBmi.toFixed(1));

    if (calculatedBmi < 18.5) {
      setMessage('You are underweight');
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      setMessage('You have healthy weight');
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
    <div className="app">
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        
        <div className="unit-selector">
          <select 
            value={unitSystem}
            onChange={(e) => setUnitSystem(e.target.value)}
          >
            <option value="imperial">Imperial (lbs, inches)</option>
            <option value="metric">Metric (kg, cm)</option>
          </select>
        </div>

        <form onSubmit={calcBmi}>
          <div>
            <label>Weight ({unitSystem === 'imperial' ? 'lbs' : 'kg'})</label>
            <input 
              type="text" 
              placeholder={`Enter Weight in ${unitSystem === 'imperial' ? 'lbs' : 'kg'}`} 
              value={weight} 
              onChange={(e) => setWeight(parseFloat(e.target.value) || 0)} 
            />
          </div>
          <div>
            <label>Height ({unitSystem === 'imperial' ? 'inches' : 'cm'})</label>
            <input 
              type="text" 
              placeholder={`Enter height in ${unitSystem === 'imperial' ? 'inches' : 'cm'}`} 
              value={height} 
              onChange={(e) => setHeight(parseFloat(e.target.value) || 0)} 
            />
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
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