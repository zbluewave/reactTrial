import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import getMatchedItemsAction from '../../Menu/ActionCreator/getMatchedItemsAction';
import removeMatchedItemAction from '../../Menu/ActionCreator/removeMatchedItemAction';
import removeMatchedItemsByMerchantAction from '../../Menu/ActionCreator/removeMatchedItemsByMerchantAction';
import clearFilterMenuAction from '../ActionCreator/clearFilterMenuAction';

export default function (DecoratedComponent) {

    @connect(
        state => ({
            matchedItems: state.matchedItems
        }),
        dispatch => ({
            getMatchedItems: () => dispatch(getMatchedItemsAction()),
            removeMatchedItem: item => dispatch(removeMatchedItemAction(item, 'partner')),
            clearAllMatches: merchant => dispatch(removeMatchedItemsByMerchantAction(merchant)),
            clearFilter: () => dispatch(clearFilterMenuAction())
        })
    )
    class MerchantItemsViewDecorator extends Component {

        constructor(props) {
            super(props);
            autoBind(this);
        }

        setLinkedItems(merchantItems, menu) {
            if(!this.props.items) {
                return merchantItems;
            }

            if(menu && menu.length) {
                merchantItems.forEach((merchantItem) => {
                    merchantItem.link = null;
                    menu.forEach((menuItem) => {
                        if (merchantItem.ENTITIES_ID === menuItem.id) {
                            merchantItem.link = {
                                ...menuItem
                            };
                        }
                    });
                });
            }
            return merchantItems;
        }

        render() {
            return (
                <DecoratedComponent
                    {...this.props}
                    items={this.setLinkedItems(this.props.items, this.props.menu)}
                />
            );
        }
    }

    MerchantItemsViewDecorator.propTypes = {
        items: PropTypes.array,
        menu: PropTypes.object,
        clearAllMatches: PropTypes.func,
        clearFilter: PropTypes.func,
        removeMatchedItem: PropTypes.func,
        getMatchedItems: PropTypes.func,
        matchedItems: PropTypes.array,
        merchantItems: PropTypes.object
    };

    return MerchantItemsViewDecorator;
}