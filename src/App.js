import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [unit,setUnit] = useState('metric')
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {
      let calculateBmi;
      if(unit==='metric'){
        //for metric
        calculateBmi=weight/(height*height)
      }else{
        //for imperial
        calculateBmi=(weight/(height*height))*703
      }
      setBmi(calculateBmi.toFixed(1))
      if(unit==='metric'){
        if(calculateBmi<18.5){
          setMessage('You are underweight')
        }else if(calculateBmi>=18.5 && calculateBmi<24.9){
          setMessage('You have a healthy weight')
        }else{
          setMessage('You are overweight')
        }
      }else if(unit==='imperial'){
        if(calculateBmi<25){
          setMessage('You are underweight')
        }else if(calculateBmi>=25 && calculateBmi<30){
          setMessage('You have a healthy body')
        }else{
          setMessage('You are overweight')
        }
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
              <label>Select Unit System: </label>
              <select value={unit} onChange={(e)=>setUnit(e.target.value)}>
                  <option value='metric'>Metric (kg,meters)</option>
                  <option value='imperial'>Imperial (lbs,inches)</option>
              </select>
            </div>
            <br />
            <div>
              <label>
                Weight ({unit==='metric'?'kg':'lbs'})
              </label>
              <input
                type='text'
                placeholder={
                  unit==='metric'
                  ? 'Enter weight in kg'
                  : 'Enter weight in pounds'
                }
                value={weight}
                onChange={(e)=>setWeight(e.target.value)}
               />
            </div>
            <div>
              <label>
                Height ({unit==='metric'?'meters':'inches'})
              </label>
              <input
                type='text'
                placeholder={
                  unit==='metric'
                  ? 'Enter height in meters'
                  : 'Enter height in inches'
                }
                value={height}
                onChange={(e)=>setHeight(e.target.value)}
               />
            </div>

            <div>
              <button className='btn' type='submit'>
                Submit
              </button>
              <button className='btn btn-outline' onClick={reload} type='button'>
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
