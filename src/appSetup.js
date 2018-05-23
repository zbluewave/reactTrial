import Settings from 'FSL/modules-react/Base/Config/Settings';

export default function appSetup() {
    Settings.setVars({
        API_BASE_URL_PROD: process.env.REACT_APP_URL || 'https://integration.delivery.com/api'
    });
}