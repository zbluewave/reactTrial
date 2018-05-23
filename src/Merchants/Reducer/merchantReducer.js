import getMerchantAction from '../ActionCreator/getMerchantAction';

export const initialState = {
    loading: false,
    data: null,
    error: null,
};

export default function merchantReducer(state = initialState, action) {
    switch (action.type) {

        case getMerchantAction.ACTION:
            return {
                ...state,
                loading: true,
                error: null
            };

        case getMerchantAction.ACTION_COMPLETE:
            return {
                ...state,
                loading: false,
                data: action.data,
                error: null
            };

        case getMerchantAction.ACTION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;

    }
}
