import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import loginAction from '../ActionCreator/loginAction';
import logoutAction from '../ActionCreator/logoutAction';

const mockStore = configureMockStore([thunk]);
const storeStateMock = {};
const store = mockStore(storeStateMock);

describe('Login', () => {
    test('Login renders', () => {
        const component = shallow(<Login store={store} />);
        expect(component.length).toEqual(1);
    });

    test('LoginAction should have a type of USER_LOGIN', () => {
        expect(loginAction.ACTION).toEqual('USER_LOGIN');
    });

    test('LogoutAction should have a type of USER_LOGOUT', () => {
        expect(logoutAction.ACTION).toEqual('USER_LOGOUT');
    });
});
