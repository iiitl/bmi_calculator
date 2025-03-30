import './App.css';
import './index.css'
import React, {useState} from 'react'
import Button from './components/Button';

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const[color,setColor]=useState('')

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {
      let bmi = (weight / (height * height) * 703)
      setBmi(bmi.toFixed(1))

      
        if (bmi < 18.5) {
          setMessage('You are underweight')
          setColor('red');
        }  else if (bmi >= 18.5 && bmi < 25) {
          setMessage('You have healthy weight')
          setColor('green');
        } else if (bmi>=25 && bmi <30) {
          setMessage('You are overweight')
          setColor('yellow');
        }else{
          setMessage('You are obese')
          setColor('red');
        }
      
    }
  }

  let reload = () => {
    window.location.reload()
  }
 
  
  return (
    <div className="app">
    <div className='container'>
      <h2 className='center'>BMI CALCULATOR</h2>
        <form onSubmit={calcBmi}>
          <div className='title1'>
            <label>Weight (lbs)</label>
            <input type="text" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className='title2'>
            <label>Height (in)</label>
            <input type="text" placeholder='Enter Height in inches' value={height} onChange={(event) => setHeight(event.target.value)} />
          </div>
          <div>
            <button className='btn' type='submit' >Submit</button>
            <button className='btn btn-outline' onClick={reload} type='submit'>Reload</button>
          </div>
        </form>
        <div className='center'>
          <h3>Your BMI is: {bmi}</h3>
          <p style={{color: color}}>{message}</p>
        </div>
    </div>
  </div>
  );
}

export default App;
