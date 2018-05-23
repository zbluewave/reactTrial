import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {
    Label
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { removeEntityFromQueueAction } from '../../ActionCreator/buttonActions';

@connect(
    state => ({}),
    dispatch => ({
        removeEntityFromQueue: (entity) => dispatch(removeEntityFromQueueAction(entity))
    })
)

class EntityItemItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        autoBind(this);
    }

    render() {
        return (
            <div className="QueueReview__item__container QueueReview__item__child_item">
                <div className="QueueReview__item__entity__row">
                    <button className="QueueReview__item__button__red"
                            onClick={this.props.removeEntityFromQueue.bind(null, this.props.data)}
                    >
                        remove
                    </button>
                    <Label
                        className="QueueReview__item__label"
                        color="grey"
                    >
                        Entity
                    </Label>
                    <Label
                        className="QueueReview__item__label"
                        color="grey"
                    >
                        {this.props.data.type}
                    </Label>
                    <div className="QueueReview__item__info">{this.props.data.merchant.id}</div>
                    <div className="QueueReview__item__info">{this.props.data.merchant.name}</div>
                </div>
                <div className="QueueReview__item__name">{this.props.data.name}</div>
                <div className="QueueReview__item__desc">{this.props.data.description}</div>
            </div>
        );
    }
}

EntityItemItem.propTypes = {
    data: PropTypes.object.isRequired,
    removeEntityFromQueue: PropTypes.func
};

export default EntityItemItem;