import './App.css';
import './index.css'
import React, { useState } from 'react'

function App() {
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [unit, setUnit] = useState('imperial')

  let calcBmi = (event) => {
    event.preventDefault()

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {
      let bmi;
      if (unit === 'imperial') {
        bmi = (weight / (height * height) * 703);
      } else {
        bmi = (weight*10000 / ((height) * (height)));
      }
      setBmi(bmi.toFixed(1))

      if (bmi < 18.5) {
        setMessage('You are underweight')
      } else if (bmi >= 18.5 && bmi < 25) {
        setMessage('You have a healthy weight')
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
          <div className="unit-selector">
            <label>Unit System:</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option value="imperial">Imperial (lbs, in)</option>
                <option value="metric">Metric (kg, m)</option>
              </select>
          </div>
          <div>
            <label>Weight ({unit === 'imperial' ? 'lbs' : 'kg'})</label>
            <input type="text" placeholder={`Enter weight in ${unit === 'imperial' ? 'lbs' : 'kg'}`} value={weight} onChange={(e) => setWeight(parseFloat(e.target.value) || 0)} />
          </div>
          <div>
            <label>Height ({unit === 'imperial' ? 'in' : 'm'})</label>
            <input type="text" placeholder={`Enter height in ${unit === 'imperial' ? 'inches' : 'meters'}`} value={height} onChange={(event) => setHeight(parseFloat(event.target.value) || 0)} />
          </div>
          <div>
            <button className='btn' type='submit'>Calculate BMI</button>
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
