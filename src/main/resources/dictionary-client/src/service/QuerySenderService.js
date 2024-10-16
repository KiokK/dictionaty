import axios from 'axios';
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

// export const saveMessage = async (path, content) => {
//     try {
//         const response = await axios.post(`${API_URL}/${path}`, { content });
//         return response.data;
//     } catch (error) {
//         console.error('Error saving message:', error);
//         throw error;
//     }
// };


