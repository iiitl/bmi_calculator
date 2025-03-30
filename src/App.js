import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [darkMode, setDarkMode] = useState(false);
  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    if (weight === 0 || height === 0 || height <0 || weight <0) {
      alert('Please enter a valid weight and height')
    } else {
      let bmi = (weight / ((height /100)*(height /100)) )
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

  const reload = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setMessage('');
  };
  
  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
    <div className="app">
    <div className='container'>
    <div className='header'>
          <h1 className='center' style={{ display: 'inline-block', marginRight: 'auto' }}>BMI Calculator</h1>
          <button className='toggle-mode' style={{ marginLeft: 'auto' }} onClick={toggleMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
        </div>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (kg)</label>
            <input type="text" placeholder='Enter Weight in kg' value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height (cm)</label>
            <input type="text" placeholder='Enter height in cm' value={height} onChange={(event) => setHeight(event.target.value)} />
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
  </div>
  );
}

export default App;
