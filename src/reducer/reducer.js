import constants from '../constants/constants';

const initialState = {
	cartes: [],
	isLoading: true,

	row: {},
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
				cartes: [ ...state.cartes, action.cartes ],
				update: false
			};
		case constants.UPDATE_TAB:
			return {
				...state,
				row: action.row,
				update: true,
				idRow: action.idRow
			};
		case constants.UPDATE_ROW:
			state.cartes[state.idRow] = action.newCartes;
			return {
				cartes: state.cartes,
				update: false
			};
		case constants.DELETE_ROW:
			state.cartes.splice([ action.index ], 1);
			return {
				cartes: state.cartes
			};
		default:
			return state;
	}
};

export default reducer;
