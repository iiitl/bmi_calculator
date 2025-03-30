import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [weightUnit, setWeightUnit] = useState('kg'); // Default kg
  const [heightUnit, setHeightUnit] = useState('m'); // Default meters
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);
    let weightKg = parseFloat(weight);
    let heightMeters = parseFloat(height);
    if (!weightKg || !heightMeters || weightKg <= 0 || heightMeters <= 0) {
      alert('Please enter a valid weight and height');
      return;
    }
    // Convert weight to kg if it's in lbs
    if (weightUnit === 'lbs') {
      weightKg = weightKg * 0.453592;
    }
    // Convert height to meters
    if (heightUnit === 'cm') {
      heightMeters = heightMeters / 100;
    } else if (heightUnit === 'in') {
      heightMeters = heightMeters * 0.0254;
    }
     // Calculate BMI
     let bmiValue = weightKg / (heightMeters * heightMeters);
     setBmi(bmiValue.toFixed(1));
      
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
        <form onSubmit={calcBmi}>
           {/* Weight Input */}
           <div>
            <label>Weight</label>
            <input type="number" placeholder="Enter weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
           {/* Height Input */}
           <div>
            <label>Height</label>
            <input type="number" placeholder="Enter height" value={height} onChange={(e) => setHeight(e.target.value)} />
            <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
              <option value="m">meters</option>
              <option value="cm">cm</option>
              <option value="in">inches</option>
            </select>
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
