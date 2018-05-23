import entitiesPageReducer from './entitiesPageReducer';
import standardizedDataSearchPageReducer from './standardizedDataSearchPageReducer';
import editLinksReducer from './editLinksReducer';
import pendingQueueReducer from './pendingQueueReducer';

const initialState = {
    entitiesPage: entitiesPageReducer.initialState,
    standardizedDataSearch: standardizedDataSearchPageReducer.initialState,
    editLinks: editLinksReducer.initialState,
    ...pendingQueueReducer.initialState
};

export default function(state = initialState, action) {
    const {pendingQueue, error} = pendingQueueReducer(state, action);
    const entitiesPage = entitiesPageReducer(pendingQueue, state.entitiesPage, action);
    const standardizedDataSearch = standardizedDataSearchPageReducer(state.standardizedDataSearch, action);
    const errorMsg = error || entitiesPage.error || standardizedDataSearch.error;
    return {
        ...state,
        pendingQueue: pendingQueue,
        error: Array.isArray(errorMsg) ? errorMsg.join("  ") : errorMsg,
        entitiesPage: entitiesPageReducer(pendingQueue, state.entitiesPage, action),
        standardizedDataSearch: standardizedDataSearchPageReducer(state.standardizedDataSearch, action)
    };
}
