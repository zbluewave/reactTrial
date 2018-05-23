import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import ToolTip from 'react-portal-tooltip';
import _ from 'lodash';
import {
    Loader,
    Label,
    Icon,
    Grid,
    Message
} from 'semantic-ui-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import config from '../../config';
import getMerchantAction from '../../Merchants/ActionCreator/getMerchantAction';
import getMenuAction from '../../Menu/ActionCreator/getMenuAction';
import createItemLinkAction from '../../Menu/ActionCreator/createItemLinkAction';
import removeItemLinkAction from '../../Menu/ActionCreator/removeItemLinkAction';
import addMatchedItemAction from '../../Menu/ActionCreator/addMatchedItemAction';
import removeMatchedItemAction from '../../Menu/ActionCreator/removeMatchedItemAction';
import clearFilterMenuAction from '../ActionCreator/clearFilterMenuAction';

import ContentWrapper from '../../ContentWrapper/Component/ContentWrapper';
import MerchantItemsView from './MerchantItemsView';
import MenuList from '../../Menu/Component/MenuList';

const className = "MerchantItems";
@DragDropContext(HTML5Backend)
@connect(
    state => ({
        merchant: state.merchant,
        merchantItems: state.merchantItems,
        menu: state.menu
    }),
    dispatch => ({
        getMerchant: query => dispatch(getMerchantAction(query)),
        getMenu: merchantInfo => dispatch(getMenuAction(merchantInfo)),
        createLink: itemInfo => dispatch(createItemLinkAction(itemInfo)),
        removeLink: itemInfo => dispatch(removeItemLinkAction(itemInfo)),
        addMatchedItem: item => dispatch(addMatchedItemAction(item)),
        removeMatchedItem: item => dispatch(removeMatchedItemAction(item, 'dcom')),
        clearFilter: () => dispatch(clearFilterMenuAction())
    })
)

