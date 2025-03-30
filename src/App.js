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

  const convert_to_imperial_unit = (weight, height) => {
    if (unit === 'metric') {
      return {
        weight: weight * 2.20462,
        height: height * 39.3701,
      };
    }
    return { weight, height };
  };

  let calcBmi = (event) => {
    event.preventDefault();
    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
      return;
    }

    const { weight: convWeight, height: convHeight } = convert_to_imperial_unit(weight, height);
    let bmi = (convWeight / (convHeight * convHeight)) * 703;
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
  };

  let reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div class = "Unit_text">
            <label>Unit:</label>
            <select class = "input_field" value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="imperial">Imperial (lbs, inches)</option>
              <option value="metric">Metric (kg, meters)</option>
            </select>
          </div>
          <div>
            <label>Weight ({unit === 'imperial' ? 'lbs' : 'kg'})</label>
            <input type="text" placeholder='Enter weight' value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height ({unit === 'imperial' ? 'in' : 'm'})</label>
            <input type="text" placeholder='Enter height' value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
            <button className='btn btn-outline' onClick={reload} type='submit'>Reload</button>
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