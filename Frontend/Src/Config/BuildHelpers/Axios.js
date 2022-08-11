import axios from 'axios'
// axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname;
axios.defaults.baseURL = 'http://localhost:5001/';

axios.interceptors.request.use(function (config) {
    config.headers.common = {
        ...config.headers.common,
        'Authorization': localStorage.getItem('token')
    }

    return config;
}, function (err) {
    console.log(err)
    return Promise.reject(err);
});