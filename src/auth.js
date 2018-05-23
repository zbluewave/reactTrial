export default function setAuth() {
    return localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token : '';
}