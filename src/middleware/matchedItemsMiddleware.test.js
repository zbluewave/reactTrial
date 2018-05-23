import matchedItemsMiddleware from './matchedItemsMiddleware';
import addMatchedItemAction from '../Menu/ActionCreator/addMatchedItemAction';
import removeMatchedItemAction from '../Menu/ActionCreator/removeMatchedItemAction';
import removeMatchedItemsByMerchantAction from '../Menu/ActionCreator/removeMatchedItemsByMerchantAction';
import createItemLinkAction from '../Menu/ActionCreator/createItemLinkAction';

const mockStore = { dispatch: jest.fn() };
const mockNext = jest.fn();

describe('MatchedItemsMiddleware', () => {
    test('MatchedItemsMiddleware should handle addMatchedItemAction', () => {
        const action = {
            type: addMatchedItemAction.ACTION,
            payload: {
                item: 'test matchedItem',
                dcomEntityId: 123
            }
        };
        matchedItemsMiddleware(mockStore)(mockNext)(action);
        expect(JSON.parse(localStorage.getItem('matches'))).toEqual([{ ...action.payload }]);
        localStorage.clear();
    });

    test('MatchedItemsMiddleware should handle removeMatchedItemAction', () => {
        const addAction = {
            type: addMatchedItemAction.ACTION,
            payload: {
                item: 'test matchedItem',
                dcomEntityId: 123
            }
        };
        const removeAction = {
            type: removeMatchedItemAction.ACTION,
            itemType: 'dcom',
            payload: {
                dcomId: 123
            }
        };
        matchedItemsMiddleware(mockStore)(mockNext)(addAction);
        expect(JSON.parse(localStorage.getItem('matches'))).toEqual([{ ...addAction.payload }]);
        matchedItemsMiddleware(mockStore)(mockNext)(removeAction);
        expect(JSON.parse(localStorage.getItem('matches'))).toEqual([]);
        localStorage.clear();
    });

    test('MatchedItemsMiddleware should handle removeMatchedItemsByMerchantAction', () => {
        const addAction = {
            type: addMatchedItemAction.ACTION,
            payload: {
                item: 'test matchedItem',
                merchantId: 123
            }
        };
        const removeAction = {
            type: removeMatchedItemsByMerchantAction.ACTION,
            payload: {
                merchantId: 123
            }
        };
        matchedItemsMiddleware(mockStore)(mockNext)(addAction);
        expect(JSON.parse(localStorage.getItem('matches'))).toEqual([{ ...addAction.payload }]);
        matchedItemsMiddleware(mockStore)(mockNext)(removeAction);
        expect(JSON.parse(localStorage.getItem('matches'))).toEqual([]);
        localStorage.clear();
    });

    test('MatchedItemsMiddleware should handle createItemLinkAction', () => {
        const addAction = {
            type: addMatchedItemAction.ACTION,
            payload: {
                item: 'test matchedItem',
                partnerItemId: 123
            }
        };
        const linkAction = {
            type: createItemLinkAction.ACTION_COMPLETE,
            params: [{
                partnerEntityId: 123
            }]
        };
        matchedItemsMiddleware(mockStore)(mockNext)(addAction);
        expect(JSON.parse(localStorage.getItem('matches'))).toEqual([{ ...addAction.payload }]);
        matchedItemsMiddleware(mockStore)(mockNext)(linkAction);
        expect(JSON.parse(localStorage.getItem('matches'))).toEqual([]);
        localStorage.clear();
    });
});
