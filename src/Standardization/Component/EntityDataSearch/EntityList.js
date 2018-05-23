import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {
    List,
    AutoSizer
} from 'react-virtualized';
import { Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import EntityRow from './EntityRow';

@connect(
    state => ({
        entitiesPage: state.standardizedMappingTool.entitiesPage
    })
)

class EntityList extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {};
    }

    noRowsRender() {
        return (
            <div>{"No Results Found."}</div>
        );
    }

    rowRender ({ key, index, style }) {
        const entityData = this.props.entitiesPage.currentDisplay[index];
        return (
            <div key={key} style={style}>
                <EntityRow entity={entityData} style={style} indexKey={key}/>
            </div>
        );
    }

    render() {
        if (this.props.entitiesPage.loading) {
            return (
                <Message icon>
                    <Icon name='circle notched' loading />
                    <Message.Content>
                        <Message.Header>Just one second</Message.Header>
                        Fetching Data.
                    </Message.Content>
                </Message>
            );
        }

        return (
            <React.Fragment>
                <div className="EntityList__container">
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                width={width}
                                height={height}
                                rowCount={this.props.entitiesPage.currentDisplay.length}
                                rowHeight={90}
                                rowRenderer={props => this.rowRender(props)}
                                noRowsRenderer={this.noRowsRender}
                            />
                        )}
                    </AutoSizer>
                </div>
            </React.Fragment>
        );
    }
}

EntityList.propTypes = {
    entitiesPage: PropTypes.object
};

export default EntityList;
