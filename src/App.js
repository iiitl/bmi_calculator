import './App.css';
import './index.css';
import React, { useState,useEffect} from 'react';
function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [unit, setUnit] = useState('imperial'); 
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); 

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const calcBmi = (event) => {
    event.preventDefault();

    if (!weight || !height || weight <= 0 || height <= 0) {
      alert('⚠️ Please enter a valid weight and height.');
      return;
    }

    let bmiValue;
    if (unit === 'imperial') {
      bmiValue = (weight / (height * height)) * 703;
    } else {
      bmiValue = weight / ((height / 100) * (height / 100));
    }

    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setMessage('You are underweight 🥗');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage('You have a healthy weight ✅');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage('You are overweight ⚠️');
    } else {
      setMessage('You are obese ❗');
    }
  };

  const reload = () => {
    setWeight('');
    setHeight('');
    setBmi('');
    setMessage('');
  };

  const toggleUnit = () => {
    setUnit(unit === 'imperial' ? 'metric' : 'imperial');
    setWeight('');
    setHeight('');
    setBmi('');
    setMessage('');
  };
  const toggleTheme = () => { 
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <div className="app">
      <div className="container">
      <button className="btn-theme" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
        <button className="btn-toggle" onClick={toggleUnit}>
          Switch to {unit === 'imperial' ? 'Metric' : 'Imperial'} Units
        </button>
        <h2 className="center">🔢 BMI Calculator</h2>
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
            <label>Height ({unit === 'imperial' ? 'in' : 'cm'})</label>
            <input
              type="number"
              placeholder={`Enter height in ${unit === 'imperial' ? 'in' : 'cm'}`}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Calculate BMI
            </button>
            <button className="btn btn-outline" onClick={reload} type="button">
              Reset
            </button>
          </div>
        </form>
        {bmi && (
          <div className="result">
            <h3>Your BMI: <span>{bmi}</span></h3>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;








