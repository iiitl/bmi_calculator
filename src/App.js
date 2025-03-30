import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // state
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const checkInput = () => {
    if (isNaN(weight) || weight <= 0) {
      return 'Please enter a valid weight';
    }
    if (isNaN(height) || height <= 0) {
      return 'Please enter a valid height';
    }
    return '';
  };

  let formDisable = ()=> {
    var form = document.querySelector("form");
    if (error != '') {
      form.querySelectorAll("input").forEach(input => input.disabled = true);
    } else if(error == ''){
      form.querySelectorAll("input").forEach(input => input.disabled = false);
    }
  }

  let formEnable = ()=> {
    var form = document.querySelector("form");
    form.querySelectorAll("input").forEach(input => input.disabled = false);
  }
  

  let calcBmi = (event) => {
    event.preventDefault();
    const errorMessage = checkInput();

    if (errorMessage) {
      setError(errorMessage);
      return;
    } else {
      setError('');
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

  return (
    <div className="app">
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input
              type="number"
              placeholder='Enter Weight in lbs'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input
              type="number"
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
        {error  && formDisable()}
        {error && (<div className="error-box">
          <p>{error}</p>
          <button onClick={() => {
            setError('');
            formEnable();
          }} >Ok</button>
        </div>
        )}
        <div className='center'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
