import "./App.css";
import "./index.css";
import React, { useState, useRef } from "react";

function App() {
  // state
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");

  // constants for BMI calculation
  const UNDER_WEIGHT_BMI_LIMIT = 25;
  const HEALTHY_WEIGHT_BMI_LIMIT = 30;
  const BMI_COVERSION_FACTOR = 703;

  let calculateBmi = (event) => {
    event.preventDefault();
    console.log(event);

    if (weight === 0 || height === 0) {
      alert("Please enter a valid weight and height");
    } else {
      let bmi = (weight / (height * height)) * BMI_COVERSION_FACTOR;
      setBmi(bmi.toFixed(1));

      if (bmi < UNDER_WEIGHT_BMI_LIMIT) {
        setMessage("You are underweight");
      } else if (
        bmi >= UNDER_WEIGHT_BMI_LIMIT &&
        bmi < HEALTHY_WEIGHT_BMI_LIMIT
      ) {
        setMessage("You have healthy weight");
      } else {
        setMessage("You are overweight");
      }
    }
  };

  let reload = () => {
    window.location.reload();
  };


  const elementRef = useRef(null);

  const hideElement = () => {
    if (elementRef.current) elementRef.current.style.display = "none";
  };
  const showElement = () => {
    if(elementRef.current) elementRef.current.style.display = "block";
  }


  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calculateBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input
              type="text"
              placeholder="Enter Weight in lbs"
              value={weight}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  // Allows only whole numbers (no decimals)
                  setWeight(value);
                  hideElement();
                } else {
                  showElement();
                }
              }}
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input
              type="text"
              placeholder="Enter height in inches"
              value={height}
              onChange={(event) => {
                const value = event.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  // Allows only whole numbers (no decimals)
                  setHeight(value);
                  hideElement();
                } else {
                  showElement();
                }
              }}
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn btn-outline" onClick={reload} type="submit">
              Reload
            </button>
          </div>
        </form>
        <div className="Result">
          <div className="center">
            <h3>Your BMI is: {bmi}</h3>
            <p>{message}</p>
          </div>
          <div className="warning" ref={elementRef}>
            <h3>
            ❌You can only enter positive integers with one optional decimal
              point
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
