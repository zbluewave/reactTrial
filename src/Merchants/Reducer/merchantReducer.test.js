import merchantReducer, { initialState } from './merchantReducer';
import getMerchantAction from '../ActionCreator/getMerchantAction';

describe('MerchantReducer', () => {
    test('MerchantReducer should return the initial state', () => {
        expect(merchantReducer(undefined, {})).toEqual(initialState);
    });

    test('MerchantReducer should handle getMerchantAction', () => {
        const action = {
            type: getMerchantAction.ACTION_COMPLETE,
            data: [{ name: 'test merchant' }]
        };
        expect(merchantReducer({ ...initialState }, action)).toEqual({
            ...initialState,
            data: action.data,
        });
    });

    test('MerchantReducer should handle getMerchantAction Error', () => {
        const action = {
            type: getMerchantAction.ACTION_FAILED,
            error: 'Request failed!'
        };

        expect(merchantReducer({ ...initialState }, action)).toEqual({
            ...initialState,
            error: 'Request failed!'
        });
    });

});
