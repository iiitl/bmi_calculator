import './App.css';
import './index.css'
import React, {useState} from 'react'

const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>
        <div className="modal-body">
         <p>{message}</p>
          
          </div>
      </div>
    </div>
  );
};


function App() {
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')

  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  let calcBmi = (event) => {
    event.preventDefault()
    console.log(event);

    let weightVal = parseFloat(weight);
    let heightVal = parseFloat(height);

    if (isNaN(weightVal) || isNaN(heightVal) || weightVal <= 0 || heightVal <= 0) {
      setModalMessage("⚠️ Please enter valid positive numbers.");
      setIsModalOpen(true);
      return;
      
      
    }

    setModalMessage('');
    setIsModalOpen(false);
   

    
      let bmi = (weightVal / (heightVal * heightVal) * 703)
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

    <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Input Error" 
        message={modalMessage} 
      />

  </div>
  );
}

export default App;
