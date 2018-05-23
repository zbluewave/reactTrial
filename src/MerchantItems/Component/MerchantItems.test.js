import React from 'react';
import MerchantItems from './MerchantItems';
import { shallow } from 'enzyme';
import getMerchantAction from '../../Merchants/ActionCreator/getMerchantAction';
import getMenuAction from '../../Menu/ActionCreator/getMenuAction';
import createItemLinkAction from '../../Menu/ActionCreator/createItemLinkAction';
import removeItemLinkAction from '../../Menu/ActionCreator/removeItemLinkAction';
import setLinkedMenuAction from '../../Menu/ActionCreator/setLinkedMenuAction';

const props = {};

describe('MerchantItems', () => {
    test('MerchantItems renders', () => {
        const component = shallow(<MerchantItems {...props} />);
        expect(component.length).toEqual(1);
    });

    test('GetMerchantAction should have a type of MERCHANT_GET', () => {
        expect(getMerchantAction.ACTION).toEqual('MERCHANT_GET');
    });

    test('GetMenuAction should have a type of MERCHANT_MENU_GET', () => {
        expect(getMenuAction.ACTION).toEqual('MERCHANT_MENU_GET');
    });

    test('CreateItemLinkAction should have a type of MATCHED_ITEMS_LINK', () => {
        expect(createItemLinkAction.ACTION).toEqual('MATCHED_ITEMS_LINK');
    });

    test('RemoveItemLinkAction should have a type of MATCHED_ITEMS_UNLINK', () => {
        expect(removeItemLinkAction.ACTION).toEqual('MATCHED_ITEMS_UNLINK');
    });

    test('SetLinkedMenuAction should have a type of MERCHANT_MENU_SET_LINKED', () => {
        expect(setLinkedMenuAction.ACTION).toEqual('MERCHANT_MENU_SET_LINKED');
    });
});
