import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const validateInputs = () => {
    // Check if inputs are empty
    if (weight.trim() === '' || height.trim() === '') {
      setErrorMessage('Please enter both weight and height')
      return false
    }

    // Check if inputs are numbers
    if (isNaN(weight) || isNaN(height)) {
      setErrorMessage('Please enter valid numbers for weight and height')
      return false
    }

    // Convert to numbers
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)

    // Check for zero or negative values
    if (weightNum <= 0 || heightNum <= 0) {
      if (weightNum <= 0 && heightNum <= 0) {
        setErrorMessage('Weight and height must be greater than zero')
      } else if (weightNum <= 0) {
        setErrorMessage('Weight must be greater than zero')
      } else {
        setErrorMessage('Height must be greater than zero')
      }
      return false
    }

    return true
  }

  let calcBmi = (event) => {
    event.preventDefault()
    
    if (!validateInputs()) {
      setShowErrorDialog(true)
      return
    }

    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)

    let bmiValue = (weightNum / (heightNum * heightNum)) * 703
    setBmi(bmiValue.toFixed(1))

    if (bmiValue < 18.5) {
      setMessage('You are underweight')
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage('You have healthy weight')
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage('You are overweight')
    } else {
      setMessage('You are obese')
    }
  }

  let reload = () => {
    window.location.reload()
  }

  const closeErrorDialog = () => {
    setShowErrorDialog(false)
  }

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

        {/* Error Dialog */}
        {showErrorDialog && (
          <div className="dialog-overlay">
            <div className="error-dialog">
              <h3>Invalid Input</h3>
              <p>{errorMessage}</p>
              <button 
                className="btn dialog-btn" 
                onClick={closeErrorDialog}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;