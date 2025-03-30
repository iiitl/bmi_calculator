import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  let calcBmi = (event) => {
    event.preventDefault();

    if (!weight || !height || isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      alert('Please enter valid positive numbers for weight and height.');
      return;
    }

    let calculatedBmi = (parseFloat(weight) / (parseFloat(height) * parseFloat(height))) * 703;
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
            <label>Weight (lbs)</label>
            <input
              type='number'
              placeholder='Enter weight'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className='input-group'>
            <label>Height (in)</label>
            <input
              type='number'
              placeholder='Enter height'
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
