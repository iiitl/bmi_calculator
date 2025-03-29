import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // state
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false); 

  const validateInputs = (weight, height) => {
    return !isNaN(weight) && !isNaN(height) && weight > 0 && height > 0;
  };

  let calcBmi = (event) => {
    event.preventDefault();

    if (!validateInputs(weight, height)) {
      setShowError(true);
      return;
    }

    let bmiValue = (weight / (height * height) * 703);
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setMessage('You are underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage('You have healthy weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  };

  let reload = () => {
    window.location.reload();
  };

  let closeErrorDialog = () => {
    setShowError(false);
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
              onChange={(event) => setHeight(event.target.value)}
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

    
      {/* Error Dialog */}
      {showError && (
        <div className="error-dialog">
          <div className="error-dialog-content">
            <h3 className="error-title">Oops! Invalid Input!</h3>
            <p>Please enter valid positive numbers for both weight and height.</p>
            <button className="error-close-btn" onClick={closeErrorDialog}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
