import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')

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

  let toggle = () => {
    setTheme(!theme)
    if(theme == true){
      document.querySelector("body").style.backgroundColor = "#121212"
      document.querySelector("body").style.color = "#FFFFFF"
      document.querySelector(".container").style.backgroundColor = "#1E1E1E"
      document.querySelectorAll(".center").forEach((e) => {e.style.color = "#ffffff"})
      document.querySelector(".button").style.backgroundColor = "#fffff"
    }else{
      document.querySelector("body").style.backgroundColor = "#FFFFFF"
      document.querySelector("body").style.color = "#000000"
      document.querySelector(".container").style.backgroundColor = "#ffffff"
      document.querySelectorAll(".center").forEach((e) => {e.style.color = "#354665"})
      document.querySelector(".button").style.backgroundColor = "#ffffff"
    }
  }
  
  return (
    <div className="app">
      
    <div className='container'>
      <h2 className='center'>BMI Calculator</h2>
      <button className='btn' onClick={toggle}>{!theme ? "Dark" : "Light"} Theme</button>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input type="text" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height (in)</label>
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
