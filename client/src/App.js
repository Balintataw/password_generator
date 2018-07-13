import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

class App extends Component {
	state = {
		pw: ''
	}
	handleClick = () => {
		console.log('click')
		axios.get('http://localhost:5000/get_password').then(resp => {
			this.setState({
				pw: resp.data
			})
			console.log('resp',resp)
		}).catch(err => {
			console.log('err', err)
		})
	}
	render() {
		return (
			<div>
				<h3>Generator</h3>
				<button onClick={this.handleClick}>Get a new password</button>
				<p>{this.state.pw ? this.state.pw : ''}</p>
			</div>
		)
	}
}

export default App;
