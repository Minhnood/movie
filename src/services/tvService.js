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
    getDetailsTv(data) {
        return API.call().get(`/tv/${data}`);
    },
    getTvRecommendations(data) {
        return API.call().get(`/tv/${data}/recommendations`);
    },
    getTvDetailsSeason(data) {
        return API.call().get(`/tv/${data.id}/season/${data.seasonId}`);
    },
    getTvDetailsEpisodeId(data) {
        return API.call().get(`/tv/${data.id}/season/${data.seasonId}/episode/${data.episodeId}`);
    },
}   

export default tvService;