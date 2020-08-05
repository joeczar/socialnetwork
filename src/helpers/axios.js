import axios from "axios";

let instance = axios.create({
    xsrfCookieName: "token",
    xsrfHeaderName: "csrf-token",
});

export default instance;
