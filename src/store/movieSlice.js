import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import movieService from "../services/movieService";
import { fetchTvFavourite } from "./tvSlice";


const initialState = {
    list: [],
    listFavourite: [],
    listPage: 1,
    upcomingPage: 1,
    maxupcomingPage: 1,
    topRatedPage: 1,
    maxtopRatedPgae: 1,
    seacrhPage: 1,
    maxSearchPgae: 1,
    detailMovie: [],
    recommendations: [],
    genreList: [],
    searchList: [],
    upcoming:[],
    topRated:[],
    credits: [],
    creditsCrew: [],
    detailscredits: [],
    moviesActed: [],
    filmsMade: [],
    reviewsMovi: [],
};

export const fetchPopularList = createAsyncThunk("Movie/fetchPopularList", async (data, thunkAPI) => {
    try {
        const response = await movieService.getPopularList(data);
        return {
            list: response.data.results,
            listPage: response.data.page,
        };
    } catch (err) {
        console.error("Error fetching categories:", err);
        return thunkAPI.rejectWithValue(err.response?.data || "Lỗi không xác định");
    }
});


export const fetchMovieupcoming = createAsyncThunk("Movie/fetchMovieupcoming", async (data, thunkAPI) => {
    try {
        const response = await movieService.getupcoming(data);
        return {
            list: response.data.results,
            listPage: response.data.page,
            maxPage: response.data.total_pages
        };
    } catch (err) {
        console.error("Error fetching categories:", err);
        return thunkAPI.rejectWithValue(err.response?.data || "Lỗi không xác định");
    }
});

export const fetchTopRated = createAsyncThunk("Movie/fetchTopRated", async (data, thunkAPI) => {
    try {
        const response = await movieService.gettopRated(data);
        return {
            list: response.data.results,
            listPage: response.data.page,
            maxPage: response.data.total_pages
        };
    } catch (err) {
        console.error("Error fetching categories:", err);
        return thunkAPI.rejectWithValue(err.response?.data || "Lỗi không xác định");
    }
});

export const fetchMovieGenress = createAsyncThunk("Movie/fetchMovieGenress", async (data, thunkAPI) => {
    try {
        const response = await movieService.getMovieGenres();
        return response.data.genres;
    } catch (err) {
        console.error("Error fetching categories:", err);
        return thunkAPI.rejectWithValue(err.response?.data || "Lỗi không xác định");
    }
});

export const fetchDetailsMovie = createAsyncThunk("Movie/fetchDetailsMovie", async (data, thunkAPI) => {
    try {
        const response = await movieService.getDetailMovie(data);
        console.log(response);
        
        return response.data;
    } catch (err) {
        console.error("Error fetching categories:", err);
        return thunkAPI.rejectWithValue(err.response?.data || "Lỗi không xác định");
    }
});

export const fetchrecommendations = createAsyncThunk("Movie/fetchrecommendations", async (data, thunkAPI) => {
    try {
        const response = await movieService.getrecommendations(data);
        return response.data.results;
    } catch (err) {
        console.error("Error fetching categories:", err);
        return thunkAPI.rejectWithValue(err.response?.data || "Lỗi không xác định");
    }
});

export const fetchSearch = createAsyncThunk("post/fetchSearch", async (keyword, thunkAPI) => {
    const response = await movieService.getSearchList(keyword);
    
    const search = response.data.results;
    const sendData = search;
    return {
        sendData: sendData,
        listPage: response.data.page,
        maxPage: response.data.total_pages
    };
});

export const postFavourite = createAsyncThunk("post/postFavourite", async (data, thunkAPI) => {
    const response = await movieService.postFavourite(data);
    const {dispatch} = thunkAPI;
    dispatch(fetchFavourite());
    dispatch(fetchTvFavourite());
    // dispatch fetch fav movies
});

export const fetchMoviReview = createAsyncThunk("post/fetchMoviReview", async (data, thunkAPI) => {
    const response = await movieService.getMoviReview(data);
    return response.data.results;
});


export const fetchFavourite = createAsyncThunk("post/fetchFavourite", async (data, thunkAPI) => {
    const response = await movieService.getFavourite();

    return response.data.results;
});

export const fetchCredits = createAsyncThunk("post/fetchCredits", async (data, thunkAPI) => {
    const response = await movieService.getcredits(data);
    return {
       cast: response.data.cast,
       crew: response.data.crew,
    }

});

export const fetchDetailsCredits = createAsyncThunk("post/fetchDetailsCredits", async (data, thunkAPI) => {
    const response = await movieService.getDetailscredits(data);
    return response.data;
});

export const fetchMovieCredits = createAsyncThunk("post/fetchMovieCredits", async (data, thunkAPI) => {
    const response = await movieService.getMoviecredits(data);
    console.log(response.data);
    
    return {
        cast: response.data.cast,
        crew: response.data.crew,
     }
});

const slice = createSlice({
    name: "post",
    initialState,
    reducers: {
    },
    extraReducers: (buidler) => {
        buidler.addCase(fetchPopularList.fulfilled, (state, action) => {
            state.list = action.payload.list;
            state.listPage = action.payload.listPage;
        });
        buidler.addCase(fetchDetailsMovie.fulfilled, (state, action) => {
            state.detailMovie = action.payload;
        });
        buidler.addCase(fetchrecommendations.fulfilled, (state, action) => {
            state.recommendations = action.payload;
        });
        buidler.addCase(fetchMovieGenress.fulfilled, (state, action) => {
            state.genreList = action.payload;
        });
        buidler.addCase(fetchSearch.fulfilled, (state, action) => {
            state.searchList = action.payload.sendData;
            state.seacrhPage = action.payload.listPage;
            state.maxSearchPgae = action.payload.maxPage;
        });
        buidler.addCase(fetchMovieupcoming.fulfilled, (state, action) => {
            state.upcoming = action.payload.list;
            state.upcomingPage = action.payload.listPage;
            state.maxupcomingPage = action.payload.maxPage;
        });
        buidler.addCase(fetchTopRated.fulfilled, (state, action) => {
            state.topRated = action.payload.list;
            state.topRatedPage = action.payload.listPage;
            state.maxtopRatedPgae = action.payload.maxPage;
        });
        buidler.addCase(fetchFavourite.fulfilled, (state, action) => {
            state.listFavourite = action.payload;
        });
        buidler.addCase(fetchCredits.fulfilled, (state, action) => {
            state.credits = action.payload.cast;
            state.creditsCrew = action.payload.crew;
        });
        buidler.addCase(fetchDetailsCredits.fulfilled, (state, action) => {
            state.detailscredits = action.payload;
        });
        buidler.addCase(fetchMovieCredits.fulfilled, (state, action) => {
            state.moviesActed = action.payload.cast;
            state.filmsMade = action.payload.crew;
        });
        buidler.addCase(fetchMoviReview.fulfilled, (state, action) => {
            state.reviewsMovi = action.payload;
        });
    }
});


const { reducer, actions } = slice;

export default reducer;
