import axios from "axios";

const authRequestHandler = async (route, params) => {
    return await axios.post(`api/${route.toLowerCase()}`, params)
        .then((res) => ({
            result: res.data.result,
            message: res.data.message,
        }))
        .catch((err) => ({
            result: false,
            status: err.response.data.status,
            message: err.response.data.message
        }));
}

const userCheckRequest = async (params) => {
    return await axios.post('api/verification', params)
        .then((res) => ({
            result: res.data.result,
        }))
        .catch(() => ({
            result: false,
        }));
}

const userLogoutRequest = async (params) => {
    return await axios.post('api/logout', params)
        .then((res) => ({
            result: res.data.result,
        }))
        .catch(() => ({
            result: false,
        }));
}

export { authRequestHandler, userCheckRequest, userLogoutRequest }