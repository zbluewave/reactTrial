import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {
    Label
} from 'semantic-ui-react';

class MetaItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        autoBind(this);
    }

    render() {
        return (
            <div className="QueueReview__item__container">
                <div className="QueueReview__item__masterList__row">
                    <Label
                        className="QQueueReview__item__label"
                        color="grey"
                    >
                        Master List
                    </Label>
                    <div className="QueueReview__item__info">{this.props.data.name}</div>
                    <div className="QueueReview__item__info">{this.props.data.quantity}</div>
                    <div className="QueueReview__item__info">{this.props.data.container_type}</div>
                    <div className="QueueReview__item__info">{this.props.data.size}</div>
                </div>
                <div className="QueueReview__item__desc">
                    {this.props.data.category_name}----{this.props.data.brand}
                </div>
            </div>
        );
    }
}

MetaItem.propTypes = {
    data: PropTypes.object.isRequired
};

export default MetaItem;