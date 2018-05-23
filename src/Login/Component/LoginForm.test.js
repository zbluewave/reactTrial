import React from 'react';
import LoginForm from './LoginForm';
import { shallow } from 'enzyme';

const props = {
    beginLogin: () => { }
};

const state = {
    password: '',
    email: '',
};

describe('LoginForm', () => {
    test('LoginForm renders', () => {
        const component = shallow(<LoginForm {...props} />);
        expect(component.length).toEqual(1);
    });

    test('LoginForm receives props', () => {
        const component = shallow(<LoginForm {...props} />);
        expect(component.instance().props).toEqual({ ...props });
    });

    test('LoginForm should submit', () => {
        const component = shallow(<LoginForm {...props} />);
        const spy = jest.spyOn(component.instance(), 'handleSubmit');
        component.instance().handleSubmit();
        expect(spy).toHaveBeenCalled();
    });

    test('LoginForm should error on insufficient submit', () => {
        const component = shallow(<LoginForm {...props} />);
        component.setState({ ...state });
        const spy = jest.spyOn(component.instance(), 'handleSubmit');
        component.instance().handleSubmit();
        expect(component.state().emailError).toEqual(true);
        expect(component.state().passwordError).toEqual(true);
    });
});
