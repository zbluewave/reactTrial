import MatchingApi from '../DAO/MatchingApi';
import asyncActionCreator from 'FSL/modules-react/Base/ActionCreator/asyncActionCreator';

export default asyncActionCreator({
    name: 'MATCHED_ITEMS_LINK',
    action: MatchingApi.createLink.bind(MatchingApi) 
});