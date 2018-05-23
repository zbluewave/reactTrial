import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Label, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
    pushEntityToQueueAction,
    pushEntityToRearAction,
    pushWipeAssociationToQueueAction
} from '../../ActionCreator/buttonActions';

@connect(
    state => ({
        entitiesPage: state.standardizedMappingTool.entitiesPage
    }),
    dispatch => ({
        pushEntityToQueue: (entity) => dispatch(pushEntityToQueueAction(entity)),
        pushEntityToRear: (entity) => dispatch(pushEntityToRearAction(entity)),
        pushWipeAssociationToQueue: (entity) => dispatch(pushWipeAssociationToQueueAction(entity))
    })
)

class EntityList extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {};
    }

    render() {
        return (
            <div
                className="EntityList__item"
            >
                <div className="EntityList__item__container">
                    <div className="EntityList__item__info__row">
                        <div className="EntityList__item__info__section">
                            <button
                                className="EntityList__item__button"
                                onClick={this.props.pushEntityToQueue.bind(null, this.props.entity)}
                            >
                                Push
                            </button>
                            <button
                                className="EntityList__item__button EntityList__item__button__red"
                                onClick={this.props.pushEntityToRear.bind(null, this.props.entity)}
                            >
                                Hide
                            </button>
                            {this.getTypeInfo()}
                            {this.getMerchantInfo()}
                        </div>
                        <div className="EntityList__item__info__section__reverse">
                            {this.getPriceInfo()}
                            {this.getStandardizationInfo()}
                            {this.getWipeButton()}
                        </div>
                    </div>
                    <div className="EntityList__item__name__row">
                        {this.props.entity.name}
                    </div>
                    <div className="EntityList__item__desc">
                        {this.props.entity.description}
                    </div>
                </div>
            </div>
        );
    }

    getPriceInfo() {
        if (this.props.entity.price_inherent) {
            return (
                <Label
                    className="EntityList__item__label"
                    color="grey"
                >
                    $ {this.props.entity.price_inherent}
                </Label>
            );
        }
        return "";
    }

    getTypeInfo() {
        const typeInfo = (
            <Label
                className="EntityList__item__label"
                color="grey"
            >
                {this.props.entity.type}
            </Label>
        );

        return (
            <Popup trigger={typeInfo} wide="very">
                <Popup.Content>
                    <nobr>{this.props.entity.path}</nobr>
                </Popup.Content>
            </Popup>
        );
    }

    getMerchantInfo() {
        const merchantInfo = (
            <Label
                className="EntityList__item__label"
                color="grey"
            >
                {this.props.entity.merchant.id}
            </Label>
        );
        return (
            <Popup trigger={merchantInfo}>
                <Popup.Content>
                    <nobr>{this.props.entity.merchant.name}</nobr>
                </Popup.Content>
            </Popup>
        );
    }

    getStandardizationInfo() {
        if (this.props.entity.standardization) {
            const stand = this.props.entity.standardization;
            const productBrief = (
                <Label
                    className="EntityList__item__label"
                    color="grey"
                >
                    {stand.product.id} | {stand.quantity} | {stand.size} | {stand.container_type}
                </Label>
            );

            return (
                <Popup trigger={productBrief}>
                    <Popup.Content>
                        <nobr>{stand.product.name}</nobr>
                    </Popup.Content>
                </Popup>
            );
        }
        return (<div></div>);
    }

    getWipeButton() {
        if (this.props.entity.standardization) {
            return (
                <button
                    className="EntityList__item__button EntityList__item__button__red"
                    onClick={this.props.pushWipeAssociationToQueue.bind(null, this.props.entity)}
                >
                    Wipe
                </button>
            );
        }
        return "";
    }
}

EntityList.propTypes = {
    entity: PropTypes.object,
    pushEntityToQueue: PropTypes.func,
    pushEntityToRear: PropTypes.func,
    pushWipeAssociationToQueue: PropTypes.func
};

export default EntityList;
