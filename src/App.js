import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [weightUnit, setWeightUnit] = useState('kg')
  const [heightUnit, setHeightUnit] = useState('cm')

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    if (!weight || !height || !weightUnit || !heightUnit) {
      alert('Please enter valid values and select units');
      return;
    }
    let weightInKg = parseFloat(weight);
    let heightInMeters = parseFloat(height);

    if (weightUnit === 'lbs') {
      weightInKg = weight * 0.453592;
    } 
    else if (weightUnit === 'g') {
      weightInKg = weight / 1000;
    }

    if (heightUnit === 'cm') {
      heightInMeters = height / 100; 
    } 
    else if (heightUnit === 'in') {
      heightInMeters = height * 0.0254; 
    }

    let bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(1));

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
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight</label>
            <input type="text" placeholder='Enter Weight' value={weight} onChange={(e) => setWeight(e.target.value)} />
            <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
              <option value="">Select Unit</option>
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
              <option value="g">g</option>
            </select>
          </div>
          <div>
            <label>Height</label>
            <input type="text" placeholder='Enter height' value={height} onChange={(event) => setHeight(event.target.value)} />
            <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
              <option value="">Select Unit</option>
              <option value="cm">cm</option>
              <option value="m">m</option>
              <option value="in">in</option>
            </select>
          </div>
          <div>
            <button className='btn' type='submit'>Calculate BMI</button>
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
