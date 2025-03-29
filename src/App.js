import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [heightUnit, setHeightUnit] = useState('inches');

  let calcBmi = (event) => {
    event.preventDefault();

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
      return;
    }

    let calculatedWeight = weight;
    let calculatedHeight = height;

    if (weightUnit === 'kg') {
      calculatedWeight = weight * 2.20462;
    }

    if (heightUnit === 'cm') {
      calculatedHeight = height * 0.393701;
    } else if (heightUnit === 'metre') {
      calculatedHeight = height * 39.3701;
    }

    let bmiValue = (calculatedWeight / (calculatedHeight * calculatedHeight)) * 703;
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setMessage('You are underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage('You have healthy weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  };

  let reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="container" style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="center" style={{ marginBottom: '20px' }}>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Weight ({weightUnit})</label>
            <div style={{ display: 'flex' }}>
              <input
                type="number"
                placeholder={`Enter Weight in ${weightUnit}`}
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                style={{ flex: 1, padding: '8px', marginRight: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)} style={{ padding: '8px 6px', border: '1px solid #ccc', borderRadius: '4px', width: '80px' }}>
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Height ({heightUnit})</label>
            <div style={{ display: 'flex' }}>
              <input
                type="number"
                placeholder={`Enter height in ${heightUnit}`}
                value={height}
                onChange={(event) => setHeight(parseFloat(event.target.value))}
                style={{ flex: 1, padding: '8px', marginRight: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)} style={{ padding: '8px 6px', border: '1px solid #ccc', borderRadius: '4px', width: '80px' }}>
                <option value="inches">inches</option>
                <option value="cm">cm</option>
                <option value="metre">metre</option>
              </select>
            </div>
          </div>
          <div>
            <button className="btn" type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '8px' }}>
              Submit
            </button>
            <button className="btn btn-outline" onClick={reload} type="button" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>
              Reload
            </button>
          </div>
          <div className="center" style={{ marginTop: '20px' }}>
            <h3>Your BMI is: {bmi}</h3>
            <p>{message}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;