import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import autoBind from 'react-autobind';
import {
    Label,
    Icon
} from 'semantic-ui-react';
import dragAndDropModel from '../../MerchantItems/Model/DragAndDropModel';

import clearFilterMenuLinkedItemAction from '../../MerchantItems/ActionCreator/clearFilterMenuLinkedItemAction';

import ItemTooltip from '../../ItemTooltip/Component/ItemTooltip';

const menuItemSource = {
    drop(props, monitor, component) {
        if (component.state.lastDroppedItem !== null) {
            return;
        }

        const droppedItem = monitor.getItem();

        props.addMatchedItem({
            ...droppedItem,
            merchantId: props.merchantId,
            dcomId: props.item.id,
            dcomEntityId: props.item.id,
            matchedMenuName: props.item.name || props.item.section || ''
        });
        component.setState({
            lastDroppedItem: droppedItem
        });

        return { dropped: true };
    }
};
@connect(
    state => ({
        matchedItems: state.matchedItems
    }),
    dispatch => ({
        clearLinkedFilter: () => dispatch(clearFilterMenuLinkedItemAction())
    })
)
@DropTarget(props => dragAndDropModel(props.item.type.toLowerCase()), menuItemSource, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
}))
export default class MenuItem extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            hasDropped: false,
            lastDroppedItem: props.match || null,
            tooltipActive: false,
            unlinkConfirmationActive: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            lastDroppedItem: nextProps.match
        });
    }

    clearMatch() {
        this.props.removeMatchedItem({
            dcomEntityId: this.props.item.id
        });
        this.setState({
            lastDroppedItem: null
        });
    }

    unlinkConfirm() {
        const item = {
            partnerEntityId: this.props.item.link.ID,
            dcomEntityId: this.props.item.id
        };
        this.setState({ unlinkConfirmationActive: false });
        this.props.clearLinkedFilter();
        this.props.unlinkItem(item);
    }

    unlinkCancel() {
        this.setState({ unlinkConfirmationActive: false });
    }

    unlinkClick() {
        this.setState({ unlinkConfirmationActive: true });
    }

    handleShowTooltip() {
        this.setState({ tooltipActive: true });
    }

    handleHideTooltip() {
        this.setState({ tooltipActive: false });
    }

    render() {
        const props = this.props;
        const { connectDropTarget, item } = props;
        const { tooltipActive, lastDroppedItem, unlinkConfirmationActive } = this.state;
        const labelColor = props.canDrop ? 'blue' : 'grey';
        const isSection = item.hasOwnProperty('section');
        const itemType = item.type ? item.type : 'section';

        let isOverCurrent = '';

        if (props.isOverCurrent) {
            isOverCurrent = this.state.lastDroppedItem !== null && props.canDrop ? 'dragHover__disabled' : 'dragHover';
        } else {
            isOverCurrent = 'initial';
        }

        //regex strips out spaces for types such as 'option group'
        const className = itemType !== 'item' ? `Menu__${itemType.replace(/\s+/g, '')}` : '';
        const itemPrice = item.price ? `$${item.price}` : '';
        let itemClass = '';

        if (
            isSection
            || itemType === 'menu'
            || itemType === 'option group'
            || itemType === 'price group'
        ) {
            itemClass = 'Menu__submenu';
        } else {
            itemClass = 'Menu__item';
        }

        if (props.item.link) {
            return MenuItem.renderLinkedItem(
                props,
                item, 
                itemClass, 
                itemPrice, 
                className,
                tooltipActive,
                this.handleShowTooltip,
                this.handleHideTooltip,
                this.unlinkClick,
                this.unlinkConfirm,
                this.unlinkCancel,
                unlinkConfirmationActive
            );
        }

        return connectDropTarget(
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    ...props.style,
                }}
                onMouseEnter={this.handleShowTooltip}
                onMouseLeave={this.handleHideTooltip}
                onClick={this.handleHideTooltip}
            >
                <div
                    className={`${itemClass}__${isOverCurrent} ${className}`}
                    id={`menu--${item.id}`}
                >
                    <ItemTooltip
                        active={tooltipActive}
                        position="left"
                        item={props.item}
                        parent={`#menu--${item.id}`}
                    />
                    <div className={`${itemClass}__container`}>
                        <Label 
                            className={`${itemClass}__label`}
                            color={labelColor}
                        >
                            {itemType}
                        </Label>
                        <div className={`${itemClass}__name`}>{item.name || item.section}</div>
                        <div className={`${itemClass}__info`}>{itemPrice}</div>
                        <div className={`${itemClass}__info`}>{item.id}</div>
                    </div>
                    {MenuItem.renderMatch(item, lastDroppedItem, itemClass, this.clearMatch)}
                </div>
            </div>
        );

    }

    static renderLinkedItem(
        props,
        item,
        itemClass,
        itemPrice,
        className,
        tooltipActive,
        handleShowTooltip,
        handleHideTooltip,
        unlinkClick,
        unlinkConfirm,
        unlinkCancel,
        unlinkConfirmationActive
    ) {
        const linkedItem = item.link;
        const linkedMessage = linkedItem ? `Linked to ${linkedItem.EXTERNAL_ITEM_NAME}` : '';
        const linkedContainer = unlinkConfirmationActive ? `${itemClass}__linked__container__confirmation` : `${itemClass}__linked__container`;

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    ...props.style,
                }}
                onMouseEnter={handleShowTooltip}
                onMouseLeave={handleHideTooltip}
                onClick={handleHideTooltip}
            >
                <div
                    className={`${itemClass}__initial ${className}`}
                    id={`menu--${item.id}`}
                >
                    <ItemTooltip
                        active={tooltipActive}
                        position="left"
                        item={props.item}
                        parent={`#menu--${item.id}`}
                        linkedItem={linkedItem}
                    />
                    <div className={`${itemClass}__container`}>
                        <Label className={`${itemClass}__label`}>
                            {item.type}
                        </Label>
                        <div className={`${itemClass}__name`}>{item.name || item.section}</div>
                        <div className={`${itemClass}__info`}>{itemPrice}</div>
                        <div className={`${itemClass}__info`}>{item.id}</div>
                    </div>
                    <div className={linkedContainer}>
                        <div className={`${itemClass}__linked__name`}>
                            {linkedMessage}
                        </div>
                        {MenuItem.renderUnlinkButton(itemClass, unlinkConfirmationActive, unlinkClick, unlinkConfirm, unlinkCancel)}
                    </div>
                </div>
            </div>
        );
    }

    static renderUnlinkButton(itemClass, unlinkConfirmationActive, unlinkClick, unlinkConfirm, unlinkCancel) {
        if(unlinkConfirmationActive) {
            return (
                <React.Fragment>
                    <button
                        type="button"
                        onClick={unlinkCancel}
                        className={`${itemClass}__linked__cancel`}
                    >
                        <Icon name="cancel" />
                        {"Cancel"}
                    </button>
                    <button
                        type="button"
                        onClick={unlinkConfirm}
                        className={`${itemClass}__linked__button`}
                    >
                        <Icon name="unlinkify" />
                        {"Confirm Unlink"}
                    </button>
                </React.Fragment>
            );
        }

        return (
            <button
                type="button"
                onClick={unlinkClick}
                className={`${itemClass}__linked__button`}
            >
                <Icon name="unlinkify" />
                Unlink
            </button>
        );
    }

    static renderMatch(item, lastDroppedItem, itemClass, clearMatch) {
        if (lastDroppedItem) {
            return (
                <div className={`${itemClass}__droppedItem`}>
                    <div className={`${itemClass}__droppedItem__text`}>
                        {lastDroppedItem.name}
                    </div>
                    <div className={`${itemClass}__droppedItem__clear__container`}>
                        <button
                            type="button"
                            onClick={clearMatch}
                            className={`${itemClass}__droppedItem__clear`}
                        >
                            {"Clear"}
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className={`${itemClass}__path`}>{item.path}</div>
        );
    }
}

MenuItem.propTypes = {
    item: PropTypes.object.isRequired,
    unlinkItem: PropTypes.func.isRequired,
    canDrop: PropTypes.bool,
    children: PropTypes.any,
    connectDropTarget: PropTypes.func,
    isOver: PropTypes.bool,
    isOverCurrent: PropTypes.bool,
    style: PropTypes.any,
    addMatchedItem: PropTypes.func,
    removeMatchedItem: PropTypes.func,
    clearLinkedFilter: PropTypes.func,
    match: PropTypes.object
};