import React, { useState } from "react";
import "./App.css";
import "./index.css";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  let calcBmi = (event) => {
    event.preventDefault();

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (
      isNaN(weightNum) ||
      isNaN(heightNum) ||
      weightNum <= 0 ||
      heightNum <= 0
    ) {
      setError("Please enter valid positive numbers for weight and height.");
      setMessage("");
      setBmi();
      return;
    }

    setError("");

    let bmiValue = (weightNum / (heightNum * heightNum)) * 703;
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setMessage("You are underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage("You have a healthy weight");
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage("You are overweight");
    } else {
      setMessage("You are obese");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input
              type="text"
              placeholder="Enter weight in lbs"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input
              type="text"
              placeholder="Enter height in inches"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
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
