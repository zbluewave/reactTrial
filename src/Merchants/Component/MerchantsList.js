import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {
    Table,
    Grid
} from 'semantic-ui-react';
import _ from 'lodash';

import MerchantsRow from './MerchantsRow';
import Search from '../../Search/Component/Search';
import PaginationWidget from 'FSL/modules-react/Base/Component/PaginationWidget/PaginationWidget';

class MerchantsList extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.handleNameSort = this.handleSort.bind(this, 'name');
        this.handleIdSort = this.handleSort.bind(this, 'dcomMerchantId');
        this.handleRatioSort = this.handleSort.bind(this, 'ratio');
        this.handleYextSort = this.handleSort.bind(this, 'lastYextUpdate');
        this.handleLinkSort = this.handleSort.bind(this, 'lastLinkUpdate');

        this.state = {
            column: null,
            direction: null,
            merchants: props.merchants,
            currentPageIndex: 0,
            merchantsPerPage: 15
        };
    
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ merchants: nextProps.merchants });
    }

    handleSort(clickedColumn) {
        const { column, direction, merchants } = this.state;
        let sortColumn = '';

        switch(clickedColumn) {
            case 'name':
            case 'dcomMerchantId':
                sortColumn = clickedColumn;
                break;

            case 'ratio':
            case 'lastYextUpdate':
            case 'lastLinkUpdate':
                sortColumn = `metaData.${clickedColumn}`;
                break;
        }
        
        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                merchants: _.sortBy(merchants, sortColumn),
                direction: 'ascending'
            });
            return;
        }

        this.setState({
            merchants: merchants.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending'
        });
    }

    onPageChange(newPageIndex) {
        this.setState({
            currentPageIndex: newPageIndex,
        });
    }

    render() {
        const {
            column,
            direction,
            currentPageIndex,
            merchantsPerPage
        } = this.state;
        const props = this.props;

        const merchants = this.state.merchants || [];
        const startIndex = currentPageIndex * merchantsPerPage;
        const endIndex = startIndex + merchantsPerPage;
        const currentMerchants = merchants.slice(startIndex, endIndex);

        if (currentMerchants.length) {
            return (
                <React.Fragment>
                    {this.renderSearch(props)}
                    <Table
                        celled
                        columns={8}
                        sortable
                        selectable
                        striped
                        padded
                    >
                        <Table.Header>
                            <Table.Row>
                                {this.renderHeaders(column, direction)}
                            </Table.Row>
                        </Table.Header>

                        <Table.Body className="Merchants__body">
                            {this.renderMerchantRows(currentMerchants)}
                        </Table.Body>
                    </Table>
                    {this.renderPagination(merchants, merchantsPerPage, currentPageIndex)}
                </React.Fragment>
            );
        }


        return (this.renderNoResults(props));
    }

    renderHeaders(column, direction) {
        const headers = [
            {key: 'name', label: "Merchant Name", onClick: this.handleNameSort},
            {key: 'dcomMerchantId', label: "Merchant ID", onClick: this.handleIdSort},
            {key: 'ratio', label: "Items Linked", onClick: this.handleRatioSort},
            {key: 'lastLinkUpdate', label: "Last Link Update", onClick: this.handleLinkSort},
            {key: 'lastYextUpdate', label: "Last Yext Update", onClick: this.handleYextSort}
        ];

        return headers.map((header, index) => {
            return (
                <Table.HeaderCell
                    key={index}
                    sorted={column === header.key ? direction : null}
                    onClick={header.onClick}
                >
                    {header.label}
                </Table.HeaderCell>
            );
        });
    }

    renderPagination(merchants, merchantsPerPage, currentPageIndex) {
        if (merchants.length > merchantsPerPage) {
            return (
                <PaginationWidget
                    currentPageIndex={currentPageIndex}
                    numberOfPages={Math.ceil(merchants.length / merchantsPerPage)}
                    pagesToShow={5}
                    onPageChange={this.onPageChange}
                />
            );
        }
    }

    renderMerchantRows(currentMerchants) {
        return currentMerchants.map((merchant) => {
            return (
                <MerchantsRow
                    key={merchant.dcomMerchantId}
                    merchant={merchant}
                />
            );
        });
    }

    renderSearch(props) {
        return (
            <Grid>
                <Grid.Row centered>
                    <Grid.Column width={10}>
                        <Search
                            handleSearch={props.handleSearch}
                            handleClear={props.handleClear}
                            searchTarget={"Merchants"}
                            collectionName={"Merchants"}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    renderNoResults(props) {
        return (
            <React.Fragment>
                {this.renderSearch(props)}
                <Table>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                {" No Results Found"}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </React.Fragment>
        );
    }
}

MerchantsList.propTypes = {
    merchants: PropTypes.array,
    handleSearch: PropTypes.func.isRequired,
    handleClear: PropTypes.func.isRequired
};

export default MerchantsList;

