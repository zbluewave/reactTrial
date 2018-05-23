import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Table
} from 'semantic-ui-react';

class MerchantsRow extends Component {

    formatDate(date) {
        return  date ? new Date(date).toLocaleString() : null;
    }

    formatRatio(ratio) {
        if(!ratio) {
            return null;
        }

        if(ratio >= 1) {
            return '100 %';
        }

        return `${Math.round(ratio * 100)} %`; 
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell 
                    selectable
                    width={4}
                >
                    <Link to={`/merchant/${this.props.merchant.partnerMerchantId}/${this.props.merchant.dcomMerchantId}`}>
                        {this.props.merchant.name}
                    </Link>
                </Table.Cell>
                <Table.Cell selectable width={1}>
                    <Link to={`/merchant/${this.props.merchant.partnerMerchantId}/${this.props.merchant.dcomMerchantId}`}>
                        {this.props.merchant.dcomMerchantId}
                    </Link>
                </Table.Cell>
                <Table.Cell 
                    selectable
                    positive={(this.props.merchant.metaData.ratio === 1)}
                >
                    <Link to={`/merchant/${this.props.merchant.partnerMerchantId}/${this.props.merchant.dcomMerchantId}`}>
                        {this.formatRatio(this.props.merchant.metaData.ratio)}
                    </Link>
                </Table.Cell>
                <Table.Cell selectable>
                    <Link to={`/merchant/${this.props.merchant.partnerMerchantId}/${this.props.merchant.dcomMerchantId}`}>
                        {this.formatDate(this.props.merchant.metaData.lastLinkUpdate)}
                    </Link>
                </Table.Cell>
                <Table.Cell selectable>
                    <Link to={`/merchant/${this.props.merchant.partnerMerchantId}/${this.props.merchant.dcomMerchantId}`}>
                        {this.formatDate(this.props.merchant.metaData.lastYextUpdate)}
                    </Link>
                </Table.Cell>
            </Table.Row>
        );
    }
}

MerchantsRow.propTypes = {
    merchant: PropTypes.object
};

export default MerchantsRow;