import './App.css';
import './index.css'
import React, {useState,useRef} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const chosenSystem = useRef();

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);
    if (chosenSystem.current.value === 'Non Metric ( lbs,inches )') {
      if (weight === 0 || height === 0) {
        alert('Please enter a valid weight and height')
      } else {
        let bmi = (weight/ (height*height) * 703)
        setBmi(bmi.toFixed(1));

        if (bmi < 25) {
          setMessage('You are underweight')
        } else if (bmi >= 25 && bmi < 30) {
          setMessage('You have healthy weight')
        } else {
          setMessage('You are overweight')
        }
      }
    } else {
      if (weight === 0 || height === 0) {
        alert('Please enter a valid weight and height')
      } else {
        let bmi = (weight/ (height*height))
        setBmi(bmi.toFixed(1));
        if (bmi < 25) {
          setMessage('You are underweight')
        } else if (bmi >= 25 && bmi < 30) {
          setMessage('You have healthy weight')
        } else{
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
            <label htmlFor="system">Select the System: 
              <select id="system" ref={chosenSystem}>
                <option>Metric ( kg,metres ) </option>
                <option>Non Metric ( lbs,inches )</option>
              </select>
            </label>
          </div>
          <br></br><br></br>
          <div>
            <label>Weight</label>
            <input type="text" placeholder='Enter Weight' value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height</label>
            <input type="text" placeholder='Enter height' value={height} onChange={(event) => setHeight(event.target.value)} />
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
