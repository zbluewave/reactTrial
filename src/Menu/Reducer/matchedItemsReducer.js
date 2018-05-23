import getMatchedItemsAction from '../ActionCreator/getMatchedItemsAction';
import addMatchedItemAction from '../ActionCreator/addMatchedItemAction';
import removeMatchedItemAction from '../ActionCreator/removeMatchedItemAction';
import removeMatchedItemsByMerchantAction from '../ActionCreator/removeMatchedItemsByMerchantAction';
import createItemLinkAction from '../ActionCreator/createItemLinkAction';

export const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function matchedItemsReducer(state = initialState, action) {
    switch (action.type) {

        case getMatchedItemsAction.ACTION:
            return {
                ...state
            };

        case addMatchedItemAction.ACTION: {
            const newData = state.data.map(item => ({ ...item }));
            newData.push(action.payload);
            return {
                ...state,
                data: newData
            };
        }

        case removeMatchedItemAction.ACTION: {
            const newData = state.data.filter((item) => {
                return action.itemType === 'dcom' ?
                    item.dcomEntityId !== action.payload.dcomEntityId
                    : (item.partnerItemId !== action.payload.partnerItemId && item.merchantId !== action.payload.RESTAURANT_ID);
            });
            return {
                ...state,
                data: newData
            };
        }

        case removeMatchedItemsByMerchantAction.ACTION: {
            const newData = state.data.filter((item) => {
                return item.merchantId !== action.payload.merchantId;
            });

            return {
                ...state,
                data: newData
            };
        }

        case createItemLinkAction.ACTION:
            return {
                ...state,
                loading: true,
                error: null
            };

        case createItemLinkAction.ACTION_COMPLETE: {
            const newData = state.data.filter((item) => {
                return item.partnerItemId !== action.params[0].partnerEntityId;
            });

            return {
                data: newData,
                loading: false,
                error: null
            };
        }
        case createItemLinkAction.ACTION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;

    }
}
