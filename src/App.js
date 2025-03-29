import './App.css';
import './index.css'
import React, {useState} from 'react'

function ErrorDialog({ message, onClose }) {
  return (
    <div className="error-dialog-overlay">
      <div className="error-dialog">
        <h3>Error</h3>
        <p>{message}</p>
        <button className='btn btn-error' onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    const weightNum = Number(weight)
    const heightNum = Number(height)
    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      setError('Please enter valid input for weight and height');
      return
    }

   
      let bmi = (weight / (height * height) * 703)
      setBmi(bmi.toFixed(1))

      
        if (bmi < 18.5) {
          setMessage('You are underweight')
        }  else if (bmi >= 18.5 && bmi < 25) {
          setMessage('You are normal weight')
        } else if (bmi>=25 && bmi <30) {
          setMessage('You are overweight')
        }else{
          setMessage('You are obese')
        }
      
    }
  

  let reload = () => {
    window.location.reload()
  }

  const closeErrorDialog = () => {
    setError('');
  }

  const handleToggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  
  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="dark-mode-toggle">
        <button className="btn-toggle" onClick={handleToggleDarkMode}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    <div className='container'>
      <h2 className='center'>BMI Calculator</h2>
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
            {/* <button
              className="btn btn-toggle"
              type="button"
              onClick={handleToggleDarkMode}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button> */}
          </div>
        </form>
        <div className='center'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
    </div>
    {error && <ErrorDialog message={error} onClose={closeErrorDialog} />}
  </div>
  );
}

export default App;
