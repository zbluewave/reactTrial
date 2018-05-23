import DataStandardizedApi from '../DAO/DataStandardizedApi';
import asyncActionCreator from 'FSL/modules-react/Base/ActionCreator/asyncActionCreator';

export default asyncActionCreator({
    name: 'SEARCH_ENTITY',
    action: DataStandardizedApi.getEntitiesData.bind(DataStandardizedApi)
});
