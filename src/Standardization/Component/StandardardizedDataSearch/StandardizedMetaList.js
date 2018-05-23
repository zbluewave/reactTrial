import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {
    Table
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Search from '../../../Search/Component/Search';
import { selectMeta } from '../../ActionCreator/buttonActions';

@connect(
    state => ({
        standardizedDataSearch: state.standardizedMappingTool.standardizedDataSearch
    }),
    dispatch => ({
        selectMeta: meta =>dispatch(selectMeta(meta))
    })
)
class StandardizedMetaList extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            searchInput: ''
        };
    }

    handleSearch(searchInput) {
        this.setState({ searchInput });
    }

    getMetaDataToDisplay() {
        return this.props.standardizedDataSearch.metaData.filter((standardizedMetaData) => {
            return this.state.searchInput.length === 0
                || standardizedMetaData.name.toLowerCase().indexOf(this.state.searchInput) > -1;
        });
    }

    handleClear() {
        this.props.selectMeta(null);
        this.handleSearch('');
    }

    render() {
        return (
            <div>
                <Search
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                    searchTarget={"Standardized Meta Data"}
                    collectionName={"Meta"}
                />
                <div className="StandardizedMetaDataList__container">
                    {this.renderResult()}
                </div>
            </div>
        );
    }

    renderResult() {
        let metaDataCollection = this.getMetaDataToDisplay();
        if (Array.isArray(metaDataCollection) && metaDataCollection.length > 0) {
            return (
                <Table
                    className="StandardizedMetaDataList__table"
                    celled
                    sortable
                    textAlign="center"
                >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                Name
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Brand
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Category
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            metaDataCollection.map((metaData, index) => {
                                return (
                                    <Table.Row key={index} onClick={this.props.selectMeta.bind(null, metaData)}>
                                        <Table.Cell>
                                            {metaData.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {metaData.brand}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {metaData.category_name}
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })
                        }
                    </Table.Body>
                </Table>
            );
        }
        return (
            <Table>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            {" No Results Found"}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}

StandardizedMetaList.propTypes = {
    standardizedDataSearch: PropTypes.object,
    selectMeta: PropTypes.func
};

export default StandardizedMetaList;
