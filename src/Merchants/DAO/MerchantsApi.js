import BaseApi from 'FSL/modules-react/Base/DAO/BaseApi';
import merchantsModelFactory from '../Model/merchantsModelFactory';
import merchantModelFactory from '../Model/merchantModelFactory';
import merchantItemsFactory from '../Model/merchantItemsModelFactory';

import setAuth from '../../auth';

var merchantCallback = function () { };

class MerchantsApi {

	static getMerchants(query) {
		return BaseApi.fetch({
			method: 'get',
			url: `partner/${query.partnerId}/merchant`,
			headers: {
				Authorization: query.token ? query.token : setAuth()
			}
		})
			.then(data => merchantsModelFactory(data));
	}

	static getMerchant(query) {
		return BaseApi.fetch({
			method: 'get',
			url: `partner/${query.partnerId}/merchant/${query.partnerMerchantId}`,
			headers: {
				Authorization: setAuth()
			}
		})
			.then(data => merchantModelFactory(data));
	}

	static getMerchantItems(query) {
		return callbackOnResolve('get', query, BaseApi.fetch({
			method: 'get',
			url: `partner/${query.partnerId}/merchant/${query.partnerMerchantId}/item`,
			headers: {
				Authorization: setAuth()
			}
		}).then(data => merchantItemsFactory(data)));
	}

	static getMerchantItem(query) {
		return BaseApi.fetch({
			method: 'get',
			url: `partner/${query.partnerId}merchant/${query.partnerMerchantId}/item/${query.partnerEntityId}`,
			headers: {
				Authorization: setAuth()
			}
		})
			.then(data => merchantModelFactory(data));
	}
}

/*
 * Helpers
 */
function callbackOnResolve(type, query, promise) {
	return promise
		.then(merchantModelFactory)
		.then(function (data) {
			merchantCallback(type, query);
			return data;
		});
}

export default MerchantsApi;