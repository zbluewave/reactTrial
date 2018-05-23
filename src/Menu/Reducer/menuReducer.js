import getMenuAction from '../ActionCreator/getMenuAction';

export const initialState = {
    loading: false,
    data: null,
    error: null,
};

export default function menuReducer(state = initialState, action) {
    switch (action.type) {

        case getMenuAction.ACTION:
            return {
                ...state,
                loading: true,
                error: null
            };

        case getMenuAction.ACTION_COMPLETE:
            return {
                ...state,
                loading: false,
                data: action.data,
                error: null
            };


        case getMenuAction.ACTION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;

    }
}
