import getAllMerchants from '../ActionCreator/getAllMerchantsAction';

export const initialState = {
	loading: false,
	data: null,
	error: null,
};

export default function merchantsReducer(state = initialState, action) {
	switch (action.type) {

		case getAllMerchants.ACTION:
			return {
				...state,
				loading: true,
				error: null
			};

		case getAllMerchants.ACTION_COMPLETE:
			return {
				...state,
				loading: false,
				data: action.data,
				error: null
			};


		case getAllMerchants.ACTION_FAILED:
			return {
				...state,
				loading: false,
				error: action.error
			};

		default:
			return state;

	}
}
