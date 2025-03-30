import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  let calcBmi = (event) => {
    event.preventDefault();
    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
    } else {
      let bmi = weight / (height * height);
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
    <div className='app'>
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div className='input-group'>
            <label>Weight (kg)</label>
            <input
              type='number'
              placeholder='Enter weight in kg'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className='input-group'>
            <label>Height (m)</label>
            <input
              type='number'
              placeholder='Enter height in meters'
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
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
