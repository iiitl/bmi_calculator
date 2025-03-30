import './App.css';
import './index.css'
import React, {useState} from 'react'

const BMI_CATEGORIES = {
  UNDERWEIGHT: { threshold: 18.5, message: 'You are underweight' },
  HEALTHY: { threshold: 25, message: 'You have healthy weight' },
  OVERWEIGHT: { threshold: 30, message: 'You are overweight' },
  OBESE: { message: 'You are obese' }
}
// Error messages
const ERROR_MESSAGES = {
  EMPTY_INPUT: 'Please enter both weight and height',
  INVALID_NUMBER: 'Please enter a valid number for weight',
  POSITIVE_NUMBER: 'Weight and height must be positive numbers',
  POSITIVE_WEIGHT: 'Weight must be a positive number',
  POSITIVE_HEIGHT: 'Height must be a positive number'
}
// Conversion factor for imperial BMI calculation
const BMI_CONVERSION_FACTOR = 703;

function App() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

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
        <h2 className='center'>BMI Calculator</h2>
        
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