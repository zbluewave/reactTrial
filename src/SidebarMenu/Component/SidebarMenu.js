import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
    Sidebar,
    Menu,
    Icon
} from 'semantic-ui-react';
import logo from 'Images/dot-logo_48x48.png';

import logoutAction from '../../Login/ActionCreator/logoutAction';

const className = "SidebarMenu";

@connect(
    state => ({
        loggedIn: state.auth.data.loggedIn
    }),
    dispatch => ({
        logoutUser: () => dispatch(logoutAction())
    })
)
class SidebarMenu extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    beginLogout() {
        this.props.logoutUser();
        this.props.history.push('/');
    }

    renderProtectedRoutes(props) {
        const routes = [
            {label: 'Logout', link: null, icon: 'log out', onClick: this.beginLogout},
            {label: 'Merchants', link: '/merchants', icon: 'shopping basket', onClick: null},
            {label: 'standardization', link: '/standardization', icon: 'shopping basket', onClick: null}
        ];

        if(props.loggedIn) {
            return (
                <React.Fragment>
                    {this.renderLinks(routes)}
                </React.Fragment>
            );
        }
    }

    renderLinks(routes) {
        return routes.map((route, index) => {
            if(route.link) {
                return(
                    <Menu.Item 
                        key={index}
                        as={Link}
                        to={route.link}
                        onClick={route.onClick}
                    >
                        {route.label}
                        <Icon
                            name={route.icon}
                        />
                    </Menu.Item>

                );
            }

            return (
                <Menu.Item
                    key={index}
                    onClick={route.onClick}
                >
                    {route.label}
                    <Icon 
                        name={route.icon}
                    />
                </Menu.Item>
            );
        });
    }

    render() {
        const props = this.props;
        
        return (
            <Sidebar
                as={Menu}
                animation='push'
                visible={true}
                width='thin'
                vertical
            >
                <div className={`${className}__logo__container`}>
                    <Link to='/'>
                        <img
                            src={logo}
                            className={`${className}__logo`}
                            alt="Delivery.com - Your neighborhood. Delivered."
                        />
                    </Link>
                </div>
                {this.renderProtectedRoutes(props)}
            </Sidebar>
        );
        
    }
}

SidebarMenu.propTypes = {
    loggedIn: PropTypes.bool,
    logoutUser: PropTypes.func,
    history: PropTypes.object
};

export default withRouter(SidebarMenu);
