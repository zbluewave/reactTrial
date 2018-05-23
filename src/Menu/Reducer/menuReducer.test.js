import menuReducer, { initialState } from './menuReducer';
import getMenuAction from '../ActionCreator/getMenuAction';

describe('MenuReducer', () => {
    test('MenuReducer should return the initial state', () => {
        expect(menuReducer(undefined, {})).toEqual(initialState);
    });

    test('MenuReducer should handle getMerchantItemsAction', () => {
        const action = {
            type: getMenuAction.ACTION_COMPLETE,
            data: { menu: [{ name: 'test item' }] }
        };
        expect(menuReducer({ ...initialState }, action)).toEqual({
            ...initialState,
            data: action.data,
        });
    });

    test('MenuReducer should handle getMerchantItemsAction Error', () => {
        const action = {
            type: getMenuAction.ACTION_FAILED,
            error: 'Request failed!'
        };

        expect(menuReducer({ ...initialState }, action)).toEqual({
            ...initialState,
            error: 'Request failed!'
        });
    });
});
