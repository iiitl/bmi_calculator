import './App.css';
import './index.css'
import React, { useState } from 'react'

function App() {
	// state
	const [weight, setWeight] = useState(0)
	const [height, setHeight] = useState(0)
	const [bmi, setBmi] = useState('')
	const [message, setMessage] = useState('')
	const [isImperial, setIsImperial] = useState(true);
	const [unitWeight, setUnitWeight] = useState("lbs");
	const [unitHeight, setUnitHeight] = useState("in");

	function displayMessage(bmi) {
		if (bmi < 18.5) {
			setMessage('You are underweight')
		} else if (bmi >= 18.5 && bmi < 25) {
			setMessage('You have healthy weight')
		} else if (bmi >= 25 && bmi < 30) {
			setMessage('You are overweight')
		} else {
			setMessage('You are obese')
		}
	}

	let calcBmi = (event) => {
		event.preventDefault()
		console.log(event);

		if (weight === 0 || height === 0) {
			alert('Please enter a valid weight and height')
		} else {
			if (isImperial === true) {
				let bmi = (weight / (height * height) * 703)
				displayMessage(bmi)
				setBmi(() => {
					return bmi.toFixed(1)
				})
			} else {
				let bmi = (weight / (height * height))
				displayMessage(bmi)
				setBmi(() => {
					return bmi.toFixed(1)
				})
			}
		}
	}

	const toggleUnitSystem = (e) => {
		setIsImperial(() => {
			if (e.target.innerText === "Imperial System") {
				setUnitWeight(() => "lbs")
				setUnitHeight(() => "in")
				return true;
			}
			setUnitWeight(() => "kg")
			setUnitHeight(() => "m")
			return false;
		})
	}

	let reload = () => {
		window.location.reload()
	}

	return (
		<div className="app">
			<div className='container'>
				<h2 className='center'>BMI Calculator</h2>
				<div className='unit-system-container'>
					<button className='unit-system-btn' onClick={toggleUnitSystem}>Imperial System</button>
					<button className='unit-system-btn' onClick={toggleUnitSystem}>Metric System</button>
				</div>
				<form onSubmit={calcBmi}>
					<div>
						<label>Weight ({unitWeight})</label>
						<input type="text" placeholder='Enter Weight in lbs' value={weight} onChange={(e) => setWeight(e.target.value)} />
					</div>
					<div>
						<label>Height ({unitHeight})</label>
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
		</div>
	);
}

export default App;
