import React from 'react';
import MenuItem from './MenuItem';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import addMatchedItemAction from '../ActionCreator/addMatchedItemAction';
import removeMatchedItemAction from '../ActionCreator/removeMatchedItemAction';

const props = {
    item: {},
    showMatchActive: false,
    activeItemType: 'unlinked',
    unlinkItem: () => { }
};

const mockStore = configureMockStore([thunk]);
const storeStateMock = {};
const store = mockStore(storeStateMock);

describe('MenuItem', () => {
    test('MenuItem renders', () => {
        const component = shallow(<MenuItem {...props} store={store} />);
        expect(component.length).toEqual(1);
    });

    test('MenuItem receives props', () => {
        const component = shallow(<MenuItem {...props} store={store} />);
        expect(component.instance().props).toEqual({ ...props, store: { ...store } });
    });

    test('AddMatchedItemAction should have a type of MATCHED_ITEMS_ADD', () => {
        expect(addMatchedItemAction.ACTION).toEqual('MATCHED_ITEMS_ADD');
    });

    test('RemoveMatchedItemAction should have a type of MATCHED_ITEMS_REMOVE', () => {
        expect(removeMatchedItemAction.ACTION).toEqual('MATCHED_ITEMS_REMOVE');
    });
});

