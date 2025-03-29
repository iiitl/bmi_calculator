import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [isErrorHeight, SetIserrorheight] = useState(false);
  const [iserrorweight, SetIserrorweight] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleWeight = () => {
    if(isNaN(weight)) SetIserrorheight(true);
    else if(weight < 0) SetIserrorheight(true);
    else SetIserrorheight(false);
  }
  const handleHeight = () => {
    if(isNaN(height)) SetIserrorweight(true);
    else if(height < 0) SetIserrorweight(true);
    else SetIserrorweight(false);
  }
  
  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);    
    setShowDialog(isErrorHeight || iserrorweight);
    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {
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
  }

  let reload = () => {
    window.location.reload()
  }

  const dialogStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
  };
  
  const buttonStyles = {
    marginTop: "10px",
    padding: "5px 15px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };
  
  const closeDialog = () => {
    setShowDialog(false); 
  };

  
  return (
    <div className="app">
    <div className='container'>
    {showDialog && (
        <div style={dialogStyles}>
          <p>Enter a valid positive number!</p>
          <button onClick={closeDialog} style={buttonStyles}>
            OK
          </button>
        </div>
      )}
      <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input type="text" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => {setWeight(e.target.value); handleWeight()}} />
          </div>
          <div>
            <label>Height (in)</label>
            <input type="text" placeholder='Enter height in inches' value={height} onChange={(event) => {setHeight(event.target.value); handleHeight()}} />
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
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