import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  // State
  const [userWeight, setUserWeight] = useState(0);
  const [userHeight, setUserHeight] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState('metric');
  const [calculatedBmi, setCalculatedBmi] = useState('');
  const [bmiMessage, setBmiMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );
  const [inputError, setInputError] = useState('');

  const spacing = {
    marginBottom: '20px',
    marginTop: '10px'
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const validateInputs = () => {
    if (userWeight <= 0 || userHeight <= 0 || isNaN(userWeight) || isNaN(userHeight)) {
      setInputError('Please enter valid positive numbers for weight and height.');
      return false;
    }
    setInputError('');
    return true;
  };

  const calcBmi = (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    let bmi;
    if (selectedUnit === 'metric') {
      bmi = userWeight / (userHeight * userHeight);
    } else {
      bmi = (userWeight / (userHeight * userHeight)) * 703;
    }
    setCalculatedBmi(bmi.toFixed(1));
    
    if (bmi < 18.5) {
      setBmiMessage('You are underweight');
    } else if (bmi >= 18.5 && bmi < 25) {
      setBmiMessage('You have a healthy weight');
    } else if (bmi >= 25 && bmi < 30) {
      setBmiMessage('You are overweight');
    } else {
      setBmiMessage('You are obese');
    }
  };

  const reload = () => {
    setUserWeight(0);
    setUserHeight(0);
    setCalculatedBmi('');
    setBmiMessage('');
    setInputError('');
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <div className='toggle-container'>
        <button className='google-btn styled-btn' onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        {inputError && <div className='error-dialog'>{inputError}</div>}
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight</label>
            <input
              type='number'
              placeholder={`Enter Weight in ${selectedUnit === 'metric' ? 'kg' : 'lbs'}`}
              value={userWeight}
              onChange={(e) => setUserWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Height</label>
            <input
              type='number'
              placeholder={`Enter Height in ${selectedUnit === 'metric' ? 'm' : 'in'}`}
              value={userHeight}
              onChange={(e) => setUserHeight(e.target.value)}
            />
          </div>
          <div className='unit-switch' style={spacing}>
            <label style={{ marginRight: '10px' }}>Unit</label>
            <select className='styled-select' value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)}>
              <option value='metric'>Metric (kg, m)</option>
              <option value='imperial'>Imperial (lbs, in)</option>
            </select>
          </div>
          <div className='button-group' style={{ marginTop: '20px' }}>
            <button className='btn primary styled-btn' type='submit'>Calculate</button>
            <button className='btn secondary styled-btn' onClick={reload} type='button'>Reset</button>
          </div>
        </form>
        <div className='center'>
          <h3>Your BMI is: {calculatedBmi}</h3>
          <p>{bmiMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
