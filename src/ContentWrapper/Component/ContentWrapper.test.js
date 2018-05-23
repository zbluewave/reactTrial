import React from 'react';
import { shallow } from 'enzyme';
import ContentWrapper from './ContentWrapper';

const props = {};

describe('ContentWrapper', () => {
    test('ContentWrapper renders', () => {
        const component = shallow(<ContentWrapper />);
        expect(component.length).toEqual(1);
    });

    test('ContentWrapper renders children', () => {
        const component = shallow(<ContentWrapper><div className="test" /></ContentWrapper>);
        expect(component.contains(<div className="test" />)).toEqual(true);
    });
});
