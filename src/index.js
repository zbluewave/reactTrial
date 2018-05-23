import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import appSetup from './appSetup';
import appStore from './appStore';

import App from './App/Component/App';
import Merchants from './Merchants/Component/Merchants';
import MerchantItems from './MerchantItems/Component/MerchantItems';
import StandardizationMappingTool from './Standardization/Component/StandardizationMappingTool';
import NoRouteFound from './NoRouteFound/Component/NoRouteFound';
import 'react-virtualized/styles.css';
import './styles/styles.css';

appSetup();

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        (appStore.getState().auth.data.loggedIn) ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/'
                }} />
            )
    )} />
);

ProtectedRoute.propTypes = {
    component: PropTypes.func
};

ReactDOM.render(
    <Provider store={appStore}>
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={App} />
                    <ProtectedRoute path="/merchants" component={Merchants} />
                    <ProtectedRoute path="/merchant/:partnerMerchantId/:merchantId" component={MerchantItems} />
                    <ProtectedRoute path="/standardization" component={StandardizationMappingTool} />
                    <Route component={NoRouteFound} />
                </Switch>
            </div>
        </Router>
    </Provider>, document.getElementById('root')
);
