import filteredItemReducer, { initialState } from './filteredItemReducer';
import filterMenuAction from '../ActionCreator/filterMenuAction';
import clearFilterMenuAction from '../ActionCreator/clearFilterMenuAction';

describe('FilteredItemReducer', () => {
    test('FilteredItemReducer should return the initial state', () => {
        expect(filteredItemReducer(undefined, {})).toEqual(initialState);
    });

    test('FilteredItemReducer should handle filterMenuAction', () => {
        const action = {
            type: filterMenuAction.ACTION,
            payload: { ID: 123 }
        };
        expect(filteredItemReducer({ ...initialState }, action)).toEqual({
            ...initialState,
            data: action.payload,
        });
    });

    test('FilteredItemReducer should handle clearFilterMenuAction', () => {
        const state = {
            data: {
                ID: 321
            }
        };

        const action = {
            type: clearFilterMenuAction.ACTION
        };

        expect(filteredItemReducer({ ...state }, action)).toEqual({
            ...initialState
        });
    });

});
