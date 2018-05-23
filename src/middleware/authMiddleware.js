import loginAction from '../Login/ActionCreator/loginAction';
import logoutAction from '../Login/ActionCreator/logoutAction';

export default function authMiddleware({ getState, dispatch }) {
    return (next) =>
        (action) => {
            const nextState = next(action);
            authMiddlewareListeners(action, getState, dispatch);
            return nextState;
        };
}

function authMiddlewareListeners(action) {
    switch (action.type) {
        case loginAction.ACTION_COMPLETE: {
            localStorage.setItem('auth', JSON.stringify({
                token: action.data.access_token,
                email: action.data.user.email,
                first_name: action.data.user.first_name,
                last_name: action.data.user.last_name
            }));
            break;
        }

        case logoutAction.ACTION: {
            localStorage.removeItem('auth');
            break;
        }
    }
}
