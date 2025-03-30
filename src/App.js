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

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {
      // Convert weight to kg
      let weightInKg;
      switch(weightUnit) {
        case 'kg': weightInKg = weight; break;
        case 'g': weightInKg = weight / 1000; break;
        case 'lb': weightInKg = weight * 0.453592; break;
        case 'stone': weightInKg = weight * 6.35029; break;
        default: weightInKg = weight;
      }
      let heightInM;
      switch(heightUnit) {
        case 'm': heightInM = height; break;
        case 'cm': heightInM = height / 100; break;
        case 'ft': heightInM = height * 0.3048; break;
        case 'in': heightInM = height * 0.0254; break;
        default: heightInM = height;
      }

      let bmi = weightInKg / (heightInM * heightInM);
      setBmi(bmi.toFixed(1))

      if (bmi < 18.5) {
        setMessage('You are underweight')
      } else if (bmi >= 18.5 && bmi < 25) {
        setMessage('You have healthy weight')
      } else if (bmi >= 25 && bmi < 30) {
        setMessage('You are overweight')
      } else {
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
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight</label>
            <div className="input-group">
              <input 
                type="text" 
                placeholder={`Enter weight`} 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
              />
              <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="lb">pounds</option>
                <option value="stone">stone</option>
              </select>
            </div>
          </div>
          <div>
            <label>Height</label>
            <div className="input-group">
              <input 
                type="text" 
                placeholder={`Enter height`} 
                value={height} 
                onChange={(e) => setHeight(e.target.value)} 
              />
              <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
                <option value="m">meters</option>
                <option value="cm">cm</option>
                <option value="ft">feet</option>
                <option value="in">inches</option>
              </select>
            </div>
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