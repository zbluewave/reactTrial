'use strict';

import BaseApi from '../../App/DAO/BaseApi';
import setAuth from '../../auth';

class MatchingApi {

    static createLink(query) {
        return BaseApi.fetch({
            url: 'partner/merchant/menu/item/link',
            method: 'post',
            headers: {
                Authorization: setAuth()
            },
            body: {
                ...query
            }
        });
    }

    static updateLink(query) {
        return BaseApi.fetch({
            url: 'partner/merchant/menu/item/link',
            method: 'put',
            header: {
                Authorization: setAuth()
            },
            body: {
                ...query
            }
        });
    }

    static deleteLink(query) {
        return BaseApi.fetch({
            url: `partner/merchant/menu/item/link/${query.partnerEntityId}`,
            method: 'delete',
            header: {
                Authorization: setAuth()
            }
        });
    }

}
export default MatchingApi;