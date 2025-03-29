import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [heightUnit, setHeightUnit] = useState('in');
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    let weightVal = parseFloat(weight);
    let heightVal = parseFloat(height);

    if (weightUnit === 'kg') {
      weightVal = weightVal * 2.20462; 
    }

    if (heightUnit === 'm') {
      heightVal = heightVal * 39.3701; 
    } 

    if (weightVal === 0 || heightVal === 0) {
      alert('Please enter a valid weight and height')
    } else {
      let bmi = (weightVal / (heightVal * heightVal) * 703)
      setBmi(bmi.toFixed(1))

      if (bmi < 18.5) {
        setMessage('You are underweight')
      } else if (bmi >= 18.5 && bmi < 25) {
        setMessage('You have healthy weight')
      } else if (bmi >= 25 && bmi < 30) {
        setMessage('You are overweight');
      } else {
        setMessage('You are obese');
      }
    }
  }

  let reload = () => {
    window.location.reload()
  }

 

   
  
  return (
    <div className="app">
    <div className='container'>
      <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div className="inside_dv" >
            <label>Weight </label>
            <input type="text" placeholder='Enter Weight ' value={weight} onChange={(e) => setWeight(e.target.value)} />

            <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
            
          </div>
          <div className="inside_dv">
            <label>Height </label>
            <input type="text" placeholder='Enter height ' value={height} onChange={(event) => setHeight(event.target.value)} />

            <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
              <option value="in">inches</option>
              <option value="m">meters</option>
            </select>

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