class MerchantItems extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            items: {
                linkedItems: null,
                unlinkedItems: null
            },
            filteredMenu: null,
            helpToolTipActive: false
        };
    }

    componentDidMount() {
        this.getMerchant();
        this.props.getMenu({
            merchantId: this.props.match.params.merchantId,
            params: {}
        });
    }

    getMerchant() {
        this.props.getMerchant({
            partnerId: config().partnerId,
            partnerMerchantId: this.props.match.params.partnerMerchantId
        });
    }

    handleShowTooltip() {
        this.setState({ helpToolTipActive: true });
    }

    handleHideTooltip() {
        this.setState({ helpToolTipActive: false });
    }

    handleMenuSearch(searchInput) {
        this.props.clearFilter();
        const menu = this.state.filterClicked ? this.state.filteredMenu : this.props.menu.data.menu;

        const filteredMenu = menu.filter((item) => {

            // regex replaces double spaces with single
            const itemName = item.name ? item.name.toLowerCase().replace(/\s{2,}/g, ' ') : '';
            const itemId = item.id.toString().toLowerCase();
            const itemSection = item.section ? item.section.toLowerCase().replace(/\s{2,}/g, ' ') : '';
            return searchInput.length === 0
                || itemName.indexOf(searchInput) > -1
                || itemId.indexOf(searchInput) > -1
                || itemSection.indexOf(searchInput) > -1;
        });

        this.setState({ filteredMenu });
    }

    handleMenuSearchClear() {
        this.props.clearFilter();
        this.setState({
            filteredMenu: null
        });
    }

    showLinked(clickedItem) {
        const filteredMenu = this.props.menu.data.menu.filter((item) => {
            return clickedItem.ENTITIES_ID === item.id;
        });

        this.setState({
            filteredMenu
        });
    }

    handleFilterClick(clickedItem) {
        const menu = this.state.filteredMenu ? this.state.filteredMenu : this.props.menu.data.menu;
        const searchName = clickedItem.EXTERNAL_ITEM_NAME.toLowerCase();

        const typeFiltered = menu.filter((item) => {
            const itemType = item.type ? item.type.toLowerCase() : 'submenu';
            
            if(clickedItem.ENTITIES_CATEGORY_NAME.toLowerCase() === 'submenu') {
                return itemType.indexOf(clickedItem.ENTITIES_CATEGORY_NAME.toLowerCase()) > -1
                || itemType.indexOf('section') > -1;
            }

            return itemType.indexOf(clickedItem.ENTITIES_CATEGORY_NAME.toLowerCase()) > -1;
        });

        const textFiltered = this.filterMenuByWord(searchName, typeFiltered);

        this.setState({
            filteredMenu: textFiltered.length ? textFiltered : typeFiltered
        });
    }

    filterMenuByWord(searchName, menu) {
        let results = [];
        const words = searchName.toLowerCase().split(' ');

        words.forEach((word) => {
            const filteredWords = menu.filter((item) => {
                const itemName = item.name ? item.name.toLowerCase() : '';
                const itemSection = item.section ? item.section.toLowerCase() : '';
                return itemName.indexOf(word) > -1
                    || itemSection.indexOf(word) > -1;
            });
            results = _.unionBy(results, filteredWords, 'id');
        });
        return results;
    }

    linkAllMatches(matches) {
        Promise.all(matches.map((match) => {
            return this.props.createLink({
                partnerEntityId: match.partnerItemId,
                dcomEntityId: match.dcomEntityId,
                partnerId: config().partnerId,
                partnerMerchantId: this.props.match.params.partnerMerchantId
            });
        }))
        .then(this.handleClearFilter())
        .then(this.getMerchant())
        .catch(error => console.log('failed!', error));
    }

    unlinkItem(item) {
        this.props.removeLink({
            ...item,
            partnerId: config().partnerId,
            partnerMerchantId: this.props.match.params.partnerMerchantId
        });
        
        this.setState({
            filteredMenu: null
        });
    }

    handleClearFilter(clearMenu = true) {
        this.setState({
            filteredMenu: clearMenu ? null : this.state.filteredMenu
        });
    }

    reviewMenuMatches(matches) {
        const filteredMenu = this.props.menu.data.menu.filter((item) => {
            return matches.some((match) => {
                return (match.dcomId == item.id && match.merchantId == this.props.match.params.merchantId);
            });
        });

        this.setState({
            filteredMenu
        });
    }

    handleAddMatchedItem(item) {
        this.props.addMatchedItem(item);
    }

    handleRemoveMatchedItem(item) {
        this.props.removeMatchedItem(item);
    }

    render() {
        const props = this.props;
        const { 
            filteredMenu,
            helpToolTipActive
        } = this.state;

        const unlinkedCount = props.merchantItems.data.unlinkedItems ? props.merchantItems.data.unlinkedItems.length : 0;
        const linkedCount = props.merchantItems.data.linkedItems ? props.merchantItems.data.linkedItems.length : 0;

        return (
            <ContentWrapper>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <div className={`${className}__container`}>
                                {this.renderHeader(props, helpToolTipActive)}
                                {this.renderMerchantItems(props, unlinkedCount, linkedCount)}
                            </div>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            {this.renderMenu(props, filteredMenu)}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </ContentWrapper>
        );
    }

    renderMenu(props, filteredMenu) {
        if (props.menu.loading || props.merchantItems.loading) {
            return (
                <Loader active />
            );
        }

        if (props.menu.error) {
            const errorMessage =
                <div>
                    {props.menu.error.userMessage ? <p>{props.menu.error.userMessage}</p> : ''}
                    <p>{`Code: ${props.menu.error.error}`}</p>
                </div>;

            return (
                <Message
                    error
                    header="Oops!"
                    content={errorMessage}
                />
            );

        }

        if (props.menu.data.menu && props.menu.data.menu.length) {
            const menu = filteredMenu ? filteredMenu : props.menu.data.menu;

            return (
                <MenuList
                    menu={menu}
                    merchantId={props.match.params.merchantId}
                    handleSearch={this.handleMenuSearch}
                    handleClear={this.handleMenuSearchClear}
                    unlinkItem={this.unlinkItem}
                    addMatchedItem={this.handleAddMatchedItem}
                    removeMatchedItem={this.handleRemoveMatchedItem}
                />
            );
        }

        return (
            <div>{"No Menu Found."}</div>
        );
    }

    renderHeader(props, helpToolTipActive) {
        return (
            <div>
                <Link
                    to="/merchants"
                    className={`${className}__back`}
                >
                    <Icon
                        name="arrow circle left"
                        size="large"
                    />
                </Link>
                <Icon 
                    name="question circle" 
                    size="large"
                    id="Help-icon"
                    className={`${className}__help`}
                    onMouseEnter={this.handleShowTooltip}
                    onMouseLeave={this.handleHideTooltip}
                    onClick={this.handleHideTooltip}
                />
                {this.renderHelpTooltip(helpToolTipActive)}
                {props.merchant.data.name}
            </div>
        );
    }

    renderHelpTooltip(active) {
        const style = {
            style: {
                maxWidth: '30%',
                minWidth: '15%',
                border: '2px solid #1F5EA9',
                boxShadow: '5px 5px 3px rgba(0,0,0,.5)'
            },
            arrowStyle: {
                color: '#1F5EA9',
                borderColor: false
            }
        };

        return (
            <ToolTip
                active={active}
                arrow="center"
                parent={"#Help-icon"}
                style={style}
                position={"bottom"}
            >
                <Label attached='top'>
                    <span>Entity Matching Page Help</span>
                </Label>
                <div className={`${className}__help__container`}>
                    <p>{`This page is for matching Merchant entities to the merchant's dcom menu.`}</p>
                    <p>{`Entities on the left are the merchant's entities and the merchant's dcom menu is on the right. 
                    To match, simply drag the merchant entitity to the corresponding menu item.
                    Entities can only be matched to dcom menu items that are not already linked 
                    and are of the same type (i.e. Item to Item, Option to Option).`}</p>
                    <p>{`Once Matched, click "Review Matches" to review the items you wish to match. 
                    You can then alter the matches, or submit these matches to be linked.`}</p>
                    <p>{`For merchant entities, colors play a large role in indicating entity status. 
                    Their background color will alternate to signify relationships. 
                    For example, an item with a corresponding option group will both have the same background color.
                    Entities without any relations will have a white background. This is always the case for Submenus.
                    Linked items are signified by a chain link icon and a lower opacity.`}</p>
                </div>
            </ToolTip>
        );
    }
 
    renderMerchantItems(props, unlinkedCount, linkedCount) {
        if (props.merchantItems.loading || props.menu.loading) {
            return (
                <Loader active />
            );
        }

        if (props.merchantItems.error) {
            const errorMessage = props.merchantItems.error.dev_msg ? props.merchantItems.error.dev_msg : '';
            return (
                <Message
                    error
                    header='Oops!'
                    content={errorMessage}
                />
            );
        }

        return (
            <MerchantItemsView
                items={props.merchantItems.data.menu}
                menu={props.menu.data.menu}
                handleFilterClick={this.handleFilterClick}
                handleClearFilter={this.handleClearFilter}
                linkAllMatches={this.linkAllMatches}
                reviewMenuMatches={this.reviewMenuMatches}
                showLinked={this.showLinked}
                merchantId={props.match.params.merchantId}
                unlinkedCount={unlinkedCount}
                linkedCount={linkedCount}
            />
        );
    }
}

MerchantItems.propTypes = {
    getMerchant: PropTypes.func,
    getMenu: PropTypes.func,
    createLink: PropTypes.func,
    removeLink: PropTypes.func,
    removeMatchedItem: PropTypes.func,
    addMatchedItem: PropTypes.func,
    clearFilter: PropTypes.func,
    match: PropTypes.object,
    merchant: PropTypes.object,
    merchantItems: PropTypes.object,
    menu: PropTypes.array
};

export default MerchantItems;