import MenuApi from '../DAO/MenuApi';
import asyncActionCreator from 'FSL/modules-react/Base/ActionCreator/asyncActionCreator';

export default asyncActionCreator({
    name: 'MERCHANT_MENU_GET',
    action: MenuApi.loadMenu.bind(MenuApi),
});
