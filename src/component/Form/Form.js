import React from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import constant from '../../constants/constants';
class Basic extends React.Component {
	render() {
		let newNom = '';
		let newPrix = '';
		let newCapacite = '';
		let newTaille = '';
		let newDescription = '';
		let id = '';
		let idArray = '';

		if (this.props.row) {
			const { nom, prix, capacite, taille, description, _id, idRow } = this.props.row;
			newNom = nom;
			newPrix = prix;
			newCapacite = capacite;
			newTaille = taille;
			newDescription = description;
			id = _id;
			idArray = idRow;
		}

		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
				{this.props.update === false ? <h2>Create a Memory</h2> : <h2>Update a Memory</h2>}
				<Formik
					initialValues={{
						nom: '',
						prix: '',
						capacite: '',
						taille: '',
						description: ''
					}}
					onSubmit={async (values, actions) => {
						// Ajout d'une nouvelle carte dans la base de données
						if (this.props.update === false) {
							const response = await axios.post('http://localhost:3600/create', {
								nom: values.nom,
								prix: values.prix,
								capacite: values.capacite,
								taille: values.taille,
								description: values.description
							});
							this.props.addedTab(response.data.newCarte);
						} else if (this.props.update === true) {
							//Modification d'une carte de la base de données
							const response = await axios.post(
								'http://localhost:3600/update',
								{
									nom: values.nom || newNom,
									prix: values.prix || newPrix,
									capacite: values.capacite || newCapacite,
									taille: values.taille || newTaille,
									description: values.description || newDescription,
									id: id
								},
								//remise a null des inputs
								(values.nom = ''),
								(values.prix = ''),
								(values.capacite = ''),
								(values.taille = ''),
								(values.description = '')
							);
							this.props.updateRow(response.data.updateCarte);
						}
					}}
					render={(props) => (
						<form
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								width: '200px'
							}}
							onSubmit={props.handleSubmit}
						>
							<TextField
								label="Nom"
								id="outlined-name"
								type="text"
								className=""
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.nom || newNom}
								name="nom"
								margin="normal"
								variant="outlined"
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								label="Prix"
								id="outlined-prix"
								type="text"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.prix || newPrix}
								name="prix"
								margin="normal"
								variant="outlined"
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								label="Capacité"
								id="outlined-capacite"
								type="text"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.capacite || newCapacite}
								name="capacite"
								margin="normal"
								variant="outlined"
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								label="Taille"
								id="outlined-Taille"
								type="text"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.taille || newTaille}
								name="taille"
								margin="normal"
								variant="outlined"
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								label="Déscription"
								id="outlined-texstarea"
								type="text"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.description || newDescription}
								name="description"
								margin="normal"
								variant="outlined"
								InputLabelProps={{ shrink: true }}
							/>
							{props.errors.name && <div id="feedback">{props.errors.name}</div>}
							<Button type="submit" variant="contained" color="primary" className="">
								{this.props.update === false ? 'Create Entry' : 'Update Entry'}
							</Button>
						</form>
					)}
				/>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		cartes: state.cartes,
		row: state.row,
		update: state.update
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addedTab: (data) => {
			const action = { type: constant.ADD_TAB, cartes: data };
			dispatch(action);
		},
		updateRow: (data) => {
			const action = { type: constant.UPDATE_ROW, newCartes: data };
			dispatch(action);
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Basic);
// export default Basic;
