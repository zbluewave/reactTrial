import MerchantsApi from '../DAO/MerchantsApi';
import asyncActionCreator from 'FSL/modules-react/Base/ActionCreator/asyncActionCreator';
import getMerchantItemsAction from '../../MerchantItems/ActionCreator/getMerchantItemsAction';

export default asyncActionCreator({
    name: 'MERCHANT_GET',
    action: MerchantsApi.getMerchant.bind(MerchantsApi),
    chain: options => getMerchantItemsAction(options)
});
