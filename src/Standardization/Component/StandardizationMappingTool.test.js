import React from 'react';
import StandardizationMappingTool from './StandardizationMappingTool';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const props = {
    error: "",
    pendingQueue: {},
    entitiesPage: {},
    auth: {},
};
const state = {
    standardizedMappingTool: {
        error: "",
        pendingQueue: {},
        entitiesPage: {},
        auth: {},
    },
    auth: {
        data: {

        }
    }
};

const mockStore = configureMockStore([thunk]);
const storeStateMock = { ...state };
const store = mockStore(storeStateMock);

describe('StandardizationMappingTool', () => {
    test('StandardizationMappingTool renders', () => {
        const component = shallow(<StandardizationMappingTool {...props} store={store} />);
        expect(component.length).toEqual(1);
    });
});
