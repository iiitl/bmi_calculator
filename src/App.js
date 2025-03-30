import './App.css';
import './index.css'
import React, {useState, useEffect} from 'react'

function App() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const validateInputs = () => {
    if (weight.trim() === '' || height.trim() === '') {
      setError('Please enter both weight and height')
      return false
    }

    const weightNum = Number(weight)
    const heightNum = Number(height)

    if (isNaN(weightNum) || isNaN(heightNum)) {
      setError('Please enter a valid number for weight')
      return false
    }
   
    if (weightNum <= 0 && heightNum <= 0) {
      setError('Weight and height must be positive numbers')
      return false
    }
    if (weightNum <= 0) {
      setError('Weight must be a positive number')
      return false
    }
    if (heightNum <= 0) {
      setError('Height must be a positive number')
      return false
    }

    return true
  }

  let calcBmi = (event) => {
    event.preventDefault()
    setError(null)

    if (!validateInputs()) return

    const weightNum = Number(weight)
    const heightNum = Number(height)
    const calculatedBmi = (weightNum / (heightNum * heightNum) * 703)
    setBmi(calculatedBmi.toFixed(1))

    if (calculatedBmi < 18.5) {
      setMessage('You are underweight')
    }  else if (bmi >= 18.5 && bmi < 25) {
      setMessage('You have healthy weight')
    } else if (bmi>=25 && bmi <30) {
      setMessage('You are overweight')
    }else{
      setMessage('You are obese')
    }
  }

  let reload = () => {
    setWeight('')
    setHeight('')
    setBmi('')
    setMessage('')
    setError(null)
  }

  return (
    <div className="app">
      <div className='container'>
      <div className="header-container">
          <h2>BMI Calculator</h2>
          <div className="theme-switcher">
            {theme === 'light' ? (
              <span className="theme-label active">Light</span>
            ) : (
              <span className="theme-label active">Dark</span>
            )}
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={theme === 'dark'} 
                onChange={toggleTheme} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        {error && (
          <div className="error-dialog">
            <p>{error}</p>
            <button 
              className="btn btn-error" 
              onClick={() => setError(null)}
            >
              OK
            </button>
          </div>
        )}

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
              placeholder='Enter Height in inches' 
              value={height} 
              onChange={(e) => setHeight(e.target.value)} 
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
    </div>
  );
}

export default App;