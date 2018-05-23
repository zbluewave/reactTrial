import getMasterListAction from './getMasterListAction';
import editEntityMasterListLinksAction from './editEntityMasterListLinksAction';

const actionCreator = function(actionName) {
    const action = (data) => ({
        type: actionName,
        data: data
    });
    action.ACTION = actionName;
    return action;
};

const pushEntityToQueueAction = actionCreator('PUSH_ENTITY_TO_QUEUE_ACTION');
const pushEntityToRearAction = actionCreator('PUSH_ENTITY_TO_REAR_ACTION');
const pushEntitiesToQueueAction = actionCreator('PUSH_ENTITIES_TO_QUEUE_ACTION');
const pushWipeAssociationToQueueAction = actionCreator('PUSH_WIPE_ASSOCIATION_TO_QUEUE');
const removeEntityFromQueueAction = actionCreator('REMOVE_ENTITY_FROM_QUEUE');
const selectMetaAction = actionCreator('SELECT_META');
const selectMasterListAction = actionCreator('SELECT_MASTER_LIST');

const selectMeta = function (meta) {
    return (dispatch, getState) => {
        let currentMeta = getState().standardizedMappingTool.entitiesPage.selectedMeta;
        if (currentMeta == null) {
            if (meta != null) {
                dispatch(selectMetaAction(meta));
                dispatch(getMasterListAction(meta));
            }
        } else {
            if (meta == null) {
                dispatch(selectMetaAction(meta));
            } else if (currentMeta.product_id != meta.product_id) {
                dispatch(selectMetaAction(meta));
                dispatch(getMasterListAction(meta));
            }
        }
    };
};

const pushEntityMasterListAssociation = function() {
    return (dispatch, getState) => {
        const requests = getState().standardizedMappingTool.pendingQueue.getPendingQueue();
        if (requests.length > 0) {
            dispatch(editEntityMasterListLinksAction({
                links: requests
            }));
        }
    };
};

export {
    removeEntityFromQueueAction,
    pushEntityToRearAction,
    pushWipeAssociationToQueueAction,
    pushEntityToQueueAction,
    pushEntitiesToQueueAction,
    selectMetaAction,
    selectMasterListAction,
    selectMeta,
    pushEntityMasterListAssociation
};
