import "./App.css";
import "./index.css";
import React, { useState } from "react";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("imperial"); // 'imperial' for lbs/inches, 'metric' for kg/meters
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");
  const [weightError, setWeightError] = useState("");
  const [heightError, setHeightError] = useState("");

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (value === "" || isNaN(value) || parseFloat(value) <= 0) {
      setWeightError("Please enter a valid positive number for weight.");
    } else {
      setWeightError("");
    }
    setWeight(value);
  };

  const handleHeightChange = (e) => {
    const value = e.target.value;
    if (value === "" || isNaN(value) || parseFloat(value) <= 0) {
      setHeightError("Please enter a valid positive number for height.");
    } else {
      setHeightError("");
    }
    setHeight(value);
  };

  const calcBmi = (event) => {
    event.preventDefault();

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (weightNum <= 0 || heightNum <= 0 || isNaN(weightNum) || isNaN(heightNum)) {
      setMessage("Invalid inputs. Please correct them before submitting.");
      return;
    }

    let bmiValue;
    if (unit === "imperial") {
      bmiValue = (weightNum / (heightNum * heightNum)) * 703;
    } else {
      bmiValue = weightNum / (heightNum * heightNum);
    }

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

  const reload = () => {
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
            <label>Unit System:</label>
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="imperial">Imperial (lbs, inches)</option>
              <option value="metric">Metric (kg, meters)</option>
            </select>
          </div>

          <div>
            <label>Weight ({unit === "imperial" ? "lbs" : "kg"})</label>
            <input
              type="text"
              placeholder={`Enter Weight in ${unit === "imperial" ? "lbs" : "kg"}`}
              value={weight}
              onChange={handleWeightChange}
            />
            {weightError && <p className="warning">{weightError}</p>}
          </div>

          <div>
            <label>Height ({unit === "imperial" ? "in" : "m"})</label>
            <input
              type="text"
              placeholder={`Enter Height in ${unit === "imperial" ? "inches" : "meters"}`}
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
