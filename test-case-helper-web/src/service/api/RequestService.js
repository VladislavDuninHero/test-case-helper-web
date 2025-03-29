
import axios from 'axios'

export default class RequestService {

    static postRequest(uri, body, requestHeaders = {}) {
        return axios.post(uri, body, {
                headers: requestHeaders
            }
        );
    }

    static postAuthorizedRequest(uri, body, token) {
        return axios.post(uri, body, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
    }

    static getAuthorizedRequest(uri, token) {
        return axios.get(uri, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    static putAuthorizedRequest(uri, body, token) {
        return axios.put(uri, body, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
    }

    static deleteAuthorizedRequest(uri, token) {
        return axios.delete(uri, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
    }

    static validateTokenRequest(token) {
        return this.postRequest(uri, {token: token});
    }
}