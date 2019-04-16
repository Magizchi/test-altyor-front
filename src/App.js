import React, { Component } from 'react';
import './App.css';

//import
import Form from './component/Form/Form';
import Table from './component/table';
class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Altyor</h1>
				<Table />
				<Form />
			</div>
		);
	}
}

export default App;
