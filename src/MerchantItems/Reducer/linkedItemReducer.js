import clearFilterMenuLinkedItemAction from '../ActionCreator/clearFilterMenuLinkedItemAction';
import filterMenuLinkedItemAction from '../ActionCreator/filterMenuLinkedItemAction';

export const initialState = {
    data: {}
};

export default function linkedItemReducer(state = initialState, action) {
    switch (action.type) {

        case filterMenuLinkedItemAction.ACTION:
            return {
                data: action.payload
            };

        case clearFilterMenuLinkedItemAction.ACTION:
            return {
                data: initialState.data
            };

        default:
            return state;

    }
}
