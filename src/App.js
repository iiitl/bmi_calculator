import "./App.css";
import "./index.css";
import React, { useState } from "react";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");
  const [weightError, setWeightError] = useState("");
  const [heightError, setHeightError] = useState("");

  // Validate weight while typing
  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (value === "" || isNaN(value) || parseFloat(value) <= 0) {
      setWeightError("Please enter a valid positive number for weight.");
    } else {
      setWeightError("");
    }
    setWeight(value);
  };

  // Validate height while typing
  const handleHeightChange = (e) => {
    const value = e.target.value;
    if (value === "" || isNaN(value) || parseFloat(value) <= 0) {
      setHeightError("Please enter a valid positive number for height.");
    } else {
      setHeightError("");
    }
    setHeight(value);
  };

  let calcBmi = (event) => {
    event.preventDefault();

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    // Final validation before calculating BMI
    if (weightNum <= 0 || heightNum <= 0 || isNaN(weightNum) || isNaN(heightNum)) {
      setMessage("Invalid inputs. Please correct them before submitting.");
      return;
    }

    // Calculate BMI
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

  let reload = () => {
    setWeight("");
    setHeight("");
    setBmi("");
    setMessage("");
    setWeightError("");
    setHeightError("");
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input
              type="text"
              placeholder="Enter Weight in lbs"
              value={weight}
              onChange={handleWeightChange}
            />
            {weightError && <p className="warning">{weightError}</p>}
          </div>

          <div>
            <label>Height (in)</label>
            <input
              type="text"
              placeholder="Enter height in inches"
              value={height}
              onChange={handleHeightChange}
            />
            {heightError && <p className="warning">{heightError}</p>}
          </div>

          <div>
            <button className="btn" type="submit" disabled={weightError || heightError || !weight || !height}>
              Submit
            </button>
            <button className="btn btn-outline" onClick={reload} type="button">
              Reload
            </button>
          </div>
        </form>

        {bmi && (
          <div className="center">
            <h3>Your BMI is: {bmi}</h3>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
