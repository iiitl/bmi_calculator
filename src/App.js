import './App.css';
import './index.css'
import React, {useState, useEffect} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [text, setText]=useState('Switch To Dark Mode🌙')
  const [darkMode, setdarkMode]=useState(false)

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  let changeMode=(event)=>{
    event.preventDefault()
    setText((prevText) => (prevText === "Switch To Light Mode☀️" ? "Switch To Dark Mode🌙" : "Switch To Light Mode☀️"));
    setdarkMode((!darkMode))
  }

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
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
    <div className='container'>
    <div className='center'>
    <button className="change_mode" onClick={changeMode}>{text}</button>
    </div>
      <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label class='label'>Weight </label>
            <input type="text" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label class='label'>Height (in)</label>
            <input type="text" placeholder='Enter height in inches' value={height} onChange={(event) => setHeight(event.target.value)} />
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
            <button className='btn btn-outline' onClick={reload} type='submit'>Reload</button>
          </div>
        </form>
        <div className='center'>
          <h3>Your BMI is: {bmi}</h3>
          <p className={`output ${bmi<18.5||bmi>=30? "motu_patlu":bmi>=18.5 && bmi<25? "healthy":bmi>=25 && bmi<30? "above":""}`}>{message}</p>
        </div>
    </div>
  </div>
  );
}

export default App;
