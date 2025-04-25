import API from "./api"

const tvService = {
    getPopularTvList(data) {
        return API.call().get(`/tv/popular?page=${data}`);
    },
    getTodayTvList(data) {
        return API.call().get(`/tv/airing_today?page=${data}`);
    },
    gettopRatedTvList() {
        return API.call().get(`/tv/top_rated`);
    },
    getDetailsTv(data) {
        return API.call().get(`/tv/${data}`);
    },
    getTvrecommendations(data) {
        return API.call().get(`/tv/${data}/recommendations`);
    },
    getTvDetailsSeason(data) {
        return API.call().get(`/tv/${data.id}/season/${data.season}`);
    },
    getTvDetailsEpisodeId(data) {
        return API.call().get(`/tv/${data.id}/season/${data.season}/episode/${data.episode}`);
    },
}   

export default tvService;