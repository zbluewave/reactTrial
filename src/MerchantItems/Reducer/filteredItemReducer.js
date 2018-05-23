import filterMenuAction from '../ActionCreator/filterMenuAction';
import clearFilterMenuAction from '../ActionCreator/clearFilterMenuAction';

export const initialState = {
    data: {}
};

export default function filteredItemsReducer(state = initialState, action) {
    switch (action.type) {

        case filterMenuAction.ACTION:
            return {
                data: action.payload
            };

        case clearFilterMenuAction.ACTION:
            return {
                data: initialState.data
            };

        default:
            return state;

    }
}
