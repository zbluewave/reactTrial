import MerchantsApi from '../../Merchants/DAO/MerchantsApi';
import asyncActionCreator from 'FSL/modules-react/Base/ActionCreator/asyncActionCreator';

export default asyncActionCreator({
    name: 'MERCHANT_ITEMS_GET',
    action: MerchantsApi.getMerchantItems.bind(MerchantsApi),
});
