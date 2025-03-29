import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [weightUnit, setWeightUnit] = useState('kg')
  const [heightUnit, setHeightUnit] = useState('m')

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {
      let weightInKg = weight;        
      if (weightUnit === 'g') weightInKg = weight / 1000;
      
      if (weightUnit === 'lbs') weightInKg = weight * 0.4535;
      if (weightUnit === 'oz') weightInKg = weight * 0.0283;
      if (weightUnit === 'mg') weightInKg = weight / 1000000;
      
     
      let heightInM = height;
      if (heightUnit === 'cm') heightInM = height / 100;
      if (heightUnit === 'ft') heightInM = height * 0.3048;
      if (heightUnit === 'in') heightInM = height * 0.0254;
      let bmi = (weightInKg / (heightInM * heightInM) )
      setBmi(bmi.toFixed(1))

      
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

  
  return (
    <div className="app">
    <div className='container'>
      <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight</label>
            <input type="text" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(e.target.value)} />
            <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>

              <option value="kg">Kg (Kilograms)</option>
              <option value="g">g (Grams)</option>
              <option value="lbs">lbs (Pounds)</option>
              <option value="mg">mg (Milligrams)</option>
              
              <option value="oz">oz (Ounces)</option>

            </select>
          </div>
          <div>

            <label>Height (in)</label>
            <input type="text" placeholder='Enter height in inches' value={height} onChange={(event) => setHeight(event.target.value)} />
            <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
              <option value="m">m (Meters)</option>
              
              <option value="cm">cm (Centimeters)</option>
              <option value="ft">ft (Feet)</option>
              <option value="in">in (Inches)</option>
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
