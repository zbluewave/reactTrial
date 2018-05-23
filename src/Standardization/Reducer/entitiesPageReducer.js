import getEntitiesDataAction from '../ActionCreator/getEntitiesDataAction';
import {
    pushEntityToQueueAction,
    pushEntitiesToQueueAction,
    pushEntityToRearAction
} from '../ActionCreator/buttonActions';

const perPage = 20;

const initialState = {
    toProcessData: [],
    currentDisplay: [],
    loading: false,
    error: ""
};

const getEntitiesToDisplay = function (entities, pendingQueue) {
    return (entities || []).filter(
        entity => !pendingQueue.hasEntity(entity)
    ).slice(0, perPage);
};

const appendEntityToRear = function (entities, entityToRear) {
    let result = ((entities || []).filter(
        entity => entity.entity_id !== entityToRear.entity_id
    ));
    result.push(entityToRear);
    return result;
};

const entitiesPageReducer = function(pendingQueue, state = initialState, action) {
    let { toProcessData } = state;
    switch (action.type) {
        case getEntitiesDataAction.ACTION:
            return {
                ...state,
                loading: true,
                error: ""
            };

        case getEntitiesDataAction.ACTION_COMPLETE:
            return {
                ...state,
                loading: false,
                toProcessData: action.data,
                currentDisplay: getEntitiesToDisplay(action.data, pendingQueue),
                error: ""
            };

        case getEntitiesDataAction.ACTION_FAILED:
            return {
                ...state,
                loading: false,
                toProcessData: [],
                error: action.error
            };

        case pushEntityToQueueAction.ACTION:
        case pushEntitiesToQueueAction.ACTION:
            return {
                ...state,
                currentDisplay: getEntitiesToDisplay(toProcessData, pendingQueue)
            };
        case pushEntityToRearAction.ACTION:
            toProcessData = appendEntityToRear(toProcessData, action.data);
            return {
                ...state,
                toProcessData: toProcessData,
                currentDisplay: getEntitiesToDisplay(toProcessData, pendingQueue)
            };
        default:
            return state;
    }
};

entitiesPageReducer.initialState = initialState;

export default entitiesPageReducer;
