import './App.css';
import './index.css'
import React, { useState } from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [unit, setUnit] = useState('lbs/in')

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    }
    else if (unit === 'lbs/in') {
      bmi = (weight / (height * height) * 703)
    }
    else {
      let bmi = (weight / (height * height))
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
            <label>Select Unit</label>
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="lbs/in">lbs/in</option>
              <option value="kg/m">kg/m</option>
            </select>
          </div>
          <div>
            <label>Weight {unit === "lbs/in" ? "(lbs)" : "(kg)"}</label>
            <input type="text" placeholder={`Enter Weight in ${unit === 'lbs/in' ? 'pound' : 'kilogram'}`} value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height {unit === "kg/m" ? "(m)" : "(in)"}</label>
            <input type="text" placeholder={`Enter height in ${unit === "kg/m" ? "metre" : "inches"}`} value={height} onChange={(event) => setHeight(event.target.value)} />
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
