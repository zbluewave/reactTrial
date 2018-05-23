import loginAction from '../ActionCreator/loginAction';
import logoutAction from '../ActionCreator/logoutAction';

export const initialState = {
	loading: false,
	data: null,
	error: null,
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {

		case loginAction.ACTION:
			return {
				...state,
				loading: true,
				error: null
			};

		case loginAction.ACTION_COMPLETE:
			return {
				...state,
				loading: false,
				data: {
					loggedIn: true,
					...action.data,
				},
				error: null
			};

		case logoutAction.ACTION:
			return {
				...state,
				loading: false,
				data: {
					loggedIn: false,
					...action.data,
				},
				error: null
			};

		case loginAction.ACTION_FAILED:
			return {
				...state,
				loading: false,
				error: action.error
			};

		default:
			return state;
	}
}

