import loginAction from '../Login/ActionCreator/loginAction';
import logoutAction from '../Login/ActionCreator/logoutAction';
import authMiddleware from './authMiddleware';

const mockStore = { dispatch: jest.fn() };
const mockNext = jest.fn();

describe('AuthMiddleware', () => {
    test('AuthMiddleware should handle loginAction', () => {
        const action = {
            type: loginAction.ACTION_COMPLETE,
            data: {
                access_token: 'testtoken',
                user: {
                    email: 'testemail@email.com',
                    first_name: 'Testy',
                    last_name: 'McTestFace'
                }
            }
        };

        const mockedAuth = {
            email: action.data.user.email,
            first_name: action.data.user.first_name,
            last_name: action.data.user.last_name,
            token: action.data.access_token
        };
        authMiddleware(mockStore)(mockNext)(action);
        expect(JSON.parse(localStorage.getItem('auth'))).toEqual(mockedAuth);
        localStorage.clear();
    });

    test('AuthMiddleware should handle logoutAction', () => {
        const action = {
            type: logoutAction.ACTION
        };

        authMiddleware(mockStore)(mockNext)(action);
        expect(localStorage.getItem('auth')).toBeNull();
        localStorage.clear();
    })
});
