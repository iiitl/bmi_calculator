import './App.css';
import './index.css';
import React, { useState, useRef } from 'react';
import Modal from './Modal'; 

function App() {
  // state
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const chosenSystem = useRef();

  
  const isValidInput = (value) => {
    return !isNaN(value) && value > 0 && Number.isInteger(Number(value));
  };

  let calcBmi = (event) => {
    event.preventDefault();

    
    if (!isValidInput(weight) || !isValidInput(height)) {
      setIsModalOpen(true); 
      return;
    }

    if (chosenSystem.current.value === 'Non Metric ( lbs,inches )') {
      let bmi = (weight / (height * height) * 703);
      setBmi(bmi.toFixed(1));

      if (bmi < 25) {
        setMessage('You are underweight');
      } else if (bmi >= 25 && bmi < 30) {
        setMessage('You have healthy weight');
      } else {
        setMessage('You are overweight');
      }
    } else {
      let bmi = (weight / (height * height));
      setBmi(bmi.toFixed(1));
      if (bmi < 25) {
        setMessage('You are underweight');
      } else if (bmi >= 25 && bmi < 30) {
        setMessage('You have healthy weight');
      } else {
        setMessage('You are overweight');
      }
    }
  };

  let reload = () => {
    window.location.reload();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label htmlFor="system">Select the System: 
              <select id="system" ref={chosenSystem}>
                <option>Metric ( kg,metres )</option>
                <option>Non Metric ( lbs,inches )</option>
              </select>
            </label>
          </div>
          <br /><br />
          <div>
            <label>Weight</label>
            <input
              type="text"
              placeholder='Enter Weight'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Height</label>
            <input
              type="text"
              placeholder='Enter Height'
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
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

      {isModalOpen && (
        <Modal 
          message="Please enter valid positive integer values for both weight and height."
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
