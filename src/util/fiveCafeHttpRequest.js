import axios from "axios";

const fiveCafeHttpRequest = axios.create({
    baseURL: process.env.REACT_APP_FIVE_CAFE_BASE_URL,
});

export const get = async (path, options) => {
    const response = await fiveCafeHttpRequest.get(path, options);

    return response.data;
};

export const post = async (path, data, options) => {
    const response = await fiveCafeHttpRequest.post(path, data, options);

    return response.data;
};

export const put = async (path, data, options) => {
    const response = await fiveCafeHttpRequest.put(path, data, options);

    return response.data;
};

export const myDelete = async (path, data, options) => {
    const response = await fiveCafeHttpRequest.delete(path, data, options);

    return response.data;
};


export default fiveCafeHttpRequest;