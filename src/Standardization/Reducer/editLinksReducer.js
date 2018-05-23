import editEntityMasterListLinksAction from '../ActionCreator/editEntityMasterListLinksAction';

const initialState = {
    loading: false,
    error: ""
};
const editLinksReducer = function (state = initialState, action) {
    switch (action.type) {
        case editEntityMasterListLinksAction.ACTION:
            return {
                ...state,
                loading: true
            };

        case editEntityMasterListLinksAction.ACTION_COMPLETE:
            return {
                ...state,
                loading: false,
                error: ""
            };

        case editEntityMasterListLinksAction.ACTION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};
editLinksReducer.initialState = initialState;

export default editLinksReducer;