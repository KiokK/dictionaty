import axios from 'axios';
import {getAuthToken} from "./Authservice";
const API_URL = ""//http://localhost:8082';

export const getMessages = async (path) => {
    try {
        const response = await axios.get(`${API_URL}/${path}`);//.finally(console.log("+"));

        return response.data;
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
};

export const findWordsByPartAndLang = async (path, content) => {
    try {
        const response = await axios.get(`${API_URL}/${path}`);
        return response.data;
    } catch (error) {
        console.error('Error find word:', error);
        throw error;
    }
};

export const deleteWordById = async (path) => {
    try {
        const response = await request("DELETE", `${API_URL}/${path}`,{});

        return response?.status;
    } catch (error) {
        console.error('Error delete word:', error);
        throw error;
    }
};


export const deleteChapterById = async (path) => {
    try {
        // alert(`${API_URL}/${path}`)
        const response = await request("DELETE", `${API_URL}/${path}`,{});
        // alert(response)
        return response?.status;
    } catch (error) {
        console.error('Error delete chapter:', error);
        throw error;
    }
};

export const updateWord = async (path, content) => {
    try {
        const response = await request("PUT", `${API_URL}/${path}`,content);

        return response.data;
    } catch (error) {
        console.error('Error update word:', error);
        throw error;
    }
};

export const createWord = async (path, content) => {
    try {
        const response = await request("POST", `${API_URL}/${path}`,content);

        return response.data;
    } catch (error) {
        console.error('Error create word:', error);
        throw error;
    }
};


export const updateChapterQ = async (path, content) => {
    try {
        const response = await request("PUT", `${API_URL}/${path}`,content);

        return response.data;
    } catch (error) {
        console.error('Error update updateChapter:', error);
        throw error;
    }
};

export const createChapter = async (path, content) => {
    try {
        const response = await request("POST", `${API_URL}/${path}`,content);

        return response.data;
    } catch (error) {
        console.error('Error create updateChapter:', error);
        throw error;
    }
};

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

// export const saveMessage = async (path, content) => {
//     try {
//         const response = await axios.post(`${API_URL}/${path}`, { content });
//         return response.data;
//     } catch (error) {
//         console.error('Error saving message:', error);
//         throw error;
//     }
// };


