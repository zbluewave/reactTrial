import addMatchedItemAction from '../Menu/ActionCreator/addMatchedItemAction';
import removeMatchedItemAction from '../Menu/ActionCreator/removeMatchedItemAction';
import removeMatchedItemsByMerchantAction from '../Menu/ActionCreator/removeMatchedItemsByMerchantAction';
import createItemLinkAction from '../Menu/ActionCreator/createItemLinkAction';

export default function matchedItemsMiddleware({ getState, dispatch }) {
    return (next) =>
        (action) => {
            const nextState = next(action);
            matchedItemsMiddlewareListeners(action, getState, dispatch);
            return nextState;
        };
}

function matchedItemsMiddlewareListeners(action) {
    switch (action.type) {
        case addMatchedItemAction.ACTION: {
            const storedItems = JSON.parse(localStorage.getItem('matches')) || [];
            storedItems.push(action.payload);
            localStorage.setItem('matches', JSON.stringify(storedItems));
            break;
        }

        case removeMatchedItemAction.ACTION: {
            const storedItems = JSON.parse(localStorage.getItem('matches')) || [];
            const newItems = storedItems.filter((item) => {
                return action.itemType === 'dcom' ?
                    item.dcomId !==  action.payload.dcomEntityId
                    : (item.partnerItemId !== action.payload.partnerItemId && item.merchantId !== action.payload.RESTAURANT_ID);
            });
            localStorage.setItem('matches', JSON.stringify(newItems));
            break;
        }

        case removeMatchedItemsByMerchantAction.ACTION: {
            const storedItems = JSON.parse(localStorage.getItem('matches')) || [];
            const newItems = storedItems.filter((item) => {
                return item.merchantId !== action.payload.merchantId;
            });
            localStorage.setItem('matches', JSON.stringify(newItems));
            break;
        }

        case createItemLinkAction.ACTION_COMPLETE: {
            const storedItems = JSON.parse(localStorage.getItem('matches')) || [];
            const newItems = storedItems.filter((item) => {
                return item.partnerItemId !== action.params[0].partnerEntityId;
            });

            localStorage.setItem('matches', JSON.stringify(newItems));
            break;
        }
    }
}