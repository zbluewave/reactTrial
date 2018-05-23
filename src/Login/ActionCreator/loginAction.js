import LoginApi from '../DAO/LoginApi';
import asyncActionCreator from 'FSL/modules-react/Base/ActionCreator/asyncActionCreator';

export default asyncActionCreator({
    name: 'USER_LOGIN',
    action: LoginApi.login.bind(LoginApi)
});