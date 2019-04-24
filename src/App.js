import React, { Component } from 'react';
import './App.css';

//import
import Form from './component/Form/Form';
import Table from './component/table';
// import SortTable from './component/test1/test1';
class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Altyor</h1>
				<Table />
				{/* <SortTable /> */}
				<Form />
			</div>
		);
	}
}

export default App;
