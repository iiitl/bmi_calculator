import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // State variables
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  let calcBmi = (event) => {
    event.preventDefault();

    const weight_val = parseFloat(weight);
    const height_val = parseFloat(height);
    let errors = [];

    if((!weight || isNaN(weight_val) || weight_val <= 0) && (!height || isNaN(height_val) || height_val <= 0)){
      errors.push('Please enter valid values for weight and height.');
    }
    else if (!weight || isNaN(weight_val) || weight_val <= 0) {
      errors.push('Please enter a valid value for weight.');
    }
    else if (!height || isNaN(height_val) || height_val <= 0) {
      errors.push('Please enter a valid value for height.');
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join(' '));
      setShowModal(true);
      return;
    }

    let bmiValue = (weight_val / (height_val * height_val)) * 703;
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setMessage('You are underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage('You have a healthy weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  };

  let reload = () => {
    setWeight('');
    setHeight('');
    setBmi('');
    setMessage('');
  };

  return (
    <div className={`app ${showModal ? 'blur-background' : ''}`}>
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input type="number" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height (in)</label>
            <input type="number" placeholder='Enter height in inches' value={height} onChange={(e) => setHeight(e.target.value)} />
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content centered-modal">
            <h3>Input Error</h3>
            <p>{errorMessage}</p>
            <button className='btn' onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

