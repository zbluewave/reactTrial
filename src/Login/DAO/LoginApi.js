import BaseApi from 'FSL/modules-react/Base/DAO/BaseApi';
import LoginModelFactory from '../Model/LoginModelFactory';
import config from '../../config';

class LoginApi {

    static login(options) {
        const defaults = {
            client_secret: config().clientSecret,
            client_id: config().apiKey,
            grant_type: 'password',
            scope: 'payment,global',
        };

        return BaseApi.fetch({
            url: 'customer/auth',
            method: 'post',
            body: {
                ...defaults,
                ...options
            }
        }).then(data => LoginModelFactory(data));

    }
}



export default LoginApi;