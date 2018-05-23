import React from 'react';
import MenuList from './MenuList';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import getMatchedItemsAction from '../ActionCreator/getMatchedItemsAction';

const props = {
    menu: [],
    merchantId: '0',
    handleClear: () => { },
    handleSearch: () => { },
    unlinkItem: () => { },
    activeItemType: 'unlinked',
    showMatchActive: false
};

const mockStore = configureMockStore([thunk]);
const storeStateMock = {};
const store = mockStore(storeStateMock);

describe('MenuList', () => {
    test('MenuList renders', () => {
        const component = shallow(<MenuList {...props} store={store} />);
        expect(component.length).toEqual(1);
    });

    test('MenuList receives props', () => {
        const component = shallow(<MenuList {...props} store={store} />);
        expect(component.instance().props).toEqual({ ...props, store: { ...store } });
    });

    test('GetMatchedItemsAction should have a type of MATCHED_ITEMS_GET', () => {
        expect(getMatchedItemsAction.ACTION).toEqual('MATCHED_ITEMS_GET');
    });
});

