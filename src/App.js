import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('');

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);
    if(!weight && isNaN(height)){
      setError('Please enter weight and valid height.');
      return; 
    }else if(!height && isNaN(weight)){
      setError('Please enter height and valid weight.');
      return; 
    }else if (!weight && !height) {
      setError('Please enter both weight and height.');
      return;
    } else if (!weight) {
      setError('Please enter your weight.');
      return;
    } else if (!height) {
      setError('Please enter your height.');
      return;
    } else if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      setError('Please enter valid positive numbers for weight and height.');
      return;
    } else {
      setError('');
    }
   
    let bmi = (weight / (height * height) * 703)
    setBmi(bmi.toFixed(1))

    if (bmi < 25) {
    setMessage('You are underweight')
    } else if (bmi >= 25 && bmi < 30) {
      setMessage('You have healthy weight')
    } else {
      setMessage('You are overweight')
      }
    
  }

  let reload = () => {
    window.location.reload()
  }

  
  return (
    <div className="app">
    <div className='container'>
      
      {error && (
        <div className="error-dialog">
          <p>{error}</p>
          <button onClick={() => setError('')}>Close</button>
        </div>
      )}

      <h2 className='center'>BMI Calculator</h2>
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
          {bmi && <h3>Your BMI is: {bmi}</h3>} 
          <p>{message}</p>
        </div>
    </div>
  </div>
  );
}

export default App;
