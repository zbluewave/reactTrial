import MatchingApi from '../DAO/MatchingApi';
import asyncActionCreator from 'FSL/modules-react/Base/ActionCreator/asyncActionCreator';
import getMerchantItemsAction from '../../MerchantItems/ActionCreator/getMerchantItemsAction';

export default asyncActionCreator({
    name: 'MATCHED_ITEMS_UNLINK',
    action: MatchingApi.deleteLink.bind(MatchingApi),
    chain: options => getMerchantItemsAction(options)
});
