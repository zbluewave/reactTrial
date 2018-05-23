import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {
	Sidebar,
	Segment
} from 'semantic-ui-react';

import PageHeader from '../../PageHeader/Component/PageHeader';
import SidebarMenu from '../../SidebarMenu/Component/SidebarMenu';
class ContentWrapper extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	render() {
		return (
			<Sidebar.Pushable as={Segment}>
				<SidebarMenu />
				<Sidebar.Pusher>
					<PageHeader />
					<div className="ContentWrapper__container">
						{this.props.children}
					</div>
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		);
	}
}

ContentWrapper.propTypes = {
	children: PropTypes.any
};

export default ContentWrapper;
