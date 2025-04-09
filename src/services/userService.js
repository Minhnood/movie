import API from "./api";

const userService = {
    async login({ username, password }) {
        try {
            const tokenResponse = await API.call().get("/authentication/token/new");
            const requestToken = tokenResponse.data.request_token;

            await API.call().post("/authentication/token/validate_with_login", {
                username,
                password,
                request_token: requestToken,
            });

            const sessionResponse = await API.call().post("/authentication/session/new", {
                request_token: requestToken,
            });

            return sessionResponse.data.session_id;
        } catch (error) {
            throw error;
        }
    },

    fetchMe(sessionId) {
        return API.callWithToken(sessionId).get(`/account`);
    },
    fetchMeNew() {

    }
};

export default userService;
