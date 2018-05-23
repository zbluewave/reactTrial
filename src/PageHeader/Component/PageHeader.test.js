import React from 'react';
import PageHeader from './PageHeader';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const props = {
    auth: {
        data: {
            user: {
                first_name: 'Testy',
                last_name: 'McTestFace'
            },
            loggedIn: true
        }
    }
};

const mockStore = configureMockStore([thunk]);
const storeStateMock = { ...props };
const store = mockStore(storeStateMock);

describe('PageHeader', () => {
    test('PageHeader renders', () => {
        const component = shallow(<PageHeader {...props} store={store} />);
        expect(component.length).toEqual(1);
    });

    test('PageHeader receives props', () => {
        const component = shallow(<PageHeader {...props} store={store} />);
        expect(component.instance().props).toEqual({ ...props, store: { ...store } });
    });
});
