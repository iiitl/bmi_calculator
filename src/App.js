import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState(false);

  let calcBmi = (event) => {
    event.preventDefault();

    if (!/^\d+$/.test(weight) || !/^\d+$/.test(height) || weight <= 0 || height <= 0) {
      setAlert(true);
      return;
    }

    let bmi = (weight / (height * height) * 703);
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
          <div>
            <label>Weight (lbs)</label>
            <input
              type="text"
              placeholder='Enter Weight in lbs'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input
              type="text"
              placeholder='Enter height in inches'
              value={height}
              onChange={(e) => setHeight(e.target.value)}
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

      {/* Overlay Alert */}
      {alert && (
        <div className="overlay">
          <div className="alert-box">
            <p>Please enter valid positive integers for weight and height.</p>
            <button onClick={() => setAlert(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
