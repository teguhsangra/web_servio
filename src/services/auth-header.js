export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.access_token) {
        return {
            Authorization: 'Bearer ' + user.access_token,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
}