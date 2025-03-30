import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')

  const validateInputs = () => {
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)

    if (isNaN(weightNum) || weightNum <= 0) { 
      setDialogMessage('Please enter a valid weight (must be a positive number)') 
      return false
    }
    if (isNaN(heightNum) || heightNum <= 0) {
      setDialogMessage('Please enter a valid height (must be a positive number)')
      return false
    }

    return true
  }

  let calcBmi = (event) => {
    event.preventDefault()
    if (!validateInputs()) {
      setShowDialog(true)
      return
    }
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)
    let bmi = (weightNum / (heightNum * heightNum)) * 703
    setBmi(bmi.toFixed(1))

    if (bmi < 18.5) {
      setMessage('You are underweight')
    } else if (bmi >= 18.5 && bmi < 25) {
      setMessage('You have healthy weight')
    } else if (bmi >= 25 && bmi < 30) {
      setMessage('You are overweight')
    } else {
      setMessage('You are obese')
    }
  }

  let reload = () => {
    setWeight('')
    setHeight('')
    setBmi('')
    setMessage('')
  }

  const closeDialog = () => {
    setShowDialog(false)
  }

  return (
    <div className='app'>
      
      {showDialog && (
        <div className='dialog-overlay'>
          <div className='dialog-box'>
            <div className='dialog-header'>
              <h3>Input Error</h3>
            </div>
            <div className='dialog-content'>
              <p>{dialogMessage}</p>
            </div>
            <div className='dialog-footer'>
              <button className='btn' onClick={closeDialog}>OK</button>
            </div>
          </div>
        </div>
      )}

      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input
              type="text" 
              placeholder="lbs" 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input
              type="text"
              placeholder="inches"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
          </div>
          <div>
            <button
              className='btn'
              type='submit'
              style={{ marginRight: '10px', padding: '10px 20px' }}
            >
              Submit
            </button>
            <button
              className='btn btn-outline'
              onClick={reload}
              type='button' 
              style={{ padding: '10px 20px' }}
            >
              Reload
            </button>
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