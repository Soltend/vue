import axios from "axios";

const allCompanyRequestHandler = async (params) => {
    return await axios.post('api/all-company', params)
        .then((res) => ({
            result: res.data.result,
        }))
        .catch(() => ({
            result: false,
        }));
}

const removeCompanyRequestHandler = async (params) => {
    return await axios.post('api/remove-company', params)
        .then((res) => ({
            result: res.data.result,
        }))
        .catch(() => ({
            result: false,
        }));
}

const createCompanyRequestHandler = async (params) => {
    return await axios.post('api/create-company', params)
        .then((res) => ({
            result: res.data.result,
        }))
        .catch((err) => ({
            result: false,
            status: err.response.data.status,
            message: err.response.data.message
        }));
}

const companyCheckRequest = async (params) => {
    return await axios.post('api/verification-company', params)
        .then((res) => ({
            result: res.data.result,
        }))
        .catch(() => ({
            result: false,
        }));
}

const singleCompanyRequestHandler = async (params) => {
    return await axios.post('api/get-company', params)
        .then((res) => ({
            result: res.data.result,
        }))
        .catch(() => ({
            result: false
        }));
}

const editCompanyRequestHandler = async (params) => {
    return await axios.post('api/edit-company', params)
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

export { allCompanyRequestHandler, removeCompanyRequestHandler, createCompanyRequestHandler, companyCheckRequest, singleCompanyRequestHandler, editCompanyRequestHandler }