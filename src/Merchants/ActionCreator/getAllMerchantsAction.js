import MerchantsApi from '../DAO/MerchantsApi';
import asyncActionCreator from 'FSL/modules-react/Base/ActionCreator/asyncActionCreator';

export default asyncActionCreator({
	name: 'MERCHANTS_GET_ALL',
	action: MerchantsApi.getMerchants.bind(MerchantsApi)
});
