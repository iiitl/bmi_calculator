import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
 
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [weightUnit, setWeightUnit] = useState('lbs'); 
  const [heightUnit, setHeightUnit] = useState('inches'); 


  const toggleWeightUnit = (unit) => {
    setWeightUnit(unit);
  };

  
  const toggleHeightUnit = (unit) => {
    setHeightUnit(unit);
  };

  const calcBmi = (event) => {
    event.preventDefault();

    if (weight === 0 || height === 0 || weight < 0 || height < 0) {
      alert('Please enter a valid weight and height');
      return;
    }

    let calculatedBmi;

    if (weightUnit === 'lbs' && heightUnit === 'inches') {
     
      calculatedBmi = (weight / (height * height)) * 703;
    } else if (weightUnit === 'kg' && heightUnit === 'cm') {
     
      const heightInMeters = height / 100;
      calculatedBmi = weight / (heightInMeters * heightInMeters);
    } else if (weightUnit === 'kg' && heightUnit === 'inches') {
      
      const weightInKg = weight * 0.453592;
      const heightInCm = height * 2.54;
      const heightInMeters = heightInCm / 100;
      calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
    } else if (weightUnit === 'lbs' && heightUnit === 'cm') {
      
      const weightInLbs = weight * 2.20462;
      const heightInMeters = height / 100;
      calculatedBmi = weightInLbs / (heightInMeters * heightInMeters);
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
  };

 
  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
        
          <div className="toggle-container">
            <label>Weight Unit:</label>
            <div className="toggle-buttons">
              <button
                type="button"
                className={`toggle-btn ${weightUnit === 'lbs' ? 'active' : ''}`}
                onClick={() => toggleWeightUnit('lbs')}
              >
                lbs
              </button>
              <button
                type="button"
                className={`toggle-btn ${weightUnit === 'kg' ? 'active' : ''}`}
                onClick={() => toggleWeightUnit('kg')}
              >
                kg
              </button>
            </div>
          </div>

   
          <div className="toggle-container">
            <label>Height Unit:</label>
            <div className="toggle-buttons">
              <button
                type="button"
                className={`toggle-btn ${heightUnit === 'inches' ? 'active' : ''}`}
                onClick={() => toggleHeightUnit('inches')}
              >
                inches
              </button>
              <button
                type="button"
                className={`toggle-btn ${heightUnit === 'cm' ? 'active' : ''}`}
                onClick={() => toggleHeightUnit('cm')}
              >
                cm
              </button>
            </div>
          </div>

          
          <div>
            <label>{weightUnit === 'lbs' ? 'Weight (lbs)' : 'Weight (kg)'}</label>
            <input
              type="number"
              placeholder={weightUnit === 'lbs' ? 'Enter Weight in lbs' : 'Enter Weight in kg'}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

        
          <div>
            <label>{heightUnit === 'inches' ? 'Height (inches)' : 'Height (cm)'}</label>
            <input
              type="number"
              placeholder={heightUnit === 'inches' ? 'Enter Height in inches' : 'Enter Height in cm'}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn btn-outline" onClick={reload} type="button">
              Reload
            </button>
          </div>
        </form>

        <div className="center">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}


export default App;
