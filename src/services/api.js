import axios from "axios";

const API_KEY = "c7abe20816ceefd6a1b01a864b0aa300";

const API = {
    call() {
        return axios.create({
            baseURL: "https://api.themoviedb.org/3",
            params: {
                api_key: API_KEY,
                // language: "vi-VN" 
            }
        });
    },
    callWithToken(token) {
        if (!token) token = localStorage.getItem('SESSION_ID');
        return axios.create({
            baseURL: "https://api.themoviedb.org/3",
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                api_key: API_KEY,
                session_id: token
                // language: "vi-VN"
            }
        });
    }
};

export default API;