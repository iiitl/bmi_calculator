import './App.css';
import './index.css'
import React, {useState} from 'react'

function App() {
  // state
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const Modal = ({ message, onClose }) => {
    return (
      <>
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal">
          <div className="modal-content">
            <h3>Invalid Input</h3>
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </>
    );
  };

  const isValidInput = (value) => {
    return !isNaN(value) && parseFloat(value) > 0;
  };



  let calcBmi = (event) => {

    event.preventDefault()
    const weightNum = Number(weight);
    const heightNum = Number(height);

   
    if (!isValidInput(weight) || !isValidInput(height)) {
      setModalMessage(
        `Please enter valid positive values for weight and height. Avoid using strings or negative numbers.`
      );
      setShowModal(true);
      return;
    }

    let bmiValue = (weightNum / (heightNum * heightNum)) * 703;
    setBmi(bmiValue.toFixed(1));



    console.log(event);

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

  
  return (
    <div className="app">
    <div className='container'>
      <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input type="text" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height (in)</label>
            <input type="text" placeholder='Enter height in inches' value={height} onChange={(event) => setHeight(event.target.value)} />
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
    {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
  </div>
  );
}

export default App;
