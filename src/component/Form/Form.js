import React from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import constant from '../../constants/constants';
class Basic extends React.Component {
	state = {
		errorMessage: null
	};
	render() {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
				{this.props.update === false ? <h2>Create a Memory</h2> : <h2>Update a Memory</h2>}
				{this.state.errorMessage}
				<Formik
					enableReinitialize={true}
					initialValues={this.props.row}
					onSubmit={async (values, actions) => {
						// Ajout d'une nouvelle carte dans la base de données
						if (this.props.update === false) {
							const chiffreRegex = /[0-9]*\.?[0-9]*/;
							const lettreRegex = /^[a-zA-Z-]+$/;
							try {
								if (
									chiffreRegex.test(values.prix) &&
									chiffreRegex.test(values.capacite) &&
									chiffreRegex.test(values.taille) &&
									lettreRegex.test(values.nom)
								) {
									const response = await axios.post(
										'https://altyor-serveur.herokuapp.com/create' || 'http://localhost:3600/create',
										{
											nom: values.nom,
											prix: values.prix,
											capacite: values.capacite,
											taille: values.taille,
											description: values.description
										},
										//remise a null des inputs
										(values.nom = ''),
										(values.prix = ''),
										(values.capacite = ''),
										(values.taille = ''),
										(values.description = '')
									);
									this.props.addedTab(response.data.newCarte);
									this.setState({ errorMessage: '' });
								} else {
									this.setState({ errorMessage: 'Les valeurs rentrés ne sont pas reconnue' });
								}
							} catch (error) {
								this.setState({ errorMessage: error.response.data.error });
							}
						} else if (this.props.update === true) {
							//Modification d'une carte de la base de données
							try {
								const response = await axios.post(
									'https://altyor-serveur.herokuapp.com/update' || 'http://localhost:3600/update',
									{
										nom: values.nom,
										prix: values.prix,
										capacite: values.capacite,
										taille: values.taille,
										description: values.description,
										id: values.id
									},
									//remise a null des inputs
									(values.nom = ''),
									(values.prix = ''),
									(values.capacite = ''),
									(values.taille = ''),
									(values.description = '')
								);
								this.props.updateRow(response.data.updateCarte);
							} catch (error) {
								this.setState({ errorMessage: error.response.data.error });
							}
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
								value={props.values.nom}
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
								value={props.values.prix}
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
								value={props.values.capacite}
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
								value={props.values.taille}
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
								value={props.values.description}
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
