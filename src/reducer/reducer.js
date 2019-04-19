import constants from '../constants/constants';

const initialState = {
	cartes: [],
	isLoading: true,

	row: {
		nom: '',
		prix: '',
		capacite: '',
		taille: '',
		description: '',
		id: '',
		idArray: ''
	},
	update: false,
	idRow: ''
};

const reducer = (state = initialState, action) => {
	console.log(state.cartes);

	switch (action.type) {
		case constants.MAJ_TAB:
			return {
				...state,
				cartes: action.cartes,
				isLoading: false,
				update: false
			};
		case constants.ADD_TAB:
			return {
				...state,
				cartes: [ ...state.cartes, action.cartes ],
				update: false
			};
		case constants.UPDATE_TAB:
			const tempRow = {
				nom: action.row.nom,
				prix: action.row.prix,
				capacite: action.row.capacite,
				taille: action.row.taille,
				description: action.row.description,
				id: action.row._id,
				idArray: action.row.idArray
			};
			return {
				...state,
				row: tempRow,
				update: true,
				idRow: action.idRow
			};
		case constants.UPDATE_ROW:
			const tempCartes = state.cartes.slice();
			tempCartes[state.idRow] = action.newCartes;
			return {
				...state,
				cartes: tempCartes,
				update: false
			};
		case constants.DELETE_ROW:
			const temp2Cartes = state.cartes.slice();
			temp2Cartes.splice([ action.index ], 1);
			return {
				...state,
				cartes: temp2Cartes
			};
		default:
			return state;
	}
};

export default reducer;
