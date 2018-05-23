import editEntityMasterListLinksAction from '../ActionCreator/editEntityMasterListLinksAction';
import {
    removeEntityFromQueueAction,
    pushWipeAssociationToQueueAction,
    pushEntityToQueueAction,
    pushEntitiesToQueueAction
} from '../ActionCreator/buttonActions';
import PendingMetaEntitiesMap from '../Model/PendingMetaEntitiesMap';

const initialState = {
    pendingQueue: new PendingMetaEntitiesMap(),
    error: ""
};

const pendingQueueReducer = function(state = initialState, action) {
    let pendingQueue = state.pendingQueue;
    let error = "";
    let {selectedMasterList, selectedMeta} = state.standardizedDataSearch;
    switch (action.type) {
        case pushEntityToQueueAction.ACTION:
        case pushEntitiesToQueueAction.ACTION:
            if (selectedMasterList && selectedMeta) {
                pendingQueue = Object.assign({}, pendingQueue);
                (Array.isArray(action.data) ? action.data : [action.data]).forEach((entity) => {
                    pendingQueue.addToPendingQueue(selectedMeta, selectedMasterList, entity);
                });
            } else {
                error = "Must have master list provided";
            }
            break;

        case editEntityMasterListLinksAction.ACTION_COMPLETE:
            pendingQueue = new PendingMetaEntitiesMap();
            break;

        case pushWipeAssociationToQueueAction.ACTION:
            pendingQueue = Object.assign({}, pendingQueue);
            pendingQueue.addToDeleteQueue(action.data);
            break;
        case removeEntityFromQueueAction.ACTION:
            pendingQueue = Object.assign({}, pendingQueue);
            pendingQueue.removeEntity(action.data);
            break;
    }
    return {
        pendingQueue: pendingQueue,
        error: error
    };
};

pendingQueueReducer.initialState = initialState;

export default pendingQueueReducer;