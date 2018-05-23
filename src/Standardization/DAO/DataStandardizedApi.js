import BaseApi from 'FSL/modules-react/Base/DAO/BaseApi';
import standardizedMetaDataFactory from '../Model/standardizedMetaDataFactory';
import masterListDataFactory from '../Model/masterListDataFactory';
import entityDataFactory from '../Model/entityDataFactory';
import setAuth from '../../auth';

class DataStandardizedApi {
    static getStandardizedMetaData(query) {
        return BaseApi.fetch({
            method: 'get',
            url: `standardization/list/meta`,
            headers: {
                Authorization: query.hasOwnProperty('token') ? query.token : setAuth()
            },
            query: query
        })
            .then(data => standardizedMetaDataFactory(data));
    }

    static getMasterListData(query) {
        return BaseApi.fetch({
            method: 'get',
            url: `standardization/list/master_list`,
            headers: {
                Authorization: query.hasOwnProperty('token') ? query.token : setAuth()
            },
            query: query
        })
            .then(data => masterListDataFactory(data));
    }

    static getEntitiesData(query) {
        return BaseApi.fetch({
            method: 'get',
            url: `standardization/search/entities`,
            headers: {
                Authorization: query.hasOwnProperty('token') ? query.token : setAuth()
            },
            query: query
        })
            .then(data => entityDataFactory(data));
    }

    static editEntityMasterListLinks(query) {
        return BaseApi.fetch({
            method: 'post',
            url: `standardization/edit/links`,
            headers: {
                Authorization: query.hasOwnProperty('token') ? query.token : setAuth()
            },
            query: {},
            body: query
        })
            .then(data => entityDataFactory(data));
    }
}

export default DataStandardizedApi;
