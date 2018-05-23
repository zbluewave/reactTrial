import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Redirect } from 'react-router-dom';
import {
	Loader
} from 'semantic-ui-react';


import LoginForm from './LoginForm';

import loginAction from '../ActionCreator/loginAction';

@connect(
	state => ({
		auth: state.auth
	}),
	dispatch => ({
		loginUser: (userInfo) => dispatch(loginAction(userInfo))
	})
)
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		};
		autoBind(this);
	}

	beginLogin(userInfo) {
		this.props.loginUser(userInfo).then(this.setState({ redirect: true }));
	}

	render() {
		const props = this.props;
		const { redirect } = this.state;

		if (props.auth.error) {
			return (
				<LoginForm
					beginLogin={this.beginLogin}
					errorMessage={props.auth.error}
				/>
			);
		}

		if (redirect || props.auth.data.loggedIn) {
			return <Redirect to={'/merchants'} />;
		}

		if (props.auth.loading) {
			return (
				<div className="Loader__container">
					<Loader 
						active
						inline='centered' 
					/>
				</div>
			);
		}

		return (
			<LoginForm beginLogin={this.beginLogin} />
		);
	}
}

Login.propTypes = {
	auth: PropTypes.object,
	loginUser: PropTypes.func
};

export default Login;
