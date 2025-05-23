
import { jwtDecode } from "jwt-decode";

export default class CookieService {
    
    static getCookie(name) {
        const cookies = document.cookie.split(";").map(cookie => cookie);
        const foundCookie = cookies.find(cookie => cookie.startsWith(`${name}=`));

        if (foundCookie) {
            return decodeURIComponent(foundCookie.split('=')[1]);
        }

        return null;
    }

    static setTokenCookie(accessToken) {
        const existingToken = this.getCookie("token");
        
        if (existingToken === accessToken && this.validateExpireDate(existingToken)) return;

        if (existingToken !== null && !this.validateExpireDate(existingToken)) {
            this.deleteCookie("token");
        }

        document.cookie = `token=${accessToken}; max-age=${60 * 60 * 1000}; path=/;`;
    }

    static validateExpireDate(token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        return decoded.exp > currentTime;
    }

    static deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}