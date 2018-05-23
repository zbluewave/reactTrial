import React, { Component } from 'react';

import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import Item from './Item';
import {
    Label,
    Button
} from 'semantic-ui-react';

import MerchantItemsViewDecorator from '../Decorator/merchantItemsViewDecorator';

const className = "MerchantItemsView";

@MerchantItemsViewDecorator
class MerchantItemsView extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            reviewActive: false,
            reviewingItems: null
        };
    }

    componentDidMount() {
        this.props.getMatchedItems();
    }

    handleFilterClick(item) {
        this.props.handleFilterClick(item);
    }

    handleClearMatch(item) {
        this.props.removeMatchedItem(item);
    }

    handleClearAllMatches() {
        if (this.state.reviewActive) {
            this.props.clearFilter();
            this.props.handleClearFilter();
        }

        this.setState({
            reviewActive: false,
            reviewingItems: null
        });
        this.props.clearAllMatches({ merchantId: this.props.merchantId });
    }

    handleLinkMatches() {
        this.props.linkAllMatches(this.props.matchedItems.data);
    }

    cancelReviewMatches() {
        this.props.handleClearFilter();
        this.props.clearFilter();
        this.setState({
            reviewActive: false,
            reviewingItems: null
        });
    }

    reviewMatches() {
        const reviewingItems = this.props.items.filter((item) => {
            return this.props.matchedItems.data.some((match) => {
                return (match.partnerItemId == item.ID && match.merchantId == item.RESTAURANT_ID);
            });
        });

        if (reviewingItems.length) {
            this.props.reviewMenuMatches(this.props.matchedItems.data);
            this.setState({
                reviewActive: true,
                reviewingItems
            });
        }
    }

    render() {
        const props = this.props;
        const {
            reviewActive,
            reviewingItems
        } = this.state;
        const items = (reviewActive) ? reviewingItems : props.items;

        if (items && items.length) {
            return (
                <div className={`${className}__section`}>
                    {this.renderQuickinfo(props)}
                    {this.renderButtons(props, reviewActive)}
                    <div className={`${className}__table`}>
                        <div className={`${className}__table__body`}>
                            {this.renderRows(items, props)}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className={`${className}__section`}>
                {this.renderQuickinfo(props)}
                {this.renderButtons(props, reviewActive)}
                <div className={`${className}__table`}>
                    <div className={`${className}__table__body`}>
                        <div className="Item__row__noResults">
                            {"No Entities Found."}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderQuickinfo(props) {
        return (
            <div className={`${className}__quickInfo`}>
                <div>
                    <Label
                        horizontal
                    >
                        {`Merchant ID: ${props.merchantId || ''}`}
                    </Label>
                </div>
                <div>
                    <Label
                        horizontal
                        color="blue"
                    >  
                        {`Unlinked Entities: ${props.unlinkedCount}`}
                    </Label>
                </div>
                <div>
                    <Label
                        horizontal
                        color="black"
                    > 
                        {`Linked Entities: ${props.linkedCount}`}
                    </Label>
                </div>
            </div>
        );
    }

    renderButtons(props, reviewActive) {
        return (
            <div className={`${className}__button__container`}>
                {this.renderLinkButton(props, reviewActive)}
                {this.renderClearButton()}
                {this.renderCancelButton(reviewActive)}
            </div>
        );
    }

    renderRows(items, props) {
        if (items.length) {
            const matchedItems = props.matchedItems.data || [];

            return items.map((item, index) => {
                const itemSearch = matchedItems.find((matchedItem) => {
                    return (item.ID === matchedItem.partnerItemId && item.RESTAURANT_ID == matchedItem.merchantId);
                });

                const matched = itemSearch ? true : false;
                return (
                    <Item
                        key={index}
                        item={item}
                        filterClick={this.handleFilterClick}
                        handleClearFilter={props.handleClearFilter}
                        handleClearMatch={this.handleClearMatch}
                        showLinked={props.showLinked}
                        matched={matched}
                    />
                );
            });
        }
    }

    renderClearButton() {
        return (
            <button
                type="button"
                onClick={this.handleClearAllMatches}
                className={`${className}__button`}
            >
                {"Clear Matches"}
            </button>
        );
    }

    renderCancelButton(reviewActive) {
        if (reviewActive) {
            return (
                <button
                    type="button"
                    onClick={this.cancelReviewMatches}
                    className={`${className}__button`}
                >
                    {"Cancel Review"}
                </button>
            );
        }
    }

    renderLinkButton(props, reviewActive) {
        if (props.matchedItems.loading) {
            return (
                <Button
                    className={`${className}__button__submit`}
                    basic
                    loading
                />
            );
        }

        if (reviewActive) {
            return (
                <button
                    onClick={this.handleLinkMatches}
                    className={`${className}__button__submit`}
                >
                    {"Submit Matches"}
                </button>
            );
        }

        return (
            <button
                onClick={this.reviewMatches}
                className={`${className}__button__submit`}
                disabled={(props.matchedItems.data.length === 0)}
            >
                {"Review Matches"}
            </button>
        );
    }
}

MerchantItemsView.propTypes = {
    items: PropTypes.array,
    merchantId: PropTypes.string.isRequired,
    handleFilterClick: PropTypes.func.isRequired,
    handleClearFilter: PropTypes.func.isRequired,
    linkAllMatches: PropTypes.func.isRequired,
    reviewMenuMatches: PropTypes.func.isRequired,
    showLinked: PropTypes.func.isRequired,
    clearAllMatches: PropTypes.func,
    clearFilter: PropTypes.func,
    removeMatchedItem: PropTypes.func,
    getMatchedItems: PropTypes.func,
    matchedItems: PropTypes.array,
    unlinkedCount: PropTypes.number,
    linkedCount: PropTypes.number
};

export default MerchantItemsView;

