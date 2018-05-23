import DataStandardizedApi from '../DAO/DataStandardizedApi';
import asyncActionCreator from 'FSL/modules-react/Base/ActionCreator/asyncActionCreator';

export default asyncActionCreator({
    name: 'MASTER_LIST_SEARCH',
    action: DataStandardizedApi.getMasterListData.bind(DataStandardizedApi)
});
