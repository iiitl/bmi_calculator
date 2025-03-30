import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [unit, setUnit] = useState('imperial'); 


  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {
      let bmi;
      if( unit === 'imperial')
      bmi = (weight / (height * height) * 703)
      else
      bmi = weight / (height * height);
      setBmi(bmi.toFixed(1))

      if (bmi < 18.5) {
        setMessage('You are underweight')
      } else if (bmi >= 18.5 && bmi < 25) {
        setMessage('You have healthy weight')
      } else if (bmi>=25 && bmi <30) {
        setMessage('You are overweight')
      }
      else{
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
        <div className="unit">
  <label>unit</label>
  <select value={unit} onChange={(unitt) => setUnit(unitt.target.value)}>
    <option value="imperial">Imperial (lbs, inches)</option>
    <option value="metric">Metric (kg, meters)</option>
  </select>
</div>

        <div>
  <label>Weight ({unit === 'imperial' ? 'lbs' : 'kg'})</label>
  <input 
    type="text" 
    placeholder={`Enter weight in ${unit === 'imperial' ? 'lbs' : 'kg'}`} 
    value={weight} 
    onChange={(wt) => setWeight(wt.target.value)} 
  />
</div>
<div>
  <label>Height ({unit === 'imperial' ? 'in' : 'm'})</label>
  <input 
    type="text" 
    placeholder={`Enter height in ${unit === 'imperial' ? 'inches' : 'meters'}`} 
    value={height} 
    onChange={(ht) => setHeight(ht.target.value)} 
  />
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
