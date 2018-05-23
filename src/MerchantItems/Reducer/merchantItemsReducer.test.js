import merchantItemsReducer, { initialState } from './merchantItemsReducer';
import getMerchantItemsAction from '../ActionCreator/getMerchantItemsAction';

describe('MerchantItemsReducer', () => {
    test('MerchantItemsReducer should return the initial state', () => {
        expect(merchantItemsReducer(undefined, {})).toEqual(initialState);
    });

    test('MerchantItemsReducer should handle getMerchantItemsAction', () => {
        const action = {
            type: getMerchantItemsAction.ACTION_COMPLETE,
            data: [{ item: 'test item' }]
        };
        expect(merchantItemsReducer({ ...initialState }, action)).toEqual({
            ...initialState,
            data: action.data,
        });
    });

    test('MerchantItemsReducer should handle getMerchantItemsAction Error', () => {
        const action = {
            type: getMerchantItemsAction.ACTION_FAILED,
            error: 'Request failed!'
        };

        expect(merchantItemsReducer({ ...initialState }, action)).toEqual({
            ...initialState,
            error: 'Request failed!'
        });
    });

});
