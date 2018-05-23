const ACTION = 'MATCHED_ITEMS_ADD';

const actionCreator = payload => ({ type: ACTION, payload });

actionCreator.ACTION = ACTION;

export default actionCreator;