import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {
    Form
} from 'semantic-ui-react';

import { connect } from 'react-redux';
import getEntitiesDataAction from '../../ActionCreator/getEntitiesDataAction';

@connect(
    state => ({
        entitiesPage: state.standardizedMappingTool.entitiesPage
    }),
    dispatch => ({
        getEntitiesData: query => dispatch(getEntitiesDataAction(query)),
    })
)

class EntityDataSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            categories: 'food,groceries',
            merchant_id: '',
            standardized_status: 'both',
            type: 'item,option'
        };
        autoBind(this);
    }

    handleChange(event, data) {
        const state = this.state;
        state[data.name] = data.value;
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.getEntitiesData(this.state);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} loading={this.props.entitiesPage.loading}>
                <div className="EntityDataSearch__keywords__row">
                    <div className="EntityDataSearch__middle__column">
                        <Form.Input
                            className="Search__input"
                            name="query"
                            type="text"
                            value={this.state.query}
                            onChange={this.handleChange}
                            placeholder="place query here .."
                        />
                    </div>
                </div>
                <div className="EntityDataSearch__options__row">
                    <div className="EntityDataSearch__middle__column">
                        <Form.Input
                            className="Search__input"
                            name="merchant_id"
                            type="text"
                            value={this.state.merchant_id}
                            onChange={this.handleChange}
                            placeholder="Merchant Id .."
                        />
                    </div>
                    <div>
                        <Form.Select
                            placeholder='Category'
                            compact
                            selection
                            name="categories"
                            defaultValue={'food,groceries'}
                            onChange={this.handleChange}
                            options={[
                                { key: 1, text: 'food', value: 'food' },
                                { key: 2, text: 'groceries', value: 'groceries' },
                                { key: 3, text: 'All Categories', value: 'food,groceries' }
                            ]}
                        />
                    </div>
                    <div>
                        <Form.Select
                            placeholder='Data Status'
                            compact
                            selection
                            name="standardized_status"
                            defaultValue={'both'}
                            onChange={this.handleChange}
                            options={[
                                { key: 1, text: 'Both', value: 'both' },
                                { key: 2, text: 'Not Standardized', value: 'not_standardized' },
                                { key: 3, text: 'Standardized', value: 'standardized' }
                            ]}
                        />
                    </div>
                    <div>
                        <Form.Select
                            placeholder='Data Status'
                            compact
                            selection
                            name="type"
                            defaultValue={'item,option'}
                            onChange={this.handleChange}
                            options={[
                                { key: 1, text: 'All Types', value: 'item,option' },
                                { key: 2, text: 'Item', value: 'item' },
                                { key: 3, text: 'Option', value: 'option' }
                            ]}
                        />
                    </div>
                    <div className="EntityDataSearch__options__buttons">
                        <div>
                            <Form.Button type="Submit">Query Server</Form.Button>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }
}

EntityDataSearch.propTypes = {
    entitiesPage: PropTypes.object,
    getEntitiesData: PropTypes.func
};

export default EntityDataSearch;
