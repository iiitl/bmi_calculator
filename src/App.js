import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [darkmode, setMode] = useState(0)

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

  const ToggleMode = () => {
      setMode(!darkmode)
      let mode=document.querySelector(".container");
      let btn=document.querySelector("#toggle");
      let center=document.querySelector(".center");
      let id=document.querySelector("#id");
      if(darkmode){
        id.style.backgroundColor = 'white';
        id.style.color = 'black';
        mode.style.backgroundColor = 'white';
        mode.style.color = 'black';
        center.style.backgroundColor = 'white';
        center.style.color = 'black';
        btn.style.backgroundColor='blue';
        btn.style.color='white';
      }else{
        id.style.backgroundColor = 'black';
        id.style.color = 'white';
        center.style.backgroundColor = 'black';
        center.style.color = 'white';
        mode.style.backgroundColor = 'black';
        mode.style.color = 'white';
        btn.style.backgroundColor='white';
        btn.style.color='black';
      }
  }
  return (
    <div className="app">
    <div className='container'>
    <div><button id="toggle" onClick={ToggleMode}>{darkmode?'light mode' : 'dark mode'}</button></div>
      <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input type="number" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
          </div>
          <div>
            <label>Height (in)</label>
            <input type="number" placeholder='Enter height in inches' value={height} onChange={(event) => setHeight(Number(event.target.value))} />
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
            <button className='btn btn-outline' onClick={reload} type='submit'>Reload</button>
          </div>
        </form>
        <div className='center' id="id">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
    </div>
  </div>
  );
}

export default App;
