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

  const [colourClass, setClass]= useState('white');
  const [darkMode, setDarkMode] = useState(false);

  
  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {
      let weightInKg = weight;        
      if (weightUnit === 'lbs') weightInKg = weight * 0.4535;
     
      let heightInM = height;
      if (heightUnit === 'in') heightInM = height * 0.0254;
      let bmi = (weightInKg / (heightInM * heightInM) )
      

      setBmi(bmi.toFixed(1))

      
        if (bmi < 18.5) {
          setMessage('You are underweight')
          setClass('text-red')
        }  else if (bmi >= 18.5 && bmi < 25) {
          setMessage('You have healthy weight')
          setClass('text-green')
        } else if (bmi>=25 && bmi <30) {
          setMessage('You are overweight')
          setClass('text-yellow')
        }else{
          setMessage('You are obese')
          setClass('text-red')
        }
      
    }
  }

  let reload = () => {
    window.location.reload()
  }

  
  return (
    <div className={`app ${darkMode ?'dark-mode':''}`}>
      <div className="app">
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>

        


          <form onSubmit={calcBmi}>
            <div>
              <label>Weight</label>
              <input type="text" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(e.target.value)} />
              <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>

                <option value="kg">Kg (Kilograms)</option>
                <option value="lbs">lbs (Pounds)</option>

              </select>
            </div>
            <div>

              <label>Height (in)</label>
              <input type="text" placeholder='Enter height in inches' value={height} onChange={(event) => setHeight(event.target.value)} />
              <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
                <option value="m">m (Meters)</option>
                <option value="in">in (Inches)</option>
              </select>
            </div>
            <div>
              <button className='btn' type='submit'>Submit</button>
              <button className='btn btn-outline' onClick={reload} type='submit'>Reload</button>
            </div>
          </form>
          <div className='center ' >
            <h3 >Your BMI is: {bmi}</h3>
            <p className={colourClass}>{message}</p>
          </div>
          <button className='btn darkmode'onClick={()=>setDarkMode(!darkMode)}>
          {darkMode? 'Light Mode' :'Dark Mode'}
        </button>
      </div>
      
  </div>
  </div>
  );
}

export default App;
