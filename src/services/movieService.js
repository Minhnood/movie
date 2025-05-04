import API from "./api"

const movieService = {
    getPopularList(data) {
        return API.call().get(`/movie/popular?page=${data}`);
    },
    getDetailMovie(data) {  
        return API.call().get(`movie/${data}`);
    },
    getrecommendations(data) {
        return API.call().get(`movie/${data}/recommendations?language=en-US&page=1`);
    },
    getMovieGenres() {
        return API.call().get(`/genre/movie/list`);
    },
    getSearchList(keyword) {
        return API.call().get(`/search/movie?query=${keyword.search}&page=${keyword.page}`);
    },
    getupcoming(data) {
        return API.call().get(`/movie/upcoming?page=${data}`);
    },
    gettopRated(data) {
        return API.call().get(`/movie/top_rated?page=${data}`);
    },
    postFavourite(data) {
        return API.callWithToken().post(`/account/21873438/favorite`,data);
    },
    getFavourite() {
        return API.callWithToken().get(`/account/123/favorite/movies`);
    },
    getcredits(data) {
        return API.call().get(`/movie/${data}/credits`);
    },
    getDetailscredits(data) {
        return API.call().get(`/person/${data}`);
    },
    getMoviecredits(data) {
        return API.call().get(`/person/${data}/movie_credits`);
    },
    getMoviReview(data) {
        return API.call().get(`/movie/${data}/reviews`);
    },
}

export default movieService;