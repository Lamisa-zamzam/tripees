import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

axios.defaults.withCredentials = true;
class Auth {
    constructor() {
        this.authenticated = false;
    }

    isAuthenticated() {
        const accessToken = cookies.get("authSession");
        const refreshToken = cookies.get("refreshTokenID");
        if (!accessToken && !refreshToken) {
            return (this.authenticated = false);
        }
        if (accessToken && refreshToken) {
            return (this.authenticated = true);
        }
        if (!accessToken && refreshToken) {
            axios
                .post("http://localhost:5000/refres", {
                    withCredentials: true,
                })
                .catch((error) => {
                    alert(error);
                });
        }
    }
}

export default new Auth();
