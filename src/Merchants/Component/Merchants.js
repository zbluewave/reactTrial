import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import {
	Container,
	Loader,
	Message
} from 'semantic-ui-react';

import MerchantsList from './MerchantsList';
import ContentWrapper from '../../ContentWrapper/Component/ContentWrapper';
import getAllMerchantsAction from '../ActionCreator/getAllMerchantsAction';
import config from '../../config';

const className = "Merchants";

@connect(
	state => ({
		merchants: state.merchants,
		auth: state.auth.data
	}),
	dispatch => ({
		getMerchants: query => dispatch(getAllMerchantsAction(query))
	})
)
class Merchants extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredMerchants: null
		};
		autoBind(this);
	}

	componentDidMount() {
		this.props.getMerchants({
			partnerId: config().partnerId,
			token: this.props.auth.access_token
		});
	}

	handleClear() {
		this.setState({
			filteredMerchants: this.props.merchants.data.merchants
		});
	}

	handleSearch(searchInput) {
		const merchants = this.props.merchants.data.merchants;
		const filteredMerchants = merchants.filter((merchant) => {
			return searchInput.length === 0
				|| merchant.name.toLowerCase().indexOf(searchInput) > -1
				|| merchant.dcomMerchantId.toString().indexOf(searchInput) > - 1;
		});

		this.setState({ filteredMerchants });
	}

	render() {
		const props = this.props;
		const { filteredMerchants } = this.state;

		return (
			<ContentWrapper>
				<Container>
					<div className={`${className}__title`}>{"Merchants"}</div>
					{this.renderMerchantTable(props, filteredMerchants)}
				</Container>
			</ContentWrapper>
		);
	}

	renderMerchantTable(props, filteredMerchants) {
		if (props.merchants.loading) {
			return (
				<div className="Loader__container">
					<Loader 
						active 
						inline='centered'
					/>
				</div>
			);
		}

		if (props.merchants.error) {
			const errorMessage =
				<div>
					{props.merchants.error.userMessage ? <p>{props.merchants.error.userMessage}</p> : ''}
					<p>{`Code: ${props.merchants.error.error}`}</p>
				</div>;

			return (
				<Message
					error
					header="Oops!"
					content={errorMessage}
				/>
			);
		}

		const merchants = filteredMerchants ?
			filteredMerchants :
			props.merchants.data.merchants;

		return (
			<MerchantsList
				merchants={merchants}
				handleSearch={this.handleSearch}
				handleClear={this.handleClear}
			/>
		);
	}
}

Merchants.propTypes = {
	getMerchants: PropTypes.func,
	merchants: PropTypes.array,
	auth: PropTypes.object
};

export default Merchants;