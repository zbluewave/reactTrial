import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import {
    Icon,
    Label
} from 'semantic-ui-react';
import dragAndDropModel from '../Model/DragAndDropModel';

import filterMenuAction from '../ActionCreator/filterMenuAction';
import clearFilterMenuAction from '../ActionCreator/clearFilterMenuAction';
import filterMenuLinkedItemAction from '../ActionCreator/filterMenuLinkedItemAction';
import clearFilterMenuLinkedItemAction from '../ActionCreator/clearFilterMenuLinkedItemAction';
import ItemTooltip from '../../ItemTooltip/Component/ItemTooltip';

const itemSource = {
    beginDrag(props) {
        return {
            name: props.item.EXTERNAL_ITEM_NAME,
            price: props.item.PRICE,
            partnerItemId: props.item.ID,
            description: props.item.DESCRIPTION,
            type: props.item.ENTITIES_CATEGORY_NAME
        };
    },
    endDrag(props, monitor, component) {
        if (monitor.didDrop() && monitor.getDropResult().dropped) {
            component.handleClearFilterClick(true, true);
        }
    }
};

const className = "Item";

@connect(
    state => ({
        matchedItems: state.matchedItems,
        filteredItem: state.filteredItem,
        linkedItem: state.linkedItem
    }),
    dispatch => ({
        filterMenu: item => dispatch(filterMenuAction(item)),
        clearFilter: () => dispatch(clearFilterMenuAction()),
        filterLinked: item => dispatch(filterMenuLinkedItemAction(item)),
        clearLinkedFilter: () => dispatch(clearFilterMenuLinkedItemAction())
    })
)
@DragSource(props => dragAndDropModel(props.item.ENTITIES_CATEGORY_NAME.toLowerCase()), itemSource, connect => ({
    connectDragSource: connect.dragSource()
}))
class Item extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            item: props.item || {},
            matched: props.matched,
            tooltipActive: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            matched: nextProps.matched
        });
    }

    handleClick() {
        this.props.filterClick(this.props.item);
        this.props.filterMenu(this.props.item);
    }

    handleClearFilterClick(clearMenu = true, matched = this.state.matched) {
        this.props.handleClearFilter(clearMenu);
        this.props.clearFilter();
        this.setState({
            matched
        });
    }

    handleClearLinked() {
        this.props.handleClearFilter(true);
        this.props.clearLinkedFilter();
    }

    handleShowLinked() {
        this.props.showLinked(this.props.item);
        this.props.filterLinked(this.props.item);
    }

    handleClearMatchClick() {
        this.props.handleClearMatch({
            partnerItemId: this.props.item.ID,
            ...this.props.item
        });
    }

    handleShowTooltip() {
        this.setState({ tooltipActive: true });
    }

    handleHideTooltip() {
        this.setState({ tooltipActive: false });
    }

    findMatchedItem() {
        let match = {};

        if (this.props.matchedItems.data.length) {
            match = this.props.matchedItems.data.find((match) => {
                return (
                    this.props.item.ID === match.partnerItemId
                    && this.props.item.RESTAURANT_ID == match.merchantId
                );
            });
        }

        return match;
    }

    determineFiltering(item, filtered) {
        if(filtered) {
            return filtered.ID == item.ID
            && filtered.RESTAURANT_ID == item.RESTAURANT_ID;
        }

        return false;
    }

    determineDisabled(item, filtered) {
        if(filtered) {
            return filtered.ID != item.ID 
            && filtered.RESTAURANT_ID == item.RESTAURANT_ID;
        }

        return false;
    }

    render() {
        const props = this.props;
        const { 
            tooltipActive,
            matched 
        } = this.state;

        const price = props.item.PRICE ? `$${props.item.PRICE}` : '';

        if (matched) {
            return Item.renderMatchedItem(
                props,
                price,
                this.findMatchedItem(),
                tooltipActive,
                this.handleShowTooltip,
                this.handleHideTooltip,
                this.handleClearMatchClick
            );
        }

        if (props.item.PE_KEY) {
            return Item.renderLinkedItem(
                props,
                price,
                props.item.color,
                tooltipActive,
                this.handleShowTooltip,
                this.handleHideTooltip,
                this.renderFilter
            );
        }

        return props.connectDragSource(
            <div
                id={`item--${props.item.ID}`}
                className={`${className}__row`}
                onMouseEnter={this.handleShowTooltip}
                onMouseLeave={this.handleHideTooltip}
                onClick={this.handleHideTooltip}
                style={{backgroundColor: props.item.color}}
            >
                <div className={`${className}__container`}>
                    <ItemTooltip
                        active={tooltipActive}
                        position="right"
                        item={props.item}
                        parent={`#item--${props.item.ID}`}
                    />
                    <Icon
                        size="large"
                        name="move"
                        color="blue"
                    />
                    <div className={`${className}__labelName`}>
                        <Label>{props.item.ENTITIES_CATEGORY_NAME}</Label>
                    </div>
                    <div className={`${className}__labelName`}>
                        <span>{props.item.EXTERNAL_ITEM_NAME}</span>
                    </div>
                    <div className={`${className}__price`}>{price}</div>
                    {this.renderFilter(false, props)}
                </div>
            </div>
        );
    }

    static renderLinkedItem(
        props,
        price,
        color,
        tooltipActive,
        handleShowTooltip,
        handleHideTooltip,
        renderFilter
    ) {
        return (
            <div
                id={`item--${props.item.ID}`}
                className={`${className}__row__linked`}
                onMouseEnter={handleShowTooltip}
                onMouseLeave={handleHideTooltip}
                onClick={handleHideTooltip}
                style={{
                    backgroundColor: color
                }}
            >
                <div className={`${className}__container`}>
                    <ItemTooltip
                        active={tooltipActive}
                        position="right"
                        item={props.item}
                        parent={`#item--${props.item.ID}`}
                        linkedItem={props.item.link}
                    />
                    <Icon
                        size="large"
                        name="chain"
                    />
                    <div className={`${className}__labelName`}>
                        <Label>{props.item.ENTITIES_CATEGORY_NAME}</Label>
                    </div>
                    <div className={`${className}__labelName`}>
                        <span>{props.item.EXTERNAL_ITEM_NAME}</span>
                    </div>
                    <div className={`${className}__price`}>{price}</div>
                    {renderFilter(true, props)}
                </div>
            </div>
        );
    }

    static renderMatchedItem(
        props,
        price,
        match,
        tooltipActive,
        handleShowTooltip,
        handleHideTooltip,
        handleClearMatchClick
    ) {

        return (
            <div
                id={`item--${props.item.ID}`}
                className={`${className}__row__matched`}
                onMouseEnter={handleShowTooltip}
                onMouseLeave={handleHideTooltip}
                onClick={handleHideTooltip}
            >
                <div className={`${className}__container`}>
                    <ItemTooltip
                        active={tooltipActive}
                        position="right"
                        item={props.item}
                        matchedItem={match}
                        parent={`#item--${props.item.ID}`}
                    />
                    <Icon
                        size="large"
                        name="checkmark"
                    />
                    <div className={`${className}__labelName`}>
                        <Label>{props.item.ENTITIES_CATEGORY_NAME}</Label>
                    </div>
                    <div className={`${className}__labelName`}>
                        <span>{props.item.EXTERNAL_ITEM_NAME}</span>
                    </div>
                    <div>{price}</div>
                    <button
                        type="button"
                        className={`${className}__row__matched__clear`}
                        onClick={handleClearMatchClick}
                    >
                        {"Clear Match"}
                    </button>
                </div>
            </div>
        );
    }

    renderFilter(linked, props) {
        const filtered = linked ? props.linkedItem.data : props.filteredItem.data;
        const disabled = this.determineDisabled(props.item, filtered);

        if (this.determineFiltering(props.item, filtered)) {
            return (
                <button
                    className={`${className}__filter__clear`}
                    type="button"
                    onClick={linked ? this.handleClearLinked : this.handleClearFilterClick}
                    disabled={disabled}
                >
                    {"Clear Filter"}
                </button>
            );
        }

        return (
            <button
                className={`${className}__filter`}
                type="button"
                onClick={linked ? this.handleShowLinked : this.handleClick}
                disabled={disabled}
            >
                {linked ? "Show Linked" : "Filter"}
            </button>
        );

    }
}

Item.propTypes = {
    filterClick: PropTypes.func.isRequired,
    showLinked: PropTypes.func.isRequired,
    handleClearFilter: PropTypes.func.isRequired,
    handleClearMatch: PropTypes.func.isRequired,
    matched: PropTypes.bool.isRequired,
    item: PropTypes.object,
    connectDragSource: PropTypes.func,
    filterMenu: PropTypes.func,
    filterLinked: PropTypes.func,
    clearFilter: PropTypes.func,
    clearLinkedFilter: PropTypes.func,
    matchedItems: PropTypes.object,
    filteredItem: PropTypes.object,
    linkedItem: PropTypes.object
};

export default Item;

