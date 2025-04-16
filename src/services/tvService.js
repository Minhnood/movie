import API from "./api"

const tvService = {
    getPopularTvList(data) {
        return API.call().get(`/tv/popular?page=${data}`);
    },
    getTodayTvList(data) {
        return API.call().get(`/tv/airing_today?page=${data}`);
    },
    getTopRatedTvList() {
        return API.call().get(`/tv/top_rated`);
    },
}   

export default tvService;