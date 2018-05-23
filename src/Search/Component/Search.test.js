import React from 'react';
import Search from './Search';
import { shallow } from 'enzyme';

const props = {
    handleSearch: () => { },
    handleClear: () => { },
    searchTarget: 'merchants'
};

const state = {
    searchInput: 'Test Search Input'
}

describe('Search', () => {
    test('Search renders', () => {
        const component = shallow(<Search {...props} />);
        expect(component.length).toEqual(1);
    });

    test('Search receives props', () => {
        const component = shallow(<Search {...props} />);
        expect(component.instance().props).toEqual({ ...props });
    });

    test('Search should set SearchInput', () => {
        const component = shallow(<Search {...props} />);
        component.setState({ ...state });
        const inputValue = component.find('.Search__input').props().value;
        expect(component.state().searchInput).toEqual(state.searchInput);
        expect(inputValue).toEqual(state.searchInput);
    });
});
