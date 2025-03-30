import './App.css';
import './index.css'
import React, {useState,useEffect} from 'react'

function App() {
  const KG_PER_LB = 0.453592;
  const METERS_PER_CM = 0.01;
  const METERS_PER_INCH = 0.0254;

  const UNDERWEIGHT_THRESHOLD = 18.5;
  const HEALTHY_THRESHOLD = 25;
  const OVERWEIGHT_THRESHOLD = 30;

  // state
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [weightUnit, setWeightUnit] = useState('kg'); // Default kg
  const [heightUnit, setHeightUnit] = useState('m'); // Default meters
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')

    // State for Dark Mode
    const[darkMode,setDarkMode]=useState(()=>{
      return localStorage.getItem("theme")==="dark";
    });
    // Apply dark mode when toggled
    useEffect(()=>{
      if(darkMode){
        document.body.classList.add("dark-mode");
      }
      else{
        document.body.classList.remove("dark-mode");
      }
      localStorage.setItem("theme",darkMode?"dark":"light");
    }, [darkMode]);
  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);
    let weightKg = Number(weight);
    let heightMeters = Number(height);
    if (isNaN(weightKg) || isNaN(heightMeters) || weightKg <= 0 || heightMeters <= 0) {
      alert('Please enter a valid weight and height');
      return;
    }
    // Convert weight to kg if it's in lbs
    if (weightUnit === 'lbs') {
      weightKg = weightKg * KG_PER_LB;
    }
    // Convert height to meters
    if (heightUnit === 'cm') {
      heightMeters = heightMeters / 100;
    } else if (heightUnit === 'in') {
      heightMeters = heightMeters * METERS_PER_INCH;
    }
     // Calculate BMI
     let bmiValue = weightKg / (heightMeters * heightMeters);
     setBmi(bmiValue.toFixed(1));
      
        if (bmiValue < UNDERWEIGHT_THRESHOLD) {
          setMessage('You are underweight')
        }  else if (bmiValue >= UNDERWEIGHT_THRESHOLD && bmiValue < HEALTHY_THRESHOLD) {
          setMessage('You have healthy weight')
        } else if (bmiValue>=HEALTHY_THRESHOLD && bmiValue <OVERWEIGHT_THRESHOLD) {
          setMessage('You are overweight')
        }else{
          setMessage('You are obese')
        }
      
    }
  

  let reload = () => {
    window.location.reload()
  }

  
  return (
    <div className={`app ${darkMode ?'dark-mode':''}`}>
    <div className='container'>
      <h2 className='center'>BMI Calculator</h2>
      
        {/* Dark Mode Toggle Button */}
        <button className="toggle-btn" onClick={()=>setDarkMode(!darkMode)}>
        {darkMode?"Light Mode":"Dark Mode"}
        </button>
        <form onSubmit={calcBmi}>
           {/* Weight Input */}
           <div>
            <label>Weight</label>
            <input type="number" placeholder="Enter weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
           {/* Height Input */}
           <div>
            <label>Height</label>
            <input type="number" placeholder="Enter height" value={height} onChange={(e) => setHeight(e.target.value)} />
            <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
              <option value="m">meters</option>
              <option value="cm">cm</option>
              <option value="in">inches</option>
            </select>
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
            <button className='btn btn-outline' onClick={reload} type='button'>Reload</button>
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
