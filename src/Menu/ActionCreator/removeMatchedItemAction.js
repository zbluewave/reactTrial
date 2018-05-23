const ACTION = 'MATCHED_ITEMS_REMOVE';

const actionCreator = (payload, itemType) => ({ type: ACTION, payload, itemType });

actionCreator.ACTION = ACTION;

export default actionCreator;