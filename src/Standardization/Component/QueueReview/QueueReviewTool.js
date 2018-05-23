import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {
    List, AutoSizer
} from 'react-virtualized';
import {
    Message
} from 'semantic-ui-react';
import PendingMetaEntitiesMap from '../../Model/PendingMetaEntitiesMap';
import EntityItem from './EntityItem';
import MasterListItem from './MasterListItem';

class QueueReviewTool extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        autoBind(this);
    }

    noRowsRender() {
        return (
            <div>{"No Results Found."}</div>
        );
    }

    rowRender ({ key, index, style }) {
        return (
            <div
                key={key}
                style={style}
                className="QueueReview__item"
            >
                {this.getRowElement(this.props.list[index])}
            </div>
        );
    }

    getRowElement(row) {
        switch (row.type) {
            case PendingMetaEntitiesMap.ENTITY_TYPE:
                return <EntityItem data={row.data}/>;
            case PendingMetaEntitiesMap.MASTER_LIST_TYPE:
                return <MasterListItem data={row.data}/>;
            case PendingMetaEntitiesMap.TO_WIPE_ASSO:
                return <div className="QueueReview__item__container">
                    <Message>
                        <Message.Header>
                            Following entity associations will be deleted
                        </Message.Header>
                    </Message>
                </div>;
        }
        return "";
    }

    render() {
        return (
            <div className="QueueReview__container">
                <AutoSizer>
                {({ height, width }) => (
                    <List
                        width={width}
                        height={height}
                        rowCount={this.props.list.length}
                        rowHeight={90}
                        rowRenderer={this.rowRender}
                        noRowsRenderer={this.noRowsRender}
                    />
                )}
                </AutoSizer>
            </div>
        );
    }
}

QueueReviewTool.propTypes = {
    list: PropTypes.array
};

export default QueueReviewTool;
