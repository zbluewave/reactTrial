import matchedItemsReducer, { initialState } from './matchedItemsReducer';
import getMatchedItemsAction from '../ActionCreator/getMatchedItemsAction';
import addMatchedItemAction from '../ActionCreator/addMatchedItemAction';
import removeMatchedItemAction from '../ActionCreator/removeMatchedItemAction';
import removeMatchedItemsByMerchantAction from '../ActionCreator/removeMatchedItemsByMerchantAction';
import createItemLinkAction from '../ActionCreator/createItemLinkAction';

describe('MatchedItemsReducer', () => {
    test('MatchedItemsReducer should return the initial state', () => {
        expect(matchedItemsReducer(undefined, {})).toEqual(initialState);
    });

    test('MatchedItemsReducer should handle getMatchedItemsAction', () => {
        const action = {
            type: getMatchedItemsAction.ACTION,
        };

        const state = {
            ...initialState,
            data: [{ name: 'test item', price: '4.00' }]
        };

        expect(matchedItemsReducer({ ...state }, action)).toEqual({
            ...initialState,
            data: state.data,
        });
    });

    test('MatchedItemsReducer should handle addMatchedItemAction', () => {
        const action = {
            type: addMatchedItemAction.ACTION,
            payload: { name: 'another test item', price: '8.00' }
        };

        const state = {
            ...initialState,
            data: [{ name: 'test item', price: '4.00' }]
        };

        expect(matchedItemsReducer({ ...state }, action)).toEqual({
            ...initialState,
            data: state.data.concat(action.payload),
        });
    });

    test('MatchedItemsReducer should handle removeMatchedItemAction', () => {
        const action = {
            type: removeMatchedItemAction.ACTION,
            itemType: 'dcom',
            payload: { name: 'another test item', price: '8.00', dcomEntityId: 123 }
        };

        const state = {
            ...initialState,
            data: [
                { name: 'test item', price: '4.00', dcomEntityId: 456 },
                { name: 'another test item', price: '8.00', dcomEntityId: 123 }
            ]
        };

        expect(matchedItemsReducer({ ...state }, action)).toEqual({
            ...initialState,
            data: [{ name: 'test item', price: '4.00', dcomEntityId: 456 }],
        });
    });

    test('MatchedItemsReducer should handle removeMatchedItemsByMerchantAction', () => {
        const action = {
            type: removeMatchedItemsByMerchantAction.ACTION,
            payload: { name: 'another test item', price: '8.00', merchantId: 123 }
        };

        const state = {
            ...initialState,
            data: [
                { name: 'test item', price: '4.00', merchantId: 456 },
                { name: 'another test item', price: '8.00', merchantId: 123 }
            ]
        };

        expect(matchedItemsReducer({ ...state }, action)).toEqual({
            ...initialState,
            data: [{ name: 'test item', price: '4.00', merchantId: 456 }],
        });
    });

    test('MatchedItemsReducer should handle createItemLinkAction', () => {
        const action = {
            type: createItemLinkAction.ACTION_COMPLETE,
            params: [{ name: 'another test item', price: '8.00', partnerEntityId: 123 }]
        };

        const state = {
            ...initialState,
            data: [
                { name: 'test item', price: '4.00', partnerItemId: 456 },
                { name: 'another test item', price: '8.00', partnerItemId: 123 }
            ]
        };

        expect(matchedItemsReducer({ ...state }, action)).toEqual({
            ...initialState,
            data: [{ name: 'test item', price: '4.00', partnerItemId: 456 }],
        });
    });

    test('MatchedItemsReducer should handle createItemLinkAction Error', () => {
        const action = {
            type: createItemLinkAction.ACTION_FAILED,
            error: 'Request failed!'
        };

        expect(matchedItemsReducer({ ...initialState }, action)).toEqual({
            ...initialState,
            error: 'Request failed!'
        });
    });
});
