import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [weightUnit, setWeightUnit] = useState("lbs")
  const [heightUnit, setHeightUnit] = useState("inches")
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')

  const handleWeightUnitChange = (e) => setWeightUnit(e.target.value)
  const handleHeightUnitChange = (e) => setHeightUnit(e.target.value)
  
  let calcBmi = (event) => {
    const convertedWeight = weightUnit === "kg" ? weight * 2.205 : weight;
    const convertedHeight = heightUnit === "meters" ? height * 39.37 : height;
    event.preventDefault()
    console.log(event);

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {;
      let bmi = (convertedWeight / (convertedHeight * convertedHeight) * 703) 
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
            <label>Weight (lbs)</label>
            <input type="text" placeholder={`Enter height in ${weightUnit}`} value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <select value={weightUnit} onChange={handleWeightUnitChange}>
            <option value="lbs">lbs</option>
            <option value="kg">kg</option>
          </select>
          <div>
            <label>Height (in)</label>
            <input type="text" placeholder={`Enter height in ${heightUnit}`} value={height} onChange={(event) => setHeight(event.target.value)} />
          </div>
          <select value={heightUnit} onChange={handleHeightUnitChange}>
            <option value="inches">inches</option>
            <option value="meters">meters</option>
          </select>
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