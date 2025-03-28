import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [unitSystem, setUnitSystem] = useState('metric')

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {
      let calculatedBmi;
      if (unitSystem === 'imperial') {
        calculatedBmi = (weight / (height * height)) * 703;
      } else {
        calculatedBmi = weight / (height * height);
      }
      setBmi(calculatedBmi.toFixed(1))


        if (bmi < 18.5) {
          setMessage('You are underweight')
        }  else if (bmi >= 18.5 && bmi < 25) {
          setMessage('You have healthy weight')
        } else if (bmi>=25 && bmi <30) {
          setMessage('You are overweight')
        }else{
          setMessage('You are obese')
        }
      
    }
  }

  let reload = () => {
    window.location.reload()
  }
const handleUnitChange = (e) => {
    setUnitSystem(e.target.value);
    setWeight(0);
    setHeight(0);
    setBmi('');
    setMessage('');
  }
  
  return (
    <div className="app">
    <div className='container'>
      <h2 className='center'>BMI Calculator</h2>
      <div className="unit-selector">
          <label>
            <input
              type="radio"
              value="imperial"
              checked={unitSystem === 'imperial'}
              onChange={handleUnitChange}
            />
            Imperial (lbs, in)
          </label>
          <label>
            <input
              type="radio"
              value="metric"
              checked={unitSystem === 'metric'}
              onChange={handleUnitChange}
            />
            Metric (kg, m)
          </label>
        </div>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight ({unitSystem === 'imperial' ? 'lbs' : 'kg'})</label>
            <input type="text" placeholder={`Enter Weight in ${unitSystem === 'imperial' ? 'lbs' : 'kg'}`}  value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height ({unitSystem === 'imperial' ? 'in' : 'm'})</label>
            <input type="text" placeholder={`Enter height in ${unitSystem === 'imperial' ? 'inches' : 'meters'}`}  value={height} onChange={(event) => setHeight(event.target.value)} />
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
