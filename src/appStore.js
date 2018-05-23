import {
	combineReducers,
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './Login/Reducer/authReducer';
import merchantsReducer from './Merchants/Reducer/merchantsReducer';
import merchantReducer from './Merchants/Reducer/merchantReducer';
import merchantItemsReducer from './MerchantItems/Reducer/merchantItemsReducer';
import menuReducer from './Menu/Reducer/menuReducer';
import matchedItemsReducer from './Menu/Reducer/matchedItemsReducer';
import standardizedMappingToolReducer from './Standardization/Reducer/standardizedMappingToolReducer';
import filteredItemReducer from './MerchantItems/Reducer/filteredItemReducer';
import linkedItemReducer from './MerchantItems/Reducer/linkedItemReducer';
import loadPrevAppState from './loadPrevAppState';
import authMiddleware from './middleware/authMiddleware';
import matchedItemsMiddleware from './middleware/matchedItemsMiddleware';
import { createLogger } from 'redux-logger';

const appStoreReducers = combineReducers({
	auth: authReducer,
	merchants: merchantsReducer,
	merchant: merchantReducer,
	merchantItems: merchantItemsReducer,
	menu: menuReducer,
	matchedItems: matchedItemsReducer,
    standardizedMappingTool: standardizedMappingToolReducer,
	filteredItem: filteredItemReducer,
	linkedItem: linkedItemReducer
});

const middlewares = [
	thunk,
	authMiddleware,
	matchedItemsMiddleware
];

if (process.env.NODE_ENV === 'development') {
	const logger = createLogger({
		collapsed: (getState, action, logEntry) => !logEntry.error
	});
	middlewares.push(logger);
}

function loadMiddleware() {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	return composeEnhancers(applyMiddleware(...middlewares));
}

const appStore = createStore(appStoreReducers, loadPrevAppState(), loadMiddleware());

export default appStore;
