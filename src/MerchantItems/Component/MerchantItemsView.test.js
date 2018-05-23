import React from 'react';
import MerchantItemsView from './MerchantItemsView';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import getMatchedItemsAction from '../../Menu/ActionCreator/getMatchedItemsAction';
import removeMatchedItemAction from '../../Menu/ActionCreator/removeMatchedItemAction';
import removeMatchedItemsByMerchantAction from '../../Menu/ActionCreator/removeMatchedItemsByMerchantAction';

const props = {
    merchantId: '0',
    handleFilterClick: () => { },
    handleClearFilter: () => { },
    handleClearMatch: () => { },
    handleShowMatch: () => { },
    handleClearShowMatch: () => { },
    toggleItems: () => { },
    filterActive: false,
    activeItemType: 'unlinked',
    showMatchActive: false,
    linkAllMatches: () => { }
};

const mockStore = configureMockStore([thunk]);
const storeStateMock = {};
const store = mockStore(storeStateMock);

describe('MerchantItemsView', () => {
    test('MerchantItemsView renders', () => {
        const component = shallow(<MerchantItemsView store={store} {...props} />);
        expect(component.length).toEqual(1);
    });

    test('MerchantItemsView receives props', () => {
        const component = shallow(<MerchantItemsView {...props} store={store} />);
        expect(component.instance().props).toEqual({ ...props, store: { ...store } });
    });

    test('GetMatchedItemsAction should have a type of MATCHED_ITEMS_GET', () => {
        expect(getMatchedItemsAction.ACTION).toEqual('MATCHED_ITEMS_GET');
    });

    test('RemoveMatchedItemAction should have a type of MATCHED_ITEMS_REMOVE', () => {
        expect(removeMatchedItemAction.ACTION).toEqual('MATCHED_ITEMS_REMOVE');
    });

    test('RemoveMatchedItemsByMerchantAction should have a type of MATCHED_ITEMS_MERCHANT_REMOVE', () => {
        expect(removeMatchedItemsByMerchantAction.ACTION).toEqual('MATCHED_ITEMS_MERCHANT_REMOVE');
    });
});
