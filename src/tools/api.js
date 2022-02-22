import axios from 'axios';

export const fetch = async (method, url, token, data) => {
    let config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        let dataTmp = await axios(
            {
                url: `http://localhost:3000${url}`,
                method,
                data,
                ...config
            });
        return dataTmp.data;
    } catch (error) {
        throw error.message
    }
}