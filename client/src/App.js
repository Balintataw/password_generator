import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

class App extends Component {
	state = {
		pw: '',
		acrostic: 'face',
		minLength: 5,
		maxLength: 8
	}
	handleClick = () => {
		axios.post('http://localhost:5000/get_password', 
		JSON.stringify(
			{
				'text': this.state.acrostic,
				'min_length': this.state.minLength,
				'max_length': this.state.maxLength
			}), {headers: { 'Content-Type': 'application/json; charset=utf-8' }}
			).then(resp => {
			this.setState({
				pw: resp.data
			})
			console.log('resp',resp)
		}).catch(err => {
			console.log('err', err)
		})
	}
	handleAcrosticChange = (e) => {
		e.preventDefault()
		this.setState({
		    [e.target.name]: e.target.value
		})
	}
	handleMinLengthChange = (e) => {
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleMaxLengthChange = (e) => {
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	render() {
		return (
			<div className="wrapper">
				<div className="wrapper-inner">
					<h3>Password Generator</h3>
					<p>Acrostic term to create your password:</p>
					<div>
						<small>eg, 'face' may return a password of 'froth academic cheap exercise</small>
					</div>	
					<div className="small-text-spacer">
						<small>leave blank for random</small>
					</div>	
					<input 
						onChange={this.handleAcrosticChange} 
						autoComplete="off"
						type="text" 
						name="acrostic" 
						value={this.state.acrostic}
						className="acrostic-input"
					/>
					<div>
						<p>Minimum word length: </p>
						<input
							onChange={this.handleMinLengthChange}
							autoComplete="off"
							type="number"
							name="minLength"
							value={this.state.minLength}
							className="min-length-input"
						/>
						<p>Maximum word length: </p>
						<input
							onChange={this.handleMaxLengthChange}
							autoComplete="off"
							type="number"
							name="maxLength"
							value={this.state.maxLength}
							className="max-length-input"
						/>
					</div>
					<div>
						<button
							className="password-button" 
							onClick={this.handleClick}>
							Get a new password
						</button>
					</div>	
					<h3>{this.state.pw}</h3>
				</div>
			</div>
		)
	}
}

export default App;
