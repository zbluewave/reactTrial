import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
    it('App renders', () => {
        const component = shallow(<App />);
        expect(component.length).toEqual(1);
    });
});