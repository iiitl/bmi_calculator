
import './App.css';
import './index.css';
import React, { useState } from 'react';
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('black');
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [heightUnit, setHeightUnit] = useState('in');
  const ToggleTheme = () => {
    setDarkMode(!darkMode);
  };
  let calcBmi = (event) => {
    event.preventDefault();
    if (weight <= 0 || height <= 0) {
    alert('Please enter a valid weight and height');
    reload();
    } else {
    let bmi;
    if (weightUnit === 'lbs' && heightUnit === 'in') {
    bmi = (weight / (height * height)) * 703;
    } else if (weightUnit === 'kg' && heightUnit === 'm') {
       bmi = weight / (height * height);
    } else if (weightUnit === 'kg' && heightUnit === 'in') {
     bmi = (weight / (height * height)) * 320;
      } else if (weightUnit === 'lbs' && heightUnit === 'm') {
    bmi = (weight / (height * height)) * 45.3592;
     } else {
    bmi = 0;
      }
  setBmi(bmi.toFixed(1));
      if (bmi < 18.5) {
    setMessageColor('red');
        setMessage('You are underweight');
      } else if (bmi >= 18.5 && bmi < 25) {
      setMessageColor('green');
     setMessage('You have healthy weight');
      } else if (bmi >= 25 && bmi < 30) {
     setMessageColor('orange');
       setMessage('You are overweight');
     } else {
       setMessageColor('red');
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
    <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className='container'>
      <button className='btn' onClick={ToggleTheme} id='theme'>
       {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
     </button>
        <h2 className='center'>BMI Calculator</h2>
    <form onSubmit={calcBmi}>
       <div>
         <label>
      <select onChange={(e) => setWeightUnit(e.target.value)} value={weightUnit}>
         <option value='lbs'>lbs</option>
      <option value='kg'>kg</option>
         </select>
        </label>
         <input
      type='number'
         placeholder={`Enter Weight in ${weightUnit}`}
        value={weight}
       onChange={(e) => setWeight(Number(e.target.value))}
         />
        </div>
          <div>
          <label>
       <select onChange={(e) => setHeightUnit(e.target.value)} value={heightUnit}>
          <option value='in'>IN</option>
        <option value='m'>m</option>
      </select>
        </label>
         <input
        type='number'
           placeholder={`Enter Height in ${heightUnit}`}
              value={height}
      onChange={(e) => setHeight(Number(e.target.value))}
           />
        </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
         <button className='btn btn-outline' onClick={reload} type='button'>Reload</button>
          </div>
        </form>
        <div className='center'>
          <h3 className='def'>Your BMI is: {bmi}</h3>
    <p style={{ color: messageColor }}>{message}</p>
        </div>
      </div>
    </div>
  );
}
export default App;
