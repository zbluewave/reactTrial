import React from 'react';
import ItemTooltip from './ItemTooltip';
import { shallow } from 'enzyme';

const props = {
    active: true,
    parent: '#test',
    position: 'top',
    item: {
        name: 'test tooltip',
        description: 'This is a test tooltip',
        IMAGE_URL: 'https://testimage.org',
        EXTERNAL_ITEM_ID: '123456'
    }
};

describe('ItemTooltip', () => {
    test('ItemTooltip renders', () => {
        const component = shallow(<ItemTooltip {...props} />);
        expect(component.length).toEqual(1);
    });

    test('ItemTooltip receives props', () => {
        const component = shallow(<ItemTooltip {...props} />);
        expect(component.instance().props).toEqual(props);
    })
});

