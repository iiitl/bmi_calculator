import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {

  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('m');

  
  const convertToKg = (weight, unit) => {
    return unit === 'lbs' ? weight * 0.453592 : parseFloat(weight);
  };

  const convertToMeters = (height, unit) => {
    return unit === 'in' ? height * 0.0254 : parseFloat(height);
  };


  let calcBmi = (event) => {
    event.preventDefault();

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
    } else {

      let heightInMeters = convertToMeters(height, heightUnit);


      let bmi = weightInKg / (heightInMeters * heightInMeters);
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
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
         
          <div>
            <label>Weight</label>
            <input
              type="text"
              placeholder={`Enter weight in ${weightUnit}`}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className="unit-select"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>

          
          <div>
            <label>Height</label>
            <input
              type="text"
              placeholder={`Enter height in ${heightUnit}`}
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
              className="unit-select"
            >
              <option value="m">meters</option>
              <option value="in">inches</option>
            </select>
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
