import linkedItemReducer, { initialState } from './linkedItemReducer';
import filterMenuLinkedItemAction from '../ActionCreator/filterMenuLinkedItemAction';
import clearFilterMenuLinkedItemAction from '../ActionCreator/clearFilterMenuLinkedItemAction';

describe('linkedItemReducer', () => {
    test('linkedItemReducer should return the initial state', () => {
        expect(linkedItemReducer(undefined, {})).toEqual(initialState);
    });

    test('linkedItemReducer should handle filterMenuLinkedItemAction', () => {
        const action = {
            type: filterMenuLinkedItemAction.ACTION,
            payload: { ID: 123 }
        };
        expect(linkedItemReducer({ ...initialState }, action)).toEqual({
            ...initialState,
            data: action.payload,
        });
    });

    test('linkedItemReducer should handle clearFilterMenuLinkedItemAction', () => {
        const state = {
            data: {
                ID: 321
            }
        };

        const action = {
            type: clearFilterMenuLinkedItemAction.ACTION
        };

        expect(linkedItemReducer({ ...state }, action)).toEqual({
            ...initialState
        });
    });

});
