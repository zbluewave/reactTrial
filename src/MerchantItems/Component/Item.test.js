import React from 'react';
import Item from './Item';
import { shallow } from 'enzyme';

import filterMenuAction from '../ActionCreator/filterMenuAction';
import clearFilterMenuAction from '../ActionCreator/clearFilterMenuAction';
import filterMenuLinkedItemAction from '../ActionCreator/filterMenuLinkedItemAction';
import clearFilterMenuLinkedItemAction from '../ActionCreator/clearFilterMenuLinkedItemAction';

const props = {
    filterClick: () => { },
    handleClearFilter: () => { },
    handleClearMatch: () => { },
    handleShowMatch: () => { },
    handleClearShowMatch: () => { },
    filterActive: false,
    matched: false,
    showMatchActive: false,
    activeItemType: 'unlinked',
    item: {
        EXTERNAL_ITEM_NAME: 'Test Item',
        PRICE: '4.00'
    }
};

describe('Item', () => {
    test('Item renders', () => {
        const wrappedComponent = Item.DecoratedComponent;
        const component = shallow(<wrappedComponent {...props} />);
        expect(component.length).toEqual(1);
    });

    test('Item receives props', () => {
        const wrappedComponent = Item.DecoratedComponent;
        const component = shallow(<wrappedComponent {...props} />);
        expect(component.props()).toEqual({ ...props });
    });

    test('filterMenuAction should have a type of FILTER_ITEM_ADD', () => {
        expect(filterMenuAction.ACTION).toEqual('FILTER_ITEM_ADD');
    });

    test('clearFilterMenuAction should have a type of FILTER_ITEM_REMOVE', () => {
        expect(clearFilterMenuAction.ACTION).toEqual('FILTER_ITEM_REMOVE');
    });

    test('filterMenuLinkedItemAction should have a type of FILTER_LINKED_ADD', () => {
        expect(filterMenuLinkedItemAction.ACTION).toEqual('FILTER_LINKED_ADD');
    });

    test('clearFilterMenuLinkedItemAction should have a type of FILTER_LINKED_REMOVE', () => {
        expect(clearFilterMenuLinkedItemAction.ACTION).toEqual('FILTER_LINKED_REMOVE');
    });
});


