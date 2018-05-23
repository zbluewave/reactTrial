import getMerchantItemsAction from '../ActionCreator/getMerchantItemsAction';

export const initialState = {
    loading: false,
    data: null,
    error: null,
};

export default function merchantReducer(state = initialState, action) {
    switch (action.type) {

        case getMerchantItemsAction.ACTION:
            return {
                ...state,
                loading: true,
                error: null
            };

        case getMerchantItemsAction.ACTION_COMPLETE:
            return {
                ...state,
                loading: false,
                data: action.data,
                error: null
            };

        case getMerchantItemsAction.ACTION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;

    }
}
