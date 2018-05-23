import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToolTip from 'react-portal-tooltip';
import autoBind from 'react-autobind';
import {
    Label
} from 'semantic-ui-react';

const className = "ItemTooltip";

class ItemTooltip extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        const props = this.props;
        const style = {
            style: {
                maxWidth: '30%',
                minWidth: '15%',
                border: '2px solid #1F5EA9',
                boxShadow: '5px 5px 3px rgba(0,0,0,.5)'
            },
            arrowStyle: {
                color: '#1F5EA9',
                borderColor: false
            }
        };

        const item = props.item ? this.normalizeItem(props.item) : {};
        const description = item.type.toLowerCase() !== 'image' ? item.description: '';

        return (
            <ToolTip
                active={props.active}
                position={props.position}
                arrow="center"
                parent={props.parent}
                style={style}
            >
                <Label attached='top'>
                    <span className={`${className}__item__type`}>{`${item.type} ${item.thirdPartyID}`}</span>
                </Label>
                <div className={`${className}__container`}>
                    <div className={`${className}__container__item`}>
                        <div>
                            <div className={`${className}__item__name`}>{item.name}</div>
                            <div>{item.price ? `$${item.price}` : ''}</div>
                            {this.renderImage(item)}
                        </div>
                        <div className={`${className}__item__description`}>{description}</div>
                        <div className={`${className}__item__path`}>{item.path}</div>
                    </div>
                    {this.renderMatch(props)}
                </div>
            </ToolTip>
        );
    }

    renderMatch(props) {
        if (props.matchedItem && props.matchedItem.matchedMenuName) {
            return (
                <div className={`${className}__match`}>{`Matching to ${props.matchedItem.matchedMenuName}`}</div>
            );
        }

        const linkedItem = props.linkedItem ? this.normalizeItem(props.linkedItem) : null;

        if (!linkedItem) {
            return;
        }

        return (
            <div className={`${className}__link`}>
                {`Linked to ${linkedItem.name}`}
            </div>
        );
    }

    renderImage(item) {
        if(item.image_url.length > 0) {
            return (                            
                <img
                    className={`${className}__item__image`} 
                    src={item.image_url}
                    alt={item.name}
                    title={item.name}
                />
            );
        }
    }

    normalizeItem(item) {
        return {
            name: item.EXTERNAL_ITEM_NAME || item.name || item.section || '',
            description: item.DESCRIPTION || item.description || '',
            price: item.PRICE || item.price || '',
            type: item.hasOwnProperty('section') ? 'section' : item.ENTITIES_CATEGORY_NAME || item.type || '',
            path: item.path || '',
            image_url: item.IMAGE_URL || item.url || '',
            thirdPartyID: item.EXTERNAL_ITEM_ID ? `[${item.EXTERNAL_ITEM_ID}]` : ''
        };
    }
}

ItemTooltip.propTypes = {
    active: PropTypes.bool.isRequired,
    parent: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    linkedItem: PropTypes.object,
    matchedItem: PropTypes.object
};

export default ItemTooltip;