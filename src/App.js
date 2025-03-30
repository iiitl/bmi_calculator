import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [heightUnit, setHeightUnit] = useState('in');

  const convert_to_imperial_units = (weight, w_unit, height, h_unit) => {
    let weightInLbs = weight;
    let heightInInches = height;
    if (w_unit === 'kg') {
      weightInLbs = weight * 2.20462;
    }
    if (h_unit === 'cm') {
      heightInInches = height / 2.54;
    } else if (h_unit === 'm') {
      heightInInches = height * 39.3701;
    }
    return { weightInLbs, heightInInches };
  };

  let calcBmi = (event) => {
    event.preventDefault();

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
      return;
    }

    const { weightInLbs, heightInInches } = convert_to_imperial_units(weight, weightUnit, height, heightUnit);

    let bmiValue = (weightInLbs / (heightInInches * heightInInches)) * 703;
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setMessage('You are underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage('You have a healthy weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  };

  let reload = () => {
    setWeight('');
    setHeight('');
    setBmi('');
    setMessage('');
    setWeightUnit('lbs');
    setHeightUnit('in');
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          
          <div>
            <label>Weight</label>
            <input
              type="number"
              placeholder="Enter Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value.replace(/^0+/, ''))} // Removes leading zeros
            />
            <label className="text">Select weight unit:</label>
            <select className="input-field" value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
          <div>
            <label>Height</label>
            <input
              type="number"
              placeholder="Enter Height"
              value={height}
              onChange={(e) => setHeight(e.target.value.replace(/^0+/, ''))} // Removes leading zeros
            />
            <label className="text">Select height unit:</label>
            <select className="input-field" value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
              <option value="cm">cm</option>
              <option value="m">m</option>
              <option value="in">inches</option>
            </select>
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn btn-outline" onClick={reload} type="button">
              Reload
            </button>
          </div>
        </form>
        <div className="center">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
export default App;
