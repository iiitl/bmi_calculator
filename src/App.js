import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // state
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [unit, setUnit] = useState('imperial'); 

  let calcBmi = (event) => {
    event.preventDefault();
    
    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
    } else {
      let calculatedBmi;
      if (unit === 'imperial') {
        calculatedBmi = (weight / (height * height)) * 703;
      } else {
        calculatedBmi = weight / (height * height);
      }
      
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
    }
  };

  let reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Unit System</label>
            <select className='dropdown' value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="imperial">Imperial (lbs, inches)</option>
              <option value="metric">Metric (kg, meters)</option>
            </select>
          </div>
          <div>
            <label>Weight ({unit === 'imperial' ? 'lbs' : 'kg'})</label>
            <input className='input-field' type="number" placeholder={`Enter weight in ${unit === 'imperial' ? 'lbs' : 'kg'}`} value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} />
          </div>
          <div>
            <label>Height ({unit === 'imperial' ? 'in' : 'm'})</label>
            <input className='input-field' type="number" step="any" placeholder={`Enter height in ${unit === 'imperial' ? 'in' : 'm'}`} value={height} onChange={(e) => setHeight(parseFloat(e.target.value))} />
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
            <button className='btn btn-outline' onClick={reload} type='button'>Reload</button>
          </div>
        </form>
        <div className='center result'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
