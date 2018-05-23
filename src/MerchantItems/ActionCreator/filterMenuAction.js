const ACTION = 'FILTER_ITEM_ADD';

const actionCreator = payload => ({ type: ACTION, payload });

actionCreator.ACTION = ACTION;

export default actionCreator;