import axios from "axios";

const AUTH_REST_API_BASE_URL = ""//"http://localhost:8082"

export const loginAPICall = (username, password) =>
    axios.post(AUTH_REST_API_BASE_URL + '/login', {username, password});

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const getUserRole = () => {
    return window.localStorage.getItem('user_role');
};

export const setAuthHeader = (token, role) => {
    if (token !== null) {
        window.localStorage.setItem("auth_token", token);
        window.localStorage.setItem("user_role", role);
    } else {
        window.localStorage.removeItem("auth_token");
        window.localStorage.removeItem("user_role");
    }
};

axios.defaults.baseURL = "";//'http://localhost:8082';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {

    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data});
};
