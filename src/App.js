import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
   const [darkMode, setDarkMode] = useState(false);
   const ToggleTheme = () => {
    setDarkMode(!darkMode);
   };
   let mode=document.querySelector('#theme');
   let container=document.querySelector('.container');
   let center=document.querySelector('.center');
   let def=document.querySelector('.def');
   if( darkMode) {
    document.body.classList.add('dark-mode')
    mode.innerHTML='switch to light mode'
    container.style.backgroundColor='black'
    container.style.color='white'
 center.style.color='white'
 def.style.color='white'
    } 
  else {
      document.body.classList.remove('dark-mode')
      mode.innerHTML='switch to dark mode'
      container.style.backgroundColor='white'
      container.style.color='white'
    center.style.color='black'
     def.style.color='black'
    }

  
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [messageColor, setMessageColor] = useState('black')

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    if (weight <= 0 || height <= 0) {
      alert('Please enter a valid weight and height')
      reload()
    } else {
      let bmi = (weight / (height * height) * 703)
      setBmi(bmi.toFixed(1))

      
      if (bmi < 18.5) {
        setMessageColor('red')
        setMessage('You are underweight')
      }  else if (bmi >= 18.5 && bmi < 25) {
        setMessageColor('green')
        setMessage('You have healthy weight')
      } else if (bmi>=25 && bmi <30) {
        setMessageColor('orange')
        setMessage('You are overweight')
      }else{
        setMessageColor('red')
        setMessage('You are obese')
      }
      
    }
  }

  let reload = () => {
    window.location.reload()
  }

  
  return (
    <div className="app">
    <div className='container'>
   <div>
    
    <button className='btn' onClick={ToggleTheme} id='theme'>switch to dark mode</button> 
   </div>
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
        <div className='center' >
          <h3 class="def">Your BMI is: {bmi}</h3>
          <p style={{color: messageColor}}>{message}</p>        </div>
    </div>
  </div>
  );
}

export default App;