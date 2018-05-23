import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {
    Icon
} from 'semantic-ui-react';

const className = "PageHeader";

@connect(
    state => ({
        auth: state.auth.data
    })
)
class PageHeader extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    renderUserInfo(props) {

        if (props.auth.loggedIn) {
            return (
                <div className={`${className}__userInfo`}>
                    <Icon 
                        name="user circle"
                        size="large" 
                    />
                    {`${props.auth.user.first_name} ${props.auth.user.last_name}`}
                </div>
            );
        }
    }

    render() {
        const props = this.props;

        return (
            <div className={`${className}`}>
                <div className={`${className}__title`}>
                    {"Internal Tools"}
                </div>
                {this.renderUserInfo(props)}
            </div>
        );
    }
}

PageHeader.propTypes = {
    auth: PropTypes.object,
};

export default PageHeader;
