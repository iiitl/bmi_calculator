import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const validateInput = (value) => {
    const num = Number(value);
    if (isNaN(num) || num <= 0) {
      return false;
    }
    return true;
  };

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    if (!validateInput(weight) || !validateInput(height)) {
      setError('Enter valid values for weight and height');
      return;
    } 
    setError('');
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

  let reload = () => {
    window.location.reload()
  }

  
  return (
    <div className="app">
    <div className='container'>
      <h2 className='center'>BMI Calculator</h2>
      {error && <div className="error-message">{error}</div>}
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input type="number" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(e.target.value) } min="1"/>
          </div>
          <div>
            <label>Height (in)</label>
            <input type="number" placeholder='Enter height in inches' value={height} onChange={(event) => setHeight(event.target.value)} min="1"/>
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
            <button className='btn btn-outline' onClick={reload} type='button'>Reload</button>
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
