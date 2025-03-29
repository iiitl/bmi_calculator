import './App.css';
import './index.css'
import React, {useState,useEffect} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')

    // State for Dark Mode
    const[darkMode,setDarkMode]=useState(()=>{
      return localStorage.getItem("theme")==="dark";
    });
    // Apply dark mode when toggled
    useEffect(()=>{
      if(darkMode){
        document.body.classList.add("dark-mode");
      }
      else{
        document.body.classList.remove("dark-mode");
      }
      localStorage.setItem("theme",darkMode?"dark":"light");
    }, [darkMode]);
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
    <div className={`app ${darkMode ?'dark-mode':''}`}>
    <div className='container'>
      <h2 className='center'>BMI Calculator</h2>
      
        {/* Dark Mode Toggle Button */}
        <button className="toggle-btn" onClick={()=>setDarkMode(!darkMode)}>
        {darkMode?"Light Mode":"Dark Mode"}
        </button>

        <form onSubmit={calcBmi}>
          <div>
            <label className="input-label">Weight (lbs)</label>
            <input type="text" className="input-field" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label className="input-label">Height (in)</label>
            <input type="text" className="input-field" placeholder='Enter height in inches' value={height} onChange={(event) => setHeight(event.target.value)} />
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
