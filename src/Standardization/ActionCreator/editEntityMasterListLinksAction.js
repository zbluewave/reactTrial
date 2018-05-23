import DataStandardizedApi from '../DAO/DataStandardizedApi';
import asyncActionCreator from 'FSL/modules-react/Base/ActionCreator/asyncActionCreator';

export default asyncActionCreator({
    name: 'EDIT_ENTITY_MASTER_LIST_LINKS',
    action: DataStandardizedApi.editEntityMasterListLinks.bind(DataStandardizedApi)
});