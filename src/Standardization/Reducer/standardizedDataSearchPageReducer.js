import getMasterListAction from '../ActionCreator/getMasterListAction';
import getStandardizedMetaAction from '../ActionCreator/getStandardizedMetaAction';
import {
    selectMasterListAction,
    selectMetaAction
} from '../ActionCreator/buttonActions';
import {hashToArray} from '../../App/Util';

const initialState = {
    metaData: [],
    masterLists: [],
    selectedMeta: null,
    selectedMasterList: null,
    loading: false,
    error: ""
};



const standardizedDataSearchPageReducer = function(state = initialState, action) {
    switch (action.type) {
        case getStandardizedMetaAction.ACTION:
            return {
                ...state,
                loading: true,
                error: ""
            };

        case getMasterListAction.ACTION:
            return {
                ...state,
                selectedMasterList: null,
                loading: true,
                error: ""
            };

        case getStandardizedMetaAction.ACTION_COMPLETE:
            return {
                ...state,
                loading: false,
                metaData: hashToArray(action.data),
                error: ""
            };

        case getMasterListAction.ACTION_COMPLETE:
            return {
                ...state,
                loading: false,
                masterLists: hashToArray(action.data.master_list),
                error: ""
            };

        case getStandardizedMetaAction.ACTION_FAILED:
        case getMasterListAction.ACTION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case selectMetaAction.ACTION:
            return {
                ...state,
                selectedMeta: action.data
            };

        case selectMasterListAction.ACTION:
            return {
                ...state,
                selectedMasterList: action.data
            };

        default:
            return state;
    }
};

standardizedDataSearchPageReducer.initialState = initialState;

export default standardizedDataSearchPageReducer;