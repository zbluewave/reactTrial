'use strict';

import BaseApi from 'FSL/modules-react/Base/DAO/BaseApi';
import menuModelFactory from '../Model/menuModelFactory';
import setAuth from '../../auth';

class MenuApi {

    static loadMenu({ merchantId, params }) {
        const defaults = {
            hide_unavailable: false
        };

        const query = {
            ...defaults,
            ...params
        };

        return BaseApi.fetch({
            url: `merchant/${merchantId}/menu`,
            query,
            headers: {
                Authorization: setAuth()
            }
        }).then(data => menuModelFactory(data, merchantId));
    }
}

export default MenuApi;
