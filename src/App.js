import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  const BMI_MULTIPLIER = 703;
  const UNDERWEIGHT_THRESHOLD = 18.5;
  const HEALTHY_THRESHOLD = 25;
  const OVERWEIGHT_THRESHOLD = 30;

  let calcBmi = (event) => {
    event.preventDefault();

    if (weight <= 0 || height <= 0 || !Number.isInteger(Number(height)) || !Number.isInteger(Number(weight))) {
      setError('Please enter valid positive integers for weight and height.');
      return;
    }

    setError('');
    let bmi = (weight / (height * height) * BMI_MULTIPLIER);
    setBmi(bmi.toFixed(1));

    if (bmi < UNDERWEIGHT_THRESHOLD) {
      setMessage('You are underweight');
    } else if (bmi >= UNDERWEIGHT_THRESHOLD && bmi < HEALTHY_THRESHOLD) {
      setMessage('You have healthy weight');
    } else if (bmi >= HEALTHY_THRESHOLD && bmi < OVERWEIGHT_THRESHOLD) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  }

  let reload = () => {
    window.location.reload();
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <button 
          className='btn toggle-btn' 
          onClick={() => setDarkMode(!darkMode)}
        >
        Switch Theme
        </button>
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input type="text" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height (in)</label>
            <input type="text" placeholder='Enter height in inches' value={height} onChange={(event) => setHeight(event.target.value)} />
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
            <button className='btn btn-outline' onClick={reload} type='submit'>Reload</button>
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
