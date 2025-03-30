import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [heightError, setHeightError] = useState('')
  const [weightError, setWeightError] = useState('')
  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    if(isNaN(weight) || isNaN(height) || parseFloat(height) <= 0 || parseFloat(weight) <= 0){
        setMessage("Enter a valid weight and height")
        document.querySelector(".ErrorBox").style.display = "block";
        if(isNaN(height) || parseFloat(height) <= 0){
          setHeightError('Please enter a valid height')
        }
        if(isNaN(weight) || parseFloat(weight) <= 0){
          setWeightError('Please enter a valid weight')
        }
        return;
      }else{
        setMessage('')
        setHeightError('')
        setWeightError('')
      }
      
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
  
  let rmv = ()=>{
    document.querySelector(".ErrorBox").style.display = "none";
  }
  
  return (
    <div className="app">
      <div className='ErrorBox'>
        <h3 className='center'>Please Enter valid height and weight</h3> <br/> <br/>
        <button className='btn-error' onClick={rmv}>Ok</button>
      </div>
    <div className='container'>
      <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input type="text" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(e.target.value)} />
            <p className='error'>{weightError}</p>
          </div>
          <div>
            <label>Height (in)</label>
            <input type="text" placeholder='Enter height in inches' value={height} onChange={(event) => setHeight(event.target.value)} />
            <p className='error'>{heightError}</p>
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
