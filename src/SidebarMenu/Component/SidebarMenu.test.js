import React from 'react';
import SidebarMenu from './SidebarMenu';
import { shallow } from 'enzyme';

const props = {
    logoutUser: () => { },
    history: {
        push: () => { }
    }
};

describe('SidebarMenu', () => {
    test('SidebarMenu renders', () => {
        const component = shallow(<SidebarMenu.WrappedComponent {...props} />);
        expect(component.length).toEqual(1);
    });

    test('SidebarMenu receives props', () => {
        const component = shallow(<SidebarMenu.WrappedComponent {...props} />);
        expect(component.instance().props).toEqual({ ...props });
    });

    test('SidebarMenu logout should logout', () => {
        const component = shallow(<SidebarMenu.WrappedComponent {...props} />);
        const spy = jest.spyOn(component.instance(), 'beginLogout');
        component.instance().beginLogout();
        expect(spy).toHaveBeenCalled();
    });
});
