import React from 'react';
import MerchantsRow from './MerchantsRow';
import { shallow } from 'enzyme';

const props = {
    merchant: {
        partnerMerchantId: '1',
        metaData: {
            ratio: 0,
            lastLinkUpdate: new Date(),
            lastYextUpdate: new Date()
        }
    }
};

describe('MerchantsRow', () => {
    test('MerchantsRow renders', () => {
        const component = shallow(<MerchantsRow {...props} />);
        expect(component.length).toEqual(1);
    });

    test('MerchantsRow receives props', () => {
        const component = shallow(<MerchantsRow {...props} />);
        expect(component.instance().props).toEqual({ ...props });
    });
});
