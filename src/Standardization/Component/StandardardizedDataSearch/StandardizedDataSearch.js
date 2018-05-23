import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {
    Loader,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import getStandardizedMetaAction from '../../ActionCreator/getStandardizedMetaAction';
import getMasterListAction from '../../ActionCreator/getMasterListAction';
import MasterList from './MasterList';
import StandardizedMetaList from './StandardizedMetaList';
import { selectMeta } from '../../ActionCreator/buttonActions';

@connect(
    state => ({
        standardizedDataSearch: state.standardizedMappingTool.standardizedDataSearch
    }),
    dispatch => ({
        getStandardizedMeta: query => dispatch(getStandardizedMetaAction(query)),
        getMasterList: query =>dispatch(getMasterListAction(query)),
        selectMeta: meta =>dispatch(selectMeta(meta))
    })
)
class StandardizedDataSearch extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {};
    }

    componentDidMount() {
        this.props.getStandardizedMeta({});
    }

    render() {
        if (this.props.standardizedDataSearch.loading) {
            return <Loader active>Loading</Loader>;
        } else if (!this.props.standardizedDataSearch.selectedMeta) {
            return <StandardizedMetaList />;
        }
        return <MasterList />;
    }
}

StandardizedDataSearch.propTypes = {
    standardizedDataSearch: PropTypes.object,
    getMasterList: PropTypes.func,
    getStandardizedMeta: PropTypes.func,
    selectMeta: PropTypes.func
};

export default StandardizedDataSearch;
