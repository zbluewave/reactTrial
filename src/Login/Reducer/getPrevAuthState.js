export default function getPrevAuthState() {
	const auth = JSON.parse(localStorage.getItem('auth'));
	return {
		data: {
			loggedIn: (auth && auth.token) ? true : false,
			user: {
				email: (auth && auth.email) ? auth.email : '',
				first_name: (auth && auth.first_name) ? auth.first_name : '',
				last_name: (auth && auth.last_name) ? auth.last_name : ''
			},
			access_token: (auth && auth.token) ? auth.token : ''
		}
	};
}