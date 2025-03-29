import React, { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const calcBmi = (event) => {
    event.preventDefault();
    if (!weight || !height) {
      alert("Please enter valid weight and height.");
      return;
    }
    let bmiValue = (weight / (height * height)) * 703;
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setMessage("You are underweight ❗");
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage("You have a healthy weight ✅");
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage("You are overweight ⚠️");
    } else {
      setMessage("You are obese 🚨");
    }
  };

  const reload = () => {
    setWeight("");
    setHeight("");
    setBmi("");
    setMessage("");
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <div className="container">
        <h2 className="title">BMI Calculator</h2>
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <form onSubmit={calcBmi}>
          <div className="input-group">
            <label>Weight (lbs)</label>
            <input
              type="number"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Height (in)</label>
            <input
              type="number"
              placeholder="Enter height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div className="btn-group">
            <button className="btn submit" type="submit">
              Calculate BMI
            </button>
            <button className="btn reload" onClick={reload} type="button">
              Reset
            </button>
          </div>
        </form>

        {bmi && (
          <div className="result">
            <h3>Your BMI is: <span>{bmi}</span></h3>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
