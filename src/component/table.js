import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { connect } from 'react-redux';
import constants from '../constants/constants';
//test

const CustomTableCell = withStyles(() => ({
	head: {
		backgroundColor: '#247BA0',
		color: '#FFFDD0'
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

// const styles = (theme) => ({
// 	root: {
// 		width: '100%',
// 		marginTop: theme.spacing.unit * 3,
// 		overflowX: 'auto'
// 	},
// 	table: {
// 		minWidth: 700
// 	},
// 	row: {
// 		'&:nth-of-type(odd)': {
// 			backgroundColor: theme.palette.background.default
// 		}
// 	}
// });

class CustomizedTable extends React.Component {
	//Requete à la bdd
	componentDidMount = async () => {
		const response = await axios.get('http://localhost:3600/');
		this.props.majList(response.data);
	};
	//Modification
	updateTab = (index, row) => {
		this.props.updateTab(row, index);
	};
	//Suppression
	deleteRow = async (row, index) => {
		await axios.post('http://localhost:3600/delete', {
			id: row._id
		});
		this.props.deleteRow(index);
	};
	columnSort = (column) => {
		this.props.columnSort(column);
	};

	// DESC = (a, b, column) => {
	// 	a = a[1];
	// 	b = b[1];
	// 	if (a > b) return -1;
	// 	if (a < b) return 1;
	// 	return 0;
	// };

	// ASC = (a, b) => {
	// 	a = a[1];
	// 	b = b[1];
	// 	if (a > b) {
	// 		return 0;
	// 	}
	// };

	render() {
		if (this.props.isLoading === true) {
			return 'Is Loading';
		} else {
			let idRow = 0;
			const createData = (nom, prix, capacite, taille, description, _id) => {
				idRow += 0;
				return { nom, prix, capacite, taille, description, _id, idRow };
			};
			const rows = [];
			this.props.cartes.map((carte) => {
				if (carte !== undefined) {
					return rows.push(
						createData(carte.nom, carte.prix, carte.capacite, carte.taille, carte.description, carte._id)
					);
				}
			});
			return (
				<Paper className="">
					<Table className="">
						<TableHead>
							<TableRow>
								<CustomTableCell onClick={() => this.columnSort('nom')}>Nom</CustomTableCell>
								<CustomTableCell onClick={() => this.columnSort('prix')} align="right">
									Prix (EUR)
								</CustomTableCell>
								<CustomTableCell onClick={() => this.columnSort('capacite')} align="right">
									Capacité (Go)
								</CustomTableCell>
								<CustomTableCell onClick={() => this.columnSort('taille')} align="right">
									Taille (mm)
								</CustomTableCell>
								<CustomTableCell align="right">Désciption</CustomTableCell>
								<CustomTableCell align="right">Option</CustomTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row, index) => (
								<TableRow className="" key={index}>
									<CustomTableCell component="th" scope="row">
										{row.nom}
									</CustomTableCell>
									<CustomTableCell align="right">{row.prix}</CustomTableCell>
									<CustomTableCell align="right">{row.capacite}</CustomTableCell>
									<CustomTableCell align="right">{row.taille}</CustomTableCell>
									<CustomTableCell align="right">{row.description}</CustomTableCell>
									<CustomTableCell align="right">
										<i
											className="material-icons"
											onClick={() => this.updateTab(index, row, idRow)}
											style={{ color: 'blue' }}
										>
											create
										</i>
										<i
											onClick={() => this.deleteRow(row, index)}
											className="material-icons"
											style={{ color: 'red' }}
										>
											delete
										</i>
									</CustomTableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
			);
			// }
		}
	}
}
const mapStateToProps = (state) => {
	return {
		cartes: state.cartes,
		isLoading: state.isLoading
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		majList: (data) => {
			const action = { type: constants.MAJ_TAB, cartes: data };
			dispatch(action);
		},
		updateTab: (row, idRow) => {
			const action = { type: constants.UPDATE_TAB, row: row, idRow: idRow };
			dispatch(action);
		},
		deleteRow: (index) => {
			const action = { type: constants.DELETE_ROW, index: index };
			dispatch(action);
		},
		columnSort: (column) => {
			const action = { type: constants.SORT, column: column };
			dispatch(action);
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomizedTable);
// export default withStyles(styles)(CustomizedTable);
