import axios from "axios";

const profileRequestHandler = async (params) => {
    return await axios.post('api/update-profile', params)
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

export { profileRequestHandler }