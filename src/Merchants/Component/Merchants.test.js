import React from 'react';
import Merchants from './Merchants';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import getAllMerchantsAction from '../ActionCreator/getAllMerchantsAction';

const props = {
    merchants: []
};

const state = {
    merchants: {
        data: {
            merchants: []
        }
    },
    auth: {
        data: {

        }
    }
};

const mockStore = configureMockStore([thunk]);
const storeStateMock = { ...state };
const store = mockStore(storeStateMock);

describe('Merchants', () => {
    test('Merchants renders', () => {
        const component = shallow(<Merchants {...props} store={store} />);
        expect(component.length).toEqual(1);
    });

    test('Merchants receives props', () => {
        const component = shallow(<Merchants {...props} store={store} />);
        expect(component.instance().props).toEqual({ ...props, store: { ...store } });
    });

    test('GetAllMerchantsAction should have a type of MERCHANTS_GET_ALL', () => {
        expect(getAllMerchantsAction.ACTION).toEqual('MERCHANTS_GET_ALL');
    });
});
