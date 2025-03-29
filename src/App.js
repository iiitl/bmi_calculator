import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')

  // New state for unit selection
  const [weightUnit, setWeightUnit] = useState('lbs')  // options: 'lbs' or 'kg'
  const [heightUnit, setHeightUnit] = useState('in')     // options: 'in' or 'cm'

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    const weightNum = Number(weight)
    const heightNum = Number(height)
    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      alert('Please enter a valid weight and height')
    } else {
      let weightInLbs, heightInInches;
      if (weightUnit === 'kg') {
        weightInLbs = weightNum * 2.205; 
      } else {
        weightInLbs = weightNum;
      }

      if (heightUnit === 'cm') {
        heightInInches = heightNum / 2.54; 
      } else {
        heightInInches = heightNum;
      }

      let bmi = (weightInLbs / (heightInInches * heightInInches) * 703)
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
            <label>Weight ({weightUnit})</label>
            <input 
              type="text" 
              placeholder={`Enter Weight in ${weightUnit}`} 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
            />
            <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
              <option value="lbs">lbs</option>  
              <option value="kg">kg</option>
            </select>
          </div>
          <div>
            <label>Height ({heightUnit})</label>
            <input 
              type="text" 
              placeholder={`Enter height in ${heightUnit}`} 
              value={height} 
              onChange={(event) => setHeight(event.target.value)} 
            />
            <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
              <option value="in">in</option>  
              <option value="cm">cm</option>
            </select>
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
