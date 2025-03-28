import React, { useState } from 'react'
import './App.css';
import './index.css'

function App() {
  // State hooks for managing component data
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')

  let calcBmi = (event) => {
    
    event.preventDefault()

   
    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {
      // Bug Fix: Explicitly convert input strings to numbers
    
      let weightNum = Number(weight)
      let heightNum = Number(height)

    
      let calculatedBmi = (weightNum / (heightNum * heightNum)) * 703
      
      // Round BMI to one decimal place for display
      setBmi(calculatedBmi.toFixed(1))

      
      if (calculatedBmi < 18.5) {
        setMessage('You are underweight')
      } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
        setMessage('You have a healthy weight')
      } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
        setMessage('You are overweight')
      } else {
        setMessage('You are obese')
      }
    }
  }

  
  let reload = () => {
    window.location.reload()
  }

  return (
    <div className="app">
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input 
              // IMPROVEMENT: Change to number input for better validation
              // min="0" prevents negative inputs
              // step="0.1" allows decimal precision
              type="number" 
              placeholder='Enter Weight in lbs' 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
              min="0" 
              step="0.1"
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input 
              // IMPROVEMENT: Similar number input validation for height
              type="number" 
              placeholder='Enter height in inches' 
              value={height} 
              onChange={(event) => setHeight(event.target.value)} 
              min="0" 
              step="0.1"
            />
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
             {/* Changed button type of reload button from submit to button to avoid unintended submission  */}
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