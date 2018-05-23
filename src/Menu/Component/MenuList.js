import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { List, AutoSizer } from 'react-virtualized';

import MenuItem from './MenuItem';
import Search from '../../Search/Component/Search';

import MenuDecorator from '../Decorator/menuDecorator';

const className = "MenuList";

@MenuDecorator
class MenuList extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        this.props.getMatchedItems();
    }

    rowRender({ key, index, style }) {
        const itemToRender = this.props.menu[index];
        let matchedItems = [];

        if (this.props.matchedItems.data && this.props.matchedItems.data.length) {
            matchedItems = this.props.matchedItems.data.filter((item) => {
                return item.dcomId === itemToRender.id;
            });
        }

        const match = matchedItems[0] || null;

        return (
            <MenuItem
                key={key}
                style={style}
                item={itemToRender}
                merchantId={this.props.merchantId}
                match={match}
                unlinkItem={this.props.unlinkItem}
                addMatchedItem={this.props.addMatchedItem}
                removeMatchedItem={this.props.removeMatchedItem}
            />
        );
    }

    noRowsRender() {
        return (
            <div>{"No Results Found."}</div>
        );
    }

    render() {
        const props = this.props;

        return (
            <div className={`${className}__container`}>
                <div className={`${className}__search`}>
                    <Search
                        handleSearch={props.handleSearch}
                        handleClear={props.handleClear}
                        searchTarget={"Menu"}
                        collectionName={"Menu"}
                    />
                </div>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            width={width}
                            height={height}
                            rowCount={props.menu.length}
                            rowHeight={60}
                            rowRenderer={this.rowRender}
                            noRowsRenderer={this.noRowsRender}
                            overscanRowCount={20}
                        />
                    )}
                </AutoSizer>
            </div>
        );
    }

}

MenuList.propTypes = {
    menu: PropTypes.array.isRequired,
    merchantId: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    handleClear: PropTypes.func.isRequired,
    unlinkItem: PropTypes.func.isRequired,
    addMatchedItem: PropTypes.func.isRequired,
    removeMatchedItem: PropTypes.func.isRequired,
    getMatchedItems: PropTypes.func,
    matchedItems: PropTypes.array
};

export default MenuList;