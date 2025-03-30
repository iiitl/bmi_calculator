import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [alertWeight, setWeightAlert] = useState('')
  const [alertHeight, setHeightAlert] = useState('')
  
  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);
    
    const regex = /^\d+(\.\d+)?$/;
    const weightNum = (weight !== 0) ? parseFloat(weight) : 0
    const heightNum = (height !== 0) ? parseFloat(height) : 0

    if (regex.test(weight) === true && regex.test(height) === true && weightNum !== 0 && heightNum !== 0) {
      setWeightAlert("")
      setHeightAlert("")
      let bmi = (weightNum / (heightNum * heightNum) * 703)
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
    } else {
      if ((regex.test(weight) === false || weightNum === 0) && (regex.test(height) === true && heightNum !== 0)) {
        setWeightAlert("Enter valid weight")
        setHeightAlert("")
      } else if ((regex.test(weight) === true && weightNum !== 0) && (regex.test(height) === false || heightNum === 0)) {
        setWeightAlert("")
        setHeightAlert("Enter valid height")
      } else {
          setWeightAlert("Enter valid weight")
          setHeightAlert("Enter valid height")
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
            <label>Weight (lbs)</label><span className="alert-weight" >{alertWeight}</span>
            <input type="text" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(e.target.value)} />
            
          </div>
          <div>
            <label>Height (in)</label><span className="alert-height" >{alertHeight}</span>
            <input type="text" placeholder='Enter height in inches' value={height} onChange={(event) => setHeight(event.target.value)} />
            
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
