import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [unit, setUnit] = useState('imperial');

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
      return;
    } 

    let calculatedBmi=0;

    if (unit === 'imperial') {
      calculatedBmi = (weight / (height * height)) * 703; 
    } else {
      calculatedBmi = weight / (height * height); 
    }

    setBmi(calculatedBmi.toFixed(1));

      
        if (calculatedBmi < 18.5) {
          setMessage('You are underweight')
        }  else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
          setMessage('You have healthy weight')
        } else if (calculatedBmi>=25 && calculatedBmi <30) {
          setMessage('You are overweight')
        }else{
          setMessage('You are obese')
    }
  }

  let reload = () => {
    setWeight(0);
  setHeight(0);
  setBmi('');
  setMessage('');
  }

  
  return (
    <div className="app">
    <div className='container'>
      <h2 className='center'>BMI Calculator</h2>

      <div className="unit-selector">
          <label>Select Unit:</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="imperial">lbs & inches</option>
            <option value="metric">kg & meters</option>
          </select>
        </div>

        <form onSubmit={calcBmi}>
        <div>
            <label>Weight ({unit === 'imperial' ? 'lbs' : 'kg'})</label>
            <input
              type="number"
              placeholder={`Enter weight in ${unit === 'imperial' ? 'lbs' : 'kg'}`}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Height ({unit === 'imperial' ? 'inches' : 'meters'})</label>
            <input
              type="number"
              placeholder={`Enter height in ${unit === 'imperial' ? 'inches' : 'meters'}`}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
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
