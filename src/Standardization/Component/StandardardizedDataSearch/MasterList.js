import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {
    Button,
    Table
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
    selectMetaAction,
    selectMasterListAction
} from '../../ActionCreator/buttonActions';

@connect(
    state => ({
        standardizedDataSearch: state.standardizedMappingTool.standardizedDataSearch
    }),
    dispatch => ({
        selectMasterList: masterList => dispatch(selectMasterListAction(masterList)),
        resetMasterList: () => {
            dispatch(selectMetaAction(null));
            dispatch(selectMasterListAction(null));
        }
    })
)

class MasterList extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div><Button onClick={this.props.resetMasterList}>Go Back</Button></div>
                <div>{this.renderResult()}</div>
            </div>
        );
    }

    renderResult()
    {
        let masterListCollection = this.props.standardizedDataSearch.masterLists;
        if (Array.isArray(masterListCollection) && masterListCollection.length > 0) {
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
                                Quantity
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Container Type
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Size
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {masterListCollection.map((masterList) => this.getMasterListRow(masterList))}
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

    getMasterListRow(masterList)
    {
        let className = "";
        const id = this.props.standardizedDataSearch.selectedMasterList ?
            this.props.standardizedDataSearch.selectedMasterList.standardized_data_master_list_id : null;

        if (id && id == masterList.standardized_data_master_list_id) {
            className = "selected";
        }
        return (
            <Table.Row
                key={masterList.standardized_data_master_list_id}
                onClick={this.props.selectMasterList.bind(null, masterList)}
                className={className}
            >
                <Table.Cell>
                    {this.props.standardizedDataSearch.selectedMeta.name}
                </Table.Cell>
                <Table.Cell>
                    {masterList.quantity}
                </Table.Cell>
                <Table.Cell>
                    {masterList.container_type}
                </Table.Cell>
                <Table.Cell>
                    {masterList.size}
                </Table.Cell>
            </Table.Row>
        );
    }
}

MasterList.propTypes = {
    standardizedDataSearch: PropTypes.object,
    resetMasterList: PropTypes.func,
    selectMasterList: PropTypes.func
};

export default MasterList;
