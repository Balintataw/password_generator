import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

class App extends Component {
	state = {
		pw: '',
		acrostic: 'trump'
	}
	handleClick = () => {
		console.log('click')
		axios.post('http://localhost:5000/get_password', 
		JSON.stringify({'text': this.state.acrostic}), {headers: { 'Content-Type': 'application/json; charset=utf-8' }}
			).then(resp => {
			this.setState({
				pw: resp.data
			})
			console.log('resp',resp)
		}).catch(err => {
			console.log('err', err)
		})
	}
	handleChange = (e) => {
		e.preventDefault()
		this.setState({
		  [e.target.name]: e.target.value
		})
	  }
	render() {
		return (
			<div className="wrapper">
				<h3>Password Generator</h3>
				<p>Acrostic term to create your password:</p>
				<input onChange={this.handleChange} 
                  autoComplete="off"
                  type="text" 
                  name="acrostic" 
                  value={this.state.acrostic}
                  className="input"
                  />
				  <p>{this.state.acrostic}</p>
				  <small>eg, 'face' may return a password of 'froth academic cheap exercise'</small>
				<button onClick={this.handleClick}>Get a new password</button>
				<p>{this.state.pw ? this.state.pw : ''}</p>
			</div>
		)
	}
}

export default App;
