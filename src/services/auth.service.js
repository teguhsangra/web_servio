import axios from 'axios';
import { Login, Logout, Profile } from '../utils/config'
import authHeader from './auth-header';
class AuthService {

    login(user) {
        return axios
            .post(Login, {
                email: user.email,
                password: user.password
            })
            .then(response => {
                var data = response.data.data;

                if (data.access_token) {
                    localStorage.setItem('user', JSON.stringify(data));
                }

                return data;
            });
    }

    logout() {
        return axios
            .post(Logout, {}, { headers: authHeader() })
            .then(response => {
                localStorage.removeItem('user');
            });

    }


    getDataProfile(id) {
        return axios.get(Profile + '/' + id, { headers: authHeader() })
            .then(response => {
                var data = response.data.data;

                if (data.access_token) {
                    localStorage.setItem('user', JSON.stringify(data));
                }

                return data;
            });
    }

    // register(user) {
    //     return axios.post(process.env.API_URL + 'signup', {
    //         username: user.username,
    //         email: user.email,
    //         password: user.password
    //     });
    // }
}

export default new AuthService();