import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import getMatchedItemsAction from '../ActionCreator/getMatchedItemsAction';

export default function (DecoratedComponent) {

	@connect(
        state => ({
            matchedItems: state.matchedItems,
            merchantItems: state.merchantItems
        }),
        dispatch => ({
            getMatchedItems: () => dispatch(getMatchedItemsAction()),
        })
	)
	class MenuDecorator extends Component {

		constructor(props) {
            super(props);
            autoBind(this);
        }

        setLinkedItems(menu, linkedItems) {
            if(this.props.merchantItems.loading || this.props.merchantItems.error) {
                return menu;
            }

            if(menu && menu.length) {
                menu.forEach((item) => {
                    item.link = null;
                    linkedItems.forEach((linkedItem) => {
                        if (linkedItem.ENTITIES_ID === item.id) {
                            item.link = {
                                ...linkedItem
                            };
                        }
                    });
                });
            }
            return menu;
        }

		render() {
			return (
				<DecoratedComponent
                    {...this.props}
                    menu={this.setLinkedItems(this.props.menu, this.props.merchantItems.data.linkedItems)}
                />
			);
		}
	}

	MenuDecorator.propTypes = {
        menu: PropTypes.array,
        merchantItems: PropTypes.object
	};

	return MenuDecorator;
}