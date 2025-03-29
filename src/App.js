import './App.css';
import './index.css'
import React, { useState } from 'react';

function App() {
  // state
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  let calcBmi = (event) => {
    event.preventDefault();
    
    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
    } else {
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
    }
  };

  let reload = () => {
    setWeight(0);
    setHeight(0);
    setBmi('');
    setMessage('');
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <button className='theme-toggle' onClick={() => setDarkMode(!darkMode)}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input type="number" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(parseFloat(e.target.value) || 0)} />
          </div>
          <div>
            <label>Height (in)</label>
            <input type="number" placeholder='Enter height in inches' value={height} onChange={(event) => setHeight(parseFloat(event.target.value) || 0)} />
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
