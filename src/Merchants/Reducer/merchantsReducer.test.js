import merchantsReducer, { initialState } from './merchantsReducer';
import getAllMerchants from '../ActionCreator/getAllMerchantsAction';

describe('MerchantsReducer', () => {
    test('MerchantsReducer should return the initial state', () => {
        expect(merchantsReducer(undefined, {})).toEqual(initialState);
    });

    test('MerchantsReducer should handle getAllMerchants', () => {
        const action = {
            type: getAllMerchants.ACTION_COMPLETE,
            data: [{ name: 'test merchant' }, { name: ' another test merchant ' }]
        };
        expect(merchantsReducer({ ...initialState }, action)).toEqual({
            ...initialState,
            data: action.data,
        });
    });

    test('MerchantsReducer should handle getAllMerchants Error', () => {
        const action = {
            type: getAllMerchants.ACTION_FAILED,
            error: 'Request failed!'
        };

        expect(merchantsReducer({ ...initialState }, action)).toEqual({
            ...initialState,
            error: 'Request failed!'
        });
    });

});
