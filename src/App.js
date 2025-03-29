import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [theme, setTheme] = useState("");

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

  
  return (
    <div className={`${theme} app`}>
    <div className={`${theme} container`}>
      <h2 className={`${theme} center`}>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input className={`${theme}`} type="text" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height (in)</label>
            <input className={`${theme}`} type="text" placeholder='Enter height in inches' value={height} onChange={(event) => setHeight(event.target.value)} />
          </div>
          <div>
            <button className={`${theme} btn`} type='submit'>Submit</button>
            <button className={`${theme} btn btn-outline`} onClick={reload} type='submit'>Reload</button>
          </div>
        </form>
        <div className={`${theme} center`}>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
        <button onClick={() => {
        setTheme((prev) => {
          if (prev === "") {
            return "dark"
          }
          return ""
        })
      }}
        className={`${theme} theme-btn`}
      >
        {theme === "dark" ? "Light Mode 🌙" : "Dark Mode ☀️"}
      </button>
    </div>
  </div>
  );
}

export default App;
