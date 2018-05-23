import React from 'react';
import MerchantsList from './MerchantsList';
import { shallow } from 'enzyme';

const props = {
    handleSearch: () => { },
    handleClear: () => { }
};

describe('MerchantsList', () => {
    test('MerchantsList renders', () => {
        const component = shallow(<MerchantsList {...props} />);
        expect(component.length).toEqual(1);
    });

    test('MerchantsList receives props', () => {
        const component = shallow(<MerchantsList {...props} />);
        expect(component.instance().props).toEqual({ ...props, });
    });

});
