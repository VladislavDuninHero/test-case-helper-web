
import axios from 'axios'

export const postRequest = async (body, uri) => {
    try {
        const response = await axios.post(uri, body);

        return response;
    } catch (error) {
        console.log(error);
    }
}