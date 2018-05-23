import DataStandardizedApi from '../DAO/DataStandardizedApi';
import asyncActionCreator from 'FSL/modules-react/Base/ActionCreator/asyncActionCreator';

export default asyncActionCreator({
    name: 'STANDARDIZED_META_SEARCH',
    action: DataStandardizedApi.getStandardizedMetaData.bind(DataStandardizedApi)
});
